from typing import Callable
from typing import List
from typing import Optional

import numpy as np
import pandas as pd
import umap

from evidently.base_metric import InputData
from evidently.base_metric import Metric
from evidently.base_metric import MetricResult
from evidently.metrics.data_drift.embedding_drift_methods import model
from evidently.model.widget import BaseWidgetInfo
from evidently.renderers.base_renderer import MetricRenderer
from evidently.renderers.base_renderer import default_renderer
from evidently.renderers.html_widgets import CounterData
from evidently.renderers.html_widgets import WidgetSize
from evidently.renderers.html_widgets import counter
from evidently.renderers.html_widgets import plotly_figure
from evidently.utils.visualizations import get_gaussian_kde
from evidently.utils.visualizations import plot_contour

SAMPLE_CONSTANT = 2500


class EmbeddingsDriftMetricResults(MetricResult):
    class Config:
        dict_exclude_fields = {
            "reference",
            "current",
        }

    embeddings_name: str
    drift_score: float
    drift_detected: bool
    method_name: str
    reference: np.ndarray
    current: np.ndarray


class EmbeddingsDriftMetric(Metric[EmbeddingsDriftMetricResults]):
    embeddings: str
    drift_method: Optional[Callable]

    def __init__(
        self,
        embeddings_name: str,
        drift_method: Optional[Callable] = None,
    ):
        self.embeddings_name = embeddings_name
        self.drift_method = drift_method

    def calculate(self, data: InputData) -> EmbeddingsDriftMetricResults:
        if data.reference_data is None:
            raise ValueError("Reference dataset should be present")
        if self.drift_method is None:
            is_bootstrap = False
            if data.reference_data.shape[0] < 1000:
                is_bootstrap = True
            self.drift_method = model(bootstrap=is_bootstrap)
        emb_dict = data.data_definition.embeddings()
        if emb_dict is None:
            raise ValueError("Embeddings shold be defined in column mapping")
        if self.embeddings_name not in emb_dict.keys():
            raise ValueError(f"{self.embeddings_name} not in column_mapping.embeddings")
        emb_list = emb_dict[self.embeddings_name]
        drift_score, drift_detected, method_name = self.drift_method(
            data.current_data[emb_list], data.reference_data[emb_list]
        )
        # visualisation
        ref_sample = data.reference_data[emb_list].sample(
            min(SAMPLE_CONSTANT, data.reference_data.shape[0]), random_state=24
        )
        curr_sample = data.current_data[emb_list].sample(
            min(SAMPLE_CONSTANT, data.current_data.shape[0]), random_state=24
        )
        data_2d = umap.UMAP().fit_transform(pd.concat([ref_sample, curr_sample]))
        reference = get_gaussian_kde(data_2d[:SAMPLE_CONSTANT, 0], data_2d[:SAMPLE_CONSTANT, 1])
        current = get_gaussian_kde(data_2d[SAMPLE_CONSTANT:, 0], data_2d[SAMPLE_CONSTANT:, 1])

        return EmbeddingsDriftMetricResults(
            embeddings_name=self.embeddings_name,
            drift_score=drift_score,
            drift_detected=drift_detected,
            method_name=method_name,
            reference=reference,
            current=current,
        )


@default_renderer(wrap_type=EmbeddingsDriftMetric)
class EmbeddingsDriftMetricRenderer(MetricRenderer):
    def render_html(self, obj: EmbeddingsDriftMetric) -> List[BaseWidgetInfo]:
        result = obj.get_result()
        if result.drift_detected:
            drift = "detected"

        else:
            drift = "not detected"
        drift_score = round(result.drift_score, 3)
        fig = plot_contour(result.current, result.reference, "component 1", "component 2")
        return [
            counter(
                counters=[
                    CounterData(
                        (
                            f"Data drift {drift}. "
                            f"Drift detection method: {result.method_name}. "
                            f"Drift score: {drift_score}"
                        ),
                        f"Drift in embeddings '{result.embeddings_name}'",
                    )
                ],
                title="",
            ),
            plotly_figure(title="", figure=fig, size=WidgetSize.FULL),
        ]