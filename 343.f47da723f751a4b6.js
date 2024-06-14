"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[343],{8164:(J,b,t)=>{t.d(b,{Sf:()=>D,bo:()=>P});var p=t(655),v=t(43),n=t(1956),O=t(805);class P{constructor(){this.id=0,this.empresa_Id=0,this.perfilAcesso=void 0,this.perfilAcesso_Id=void 0,this.name="",this.email="",this.telefoneCelular="",this.registroNaoSalvo=!1}}(0,p.gn)([(0,v.Vp)(),(0,p.w6)("design:type",Boolean)],P.prototype,"registroNaoSalvo",void 0),(0,p.gn)([(0,v.Vp)(),(0,p.w6)("design:type",Boolean)],class C{constructor(){this.id=0,this.empresa_Id=0,this.perfilAcesso_Id=void 0,this.name="",this.email="",this.telefoneCelular="",this.registroNaoSalvo=!1}}.prototype,"registroNaoSalvo",void 0);var D=[{field:"id",header:"Id",filterType:n.vA.text,filterDisplay:n.w2.menu},{field:"name",header:"Nome",filterType:n.vA.text,filterDisplay:n.w2.menu,maskType:n.O.undefined},{field:"email",header:"E-mail",filterType:n.vA.text,filterDisplay:n.w2.menu,maskType:n.O.substring,substringLength:30},{field:"telefoneCelular",header:"Telefone/Celular",filterType:n.vA.text,filterDisplay:n.w2.menu,maskType:n.O.telefoneCelular},{field:"perfilAcesso.perfil",header:"Tipo de Acesso",filterType:n.vA.text,filterDisplay:n.w2.menu},{field:"ativo",header:"Ativo",maskType:n.O.boolean,filterType:n.vA.text,filterDisplay:n.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,filterMatchMode:O.a6.CONTAINS,booleanValues:{true:"ativo",false:"inativo"}}]},6343:(J,b,t)=>{t.r(b),t.d(b,{UsuariosModule:()=>ee});var p=t(6895),v=t(202),n=t(1829),O=t(9155),P=t(662),C=t(2193),D=t(5861),L=t(801),I=t(9808),f=t(4409),Z=t(1685),x=t(9398),M=t(8164),U=t(9876),F=t(8913),d=t(3071),W=t(46),e=t(4650),E=t(453),N=t(8944),s=t(3868);function r(a,u){1&a&&e._UZ(0,"app-empresa-select")}const l=function(){return["cadastrar"]};let h=(()=>{class a{constructor(o,i,g,T){var S=this;this.userService=o,this.empresaService=i,this.table=g,this.accountService=T,this.faUsers=L.FVb,this.Role=f.u,this.columns=M.Sf,this.list=[],this.tableLinks=[],this.account=new Z.mR,this.menuTable=!0,this.empresaSelected=new x.oW,this.subscription=[],this.create=(m=this.userService)=>{m.setObject(new M.bo)};var $=this.accountService.account.subscribe(m=>this.account=m??new Z.mR),Y=this.userService.list.subscribe(m=>this.list=m);this.table.currentPage.next(1);var A=this.empresaService.empresa.subscribe(function(){var m=(0,D.Z)(function*(G){S.empresaSelected=G,0!=G.id&&(yield(0,I.n)(S.userService.getList()))});return function(G){return m.apply(this,arguments)}}()),j=this.table.selected.subscribe(m=>{m&&((this.account.perfilAcesso_Id==f.u.Admin||this.account.perfilAcesso_Id==f.u.Master&&m.perfilAcesso_Id!=f.u.Admin)&&(this.tableLinks=[{label:"Editar",routePath:["editar"],paramsFieldName:["id"]},{label:m.ativo?"Desabilitar":"Habilitar",routePath:[m.ativo?"desabilitar":"habilitar"],paramsFieldName:["id"]},{label:"Resetar senha",routePath:["reset-password"],paramsFieldName:["id"]},{label:"Excluir",routePath:["excluir"],paramsFieldName:["id"]}]),this.tableLinks=this.table.encryptParams(this.tableLinks))});this.subscription.push($),this.subscription.push(Y),this.subscription.push(A),this.subscription.push(j)}ngOnDestroy(){this.subscription.forEach(o=>o.unsubscribe())}canMenu(){return`(${this.account.perfilAcesso_Id} == ${f.u.Admin}) || (${this.account.perfilAcesso_Id} == ${f.u.Master} && item.perfilAcesso_Id != ${f.u.Admin})`}}return a.\u0275fac=function(o){return new(o||a)(e.Y36(d.i),e.Y36(F.P),e.Y36(W.i),e.Y36(U.B))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-list"]],decls:17,vars:16,consts:[[1,"page"],[1,"page__header"],[1,"title-icon"],[3,"icon"],[1,"mr-auto"],[1,"page__header-title"],[1,"page__header-subtitle"],[1,"ml-auto","mb-0","col-xl-3","col-lg-4","col-md-5","col-sm-5","col-12","px-0"],[4,"ngIf"],[1,"page__body"],[3,"createLink","onCreate","canCreate","list","filterLink","filterTable","paginator","sortTable","menuTable","columns","tableLinks","selectable"]],template:function(o,i){1&o&&(e.TgZ(0,"section",0)(1,"div",1)(2,"span",2),e._UZ(3,"fa-icon",3),e.qZA(),e.TgZ(4,"div",4)(5,"h3",5),e._uU(6,"Usu\xe1rios"),e.qZA(),e.TgZ(7,"p",6)(8,"small"),e._uU(9,"Usu\xe1rios cadastrados em "),e.TgZ(10,"strong"),e._uU(11),e.qZA()()()(),e.TgZ(12,"div",7),e.YNc(13,r,1,0,"app-empresa-select",8),e.qZA()(),e.TgZ(14,"div",9),e._UZ(15,"app-list-shared",10),e.qZA()(),e._UZ(16,"router-outlet")),2&o&&(e.xp6(3),e.Q6J("icon",i.faUsers),e.xp6(8),e.Oqu(i.empresaSelected.nome),e.xp6(2),e.Q6J("ngIf",i.account&&1==i.account.perfilAcesso_Id),e.xp6(2),e.Q6J("createLink",e.DdM(15,l))("onCreate",i.create)("canCreate",!0)("list",i.list)("filterLink",!1)("filterTable",!0)("paginator",!0)("sortTable",!0)("menuTable",i.canMenu())("columns",i.columns)("tableLinks",i.tableLinks)("selectable",!0))},dependencies:[p.O5,v.lC,E.o,N.l,s.BN]}),a})();var y=t(9243),c=t(7549);function R(a,u){1&a&&(e.TgZ(0,"div")(1,"p"),e._uU(2,"Tem certeza que deseja resetar sua senha?"),e.qZA(),e.TgZ(3,"p"),e._uU(4,"Ao resetar sua senha, voc\xea ser\xe1 automaticamente deslogado para realizar novo login."),e.qZA(),e.TgZ(5,"p",11)(6,"small"),e._uU(7,"Voc\xea receber\xe1 um email informando dessa altera\xe7\xe3o."),e.qZA()()())}function K(a,u){1&a&&(e.TgZ(0,"div")(1,"p"),e._uU(2,"Tem certeza que deseja resetar a senha desse usu\xe1rio? "),e.qZA(),e.TgZ(3,"p",11)(4,"small"),e._uU(5,"Esse usu\xe1rio receber\xe1 um email o informando dessa altera\xe7\xe3o."),e.qZA()()())}function _(a,u){1&a&&e._UZ(0,"span",12)}let V=(()=>{class a{constructor(o,i,g,T,S){this.activatedRoute=o,this.modal=i,this.userService=g,this.accountService=T,this.crypto=S,this.faTimes=L.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.url="",this.objeto=new M.bo,this.subscription=[],this.routerBack=["../../"],this.userLogado=this.accountService.accountValue,this.routeBackOptions={relativeTo:this.activatedRoute};var $=this.modal.getOpen().subscribe(A=>this.modalOpen=A);this.subscription.push($),this.url=this.activatedRoute.snapshot.pathFromRoot.map(A=>A.routeConfig?.path).join("/");var Y=this.activatedRoute.params.subscribe(A=>{A.usuario_id?(this.objeto.id=this.crypto.decrypt(A.usuario_id),(0,I.n)(this.userService.get(this.objeto.id)).then(j=>{this.objeto=j,setTimeout(()=>{this.modal.setOpen(!0)},200)}).catch(j=>{this.voltar()})):this.voltar()});this.subscription.push(Y)}ngOnDestroy(){this.subscription.forEach(o=>o.unsubscribe())}voltar(){this.modal.voltar(this.routerBack,this.routeBackOptions)}send(){this.loading=!0,(0,I.n)(this.userService.resetPassword(this.objeto.id)).then(o=>{this.voltar(),this.objeto.email==this.userLogado?.email&&this.accountService.logout()}).catch().finally(()=>this.loading=!1)}}return a.\u0275fac=function(o){return new(o||a)(e.Y36(v.gz),e.Y36(c.Q),e.Y36(d.i),e.Y36(U.B),e.Y36(y.w))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-reset-password"]],decls:17,vars:5,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],[4,"ngIf"],[1,"btn","btn-grey","ml-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],[1,"text-danger"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(o,i){1&o&&(e.TgZ(0,"div",0)(1,"div",1),e.NdJ("click",function(){return i.voltar()}),e.qZA(),e.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),e._uU(6,"Resetar senha"),e.qZA(),e.TgZ(7,"a",6),e.NdJ("click",function(){return i.voltar()}),e._UZ(8,"span")(9,"span"),e.qZA()(),e.TgZ(10,"div",7),e.YNc(11,R,8,0,"div",8),e.YNc(12,K,6,0,"div",8),e.TgZ(13,"button",9),e.NdJ("click",function(){return i.send()}),e.YNc(14,_,1,0,"span",10),e.TgZ(15,"span"),e._uU(16," Resetar"),e.qZA()()()()()()),2&o&&(e.ekj("active",i.modalOpen),e.xp6(11),e.Q6J("ngIf",(null==i.userLogado?null:i.userLogado.email)==i.objeto.email),e.xp6(1),e.Q6J("ngIf",(null==i.userLogado?null:i.userLogado.email)!=i.objeto.email),e.xp6(2),e.Q6J("ngIf",i.loading))},dependencies:[p.O5]}),a})();var w=t(9751),z=t(7185);let B=(()=>{class a{constructor(o,i,g,T){this.accountService=o,this.userService=i,this.router=g,this.toastr=T}canActivate(o,i){return new w.y(g=>{this.userService.objeto.subscribe(T=>{g.next(this.accountService.accountValue?.perfilAcesso_Id!=f.u.Master||T?.perfilAcesso_Id!=f.u.Admin)})})}}return a.\u0275fac=function(o){return new(o||a)(e.LFG(U.B),e.LFG(d.i),e.LFG(v.F0),e.LFG(z._W))},a.\u0275prov=e.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})();const Q=[{path:"",component:h,title:"Planner - Usu\xe1rios",children:[{path:"cadastrar",component:n.G,title:"Planner - Cadastrar usu\xe1rio"},{path:"editar/:usuario_id",component:C.F,title:"Planner - Editar usu\xe1rio",canActivate:[B]},{path:"excluir/:usuario_id",component:P.T,title:"Planner - Excluir usu\xe1rio",canActivate:[B]},{path:"reset-password/:usuario_id",component:V,title:"Planner - Resetar senha",canActivate:[B]},{path:"habilitar/:usuario_id",component:O.T,title:"Planner - Habilitar usu\xe1rio",canActivate:[B]},{path:"desabilitar/:usuario_id",component:O.T,title:"Planner - Desabilitar usu\xe1rio",canActivate:[B]}]}];let X=(()=>{class a{}return a.\u0275fac=function(o){return new(o||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[v.Bz.forChild(Q),v.Bz]}),a})();var H=t(433),k=t(7864),q=t(7318);let ee=(()=>{class a{}return a.\u0275fac=function(o){return new(o||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[p.ez,X,H.u5,z.Rh,k.m,s.uH,q.U$]}),a})()},3071:(J,b,t)=>{t.d(b,{i:()=>e});var p=t(529),v=t(1135),n=t(8505),O=t(9646),P=t(9243),C=t(8164),D=t(2340),L=t(9535),I=t(9398),f=t(8913),Z=t(46),x=t(9876),M=t(1685),U=t(4409),F=t(1939),d=t(4650),W=t(7185);let e=(()=>{class E{constructor(s,r,l,h,y,c,R,K){this.table=s,this.http=r,this.toastr=l,this.crypto=h,this.dropdownService=y,this.empresaService=c,this.accountService=R,this.urlBackendService=K,this.url=D.N.url,this.list=new v.X([]),this.objeto=new v.X(void 0),this.empresa=new I.oW,this.account=new M.mR,this.urlBackendService.url.subscribe(_=>this.url=_),this.empresa=this.empresaService.object,this.empresaService.empresa.subscribe(_=>this.empresa=_),this.accountService.account.subscribe(_=>this.account=_??new M.mR)}getObject(){var s=localStorage.getItem("usuario");return s&&this.setObject(this.crypto.decrypt(s)??new C.bo),this.objeto}setObject(s){localStorage.setItem("usuario",this.crypto.encrypt(s)??""),this.objeto.next(s)}add_To_Empresa_List(s){if(this.empresa){var r=this.empresa.account??[];let h=this.dropdownService.perfilAcesso.value.find(c=>c.id==s.perfilAcesso_Id);if(!h)return this.toastr.error("Selecione um perfil de acesso v\xe1lido!!"),!1;if(s.perfilAcesso=h,this.empresa.account.find(c=>c.email==s.email))return this.toastr.error("Esse e-mail j\xe1 foi cadastrado!!"),!1;r.sort((c,R)=>c.id-R.id);var l=0==r.length?0:r[r.length-1].id;return s.id=++l,s.registroNaoSalvo=!0,r.push(s),this.empresa.account=r,this.empresaService.setObject(this.empresa,"add_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0}return this.toastr.error("Nenhuma empresa selecionada."),!1}edit_To_Empresa_List(s){if(this.empresa){var r=this.empresa.account??[];let l=r.findIndex(h=>h.id==s.id);if(-1!=l){let h=this.dropdownService.perfilAcesso.value.find(c=>c.id==s.perfilAcesso_Id);return h?(s.perfilAcesso=h,this.empresa.account.find(c=>c.email==s.email&&c.id!=s.id)?(this.toastr.error("E-mail j\xe1 foram cadastrados!!"),!1):(r.splice(l,1,s),this.empresa.account=r,this.empresaService.setObject(this.empresa,"edit_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),!0)):(this.toastr.error("Selecione um perfil de investidor v\xe1lido!!"),!1)}return this.toastr.error("Usuario n\xe3o encontrado!!"),!1}return this.toastr.error("Nenhuma empresa selecionada."),!1}delete_To_Empresa_List(s){if(this.empresa){var r=this.empresa.account??[];let l=r.findIndex(h=>h.id==s);return-1!=l?(r.splice(l,1),this.empresa.account=r,this.empresaService.setObject(this.empresa,"delete_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0):(this.toastr.error("Usuario n\xe3o encontrado!!"),!1)}return this.toastr.error("Nenhuma empresa selecionada."),!1}getList(s){return this.table.loading.next(!0),this.http.get(`${this.url}/usuario/all/${s=s??(this.account.perfilAcesso_Id!=U.u.Admin?this.account.empresa_Id:this.empresa.id)}`,{headers:new p.WM({loading:"false"})}).pipe((0,n.b)({next:r=>(r=r.map(l=>(l.ativo=!l.dataDesativado,l)),this.list.next(r),(0,O.of)(r))}))}get(s){return this.http.get(`${this.url}/usuario/${s}`,{headers:new p.WM({loading:"true"})})}create(s){return this.http.post(`${this.url}/usuario/${this.account.perfilAcesso_Id!=U.u.Admin?this.account.empresa_Id:this.empresa.id}`,s)}edit(s){return this.http.put(`${this.url}/usuario`,s)}delete(s){return this.http.delete(`${this.url}/usuario/${s}`)}deactivated(s,r){return this.http.patch(`${this.url}/usuario/${s}/${r}`,{})}resetPassword(s){return this.http.patch(`${this.url}/usuario/reset-password/${s}`,{})}}return E.\u0275fac=function(s){return new(s||E)(d.LFG(Z.i),d.LFG(p.eN),d.LFG(W._W),d.LFG(P.w),d.LFG(L.V),d.LFG(f.P),d.LFG(x.B),d.LFG(F.j))},E.\u0275prov=d.Yz7({token:E,factory:E.\u0275fac,providedIn:"root"}),E})()}}]);