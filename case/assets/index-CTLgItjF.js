import{h as C,D as W,V as N,ak as le,al as te,am as H,an as re,ao as ie,ap as oe,aq as de,A as _,o as ce,w as S,G as fe,g as J,ar as ve,J as se,z as q,C as X,v as Q,B as he,m as Y,K as R,a3 as be,L as I,as as ke,at as ye,a1 as Ce,O as ge,P as me,y as xe,k as pe,au as $,av as _e,Q as Z}from"./index-BOUM_9ip.js";import{C as F}from"./common-uGCsOHsk.js";/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */function Oe(n){return n===void 0}var Ae=Oe;/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */function we(n){var e=le(),u=C(function(){return e.props.readonly}),l=W("formReadonly",Object.create(null));return C(function(){var r,t,d;return N(n==null||(r=n.beforeReadonly)===null||r===void 0?void 0:r.value)?n.beforeReadonly.value:N(u?.value)?u.value:N(n==null||(t=n.afterReadonly)===null||t===void 0?void 0:t.value)?n.afterReadonly.value:N((d=l.readonly)===null||d===void 0?void 0:d.value)?l.readonly.value:!1})}/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */function Ie(n,e,u,l){for(var r=n.length,t=u+(l?1:-1);l?t--:++t<r;)if(e(n[t],t,n))return t;return-1}var Le=Ie;function Se(n){return n!==n}var Be=Se;function Ve(n,e,u){for(var l=u-1,r=n.length;++l<r;)if(n[l]===e)return l;return-1}var je=Ve,Ee=Le,Ne=Be,Re=je;function De(n,e,u){return e===e?Re(n,e,u):Ee(n,Ne,u)}var Te=De,Me=Te;function Pe(n,e){var u=n==null?0:n.length;return!!u&&Me(n,e,0)>-1}var $e=Pe;function Fe(n,e,u){for(var l=-1,r=n==null?0:n.length;++l<r;)if(u(e,n[l]))return!0;return!1}var ze=Fe;/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var Ge=re,Ue=$e,Ke=ze,We=H,He=ie,z=oe,Je=Math.min;function qe(n,e,u){for(var l=u?Ke:Ue,r=n[0].length,t=n.length,d=t,g=Array(t),m=1/0,x=[];d--;){var v=n[d];d&&e&&(v=We(v,He(e))),m=Je(v.length,m),g[d]=!u&&(e||r>=120&&v.length>=120)?new Ge(d&&v):void 0}v=n[0];var p=-1,h=g[0];e:for(;++p<r&&x.length<m;){var a=v[p],b=e?e(a):a;if(a=u||a!==0?a:0,!(h?z(h,b):l(x,b,u))){for(d=t;--d;){var k=g[d];if(!(k?z(k,b):l(n[d],b,u)))continue e}h&&h.push(b),x.push(a)}}return x}var Xe=qe,Qe=de;function Ye(n){return Qe(n)?n:[]}var Ze=Ye,en=H,nn=Xe,an=te,un=Ze,ln=an(function(n){var e=en(n,un);return e.length&&e[0]===n[0]?nn(e):[]}),G=ln;/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var tn={checkAll:Boolean,checked:{type:Boolean,default:void 0},modelValue:{type:Boolean,default:void 0},defaultChecked:Boolean,default:{type:[String,Function]},disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:{type:[String,Function]},lazyLoad:Boolean,name:{type:String,default:""},readonly:{type:Boolean,default:void 0},title:{type:String,default:""},value:{type:[String,Number,Boolean]},onChange:Function};/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var ee=Symbol("CheckboxGroupProvide");/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */function rn(n,e,u,l){if(typeof window>"u")return null;if(!window||!window.IntersectionObserver)return u(),null;var r=null;try{r=new window.IntersectionObserver(function(t){var d=t[0];d.isIntersecting&&(u(),r.unobserve(n))},{rootMargin:"0px 0px ".concat(l,"px 0px"),root:e}),r.observe(n)}catch(t){console.error(t),u()}return r}/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */function on(n,e){var u=_(),l=_(!0),r=function(){if(e.value){l.value=!1;var d=rn(n.value,null,function(){l.value=!0},0);u.value=d}};return ce(r),S([e,n],r),fe(function(){e.value&&u.value.unobserve(n.value)}),{showCheckbox:l}}/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */function dn(n){var e=function(t){var d=F.test(t.key)||F.test(t.code);if(d){t.preventDefault();var g=t.currentTarget.querySelector("input"),m=g.disabled;!m&&n(t)}},u=function(t){t.currentTarget.addEventListener("keydown",e)},l=function(t){t.currentTarget.removeEventListener("keydown",e)};return{onCheckboxFocus:u,onCheckboxBlur:l}}/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */function U(n,e){var u=Object.keys(n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(n);e&&(l=l.filter(function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})),u.push.apply(u,l)}return u}function K(n){for(var e=1;e<arguments.length;e++){var u=arguments[e]!=null?arguments[e]:{};e%2?U(Object(u),!0).forEach(function(l){R(n,l,u[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(u)):U(Object(u)).forEach(function(l){Object.defineProperty(n,l,Object.getOwnPropertyDescriptor(u,l))})}return n}var ne=J({name:"TCheckbox",props:K(K({},tn),{},{needRipple:Boolean,stopLabelTrigger:Boolean,index:Number,data:Object}),setup:function(e){var u=_();e.needRipple&&ve(u);var l=se(),r=l.STATUS,t=q(e),d=t.checked,g=t.modelValue,m=t.lazyLoad,x=X(d,g,e.defaultChecked,e.onChange,"checked"),v=Q(x,2),p=v[0],h=v[1],a=W(ee,void 0),b=_();S(function(){return[e.name,a?.value.name].join("_")},function(){var y=e.name||a?.value.name;y&&(b.value=y)},{immediate:!0});var k=_(!1),B=function(){var w=e.value,E=e.checkAll;return E?a?.value.isCheckAll:a!=null&&a.value?a.value.checkedValues.includes(w):p.value};S(function(){var y;return[p.value,a?.value.isCheckAll,a==null||(y=a.value.checkedValues)===null||y===void 0?void 0:y.join(",")]},function(){k.value=B()},{immediate:!0});var D=C(function(){return!e.checkAll&&!k.value&&a!==null&&a!==void 0&&a.value.maxExceeded?!0:null}),T=C(function(){return a?.value.disabled}),O=he({beforeDisabled:D,afterDisabled:T}),M=C(function(){return a?.value.readonly}),V=we({afterReadonly:M}),A=_(!1);S(function(){return[e.checkAll,e.indeterminate,a?.value.indeterminate]},function(){A.value=e.checkAll?a?.value.indeterminate:e.indeterminate},{immediate:!0});var c=Y("checkbox"),i=_({});S([k,O,A],function(){i.value=["".concat(c.value),R(R(R({},r.value.checked,k.value),r.value.disabled,O.value),r.value.indeterminate,A.value)]},{immediate:!0});var o=function(w){if(!V.value){var E=!k.value;h(E,{e:w}),a!=null&&a.value.handleCheckboxChange&&a.value.onCheckedChange({checked:E,checkAll:e.checkAll,e:w,option:e})}},s=ke(),f=function(w){e.stopLabelTrigger&&w.preventDefault()},j=on(u,m),L=j.showCheckbox,P=dn(o),ae=P.onCheckboxFocus,ue=P.onCheckboxBlur;return function(){var y=be(e.title)&&e.title?e.title:null;return I("label",{ref:u,class:i.value,tabindex:O.value?void 0:"0",onFocus:ae,onBlur:ue,title:y},[L.value?[I("input",{type:"checkbox",tabindex:"-1",class:"".concat(c.value,"__former"),disabled:O.value,readonly:V.value,indeterminate:A.value,name:b.value,value:e.value?e.value:void 0,checked:k.value,onChange:o,key:"input"},null),I("span",{class:"".concat(c.value,"__input"),key:"input-span"},null),I("span",{class:"".concat(c.value,"__label"),key:"label",onClick:f},[s("default","label")])]:null])}}});/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var cn={disabled:{type:Boolean,default:void 0},lazyLoad:Boolean,max:{type:Number,default:void 0},name:{type:String,default:""},options:{type:Array},readonly:{type:Boolean,default:void 0},value:{type:Array,default:void 0},modelValue:{type:Array,default:void 0},defaultValue:{type:Array,default:function(){return[]}},onChange:Function};/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var fn=J({name:"TCheckboxGroup",props:cn,setup:function(e){var u=Y("checkbox-group"),l=me(),r=Array.isArray,t=q(e),d=t.value,g=t.modelValue,m=X(d,g,e.defaultValue,e.onChange),x=Q(m,2),v=x[0],p=x[1],h=_([]),a=C(function(){if(!r(v.value))return 0;var c=h.value.map(function(o){return o.value}),i=G(v.value,c);return i.length}),b=C(function(){var c=h.value.filter(function(o){return!o.disabled&&!o.readonly&&!o.checkAll}).map(function(o){return o.value}),i=G(c,v.value);return i.length===c.length}),k=C(function(){return!b.value&&a.value<h.value.length&&a.value!==0}),B=C(function(){return!Ae(e.max)&&v.value.length===e.max});ye(function(){if(!e.options)return[];h.value=e.options.map(function(c){return xe(c)?c:{label:String(c),value:c}})});var D=function(){for(var i=new Set,o=0,s=h.value.length;o<s;o++){var f=h.value[o];if(!f.checkAll&&!f.disabled&&!f.readonly&&(i.add(f.value),B.value))break}return $(i)},T=function(i,o){var s=i?D():[];p(s,{e:o.e,type:i?"check":"uncheck",current:void 0,option:void 0})},O=function(i){var o=i.option.value;if(!r(v.value)){console.warn("TDesign CheckboxGroup Warn: `value` must be an array, instead of ".concat(pe(v.value)));return}var s=$(v.value);if(i.checked)s.push(o);else{var f=s.indexOf(o);s.splice(f,1)}p(s,{e:i.e,current:i.option.value,option:i.option,type:i.checked?"check":"uncheck"})},M=function(i){var o=i.checked,s=i.checkAll,f=i.e;s?T(o,{e:f}):O(i)},V=_e(),A=function(){var i=V("Checkbox"),o=[];return i?.forEach(function(s){var f=s.props;f&&((f["check-all"]===""||f["check-all"]===!0)&&(f.checkAll=!0),o.push(f))}),o};return Ce(ee,C(function(){return{name:e.name,isCheckAll:b.value,checkedValues:v.value||[],maxExceeded:B.value,disabled:e.disabled,readonly:e.readonly,indeterminate:k.value,handleCheckboxChange:O,onCheckedChange:M}})),function(){var c,i=null;if((c=e.options)!==null&&c!==void 0&&c.length){var o;i=(o=h.value)===null||o===void 0?void 0:o.map(function(f,j){var L;return I(ne,ge({key:"".concat(f.value||"").concat(j),lazyLoad:e.lazyLoad},f,{index:j,checked:(L=v.value)===null||L===void 0?void 0:L.includes(f.value),data:f}),null)})}else{var s=l("default");h.value=A(),i=s}return I("div",{class:u.value,role:"group","aria-label":"checkbox-group"},[i])}}});/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var hn=Z(ne);Z(fn);export{hn as C,Ae as i,we as u};
