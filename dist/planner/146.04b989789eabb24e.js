"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[146],{8164:(x,C,o)=>{o.d(C,{Sf:()=>i,bo:()=>O});var e=o(655),T=o(43);class O{constructor(){this.id=0,this.empresa_Id=0,this.perfilAcesso=void 0,this.perfilAcesso_Id=void 0,this.name="",this.email="",this.telefoneCelular="",this.ativo=!0,this.registroNaoSalvo=!1}}(0,e.gn)([(0,T.Vp)(),(0,e.w6)("design:type",Boolean)],O.prototype,"registroNaoSalvo",void 0),(0,e.gn)([(0,T.Vp)(),(0,e.w6)("design:type",Boolean)],class v{constructor(){this.id=0,this.empresa_Id=0,this.perfilAcesso_Id=void 0,this.name="",this.email="",this.telefoneCelular="",this.registroNaoSalvo=!1}}.prototype,"registroNaoSalvo",void 0);var i=[{field:"id",header:"Id",filterType:"text",filterDisplay:"menu"},{field:"name",header:"Nome",filterType:"text",filterDisplay:"menu"},{field:"email",header:"E-mail",filterType:"text",filterDisplay:"menu"},{field:"perfilAcesso.perfil",header:"Tipo de Acesso",filterType:"text",filterDisplay:"menu"}]},1829:(x,C,o)=>{o.d(C,{G:()=>b});var e=o(801),T=o(8164),O=o(3071),v=o(9243),i=o(4650),P=o(8627),U=o(7185),t=o(7549),f=o(703);let b=(()=>{class E{constructor(u,d,r,l,n){this.activatedRoute=u,this.toastr=d,this.modal=r,this.userService=l,this.crypto=n,this.faTimes=e.NBC,this.modalOpen=!1,this.objeto=new T.bo,this.erro=[],this.loading=!1,this.url="",this.url=this.activatedRoute.snapshot.pathFromRoot.map(a=>a.routeConfig?.path).join("/"),this.modal.getOpen().subscribe(a=>{this.modalOpen=a}),this.url.includes("empresas/editar")&&u.parent?.parent?.params.subscribe(a=>{a.empresa_id?this.objeto.empresa_Id=this.crypto.decrypt(a.empresa_id):this.voltar()})}ngOnInit(){setTimeout(()=>{this.modal.setOpen(!0)},200)}voltar(){this.modal.voltar()}send(u){this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")?(this.userService.add_To_Empresa_List(this.objeto)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(this.url.includes("empresas/editar"),this.userService.create(this.objeto).subscribe({next:d=>{this.modal.voltar(),this.userService.getList(this.objeto.empresa_Id).subscribe()},error:d=>{this.loading=!1}}))}}return E.\u0275fac=function(u){return new(u||E)(i.Y36(P.gz),i.Y36(U._W),i.Y36(t.Q),i.Y36(O.i),i.Y36(v.w))},E.\u0275cmp=i.Xpm({type:E,selectors:[["app-create"]],decls:12,vars:6,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","800px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],[3,"objeto","loading","erro","isEditPage","sendData"]],template:function(u,d){1&u&&(i.TgZ(0,"div",0)(1,"div",1),i.NdJ("click",function(){return d.voltar()}),i.qZA(),i.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),i._uU(6,"Adicionar usu\xe1rio"),i.qZA(),i.TgZ(7,"a",6),i.NdJ("click",function(){return d.voltar()}),i._UZ(8,"span")(9,"span"),i.qZA()(),i.TgZ(10,"div",7)(11,"app-form-usuario",8),i.NdJ("sendData",function(l){return d.send(l)}),i.qZA()()()()()),2&u&&(i.ekj("active",d.modalOpen),i.xp6(11),i.Q6J("objeto",d.objeto)("loading",d.loading)("erro",d.erro)("isEditPage",!1))},dependencies:[f.w],styles:["@media (max-width: 768px){.email-container[_ngcontent-%COMP%], .senha-container[_ngcontent-%COMP%]{order:1}}"]}),E})()},662:(x,C,o)=>{o.d(C,{T:()=>d});var e=o(5861),T=o(801),O=o(9808),v=o(8164),i=o(8913),P=o(3071),U=o(9243),t=o(4650),f=o(8627),b=o(7185),E=o(7549),A=o(6895);function u(r,l){1&r&&t._UZ(0,"span",10)}let d=(()=>{class r{constructor(n,a,h,c,I,g){this.activatedRoute=n,this.toastr=a,this.modal=h,this.empresaService=c,this.userService=I,this.crypto=g,this.faTimes=T.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.url="",this.objeto=new v.bo,this.modal.getOpen().subscribe(D=>{this.modalOpen=D}),this.url=this.activatedRoute.snapshot.pathFromRoot.map(D=>D.routeConfig?.path).join("/"),this.activatedRoute.params.subscribe(D=>{D.usuario_id?this.objeto.id=this.crypto.decrypt(D.usuario_id):this.voltar()}),(this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo)&&(this.objeto=this.empresaService.empresaObject.value.account.find(D=>D.id==this.objeto.id))}ngOnInit(){setTimeout(()=>{this.modal.setOpen(!0)},200)}voltar(){this.modal.voltar()}send(){var a,n=this;this.loading=!0,this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?(this.userService.delete_To_Empresa_List(this.objeto.id)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(this.url.includes("empresas/editar"),this.userService.delete(this.objeto.id).subscribe({next:(a=(0,e.Z)(function*(h){yield(0,O.n)(n.userService.getList(n.objeto.empresa_Id)),n.voltar(),n.userService.setObject(new v.bo)}),function(c){return a.apply(this,arguments)}),error:a=>{this.loading=!1}}))}}return r.\u0275fac=function(n){return new(n||r)(t.Y36(f.gz),t.Y36(b._W),t.Y36(E.Q),t.Y36(i.P),t.Y36(P.i),t.Y36(U.w))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-delete"]],decls:19,vars:3,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],[1,"btn","btn-grey","ml-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(n,a){1&n&&(t.TgZ(0,"div",0)(1,"div",1),t.NdJ("click",function(){return a.voltar()}),t.qZA(),t.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),t._uU(6,"Excluir usu\xe1rio"),t.qZA(),t.TgZ(7,"a",6),t.NdJ("click",function(){return a.voltar()}),t._UZ(8,"span")(9,"span"),t.qZA()(),t.TgZ(10,"div",7)(11,"p"),t._uU(12,"Tem certeza que deseja excluir esse registro? Essa opera\xe7\xe3o n\xe3o poder\xe1 ser desfeita!!"),t.qZA(),t.TgZ(13,"p")(14,"small"),t._uU(15,' Quando clicar em "Excluir" ele perder\xe1 o acesso a plataforma.'),t.qZA()(),t.TgZ(16,"button",8),t.NdJ("click",function(){return a.send()}),t.YNc(17,u,1,0,"span",9),t._uU(18," Excluir "),t.qZA()()()()()),2&n&&(t.ekj("active",a.modalOpen),t.xp6(17),t.Q6J("ngIf",a.loading))},dependencies:[A.O5]}),r})()},2193:(x,C,o)=>{o.d(C,{F:()=>u});var e=o(5861),T=o(801),O=o(9808),v=o(8164),i=o(8913),P=o(3071),U=o(9243),t=o(4650),f=o(8627),b=o(7185),E=o(7549),A=o(703);let u=(()=>{class d{constructor(l,n,a,h,c,I){this.activatedRoute=l,this.toastr=n,this.modal=a,this.empresaService=h,this.userService=c,this.crypto=I,this.faTimes=T.NBC,this.modalOpen=!1,this.objeto=new v.bo,this.erro=[],this.loading=!1,this.url="",this.modal.getOpen().subscribe(g=>{this.modalOpen=g}),l.params.subscribe(g=>{g.usuario_id?this.objeto.id=this.crypto.decrypt(g.usuario_id):this.voltar()}),this.url=this.activatedRoute.snapshot.pathFromRoot.map(g=>g.routeConfig?.path).join("/"),this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?this.objeto=this.empresaService.empresaObject.value.account.find(g=>g.id==this.objeto.id):this.userService.get(this.objeto.id).subscribe({next:g=>{this.objeto=g},error:g=>{this.voltar()}})}ngOnInit(){setTimeout(()=>{this.modal.setOpen(!0)},200)}voltar(){this.modal.voltar()}send(l){var a,n=this;this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?(this.userService.edit_To_Empresa_List(this.objeto)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(this.url.includes("empresas/editar"),this.userService.edit(this.objeto).subscribe({next:(a=(0,e.Z)(function*(h){yield(0,O.n)(n.userService.getList(n.objeto.empresa_Id)),n.modal.voltar()}),function(c){return a.apply(this,arguments)}),error:a=>{this.loading=!1},complete:()=>{}}))}}return d.\u0275fac=function(l){return new(l||d)(t.Y36(f.gz),t.Y36(b._W),t.Y36(E.Q),t.Y36(i.P),t.Y36(P.i),t.Y36(U.w))},d.\u0275cmp=t.Xpm({type:d,selectors:[["app-edit"]],decls:12,vars:6,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","800px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],[3,"objeto","loading","erro","isEditPage","sendData"]],template:function(l,n){1&l&&(t.TgZ(0,"div",0)(1,"div",1),t.NdJ("click",function(){return n.voltar()}),t.qZA(),t.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),t._uU(6,"Editar usu\xe1rio"),t.qZA(),t.TgZ(7,"a",6),t.NdJ("click",function(){return n.voltar()}),t._UZ(8,"span")(9,"span"),t.qZA()(),t.TgZ(10,"div",7)(11,"app-form-usuario",8),t.NdJ("sendData",function(h){return n.send(h)}),t.qZA()()()()()),2&l&&(t.ekj("active",n.modalOpen),t.xp6(11),t.Q6J("objeto",n.objeto)("loading",n.loading)("erro",n.erro)("isEditPage",!0))},dependencies:[A.w]}),d})()},3071:(x,C,o)=>{o.d(C,{i:()=>A});var e=o(1135),T=o(9243),O=o(8164),v=o(2340),i=o(9535),P=o(9398),U=o(8913),t=o(46),f=o(4650),b=o(529),E=o(7185);let A=(()=>{class u{constructor(r,l,n,a,h,c){this.table=r,this.http=l,this.toastr=n,this.crypto=a,this.dropdownService=h,this.empresaService=c,this.url=v.N.url,this.list=new e.X([]),this.objeto=new e.X(void 0),this.empresa=new P.oW,this.empresaService.empresaObject.subscribe(I=>{this.empresa=I})}getObject(){var r=localStorage.getItem("usuario");return r&&this.setObject(this.crypto.decrypt(r)??new O.bo),this.objeto}setObject(r){localStorage.setItem("usuario",this.crypto.encrypt(r)??""),this.objeto.next(r)}add_To_Empresa_List(r){if(this.empresa){var l=this.empresa.account??[];let a=this.dropdownService.perfilAcesso.value.find(c=>c.id==r.perfilAcesso_Id);if(!a)return this.toastr.error("Selecione um perfil de acesso v\xe1lido!!"),!1;if(r.perfilAcesso=a,this.empresa.account.find(c=>c.email==r.email))return this.toastr.error("E-mail j\xe1 foram cadastrados!!"),!1;l.sort((c,I)=>c.id-I.id);var n=0==l.length?0:l[l.length-1].id;return r.id=++n,r.registroNaoSalvo=!0,l.push(r),this.empresa.account=l,this.empresaService.setObject(this.empresa),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0}return this.toastr.error("Nenhuma empresa selecionada."),!1}edit_To_Empresa_List(r){if(this.empresa){var l=this.empresa.account??[];let n=l.findIndex(a=>a.id==r.id);if(-1!=n){let a=this.dropdownService.perfilAcesso.value.find(c=>c.id==r.perfilAcesso_Id);return a?(r.perfilAcesso=a,this.empresa.account.find(c=>c.email==r.email&&c.id!=r.id)?(this.toastr.error("E-mail j\xe1 foram cadastrados!!"),!1):(l.splice(n,1,r),this.empresa.account=l,this.empresaService.setObject(this.empresa),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),!0)):(this.toastr.error("Selecione um perfil de investidor v\xe1lido!!"),!1)}return this.toastr.error("Usuario n\xe3o encontrado!!"),!1}return this.toastr.error("Nenhuma empresa selecionada."),!1}delete_To_Empresa_List(r){if(this.empresa){var l=this.empresa.account??[];let n=l.findIndex(a=>a.id==r);return-1!=n?(l.splice(n,1),this.empresa.account=l,this.empresaService.setObject(this.empresa),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0):(this.toastr.error("Usuario n\xe3o encontrado!!"),!1)}return this.toastr.error("Nenhuma empresa selecionada."),!1}getList(r){return this.http.get(`${this.url}/usuario/all/${r}`)}get(r){return this.http.get(`${this.url}/usuario/${r}`)}create(r){return this.http.post(`${this.url}/usuario/`,r)}edit(r){return this.http.put(`${this.url}/usuario`,r)}delete(r){return this.http.delete(`${this.url}/usuario/${r}`)}deactivated(r,l){return this.http.patch(`${this.url}/usuario/${r}/${l}`,{})}}return u.\u0275fac=function(r){return new(r||u)(f.LFG(t.i),f.LFG(b.eN),f.LFG(E._W),f.LFG(T.w),f.LFG(i.V),f.LFG(U.P))},u.\u0275prov=f.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),u})()},703:(x,C,o)=>{o.d(C,{w:()=>W});var e=o(4650),T=o(8164),O=o(9535),v=o(6895),i=o(433),P=o(1094),U=o(279);function t(s,m){1&s&&(e.TgZ(0,"p",5),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function f(s,m){if(1&s&&(e.TgZ(0,"div"),e.YNc(1,t,2,0,"p",26),e.qZA()),2&s){e.oxw();const _=e.MAs(9);e.xp6(1),e.Q6J("ngIf",_.errors.required)}}function b(s,m){1&s&&(e.TgZ(0,"p",5),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function E(s,m){1&s&&(e.TgZ(0,"p",5),e._uU(1,"Telefone/celular inv\xe1lido"),e.qZA())}function A(s,m){if(1&s&&(e.TgZ(0,"div"),e.YNc(1,b,2,0,"p",26),e.YNc(2,E,2,0,"p",26),e.qZA()),2&s){e.oxw();const _=e.MAs(17);e.xp6(1),e.Q6J("ngIf",_.errors.required),e.xp6(1),e.Q6J("ngIf",_.errors.mask)}}function u(s,m){if(1&s&&(e.TgZ(0,"option",15),e._uU(1),e.qZA()),2&s){const _=m.$implicit;e.Q6J("ngValue",_.id),e.xp6(1),e.Oqu(_.perfil)}}function d(s,m){1&s&&(e.TgZ(0,"p",5),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function r(s,m){if(1&s&&(e.TgZ(0,"div"),e.YNc(1,d,2,0,"p",26),e.qZA()),2&s){e.oxw();const _=e.MAs(25);e.xp6(1),e.Q6J("ngIf",_.errors.required)}}function l(s,m){1&s&&(e.TgZ(0,"p",5),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function n(s,m){1&s&&(e.TgZ(0,"p",5),e._uU(1,"E-mail inv\xe1lido"),e.qZA())}function a(s,m){if(1&s&&(e.TgZ(0,"div"),e.YNc(1,l,2,0,"p",26),e.YNc(2,n,2,0,"p",26),e.qZA()),2&s){e.oxw();const _=e.MAs(36);e.xp6(1),e.Q6J("ngIf",_.errors.required),e.xp6(1),e.Q6J("ngIf",_.errors.email)}}function h(s,m){if(1&s&&(e.TgZ(0,"p",30),e._uU(1),e.qZA()),2&s){const _=m.$implicit;e.xp6(1),e.Oqu(_)}}function c(s,m){1&s&&(e.TgZ(0,"p",30),e._uU(1,"Preencha todos os campos obrigat\xf3rios (*) corretamente para salvar"),e.qZA())}function I(s,m){if(1&s&&(e.TgZ(0,"div",27),e.YNc(1,h,2,1,"p",28),e.YNc(2,c,2,0,"p",29),e.qZA()),2&s){const _=e.oxw(),p=e.MAs(1);e.xp6(1),e.Q6J("ngForOf",_.erro),e.xp6(1),e.Q6J("ngIf",p.invalid&&0==_.erro.length)}}function g(s,m){1&s&&e._UZ(0,"span",31)}function D(s,m){1&s&&(e.TgZ(0,"div",32),e._uU(1," Este campo \xe9 obrigat\xf3rio "),e.qZA())}let W=(()=>{class s{constructor(_){this.dropdownService=_,this.objeto=new T.bo,this.loading=!1,this.erro=[],this.isEditPage=!1,this.sendData=new e.vpe,this.perfil=[],this.loadingPerfil=!0,this.dropdownService.getPerfilAcesso().subscribe(p=>{this.perfil=p,this.loadingPerfil=!1}),this.dropdownService.perfilAcesso.subscribe(p=>this.perfil=p)}ngOnInit(){}send(_){this.sendData.emit(_)}}return s.\u0275fac=function(_){return new(_||s)(e.Y36(O.V))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-form-usuario"]],inputs:{objeto:"objeto",loading:"loading",erro:"erro",isEditPage:"isEditPage"},outputs:{sendData:"sendData"},decls:45,vars:22,consts:[[3,"ngSubmit"],["form","ngForm"],[1,"form-row"],[1,"form-group","col-xl-4","col-lg-4","col-md-6","col-sm-6","col-12"],["for","name"],[1,"text-danger"],["type","text","name","name","id","name","required","","popoverClass","popover-danger","triggers","mouseenter:mouseleave",1,"form-control",3,"ngModel","ngbPopover","ngModelChange"],["name","ngModel"],[4,"ngIf"],["for","telefoneCelular"],["type","text","name","telefoneCelular","id","telefoneCelular","required","","popoverClass","popover-danger","triggers","mouseenter:mouseleave","mask","(00) 0000-0000||(00) 0.0000-0000","placeholder","(11) x.0000-0000",1,"form-control",3,"ngModel","ngbPopover","ngModelChange"],["telefoneCelular","ngModel"],["for","perfilAcesso_Id"],["name","perfilAcesso_Id","id","perfilAcesso_Id","required","","popoverClass","popover-danger","triggers","mouseenter:mouseleave",1,"form-control",3,"ngModel","ngbPopover","ngModelChange"],["perfilAcesso_Id","ngModel"],[3,"ngValue"],[3,"ngValue",4,"ngFor","ngForOf"],[1,"form-group","col-xl-12","col-lg-12","col-md-6","col-sm-6","col-12","email-container"],["for","email"],["type","email","name","email","id","email","placeholder","example@hotmail.com","required","","popoverClass","popover-danger","triggers","mouseenter:mouseleave",1,"form-control",3,"email","ngModel","ngbPopover","disablePopover","readonly","ngModelChange"],["email","ngModel"],[1,"d-flex","p-0","mt-1"],["class","m-0",4,"ngIf"],[1,"btn","btn-primary","mr-0","ml-auto",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],["campoObrigatorio",""],["class","text-danger",4,"ngIf"],[1,"m-0"],["class","text-red",4,"ngFor","ngForOf"],["class","text-red",4,"ngIf"],[1,"text-red"],[1,"spinner-border","spinner-border-sm","mr-1"],[1,"py-3","px-4"]],template:function(_,p){if(1&_){const j=e.EpF();e.TgZ(0,"form",0,1),e.NdJ("ngSubmit",function(){e.CHM(j);const M=e.MAs(1);return e.KtG(p.send(M))}),e.TgZ(2,"div",2)(3,"div",3)(4,"label",4),e._uU(5,"Nome: "),e.TgZ(6,"span",5),e._uU(7,"*"),e.qZA()(),e.TgZ(8,"input",6,7),e.NdJ("ngModelChange",function(M){return p.objeto.name=M}),e.qZA(),e.YNc(10,f,2,1,"div",8),e.qZA(),e.TgZ(11,"div",3)(12,"label",9),e._uU(13,"Telefone/Celular: "),e.TgZ(14,"span",5),e._uU(15,"*"),e.qZA()(),e.TgZ(16,"input",10,11),e.NdJ("ngModelChange",function(M){return p.objeto.telefoneCelular=M}),e.qZA(),e.YNc(18,A,3,2,"div",8),e.qZA(),e.TgZ(19,"div",3)(20,"label",12),e._uU(21,"Perfil: "),e.TgZ(22,"span",5),e._uU(23,"*"),e.qZA()(),e.TgZ(24,"select",13,14),e.NdJ("ngModelChange",function(M){return p.objeto.perfilAcesso_Id=M}),e.TgZ(26,"option",15),e._uU(27,"Selecione"),e.qZA(),e.YNc(28,u,2,2,"option",16),e.qZA(),e.YNc(29,r,2,1,"div",8),e.qZA(),e.TgZ(30,"div",17)(31,"label",18),e._uU(32,"E-mail: "),e.TgZ(33,"span",5),e._uU(34,"*"),e.qZA()(),e.TgZ(35,"input",19,20),e.NdJ("ngModelChange",function(M){return p.objeto.email=M}),e.qZA(),e.YNc(37,a,3,2,"div",8),e.qZA()(),e.TgZ(38,"div",21),e.YNc(39,I,3,2,"div",22),e.TgZ(40,"button",23),e.YNc(41,g,1,0,"span",24),e._uU(42," Salvar "),e.qZA()()(),e.YNc(43,D,2,0,"ng-template",null,25,e.W1O)}if(2&_){const j=e.MAs(1),Z=e.MAs(9),M=e.MAs(17),R=e.MAs(25),B=e.MAs(36),L=e.MAs(44);e.xp6(8),e.Q6J("ngModel",p.objeto.name)("ngbPopover",L),e.xp6(2),e.Q6J("ngIf",Z.touched&&Z.errors),e.xp6(6),e.Q6J("ngModel",p.objeto.telefoneCelular)("ngbPopover",L),e.xp6(2),e.Q6J("ngIf",M.touched&&M.errors),e.xp6(6),e.ekj("form-control-loading",p.loadingPerfil),e.Q6J("ngModel",p.objeto.perfilAcesso_Id)("ngbPopover",L),e.xp6(2),e.Q6J("ngValue",void 0),e.xp6(2),e.Q6J("ngForOf",p.perfil),e.xp6(1),e.Q6J("ngIf",R.touched&&R.errors),e.xp6(6),e.Q6J("email",!0)("ngModel",p.objeto.email)("ngbPopover",L)("disablePopover",p.isEditPage)("readonly",p.isEditPage),e.xp6(2),e.Q6J("ngIf",B.touched&&B.errors),e.xp6(2),e.Q6J("ngIf",p.erro||j.invalid),e.xp6(1),e.Q6J("disabled",j.invalid||p.loading),e.xp6(1),e.Q6J("ngIf",p.loading)}},dependencies:[v.sg,v.O5,i._Y,i.YN,i.Kr,i.Fj,i.EJ,i.JJ,i.JL,i.Q7,i.on,i.On,i.F,P.hx,U.o8]}),s})()}}]);