import{aD as g,ap as y,y as q,k as N,aE as P,q as F,aF as O,i as B,b as H,h as w,a as W,az as Y,H as j,r as z,s as C,e as T,g as L,j as S,p as k,f as I,A as M,R as A,T as Z,Y as G,Z as J}from"./utils.BRJKUTqf.js";let R=!1;function K(){R||(R=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var r;if(!e.defaultPrevented)for(const s of e.target.elements)(r=s.__on_r)==null||r.call(s)})},{capture:!0}))}function m(e){var r=q,s=N;g(null),y(null);try{return e()}finally{g(r),y(s)}}function ee(e,r,s,a=s){e.addEventListener(r,()=>m(s));const n=e.__on_r;n?e.__on_r=()=>{n(),a(!0)}:e.__on_r=()=>a(!0),K()}const Q=new Set,U=new Set;function V(e,r,s,a){function n(t){if(a.capture||X.call(r,t),!t.cancelBubble)return m(()=>s.call(this,t))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?F(()=>{r.addEventListener(e,n,a)}):r.addEventListener(e,n,a),n}function re(e,r,s,a,n){var t={capture:a,passive:n},u=V(e,r,s,t);(r===document.body||r===window||r===document)&&P(()=>{r.removeEventListener(e,u,t)})}function te(e){for(var r=0;r<e.length;r++)Q.add(e[r]);for(var s of U)s(e)}function X(e){var E;var r=this,s=r.ownerDocument,a=e.type,n=((E=e.composedPath)==null?void 0:E.call(e))||[],t=n[0]||e.target,u=0,_=e.__root;if(_){var f=n.indexOf(_);if(f!==-1&&(r===document||r===window)){e.__root=r;return}var d=n.indexOf(r);if(d===-1)return;f<=d&&(u=f)}if(t=n[u]||e.target,t!==r){O(e,"currentTarget",{configurable:!0,get(){return t||s}});var v=q,o=N;g(null),y(null);try{for(var i,l=[];t!==null;){var c=t.assignedSlot||t.parentNode||t.host||null;try{var b=t["__"+a];if(b!==void 0&&!t.disabled)if(B(b)){var[x,...D]=b;x.apply(t,[e,...D])}else b.call(t,e)}catch(h){i?l.push(h):i=h}if(e.cancelBubble||c===r||c===null)break;t=c}if(i){for(let h of l)queueMicrotask(()=>{throw h});throw i}}finally{e.__root=r,delete e.currentTarget,g(v),y(o)}}}function ae(e,r,s=!1){w&&W();var a=e,n=null,t=null,u=null,_=s?Y:0,f=!1;const d=(o,i=!0)=>{f=!0,v(i,o)},v=(o,i)=>{if(u===(u=o))return;let l=!1;if(w){const c=a.data===j;u===c&&(a=z(),C(a),T(!1),l=!0)}u?(n?L(n):i&&(n=S(()=>i(a))),t&&k(t,()=>{t=null})):(t?L(t):i&&(t=S(()=>i(a))),n&&k(n,()=>{n=null})),l&&T(!0)};H(()=>{f=!1,r(d),f||v(null,null)},_),w&&(a=I)}let p=!1;function se(e,r,s){const a=s[r]??(s[r]={store:null,source:M(void 0),unsubscribe:A});if(a.store!==e)if(a.unsubscribe(),a.store=e??null,e==null)a.source.v=void 0,a.unsubscribe=A;else{var n=!0;a.unsubscribe=Z(e,t=>{n?a.source.v=t:J(a.source,t)}),n=!1}return G(a.source)}function ne(){const e={};return P(()=>{for(var r in e)e[r].unsubscribe()}),e}function ie(e,r,s){return e.set(s),r}function ue(e){var r=p;try{return p=!1,[e(),p]}finally{p=r}}export{Q as a,K as b,ue as c,te as d,se as e,ie as f,re as g,X as h,ae as i,ee as l,U as r,ne as s};