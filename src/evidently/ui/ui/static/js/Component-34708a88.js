import{an as y,o as I,u as b,v as w,ao as R,k as v,j as s,G as i,O as C,B as c,aq as D,x as L,m as j,ar as k,as as B,at as l,au as a,av as S,L as A,f as $}from"./vendor-fd719af2.js";import{i as u}from"./tiny-invariant-dd7d57d2.js";import{a as h}from"./createSvgIcon-8455679c.js";import{u as G,T as P,H as F,D as H}from"./useUpdateQueryStringValueWithoutNavigation-93193baf.js";import{f as M}from"./Datetime-bd8955b4.js";import"./ContentCopy-38558989.js";const N=async({params:t})=>(u(t.projectId,"missing projectId"),h.getReports(t.projectId)),Q=async({params:t})=>(u(t.projectId,"missing projectId"),h.reloadProject(t.projectId)),U={crumb:(t,{pathname:o})=>({to:o,linkText:"Reports"})},z=()=>{const{projectId:t}=y(),o=I(),m=b(),p=w(),[f]=R(),[r,x]=v.useState(()=>{var e;return((e=f.get("tags"))==null?void 0:e.split(","))||[]});G("tags",r.join(","));const d=m.find(({id:e})=>e==="show-report-by-id"),g=d?[]:Array.from(new Set(o.flatMap(({tags:e})=>e))),T=o.filter(({tags:e})=>d?!1:r.length===0?!0:r.every(n=>e.includes(n)));return d?s.jsx(i,{container:!0,children:s.jsx(i,{item:!0,xs:12,children:s.jsx(C,{})})}):s.jsxs(s.Fragment,{children:[s.jsx(c,{sx:{padding:2},children:s.jsxs(i,{container:!0,spacing:2,alignItems:"end",children:[s.jsx(i,{item:!0,xs:12,md:6,children:s.jsx(D,{multiple:!0,limitTags:2,value:r,onChange:(e,n)=>x(n),options:g,renderInput:e=>s.jsx(L,{...e,variant:"standard",label:"Filter by Tags"})})}),s.jsx(i,{item:!0,flexGrow:2,children:s.jsx(c,{display:"flex",justifyContent:"flex-end",children:s.jsx(j,{variant:"outlined",onClick:()=>p(null,{method:"post"}),color:"primary",children:"Refresh Reports"})})})]})}),s.jsxs(k,{children:[s.jsxs(B,{children:[s.jsxs(l,{children:[s.jsx(a,{children:"Report ID"}),s.jsx(a,{children:"Tags"}),s.jsx(a,{children:"Timestamp"}),s.jsx(a,{children:"Actions"})]}),s.jsx(l,{})]}),s.jsx(S,{children:T.map(e=>s.jsxs(l,{children:[s.jsx(a,{children:s.jsx(P,{showText:e.id,copyText:e.id})}),s.jsx(a,{children:s.jsx(c,{maxWidth:250,children:s.jsx(F,{onClick:n=>{r.includes(n)||x([...r,n])},tags:e.tags})})}),s.jsx(a,{children:M(new Date(Date.parse(e.timestamp)))}),s.jsxs(a,{children:[s.jsx(A,{component:$,to:`${e.id}`,children:s.jsx(j,{children:"View"})}),s.jsx(H,{downloadLink:`/api/projects/${t}/${e.id}/download`})]})]},`r-${e.id}`))})]})]})};export{z as Component,Q as action,U as handle,N as loader};