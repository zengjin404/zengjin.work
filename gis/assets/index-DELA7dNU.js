import{n as x,G as k,ap as p,L as _,ar as N,p as T,y as i,ay as I,F as w,H as l,aB as F,X as P}from"./index-Dpqc5_zY.js";/**
 * tdesign v1.14.2
 * (c) 2025 tdesign
 * @license MIT
 */var b={content:{type:[String,Function]},default:{type:[String,Function]},disabled:{type:Boolean,default:void 0},download:{type:[String,Boolean]},hover:{type:String,default:"underline",validator:function(e){return e?["color","underline"].includes(e):!0}},href:{type:String,default:""},prefixIcon:{type:Function},size:{type:String,default:"medium",validator:function(e){return e?["small","medium","large"].includes(e):!0}},suffixIcon:{type:Function},target:{type:String,default:""},theme:{type:String,default:"default",validator:function(e){return e?["default","primary","danger","warning","success"].includes(e):!0}},underline:Boolean,onClick:Function};/**
 * tdesign v1.14.2
 * (c) 2025 tdesign
 * @license MIT
 */var L=x({name:"TLink",props:b,emits:["click"],setup:function(e,d){var f=d.emit,v=I(),u=w(),n=k("link"),o=p(),m=o.STATUS,C=o.SIZE,g=_("classPrefix"),y=g.classPrefix,a=N(),S=T(function(){return["".concat(n.value),"".concat(n.value,"--theme-").concat(e.theme),i(i(i(i({},C.value[e.size],e.size!=="medium"),m.value.disabled,a.value),"".concat(y.value,"-is-underline"),e.underline),"".concat(n.value,"--hover-").concat(e.hover),!a.value)]}),h=function(t){a.value||f("click",t)};return function(){var s=v("default","content"),t=u("prefixIcon"),c=u("suffixIcon");return l("a",{class:F(S.value),href:a.value||!e.href?void 0:e.href,target:e.target?e.target:void 0,download:e.download?e.download:void 0,onClick:h},[t?l("span",{class:"".concat(n.value,"__prefix-icon")},[t]):null,s,c?l("span",{class:"".concat(n.value,"__suffix-icon")},[c]):null])}}});/**
 * tdesign v1.14.2
 * (c) 2025 tdesign
 * @license MIT
 */var B=P(L);export{B as L};
