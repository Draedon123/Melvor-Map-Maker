import{a as f,t as u}from"./disclose-version.pAZcs84n.js";import{W as _,X as b,R as x,_ as d,Y as t,a0 as D,a1 as k,a5 as w,a4 as C,Z as B}from"./utils.BRJKUTqf.js";import{d as M,i as R}from"./store.BTSVGJLy.js";import{s as W}from"./imageUtils.CboFgM1z.js";import{b as X}from"./this.BvguKOfU.js";import{a as Y}from"./props.BlxC-9-v.js";var Z=u('<br class="svelte-1mxffrh"> <button class="svelte-1mxffrh">Close</button>',1),j=u('<dialog class="svelte-1mxffrh"><!> <!></dialog>');function G(c,s){_(s,!0);let m=Y(s,"showDefaultCloseButton",3,!0);function i(){t(e)!==void 0&&t(e).showModal()}function r(){t(e)!==void 0&&t(e).close()}function p(){t(e)!==void 0&&(t(e).open?r():i())}let e=D(void 0);var o=j(),n=k(o);W(n,()=>s.children??x);var g=d(n,2);{var h=a=>{var l=Z(),v=d(w(l),2);v.__click=r,f(a,l)};R(g,a=>{m()&&a(h)})}return C(o),X(o,a=>B(e,a),()=>t(e)),f(c,o),b({open:i,close:r,toggle:p})}M(["click"]);export{G as D};