var _t=t=>{throw TypeError(t)};var st=(t,e,o)=>e.has(t)||_t("Cannot "+o);var w=(t,e,o)=>(st(t,e,"read from private field"),o?o.call(t):e.get(t)),q=(t,e,o)=>e.has(t)?_t("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),K=(t,e,o,a)=>(st(t,e,"write to private field"),a?a.call(t,o):e.set(t,o),o),W=(t,e,o)=>(st(t,e,"access private method"),o);import{ay as At,aB as Bt,aS as gt,aT as Ft,aL as It,Z as Ut,r as m,aD as qt,aM as Kt,Y as Wt,R as x,c as F}from"./index-CQFirLHe.js";import{t as Xt}from"./client-rn5FaoSj.js";var z,j,S,D,M,Z,ft,Ot,Ht=(Ot=class extends At{constructor(e,o){super();q(this,M);q(this,z);q(this,j);q(this,S);q(this,D);K(this,z,e),this.setOptions(o),this.bindMethods(),W(this,M,Z).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){var a;const o=this.options;this.options=w(this,z).defaultMutationOptions(e),Bt(this.options,o)||w(this,z).getMutationCache().notify({type:"observerOptionsUpdated",mutation:w(this,S),observer:this}),o!=null&&o.mutationKey&&this.options.mutationKey&&gt(o.mutationKey)!==gt(this.options.mutationKey)?this.reset():((a=w(this,S))==null?void 0:a.state.status)==="pending"&&w(this,S).setOptions(this.options)}onUnsubscribe(){var e;this.hasListeners()||(e=w(this,S))==null||e.removeObserver(this)}onMutationUpdate(e){W(this,M,Z).call(this),W(this,M,ft).call(this,e)}getCurrentResult(){return w(this,j)}reset(){var e;(e=w(this,S))==null||e.removeObserver(this),K(this,S,void 0),W(this,M,Z).call(this),W(this,M,ft).call(this)}mutate(e,o){var a;return K(this,D,o),(a=w(this,S))==null||a.removeObserver(this),K(this,S,w(this,z).getMutationCache().build(w(this,z),this.options)),w(this,S).addObserver(this),w(this,S).execute(e)}},z=new WeakMap,j=new WeakMap,S=new WeakMap,D=new WeakMap,M=new WeakSet,Z=function(){var o;const e=((o=w(this,S))==null?void 0:o.state)??Ft();K(this,j,{...e,isPending:e.status==="pending",isSuccess:e.status==="success",isError:e.status==="error",isIdle:e.status==="idle",mutate:this.mutate,reset:this.reset})},ft=function(e){It.batch(()=>{var o,a,r,n,s,f,c,u;if(w(this,D)&&this.hasListeners()){const d=w(this,j).variables,h=w(this,j).context,v={client:w(this,z),meta:this.options.meta,mutationKey:this.options.mutationKey};(e==null?void 0:e.type)==="success"?((a=(o=w(this,D)).onSuccess)==null||a.call(o,e.data,d,h,v),(n=(r=w(this,D)).onSettled)==null||n.call(r,e.data,null,d,h,v)):(e==null?void 0:e.type)==="error"&&((f=(s=w(this,D)).onError)==null||f.call(s,e.error,d,h,v),(u=(c=w(this,D)).onSettled)==null||u.call(c,void 0,e.error,d,h,v))}this.listeners.forEach(d=>{d(w(this,j))})})},Ot);function Yt(t,e){const o=Ut(),[a]=m.useState(()=>new Ht(o,t));m.useEffect(()=>{a.setOptions(t)},[a,t]);const r=m.useSyncExternalStore(m.useCallback(s=>a.subscribe(It.batchCalls(s)),[a]),()=>a.getCurrentResult(),()=>a.getCurrentResult()),n=m.useCallback((s,f)=>{a.mutate(s,f).catch(qt)},[a]);if(r.error&&Kt(a.options.throwOnError,[r.error]))throw r.error;return{...r,mutate:n,mutateAsync:r.mutate}}var nt={exports:{}},it,ht;function Vt(){if(ht)return it;ht=1;var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return it=t,it}var lt,bt;function Qt(){if(bt)return lt;bt=1;var t=Vt();function e(){}function o(){}return o.resetWarningCache=e,lt=function(){function a(s,f,c,u,d,h){if(h!==t){var v=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw v.name="Invariant Violation",v}}a.isRequired=a;function r(){return a}var n={array:a,bigint:a,bool:a,func:a,number:a,object:a,string:a,symbol:a,any:a,arrayOf:r,element:a,elementType:a,instanceOf:r,node:a,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:o,resetWarningCache:e};return n.PropTypes=n,n},lt}var vt;function Gt(){return vt||(vt=1,nt.exports=Qt()()),nt.exports}var Zt=Gt();const B=Wt(Zt);var Y=t=>typeof t=="number"&&!isNaN(t),U=t=>typeof t=="string",N=t=>typeof t=="function",Jt=t=>U(t)||Y(t),ct=t=>U(t)||N(t)?t:null,te=(t,e)=>t===!1||Y(t)&&t>0?t:e,dt=t=>m.isValidElement(t)||U(t)||N(t)||Y(t);function ee(t,e,o=300){let{scrollHeight:a,style:r}=t;requestAnimationFrame(()=>{r.minHeight="initial",r.height=a+"px",r.transition=`all ${o}ms`,requestAnimationFrame(()=>{r.height="0",r.padding="0",r.margin="0",setTimeout(e,o)})})}function oe({enter:t,exit:e,appendPosition:o=!1,collapse:a=!0,collapseDuration:r=300}){return function({children:n,position:s,preventExitTransition:f,done:c,nodeRef:u,isIn:d,playToast:h}){let v=o?`${t}--${s}`:t,E=o?`${e}--${s}`:e,C=m.useRef(0);return m.useLayoutEffect(()=>{let k=u.current,g=v.split(" "),_=i=>{i.target===u.current&&(h(),k.removeEventListener("animationend",_),k.removeEventListener("animationcancel",_),C.current===0&&i.type!=="animationcancel"&&k.classList.remove(...g))};k.classList.add(...g),k.addEventListener("animationend",_),k.addEventListener("animationcancel",_)},[]),m.useEffect(()=>{let k=u.current,g=()=>{k.removeEventListener("animationend",g),a?ee(k,c,r):c()};d||(f?g():(C.current=1,k.className+=` ${E}`,k.addEventListener("animationend",g)))},[d]),x.createElement(x.Fragment,null,n)}}function Tt(t,e){return{content:Ct(t.content,t.props),containerId:t.props.containerId,id:t.props.toastId,theme:t.props.theme,type:t.props.type,data:t.props.data||{},isLoading:t.props.isLoading,icon:t.props.icon,reason:t.removalReason,status:e}}function Ct(t,e,o=!1){return m.isValidElement(t)&&!U(t.type)?m.cloneElement(t,{closeToast:e.closeToast,toastProps:e,data:e.data,isPaused:o}):N(t)?t({closeToast:e.closeToast,toastProps:e,data:e.data,isPaused:o}):t}function ae({closeToast:t,theme:e,ariaLabel:o="close"}){return x.createElement("button",{className:`Toastify__close-button Toastify__close-button--${e}`,type:"button",onClick:a=>{a.stopPropagation(),t(!0)},"aria-label":o},x.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},x.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function re({delay:t,isRunning:e,closeToast:o,type:a="default",hide:r,className:n,controlledProgress:s,progress:f,rtl:c,isIn:u,theme:d}){let h=r||s&&f===0,v={animationDuration:`${t}ms`,animationPlayState:e?"running":"paused"};s&&(v.transform=`scaleX(${f})`);let E=F("Toastify__progress-bar",s?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${d}`,`Toastify__progress-bar--${a}`,{"Toastify__progress-bar--rtl":c}),C=N(n)?n({rtl:c,type:a,defaultClassName:E}):F(E,n),k={[s&&f>=1?"onTransitionEnd":"onAnimationEnd"]:s&&f<1?null:()=>{u&&o()}};return x.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":h},x.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${d} Toastify__progress-bar--${a}`}),x.createElement("div",{role:"progressbar","aria-hidden":h?"true":"false","aria-label":"notification timer","aria-valuenow":s?Math.round(f*100):void 0,"aria-valuemin":0,"aria-valuemax":100,className:C,style:v,...k}))}var se=1,Pt=()=>`${se++}`;function ne(t,e,o){let a=1,r=0,n=[],s=[],f=e,c=new Map,u=new Set,d=i=>(u.add(i),()=>u.delete(i)),h=()=>{s=Array.from(c.values()),u.forEach(i=>i())},v=({containerId:i,toastId:l,updateId:p})=>{let O=i?i!==t:t!==1,P=c.has(l)&&p==null;return O||P},E=(i,l)=>{c.forEach(p=>{var O;(l==null||l===p.props.toastId)&&((O=p.toggle)==null||O.call(p,i))})},C=i=>{var l,p;i.isActive&&((p=(l=i.props)==null?void 0:l.onClose)==null||p.call(l,i.removalReason),i.isActive=!1,o(Tt(i,"removed")))},k=i=>{if(i==null)c.forEach(C);else{let l=c.get(i);l&&C(l)}h()},g=()=>{r-=n.length,n=[]},_=i=>{var l,p;let{toastId:O,updateId:P}=i.props,y=P==null;i.staleId&&c.delete(i.staleId),i.isActive=!0,c.set(O,i),h(),o(Tt(i,y?"added":"updated")),y&&((p=(l=i.props).onOpen)==null||p.call(l))};return{id:t,props:f,observe:d,toggle:E,removeToast:k,toasts:c,clearQueue:g,buildToast:(i,l)=>{if(v(l))return;let{toastId:p,updateId:O,data:P,staleId:y,delay:T}=l,L=O==null;L&&r++;let R={...f,style:f.toastStyle,key:a++,...Object.fromEntries(Object.entries(l).filter(([Q,A])=>A!=null)),toastId:p,updateId:O,data:P,isIn:!1,className:ct(l.className||f.toastClassName),progressClassName:ct(l.progressClassName||f.progressClassName),autoClose:l.isLoading?!1:te(l.autoClose,f.autoClose),closeToast(Q){let A=c.get(p);A&&(A.removalReason=Q,k(p))},deleteToast(){if(c.get(p)!=null){if(c.delete(p),r--,r<0&&(r=0),n.length>0){_(n.shift());return}h()}}};R.closeButton=f.closeButton,l.closeButton===!1||dt(l.closeButton)?R.closeButton=l.closeButton:l.closeButton===!0&&(R.closeButton=dt(f.closeButton)?f.closeButton:!0);let $={content:i,props:R,staleId:y};f.limit&&f.limit>0&&r>f.limit&&L?n.push($):Y(T)?setTimeout(()=>{_($)},T):_($)},setProps(i){f=i},setToggle:(i,l)=>{let p=c.get(i);p&&(p.toggle=l)},isToastActive:i=>{var l;return(l=c.get(i))==null?void 0:l.isActive},getSnapshot:()=>s}}var I=new Map,H=[],ut=new Set,ie=t=>ut.forEach(e=>e(t)),St=()=>I.size>0;function le(){H.forEach(t=>Rt(t.content,t.options)),H=[]}var fe=(t,{containerId:e})=>{var o;return(o=I.get(e||1))==null?void 0:o.toasts.get(t)};function Lt(t,e){var o;if(e)return!!((o=I.get(e))!=null&&o.isToastActive(t));let a=!1;return I.forEach(r=>{r.isToastActive(t)&&(a=!0)}),a}function ce(t){if(!St()){H=H.filter(e=>t!=null&&e.options.toastId!==t);return}if(t==null||Jt(t))I.forEach(e=>{e.removeToast(t)});else if(t&&("containerId"in t||"id"in t)){let e=I.get(t.containerId);e?e.removeToast(t.id):I.forEach(o=>{o.removeToast(t.id)})}}var de=(t={})=>{I.forEach(e=>{e.props.limit&&(!t.containerId||e.id===t.containerId)&&e.clearQueue()})};function Rt(t,e){dt(t)&&(St()||H.push({content:t,options:e}),I.forEach(o=>{o.buildToast(t,e)}))}function ue(t){var e;(e=I.get(t.containerId||1))==null||e.setToggle(t.id,t.fn)}function $t(t,e){I.forEach(o=>{(e==null||!(e!=null&&e.containerId)||(e==null?void 0:e.containerId)===o.id)&&o.toggle(t,e==null?void 0:e.id)})}function pe(t){let e=t.containerId||1;return{subscribe(o){let a=ne(e,t,ie);I.set(e,a);let r=a.observe(o);return le(),()=>{r(),I.delete(e)}},setProps(o){var a;(a=I.get(e))==null||a.setProps(o)},getSnapshot(){var o;return(o=I.get(e))==null?void 0:o.getSnapshot()}}}function ye(t){return ut.add(t),()=>{ut.delete(t)}}function me(t){return t&&(U(t.toastId)||Y(t.toastId))?t.toastId:Pt()}function V(t,e){return Rt(t,e),e.toastId}function et(t,e){return{...e,type:e&&e.type||t,toastId:me(e)}}function ot(t){return(e,o)=>V(e,et(t,o))}function b(t,e){return V(t,et("default",e))}b.loading=(t,e)=>V(t,et("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...e}));function _e(t,{pending:e,error:o,success:a},r){let n;e&&(n=U(e)?b.loading(e,r):b.loading(e.render,{...r,...e}));let s={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},f=(u,d,h)=>{if(d==null){b.dismiss(n);return}let v={type:u,...s,...r,data:h},E=U(d)?{render:d}:d;return n?b.update(n,{...v,...E}):b(E.render,{...v,...E}),h},c=N(t)?t():t;return c.then(u=>f("success",a,u)).catch(u=>f("error",o,u)),c}b.promise=_e;b.success=ot("success");b.info=ot("info");b.error=ot("error");b.warning=ot("warning");b.warn=b.warning;b.dark=(t,e)=>V(t,et("default",{theme:"dark",...e}));function ge(t){ce(t)}b.dismiss=ge;b.clearWaitingQueue=de;b.isActive=Lt;b.update=(t,e={})=>{let o=fe(t,e);if(o){let{props:a,content:r}=o,n={delay:100,...a,...e,toastId:e.toastId||t,updateId:Pt()};n.toastId!==t&&(n.staleId=t);let s=n.render||r;delete n.render,V(s,n)}};b.done=t=>{b.update(t,{progress:1})};b.onChange=ye;b.play=t=>$t(!0,t);b.pause=t=>$t(!1,t);function he(t){var e;let{subscribe:o,getSnapshot:a,setProps:r}=m.useRef(pe(t)).current;r(t);let n=(e=m.useSyncExternalStore(o,a,a))==null?void 0:e.slice();function s(f){if(!n)return[];let c=new Map;return t.newestOnTop&&n.reverse(),n.forEach(u=>{let{position:d}=u.props;c.has(d)||c.set(d,[]),c.get(d).push(u)}),Array.from(c,u=>f(u[0],u[1]))}return{getToastToRender:s,isToastActive:Lt,count:n==null?void 0:n.length}}function be(t){let[e,o]=m.useState(!1),[a,r]=m.useState(!1),n=m.useRef(null),s=m.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:f,pauseOnHover:c,closeToast:u,onClick:d,closeOnClick:h}=t;ue({id:t.toastId,containerId:t.containerId,fn:o}),m.useEffect(()=>{if(t.pauseOnFocusLoss)return v(),()=>{E()}},[t.pauseOnFocusLoss]);function v(){document.hasFocus()||_(),window.addEventListener("focus",g),window.addEventListener("blur",_)}function E(){window.removeEventListener("focus",g),window.removeEventListener("blur",_)}function C(y){if(t.draggable===!0||t.draggable===y.pointerType){i();let T=n.current;s.canCloseOnClick=!0,s.canDrag=!0,T.style.transition="none",t.draggableDirection==="x"?(s.start=y.clientX,s.removalDistance=T.offsetWidth*(t.draggablePercent/100)):(s.start=y.clientY,s.removalDistance=T.offsetHeight*(t.draggablePercent===80?t.draggablePercent*1.5:t.draggablePercent)/100)}}function k(y){let{top:T,bottom:L,left:R,right:$}=n.current.getBoundingClientRect();y.pointerType==="mouse"&&t.pauseOnHover&&y.clientX>=R&&y.clientX<=$&&y.clientY>=T&&y.clientY<=L?_():g()}function g(){o(!0)}function _(){o(!1)}function i(){s.didMove=!1,document.addEventListener("pointermove",p),document.addEventListener("pointerup",O)}function l(){document.removeEventListener("pointermove",p),document.removeEventListener("pointerup",O)}function p(y){let T=n.current;if(s.canDrag&&T){s.didMove=!0,e&&_(),t.draggableDirection==="x"?s.delta=y.clientX-s.start:s.delta=y.clientY-s.start,s.start!==y.clientX&&(s.canCloseOnClick=!1);let L=t.draggableDirection==="x"?`${s.delta}px, var(--y)`:`0, calc(${s.delta}px + var(--y))`;T.style.transform=`translate3d(${L},0)`,T.style.opacity=`${1-Math.abs(s.delta/s.removalDistance)}`}}function O(){l();let y=n.current;if(s.canDrag&&s.didMove&&y){if(s.canDrag=!1,Math.abs(s.delta)>s.removalDistance){r(!0),t.closeToast(!0),t.collapseAll();return}y.style.transition="transform 0.2s, opacity 0.2s",y.style.removeProperty("transform"),y.style.removeProperty("opacity")}}let P={onPointerDown:C,onPointerUp:k};return f&&c&&(P.onMouseEnter=_,t.stacked||(P.onMouseLeave=g)),h&&(P.onClick=y=>{d&&d(y),s.canCloseOnClick&&u(!0)}),{playToast:g,pauseToast:_,isRunning:e,preventExitTransition:a,toastRef:n,eventHandlers:P}}var zt=typeof window<"u"?m.useLayoutEffect:m.useEffect,at=({theme:t,type:e,isLoading:o,...a})=>x.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:t==="colored"?"currentColor":`var(--toastify-icon-color-${e})`,...a});function ve(t){return x.createElement(at,{...t},x.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))}function Te(t){return x.createElement(at,{...t},x.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))}function xe(t){return x.createElement(at,{...t},x.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))}function ke(t){return x.createElement(at,{...t},x.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))}function we(){return x.createElement("div",{className:"Toastify__spinner"})}var pt={info:Te,warning:ve,success:xe,error:ke,spinner:we},Ee=t=>t in pt;function Oe({theme:t,type:e,isLoading:o,icon:a}){let r=null,n={theme:t,type:e};return a===!1||(N(a)?r=a({...n,isLoading:o}):m.isValidElement(a)?r=m.cloneElement(a,n):o?r=pt.spinner():Ee(e)&&(r=pt[e](n))),r}var Ie=t=>{let{isRunning:e,preventExitTransition:o,toastRef:a,eventHandlers:r,playToast:n}=be(t),{closeButton:s,children:f,autoClose:c,onClick:u,type:d,hideProgressBar:h,closeToast:v,transition:E,position:C,className:k,style:g,progressClassName:_,updateId:i,role:l,progress:p,rtl:O,toastId:P,deleteToast:y,isIn:T,isLoading:L,closeOnClick:R,theme:$,ariaLabel:Q}=t,A=F("Toastify__toast",`Toastify__toast-theme--${$}`,`Toastify__toast--${d}`,{"Toastify__toast--rtl":O},{"Toastify__toast--close-on-click":R}),jt=N(k)?k({rtl:O,position:C,type:d,defaultClassName:A}):F(A,k),yt=Oe(t),mt=!!p||!c,rt={closeToast:v,type:d,theme:$},G=null;return s===!1||(N(s)?G=s(rt):m.isValidElement(s)?G=m.cloneElement(s,rt):G=ae(rt)),x.createElement(E,{isIn:T,done:y,position:C,preventExitTransition:o,nodeRef:a,playToast:n},x.createElement("div",{id:P,tabIndex:0,onClick:u,"data-in":T,className:jt,...r,style:g,ref:a,...T&&{role:l,"aria-label":Q}},yt!=null&&x.createElement("div",{className:F("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!L})},yt),Ct(f,t,!e),G,!t.customProgressBar&&x.createElement(re,{...i&&!mt?{key:`p-${i}`}:{},rtl:O,theme:$,delay:c,isRunning:e,isIn:T,closeToast:v,hide:h,type:d,className:_,controlledProgress:mt,progress:p||0})))},Ce=(t,e=!1)=>({enter:`Toastify--animate Toastify__${t}-enter`,exit:`Toastify--animate Toastify__${t}-exit`,appendPosition:e}),Pe=oe(Ce("bounce",!0)),Se={position:"top-right",transition:Pe,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:t=>t.altKey&&t.code==="KeyT"};function Le(t){let e={...Se,...t},o=t.stacked,[a,r]=m.useState(!0),n=m.useRef(null),{getToastToRender:s,isToastActive:f,count:c}=he(e),{className:u,style:d,rtl:h,containerId:v,hotKeys:E}=e;function C(g){let _=F("Toastify__toast-container",`Toastify__toast-container--${g}`,{"Toastify__toast-container--rtl":h});return N(u)?u({position:g,rtl:h,defaultClassName:_}):F(_,ct(u))}function k(){o&&(r(!0),b.play())}return zt(()=>{var g;if(o){let _=n.current.querySelectorAll('[data-in="true"]'),i=12,l=(g=e.position)==null?void 0:g.includes("top"),p=0,O=0;Array.from(_).reverse().forEach((P,y)=>{let T=P;T.classList.add("Toastify__toast--stacked"),y>0&&(T.dataset.collapsed=`${a}`),T.dataset.pos||(T.dataset.pos=l?"top":"bot");let L=p*(a?.2:1)+(a?0:i*y),R=Math.max(.5,1-(a?O:0));T.style.setProperty("--y",`${l?L:L*-1}px`),T.style.setProperty("--g",`${i}`),T.style.setProperty("--s",`${R}`),p+=T.offsetHeight,O+=.025})}},[a,c,o]),m.useEffect(()=>{function g(_){var i;let l=n.current;E(_)&&((i=l==null?void 0:l.querySelector('[tabIndex="0"]'))==null||i.focus(),r(!1),b.pause()),_.key==="Escape"&&(document.activeElement===l||l!=null&&l.contains(document.activeElement))&&(r(!0),b.play())}return document.addEventListener("keydown",g),()=>{document.removeEventListener("keydown",g)}},[E]),x.createElement("section",{ref:n,className:"Toastify",id:v,onMouseEnter:()=>{o&&(r(!1),b.pause())},onMouseLeave:k,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":e["aria-label"]},s((g,_)=>{let i=_.length?{...d}:{...d,pointerEvents:"none"};return x.createElement("div",{tabIndex:-1,className:C(g),"data-stacked":o,style:i,key:`c-${g}`},_.map(({content:l,props:p})=>x.createElement(Ie,{...p,stacked:o,collapseAll:k,isIn:f(p.toastId,p.containerId),key:`t-${p.key}`},l)))}))}var Re=`:root {
  --toastify-color-light: #fff;
  --toastify-color-dark: #121212;
  --toastify-color-info: #3498db;
  --toastify-color-success: #07bc0c;
  --toastify-color-warning: #f1c40f;
  --toastify-color-error: hsl(6, 78%, 57%);
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);

  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);

  --toastify-container-width: fit-content;
  --toastify-toast-width: 320px;
  --toastify-toast-offset: 16px;
  --toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));
  --toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));
  --toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));
  --toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));
  --toastify-toast-background: #fff;
  --toastify-toast-padding: 14px;
  --toastify-toast-min-height: 64px;
  --toastify-toast-max-height: 800px;
  --toastify-toast-bd-radius: 6px;
  --toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  --toastify-font-family: sans-serif;
  --toastify-z-index: 9999;
  --toastify-text-color-light: #757575;
  --toastify-text-color-dark: #fff;

  /* Used only for colored theme */
  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #fff;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #fff;

  --toastify-spinner-color: #616161;
  --toastify-spinner-color-empty-area: #e0e0e0;
  --toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
  --toastify-color-progress-dark: #bb86fc;
  --toastify-color-progress-info: var(--toastify-color-info);
  --toastify-color-progress-success: var(--toastify-color-success);
  --toastify-color-progress-warning: var(--toastify-color-warning);
  --toastify-color-progress-error: var(--toastify-color-error);
  /* used to control the opacity of the progress trail */
  --toastify-color-progress-bgo: 0.2;
}

