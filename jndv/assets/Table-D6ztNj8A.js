import{af as U,ag as Z,ab as L,ah as E,M as D,z as P,Q as K,Z as W,p as G,q as J,c as O,s as V,X as q,y as R,Y as N,E as d,a8 as z,f as C,ai as H,G as F,ad as Q,I as $,_ as Y,b as ee,o as te,aj as ne,n as ae}from"./index-D75ePMc7.js";/**
 * tdesign v1.10.7
 * (c) 2025 tdesign
 * @license MIT
 */function re(t){if(Array.isArray(t))return Z(t)}function ie(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function oe(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function M(t){return re(t)||ie(t)||U(t)||oe()}/**
 * tdesign v1.10.7
 * (c) 2025 tdesign
 * @license MIT
 */var le={block:Boolean,content:{type:[String,Function]},default:{type:[String,Function]},disabled:{type:Boolean,default:void 0},form:{type:String,default:void 0},ghost:Boolean,href:{type:String,default:""},icon:{type:Function},loading:Boolean,loadingProps:{type:Object},shape:{type:String,default:"rectangle",validator:function(e){return e?["rectangle","square","round","circle"].includes(e):!0}},size:{type:String,default:"medium",validator:function(e){return e?["extra-small","small","medium","large"].includes(e):!0}},suffix:{type:Function},tag:{type:String,validator:function(e){return e?["button","a","div"].includes(e):!0}},theme:{type:String,validator:function(e){return e?["default","primary","danger","warning","success"].includes(e):!0}},type:{type:String,default:"button",validator:function(e){return e?["submit","reset","button"].includes(e):!0}},variant:{type:String,default:"base",validator:function(e){return e?["base","outline","dashed","text"].includes(e):!0}},onClick:Function};/**
 * tdesign v1.10.7
 * (c) 2025 tdesign
 * @license MIT
 */var ue=E.expand,se=E.ripple,ce=E.fade;function de(){var t=L("animation"),e=t.globalConfig,n=function(o){var s,c,r=e.value;return r&&!((s=r.exclude)!==null&&s!==void 0&&s.includes(o))&&((c=r.include)===null||c===void 0?void 0:c.includes(o))};return{keepExpand:n(ue),keepRipple:n(se),keepFade:n(ce)}}/**
 * tdesign v1.10.7
 * (c) 2025 tdesign
 * @license MIT
 */function A(t,e){var n=Object.keys(e);n.forEach(function(a){t.style[a]=e[a]})}/**
 * tdesign v1.10.7
 * (c) 2025 tdesign
 * @license MIT
 */var j=200,fe="rgba(0, 0, 0, 0)",ve="rgba(0, 0, 0, 0.35)",pe=function(e,n){var a;if(e!=null&&(a=e.dataset)!==null&&a!==void 0&&a.ripple){var o=e.dataset.ripple;return o}var s=getComputedStyle(e).getPropertyValue("--ripple-color");return s||ve};function me(t,e){var n=D(null),a=P(),o=de(),s=o.keepRipple,c=function(m){var i=t.value,b=pe(i);if(!(m.button!==0||!t||!s)&&!(i.classList.contains("".concat(a.value,"-is-active"))||i.classList.contains("".concat(a.value,"-is-disabled"))||i.classList.contains("".concat(a.value,"-is-checked"))||i.classList.contains("".concat(a.value,"-is-loading")))){var p=getComputedStyle(i),f=parseInt(p.borderWidth,10),g=f>0?f:0,v=i.offsetWidth,l=i.offsetHeight;n.value.parentNode===null&&(A(n.value,{position:"absolute",left:"".concat(0-g,"px"),top:"".concat(0-g,"px"),width:"".concat(v,"px"),height:"".concat(l,"px"),borderRadius:p.borderRadius,pointerEvents:"none",overflow:"hidden"}),i.appendChild(n.value));var u=document.createElement("div");A(u,{marginTop:"0",marginLeft:"0",right:"".concat(v,"px"),width:"".concat(v+20,"px"),height:"100%",transition:"transform ".concat(j,"ms cubic-bezier(.38, 0, .24, 1), background ").concat(j*2,"ms linear"),transform:"skewX(-8deg)",pointerEvents:"none",position:"absolute",zIndex:0,backgroundColor:b,opacity:"0.9"});for(var y=new WeakMap,_=i.children.length,S=0;S<_;++S){var h=i.children[S];h.style.zIndex===""&&h!==n.value&&(h.style.zIndex="1",y.set(h,!0))}var T=i.style.position?i.style.position:getComputedStyle(i).position;(T===""||T==="static")&&(i.style.position="relative"),n.value.insertBefore(u,n.value.firstChild),setTimeout(function(){u.style.transform="translateX(".concat(v,"px)")},0);var x=function(){u.style.backgroundColor=fe,t.value&&(t.value.removeEventListener("pointerup",x,!1),t.value.removeEventListener("pointerleave",x,!1),setTimeout(function(){u.remove(),n.value.children.length===0&&n.value.remove()},j*2+100))};t.value.addEventListener("pointerup",x,!1),t.value.addEventListener("pointerleave",x,!1)}};K(function(){var r=t?.value;r&&(n.value=document.createElement("div"),r.addEventListener("pointerdown",c,!1))}),W(function(){var r;t==null||(r=t.value)===null||r===void 0||r.removeEventListener("pointerdown",c,!1)})}/**
 * tdesign v1.10.7
 * (c) 2025 tdesign
 * @license MIT
 */var be=J,ge=G,ye="[object Boolean]";function he(t){return t===!0||t===!1||ge(t)&&be(t)==ye}var k=he;/**
 * tdesign v1.10.7
 * (c) 2025 tdesign
 * @license MIT
 */function X(t){var e=V(),n=O(function(){return e.props.disabled}),a=q("formDisabled",Object.create(null));return O(function(){var o;return k(void 0)?t.beforeDisabled.value:k(n.value)?n.value:k(void 0)?t.afterDisabled.value:k((o=a.disabled)===null||o===void 0?void 0:o.value)?a.disabled.value:!1})}/**
 * tdesign v1.10.7
 * (c) 2025 tdesign
 * @license MIT
 */function I(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable})),n.push.apply(n,a)}return n}function w(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?I(Object(n),!0).forEach(function(a){d(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}var Ce=R({name:"TButton",props:le,setup:function(e,n){var a=n.attrs,o=n.slots,s=F(),c=z(),r=P("button"),m=N(),i=m.STATUS,b=m.SIZE,p=D();me(p);var f=X(),g=O(function(){var l=e.theme,u=e.variant;return l||(u==="base"?"primary":"default")}),v=O(function(){return["".concat(r.value),"".concat(r.value,"--variant-").concat(e.variant),"".concat(r.value,"--theme-").concat(g.value),d(d(d(d(d(d({},b.value[e.size],e.size!=="medium"),i.value.disabled,f.value),i.value.loading,e.loading),"".concat(r.value,"--shape-").concat(e.shape),e.shape!=="rectangle"),"".concat(r.value,"--ghost"),e.ghost),b.value.block,e.block)]});return function(){var l=c("default","content"),u=e.loading?C(H,w({inheritColor:!0},e.loadingProps),null):s("icon"),y=u&&!l,_=e.suffix||o.suffix?C("span",{className:"".concat(r.value,"__suffix")},[s("suffix")]):null;l=l?C("span",{class:"".concat(r.value,"__text")},[l]):"",u&&(l=[u,l]),_&&(l=[l].concat(_));var S=function(){return!e.tag&&e.href?"a":e.tag||"button"},h={class:[].concat(M(v.value),[d({},"".concat(r.value,"--icon-only"),y)]),type:e.type,disabled:f.value||e.loading,href:e.href,tabindex:f.value?void 0:"0"};return Q(S(),w(w(w({ref:p},a),h),{},{onClick:e.onClick}),[l])}}});/**
 * tdesign v1.10.7
 * (c) 2025 tdesign
 * @license MIT
 */var Te=$(Ce);/**
 * tdesign v1.10.7
 * (c) 2025 tdesign
 * @license MIT
 */var Se={content:{type:[String,Function]},default:{type:[String,Function]},disabled:{type:Boolean,default:void 0},download:{type:[String,Boolean]},hover:{type:String,default:"underline",validator:function(e){return e?["color","underline"].includes(e):!0}},href:{type:String,default:""},prefixIcon:{type:Function},size:{type:String,default:"medium",validator:function(e){return e?["small","medium","large"].includes(e):!0}},suffixIcon:{type:Function},target:{type:String,default:""},theme:{type:String,default:"default",validator:function(e){return e?["default","primary","danger","warning","success"].includes(e):!0}},underline:Boolean,onClick:Function};/**
 * tdesign v1.10.7
 * (c) 2025 tdesign
 * @license MIT
 */function B(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable})),n.push.apply(n,a)}return n}function Oe(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?B(Object(n),!0).forEach(function(a){d(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):B(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}var _e=R({name:"TLink",props:Oe({},Se),emits:["click"],setup:function(e,n){var a=n.emit,o=z(),s=F(),c=P("link"),r=N(),m=r.STATUS,i=r.SIZE,b=L("classPrefix"),p=b.classPrefix,f=X(),g=O(function(){return["".concat(c.value),"".concat(c.value,"--theme-").concat(e.theme),d(d(d(d({},i.value[e.size],e.size!=="medium"),m.value.disabled,f.value),"".concat(p.value,"-is-underline"),e.underline),"".concat(c.value,"--hover-").concat(e.hover),!f.value)]}),v=function(u){f.value||a("click",u)};return function(){var l=o("default","content"),u=s("prefixIcon"),y=s("suffixIcon");return C("a",{class:M(g.value),href:f.value||!e.href?void 0:e.href,target:e.target?e.target:void 0,download:e.download?e.download:void 0,onClick:v},[u?C("span",{class:"".concat(c.value,"__prefix-icon")},[u]):null,l,y?C("span",{class:"".concat(c.value,"__suffix-icon")},[y]):null])}}});/**
 * tdesign v1.10.7
 * (c) 2025 tdesign
 * @license MIT
 */var je=$(_e);const xe={__name:"Table",props:{width:{type:String,default:"max-content"}},setup(t){const e=t;return(n,a)=>(te(),ee("div",{class:"Table",style:ae({"--width":e.width})},[ne(n.$slots,"default",{},void 0)],4))}},Ee=Y(xe,[["__scopeId","data-v-a494f7f9"]]);export{Te as B,je as L,Ee as T,M as _};
