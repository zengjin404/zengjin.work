import{h as N,a5 as _,a1 as o,ax as A,Q as c,q as u,V as d,K as S,S as h,a0 as g}from"./index-QM50RDvt.js";/**
 * tdesign v1.12.0
 * (c) 2025 tdesign
 * @license MIT
 */var x={append:{type:[String,Function]},prepend:{type:[String,Function]}};/**
 * tdesign v1.12.0
 * (c) 2025 tdesign
 * @license MIT
 */var I=N({name:"TInputAdornment",inheritAttrs:!1,props:x,setup:function(p,v){var r=v.slots,t=_("input-adornment"),f=A(),i=function(s,e,n){var a,m=d(n)||S(n);return!r[e]&&d(n)&&!n?null:(r[e]?r[e](null).length===1&&typeof r[e](null)[0].children=="string"?a=u("span",{class:"".concat(t.value,"__text")},[r[e](null)]):a=r[e](null):h(n)?a=n(s):a=m?u("span",{class:"".concat(t.value,"__text")},[n]):n,a&&u("span",{class:"".concat(t.value,"__").concat(e)},[a]))};return function(){var l=i(o,"prepend",p.prepend),s=i(o,"append",p.append),e=f("default")||[null],n=[t.value,c(c({},"".concat(t.value,"--prepend"),l),"".concat(t.value,"--append"),s)];return!l&&!s?e[0]:u("div",{class:n},[l,e[0],s])}}});/**
 * tdesign v1.12.0
 * (c) 2025 tdesign
 * @license MIT
 */var F=g(I);export{F as I};
