"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[843],{1829:(x,A,t)=>{t.d(A,{G:()=>g});var e=t(5861),b=t(801),E=t(9808),P=t(8164),T=t(8913),a=t(3071),U=t(9243),Z=t(878),o=t(4650),I=t(202),O=t(7185),D=t(7549),m=t(703);let g=(()=>{class h{constructor(l,r,i,n,p,v){this.activatedRoute=l,this.toastr=r,this.modal=i,this.userService=n,this.empresaService=p,this.crypto=v,this.faTimes=b.NBC,this.modalOpen=!1,this.objeto=new P.bo,this.erro=[],this.loading=!1,this.url="",this.subscription=[],this.routerBack=["../"],this.routeBackOptions={relativeTo:this.activatedRoute},this.url=this.activatedRoute.snapshot.pathFromRoot.map(c=>c.routeConfig?.path).join("/");var B=this.modal.getOpen().subscribe(c=>this.modalOpen=c);if(this.subscription.push(B),this.url.includes("empresas/editar")){var M=l.parent?.parent?.params.subscribe(c=>{c.empresa_id?this.objeto.empresa_Id=this.crypto.decrypt(c.empresa_id):this.voltar()});M&&this.subscription.push(M)}setTimeout(()=>{this.modal.setOpen(!0)},200)}ngOnDestroy(){this.subscription.forEach(l=>l.unsubscribe())}voltar(){this.modal.voltar(this.routerBack,this.routeBackOptions)}send(l){var r=this;this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")?(this.userService.add_To_Empresa_List(this.objeto)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(0,E.n)(this.userService.create(this.objeto)).then(function(){var i=(0,e.Z)(function*(n){r.modal.voltar(r.routerBack,r.routeBackOptions);var p=yield(0,E.n)(r.userService.getList());if(r.url.includes("empresas/editar")){var v=r.empresaService.object;v.account=p,r.empresaService.setObject(v,"edit usuario")}});return function(n){return i.apply(this,arguments)}}()).catch(i=>{this.erro.push((0,Z.b)(i))}).finally(()=>this.loading=!1)}}return h.\u0275fac=function(l){return new(l||h)(o.Y36(I.gz),o.Y36(O._W),o.Y36(D.Q),o.Y36(a.i),o.Y36(T.P),o.Y36(U.w))},h.\u0275cmp=o.Xpm({type:h,selectors:[["app-create"]],decls:12,vars:6,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","800px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],[3,"objeto","loading","erro","isEditPage","sendData"]],template:function(l,r){1&l&&(o.TgZ(0,"div",0)(1,"div",1),o.NdJ("click",function(){return r.voltar()}),o.qZA(),o.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),o._uU(6,"Adicionar usu\xe1rio"),o.qZA(),o.TgZ(7,"a",6),o.NdJ("click",function(){return r.voltar()}),o._UZ(8,"span")(9,"span"),o.qZA()(),o.TgZ(10,"div",7)(11,"app-form-usuario",8),o.NdJ("sendData",function(n){return r.send(n)}),o.qZA()()()()()),2&l&&(o.ekj("active",r.modalOpen),o.xp6(11),o.Q6J("objeto",r.objeto)("loading",r.loading)("erro",r.erro)("isEditPage",!1))},dependencies:[m.w],styles:["@media (max-width: 768px){.email-container[_ngcontent-%COMP%], .senha-container[_ngcontent-%COMP%]{order:1}}"]}),h})()},9155:(x,A,t)=>{t.d(A,{T:()=>I});var e=t(801),b=t(9808),E=t(8164),P=t(3071),T=t(9243),a=t(4650),U=t(202),Z=t(7549),o=t(7119);let I=(()=>{class O{constructor(m,g,h,C){this.activatedRoute=m,this.modal=g,this.userService=h,this.crypto=C,this.faTimes=e.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.url="",this.objeto=new E.bo,this.subscription=[],this.routerBack=["../../"],this.routeBackOptions={relativeTo:this.activatedRoute};var l=this.modal.getOpen().subscribe(i=>this.modalOpen=i);this.subscription.push(l),this.url=this.activatedRoute.snapshot.pathFromRoot.map(i=>i.routeConfig?.path).join("/");var r=m.params.subscribe(i=>{i.usuario_id?(this.objeto.id=this.crypto.decrypt(i.usuario_id),(0,b.n)(this.userService.get(this.objeto.id)).then(n=>{this.objeto=n,setTimeout(()=>{this.modal.setOpen(!0)},200)}).catch(n=>{this.modal.voltar(this.routerBack,this.routeBackOptions)}).finally(()=>{})):this.voltar()});this.subscription.push(r)}ngOnDestroy(){this.subscription.forEach(m=>m.unsubscribe())}voltar(){this.modal.voltar(this.routerBack,this.routeBackOptions)}}return O.\u0275fac=function(m){return new(m||O)(a.Y36(U.gz),a.Y36(Z.Q),a.Y36(P.i),a.Y36(T.w))},O.\u0275cmp=a.Xpm({type:O,selectors:[["app-deactivated"]],decls:4,vars:5,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[3,"objeto","service","isUser"]],template:function(m,g){1&m&&(a.TgZ(0,"div",0)(1,"div",1),a.NdJ("click",function(){return g.voltar()}),a.qZA(),a.TgZ(2,"div",2),a._UZ(3,"app-shared-deactivated",3),a.qZA()()),2&m&&(a.ekj("active",g.modalOpen),a.xp6(3),a.Q6J("objeto",g.objeto)("service",g.userService)("isUser",!0))},dependencies:[o.T]}),O})()},662:(x,A,t)=>{t.d(A,{T:()=>l});var e=t(5861),b=t(801),E=t(9808),P=t(8164),T=t(8913),a=t(3071),U=t(9243),Z=t(878),o=t(4650),I=t(202),O=t(7185),D=t(7549),m=t(6895);function g(r,i){if(1&r&&(o.TgZ(0,"li",15),o._uU(1),o.ALo(2,"json"),o.qZA()),2&r){const n=i.$implicit;o.xp6(1),o.Oqu(o.lcZ(2,1,n))}}function h(r,i){if(1&r&&(o.TgZ(0,"ul",13),o.YNc(1,g,3,3,"li",14),o.qZA()),2&r){const n=o.oxw();o.xp6(1),o.Q6J("ngForOf",n.erro)}}function C(r,i){1&r&&o._UZ(0,"span",16)}let l=(()=>{class r{constructor(n,p,v,B,M,c){this.activatedRoute=n,this.toastr=p,this.modal=v,this.empresaService=B,this.userService=M,this.crypto=c,this.faTimes=b.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.url="",this.objeto=new P.bo,this.subscription=[],this.routerBack=["../../"],this.routeBackOptions={relativeTo:this.activatedRoute};var W=this.modal.getOpen().subscribe(s=>this.modalOpen=s);this.subscription.push(W),this.url=this.activatedRoute.snapshot.pathFromRoot.map(s=>s.routeConfig?.path).join("/");var K=this.activatedRoute.params.subscribe(s=>{s.usuario_id?this.objeto.id=this.crypto.decrypt(s.usuario_id):this.voltar()});this.subscription.push(K),(this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo)&&(this.objeto=this.empresaService.object.account.find(s=>s.id==this.objeto.id)),setTimeout(()=>{this.modal.setOpen(!0)},200)}ngOnDestroy(){this.subscription.forEach(n=>n.unsubscribe())}voltar(){this.modal.voltar(this.routerBack,this.routeBackOptions)}send(){var n=this;this.loading=!0,this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?(this.userService.delete_To_Empresa_List(this.objeto.id)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(0,E.n)(this.userService.delete(this.objeto.id)).then(function(){var p=(0,e.Z)(function*(v){var B=yield(0,E.n)(n.userService.getList());if(n.url.includes("empresas/editar")){var M=n.empresaService.object;M.account=B,n.empresaService.setObject(M,"edit usuario")}n.voltar(),n.userService.setObject(new P.bo)});return function(v){return p.apply(this,arguments)}}()).catch(p=>this.erro.push((0,Z.b)(p))).finally(()=>this.loading=!1)}}return r.\u0275fac=function(n){return new(n||r)(o.Y36(I.gz),o.Y36(O._W),o.Y36(D.Q),o.Y36(T.P),o.Y36(a.i),o.Y36(U.w))},r.\u0275cmp=o.Xpm({type:r,selectors:[["app-delete"]],decls:22,vars:4,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],[1,"mt-2"],[1,"text-info"],["class","m-0 col-lg3-12 mt-1",4,"ngIf"],[1,"btn","btn-grey","ml-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],[1,"m-0","col-lg3-12","mt-1"],["class","text-red",4,"ngFor","ngForOf"],[1,"text-red"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(n,p){1&n&&(o.TgZ(0,"div",0)(1,"div",1),o.NdJ("click",function(){return p.voltar()}),o.qZA(),o.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),o._uU(6,"Excluir registro"),o.qZA(),o.TgZ(7,"a",6),o.NdJ("click",function(){return p.voltar()}),o._UZ(8,"span")(9,"span"),o.qZA()(),o.TgZ(10,"div",7)(11,"p",8),o._uU(12,"Tem certeza que deseja excluir esse registro? Ele n\xe3o poder\xe1 ser recuperado."),o.qZA(),o.TgZ(13,"p",8),o._uU(14,"O usu\xe1rio n\xe3o ter\xe1 acesso mais ao planner."),o.qZA(),o.TgZ(15,"p",9),o._uU(16,"Obs.: Se esse usu\xe1rio estiver relacionado a um planner, n\xe3o poder\xe1 ser exclu\xeddo."),o.qZA(),o.YNc(17,h,2,1,"ul",10),o.TgZ(18,"button",11),o.NdJ("click",function(){return p.send()}),o.YNc(19,C,1,0,"span",12),o.TgZ(20,"span"),o._uU(21,"Excluir"),o.qZA()()()()()()),2&n&&(o.ekj("active",p.modalOpen),o.xp6(17),o.Q6J("ngIf",p.erro),o.xp6(2),o.Q6J("ngIf",p.loading))},dependencies:[m.sg,m.O5,m.Ts]}),r})()},2193:(x,A,t)=>{t.d(A,{F:()=>g});var e=t(5861),b=t(801),E=t(9808),P=t(8164),T=t(8913),a=t(3071),U=t(9243),Z=t(878),o=t(4650),I=t(202),O=t(7185),D=t(7549),m=t(703);let g=(()=>{class h{constructor(l,r,i,n,p,v){this.activatedRoute=l,this.toastr=r,this.modal=i,this.empresaService=n,this.userService=p,this.crypto=v,this.faTimes=b.NBC,this.modalOpen=!1,this.objeto=new P.bo,this.erro=[],this.loading=!1,this.url="",this.subscription=[],this.routerBack=["../../"],this.routeBackOptions={relativeTo:this.activatedRoute};var B=this.modal.getOpen().subscribe(c=>this.modalOpen=c);this.subscription.push(B);var M=l.params.subscribe(c=>{c.usuario_id?this.objeto.id=this.crypto.decrypt(c.usuario_id):this.voltar()});this.subscription.push(M),this.url=this.activatedRoute.snapshot.pathFromRoot.map(c=>c.routeConfig?.path).join("/"),this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?this.objeto=this.empresaService.object.account.find(c=>c.id==this.objeto.id):(0,E.n)(this.userService.get(this.objeto.id)).then(c=>this.objeto=c).catch(c=>this.voltar()).finally(()=>this.loading=!1),setTimeout(()=>{this.modal.setOpen(!0)},200)}ngOnDestroy(){this.subscription.forEach(l=>l.unsubscribe())}voltar(){this.modal.voltar(this.routerBack,this.routeBackOptions)}send(l){var r=this;this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?(this.userService.edit_To_Empresa_List(this.objeto)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(0,E.n)(this.userService.edit(this.objeto)).then(function(){var i=(0,e.Z)(function*(n){var p=yield(0,E.n)(r.userService.getList());if(r.url.includes("empresas/editar")){var v=r.empresaService.object;v.account=p,r.empresaService.setObject(v,"edit usuario")}r.modal.voltar(r.routerBack,r.routeBackOptions)});return function(n){return i.apply(this,arguments)}}()).catch(i=>{console.error(i),this.erro.push((0,Z.b)(i))}).finally(()=>this.loading=!1)}}return h.\u0275fac=function(l){return new(l||h)(o.Y36(I.gz),o.Y36(O._W),o.Y36(D.Q),o.Y36(T.P),o.Y36(a.i),o.Y36(U.w))},h.\u0275cmp=o.Xpm({type:h,selectors:[["app-edit"]],decls:12,vars:6,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","800px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],[3,"objeto","loading","erro","isEditPage","sendData"]],template:function(l,r){1&l&&(o.TgZ(0,"div",0)(1,"div",1),o.NdJ("click",function(){return r.voltar()}),o.qZA(),o.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),o._uU(6,"Editar usu\xe1rio"),o.qZA(),o.TgZ(7,"a",6),o.NdJ("click",function(){return r.voltar()}),o._UZ(8,"span")(9,"span"),o.qZA()(),o.TgZ(10,"div",7)(11,"app-form-usuario",8),o.NdJ("sendData",function(n){return r.send(n)}),o.qZA()()()()()),2&l&&(o.ekj("active",r.modalOpen),o.xp6(11),o.Q6J("objeto",r.objeto)("loading",r.loading)("erro",r.erro)("isEditPage",!0))},dependencies:[m.w]}),h})()},703:(x,A,t)=>{t.d(A,{w:()=>K});var e=t(4650),b=t(9808),E=t(8164),P=t(9535),T=t(6895),a=t(433),U=t(1094),Z=t(279);function o(s,u){1&s&&(e.TgZ(0,"p",5),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function I(s,u){1&s&&(e.TgZ(0,"span"),e._uU(1,"Remova os espa\xe7os antes e depois do texto."),e.qZA())}function O(s,u){if(1&s&&(e.TgZ(0,"p",5),e.YNc(1,I,2,0,"span",8),e.qZA()),2&s){e.oxw(2);const _=e.MAs(9);e.xp6(1),e.Q6J("ngIf","^\\S(.*\\S)?$"==_.errors.pattern.requiredPattern)}}function D(s,u){if(1&s&&(e.TgZ(0,"div"),e.YNc(1,o,2,0,"p",26),e.YNc(2,O,2,1,"p",26),e.qZA()),2&s){e.oxw();const _=e.MAs(9);e.xp6(1),e.Q6J("ngIf",_.errors.required),e.xp6(1),e.Q6J("ngIf",_.errors.pattern)}}function m(s,u){1&s&&(e.TgZ(0,"p",5),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function g(s,u){1&s&&(e.TgZ(0,"p",5),e._uU(1,"Telefone/celular inv\xe1lido"),e.qZA())}function h(s,u){if(1&s&&(e.TgZ(0,"div"),e.YNc(1,m,2,0,"p",26),e.YNc(2,g,2,0,"p",26),e.qZA()),2&s){e.oxw();const _=e.MAs(17);e.xp6(1),e.Q6J("ngIf",_.errors.required),e.xp6(1),e.Q6J("ngIf",_.errors.mask)}}function C(s,u){if(1&s&&(e.TgZ(0,"option",15),e._uU(1),e.qZA()),2&s){const _=u.$implicit;e.Q6J("ngValue",_.id),e.xp6(1),e.Oqu(_.perfil)}}function l(s,u){1&s&&(e.TgZ(0,"p",5),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function r(s,u){if(1&s&&(e.TgZ(0,"div"),e.YNc(1,l,2,0,"p",26),e.qZA()),2&s){e.oxw();const _=e.MAs(25);e.xp6(1),e.Q6J("ngIf",_.errors.required)}}function i(s,u){1&s&&(e.TgZ(0,"p",5),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function n(s,u){1&s&&(e.TgZ(0,"p",5),e._uU(1,"E-mail inv\xe1lido"),e.qZA())}function p(s,u){if(1&s&&(e.TgZ(0,"div"),e.YNc(1,i,2,0,"p",26),e.YNc(2,n,2,0,"p",26),e.qZA()),2&s){e.oxw();const _=e.MAs(36);e.xp6(1),e.Q6J("ngIf",_.errors.required),e.xp6(1),e.Q6J("ngIf",_.errors.email)}}function v(s,u){if(1&s&&(e.TgZ(0,"p",30),e._uU(1),e.ALo(2,"json"),e.qZA()),2&s){const _=u.$implicit;e.xp6(1),e.Oqu(e.lcZ(2,1,_))}}function B(s,u){1&s&&(e.TgZ(0,"p",30),e._uU(1,"Preencha todos os campos obrigat\xf3rios (*) corretamente para salvar"),e.qZA())}function M(s,u){if(1&s&&(e.TgZ(0,"div",27),e.YNc(1,v,3,3,"p",28),e.YNc(2,B,2,0,"p",29),e.qZA()),2&s){const _=e.oxw(),d=e.MAs(1);e.xp6(1),e.Q6J("ngForOf",_.erro),e.xp6(1),e.Q6J("ngIf",d.invalid&&0==_.erro.length)}}function c(s,u){1&s&&e._UZ(0,"span",31)}function W(s,u){1&s&&(e.TgZ(0,"div",32),e._uU(1," Este campo \xe9 obrigat\xf3rio "),e.qZA())}let K=(()=>{class s{constructor(_){this.dropdownService=_,this.objeto=new E.bo,this.loading=!1,this.erro=[],this.isEditPage=!1,this.sendData=new e.vpe,this.perfil=[],this.loadingPerfil=!0,this.subscription=[],this.emailPattern=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,(0,b.n)(this.dropdownService.getPerfilAcesso()).then(j=>this.perfil=j).catch().finally(()=>this.loadingPerfil=!1);var d=this.dropdownService.perfilAcesso.subscribe(j=>this.perfil=j);this.subscription.push(d)}ngOnDestroy(){this.subscription.forEach(_=>_.unsubscribe())}send(_){this.sendData.emit(_)}}return s.\u0275fac=function(_){return new(_||s)(e.Y36(P.V))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-form-usuario"]],inputs:{objeto:"objeto",loading:"loading",erro:"erro",isEditPage:"isEditPage"},outputs:{sendData:"sendData"},decls:45,vars:23,consts:[[3,"ngSubmit"],["form","ngForm"],[1,"form-row"],[1,"form-group","col-xl-4","col-lg-4","col-md-6","col-sm-6","col-12"],["for","name"],[1,"text-danger"],["type","text","name","name","id","name","required","","popoverClass","popover-danger","triggers","mouseenter:mouseleave","pattern","\\S(.*\\S)?",1,"form-control",3,"ngModel","ngbPopover","ngModelChange","change"],["name","ngModel"],[4,"ngIf"],["for","telefoneCelular"],["type","text","name","telefoneCelular","id","telefoneCelular","required","","popoverClass","popover-danger","triggers","mouseenter:mouseleave","mask","(00) 0000-0000||(00) 0.0000-0000","pattern","^\\(?[1-9]{2}\\)? ?(?:[0-9]|9[0-9])[0-9]{3}\\-?[0-9]{4}$","placeholder","(11) x.0000-0000",1,"form-control",3,"ngModel","ngbPopover","ngModelChange"],["telefoneCelular","ngModel"],["for","perfilAcesso_Id"],["name","perfilAcesso_Id","id","perfilAcesso_Id","required","","popoverClass","popover-danger","triggers","mouseenter:mouseleave",1,"form-control",3,"ngModel","ngbPopover","ngModelChange"],["perfilAcesso_Id","ngModel"],[3,"ngValue"],[3,"ngValue",4,"ngFor","ngForOf"],[1,"form-group","col-xl-12","col-lg-12","col-md-6","col-sm-6","col-12","email-container"],["for","email"],["type","email","name","email","id","email","placeholder","example@hotmail.com","required","","popoverClass","popover-danger","triggers","mouseenter:mouseleave",1,"form-control",3,"email","ngModel","ngbPopover","disablePopover","readonly","pattern","ngModelChange"],["email","ngModel"],[1,"d-flex","p-0","mt-1"],["class","m-0",4,"ngIf"],[1,"btn","btn-primary","mr-0","ml-auto",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],["campoObrigatorio",""],["class","text-danger",4,"ngIf"],[1,"m-0"],["class","text-red",4,"ngFor","ngForOf"],["class","text-red",4,"ngIf"],[1,"text-red"],[1,"spinner-border","spinner-border-sm","mr-1"],[1,"py-3","px-4"]],template:function(_,d){if(1&_){const j=e.EpF();e.TgZ(0,"form",0,1),e.NdJ("ngSubmit",function(){e.CHM(j);const f=e.MAs(1);return e.KtG(d.send(f))}),e.TgZ(2,"div",2)(3,"div",3)(4,"label",4),e._uU(5,"Nome: "),e.TgZ(6,"span",5),e._uU(7,"*"),e.qZA()(),e.TgZ(8,"input",6,7),e.NdJ("ngModelChange",function(f){return d.objeto.name=f})("change",function(){e.CHM(j);const f=e.MAs(9);return e.KtG(d.objeto.name=f.value.trim())}),e.qZA(),e.YNc(10,D,3,2,"div",8),e.qZA(),e.TgZ(11,"div",3)(12,"label",9),e._uU(13,"Telefone/Celular: "),e.TgZ(14,"span",5),e._uU(15,"*"),e.qZA()(),e.TgZ(16,"input",10,11),e.NdJ("ngModelChange",function(f){return d.objeto.telefoneCelular=f}),e.qZA(),e.YNc(18,h,3,2,"div",8),e.qZA(),e.TgZ(19,"div",3)(20,"label",12),e._uU(21,"Perfil: "),e.TgZ(22,"span",5),e._uU(23,"*"),e.qZA()(),e.TgZ(24,"select",13,14),e.NdJ("ngModelChange",function(f){return d.objeto.perfilAcesso_Id=f}),e.TgZ(26,"option",15),e._uU(27,"Selecione"),e.qZA(),e.YNc(28,C,2,2,"option",16),e.qZA(),e.YNc(29,r,2,1,"div",8),e.qZA(),e.TgZ(30,"div",17)(31,"label",18),e._uU(32,"E-mail: "),e.TgZ(33,"span",5),e._uU(34,"*"),e.qZA()(),e.TgZ(35,"input",19,20),e.NdJ("ngModelChange",function(f){return d.objeto.email=f}),e.qZA(),e.YNc(37,p,3,2,"div",8),e.qZA()(),e.TgZ(38,"div",21),e.YNc(39,M,3,2,"div",22),e.TgZ(40,"button",23),e.YNc(41,c,1,0,"span",24),e._uU(42," Salvar "),e.qZA()()(),e.YNc(43,W,2,0,"ng-template",null,25,e.W1O)}if(2&_){const j=e.MAs(1),R=e.MAs(9),f=e.MAs(17),y=e.MAs(25),F=e.MAs(36),L=e.MAs(44);e.xp6(8),e.Q6J("ngModel",d.objeto.name)("ngbPopover",L),e.xp6(2),e.Q6J("ngIf",R.touched&&R.errors),e.xp6(6),e.Q6J("ngModel",d.objeto.telefoneCelular)("ngbPopover",L),e.xp6(2),e.Q6J("ngIf",f.touched&&f.errors),e.xp6(6),e.ekj("form-control-loading",d.loadingPerfil),e.Q6J("ngModel",d.objeto.perfilAcesso_Id)("ngbPopover",L),e.xp6(2),e.Q6J("ngValue",void 0),e.xp6(2),e.Q6J("ngForOf",d.perfil),e.xp6(1),e.Q6J("ngIf",y.touched&&y.errors),e.xp6(6),e.Q6J("email",!0)("ngModel",d.objeto.email)("ngbPopover",L)("disablePopover",d.isEditPage)("readonly",d.isEditPage)("pattern",d.emailPattern),e.xp6(2),e.Q6J("ngIf",F.touched&&F.errors),e.xp6(2),e.Q6J("ngIf",d.erro||j.invalid),e.xp6(1),e.Q6J("disabled",j.invalid||d.loading),e.xp6(1),e.Q6J("ngIf",d.loading)}},dependencies:[T.sg,T.O5,a._Y,a.YN,a.Kr,a.Fj,a.EJ,a.JJ,a.JL,a.Q7,a.c5,a.on,a.On,a.F,U.hx,Z.o8,T.Ts]}),s})()}}]);