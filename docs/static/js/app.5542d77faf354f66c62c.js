webpackJsonp([54],{"+0Qw":function(t,e){},"+Tn7":function(t,e){},"0u1n":function(t,e){},"15XC":function(t,e){},"1LBi":function(t,e){},"1O6n":function(t,e){},"1Z8u":function(t,e){},"1mBN":function(t,e){},"2ZBE":function(t,e){},"3Clc":function(t,e){},"3ZDw":function(t,e){},"3j2o":function(t,e){},"4Yhh":function(t,e){},"5RGO":function(t,e){},"5kgg":function(t,e){},"67ys":function(t,e){},"7Do+":function(t,e){},"84z/":function(t,e){},"8EM9":function(t,e){},"8dAB":function(t,e){},"9Dq5":function(t,e){},"9vcT":function(t,e){},Bv73:function(t,e){},"EG+O":function(t,e){},Eawl:function(t,e){},F5mM:function(t,e){},GZKt:function(t,e){},Gu5N:function(t,e){},Hv4S:function(t,e){},IBAp:function(t,e){},IOV5:function(t,e){},KL86:function(t,e){},KU51:function(t,e){},LC7R:function(t,e){},LCUL:function(t,e){},MfYP:function(t,e){},MlKm:function(t,e){},NBYJ:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var i=n("VU/8")({name:"App"},o,!1,function(t){n("QQC2")},null,null).exports,r=n("/ocq"),a=n("pIzI"),c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"editor-container fullheight"},[n("b-row",{staticClass:"fullheight"},[n("b-col",{staticClass:"fullheight"},[n("monaco-editor",{ref:"editor",staticClass:"editor",attrs:{language:"javascript",theme:t.editorStatus.themeColor},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1),t._v(" "),n("b-col",[n("GlobalHeader"),t._v(" "),n("b-container",{staticClass:"fullheight"},[n("label",[t._v("input")]),t._v(" "),n("div",{staticClass:"std-wrapper"},[n("monaco-editor",{ref:"stdin",staticClass:"editor-min",staticStyle:{height:"200px"},attrs:{language:"",theme:t.editorStatus.themeColor},model:{value:t.stdin,callback:function(e){t.stdin=e},expression:"stdin"}})],1),t._v(" "),t.editorStatus.errorpaineStatus?n("div",[n("table",[n("tr",[n("td",[n("label",[t._v("output")]),t._v(" "),n("div",{staticClass:"std-wrapper"},[n("monaco-editor",{ref:"stdout",staticClass:"editor-min",staticStyle:{height:"200px"},attrs:{language:"",theme:t.editorStatus.themeColor},model:{value:t.stdout,callback:function(e){t.stdout=e},expression:"stdout"}})],1)]),t._v(" "),n("td",[n("label",[t._v("error")]),t._v(" "),n("div",{staticClass:"std-wrapper"},[n("monaco-editor",{ref:"stderr",staticClass:"editor-min",staticStyle:{height:"200px"},attrs:{language:"",theme:t.editorStatus.themeColor},model:{value:t.stderr,callback:function(e){t.stderr=e},expression:"stderr"}})],1)])])])]):n("div",[n("b-row",[n("b-col",[n("label",[t._v("output")]),t._v(" "),n("div",{staticClass:"std-wrapper"},[n("monaco-editor",{ref:"stdout",staticClass:"editor-min",staticStyle:{height:"200px"},attrs:{language:"",theme:t.editorStatus.themeColor},model:{value:t.stdout,callback:function(e){t.stdout=e},expression:"stdout"}})],1)])],1)],1),t._v(" "),n("div",{staticClass:"text-right"},[n("br"),t._v(" "),n("b-row",[n("b-col",{attrs:{cols:"10"}},[n("b-button",{attrs:{block:"",variant:"primary"},on:{click:t.run}},[t._v("Run")])],1),t._v(" "),n("b-col",[n("b-button",{attrs:{block:"",variant:"secondary"},on:{click:t.initEditor}},[t._v("Clear")])],1)],1)],1)])],1)],1)],1)},staticRenderFns:[]};var u=function(t){n("15XC")},l=n("VU/8")(a.a,c,!1,u,null,null).exports,_=[{title:"Config",desc:"設定",url:"#/config/"},{title:"Editor Settings",desc:"エディタの設定を変更します。",url:"#/config/editor-settings"},{title:"Snippets",desc:"初期状態で表示されるエディタのコードを編集します。",url:"#/config/snippets"},{title:"Standard Input",desc:"コード実行時の標準入力の設定を行います。",url:"#/config/stdin"},{title:"Standard Output",desc:"コード実行時の標準出力の設定を行います。",url:"#/config/stdout"},{title:"Standard Error",desc:"コード実行時の標準エラー出力の設定を行います。",url:"#/config/stderr"},{title:"Import Settings",desc:"設定情報のJSONを読み込みます。",url:"#/config/import-settings"},{title:"Export Settings",desc:"設定情報をJSONに出力します。",url:"#/config/export-settings"},{title:"About",desc:"AtCoder-JsDebuggerについて",url:"#/config/about"}],d={components:{GlobalHeader:n("s3Oi").a,mainTitle:"",mainDesc:""},beforeRouteUpdate:function(t,e,n){this.renderHeader(),n()},data:function(){return{configs:_}},methods:{renderHeader:function(){var t=this,e=location.href.split("#")[1];_.forEach(function(n){n.url.split("#")[1]==e&&(t.mainTitle=n.title,t.mainDesc=n.desc)})}},created:function(){this.renderHeader()}},h={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},[n("GlobalHeader"),t._v(" "),n("b-row",[n("b-col",[n("div",{staticClass:"sidebar"},[n("b-list-group",t._l(t.configs,function(e,s){return n("b-list-group-item",{key:s,attrs:{href:e.url}},[n("strong",[t._v(t._s(e.title))]),n("br"),t._v(" "),n("small",[t._v(t._s(e.desc))])])}),1)],1)]),t._v(" "),n("b-col",{attrs:{cols:"9"}},[n("br"),t._v(" "),n("div",{staticClass:"content"},[n("br"),t._v(" "),n("b-container",{attrs:{fluid:""}},[n("h2",[t._v(t._s(t.mainTitle))]),t._v(" "),n("p",[t._v(t._s(t.mainDesc))]),t._v(" "),n("hr")]),t._v(" "),n("router-view")],1)])],1)],1)},staticRenderFns:[]};var f=n("VU/8")(d,h,!1,function(t){n("vMuc")},null,null).exports,v={render:function(){var t=this.$createElement,e=this._self._c||t;return e("b-container",{attrs:{fluid:""}},[e("p",[this._v("\n    エディタに関する設定を行います。\n    設定内容はブラウザのLocalStorageに保存されます。\n  ")]),this._v(" "),e("p",[e("a",{attrs:{href:"https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage"}},[this._v("\n    Window​.local​Storage - MDN web docs\n    ")])]),this._v(" "),e("p",[this._v("\n    また、エディタで書いたコードや設定した内容は外部には送信されません。\n  ")])])},staticRenderFns:[]},g=n("VU/8")(null,v,!1,null,null,null).exports,b=n("V0z2"),p=n("m+Gh"),m={data:function(){return{storage:new b.b,saveMsg:"",themeColorOption:[{value:"vs",text:"default"},{value:"vs-dark",text:"dark"},{value:"hc-black",text:"high contrast"}],status:{errorpaineStatus:!1,chacheStatus:!1,themeColor:"vs"}}},methods:{init:function(){var t=this.storage.get();null!=t&&(this.status=t)},save:function(){this.storage.set(this.status),this.saveMsg="保存しました"},clear:function(){for(var t in this.status={},this.storage.set(this.status),keys)new p.a(keys[t]).set({});this.saveMsg="初期化しました"}},mounted:function(){this.init()}},w={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{attrs:{fluid:""}},[n("b-row",[n("b-col",{attrs:{cols:"10"}},[n("strong",[t._v("エラーコンソールの有効化 (非推奨)")]),t._v(" "),n("br"),t._v(" "),n("small",[t._v("\n        console.error() や console.warn() などの標準エラー出力用のコンソールを表示します。\n        "),n("br"),t._v("\n        ※コードとは関係ないエラーまで拾ってしまうため非推奨としています。\n      ")])]),t._v(" "),n("b-col",{staticClass:"text-center"},[n("b-form-checkbox",{attrs:{name:"check-button",switch:""},model:{value:t.status.errorpaineStatus,callback:function(e){t.$set(t.status,"errorpaineStatus",e)},expression:"status.errorpaineStatus"}})],1)],1),t._v(" "),n("hr"),t._v(" "),n("b-row",[n("b-col",{attrs:{cols:"10"}},[n("strong",[t._v("キャッシュの有効化")]),t._v(" "),n("br"),t._v(" "),n("small",[t._v("エディタを開いた際に、最後に編集していた内容を表示します。")])]),t._v(" "),n("b-col",{staticClass:"text-center"},[n("b-form-checkbox",{attrs:{name:"check-button",switch:""},model:{value:t.status.chacheStatus,callback:function(e){t.$set(t.status,"chacheStatus",e)},expression:"status.chacheStatus"}})],1)],1),t._v(" "),n("hr"),t._v(" "),n("b-row",[n("b-col",{attrs:{cols:"10"}},[n("strong",[t._v("テーマの変更")]),t._v(" "),n("br"),t._v(" "),n("small",[t._v("エディタに適用するテーマカラーを変更します。")])]),t._v(" "),n("b-col",{staticClass:"text-center"},[n("b-form-select",{staticClass:"mb-3",attrs:{options:t.themeColorOption,size:"sm"},model:{value:t.status.themeColor,callback:function(e){t.$set(t.status,"themeColor",e)},expression:"status.themeColor"}})],1)],1),t._v(" "),n("hr"),t._v(" "),n("b-row",[n("b-col",{attrs:{cols:"10"}},[n("strong",[t._v("設定の初期化")]),t._v(" "),n("br"),t._v(" "),n("small",[t._v("全ての設定を初期状態にします。")])]),t._v(" "),n("b-col",{staticClass:"text-center"},[n("b-button",{attrs:{variant:"danger"},on:{click:t.clear}},[t._v("delete")])],1)],1),t._v(" "),n("hr"),t._v(" "),n("b-button",{attrs:{variant:"success"},on:{click:t.save}},[t._v("Save")]),t._v("\n   "+t._s(t.saveMsg)+"\n")],1)},staticRenderFns:[]},S=n("VU/8")(m,w,!1,null,null,null).exports,C=n("6KKO"),E={components:{MonacoEditor:C.a},data:function(){return{code:"",showMsg:"",storage:new b.c,editor:(new b.b).get()}},methods:{init:function(){this.code=this.storage.get()},save:function(){this.storage.set(this.code),this.showMsg="保存しました"},clear:function(){this.storage.reset(),this.code=this.storage.get(),this.showMsg="初期化しました"}},mounted:function(){this.init()}},M={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{attrs:{fluid:""}},[n("b-button",{attrs:{variant:"success"},on:{click:t.save}},[t._v("Save")]),t._v(" "),n("b-button",{attrs:{variant:"light"},on:{click:t.clear}},[t._v("初期化")]),t._v("\n    "+t._s(t.showMsg)+"\n  "),n("br"),t._v(" \n  "),n("MonacoEditor",{ref:"editor",staticClass:"editor",staticStyle:{height:"350px",width:"95%"},attrs:{language:"javascript",theme:t.editor.themeColor},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1)},staticRenderFns:[]},D=n("VU/8")(E,M,!1,null,null,null).exports,k={components:{MonacoEditor:C.a},data:function(){return{code:"",showMsg:"",editor:(new b.b).get(),storage:new b.e}},methods:{init:function(){this.storage.get()&&(this.code=this.storage.get())},save:function(){try{this.storage.set(this.code),this.showMsg="保存しました"}catch(t){this.showMsg="エラー"+t}},clear:function(){this.storage.reset(),this.code=this.storage.get(),this.showMsg="初期化しました"}},mounted:function(){this.init()}},x={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{attrs:{fluid:""}},[n("b-button",{attrs:{variant:"success"},on:{click:t.save}},[t._v("Save")]),t._v(" "),n("b-button",{attrs:{variant:"light"},on:{click:t.clear}},[t._v("初期化")]),t._v("\n      "+t._s(t.showMsg)+"\n    "),n("br"),t._v(" \n    "),n("MonacoEditor",{ref:"editor",staticClass:"editor",staticStyle:{height:"350px",width:"95%"},attrs:{language:"javascript",theme:t.editor.themeColor},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1)},staticRenderFns:[]},O=n("VU/8")(k,x,!1,null,null,null).exports,R={components:{MonacoEditor:C.a},data:function(){return{code:"",showMsg:"",editor:(new b.b).get(),storage:new b.f}},methods:{init:function(){this.storage.get()&&(this.code=this.storage.get())},save:function(){try{this.storage.set(this.code),this.showMsg="保存しました"}catch(t){this.showMsg="エラー"+t}},clear:function(){this.storage.reset(),this.code=this.storage.get(),this.showMsg="初期化しました"}},mounted:function(){this.init()}},T={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{attrs:{fluid:""}},[n("b-button",{attrs:{variant:"success"},on:{click:t.save}},[t._v("Save")]),t._v(" "),n("b-button",{attrs:{variant:"light"},on:{click:t.clear}},[t._v("初期化")]),t._v("\n    "+t._s(t.showMsg)+"\n  "),n("br"),t._v(" \n  "),n("MonacoEditor",{ref:"editor",staticClass:"editor",staticStyle:{height:"350px",width:"95%"},attrs:{language:"javascript",theme:t.editor.themeColor},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1)},staticRenderFns:[]},y=n("VU/8")(R,T,!1,null,null,null).exports,U={components:{MonacoEditor:C.a},data:function(){return{code:"",showMsg:"",editor:(new b.b).get(),storage:new b.d}},methods:{init:function(){this.storage.get()&&(this.code=this.storage.get())},save:function(){try{this.storage.set(this.code),this.showMsg="保存しました"}catch(t){this.showMsg="エラー"+t}},clear:function(){this.storage.reset(),this.code=this.storage.get(),this.showMsg="初期化しました"}},mounted:function(){this.init()}},A={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{attrs:{fluid:""}},[n("b-button",{attrs:{variant:"success"},on:{click:t.save}},[t._v("Save")]),t._v(" "),n("b-button",{attrs:{variant:"light"},on:{click:t.clear}},[t._v("初期化")]),t._v("\n    "+t._s(t.showMsg)+"\n  "),n("br"),t._v(" \n  "),n("MonacoEditor",{ref:"editor",staticClass:"editor",staticStyle:{height:"350px",width:"95%"},attrs:{language:"javascript",theme:t.editor.themeColor},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1)},staticRenderFns:[]},I=n("VU/8")(U,A,!1,null,null,null).exports,P=(n("mMnA"),{components:{MonacoEditor:C.a},data:function(){return{code:"{}",showMsg:"",editor:(new b.b).get()}},methods:{save:function(){try{var t=JSON.parse(this.code);for(var e in b.g){if(t.data[e])new p.a(e).set(t.data[e])}this.showMsg="保存しました"}catch(t){this.showMsg="エラー"+t}}},mounted:function(){}}),B={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{attrs:{fluid:""}},[n("b-button",{attrs:{variant:"success"},on:{click:t.save}},[t._v("Save")]),t._v("\n    "+t._s(t.showMsg)+"\n  "),n("br"),t._v(" \n  "),n("MonacoEditor",{ref:"editor",staticClass:"editor",staticStyle:{height:"350px",width:"95%"},attrs:{language:"javascript",theme:t.editor.themeColor},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1)},staticRenderFns:[]},G=n("VU/8")(P,B,!1,null,null,null).exports,K=n("mvHQ"),J=n.n(K),j={components:{MonacoEditor:C.a},data:function(){return{code:"{}",showMsg:"",editor:(new b.b).get()}},methods:{init:function(){this.code=this.getJsonCodes()},download:function(){var t=new Uint8Array([239,187,191]),e=this.getJsonCodes(),n=new Blob([t,e],{type:"text/json"});if(!window.navigator.msSaveBlob)return window.URL.createObjectURL(n);window.navigator.msSaveBlob(n,"settings.json"),window.navigator.msSaveOrOpenBlob(n,"settings.json")},getJsonCodes:function(){var t={header:{name:"atcoder-jsdebugger",v:"1.0.0",datetime:String(new Date)},data:{}};for(var e in b.g){var n=new p.a(b.g[e]);["editor_chache"].includes(b.g[e])||(t.data[b.g[e]]=n.get())}return J()(t,null,"\t")}},mounted:function(){var t=this;this.init();var e=this.$refs["download-link"];e.addEventListener("click",function(){e.href=t.download()})}},L={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{attrs:{fluid:""}},[n("div",{staticClass:"text-right"},[n("a",{ref:"download-link",staticClass:"btn btn-secondary",attrs:{href:"#",download:"settings.json"}},[t._v("download JSON")])]),t._v("\n   \n  "),n("MonacoEditor",{ref:"editor",staticClass:"editor",staticStyle:{height:"350px",width:"95%"},attrs:{language:"javascript",theme:t.editor.themeColor},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1)},staticRenderFns:[]},W=n("VU/8")(j,L,!1,null,null,null).exports,N={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{attrs:{fluid:""}},[n("h3",[t._v("推奨環境")]),t._v(" "),n("b-row",[n("b-col",[n("strong",[t._v("ブラウザ")]),t._v(" "),n("p",[n("i",{staticClass:"fab fa-chrome"}),t._v("\n        Chrome 73 以上\n      ")])]),t._v(" "),n("b-col",[n("strong",[t._v("Window Size")]),t._v(" "),n("p",[n("i",{staticClass:"fas fa-window-maximize"}),t._v("\n        1280 x 672 以上\n      ")])]),t._v(" "),n("b-col",[n("strong",[t._v("JavaScript")]),t._v(" "),n("p",[n("i",{staticClass:"fab fa-js"}),t._v("\n        V8 以上\n      ")])])],1),t._v(" "),n("hr"),t._v(" "),n("b-row",[n("b-col",[n("h3",[t._v("GitHub Repository")]),t._v(" "),n("a",{attrs:{href:"https://github.com/s-yoshiki/AtCoder-JsDebugger"}},[n("strong",[t._v("AtCoder-JsDebugger")]),t._v(" "),n("p",[t._v("https://github.com/s-yoshiki/AtCoder-JsDebugger")])])]),t._v(" "),n("b-col",[n("h3",[t._v("Credits")]),t._v(" "),n("a",{attrs:{href:"https://s-yoshiki.github.io"}},[t._v("s-yoshiki")])])],1),t._v(" "),n("hr")],1)},staticRenderFns:[]},V=n("VU/8")(null,N,!1,null,null,null).exports;s.default.use(r.a);var H=new r.a({routes:[{path:"/",name:"Editor",component:l},{path:"/config/:screen",name:"ConfigParent",component:f,children:[{path:"/config/",name:"Config",component:g},{path:"/config/editor-settings",name:"EditotTheme",component:S},{path:"/config/snippets",name:"Snippets",component:D},{path:"/config/stdin",name:"Stdin",component:O},{path:"/config/stdout",name:"Stdout",component:y},{path:"/config/stderr",name:"Stderr",component:I},{path:"/config/import-settings",name:"ImportSettings",component:G},{path:"/config/export-settings",name:"ExportSettings",component:W},{path:"/config/about",name:"About",component:V}]}]}),F=n("e6fC"),$=n.n(F);s.default.config.productionTip=!1,s.default.use($.a),new s.default({el:"#app",router:H,components:{App:i},template:"<App/>"})},NfGl:function(t,e){},OkZj:function(t,e){},"Q+ux":function(t,e){},Q9Nm:function(t,e){},QQC2:function(t,e){},"R/+A":function(t,e){},SoM9:function(t,e){},V0z2:function(t,e,n){"use strict";n.d(e,"g",function(){return v}),n.d(e,"b",function(){return g}),n.d(e,"c",function(){return b}),n.d(e,"e",function(){return p}),n.d(e,"f",function(){return m}),n.d(e,"d",function(){return w}),n.d(e,"a",function(){return S});var s=n("Zx67"),o=n.n(s),i=n("Zrlr"),r=n.n(i),a=n("wxAW"),c=n.n(a),u=n("zwoO"),l=n.n(u),_=n("Pf15"),d=n.n(_),h=n("m+Gh"),f=n("mMnA"),v={EDITOR_SETTINGS:"editor_settings",SNIPPETS:"snippets",STDIN:"stdin",STDOUT:"stdout",STDERR:"stderr",EDITOR_CHACHE:"editor_chache"},g=function(t){function e(){return r()(this,e),l()(this,(e.__proto__||o()(e)).call(this,v.EDITOR_SETTINGS))}return d()(e,t),c()(e,[{key:"reset",value:function(){this.set({errorpaineStatus:!1,chacheStatus:!1,themeColor:"vs"})}}]),e}(h.a),b=function(t){function e(){return r()(this,e),l()(this,(e.__proto__||o()(e)).call(this,v.SNIPPETS))}return d()(e,t),c()(e,[{key:"reset",value:function(){this.set(f.a)}}]),e}(h.a),p=function(t){function e(){return r()(this,e),l()(this,(e.__proto__||o()(e)).call(this,v.STDIN))}return d()(e,t),c()(e,[{key:"reset",value:function(){this.set(f.c)}}]),e}(h.a),m=function(t){function e(){return r()(this,e),l()(this,(e.__proto__||o()(e)).call(this,v.STDOUT))}return d()(e,t),c()(e,[{key:"reset",value:function(){this.set(f.d)}}]),e}(h.a),w=function(t){function e(){return r()(this,e),l()(this,(e.__proto__||o()(e)).call(this,v.STDERR))}return d()(e,t),c()(e,[{key:"reset",value:function(){this.set(f.b)}}]),e}(h.a),S=function(t){function e(){return r()(this,e),l()(this,(e.__proto__||o()(e)).call(this,v.EDITOR_CHACHE))}return d()(e,t),c()(e,[{key:"reset",value:function(){this.set("")}}]),e}(h.a)},"Vcj/":function(t,e){},WLse:function(t,e){},WUwp:function(t,e){},XTA7:function(t,e){},YUwp:function(t,e){},czDl:function(t,e){},gCdB:function(t,e){},gvGx:function(t,e){},"jF/U":function(t,e){},"m+Gh":function(t,e,n){"use strict";var s=n("mvHQ"),o=n.n(s),i=n("Zrlr"),r=n.n(i),a=n("wxAW"),c=n.n(a),u=function(){function t(e){r()(this,t),this.storageKey=e,this.hasItem()||this.reset()}return c()(t,[{key:"get",value:function(){var t=localStorage.getItem(this.storageKey);return this.hasItem()?JSON.parse(t):{}}},{key:"set",value:function(t){localStorage.setItem(this.storageKey,o()(t))}},{key:"getStorageKey",value:function(){return this.storageKey}},{key:"hasItem",value:function(){var t=localStorage.getItem(this.storageKey);return null!=t&&void 0!=t&&t!=={}}},{key:"reset",value:function(){this.set({})}}]),t}();e.a=u},m849:function(t,e){},mMnA:function(t,e,n){"use strict";n.d(e,"a",function(){return s}),n.d(e,"c",function(){return o}),n.d(e,"d",function(){return i}),n.d(e,"b",function(){return r});var s="\"use strict\"\nfunction main(arg) {\n    console.log(arg.trim().split(\"\\n\")[0])\n}\nmain(require('fs').readFileSync('/dev/stdin', 'utf8'));",o="\n/**\n * 標準入力\n */\nlet require = (arg) => {\n  return {\n    readFileSync : (type, string_type) => {\n      return AC_JS_DEBUGGER.__STDIN__\n    }\n  }\n}\n".trim(),i='\n/**\n * 標準出力\n */\nconsole.log = (arg) => {\n    AC_JS_DEBUGGER.__STDOUT__ += String(arg) + "\\n"\n}\n'.trim(),r='\n/**\n * 標準エラー出力\n */\nconsole.error = (arg) => {\n    AC_JS_DEBUGGER.__STDERR__ += String(arg) + "\\n"\n}\nconsole.warn =  (arg) => {\n    AC_JS_DEBUGGER.__STDERR__ += String(arg) + "\\n"\n}\n'.trim()},nLHh:function(t,e){},"o37+":function(t,e){},pIzI:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_vue_monaco__=__webpack_require__("6KKO"),__WEBPACK_IMPORTED_MODULE_1__GlobalHeader__=__webpack_require__("s3Oi"),__WEBPACK_IMPORTED_MODULE_2__libs_StaticStrings__=__webpack_require__("mMnA"),__WEBPACK_IMPORTED_MODULE_3__libs_Storages__=__webpack_require__("V0z2");__webpack_exports__.a={components:{MonacoEditor:__WEBPACK_IMPORTED_MODULE_0_vue_monaco__.a,GlobalHeader:__WEBPACK_IMPORTED_MODULE_1__GlobalHeader__.a},data:function(){return{code:"",stdin:"",stdout:"",stderr:"",editorStatus:(new __WEBPACK_IMPORTED_MODULE_3__libs_Storages__.b).get()}},watch:{code:function(){(new __WEBPACK_IMPORTED_MODULE_3__libs_Storages__.a).set(this.code)}},methods:{run:function run(){this.stdout="",this.stderr="";var code="",stdinCode=(new __WEBPACK_IMPORTED_MODULE_3__libs_Storages__.e).get(),stdoutCode=(new __WEBPACK_IMPORTED_MODULE_3__libs_Storages__.f).get(),stderrCode=(new __WEBPACK_IMPORTED_MODULE_3__libs_Storages__.d).get(),AC_JS_DEBUGGER={__STDIN__:this.stdin,__STDOUT__:"",__STDERR__:""};stdinCode=stdinCode.split("AC_JS_DEBUGGER.__STDIN__").join("`"+this.stdin+"`"),stdoutCode=stdoutCode.split("AC_JS_DEBUGGER.__STDOUT__").join("this.stdout"),stderrCode=stderrCode.split("AC_JS_DEBUGGER.__STDERR__").join("this.stderr"),eval(stdoutCode),eval(stderrCode),code=stdinCode+"\n\n"+this.code;var callback=new Function(code);callback()},initEditor:function(){var t=(new __WEBPACK_IMPORTED_MODULE_3__libs_Storages__.c).get();this.code=t}},mounted:function(){var t=new __WEBPACK_IMPORTED_MODULE_3__libs_Storages__.c;null!=t.get()?this.code=t.get():this.code=__WEBPACK_IMPORTED_MODULE_2__libs_StaticStrings__.a,!0===this.editorStatus.chacheStatus&&(this.code=(new __WEBPACK_IMPORTED_MODULE_3__libs_Storages__.a).get())}}},pJVg:function(t,e){},"s/JM":function(t,e){},s0RT:function(t,e){},s3Oi:function(t,e,n){"use strict";var s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("b-navbar",{staticClass:"global-header",attrs:{toggleable:"lg",type:"dark"}},[e("b-navbar-brand",{attrs:{href:"#/"}},[this._v("AtCoder-JsDebugger")]),this._v(" "),e("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[e("b-navbar-nav",{staticClass:"ml-auto"},[e("b-nav-item-dropdown",{attrs:{right:""}},[e("template",{slot:"button-content"},[e("em",[e("i",{staticClass:"fas fa-bars"})])]),this._v(" "),e("b-dropdown-item",{attrs:{href:"#/"}},[e("i",{staticClass:"fas fa-code"}),this._v("\n          editor\n        ")]),this._v(" "),e("b-dropdown-item",{attrs:{href:"#/config/"}},[e("i",{staticClass:"fas fa-cog"}),this._v("\n          config\n        ")])],2)],1)],1)],1)},staticRenderFns:[]};var o=n("VU/8")(null,s,!1,function(t){n("zyje")},null,null);e.a=o.exports},sOjV:function(t,e){},tVlf:function(t,e){},uHSv:function(t,e){},uNVx:function(t,e){},vMuc:function(t,e){},wtJh:function(t,e){},x33M:function(t,e){},xF6g:function(t,e){},zyje:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.5542d77faf354f66c62c.js.map