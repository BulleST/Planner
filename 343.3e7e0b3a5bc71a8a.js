"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[343],{8164:(Y,_,t)=>{t.d(_,{Sf:()=>y,bo:()=>b});var h=t(655),m=t(43),n=t(1956),T=t(805);class b{constructor(){this.id=0,this.empresa_Id=0,this.perfilAcesso=void 0,this.perfilAcesso_Id=void 0,this.name="",this.email="",this.telefoneCelular="",this.registroNaoSalvo=!1}}(0,h.gn)([(0,m.Vp)(),(0,h.w6)("design:type",Boolean)],b.prototype,"registroNaoSalvo",void 0),(0,h.gn)([(0,m.Vp)(),(0,h.w6)("design:type",Boolean)],class U{constructor(){this.id=0,this.empresa_Id=0,this.perfilAcesso_Id=void 0,this.name="",this.email="",this.telefoneCelular="",this.registroNaoSalvo=!1}}.prototype,"registroNaoSalvo",void 0);var y=[{field:"id",header:"Id",filterType:n.vA.text,filterDisplay:n.w2.menu},{field:"name",header:"Nome",filterType:n.vA.text,filterDisplay:n.w2.menu,maskType:n.O.substring,substringLength:22},{field:"email",header:"E-mail",filterType:n.vA.text,filterDisplay:n.w2.menu,maskType:n.O.substring,substringLength:30},{field:"telefoneCelular",header:"Telefone/Celular",filterType:n.vA.text,filterDisplay:n.w2.menu,maskType:n.O.telefoneCelular},{field:"perfilAcesso.perfil",header:"Tipo de Acesso",filterType:n.vA.text,filterDisplay:n.w2.menu},{field:"ativo",header:"Ativo",maskType:n.O.boolean,filterType:n.vA.text,filterDisplay:n.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,filterMatchMode:T.a6.CONTAINS,booleanValues:{true:"ativo",false:"inativo"}}]},6343:(Y,_,t)=>{t.r(_),t.d(_,{UsuariosModule:()=>ee});var h=t(6895),m=t(202),n=t(1829),T=t(9155),b=t(662),U=t(2193),y=t(5861),O=t(801),C=t(9808),v=t(4409),B=t(1685),W=t(9398),P=t(8164),L=t(9876),g=t(8913),I=t(3071),x=t(46),e=t(4650),F=t(453),s=t(8944),r=t(3868);function l(a,u){1&a&&e._UZ(0,"app-empresa-select")}const d=function(){return["cadastrar"]};let S=(()=>{class a{constructor(o,i,f,A){var M=this;this.userService=o,this.empresaService=i,this.table=f,this.accountService=A,this.faUsers=O.FVb,this.Role=v.u,this.columns=P.Sf,this.list=[],this.tableLinks=[],this.account=new B.mR,this.menuTable=!0,this.empresaSelected=new W.oW,this.subscription=[],this.create=(p=this.userService)=>{p.setObject(new P.bo)};var N=this.accountService.account.subscribe(p=>this.account=p??new B.mR),K=this.userService.list.subscribe(p=>this.list=p),E=this.empresaService.empresa.subscribe(function(){var p=(0,y.Z)(function*($){M.empresaSelected=$,0!=$.id&&(yield(0,C.n)(M.userService.getList()))});return function($){return p.apply(this,arguments)}}()),j=this.table.selected.subscribe(p=>{p&&((this.account.perfilAcesso_Id==v.u.Admin||this.account.perfilAcesso_Id==v.u.Master&&p.perfilAcesso_Id!=v.u.Admin)&&(this.tableLinks=[{label:"Editar",routePath:["editar"],paramsFieldName:["id"]},{label:p.ativo?"Desabilitar":"Habilitar",routePath:[p.ativo?"desabilitar":"habilitar"],paramsFieldName:["id"]},{label:"Resetar senha",routePath:["reset-password"],paramsFieldName:["id"]}]),this.tableLinks=this.table.encryptParams(this.tableLinks))});this.subscription.push(N),this.subscription.push(K),this.subscription.push(E),this.subscription.push(j)}ngOnDestroy(){this.subscription.forEach(o=>o.unsubscribe())}canMenu(){return`(${this.account.perfilAcesso_Id} == ${v.u.Admin}) || (${this.account.perfilAcesso_Id} == ${v.u.Master} && item.perfilAcesso_Id != ${v.u.Admin})`}}return a.\u0275fac=function(o){return new(o||a)(e.Y36(I.i),e.Y36(g.P),e.Y36(x.i),e.Y36(L.B))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-list"]],decls:17,vars:16,consts:[[1,"page"],[1,"page__header"],[1,"title-icon"],[3,"icon"],[1,"mr-auto"],[1,"page__header-title"],[1,"page__header-subtitle"],[1,"ml-auto","mb-0","col-xl-3","col-lg-4","col-md-5","col-sm-5","col-12","px-0"],[4,"ngIf"],[1,"page__body"],[3,"createLink","onCreate","canCreate","list","filterLink","filterTable","paginator","sortTable","menuTable","columns","tableLinks","selectable"]],template:function(o,i){1&o&&(e.TgZ(0,"section",0)(1,"div",1)(2,"span",2),e._UZ(3,"fa-icon",3),e.qZA(),e.TgZ(4,"div",4)(5,"h3",5),e._uU(6,"Usu\xe1rios"),e.qZA(),e.TgZ(7,"p",6)(8,"small"),e._uU(9,"Usu\xe1rios cadastrados em "),e.TgZ(10,"strong"),e._uU(11),e.qZA()()()(),e.TgZ(12,"div",7),e.YNc(13,l,1,0,"app-empresa-select",8),e.qZA()(),e.TgZ(14,"div",9),e._UZ(15,"app-list-shared",10),e.qZA()(),e._UZ(16,"router-outlet")),2&o&&(e.xp6(3),e.Q6J("icon",i.faUsers),e.xp6(8),e.Oqu(i.empresaSelected.nome),e.xp6(2),e.Q6J("ngIf",i.account&&1==i.account.perfilAcesso_Id),e.xp6(2),e.Q6J("createLink",e.DdM(15,d))("onCreate",i.create)("canCreate",!0)("list",i.list)("filterLink",!1)("filterTable",!0)("paginator",!0)("sortTable",!0)("menuTable",i.canMenu())("columns",i.columns)("tableLinks",i.tableLinks)("selectable",!0))},dependencies:[h.O5,m.lC,F.o,s.l,r.BN]}),a})();var c=t(9243),D=t(7549);function R(a,u){1&a&&(e.TgZ(0,"div")(1,"p"),e._uU(2,"Tem certeza que deseja resetar sua senha?"),e.qZA(),e.TgZ(3,"p"),e._uU(4,"Ao resetar sua senha, voc\xea ser\xe1 automaticamente deslogado para realizar novo login."),e.qZA(),e.TgZ(5,"p",11)(6,"small"),e._uU(7,"Voc\xea receber\xe1 um email informando dessa altera\xe7\xe3o."),e.qZA()()())}function J(a,u){1&a&&(e.TgZ(0,"div")(1,"p"),e._uU(2,"Tem certeza que deseja resetar a senha desse usu\xe1rio? "),e.qZA(),e.TgZ(3,"p",11)(4,"small"),e._uU(5,"Esse usu\xe1rio receber\xe1 um email o informando dessa altera\xe7\xe3o."),e.qZA()()())}function w(a,u){1&a&&e._UZ(0,"span",12)}let z=(()=>{class a{constructor(o,i,f,A,M){this.activatedRoute=o,this.modal=i,this.userService=f,this.accountService=A,this.crypto=M,this.faTimes=O.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.url="",this.objeto=new P.bo,this.subscription=[],this.routerBack=["../../"],this.userLogado=this.accountService.accountValue;var N=this.modal.getOpen().subscribe(E=>this.modalOpen=E);this.subscription.push(N),this.url=this.activatedRoute.snapshot.pathFromRoot.map(E=>E.routeConfig?.path).join("/");var K=this.activatedRoute.params.subscribe(E=>{E.usuario_id?(this.objeto.id=this.crypto.decrypt(E.usuario_id),(0,C.n)(this.userService.get(this.objeto.id)).then(j=>{this.objeto=j,setTimeout(()=>{this.modal.setOpen(!0)},200)}).catch(j=>{this.voltar()})):this.voltar()});this.subscription.push(K)}ngOnDestroy(){this.subscription.forEach(o=>o.unsubscribe())}voltar(){this.modal.voltar(this.routerBack,this.routeBackOptions)}send(){this.loading=!0,(0,C.n)(this.userService.resetPassword(this.objeto.id)).then(o=>{this.voltar(),this.objeto.email==this.userLogado?.email&&this.accountService.logout()}).catch().finally(()=>this.loading=!1)}}return a.\u0275fac=function(o){return new(o||a)(e.Y36(m.gz),e.Y36(D.Q),e.Y36(I.i),e.Y36(L.B),e.Y36(c.w))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-reset-password"]],decls:17,vars:5,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],[4,"ngIf"],[1,"btn","btn-grey","ml-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],[1,"text-danger"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(o,i){1&o&&(e.TgZ(0,"div",0)(1,"div",1),e.NdJ("click",function(){return i.voltar()}),e.qZA(),e.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),e._uU(6,"Resetar senha"),e.qZA(),e.TgZ(7,"a",6),e.NdJ("click",function(){return i.voltar()}),e._UZ(8,"span")(9,"span"),e.qZA()(),e.TgZ(10,"div",7),e.YNc(11,R,8,0,"div",8),e.YNc(12,J,6,0,"div",8),e.TgZ(13,"button",9),e.NdJ("click",function(){return i.send()}),e.YNc(14,w,1,0,"span",10),e.TgZ(15,"span"),e._uU(16," Resetar"),e.qZA()()()()()()),2&o&&(e.ekj("active",i.modalOpen),e.xp6(11),e.Q6J("ngIf",(null==i.userLogado?null:i.userLogado.email)==i.objeto.email),e.xp6(1),e.Q6J("ngIf",(null==i.userLogado?null:i.userLogado.email)!=i.objeto.email),e.xp6(2),e.Q6J("ngIf",i.loading))},dependencies:[h.O5]}),a})();var V=t(9751),G=t(7185);let Z=(()=>{class a{constructor(o,i,f,A){this.accountService=o,this.userService=i,this.router=f,this.toastr=A}canActivate(o,i){return new V.y(f=>{this.userService.objeto.subscribe(A=>{f.next(this.accountService.accountValue?.perfilAcesso_Id!=v.u.Master||A?.perfilAcesso_Id!=v.u.Admin)})})}}return a.\u0275fac=function(o){return new(o||a)(e.LFG(L.B),e.LFG(I.i),e.LFG(m.F0),e.LFG(G._W))},a.\u0275prov=e.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})();const Q=[{path:"",component:S,children:[{path:"cadastrar",component:n.G,title:"Planner - Cadastrar usu\xe1rio"},{path:"editar/:usuario_id",component:U.F,title:"Planner - Editar usu\xe1rio",canActivate:[Z]},{path:"excluir/:usuario_id",component:b.T,title:"Planner - Excluir usu\xe1rio",canActivate:[Z]},{path:"reset-password/:usuario_id",component:z,title:"Planner - Resetar senha",canActivate:[Z]},{path:"habilitar/:usuario_id",component:T.T,title:"Planner - Habilitar usu\xe1rio",canActivate:[Z]},{path:"desabilitar/:usuario_id",component:T.T,title:"Planner - Desabilitar usu\xe1rio",canActivate:[Z]}]}];let X=(()=>{class a{}return a.\u0275fac=function(o){return new(o||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[m.Bz.forChild(Q),m.Bz]}),a})();var H=t(433),k=t(9880),q=t(47);let ee=(()=>{class a{}return a.\u0275fac=function(o){return new(o||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[h.ez,X,H.u5,G.Rh,k.m,r.uH,q.U$]}),a})()},3071:(Y,_,t)=>{t.d(_,{i:()=>x});var h=t(529),m=t(1135),n=t(8505),T=t(9646),b=t(9243),U=t(8164),y=t(2340),O=t(9535),C=t(9398),v=t(8913),B=t(46),W=t(9876),P=t(1685),L=t(4409),g=t(4650),I=t(7185);let x=(()=>{class e{constructor(s,r,l,d,S,c,D){this.table=s,this.http=r,this.toastr=l,this.crypto=d,this.dropdownService=S,this.empresaService=c,this.accountService=D,this.url=y.N.url,this.list=new m.X([]),this.objeto=new m.X(void 0),this.empresa=new C.oW,this.account=new P.mR,this.empresa=this.empresaService.object,this.empresaService.empresa.subscribe(R=>this.empresa=R),this.accountService.account.subscribe(R=>this.account=R??new P.mR)}getObject(){var s=localStorage.getItem("usuario");return s&&this.setObject(this.crypto.decrypt(s)??new U.bo),this.objeto}setObject(s){localStorage.setItem("usuario",this.crypto.encrypt(s)??""),this.objeto.next(s)}add_To_Empresa_List(s){if(this.empresa){var r=this.empresa.account??[];let d=this.dropdownService.perfilAcesso.value.find(c=>c.id==s.perfilAcesso_Id);if(!d)return this.toastr.error("Selecione um perfil de acesso v\xe1lido!!"),!1;if(s.perfilAcesso=d,this.empresa.account.find(c=>c.email==s.email))return this.toastr.error("Esse e-mail j\xe1 foi cadastrado!!"),!1;r.sort((c,D)=>c.id-D.id);var l=0==r.length?0:r[r.length-1].id;return s.id=++l,s.registroNaoSalvo=!0,r.push(s),this.empresa.account=r,this.empresaService.setObject(this.empresa,"add_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0}return this.toastr.error("Nenhuma empresa selecionada."),!1}edit_To_Empresa_List(s){if(this.empresa){var r=this.empresa.account??[];let l=r.findIndex(d=>d.id==s.id);if(-1!=l){let d=this.dropdownService.perfilAcesso.value.find(c=>c.id==s.perfilAcesso_Id);return d?(s.perfilAcesso=d,this.empresa.account.find(c=>c.email==s.email&&c.id!=s.id)?(this.toastr.error("E-mail j\xe1 foram cadastrados!!"),!1):(r.splice(l,1,s),this.empresa.account=r,this.empresaService.setObject(this.empresa,"edit_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),!0)):(this.toastr.error("Selecione um perfil de investidor v\xe1lido!!"),!1)}return this.toastr.error("Usuario n\xe3o encontrado!!"),!1}return this.toastr.error("Nenhuma empresa selecionada."),!1}delete_To_Empresa_List(s){if(this.empresa){var r=this.empresa.account??[];let l=r.findIndex(d=>d.id==s);return-1!=l?(r.splice(l,1),this.empresa.account=r,this.empresaService.setObject(this.empresa,"delete_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0):(this.toastr.error("Usuario n\xe3o encontrado!!"),!1)}return this.toastr.error("Nenhuma empresa selecionada."),!1}getList(s){return this.table.loading.next(!0),this.http.get(`${this.url}/usuario/all/${s=s??(this.account.perfilAcesso_Id!=L.u.Admin?this.account.empresa_Id:this.empresa.id)}`,{headers:new h.WM({loading:"false"})}).pipe((0,n.b)({next:r=>(r=r.map(l=>(l.ativo=!l.dataDesativado,l)),this.list.next(r),(0,T.of)(r))}))}get(s){return this.http.get(`${this.url}/usuario/${s}`,{headers:new h.WM({loading:"true"})})}create(s){return this.http.post(`${this.url}/usuario/${this.account.perfilAcesso_Id!=L.u.Admin?this.account.empresa_Id:this.empresa.id}`,s)}edit(s){return this.http.put(`${this.url}/usuario`,s)}delete(s){return this.http.delete(`${this.url}/usuario/${s}`)}deactivated(s,r){return this.http.patch(`${this.url}/usuario/${s}/${r}`,{})}resetPassword(s){return this.http.patch(`${this.url}/usuario/reset-password/${s}`,{})}}return e.\u0275fac=function(s){return new(s||e)(g.LFG(B.i),g.LFG(h.eN),g.LFG(I._W),g.LFG(b.w),g.LFG(O.V),g.LFG(v.P),g.LFG(W.B))},e.\u0275prov=g.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);