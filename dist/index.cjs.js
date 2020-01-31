"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("pixi.js");class t extends e.Container{constructor(){super(...arguments),this.layerHeight=0,this.layerWidth=0}}const i={defSpriteAnchor:new e.Point(0,1),debugContainers:!1,usePixiDisplay:!1,roundFontAlpha:!1,injectMiddleware:!0},s={};function r(e){if(!e)return 0;if("number"==typeof e)return e;e=e.length>7?e.substr(3,6):e.substr(1,6);try{return parseInt(e,16)}catch(e){return console.warn("Color parse error:",e.message),0}}var n;function o(e){return e.properties&&e.properties.container?n.DEFAULT:e.gid||e.image?n.IMAGE:null!=e.text?n.TEXT:e.point?n.POINT:e.polygon?n.POLYGON:e.polyline?n.POLYLINE:e.ellipse?n.ELLIPSE:n.DEFAULT}function a(e){let t={};if(e.properties)if(e.properties instanceof Array)for(var i of e.properties){let e=i.value;"color"==i.type&&(e=r(e)),t[i.name]=e}else t=e.properties;const s=e;if(s.gid>0){const e=s.gid,i=!!(1073741824&e),r=!!(2147483648&e),n=!!(536870912&e);t.vFlip=i,t.hFlip=r,t.dFlip=n,s.vFlip=i,s.hFlip=r;const o=536870911&e;s.gid=o}e.parsedProps=t}!function(e){e[e.DEFAULT=0]="DEFAULT",e[e.POINT=1]="POINT",e[e.POLYGON=2]="POLYGON",e[e.POLYLINE=3]="POLYLINE",e[e.ELLIPSE=4]="ELLIPSE",e[e.TEXT=5]="TEXT",e[e.IMAGE=6]="IMAGE"}(n||(n={}));class l extends e.Rectangle{constructor(){super(...arguments),this.name="",this.types=[],this.visible=!0}}class h extends e.Point{constructor(e,t){super(e,t),this.name="",this.types=[],this.visible=!0}}class p extends e.Polygon{constructor(e){super(e),this.name="",this.types=[],this.visible=!0,this._x=0,this._y=0}set x(e){const t=e-this._x;this._x=e;for(let e=0;e<this.points.length;e+=2)this.points[e]+=t}set y(e){const t=e-this._y;this._y=e;for(let e=1;e<this.points.length;e+=2)this.points[e]+=t}get x(){return this._x}get y(){return this._y}getBounds(){let t=new e.Rectangle,i=this._x,s=this._y;for(let e=0;e<this.points.length;e+=2){const r=this.points[e],n=this.points[e+1];t.x=r<t.x?r:t.x,t.y=n<t.y?n:t.y,i=r>i?r:i,s=n>s?n:s}return t.width=i-t.x,t.height=s-t.y,t}get width(){return this.getBounds().width}get height(){return this.getBounds().height}set height(e){const t=e/this.height;for(let e=1;e<this.points.length;e+=2){const i=(this.points[e]-this._y)*t;this.points[e]=this._y+i}}set width(e){const t=e/this.width;for(let e=0;e<this.points.length;e+=2){const i=(this.points[e]-this._x)*t;this.points[e]=this._x+i}}}class c{constructor(e){this.name="",this.types=[],this.visible=!0,this.points=[],this.points=e.slice()}}class d extends e.Ellipse{constructor(e,t,i,s){super(e,t,i,s),this.name="",this.types=[],this.visible=!0}}function u(t){if(!t)return;let i=void 0;const s=o(t);switch(t.x=t.x||0,t.y=t.y||0,s){case n.ELLIPSE:i=new d(t.x+.5*t.width,t.y+.5*t.height,.5*t.width,.5*t.height);break;case n.POLYGON:{const s=t.polygon.map(i=>new e.Point(i.x+t.x,i.y+t.y));i=new p(s);break}case n.POLYLINE:{const s=t.polygon.map(i=>new e.Point(i.x+t.x,i.y+t.y));i=new c(s);break}default:i=new l(t.x,t.y,t.width,t.height)}return i.types=t.type?t.type.split(":"):[],i.visible=t.visible,i.name=t.name,i}var g=Object.freeze({__proto__:null,TiledRect:l,TiledPoint:h,TiledPolygon:p,TiledPolypine:c,TiledEllipse:d,BuildPrimitive:u});class y extends e.Sprite{}function f(t,s){s.name=t.name,s.tiledId=t.id,s.width=t.width||s.width,s.height=t.height||s.height,s.rotation=(t.rotation||0)*Math.PI/180,s.x=t.x||0,s.y=t.y||0,s.visible=null==t.visible||t.visible,s.types=t.type?t.type.split(":"):[],s.primitive=u(t);const r=t.parsedProps;r&&(isNaN(r.opacity)||(s.alpha=Number(r.opacity)),Object.assign(s,r),s.properties=r),s.source=t,i.debugContainers&&setTimeout(()=>{const i=new e.Graphics;i.lineStyle(2,16711680,.7).drawRect(s.x,s.y,t.width,t.height).endFill(),s instanceof e.Sprite&&(i.y-=s.height),s.parent.addChild(i)},30)}function m(s){let r=void 0;return r=(s.type?s.type.split(":"):[]).indexOf("mask")>-1?new y(e.Texture.WHITE):new t,s.gid&&(r instanceof e.Sprite?r.anchor=i.defSpriteAnchor:(r.pivot=i.defSpriteAnchor,r.hitArea=new e.Rectangle(0,0,s.width,s.height))),f(s,r),r}var x=Object.freeze({__proto__:null,ApplyMeta:f,Build:m});function w(t){let s;if(t.image.animation){s=new e.AnimatedSprite(t.image.animation,!!t.parsedProps.autoUpdate||!0);const i=s;i.play&&t.parsedProps.animPlaying&&i.play(),i.loop=void 0===t.parsedProps.animLoop||t.parsedProps.animLoop}else s=new e.Sprite(t.image.texture||e.Texture.EMPTY);t.fromImageLayer||(s.anchor=i.defSpriteAnchor),f(t,s);const r=t.image.objectgroup;r&&(s.primitive=u(r.objects[0]));const n=t.hFlip,o=t.vFlip;return n&&(s.scale.x*=-1,s.anchor.x=1),o&&(s.scale.y*=-1,s.anchor.y=0),s}var b=Object.freeze({__proto__:null,Build:w});function P(s){const n=new t,o=s.text;let a=new e.Text(o.text,{wordWrap:o.wrap,wordWrapWidth:s.width,fill:r(o.color||"#000000")||0,align:o.valign||"top",fontFamily:o.fontfamily||"sans-serif",fontWeight:o.bold?"bold":"normal",fontStyle:o.italic?"italic":"normal",fontSize:o.pixelsize||"16px"});a.name=s.name+"_Text",a.roundPixels=!!i.roundFontAlpha;const l=s.parsedProps;switch(s.properties=[],s.parsedProps={},f(s,n),n.pivot.set(0,0),o.halign){case"right":a.anchor.x=1,a.position.x=s.width;break;case"center":a.anchor.x=.5,a.position.x=.5*s.width;break;default:a.anchor.x=0,a.position.x=0}switch(o.valign){case"bottom":a.anchor.y=1,a.position.y=s.height;break;case"center":a.anchor.y=.5,a.position.y=.5*s.height;break;default:a.anchor.y=0,a.position.y=0}return l&&(a.style.stroke=r(l.strokeColor)||0,a.style.strokeThickness=l.strokeThickness||0,a.style.padding=l.fontPadding||0,Object.assign(a,l)),n.addChild(a),n.text=a,n.properties=l,n}var T=Object.freeze({__proto__:null,Build:P});class v{constructor(e){this.sheets=[],this.images={},e&&e.forEach(e=>{this.add(e)})}add(e){if(!e)throw"Sheet can't be undefined";if(e===this)throw"U can't add self to spritesheet";this.sheets.push(e)}addTexture(e,t){this.images[t]=e}get textures(){let e={};for(const t of this.sheets)Object.assign(e,t.textures);return Object.assign(e,this.images),e}get animations(){let e={};for(const t of this.sheets)Object.assign(e,t.animations);return e}}class I{constructor(e,t){this._tileSets=e,this._sheet=new v,this.baseUrl="",this.loadUnknowImages=!0,t&&this.register(t)}register(e){this._sheet.add(e)}get spritesheet(){return this._sheet}getTileByGid(e,t=this.loadUnknowImages){const i=function(e,t,i){let s=void 0,r=0;for(let t=0;t<e.length;t++)if(e[t].firstgid<=i){s=e[t],r=t;break}if(!s)return console.error("Image with gid:"+i+" not found!"),null;const n=i-s.firstgid;let o=s.tiles.filter(e=>e.id==n)[0],a=Object.assign({},o,{tilesetId:r});return a||(console.error("Load res MISSED gid:"+n),null)}(this._tileSets,this.baseUrl,e);return this.getTileByTile(i,t)}getTileByTile(t,i=this.loadUnknowImages,s=!1){if(!t||!t.image)return;if(t.animation&&!s){const e=this._tileSets[t.tilesetId];t.animation.forEach(t=>{t.texture=this.getTileByTile(e.tiles[t.tileid],i,!0).texture,t.time=t.duration})}const r=this.baseUrl+t.image;let n=this.spritesheet.textures[t.image];return!n&&i&&(n=e.Texture.from(r,{},!1),this._sheet.addTexture(n,t.image)),t.texture=n,t}}let _=!0;function L(r,n){let o;if(o=r instanceof e.LoaderResource?r.data:n,!o||"map"!=o.type)return;_&&(console.log("[TILED] Importer!\neXponenta {rondo.devil[a]gmail.com}"),_=!1);const a=!!i.usePixiDisplay&&void 0!==PIXI.display,l=r.textures?r:void 0,h=new t,p=new RegExp(/^.*[\\\/]/);h.layerHeight=o.height,h.layerWidth=o.width,h.source=o;let c="";if(r instanceof e.LoaderResource&&(h.name=r.url.replace(p,"").split(".")[0],c=r.url.replace(n.baseUrl,""),c=c.match(p)[0]),o.layers){const e=new I(o.tilesets,l);e.baseUrl=c;let t=0;a&&(o.layers=o.layers.reverse());for(let i of o.layers){const r=s[i.type];if(!r){console.warn(`[TILED] Importer can't support ${i.type} layer type!`);continue}const n=r.Build(i,e,t);n&&(t++,h.layers={[i.name]:n},h.addChild(n))}}return h}const E={Parse(e,t){var i=L(e,this);e.stage=i,t()},use(e,t){E.Parse.call(this,e,t)},add(){console.log("[TILED] middleware registered!")}};function O(t){!function(t){if(!t.Container)throw new Error("Cant't find Container in package!");e.Container.prototype.getChildByPath=function(e){if(!this.children||0==this.children.length)return;let t=this;const i=e.split("/"),s=new RegExp("(?:{{0})-?d+(?=})");for(const e of i){if(null==t||!t.children){t=void 0;break}if(0==e.trim().length)continue;const i=t.children,r=e.match(s);if(r){let e=parseInt(r[0]);e<0&&(e+=i.length),t=e>=i.length?void 0:i[e]}else t=t.getChildByName(e)}return t},e.Container.prototype.addGlobalChild=function(...t){this.transform.updateLocalTransform();const i=new e.Matrix,s=this.transform.localTransform.clone().invert();for(let e=0;e<t.length;e++){const r=t[e];r.transform.updateLocalTransform(),i.copyFrom(s),i.append(r.localTransform),t[e].transform.setFromMatrix(i)}return this.addChild(...t)}}(t),function(e){if(!e.DisplayObject)throw new Error("Cant't find DisplayObject in package!");e.DisplayObject.prototype.replaceWithTransform=function(e){e.updateTransform(),e.parent&&e.parent.addChildAt(this,e.parent.getChildIndex(e)),this.pivot.copyFrom(e.pivot),this.position.copyFrom(e.position),this.scale.copyFrom(e.scale),this.rotation=e.rotation,this.updateTransform()}}(t),function(e){if(!e.utils)throw new Error("Cant't find utils in package!");e.utils.EventEmitter.prototype.onceAsync=function(e,t){return new Promise(i=>{this.once(e,i,t)})}}(t)}const j={Build(e,s,r=0){const n=!!i.usePixiDisplay&&void 0!==PIXI.display,o=n?PIXI.display.Layer:{},l=n?PIXI.display.Group:{};a(e);const h=e.parsedProps;if(h.ignore||h.ignoreLoad)return void console.log("[TILED] layer ignored:"+e.name);const p=n?new o(new l(void 0!==h.zOrder?h.zOrder:r,!0)):new t;return p.tiledId=e.id,p.name=e.name,p.visible=e.visible,p.position.set(e.x,e.y),p.alpha=e.opacity||1,f(e,p),p}},C={__gen:{[n.IMAGE](e,t){const i=e,s=i.image?t.getTileByTile(i.image):t.getTileByGid(i.gid);i.image=s;const r=w(i);return s&&s.texture&&(r.texture=s.texture,r.tileFrame=s,i.fromImageLayer&&s.texture.baseTexture.once("update",()=>{r.scale.set(1)})),i.fromImageLayer&&r.anchor.set(0,0),r},[n.TEXT]:(e,t)=>P(e),[n.DEFAULT]:(e,t)=>m(e)},Build(e,t,i=0){const s=e,r=j.Build(e,t,i);if(!r)return;if("imagelayer"===e.type&&!this.__convertLayer(e))return;if(!s.objects||!s.objects.length)return r;const l=s.objects;let h=0;for(let e of l){a(e);const i=o(e),s=(this.__gen[i]||this.__gen[n.DEFAULT]).call(this,e,t);s&&(r.addChildAt(s,h),h++)}return r},__convertLayer:e=>!!e.image&&(e.objects=[{image:{image:e.image},gid:-1,name:e.name,x:e.x+e.offsetx,y:e.y+e.offsety,fromImageLayer:!0,properties:e.properties,parsedProps:e.parsedProps}],!0)};Object.assign(s,{tilelayer:void 0,objectgroup:C,imagelayer:C,group:void 0}),exports.Config=i,exports.ContainerBuilder=x,exports.CreateStage=L,exports.Inject=function(e=window.PIXI,t){e?(t&&Object.assign(i,t),O(e),i.injectMiddleware&&e.Loader.registerPlugin(E)):console.warn("Auto injection works only with globals scoped PIXI, not in modules\nuse 'Loader.registerPlugin(Parser)' otherwith")},exports.MultiSpritesheet=v,exports.Parser=E,exports.Primitives=g,exports.SpriteBuilder=b,exports.TextBuilder=T,exports.TiledContainer=t,exports.VERSION="1.1.11";
//# sourceMappingURL=index.cjs.js.map