.Toastify__toast-container {
  z-index: var(--toastify-z-index);
  -webkit-transform: translate3d(0, 0, var(--toastify-z-index));
  position: fixed;
  width: var(--toastify-container-width);
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.Toastify__toast-container--top-left {
  top: var(--toastify-toast-top);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--top-center {
  top: var(--toastify-toast-top);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--top-right {
  top: var(--toastify-toast-top);
  right: var(--toastify-toast-right);
  align-items: end;
}
.Toastify__toast-container--bottom-left {
  bottom: var(--toastify-toast-bottom);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--bottom-center {
  bottom: var(--toastify-toast-bottom);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--bottom-right {
  bottom: var(--toastify-toast-bottom);
  right: var(--toastify-toast-right);
  align-items: end;
}

.Toastify__toast {
  --y: 0px;
  position: relative;
  touch-action: none;
  width: var(--toastify-toast-width);
  min-height: var(--toastify-toast-min-height);
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: var(--toastify-toast-padding);
  border-radius: var(--toastify-toast-bd-radius);
  box-shadow: var(--toastify-toast-shadow);
  max-height: var(--toastify-toast-max-height);
  font-family: var(--toastify-font-family);
  /* webkit only issue #791 */
  z-index: 0;
  /* inner swag */
  display: flex;
  flex: 1 auto;
  align-items: center;
  word-break: break-word;
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container {
    width: 100vw;
    left: env(safe-area-inset-left);
    margin: 0;
  }
  .Toastify__toast-container--top-left,
  .Toastify__toast-container--top-center,
  .Toastify__toast-container--top-right {
    top: env(safe-area-inset-top);
    transform: translateX(0);
  }
  .Toastify__toast-container--bottom-left,
  .Toastify__toast-container--bottom-center,
  .Toastify__toast-container--bottom-right {
    bottom: env(safe-area-inset-bottom);
    transform: translateX(0);
  }
  .Toastify__toast-container--rtl {
    right: env(safe-area-inset-right);
    left: initial;
  }
  .Toastify__toast {
    --toastify-toast-width: 100%;
    margin-bottom: 0;
    border-radius: 0;
  }
}

.Toastify__toast-container[data-stacked='true'] {
  width: var(--toastify-toast-width);
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container[data-stacked='true'] {
    width: 100vw;
  }
}

.Toastify__toast--stacked {
  position: absolute;
  width: 100%;
  transform: translate3d(0, var(--y), 0) scale(var(--s));
  transition: transform 0.3s;
}

.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,
.Toastify__toast--stacked[data-collapsed] .Toastify__close-button {
  transition: opacity 0.1s;
}

.Toastify__toast--stacked[data-collapsed='false'] {
  overflow: visible;
}

.Toastify__toast--stacked[data-collapsed='true']:not(:last-child) > * {
  opacity: 0;
}

.Toastify__toast--stacked:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: calc(var(--g) * 1px);
  bottom: 100%;
}

.Toastify__toast--stacked[data-pos='top'] {
  top: 0;
}

.Toastify__toast--stacked[data-pos='bot'] {
  bottom: 0;
}

.Toastify__toast--stacked[data-pos='bot'].Toastify__toast--stacked:before {
  transform-origin: top;
}

.Toastify__toast--stacked[data-pos='top'].Toastify__toast--stacked:before {
  transform-origin: bottom;
}

.Toastify__toast--stacked:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  transform: scaleY(3);
  z-index: -1;
}

.Toastify__toast--rtl {
  direction: rtl;
}

.Toastify__toast--close-on-click {
  cursor: pointer;
}

.Toastify__toast-icon {
  margin-inline-end: 10px;
  width: 22px;
  flex-shrink: 0;
  display: flex;
}

.Toastify--animate {
  animation-fill-mode: both;
  animation-duration: 0.5s;
}

.Toastify--animate-icon {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}

.Toastify__toast-theme--dark {
  background: var(--toastify-color-dark);
  color: var(--toastify-text-color-dark);
}

.Toastify__toast-theme--light {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--default {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--info {
  color: var(--toastify-text-color-info);
  background: var(--toastify-color-info);
}

.Toastify__toast-theme--colored.Toastify__toast--success {
  color: var(--toastify-text-color-success);
  background: var(--toastify-color-success);
}

.Toastify__toast-theme--colored.Toastify__toast--warning {
  color: var(--toastify-text-color-warning);
  background: var(--toastify-color-warning);
}

.Toastify__toast-theme--colored.Toastify__toast--error {
  color: var(--toastify-text-color-error);
  background: var(--toastify-color-error);
}

.Toastify__progress-bar-theme--light {
  background: var(--toastify-color-progress-light);
}

.Toastify__progress-bar-theme--dark {
  background: var(--toastify-color-progress-dark);
}

.Toastify__progress-bar--info {
  background: var(--toastify-color-progress-info);
}

.Toastify__progress-bar--success {
  background: var(--toastify-color-progress-success);
}

.Toastify__progress-bar--warning {
  background: var(--toastify-color-progress-warning);
}

.Toastify__progress-bar--error {
  background: var(--toastify-color-progress-error);
}

.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
  background: var(--toastify-color-transparent);
}

.Toastify__close-button {
  color: #fff;
  position: absolute;
  top: 6px;
  right: 6px;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s ease;
  z-index: 1;
}

.Toastify__toast--rtl .Toastify__close-button {
  left: 6px;
  right: unset;
}

.Toastify__close-button--light {
  color: #000;
  opacity: 0.3;
}

.Toastify__close-button > svg {
  fill: currentColor;
  height: 16px;
  width: 14px;
}

.Toastify__close-button:hover,
.Toastify__close-button:focus {
  opacity: 1;
}

@keyframes Toastify__trackProgress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

.Toastify__progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.7;
  transform-origin: left;
}

.Toastify__progress-bar--animated {
  animation: Toastify__trackProgress linear 1 forwards;
}

.Toastify__progress-bar--controlled {
  transition: transform 0.2s;
}

.Toastify__progress-bar--rtl {
  right: 0;
  left: initial;
  transform-origin: right;
  border-bottom-left-radius: initial;
}

.Toastify__progress-bar--wrp {
  position: absolute;
  overflow: hidden;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  border-bottom-left-radius: var(--toastify-toast-bd-radius);
  border-bottom-right-radius: var(--toastify-toast-bd-radius);
}

.Toastify__progress-bar--wrp[data-hidden='true'] {
  opacity: 0;
}

.Toastify__progress-bar--bg {
  opacity: var(--toastify-color-progress-bgo);
  width: 100%;
  height: 100%;
}

.Toastify__spinner {
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: var(--toastify-spinner-color-empty-area);
  border-right-color: var(--toastify-spinner-color);
  animation: Toastify__spin 0.65s linear infinite;
}

@keyframes Toastify__bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    transform: translate3d(10px, 0, 0);
  }
  90% {
    transform: translate3d(-5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutRight {
  20% {
    opacity: 1;
    transform: translate3d(-20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInLeft {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(-3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0);
  }
  75% {
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    transform: translate3d(5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutLeft {
  20% {
    opacity: 1;
    transform: translate3d(20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(-2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
  75% {
    transform: translate3d(0, 10px, 0);
  }
  90% {
    transform: translate3d(0, -5px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes Toastify__bounceOutUp {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }
}

@keyframes Toastify__bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutDown {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
}

.Toastify__bounce-enter--top-left,
.Toastify__bounce-enter--bottom-left {
  animation-name: Toastify__bounceInLeft;
}

.Toastify__bounce-enter--top-right,
.Toastify__bounce-enter--bottom-right {
  animation-name: Toastify__bounceInRight;
}

.Toastify__bounce-enter--top-center {
  animation-name: Toastify__bounceInDown;
}

.Toastify__bounce-enter--bottom-center {
  animation-name: Toastify__bounceInUp;
}

.Toastify__bounce-exit--top-left,
.Toastify__bounce-exit--bottom-left {
  animation-name: Toastify__bounceOutLeft;
}

.Toastify__bounce-exit--top-right,
.Toastify__bounce-exit--bottom-right {
  animation-name: Toastify__bounceOutRight;
}

.Toastify__bounce-exit--top-center {
  animation-name: Toastify__bounceOutUp;
}

.Toastify__bounce-exit--bottom-center {
  animation-name: Toastify__bounceOutDown;
}

@keyframes Toastify__zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

@keyframes Toastify__zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: translate3d(0, var(--y), 0) scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 0;
  }
}

.Toastify__zoom-enter {
  animation-name: Toastify__zoomIn;
}

.Toastify__zoom-exit {
  animation-name: Toastify__zoomOut;
}

@keyframes Toastify__flipIn {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

@keyframes Toastify__flipOut {
  from {
    transform: translate3d(0, var(--y), 0) perspective(400px);
  }
  30% {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }
  to {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}

.Toastify__flip-enter {
  animation-name: Toastify__flipIn;
}

.Toastify__flip-exit {
  animation-name: Toastify__flipOut;
}

@keyframes Toastify__slideInRight {
  from {
    transform: translate3d(110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInLeft {
  from {
    transform: translate3d(-110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInUp {
  from {
    transform: translate3d(0, 110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInDown {
  from {
    transform: translate3d(0, -110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideOutRight {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutLeft {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(-110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutDown {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, 500px, 0);
  }
}

@keyframes Toastify__slideOutUp {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, -500px, 0);
  }
}

.Toastify__slide-enter--top-left,
.Toastify__slide-enter--bottom-left {
  animation-name: Toastify__slideInLeft;
}

.Toastify__slide-enter--top-right,
.Toastify__slide-enter--bottom-right {
  animation-name: Toastify__slideInRight;
}

.Toastify__slide-enter--top-center {
  animation-name: Toastify__slideInDown;
}

.Toastify__slide-enter--bottom-center {
  animation-name: Toastify__slideInUp;
}

.Toastify__slide-exit--top-left,
.Toastify__slide-exit--bottom-left {
  animation-name: Toastify__slideOutLeft;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-right,
.Toastify__slide-exit--bottom-right {
  animation-name: Toastify__slideOutRight;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-center {
  animation-name: Toastify__slideOutUp;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--bottom-center {
  animation-name: Toastify__slideOutDown;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

@keyframes Toastify__spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`,xt=new Map,$e=(t,e)=>{zt(()=>{if(typeof document>"u")return;let o=document,a=xt.get(o);if(a){e&&a.setAttribute("nonce",e);return}let r=o.createElement("style");r.textContent=t,e&&r.setAttribute("nonce",e),o.head.appendChild(r),xt.set(o,r)},[e])};function ao(t){return $e(Re,t.nonce),x.createElement(Le,{...t})}var ze={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},De=Object.defineProperty,Me=Object.defineProperties,Ne=Object.getOwnPropertyDescriptors,J=Object.getOwnPropertySymbols,Dt=Object.prototype.hasOwnProperty,Mt=Object.prototype.propertyIsEnumerable,kt=(t,e,o)=>e in t?De(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,wt=(t,e)=>{for(var o in e||(e={}))Dt.call(e,o)&&kt(t,o,e[o]);if(J)for(var o of J(e))Mt.call(e,o)&&kt(t,o,e[o]);return t},je=(t,e)=>Me(t,Ne(e)),Ae=(t,e)=>{var o={};for(var a in t)Dt.call(t,a)&&e.indexOf(a)<0&&(o[a]=t[a]);if(t!=null&&J)for(var a of J(t))e.indexOf(a)<0&&Mt.call(t,a)&&(o[a]=t[a]);return o},ro=(t,e,o)=>{const a=m.forwardRef((r,n)=>{var s=r,{color:f="currentColor",size:c=24,stroke:u=2,children:d}=s,h=Ae(s,["color","size","stroke","children"]);return m.createElement("svg",wt(je(wt({ref:n},ze),{width:c,height:c,stroke:f,strokeWidth:u,className:`tabler-icon tabler-icon-${t}`}),h),[...o.map(([v,E])=>m.createElement(v,E)),...d||[]])});return a.propTypes={color:B.string,size:B.oneOfType([B.string,B.number]),stroke:B.oneOfType([B.string,B.number])},a.displayName=`${e}`,a},Be=typeof global=="object"&&global&&global.Object===Object&&global,Fe=typeof self=="object"&&self&&self.Object===Object&&self,Ue=Be||Fe||Function("return this")(),tt=Ue.Symbol,Nt=Object.prototype,qe=Nt.hasOwnProperty,Ke=Nt.toString,X=tt?tt.toStringTag:void 0;function We(t){var e=qe.call(t,X),o=t[X];try{t[X]=void 0;var a=!0}catch{}var r=Ke.call(t);return a&&(e?t[X]=o:delete t[X]),r}var Xe=Object.prototype,He=Xe.toString;function Ye(t){return He.call(t)}var Ve="[object Null]",Qe="[object Undefined]",Et=tt?tt.toStringTag:void 0;function Ge(t){return t==null?t===void 0?Qe:Ve:Et&&Et in Object(t)?We(t):Ye(t)}function Ze(t){return t!=null&&typeof t=="object"}var Je="[object Symbol]";function so(t){return typeof t=="symbol"||Ze(t)&&Ge(t)==Je}function no(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}function io(t){return Yt({mutationFn:async({url:e,method:o="post",data:a,config:r,headers:n})=>{const s=a instanceof FormData;return await Xt.request({url:e,method:o,data:a,headers:{...s?{}:{"Content-Type":"application/json"},...n},...r})},...t})}export{B as P,tt as S,no as a,Ge as b,ro as c,Ze as d,Be as f,so as i,Ue as r,io as u,ao as x,b as y};
