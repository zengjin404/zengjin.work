import{L as x,a8 as k,aa as _,R as p,a2 as N,N as T,f as u,af as I,ab as b,a5 as w,V as i,a6 as P}from"./index-nc9jXHou.js";/**
 * tdesign v1.11.5
 * (c) 2025 tdesign
 * @license MIT
 */var F={content:{type:[String,Function]},default:{type:[String,Function]},disabled:{type:Boolean,default:void 0},download:{type:[String,Boolean]},hover:{type:String,default:"underline",validator:function(e){return e?["color","underline"].includes(e):!0}},href:{type:String,default:""},prefixIcon:{type:Function},size:{type:String,default:"medium",validator:function(e){return e?["small","medium","large"].includes(e):!0}},suffixIcon:{type:Function},target:{type:String,default:""},theme:{type:String,default:"default",validator:function(e){return e?["default","primary","danger","warning","success"].includes(e):!0}},underline:Boolean,onClick:Function};/**
 * tdesign v1.11.5
 * (c) 2025 tdesign
 * @license MIT
 */var L=x({name:"TLink",props:F,emits:["click"],setup:function(e,c){var f=c.emit,v=b(),l=w(),n=k("link"),o=_(),m=o.STATUS,C=o.SIZE,g=p("classPrefix"),S=g.classPrefix,a=N(),y=T(function(){return["".concat(n.value),"".concat(n.value,"--theme-").concat(e.theme),i(i(i(i({},C.value[e.size],e.size!=="medium"),m.value.disabled,a.value),"".concat(S.value,"-is-underline"),e.underline),"".concat(n.value,"--hover-").concat(e.hover),!a.value)]}),h=function(t){a.value||f("click",t)};return function(){var d=v("default","content"),t=l("prefixIcon"),s=l("suffixIcon");return u("a",{class:I(y.value),href:a.value||!e.href?void 0:e.href,target:e.target?e.target:void 0,download:e.download?e.download:void 0,onClick:h},[t?u("span",{class:"".concat(n.value,"__prefix-icon")},[t]):null,d,s?u("span",{class:"".concat(n.value,"__suffix-icon")},[s]):null])}}});/**
 * tdesign v1.11.5
 * (c) 2025 tdesign
 * @license MIT
 */var E=P(L);export{E as L};
