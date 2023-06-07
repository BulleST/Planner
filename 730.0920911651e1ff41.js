"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[730],{6886:(D,h,t)=>{t.d(h,{Dw:()=>T,a7:()=>L});var d=t(655),m=t(43),p=t(805),r=t(1956),S=t(1442),I=t(5669),C=t(316);class L{constructor(){this.id=void 0,this.descricao="",this.empresa_Id=void 0,this.tipoAtivo_Id=void 0,this.tipoAtivo=new S.m,this.tipoRisco_Id=void 0,this.tipoRisco=new C.p,this.tipoLiquidez_Id=void 0,this.tipoLiquidez=new I.T,this.registroNaoSalvo=!1}}(0,d.gn)([(0,m.Vp)(),(0,d.w6)("design:type",Boolean)],L.prototype,"registroNaoSalvo",void 0);var T=[{field:"id",header:"Id",maskType:r.O.undefined,filterType:r.vA.text,filterDisplay:r.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,filterMatchMode:p.a6.CONTAINS},{field:"descricao",header:"Nome",maskType:r.O.undefined,filterType:r.vA.text,filterDisplay:r.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,filterMatchMode:p.a6.CONTAINS},{field:"tipoAtivo.nome",header:"Ativo",maskType:r.O.undefined,filterType:r.vA.text,filterDisplay:r.w2.menu,filterShowAddButton:!0,filterShowMatchMode:!0,filterMatchMode:p.a6.CONTAINS},{field:"tipoRisco.nome",header:"Risco",maskType:r.O.undefined,filterType:r.vA.text,filterDisplay:r.w2.menu,filterShowAddButton:!0,filterShowMatchMode:!0,filterMatchMode:p.a6.CONTAINS},{field:"tipoLiquidez.nome",header:"Liquidez",maskType:r.O.undefined,filterType:r.vA.text,filterDisplay:r.w2.menu,filterShowAddButton:!0,filterShowMatchMode:!0,filterMatchMode:p.a6.CONTAINS},{field:"ativo",header:"Ativo",maskType:r.O.boolean,filterType:r.vA.text,filterDisplay:r.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,filterMatchMode:p.a6.CONTAINS,booleanValues:{true:"ativo",false:"inativo"}}]},1442:(D,h,t)=>{t.d(h,{m:()=>d});class d{constructor(){this.id=void 0,this.nome=""}}},5669:(D,h,t)=>{t.d(h,{T:()=>d});class d{constructor(){this.id=void 0,this.nome=""}}},316:(D,h,t)=>{t.d(h,{p:()=>p});var d=t(655),m=t(43);class p{constructor(){this.id=void 0,this.nome="",this.percentualDisponivel=0}}(0,d.gn)([(0,m.Vp)(),(0,d.w6)("design:type",Number)],p.prototype,"percentualDisponivel",void 0)},9179:(D,h,t)=>{t.r(h),t.d(h,{ProdutosModule:()=>n});var d=t(6895),m=t(202),p=t(8446),r=t(4163),S=t(9899),I=t(343),C=t(5861),L=t(801),g=t(9808),T=t(9398),A=t(6886),R=t(9876),v=t(8913),B=t(9885),b=t(46),o=t(4650),U=t(453),P=t(8944),y=t(3868);function e(i,_){1&i&&o._UZ(0,"app-empresa-select")}const s=function(){return["cadastrar"]},a=[{path:"",component:(()=>{class i{constructor(l,f,K,z){var N=this;this.empresaService=l,this.produtoService=f,this.table=K,this.accountService=z,this.faHandHoldingDollar=L.VPG,this.empresaSelected=new T.oW,this.columns=A.Dw,this.list=[],this.tableLinks=[],this.subscription=[],this.create=(c=this.produtoService)=>{c.setObject(new A.a7)};var j=this.accountService.account.subscribe(c=>this.account=c),F=this.produtoService.list.subscribe(c=>this.list=c),Z=this.empresaService.empresa.subscribe(function(){var c=(0,C.Z)(function*(W){N.empresaSelected=W,0!=W.id&&(yield(0,g.n)(N.produtoService.getList()))});return function(W){return c.apply(this,arguments)}}()),x=this.table.selected.subscribe(c=>{c&&"Conta Corrente"!=c.descricao?(this.tableLinks=[{label:"Editar",routePath:["editar"],paramsFieldName:["id"]},{label:c.ativo?"Desabilitar":"Habilitar",routePath:[c.ativo?"desabilitar":"habilitar"],paramsFieldName:["id"]}],this.tableLinks=this.table.encryptParams(this.tableLinks)):c&&"Conta Corrente"!=c.descricao?this.table.onRowUnselect(c):this.tableLinks=[]});this.subscription.push(j),this.subscription.push(F),this.subscription.push(Z),this.subscription.push(x)}ngOnDestroy(){this.subscription.forEach(l=>l.unsubscribe())}}return i.\u0275fac=function(l){return new(l||i)(o.Y36(v.P),o.Y36(B.m),o.Y36(b.i),o.Y36(R.B))},i.\u0275cmp=o.Xpm({type:i,selectors:[["app-list-produtos"]],decls:17,vars:16,consts:[[1,"page"],[1,"page__header"],[1,"title-icon"],[3,"icon"],[1,"mr-auto"],[1,"page__header-title"],[1,"page__header-subtitle"],[1,"ml-auto","mb-0","col-xl-3","col-lg-4","col-md-5","col-sm-5","col-12","px-0"],[4,"ngIf"],[1,"page__body"],[3,"createLink","onCreate","canCreate","list","filterLink","filterTable","paginator","sortTable","menuTable","columns","tableLinks","selectable"]],template:function(l,f){1&l&&(o.TgZ(0,"div",0)(1,"div",1)(2,"span",2),o._UZ(3,"fa-icon",3),o.qZA(),o.TgZ(4,"div",4)(5,"h3",5),o._uU(6,"Produtos"),o.qZA(),o.TgZ(7,"p",6)(8,"small"),o._uU(9,"Produtos cadastrados em "),o.TgZ(10,"strong"),o._uU(11),o.qZA()()()(),o.TgZ(12,"div",7),o.YNc(13,e,1,0,"app-empresa-select",8),o.qZA()(),o.TgZ(14,"div",9),o._UZ(15,"app-list-shared",10),o.qZA()(),o._UZ(16,"router-outlet")),2&l&&(o.xp6(3),o.Q6J("icon",f.faHandHoldingDollar),o.xp6(8),o.Oqu(f.empresaSelected.nome),o.xp6(2),o.Q6J("ngIf",f.account&&1==f.account.perfilAcesso_Id),o.xp6(2),o.Q6J("createLink",o.DdM(15,s))("onCreate",f.create)("canCreate",!0)("list",f.list)("filterLink",!1)("filterTable",!0)("paginator",!0)("sortTable",!0)("menuTable",!0)("columns",f.columns)("tableLinks",f.tableLinks)("selectable",!0))},dependencies:[d.O5,m.lC,U.o,P.l,y.BN]}),i})(),children:[{path:"cadastrar",component:p.G},{path:"editar/:produto_id",component:I.F},{path:"excluir/:produto_id",component:S.T},{path:"habilitar/:produto_id",component:r.T,title:"Planner - Habilitar produto"},{path:"desabilitar/:produto_id",component:r.T,title:"Planner - Desabilitar produto "}]}];let E=(()=>{class i{}return i.\u0275fac=function(l){return new(l||i)},i.\u0275mod=o.oAB({type:i}),i.\u0275inj=o.cJS({imports:[m.Bz.forChild(a),m.Bz]}),i})(),M=(()=>{class i{}return i.\u0275fac=function(l){return new(l||i)},i.\u0275cmp=o.Xpm({type:i,selectors:[["app-produtos"]],decls:1,vars:0,template:function(l,f){1&l&&o._UZ(0,"router-outlet")},dependencies:[m.lC]}),i})();var O=t(9880);let n=(()=>{class i{}return i.\u0275fac=function(l){return new(l||i)},i.\u0275mod=o.oAB({type:i,bootstrap:[M]}),i.\u0275inj=o.cJS({imports:[d.ez,E,O.m,y.uH]}),i})()},9885:(D,h,t)=>{t.d(h,{m:()=>U});var d=t(1135),m=t(4004),p=t(9243),r=t(2340),S=t(9535),I=t(9398),C=t(8913),L=t(46),g=t(6886),T=t(1685),A=t(9876),R=t(4409),v=t(4650),B=t(202),b=t(529),o=t(7185);let U=(()=>{class P{constructor(e,s,u,a,E,M,O,n){this.router=e,this.table=s,this.http=u,this.toastr=a,this.crypto=E,this.dropdownService=M,this.empresaService=O,this.accountService=n,this.url=r.N.url,this.list=new d.X([]),this.objeto=new d.X(void 0),this.carteiraSetup=new d.X([]),this.empresa=new I.oW,this.account=new T.mR,this.empresa=this.empresaService.object,this.empresaService.empresa.subscribe(i=>this.empresa=i),this.accountService.account.subscribe(i=>{this.account=i??new T.mR,"noemi.admin@gmail.com"==i?.email&&(this.url=r.N.urlLocal)})}getObject(){var e=localStorage.getItem("produto");return e&&this.setObject(this.crypto.decrypt(e)??new g.a7),this.objeto}setObject(e){localStorage.setItem("produto",this.crypto.encrypt(e)??""),this.objeto.next(e)}add_To_Empresa_List(e){if(this.empresa){var s=this.empresa.produto??[];let a=this.dropdownService.tipoAtivo.value.find(n=>n.id==e.tipoAtivo_Id);if(!a)return this.toastr.error("Selecione um tipo de ativo v\xe1lido!!"),!1;e.tipoAtivo=a;let E=this.dropdownService.tipoRisco.value.find(n=>n.id==e.tipoRisco_Id);if(!E)return this.toastr.error("Selecione um tipo de risco v\xe1lido!!"),!1;e.tipoRisco=E;let M=this.dropdownService.tipoLiquidez.value.find(n=>n.id==e.tipoLiquidez_Id);if(!M)return this.toastr.error("Selecione um tipo de liquidez v\xe1lido!!"),!1;e.tipoLiquidez=M,s.sort((n,i)=>n.id-i.id);var u=0==s.length?0:s[s.length-1].id;e.id=++u,e.registroNaoSalvo=!0;let O=Object.assign({},e);return s.push(O),this.empresa.produto=s,this.empresaService.setObject(this.empresa,"add_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0}return this.toastr.error("Nenhuma empresa selecionada."),!1}edit_To_Empresa_List(e){if(this.empresa){var s=this.empresa.produto??[];let u=s.findIndex(a=>a.id==e.id);if(-1!=u){let a=this.dropdownService.tipoAtivo.value.find(n=>n.id==e.tipoAtivo_Id);if(!a)return this.toastr.error("Selecione um tipo de ativo v\xe1lido!!"),!1;e.tipoAtivo=a;let E=this.dropdownService.tipoRisco.value.find(n=>n.id==e.tipoRisco_Id);if(!E)return this.toastr.error("Selecione um tipo de risco v\xe1lido!!"),!1;e.tipoRisco=E;let M=this.dropdownService.tipoLiquidez.value.find(n=>n.id==e.tipoLiquidez_Id);if(!M)return this.toastr.error("Selecione um tipo de liquidez v\xe1lido!!"),!1;e.tipoLiquidez=M;let O=Object.assign({},e);return s.splice(u,1,O),this.empresa.produto=s,this.empresaService.setObject(this.empresa,"edit_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),!0}return this.toastr.error("Produto n\xe3o encontrado!!"),!1}return this.toastr.error("Nenhuma empresa selecionada."),!1}delete_To_Empresa_List(e){if(this.empresa){var s=this.empresa.produto??[];let u=s.findIndex(a=>a.id==e);return-1!=u?(s.splice(u,1),this.empresa.produto=s,this.empresaService.setObject(this.empresa,"delete_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0):(this.toastr.error("Produto n\xe3o encontrado!!"),!1)}return this.toastr.error("Nenhuma empresa selecionada."),!1}getList(e,s){return this.http.get(`${this.url}/produto/all/${e=e??(this.account.perfilAcesso_Id!=R.u.Admin?this.account.empresa_Id:this.empresa.id)}/${s=s??""}`).pipe((0,m.U)(u=>(u=u.map(a=>(a.ativo=!a.dataDesativado,a)),this.list.next(u),u)))}get(e){return this.http.get(`${this.url}/produto/${e}`)}create(e){return this.http.post(`${this.url}/produto/${this.account.perfilAcesso_Id!=R.u.Admin?this.account.empresa_Id:this.empresa.id}`,e)}edit(e){return this.http.put(`${this.url}/produto/`,e)}deactivated(e,s){return this.http.patch(`${this.url}/produto/${e}/${s}`,{})}delete(e){return this.http.delete(`${this.url}/produto/${e}`)}}return P.\u0275fac=function(e){return new(e||P)(v.LFG(B.F0),v.LFG(L.i),v.LFG(b.eN),v.LFG(o._W),v.LFG(p.w),v.LFG(S.V),v.LFG(C.P),v.LFG(A.B))},P.\u0275prov=v.Yz7({token:P,factory:P.\u0275fac,providedIn:"root"}),P})()}}]);