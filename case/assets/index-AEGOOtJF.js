import{g as x,aJ as k,b0 as _,aS as b,aX as p,h as N,aY as i,n as u,bb as T,bF as I,aM as w,aR as F}from"./index-idhFCSvm.js";/**
 * tdesign v1.11.5
 * (c) 2025 tdesign
 * @license MIT
 */var P={content:{type:[String,Function]},default:{type:[String,Function]},disabled:{type:Boolean,default:void 0},download:{type:[String,Boolean]},hover:{type:String,default:"underline",validator:function(e){return e?["color","underline"].includes(e):!0}},href:{type:String,default:""},prefixIcon:{type:Function},size:{type:String,default:"medium",validator:function(e){return e?["small","medium","large"].includes(e):!0}},suffixIcon:{type:Function},target:{type:String,default:""},theme:{type:String,default:"default",validator:function(e){return e?["default","primary","danger","warning","success"].includes(e):!0}},underline:Boolean,onClick:Function};/**
 * tdesign v1.11.5
 * (c) 2025 tdesign
 * @license MIT
 */var A=x({name:"TLink",props:P,emits:["click"],setup:function(e,c){var f=c.emit,v=I(),l=w(),n=k("link"),o=_(),m=o.STATUS,g=o.SIZE,C=b("classPrefix"),S=C.classPrefix,a=p(),h=N(function(){return["".concat(n.value),"".concat(n.value,"--theme-").concat(e.theme),i(i(i(i({},g.value[e.size],e.size!=="medium"),m.value.disabled,a.value),"".concat(S.value,"-is-underline"),e.underline),"".concat(n.value,"--hover-").concat(e.hover),!a.value)]}),y=function(t){a.value||f("click",t)};return function(){var d=v("default","content"),t=l("prefixIcon"),s=l("suffixIcon");return u("a",{class:T(h.value),href:a.value||!e.href?void 0:e.href,target:e.target?e.target:void 0,download:e.download?e.download:void 0,onClick:y},[t?u("span",{class:"".concat(n.value,"__prefix-icon")},[t]):null,d,s?u("span",{class:"".concat(n.value,"__suffix-icon")},[s]):null])}}});/**
 * tdesign v1.11.5
 * (c) 2025 tdesign
 * @license MIT
 */var L=F(A);export{L};
