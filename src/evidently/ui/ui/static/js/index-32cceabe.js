import{R as S,j as e,x as b,X as v,Y as L,P as k,Z as R,$ as y,M as _,s as w,B as j,a0 as p,w as C,W as D,z as I,m as $,u as M,G as m,O as P,a1 as B,V as A,a2 as z,a3 as F,a4 as f,a5 as c,a6 as O,L as E,o as W}from"./vendor-af8da884.js";import{d as G}from"./ContentCopy-c8c4e2ba.js";import{f as H}from"./index-555704d1.js";import{r as N,i as U}from"./createSvgIcon-91b54181.js";const Q=[{title:"Download HTML",format:"html"},{title:"Download JSON",format:"json"}];function J(n){const[t,a]=S.useState(!1),l=S.useRef(null),i=(o,u)=>{window.open(`${o}?report_format=${u}`,"_blank"),a(!1)},r=()=>{a(o=>!o)},h=o=>{l.current&&l.current.contains(o.target)||a(!1)};return e.jsxs(e.Fragment,{children:[e.jsx(b,{ref:l,color:"primary",size:"small","aria-controls":t?"split-button-menu":void 0,"aria-expanded":t?"true":void 0,"aria-label":"select merge strategy","aria-haspopup":"menu",onClick:r,children:"Download"}),e.jsx(v,{open:t,anchorEl:l.current,transition:!0,children:({TransitionProps:o,placement:u})=>e.jsx(L,{...o,style:{transformOrigin:u==="bottom"?"center top":"center bottom"},children:e.jsx(k,{children:e.jsx(R,{onClickAway:h,children:e.jsx(y,{id:"split-button-menu",children:Q.map(x=>e.jsx(_,{onClick:()=>i(n.downloadLink,x.format),children:x.title},x.format))})})})})})]})}var g={},X=U;Object.defineProperty(g,"__esModule",{value:!0});var T=g.default=void 0,Y=X(N()),Z=e,V=(0,Y.default)((0,Z.jsx)("path",{d:"M18.3 5.71a.9959.9959 0 0 0-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"}),"CloseRounded");T=g.default=V;const q=({onClick:n,tags:t,limitTags:a=2})=>{const[l,i]=w.useState(!1);return e.jsxs(j,{display:"flex",alignContent:"center",flexWrap:"wrap",children:[t.slice(0,a).map(r=>e.jsx(p,{onClick:()=>n(r),label:r,style:{margin:3}},r)),l&&t.slice(a).map(r=>e.jsx(p,{onClick:()=>n(r),label:r,style:{margin:3}},r)),!l&&t.length>a&&e.jsx(p,{variant:"outlined",label:`+${t.length-a}`,style:{margin:3,borderColor:"grey"},onClick:()=>i(!0)},"+N"),t.length>0&&l&&e.jsx(C,{style:{margin:3},onClick:()=>i(!1),children:e.jsx(T,{fontSize:"small"})})]})},K=({showText:n,copyText:t})=>e.jsxs(j,{children:[n,e.jsx(C,{size:"small",style:{marginLeft:10},onClick:()=>navigator.clipboard.writeText(t),children:e.jsx(G,{fontSize:"small"})})]});function ee(n,t){w.useEffect(()=>{const a=new URLSearchParams(window.location.search),l=a.get(n)??"";if(t===l)return;t?a.set(n,t):a.delete(n);const i=[window.location.pathname,a.toString()].filter(Boolean).join("?");window.history.replaceState(null,"",i)},[n,t])}const re={crumb:(n,{pathname:t})=>({to:t,linkText:"Reports"})},le=({type:n})=>{const{projectId:t}=D(),a=I(),l=$(),[i]=M(),[r,h]=w.useState(()=>{var s;return((s=i.get("tags"))==null?void 0:s.split(","))||[]});ee("tags",r.join(","));const o=l.find(({id:s})=>s===`show-${n}-by-id`),u=o?[]:Array.from(new Set(a.flatMap(({tags:s})=>s))),x=a.filter(({tags:s})=>o?!1:r.length===0?!0:r.every(d=>s.includes(d)));return o?e.jsx(m,{container:!0,children:e.jsx(m,{item:!0,xs:12,children:e.jsx(P,{})})}):e.jsxs(e.Fragment,{children:[e.jsx(j,{sx:{padding:2},children:e.jsx(m,{container:!0,children:e.jsx(m,{item:!0,xs:12,md:6,children:e.jsx(B,{multiple:!0,limitTags:2,value:r,onChange:(s,d)=>h(d),options:u,renderInput:s=>e.jsx(A,{...s,variant:"standard",label:"Filter by Tags"})})})})}),e.jsxs(z,{children:[e.jsxs(F,{children:[e.jsxs(f,{children:[e.jsx(c,{children:n==="report"?"Report ID":n==="test-suite"?"Test Suite ID":"indefined"}),e.jsx(c,{children:"Tags"}),e.jsx(c,{children:"Timestamp"}),e.jsx(c,{children:"Actions"})]}),e.jsx(f,{})]}),e.jsx(O,{children:x.map(s=>e.jsxs(f,{children:[e.jsx(c,{children:e.jsx(K,{showText:s.id,copyText:s.id})}),e.jsx(c,{children:e.jsx(j,{maxWidth:250,children:e.jsx(q,{onClick:d=>{r.includes(d)||h([...r,d])},tags:s.tags})})}),e.jsx(c,{children:H(new Date(Date.parse(s.timestamp)))}),e.jsxs(c,{children:[e.jsx(E,{component:W,to:`${s.id}`,children:e.jsx(b,{children:"View"})}),e.jsx(J,{downloadLink:`/api/projects/${t}/${s.id}/download`})]})]},`r-${s.id}`))})]})]})};export{le as SnapshotTemplate,re as handle};