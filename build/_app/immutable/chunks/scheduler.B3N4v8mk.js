function m(){}const F=t=>t;function E(t,n){for(const e in n)t[e]=n[e];return t}function M(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function j(t){return t()}function A(){return Object.create(null)}function q(t){t.forEach(j)}function v(t){return typeof t=="function"}function B(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let f;function G(t,n){return t===n?!0:(f||(f=document.createElement("a")),f.href=n,t===f.href)}function H(t){return Object.keys(t).length===0}function x(t,...n){if(t==null){for(const o of n)o(void 0);return m}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function I(t){let n;return x(t,e=>n=e)(),n}function J(t,n,e){t.$$.on_destroy.push(x(n,e))}function K(t,n,e,o){if(t){const r=k(t,n,e,o);return t[0](r)}}function k(t,n,e,o){return t[1]&&o?E(e.ctx.slice(),t[1](o(n))):e.ctx}function P(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const l=[],d=Math.max(n.dirty.length,r.length);for(let u=0;u<d;u+=1)l[u]=n.dirty[u]|r[u];return l}return n.dirty|r}return n.dirty}function S(t,n,e,o,r,l){if(r){const d=k(n,e,o,l);t.p(d,r)}}function U(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}function L(t,n,e){return t.set(e),n}function N(t){return t&&v(t.destroy)?t.destroy:m}let _;function h(t){_=t}function i(){if(!_)throw new Error("Function called outside component initialization");return _}function Q(t){i().$$.on_mount.push(t)}function R(t){i().$$.after_update.push(t)}function T(t){i().$$.on_destroy.push(t)}function V(t,n){return i().$$.context.set(t,n),n}function W(t){return i().$$.context.get(t)}function X(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(o=>o.call(this,n))}const a=[],g=[];let s=[];const b=[],w=Promise.resolve();let y=!1;function C(){y||(y=!0,w.then(z))}function Y(){return C(),w}function O(t){s.push(t)}function Z(t){b.push(t)}const p=new Set;let c=0;function z(){if(c!==0)return;const t=_;do{try{for(;c<a.length;){const n=a[c];c++,h(n),D(n.$$)}}catch(n){throw a.length=0,c=0,n}for(h(null),a.length=0,c=0;g.length;)g.pop()();for(let n=0;n<s.length;n+=1){const e=s[n];p.has(e)||(p.add(e),e())}s.length=0}while(a.length);for(;b.length;)b.pop()();y=!1,p.clear(),h(t)}function D(t){if(t.fragment!==null){t.update(),q(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(O)}}function $(t){const n=[],e=[];s.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),s=n}export{M as A,i as B,L as C,E as D,F as E,Z as F,X as G,V as H,W as I,N as J,I as K,B as a,P as b,K as c,g as d,G as e,R as f,U as g,T as h,v as i,J as j,A as k,z as l,H as m,m as n,Q as o,O as p,$ as q,q as r,x as s,Y as t,S as u,_ as v,h as w,j as x,a as y,C as z};