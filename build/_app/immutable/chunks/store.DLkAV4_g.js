var z=Object.defineProperty;var C=(t,n,s)=>n in t?z(t,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[n]=s;var d=(t,n,s)=>C(t,typeof n!="symbol"?n+"":n,s);import{l as O,t as T}from"./index.rR-sQB3U.js";import{r as q}from"./scheduler.B3N4v8mk.js";import{f as A,a as B}from"./imageUtils.CZffY2xB.js";import{d as G}from"./database.ClOpcL0o.js";import{w as L}from"./index.Dl4Su6RE.js";function Q(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function R(t,n){O(t,1,1,()=>{n.delete(t.key)})}function V(t,n,s,h,w,g,m,P,x,S,y,U){let l=t.length,u=g.length,o=l;const b={};for(;o--;)b[t[o].key]=o;const c=[],p=new Map,F=new Map,v=[];for(o=u;o--;){const e=U(w,g,o),a=s(e);let i=m.get(a);i?v.push(()=>i.p(e,n)):(i=S(a,e),i.c()),p.set(a,c[o]=i),a in b&&F.set(a,Math.abs(o-b[a]))}const M=new Set,D=new Set;function I(e){T(e,1),e.m(P,y),m.set(e.key,e),y=e.first,u--}for(;l&&u;){const e=c[u-1],a=t[l-1],i=e.key,r=a.key;e===a?(y=e.first,l--,u--):p.has(r)?!m.has(i)||M.has(i)?I(e):D.has(r)?l--:F.get(i)>F.get(r)?(D.add(i),I(e)):(M.add(r),l--):(x(a,m),l--)}for(;l--;){const e=t[l];p.has(e.key)||x(e,m)}for(;u;)I(c[u-1]);return q(v),c}class f{constructor(n={}){d(this,"id");d(this,"name");d(this,"namespace");d(this,"tiles");d(this,"worldMapData");d(this,"modIcon");d(this,"thumbnail");this.id=n.id??null,this.name=n.name??"Unnamed Project",this.namespace=n.namespace??null,this.tiles=n.tiles??null,this.worldMapData=n.worldMapData??{id:"unnamed",name:"unnamed",bgTiles:{dimensions:{x:1,y:1},tileSize:{x:1,y:1},tilePath:"assets/bg-tiles"},worldSize:{x:1,y:1},hexScale:{x:1,y:1},hexBorderColour:"#FFFFFF",activePOIBorderColour:"#FFFFFF",origin:{x:0,y:0},startingLocation:{q:0,r:0},fastTravelGroups:[],pointsOfInterest:[],hexes:[],masteryBonuses:[]},this.modIcon=n.modIcon??null,this.thumbnail=n.thumbnail??null}static async new(){const n=new f;return await n.save(),n}static async fromDatabaseProject(n){const s=n.modIcon===null?null:await A(n.modIcon.buffer),h=n.thumbnail===null?null:await A(n.thumbnail.buffer);return new f({...n,modIcon:s,thumbnail:h})}async save(){const n=this.modIcon===null?null:new Uint8Array(await B(this.modIcon)),s=this.thumbnail===null?null:new Uint8Array(await B(this.thumbnail)),h={id:this.id??void 0,name:this.name,namespace:this.namespace,tiles:this.tiles,worldMapData:this.worldMapData,modIcon:n,thumbnail:s},w=await G.projects.put(h);return this.id===null&&(this.id=w),this}update(){return this}}const W=L({activeProject:new f});export{f as P,Q as e,R as o,W as s,V as u};
