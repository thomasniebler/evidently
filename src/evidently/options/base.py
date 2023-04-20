from typing import Dict
from typing import List
from typing import Optional
from typing import Type
from typing import TypeVar
from typing import Union

from pydantic import BaseModel

from evidently.options import ColorOptions
from evidently.options.option import Option

TypeParam = TypeVar("TypeParam", bound=Option)


class Options(BaseModel):
    color: Optional[ColorOptions] = None
    agg_data: Optional[bool] = None
    custom: Dict[Type[Option], Option] = {}

    @property
    def color_options(self) -> ColorOptions:
        return self.color or ColorOptions()

    @property
    def agg_data_option(self) -> bool:
        return self.agg_data or False

    def get(self, option_type: Type[TypeParam]) -> TypeParam:
        if option_type in _option_cls_mapping:
            return getattr(self, _option_cls_mapping[option_type])
        if option_type in self.custom:
            return self.custom[option_type]  # type: ignore[return-value]
        return option_type()

    @classmethod
    def from_list(cls, values: List[Option]):

        kwargs: Dict = {"custom": {}}
        for value in values:
            field = _option_cls_mapping.get(type(value), None)
            if field is not None:
                kwargs[field] = value
            else:
                kwargs["custom"][type(value)] = value
        return Options(**kwargs)

    @classmethod
    def from_any_options(cls, options: "AnyOptions") -> "Options":
        """Options can be provided as Options object, list of Option classes or raw dict"""
        _options = None
        if isinstance(options, dict):
            _options = Options(**options)
        if isinstance(options, list):
            _options = Options.from_list(options)
        if isinstance(options, Options):
            _options = options

        return _options or Options()

    def override(self, other: "Options") -> "Options":
        res = Options()
        res.custom = self.custom.copy()
        for key, value in other.custom.items():
            res.custom[key] = value
        for name in self.__fields__:
            if name == "custom":
                continue
            override = getattr(other, name) or getattr(self, name)
            setattr(res, name, override)

        return res


_option_cls_mapping = {field.type_: name for name, field in Options.__fields__.items()}

AnyOptions = Union[Options, dict, List[Option], None]