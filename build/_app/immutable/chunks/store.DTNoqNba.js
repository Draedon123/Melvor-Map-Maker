var m=Object.defineProperty;var u=(s,a,t)=>a in s?m(s,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[a]=t;var n=(s,a,t)=>u(s,typeof a!="symbol"?a+"":a,t);import{f as l,t as o}from"./imageUtils.wc1ecRim.js";import{d}from"./database.DQQtTXl3.js";import{w as h}from"./index.C1yIJ3Kh.js";class i{constructor(a={}){n(this,"id");n(this,"name");n(this,"namespace");n(this,"tiles");n(this,"worldMapData");n(this,"modIcon");n(this,"thumbnail");this.id=a.id??null,this.name=a.name??"Unnamed Project",this.namespace=a.namespace??null,this.tiles=a.tiles??null,this.worldMapData=a.worldMapData??{id:"unnamed",name:"unnamed",bgTiles:{dimensions:{x:1,y:1},tileSize:{x:1,y:1},tilePath:"assets/bg-tiles"},worldSize:{x:1,y:1},hexScale:{x:1,y:1},hexBorderColour:"#FFFFFF",activePOIBorderColour:"#FFFFFF",origin:{x:0,y:0},startingLocation:{q:0,r:0},fastTravelGroups:[],pointsOfInterest:[],hexes:[],masteryBonuses:[]},this.modIcon=a.modIcon??null,this.thumbnail=a.thumbnail??null}static async new(){const a=new i;return await a.save(),a}static async fromDatabaseProject(a){const t=a.modIcon===null?null:await l(a.modIcon.buffer),e=a.thumbnail===null?null:await l(a.thumbnail.buffer);return new i({...a,modIcon:t,thumbnail:e})}async save(){const a=this.modIcon===null?null:new Uint8Array(await o(this.modIcon)),t=this.thumbnail===null?null:new Uint8Array(await o(this.thumbnail)),e={id:this.id??void 0,name:this.name,namespace:this.namespace,tiles:this.tiles,worldMapData:this.worldMapData,modIcon:a,thumbnail:t},r=await d.projects.put(e);return this.id===null&&(this.id=r),this}update(){return this}}const y=h({activeProject:new i});export{i as P,y as s};
