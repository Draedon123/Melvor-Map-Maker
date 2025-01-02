var Mt=Array.isArray,Lt=Array.from,Ht=Object.defineProperty,pn=Object.getOwnPropertyDescriptor,Xn=Object.getOwnPropertyDescriptors,Yt=Object.prototype,jt=Array.prototype,Qn=Object.getPrototypeOf;const nt=()=>{};function Bt(n){return typeof(n==null?void 0:n.then)=="function"}function Ut(n){return n()}function wn(n){for(var t=0;t<n.length;t++)n[t]()}const y=2,mn=4,Y=8,an=16,T=32,J=64,tn=128,I=256,G=512,h=1024,x=2048,j=4096,b=8192,N=16384,tt=32768,Tn=65536,Vt=1<<17,rt=1<<19,An=1<<20,hn=Symbol("$state"),Gt=Symbol("legacy props"),Kt=Symbol("");function gn(n){return n===this.v}function et(n,t){return n!=n?t==t:n!==t||n!==null&&typeof n=="object"||typeof n=="function"}function xn(n){return!et(n,this.v)}function st(n){throw new Error("effect_in_teardown")}function lt(){throw new Error("effect_in_unowned_derived")}function ut(n){throw new Error("effect_orphan")}function at(){throw new Error("effect_update_depth_exceeded")}function $t(){throw new Error("hydration_failed")}function Zt(n){throw new Error("props_invalid_value")}function zt(){throw new Error("state_descriptors_fixed")}function Jt(){throw new Error("state_prototype_fixed")}function ot(){throw new Error("state_unsafe_local_read")}function it(){throw new Error("state_unsafe_mutation")}let W=!1;function Wt(){W=!0}function on(n){return{f:0,v:n,reactions:null,equals:gn,version:0}}function Xt(n){return ft(on(n))}function Qt(n,t=!1){var e;const r=on(n);return t||(r.equals=xn),W&&o!==null&&o.l!==null&&((e=o.l).s??(e.s=[])).push(r),r}function ft(n){return i!==null&&i.f&y&&(m===null?It([n]):m.push(n)),n}function nr(n,t){return i!==null&&cn()&&i.f&(y|an)&&(m===null||!m.includes(n))&&it(),_t(n,t)}function _t(n,t){return n.equals(t)||(n.v=t,n.version=Gn(),Sn(n,x),cn()&&a!==null&&a.f&h&&!(a.f&T)&&(v!==null&&v.includes(n)?(A(a,x),nn(a)):g===null?Rt([n]):g.push(n))),t}function Sn(n,t){var r=n.reactions;if(r!==null)for(var e=cn(),s=r.length,l=0;l<s;l++){var u=r[l],f=u.f;f&x||!e&&u===a||(A(u,t),f&(h|I)&&(f&y?Sn(u,j):nn(u)))}}function kn(n){console.warn("hydration_mismatch")}const tr=1,rr=2,er=4,sr=8,lr=16,ur=1,ar=2,or=4,ir=8,fr=16,_r=1,cr=2,ct="[",vt="[!",pt="]",In={},vr=Symbol(),pr="http://www.w3.org/2000/svg";let k=!1;function hr(n){k=n}let w;function F(n){if(n===null)throw kn(),In;return w=n}function dr(){return F(R(w))}function Er(n){if(k){if(R(w)!==null)throw kn(),In;w=n}}function yr(n=1){if(k){for(var t=n,r=w;t--;)r=R(r);w=r}}function wr(){for(var n=0,t=w;;){if(t.nodeType===8){var r=t.data;if(r===pt){if(n===0)return t;n-=1}else(r===ct||r===vt)&&(n+=1)}var e=R(t);t.remove(),t=e}}var dn,ht,Rn,Dn;function mr(){if(dn===void 0){dn=window,ht=document;var n=Element.prototype,t=Node.prototype;Rn=pn(t,"firstChild").get,Dn=pn(t,"nextSibling").get,n.__click=void 0,n.__className="",n.__attributes=null,n.__styles=null,n.__e=void 0,Text.prototype.__t=void 0}}function rn(n=""){return document.createTextNode(n)}function en(n){return Rn.call(n)}function R(n){return Dn.call(n)}function Tr(n,t){if(!k)return en(n);var r=en(w);if(r===null)r=w.appendChild(rn());else if(t&&r.nodeType!==3){var e=rn();return r==null||r.before(e),F(e),e}return F(r),r}function Ar(n,t){if(!k){var r=en(n);return r instanceof Comment&&r.data===""?R(r):r}return w}function gr(n,t=1,r=!1){let e=k?w:n;for(var s;t--;)s=e,e=R(e);if(!k)return e;var l=e==null?void 0:e.nodeType;if(r&&l!==3){var u=rn();return e===null?s==null||s.after(u):e.before(u),F(u),u}return F(e),e}function xr(n){n.textContent=""}function dt(n){var t=y|x;a===null?t|=I:a.f|=An;var r=i!==null&&i.f&y?i:null;const e={children:null,ctx:o,deps:null,equals:gn,f:t,fn:n,reactions:null,v:null,version:0,parent:r??a};return r!==null&&(r.children??(r.children=[])).push(e),e}function Sr(n){const t=dt(n);return t.equals=xn,t}function On(n){var t=n.children;if(t!==null){n.children=null;for(var r=0;r<t.length;r+=1){var e=t[r];e.f&y?fn(e):P(e)}}}function Et(n){for(var t=n.parent;t!==null;){if(!(t.f&y))return t;t=t.parent}return null}function Cn(n){var t,r=a;z(Et(n));try{On(n),t=Kn(n)}finally{z(r)}return t}function bn(n){var t=Cn(n),r=(D||n.f&I)&&n.deps!==null?j:h;A(n,r),n.equals(t)||(n.v=t,n.version=Gn())}function fn(n){On(n),H(n,0),A(n,N),n.v=n.children=n.deps=n.ctx=n.reactions=null}function Nn(n){a===null&&i===null&&ut(),i!==null&&i.f&I&&lt(),_n&&st()}function yt(n,t){var r=t.last;r===null?t.last=t.first=n:(r.next=n,n.prev=r,t.last=n)}function q(n,t,r,e=!0){var s=(n&J)!==0,l=a,u={ctx:o,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:n|x,first:null,fn:t,last:null,next:null,parent:s?null:l,prev:null,teardown:null,transitions:null,version:0};if(r){var f=O;try{En(!0),Q(u),u.f|=tt}catch(_){throw P(u),_}finally{En(f)}}else t!==null&&nn(u);var p=r&&u.deps===null&&u.first===null&&u.nodes_start===null&&u.teardown===null&&(u.f&An)===0;if(!p&&!s&&e&&(l!==null&&yt(u,l),i!==null&&i.f&y)){var d=i;(d.children??(d.children=[])).push(u)}return u}function kr(n){const t=q(Y,null,!1);return A(t,h),t.teardown=n,t}function Ir(n){Nn();var t=a!==null&&(a.f&T)!==0&&o!==null&&!o.m;if(t){var r=o;(r.e??(r.e=[])).push({fn:n,effect:a,reaction:i})}else{var e=qn(n);return e}}function Rr(n){return Nn(),wt(n)}function Dr(n){const t=q(J,n,!0);return()=>{P(t)}}function qn(n){return q(mn,n,!1)}function wt(n){return q(Y,n,!0)}function Or(n){return mt(n)}function mt(n,t=0){return q(Y|an|t,n,!0)}function Cr(n,t=!0){return q(Y|T,n,!0,t)}function Pn(n){var t=n.teardown;if(t!==null){const r=_n,e=i;yn(!0),Z(null);try{t.call(null)}finally{yn(r),Z(e)}}}function Fn(n){var t=n.deriveds;if(t!==null){n.deriveds=null;for(var r=0;r<t.length;r+=1)fn(t[r])}}function Mn(n,t=!1){var r=n.first;for(n.first=n.last=null;r!==null;){var e=r.next;P(r,t),r=e}}function Tt(n){for(var t=n.first;t!==null;){var r=t.next;t.f&T||P(t),t=r}}function P(n,t=!0){var r=!1;if((t||n.f&rt)&&n.nodes_start!==null){for(var e=n.nodes_start,s=n.nodes_end;e!==null;){var l=e===s?null:R(e);e.remove(),e=l}r=!0}Mn(n,t&&!r),Fn(n),H(n,0),A(n,N);var u=n.transitions;if(u!==null)for(const p of u)p.stop();Pn(n);var f=n.parent;f!==null&&f.first!==null&&Ln(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.fn=n.nodes_start=n.nodes_end=null}function Ln(n){var t=n.parent,r=n.prev,e=n.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),t!==null&&(t.first===n&&(t.first=e),t.last===n&&(t.last=r))}function br(n,t){var r=[];Hn(n,r,!0),At(r,()=>{P(n),t&&t()})}function At(n,t){var r=n.length;if(r>0){var e=()=>--r||t();for(var s of n)s.out(e)}else t()}function Hn(n,t,r){if(!(n.f&b)){if(n.f^=b,n.transitions!==null)for(const u of n.transitions)(u.is_global||r)&&t.push(u);for(var e=n.first;e!==null;){var s=e.next,l=(e.f&Tn)!==0||(e.f&T)!==0;Hn(e,t,l?r:!1),e=s}}}function Nr(n){Yn(n,!0)}function Yn(n,t){if(n.f&b){B(n)&&Q(n),n.f^=b;for(var r=n.first;r!==null;){var e=r.next,s=(r.f&Tn)!==0||(r.f&T)!==0;Yn(r,s?t:!1),r=e}if(n.transitions!==null)for(const l of n.transitions)(l.is_global||t)&&l.in()}}const gt=typeof requestIdleCallback>"u"?n=>setTimeout(n,1):requestIdleCallback;let K=!1,$=!1,sn=[],ln=[];function jn(){K=!1;const n=sn.slice();sn=[],wn(n)}function Bn(){$=!1;const n=ln.slice();ln=[],wn(n)}function qr(n){K||(K=!0,queueMicrotask(jn)),sn.push(n)}function Pr(n){$||($=!0,gt(Bn)),ln.push(n)}function xt(){K&&jn(),$&&Bn()}function St(n){throw new Error("lifecycle_outside_component")}const Un=0,kt=1;let U=!1,V=Un,M=!1,L=null,O=!1,_n=!1;function En(n){O=n}function yn(n){_n=n}let S=[],C=0;let i=null;function Z(n){i=n}let a=null;function z(n){a=n}let m=null;function It(n){m=n}let v=null,E=0,g=null;function Rt(n){g=n}let Vn=0,D=!1,o=null;function Fr(n){o=n}function Gn(){return++Vn}function cn(){return!W||o!==null&&o.l===null}function B(n){var u,f;var t=n.f;if(t&x)return!0;if(t&j){var r=n.deps,e=(t&I)!==0;if(r!==null){var s;if(t&G){for(s=0;s<r.length;s++)((u=r[s]).reactions??(u.reactions=[])).push(n);n.f^=G}for(s=0;s<r.length;s++){var l=r[s];if(B(l)&&bn(l),e&&a!==null&&!D&&!((f=l==null?void 0:l.reactions)!=null&&f.includes(n))&&(l.reactions??(l.reactions=[])).push(n),l.version>n.version)return!0}}e||A(n,h)}return!1}function Dt(n,t){for(var r=t;r!==null;){if(r.f&tn)try{r.fn(n);return}catch{r.f^=tn}r=r.parent}throw U=!1,n}function Ot(n){return(n.f&N)===0&&(n.parent===null||(n.parent.f&tn)===0)}function X(n,t,r,e){if(U){if(r===null&&(U=!1),Ot(t))throw n;return}r!==null&&(U=!0);{Dt(n,t);return}}function Kn(n){var vn;var t=v,r=E,e=g,s=i,l=D,u=m,f=o,p=n.f;v=null,E=0,g=null,i=p&(T|J)?null:n,D=!O&&(p&I)!==0,m=null,o=n.ctx;try{var d=(0,n.fn)(),_=n.deps;if(v!==null){var c;if(H(n,E),_!==null&&E>0)for(_.length=E+v.length,c=0;c<v.length;c++)_[E+c]=v[c];else n.deps=_=v;if(!D)for(c=E;c<_.length;c++)((vn=_[c]).reactions??(vn.reactions=[])).push(n)}else _!==null&&E<_.length&&(H(n,E),_.length=E);return d}finally{v=t,E=r,g=e,i=s,D=l,m=u,o=f}}function Ct(n,t){let r=t.reactions;if(r!==null){var e=r.indexOf(n);if(e!==-1){var s=r.length-1;s===0?r=t.reactions=null:(r[e]=r[s],r.pop())}}r===null&&t.f&y&&(v===null||!v.includes(t))&&(A(t,j),t.f&(I|G)||(t.f^=G),H(t,0))}function H(n,t){var r=n.deps;if(r!==null)for(var e=t;e<r.length;e++)Ct(n,r[e])}function Q(n){var t=n.f;if(!(t&N)){A(n,h);var r=a,e=o;a=n;try{t&an?Tt(n):Mn(n),Fn(n),Pn(n);var s=Kn(n);n.teardown=typeof s=="function"?s:null,n.version=Vn}catch(l){X(l,n,r,e||n.ctx)}finally{a=r}}}function $n(){if(C>1e3){C=0;try{at()}catch(n){if(L!==null)X(n,L,null);else throw n}}C++}function Zn(n){var t=n.length;if(t!==0){$n();var r=O;O=!0;try{for(var e=0;e<t;e++){var s=n[e];s.f&h||(s.f^=h);var l=[];zn(s,l),bt(l)}}finally{O=r}}}function bt(n){var t=n.length;if(t!==0)for(var r=0;r<t;r++){var e=n[r];if(!(e.f&(N|b)))try{B(e)&&(Q(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Ln(e):e.fn=null))}catch(s){X(s,e,null,e.ctx)}}}function Nt(){if(M=!1,C>1001)return;const n=S;S=[],Zn(n),M||(C=0,L=null)}function nn(n){V===Un&&(M||(M=!0,queueMicrotask(Nt))),L=n;for(var t=n;t.parent!==null;){t=t.parent;var r=t.f;if(r&(J|T)){if(!(r&h))return;t.f^=h}}S.push(t)}function zn(n,t){var r=n.first,e=[];n:for(;r!==null;){var s=r.f,l=(s&T)!==0,u=l&&(s&h)!==0,f=r.next;if(!u&&!(s&b))if(s&Y){if(l)r.f^=h;else try{B(r)&&Q(r)}catch(c){X(c,r,null,r.ctx)}var p=r.first;if(p!==null){r=p;continue}}else s&mn&&e.push(r);if(f===null){let c=r.parent;for(;c!==null;){if(n===c)break n;var d=c.next;if(d!==null){r=d;continue n}c=c.parent}}r=f}for(var _=0;_<e.length;_++)p=e[_],t.push(p),zn(p,t)}function Jn(n){var t=V,r=S;try{$n();const s=[];V=kt,S=s,M=!1,Zn(r);var e=n==null?void 0:n();return xt(),(S.length>0||s.length>0)&&Jn(),C=0,L=null,e}finally{V=t,S=r}}async function Mr(){await Promise.resolve(),Jn()}function Lr(n){var _;var t=n.f,r=(t&y)!==0;if(r&&t&N){var e=Cn(n);return fn(n),e}if(i!==null){m!==null&&m.includes(n)&&ot();var s=i.deps;v===null&&s!==null&&s[E]===n?E++:v===null?v=[n]:v.push(n),g!==null&&a!==null&&a.f&h&&!(a.f&T)&&g.includes(n)&&(A(a,x),nn(a))}else if(r&&n.deps===null)for(var l=n,u=l.parent,f=l;u!==null;)if(u.f&y){var p=u;f=p,u=p.parent}else{var d=u;(_=d.deriveds)!=null&&_.includes(f)||(d.deriveds??(d.deriveds=[])).push(f);break}return r&&(l=n,B(l)&&bn(l)),n.v}function qt(n){const t=i;try{return i=null,n()}finally{i=t}}const Pt=~(x|j|h);function A(n,t){n.f=n.f&Pt|t}function Hr(n){return Wn().get(n)}function Yr(n,t){return Wn().set(n,t),t}function Wn(n){return o===null&&St(),o.c??(o.c=new Map(Ft(o)||void 0))}function Ft(n){let t=n.p;for(;t!==null;){const r=t.c;if(r!==null)return r;t=t.p}return null}function jr(n,t=!1,r){o={p:o,c:null,e:null,m:!1,s:n,x:null,l:null},W&&!t&&(o.l={s:null,u:null,r1:[],r2:on(!1)})}function Br(n){const t=o;if(t!==null){n!==void 0&&(t.x=n);const u=t.e;if(u!==null){var r=a,e=i;t.e=null;try{for(var s=0;s<u.length;s++){var l=u[s];z(l.effect),Z(l.reaction),qn(l.fn)}}finally{z(r),Z(e)}}o=t.p,t.m=!0}return n||{}}function Ur(n){if(!(typeof n!="object"||!n||n instanceof EventTarget)){if(hn in n)un(n);else if(!Array.isArray(n))for(let t in n){const r=n[t];typeof r=="object"&&r&&hn in r&&un(r)}}}function un(n,t=new Set){if(typeof n=="object"&&n!==null&&!(n instanceof EventTarget)&&!t.has(n)){t.add(n),n instanceof Date&&n.getTime();for(let e in n)try{un(n[e],t)}catch{}const r=Qn(n);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Xn(r);for(let s in e){const l=e[s].get;if(l)try{l.call(n)}catch{}}}}}function Vr(n,t,r){if(n==null)return t(void 0),r&&r(void 0),nt;const e=qt(()=>n.subscribe(t,r));return e.unsubscribe?()=>e.unsubscribe():e}export{Or as $,Qt as A,on as B,lr as C,R as D,tr as E,Wt as F,rt as G,vt as H,b as I,ct as J,o as K,St as L,W as M,Ir as N,qt as O,qn as P,wt as Q,nt as R,hn as S,Vr as T,wn as U,et as V,jr as W,Br as X,Lr as Y,nr as Z,gr as _,dr as a,Xt as a0,Tr as a1,dt as a2,yr as a3,Er as a4,Ar as a5,cn as a6,mr as a7,In as a8,kn as a9,Kt as aA,Xn as aB,Pr as aC,Z as aD,kr as aE,Ht as aF,Jn as aG,Rr as aH,Mr as aI,Ut as aJ,Ur as aK,Bt as aL,Fr as aM,pr as aN,Yr as aO,Hr as aP,$t as aa,Dr as ab,Yt as ac,jt as ad,zt as ae,pn as af,vr as ag,Jt as ah,Qn as ai,Zt as aj,Vt as ak,or as al,xn as am,T as an,J as ao,z as ap,ur as aq,ar,ir as as,Gt as at,Sr as au,fr as av,ht as aw,_r as ax,cr as ay,Tn as az,mt as b,rn as c,Lt as d,hr as e,w as f,Nr as g,k as h,Mt as i,Cr as j,a as k,_t as l,rr as m,Hn as n,xr as o,br as p,qr as q,wr as r,F as s,At as t,P as u,er as v,en as w,pt as x,i as y,sr as z};