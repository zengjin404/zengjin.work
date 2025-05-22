import{f as x,aJ as k,b0 as p,aS as _,aX as b,g as N,aY as i,bF as T,aM as I,p as l,bb as w,aR as F}from"./index-DLkfwBiu.js";/**
 * tdesign v1.12.0
 * (c) 2025 tdesign
 * @license MIT
 */var P={content:{type:[String,Function]},default:{type:[String,Function]},disabled:{type:Boolean,default:void 0},download:{type:[String,Boolean]},hover:{type:String,default:"underline",validator:function(e){return e?["color","underline"].includes(e):!0}},href:{type:String,default:""},prefixIcon:{type:Function},size:{type:String,default:"medium",validator:function(e){return e?["small","medium","large"].includes(e):!0}},suffixIcon:{type:Function},target:{type:String,default:""},theme:{type:String,default:"default",validator:function(e){return e?["default","primary","danger","warning","success"].includes(e):!0}},underline:Boolean,onClick:Function};/**
 * tdesign v1.12.0
 * (c) 2025 tdesign
 * @license MIT
 */var A=x({name:"TLink",props:P,emits:["click"],setup:function(e,d){var f=d.emit,v=T(),u=I(),a=k("link"),o=p(),m=o.STATUS,g=o.SIZE,C=_("classPrefix"),S=C.classPrefix,n=b(),y=N(function(){return["".concat(a.value),"".concat(a.value,"--theme-").concat(e.theme),i(i(i(i({},g.value[e.size],e.size!=="medium"),m.value.disabled,n.value),"".concat(S.value,"-is-underline"),e.underline),"".concat(a.value,"--hover-").concat(e.hover),!n.value)]}),h=function(t){n.value||f("click",t)};return function(){var s=v("default","content"),t=u("prefixIcon"),c=u("suffixIcon");return l("a",{class:w(y.value),href:n.value||!e.href?void 0:e.href,target:e.target?e.target:void 0,download:e.download?e.download:void 0,onClick:h},[t?l("span",{class:"".concat(a.value,"__prefix-icon")},[t]):null,s,c?l("span",{class:"".concat(a.value,"__suffix-icon")},[c]):null])}}});/**
 * tdesign v1.12.0
 * (c) 2025 tdesign
 * @license MIT
 */var L=F(A);export{L};
