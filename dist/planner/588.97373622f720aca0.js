"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[588],{4429:(j,P,r)=>{r.d(P,{c1:()=>A,lF:()=>c});var e=r(655),O=r(43),M=r(805),f=r(1956),v=r(9398);class A{constructor(){this.id=0,this.empresa=new v.oW,this.empresa_Id=void 0,this.perfilInvestidor_Id=void 0,this.nome="",this.idade="",this.altura="",this.peso="",this.imc="",this.estadoCivil_Id=void 0,this.dataNascimento="",this.cpf="",this.rg="",this.email="",this.receita="",this.despesa="",this.idadeAposentadoria="",this.rendaMensalAposentadoria="",this.rentabilidadeAposentadoria="",this.registroNaoSalvo=!1}}(0,e.gn)([(0,O.Vp)(),(0,e.w6)("design:type",Boolean)],A.prototype,"registroNaoSalvo",void 0);var c=[{field:"id",header:"Id",maskType:f.O.undefined,filterType:f.vA.text,filterDisplay:f.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,filterMatchMode:M.a6.CONTAINS},{field:"nome",header:"Nome",maskType:f.O.undefined,filterType:f.vA.text,filterDisplay:f.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,filterMatchMode:M.a6.CONTAINS},{field:"cpf",header:"CPF",maskType:f.O.cpf,filterType:f.vA.text,filterDisplay:f.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,filterMatchMode:M.a6.CONTAINS},{field:"dataNascimento",header:"Data de Nascimento",maskType:f.O.date,filterType:f.vA.date,filterDisplay:f.w2.menu,filterShowAddButton:!0,filterShowMatchMode:!0,filterMatchMode:M.a6.DATE_IS},{field:"idade",header:"Idade",maskType:f.O.undefined,filterType:f.vA.numeric,filterDisplay:f.w2.menu,filterShowAddButton:!0,filterShowMatchMode:!0,filterMatchMode:M.a6.CONTAINS},{field:"perfilInvestidor.descricao",header:"Perfil Investidor",maskType:f.O.undefined,filterType:f.vA.text,filterDisplay:f.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,filterMatchMode:M.a6.CONTAINS},{field:"ativo",header:"Ativo",maskType:f.O.boolean,filterType:f.vA.text,filterDisplay:f.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,filterMatchMode:M.a6.CONTAINS,booleanValues:{true:"ativo",false:"inativo"}}]},8785:(j,P,r)=>{r.d(P,{G:()=>Z});var e=r(801),O=r(9808),M=r(4429),f=r(932),v=r(9243),A=r(878),o=r(4650),c=r(202),I=r(7185),y=r(7549),U=r(6680);let Z=(()=>{class D{constructor(E,m,a,d,n){this.activatedRoute=E,this.toastr=m,this.modal=a,this.clienteService=d,this.crypto=n,this.faTimes=e.NBC,this.faChevronLeft=e.A35,this.modalOpen=!1,this.objeto=new M.c1,this.erro=[],this.loading=!1,this.url="",this.subscription=[],this.url=this.activatedRoute.snapshot.pathFromRoot.map(u=>u.routeConfig?.path).join("/");var t=this.modal.getOpen().subscribe(u=>this.modalOpen=u);if(this.subscription.push(t),this.url.includes("empresas/editar")){var l=E.parent?.parent?.params.subscribe(u=>{u.empresa_id?this.objeto.empresa_Id=this.crypto.decrypt(u.empresa_id):this.voltar()});l&&this.subscription.push(l)}setTimeout(()=>{this.modal.setOpen(!0)},200)}ngOnDestroy(){this.modal.setOpen(!1),this.subscription.forEach(E=>E.unsubscribe())}resetForm(){this.objeto=new M.c1}voltar(){this.modal.voltar()}send(E){this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")?(this.clienteService.add_To_Empresa_List(this.objeto)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(this.url.includes("empresas/editar"),(0,O.n)(this.clienteService.create(E)).then(m=>{this.modal.voltar(),(0,O.n)(this.clienteService.getList())}).catch(m=>{this.erro.push((0,A.b)(m))}).finally(()=>this.loading=!1))}}return D.\u0275fac=function(E){return new(E||D)(o.Y36(c.gz),o.Y36(I._W),o.Y36(y.Q),o.Y36(f.$),o.Y36(v.w))},D.\u0275cmp=o.Xpm({type:D,selectors:[["app-create"]],decls:12,vars:5,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","1000px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],[3,"objeto","loading","erro","sendData"]],template:function(E,m){1&E&&(o.TgZ(0,"div",0)(1,"div",1),o.NdJ("click",function(){return m.voltar()}),o.qZA(),o.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),o._uU(6,"Adicionar cliente"),o.qZA(),o.TgZ(7,"a",6),o.NdJ("click",function(){return m.voltar()}),o._UZ(8,"span")(9,"span"),o.qZA()(),o.TgZ(10,"div",7)(11,"app-form-cliente",8),o.NdJ("sendData",function(d){return m.send(d)}),o.qZA()()()()()),2&E&&(o.ekj("active",m.modalOpen),o.xp6(11),o.Q6J("objeto",m.objeto)("loading",m.loading)("erro",m.erro))},dependencies:[U.r],styles:["p[_ngcontent-%COMP%]{margin:10px 5px 2px}"]}),D})()},9738:(j,P,r)=>{r.d(P,{T:()=>U});var e=r(5861),O=r(801),M=r(9808),f=r(4429),v=r(932),A=r(9243),o=r(4650),c=r(202),I=r(7549),y=r(7119);let U=(()=>{class Z{constructor(g,E,m,a){var d=this;this.activatedRoute=g,this.modal=E,this.clienteService=m,this.crypto=a,this.faTimes=O.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.url="",this.objeto=new f.c1,this.subscription=[];var n=this.modal.getOpen().subscribe(l=>this.modalOpen=l);this.subscription.push(n),this.url=this.activatedRoute.snapshot.pathFromRoot.map(l=>l.routeConfig?.path).join("/");var t=g.params.subscribe(function(){var l=(0,e.Z)(function*(u){u.cliente_id?(d.objeto.id=d.crypto.decrypt(u.cliente_id),d.objeto=yield(0,M.n)(d.clienteService.get(d.objeto.id)),setTimeout(()=>{d.modal.setOpen(!0)},200)):d.voltar()});return function(u){return l.apply(this,arguments)}}());this.subscription.push(t)}ngOnDestroy(){this.modal.setOpen(!1),this.subscription.forEach(g=>g.unsubscribe())}voltar(){this.modal.voltar()}}return Z.\u0275fac=function(g){return new(g||Z)(o.Y36(c.gz),o.Y36(I.Q),o.Y36(v.$),o.Y36(A.w))},Z.\u0275cmp=o.Xpm({type:Z,selectors:[["app-deactivated"]],decls:4,vars:4,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[3,"objeto","service"]],template:function(g,E){1&g&&(o.TgZ(0,"div",0)(1,"div",1),o.NdJ("click",function(){return E.voltar()}),o.qZA(),o.TgZ(2,"div",2),o._UZ(3,"app-shared-deactivated",3),o.qZA()()),2&g&&(o.ekj("active",E.modalOpen),o.xp6(3),o.Q6J("objeto",E.objeto)("service",E.clienteService))},dependencies:[y.T]}),Z})()},4595:(j,P,r)=>{r.d(P,{T:()=>E});var e=r(801),O=r(9808),M=r(4429),f=r(932),v=r(8913),A=r(9243),o=r(4650),c=r(202),I=r(7185),y=r(7549),U=r(6895);function Z(m,a){if(1&m&&(o.TgZ(0,"li",16),o._uU(1),o.ALo(2,"json"),o.qZA()),2&m){const d=a.$implicit;o.xp6(1),o.Oqu(o.lcZ(2,1,d))}}function D(m,a){if(1&m&&(o.TgZ(0,"ul",14),o.YNc(1,Z,3,3,"li",15),o.qZA()),2&m){const d=o.oxw();o.xp6(1),o.Q6J("ngForOf",d.erro)}}function g(m,a){1&m&&o._UZ(0,"span",17)}let E=(()=>{class m{constructor(d,n,t,l,u,_,x){this.router=d,this.activatedRoute=n,this.toastr=t,this.modal=l,this.clienteService=u,this.empresaService=_,this.crypto=x,this.faTimes=e.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.objeto=new M.c1,this.url="",this.subscription=[];var R=this.modal.getOpen().subscribe(w=>this.modalOpen=w);this.subscription.push(R),this.url=this.activatedRoute.snapshot.pathFromRoot.map(w=>w.routeConfig?.path).join("/");var b=this.activatedRoute.params.subscribe(w=>{w.cliente_id?this.objeto.id=this.crypto.decrypt(w.cliente_id):this.voltar()});this.subscription.push(b),(this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo)&&(this.objeto=this.empresaService.object.cliente.find(w=>w.id==this.objeto.id)),setTimeout(()=>{this.modal.setOpen(!0)},200)}ngOnDestroy(){this.modal.setOpen(!1),this.subscription.forEach(d=>d.unsubscribe())}voltar(){this.modal.voltar()}send(){this.loading=!0,this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?(this.clienteService.delete_To_Empresa_List(this.objeto.id)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(this.url.includes("empresas/editar"),(0,O.n)(this.clienteService.delete(this.objeto.id)).then(d=>{(0,O.n)(this.clienteService.getList()),this.voltar(),this.clienteService.setObject(new M.c1)}).catch().finally(()=>this.loading=!1))}}return m.\u0275fac=function(d){return new(d||m)(o.Y36(c.F0),o.Y36(c.gz),o.Y36(I._W),o.Y36(y.Q),o.Y36(f.$),o.Y36(v.P),o.Y36(A.w))},m.\u0275cmp=o.Xpm({type:m,selectors:[["app-delete"]],decls:22,vars:5,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"mt-2"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],["class","m-0 col-lg-12 mt-1",4,"ngIf"],[1,"d-flex","justify-content-center","flex-wrap","p-0","mt-1"],[1,"btn","btn-grey","mr-1",3,"click"],[1,"btn","btn-primary","mr-0",3,"disabled","click"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],[1,"m-0","col-lg-12","mt-1"],["class","text-red",4,"ngFor","ngForOf"],[1,"text-red"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(d,n){1&d&&(o.TgZ(0,"div",0)(1,"div",1),o.NdJ("click",function(){return n.voltar()}),o.qZA(),o.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),o._uU(6,"Excluir registro"),o.qZA(),o.TgZ(7,"p",6),o._uU(8,"Tem certeza que deseja excluir esse registro? Ele n\xe3o poder\xe1 ser recuperado."),o.qZA(),o.TgZ(9,"p"),o._uU(10,"Todos os registros relacionados a este, tamb\xe9m ser\xe3o removidos."),o.qZA(),o.TgZ(11,"a",7),o.NdJ("click",function(){return n.voltar()}),o._UZ(12,"span")(13,"span"),o.qZA()(),o.TgZ(14,"div",8),o.YNc(15,D,2,1,"ul",9),o.TgZ(16,"div",10)(17,"button",11),o.NdJ("click",function(){return n.voltar()}),o._uU(18," Voltar"),o.qZA(),o.TgZ(19,"button",12),o.NdJ("click",function(){return n.send()}),o.YNc(20,g,1,0,"span",13),o._uU(21," Excluir "),o.qZA()()()()()()),2&d&&(o.ekj("active",n.modalOpen),o.xp6(15),o.Q6J("ngIf",n.erro),o.xp6(4),o.Q6J("disabled",n.loading),o.xp6(1),o.Q6J("ngIf",n.loading))},dependencies:[U.sg,U.O5,U.Ts]}),m})()},3834:(j,P,r)=>{r.d(P,{F:()=>D});var e=r(801),O=r(9808),M=r(4429),f=r(932),v=r(8913),A=r(9243),o=r(878),c=r(4650),I=r(202),y=r(7185),U=r(7549),Z=r(6680);let D=(()=>{class g{constructor(m,a,d,n,t,l){this.activatedRoute=m,this.toastr=a,this.modal=d,this.crypto=n,this.clienteService=t,this.empresaService=l,this.faTimes=e.NBC,this.faChevronLeft=e.A35,this.modalOpen=!1,this.objeto=new M.c1,this.erro=[],this.loading=!1,this.url="",this.subscription=[];var u=this.modal.getOpen().subscribe(_=>this.modalOpen=_);this.subscription.push(u),m.params.subscribe(_=>{_.cliente_id?this.objeto.id=this.crypto.decrypt(_.cliente_id):this.voltar()}),this.url=this.activatedRoute.snapshot.pathFromRoot.map(_=>_.routeConfig?.path).join("/"),this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?this.objeto=this.empresaService.object.cliente.find(_=>_.id==this.objeto.id):(0,O.n)(this.clienteService.get(this.objeto.id)).then(_=>this.objeto=_).catch(_=>this.voltar()).finally(()=>this.loading=!1),setTimeout(()=>{this.modal.setOpen(!0)},200)}ngOnDestroy(){this.modal.setOpen(!1)}resetForm(){this.objeto=new M.c1}voltar(){this.modal.voltar()}send(m){this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?(this.clienteService.edit_To_Empresa_List(this.objeto)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(this.url.includes("empresas/editar"),(0,O.n)(this.clienteService.edit(m)).then(a=>{(0,O.n)(this.clienteService.getList()),this.modal.voltar()}).catch(a=>{this.erro.push((0,o.b)(a))}).finally(()=>this.loading=!1))}}return g.\u0275fac=function(m){return new(m||g)(c.Y36(I.gz),c.Y36(y._W),c.Y36(U.Q),c.Y36(A.w),c.Y36(f.$),c.Y36(v.P))},g.\u0275cmp=c.Xpm({type:g,selectors:[["app-edit"]],decls:12,vars:5,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","1000px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],[3,"objeto","loading","erro","sendData"]],template:function(m,a){1&m&&(c.TgZ(0,"div",0)(1,"div",1),c.NdJ("click",function(){return a.voltar()}),c.qZA(),c.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),c._uU(6,"Editar cliente"),c.qZA(),c.TgZ(7,"a",6),c.NdJ("click",function(){return a.voltar()}),c._UZ(8,"span")(9,"span"),c.qZA()(),c.TgZ(10,"div",7)(11,"app-form-cliente",8),c.NdJ("sendData",function(n){return a.send(n)}),c.qZA()()()()()),2&m&&(c.ekj("active",a.modalOpen),c.xp6(11),c.Q6J("objeto",a.objeto)("loading",a.loading)("erro",a.erro))},dependencies:[Z.r]}),g})()},932:(j,P,r)=>{r.d(P,{$:()=>a});var e=r(1135),O=r(8505),M=r(9646),f=r(4429),v=r(2340),A=r(9243),o=r(9398),c=r(8913),I=r(9535),y=r(46),U=r(1685),Z=r(9876),D=r(4409),g=r(4650),E=r(529),m=r(7185);let a=(()=>{class d{constructor(t,l,u,_,x,R,b){this.http=t,this.crypto=l,this.empresaService=u,this.dropdownService=_,this.accountService=x,this.toastr=R,this.table=b,this.list=new e.X([]),this.url=v.N.url,this.objeto=new e.X(new f.c1),this.empresa=new o.oW,this.account=new U.mR,this.empresa=this.empresaService.object,this.empresaService.empresa.subscribe(w=>this.empresa=w),this.accountService.account.subscribe(w=>this.account=w??new U.mR)}getObject(){var t=localStorage.getItem("cliente");return t&&this.setObject(this.crypto.decrypt(t)??new f.c1),this.objeto}setObject(t){localStorage.setItem("cliente",this.crypto.encrypt(t)??""),this.objeto.next(t)}add_To_Empresa_List(t){if(this.empresa){var l=this.empresa.cliente??[];let _=this.dropdownService.perfilInvestidor.value.find(b=>b.id==t.perfilInvestidor_Id);if(!_)return this.toastr.error("Selecione um perfil de investidor v\xe1lido!!"),!1;t.perfilInvestidor=_;let x=this.dropdownService.estadoCivil.value.find(b=>b.id==t.estadoCivil_Id);if(!x)return this.toastr.error("Selecione um estado civil v\xe1lido!!"),!1;if(t.estadoCivil=x,this.empresa.cliente.find(b=>b.cpf==t.cpf||b.rg==t.rg))return this.toastr.error("CPF ou RG j\xe1 foram cadastrados!!"),!1;l.sort((b,w)=>b.id-w.id);var u=0==l.length?0:l[l.length-1].id;return t.id=++u,t.registroNaoSalvo=!0,l.push(t),this.empresa.cliente=l,this.empresaService.setObject(this.empresa,"add_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0}return this.toastr.error("Nenhuma empresa selecionada."),!1}edit_To_Empresa_List(t){if(this.empresa){var l=this.empresa.cliente??[];let u=l.findIndex(_=>_.id==t.id);if(-1!=u){let _=this.dropdownService.perfilInvestidor.value.find(b=>b.id==t.perfilInvestidor_Id);if(!_)return this.toastr.error("Selecione um perfil de investidor v\xe1lido!!"),!1;t.perfilInvestidor=_;let x=this.dropdownService.estadoCivil.value.find(b=>b.id==t.estadoCivil_Id);return x?(t.estadoCivil=x,this.empresa.cliente.find(b=>(b.cpf==t.cpf||b.rg==t.rg)&&b.id!=t.id)?(this.toastr.error("CPF ou RG j\xe1 foram cadastrados!!"),!1):(l.splice(u,1,t),this.empresa.cliente=l,this.empresaService.setObject(this.empresa,"edit_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),!0)):(this.toastr.error("Selecione um estado civil v\xe1lido!!"),!1)}return this.toastr.error("Cliente n\xe3o encontrado!!"),!1}return this.toastr.error("Nenhuma empresa selecionada."),!1}delete_To_Empresa_List(t){if(this.empresa){var l=this.empresa.cliente??[];let u=l.findIndex(_=>_.id==t);return-1!=u?(l.splice(u,1),this.empresa.cliente=l,this.empresaService.setObject(this.empresa,"delete_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0):(this.toastr.error("Cliente n\xe3o encontrado!!"),!1)}return this.toastr.error("Nenhuma empresa selecionada."),!1}getList(t){return console.log("url",this.url),this.table.loading.next(!0),this.http.get(`${this.url}/cliente/all/${t=t??(this.account.perfilAcesso_Id!=D.u.Admin?this.account.empresa_Id:this.empresa.id)}`).pipe((0,O.b)({next:l=>(l=l.map(u=>(u.ativo=!u.dataDesativado,u)),this.list.next(l),(0,M.of)(l)),complete:()=>{this.table.loading.next(!1)}}))}get(t){return this.http.get(`${this.url}/cliente/${t}`)}create(t){return this.http.post(`${this.url}/cliente/${this.account.perfilAcesso_Id!=D.u.Admin?this.account.empresa_Id:this.empresa.id}`,t)}edit(t){return this.http.put(`${this.url}/cliente/${t.id}`,t)}delete(t){return this.http.delete(`${this.url}/cliente/${t}`)}deactivated(t,l){return this.http.patch(`${this.url}/cliente/${t}/${l}`,{})}}return d.\u0275fac=function(t){return new(t||d)(g.LFG(E.eN),g.LFG(A.w),g.LFG(c.P),g.LFG(I.V),g.LFG(Z.B),g.LFG(m._W),g.LFG(y.i))},d.\u0275prov=g.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"}),d})()},6680:(j,P,r)=>{r.d(P,{r:()=>oe});var e=r(4650),O=r(801),M=r(4429),f=r(9535),v=r(3866),A=r(9808),o=r(7185),c=r(6895),I=r(433),y=r(1094),U=r(279),Z=r(7897);const D=["dataNascimento"];function g(i,C){1&i&&(e.TgZ(0,"p",8),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function E(i,C){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,g,2,0,"p",57),e.qZA()),2&i){e.oxw();const s=e.MAs(12);e.xp6(1),e.Q6J("ngIf",s.errors.required)}}function m(i,C){if(1&i&&(e.TgZ(0,"option",16),e._uU(1),e.qZA()),2&i){const s=C.$implicit;e.Q6J("ngValue",s.id),e.xp6(1),e.Oqu(s.descricao)}}function a(i,C){1&i&&(e.TgZ(0,"p",8),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function d(i,C){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,a,2,0,"p",57),e.qZA()),2&i){e.oxw();const s=e.MAs(20);e.xp6(1),e.Q6J("ngIf",s.errors.required)}}function n(i,C){if(1&i&&(e.TgZ(0,"option",16),e._uU(1),e.qZA()),2&i){const s=C.$implicit;e.Q6J("ngValue",s.id),e.xp6(1),e.Oqu(s.descricao)}}function t(i,C){1&i&&(e.TgZ(0,"p",8),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function l(i,C){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,t,2,0,"p",57),e.qZA()),2&i){e.oxw();const s=e.MAs(31);e.xp6(1),e.Q6J("ngIf",s.errors.required)}}function u(i,C){1&i&&(e.TgZ(0,"p",8),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function _(i,C){1&i&&(e.TgZ(0,"p",8),e._uU(1,"CPF inv\xe1lido."),e.qZA())}function x(i,C){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,u,2,0,"p",57),e.YNc(2,_,2,0,"p",57),e.qZA()),2&i){e.oxw();const s=e.MAs(43);e.xp6(1),e.Q6J("ngIf",s.errors.required),e.xp6(1),e.Q6J("ngIf",s.errors.mask)}}function R(i,C){1&i&&(e.TgZ(0,"p",8),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function b(i,C){1&i&&(e.TgZ(0,"p",8),e._uU(1,"RG inv\xe1lido."),e.qZA())}function w(i,C){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,R,2,0,"p",57),e.YNc(2,b,2,0,"p",57),e.qZA()),2&i){e.oxw();const s=e.MAs(51);e.xp6(1),e.Q6J("ngIf",s.errors.required),e.xp6(1),e.Q6J("ngIf",s.errors.mask)}}function W(i,C){1&i&&(e.TgZ(0,"p",8),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function Y(i,C){1&i&&(e.TgZ(0,"p",8),e._uU(1,"Data inv\xe1lida."),e.qZA())}function Q(i,C){if(1&i&&(e.TgZ(0,"p",8)(1,"small"),e._uU(2),e.qZA()()),2&i){const s=e.oxw(2);e.xp6(2),e.hij("Data m\xednima \xe9 ",s.dataNascimentoMin,"")}}function k(i,C){if(1&i&&(e.TgZ(0,"p",8)(1,"small"),e._uU(2),e.qZA()()),2&i){const s=e.oxw(2);e.xp6(2),e.hij("Data m\xe1xima \xe9 ",s.dataNascimentoMax,"")}}function q(i,C){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,W,2,0,"p",57),e.YNc(2,Y,2,0,"p",57),e.YNc(3,Q,3,1,"p",57),e.YNc(4,k,3,1,"p",57),e.qZA()),2&i){e.oxw();const s=e.MAs(59);e.xp6(1),e.Q6J("ngIf",s.errors.required),e.xp6(1),e.Q6J("ngIf",s.errors.date),e.xp6(1),e.Q6J("ngIf",s.errors.min),e.xp6(1),e.Q6J("ngIf",s.errors.max)}}function V(i,C){1&i&&(e.TgZ(0,"p",8),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function G(i,C){1&i&&(e.TgZ(0,"p",8),e._uU(1,"E-mail inv\xe1lido."),e.qZA())}function $(i,C){if(1&i&&(e.TgZ(0,"div"),e.YNc(1,V,2,0,"p",57),e.YNc(2,G,2,0,"p",57),e.qZA()),2&i){e.oxw();const s=e.MAs(75);e.xp6(1),e.Q6J("ngIf",s.errors.required),e.xp6(1),e.Q6J("ngIf",s.errors.email)}}function H(i,C){if(1&i&&(e.TgZ(0,"p",61),e._uU(1),e.ALo(2,"json"),e.qZA()),2&i){const s=C.$implicit;e.xp6(1),e.Oqu(e.lcZ(2,1,s))}}function X(i,C){1&i&&(e.TgZ(0,"p",61),e._uU(1,"Preencha todos os campos obrigat\xf3rios (*) corretamente para salvar"),e.qZA())}function z(i,C){if(1&i&&(e.TgZ(0,"div",58),e.YNc(1,H,3,3,"p",59),e.YNc(2,X,2,0,"p",60),e.qZA()),2&i){const s=e.oxw(),p=e.MAs(1);e.xp6(1),e.Q6J("ngForOf",s.erro),e.xp6(1),e.Q6J("ngIf",p.invalid&&0==s.erro.length)}}function ee(i,C){1&i&&e._UZ(0,"span",62)}function te(i,C){1&i&&(e.TgZ(0,"div",63),e._uU(1," Este campo \xe9 obrigat\xf3rio "),e.qZA())}let oe=(()=>{class i{constructor(s,p){this.toastr=s,this.dropdown=p,this.objeto=new M.c1,this.loading=!1,this.erro=[],this.sendData=new e.vpe,this.faPlus=O.r8p,this.faTrashAlt=O.I7k,this.faChartSimple=O.Wpq,this.faTable=O.B3e,this.faEdit=O.Xcf,this.perfilInvestidor=[],this.loadingPerfilInvestidor=!0,this.estadoCivil=[],this.loadingEstadoCivil=!0,this.dataNascimentoMin="",this.dataNascimentoMax="",(0,A.n)(this.dropdown.getPerfilInvestidor()).then(h=>this.perfilInvestidor=h).finally(()=>this.loadingPerfilInvestidor=!1),(0,A.n)(this.dropdown.getEstadoCivil()).then(h=>this.estadoCivil=h).catch().finally(()=>this.loadingEstadoCivil=!1);var N=new Date;N.setFullYear(N.getFullYear()+100),this.dataNascimentoMax=N.toJSON().substring(0,10);var T=new Date;T.setFullYear(T.getFullYear()-100),this.dataNascimentoMin=T.toJSON().substring(0,10)}ngOnChanges(s){s.objeto&&(this.objeto=s.objeto.currentValue,this.objeto={id:0,empresa_Id:3,account_Id:void 0,perfilInvestidor_Id:2,nome:"Teste aaa",idade:22,altura:"",peso:"",imc:"",estadoCivil_Id:2,dataNascimento:"2000-11-11",cpf:11111111111,rg:111111111,email:"teste@teste.com",receita:0xa1b01d4b1c7,despesa:0xa1b01d4b1c7,idadeAposentadoria:0,rendaMensalAposentadoria:0,rentabilidadeAposentadoria:0,registroNaoSalvo:!1}),s.loading&&(this.loading=s.loading.currentValue),s.erro&&(this.erro=s.erro.currentValue)}send(s){if(s.invalid)return this.toastr.error("Campos inv\xe1lidos"),void(this.erro=["Campos inv\xe1lidos"]);this.erro=[],this.objeto.idadeAposentadoria=parseInt(this.objeto.idadeAposentadoria.toString()),this.objeto.cpf=parseInt(this.objeto.cpf.toString()),this.objeto.rg=parseInt(this.objeto.rg.toString()),this.sendData.emit(this.objeto)}calculaIdade(){if(this.objeto.dataNascimento&&""!=this.objeto.dataNascimento.toString().trim()){var s=Date.now()-new Date(new Date(this.objeto.dataNascimento).toUTCString()).getTime(),p=new Date(s);this.objeto.idade=Math.abs(p.getUTCFullYear()-1970)}else this.objeto.idade=""}arrowUp(s){return(0,v.zJ)(s)}arrowDown(s,p=!1){return(0,v.DI)(s,p)}validateDataNascimento(){var s=new Date(this.objeto.dataNascimento),p=new Date(this.dataNascimentoMin),N=new Date(this.dataNascimentoMax);this.dataNascimento&&(s>N?this.dataNascimento.control.setErrors({max:!0}):s<p&&this.dataNascimento.control.setErrors({min:!0}))}validateNumber(s){var T=s.value;return console.log(s,T),T>1e8&&s.control.setErrors({max:!0}),T>0&&s.control.setErrors({min:!0}),s}}return i.\u0275fac=function(s){return new(s||i)(e.Y36(o._W),e.Y36(f.V))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-form-cliente"]],viewQuery:function(s,p){if(1&s&&e.Gf(D,5),2&s){let N;e.iGM(N=e.CRH())&&(p.dataNascimento=N.first)}},inputs:{objeto:"objeto",loading:"loading",erro:"erro"},outputs:{sendData:"sendData"},features:[e.TTD],decls:128,vars:85,consts:[[1,"needs-validation",3,"ngSubmit"],["form","ngForm"],[1,"d-flex","flex-wrap","row"],[1,"col-xl-8","col-lg-8","col-md-8","col-sm-12","col-12"],[1,""],[1,"form-row"],[1,"form-group","col-lg-5","col-md-5","col-sm-12","col-12"],["for","nome"],[1,"text-danger"],["type","text","name","nome","id","nome","required","","popoverClass","popover-danger","triggers","mouseenter:mouseleave",1,"form-control",3,"ngModel","ngbPopover","ngModelChange"],["nome","ngModel"],[4,"ngIf"],[1,"form-group","col-lg-4","col-md-4","col-sm-6","col-12"],["for","perfilInvestidor"],["name","perfilInvestidor","id","perfilInvestidor","required","","popoverClass","popover-danger","triggers","mouseenter:mouseleave",1,"form-control",3,"ngModel","ngbPopover","ngModelChange"],["_perfilInvestidor","ngModel"],[3,"ngValue"],[3,"ngValue",4,"ngFor","ngForOf"],[1,"form-group","col-lg-3","col-md-3","col-sm-6","col-12"],["for","estadoCivil"],["name","estadoCivil","id","estadoCivil","required","","popoverClass","popover-danger","triggers","mouseenter:mouseleave",1,"form-control",3,"ngModel","ngbPopover","ngModelChange"],["_estadoCivil","ngModel"],["for","cpf"],["type","text","name","cpf","id","cpf","popoverClass","popover-danger","triggers","mouseenter:mouseleave","mask","000.000.000-00","placeholder","000.000.000-00","required","",1,"form-control",3,"ngModel","ngbPopover","ngModelChange"],["cpf","ngModel"],["for","rg"],["type","text","name","rg","id","rg","popoverClass","popover-danger","triggers","mouseenter:mouseleave","mask","00.000.000-0","placeholder","00.000.000-0","required","",1,"form-control",3,"ngModel","ngbPopover","ngModelChange"],["rg","ngModel"],["for","dataNascimento"],["type","date","name","dataNascimento","id","dataNascimento","popoverClass","popover-danger","triggers","mouseenter:mouseleave","required","",1,"form-control",3,"ngModel","ngbPopover","min","max","ngModelChange"],["dataNascimento","ngModel"],[1,"form-group","col-lg-2","col-md-2","col-sm-6","col-12"],["for","idade"],["type","text","name","idade","id","idade","popoverClass","popover-danger","triggers","mouseenter:mouseleave","mask","0*","suffix"," anos","required","",1,"form-control","form-control-number",3,"ngModel","ngbPopover","disablePopover","ngModelChange","keyup.arrowup","keyup.arrowdown"],["idade","ngModel"],[1,"form-group","col-lg-12","col-md-12","col-sm-12","col-12"],["for","email"],["type","email","name","email","id","email","required","","popoverClass","popover-danger","triggers","mouseenter:mouseleave",1,"form-control",3,"email","ngModel","ngbPopover","ngModelChange"],["email","ngModel"],[1,"form-group","col-lg-6","col-md-6","col-sm-12"],["for","receita"],[3,"valueInput","inputId","mask","thousandSeparator","decimalMarker","prefix","min","max","required","valueChanges"],["for","despesa"],[1,"col-xl-4","col-lg-4","col-md-4","col-sm-12","col-12"],[1,"mt-3"],[1,"p-datatable-wrapper"],[1,"table","table-editable","table-responsive","w-100","d-md-table","d-sm-table"],[1,"primary"],[1,"bg-light","px-3","text-right",2,"white-space","nowrap"],[3,"valueInput","inputId","mask","suffix","min","max","required","showErrorMessage","valueChanges"],[3,"valueInput","inputId","mask","thousandSeparator","decimalMarker","prefix","min","max","required","placeholder","showErrorMessage","valueChanges"],[3,"valueInput","inputId","mask","suffix","max","required","showErrorMessage","allowNegativeNumbers","placeholder","valueChanges"],[1,"d-flex","p-0","mt-1"],["class","m-0",4,"ngIf"],[1,"btn","btn-primary","mr-0","ml-auto",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],["campoObrigatorio",""],["class","text-danger",4,"ngIf"],[1,"m-0"],["class","text-red",4,"ngFor","ngForOf"],["class","text-red",4,"ngIf"],[1,"text-red"],[1,"spinner-border","spinner-border-sm","mr-1"],[1,"py-3","px-4"]],template:function(s,p){if(1&s){const N=e.EpF();e.TgZ(0,"form",0,1),e.NdJ("ngSubmit",function(){e.CHM(N);const h=e.MAs(1);return e.KtG(p.send(h))}),e.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"label",7),e._uU(8,"Nome Completo: "),e.TgZ(9,"span",8),e._uU(10,"*"),e.qZA()(),e.TgZ(11,"input",9,10),e.NdJ("ngModelChange",function(h){return p.objeto.nome=h}),e.qZA(),e.YNc(13,E,2,1,"div",11),e.qZA(),e.TgZ(14,"div",12)(15,"label",13),e._uU(16,"Perfil de Investidor: "),e.TgZ(17,"span",8),e._uU(18,"*"),e.qZA()(),e.TgZ(19,"select",14,15),e.NdJ("ngModelChange",function(h){return p.objeto.perfilInvestidor_Id=h}),e.TgZ(21,"option",16),e._uU(22,"Selecione"),e.qZA(),e.YNc(23,m,2,2,"option",17),e.qZA(),e.YNc(24,d,2,1,"div",11),e.qZA(),e.TgZ(25,"div",18)(26,"label",19),e._uU(27,"Estado Civil: "),e.TgZ(28,"span",8),e._uU(29,"*"),e.qZA()(),e.TgZ(30,"select",20,21),e.NdJ("ngModelChange",function(h){return p.objeto.estadoCivil_Id=h}),e.TgZ(32,"option",16),e._uU(33,"Selecione"),e.qZA(),e.YNc(34,n,2,2,"option",17),e.qZA(),e.YNc(35,l,2,1,"div",11),e.qZA()(),e.TgZ(36,"div",5)(37,"div",18)(38,"label",22),e._uU(39,"CPF: "),e.TgZ(40,"span",8),e._uU(41,"*"),e.qZA()(),e.TgZ(42,"input",23,24),e.NdJ("ngModelChange",function(h){return p.objeto.cpf=h}),e.qZA(),e.YNc(44,x,3,2,"div",11),e.qZA(),e.TgZ(45,"div",18)(46,"label",25),e._uU(47,"RG: "),e.TgZ(48,"span",8),e._uU(49,"*"),e.qZA()(),e.TgZ(50,"input",26,27),e.NdJ("ngModelChange",function(h){return p.objeto.rg=h}),e.qZA(),e.YNc(52,w,3,2,"div",11),e.qZA(),e.TgZ(53,"div",12)(54,"label",28),e._uU(55,"Data de Nascimento: "),e.TgZ(56,"span",8),e._uU(57,"*"),e.qZA()(),e.TgZ(58,"input",29,30),e.NdJ("ngModelChange",function(h){return p.objeto.dataNascimento=h})("ngModelChange",function(){return p.calculaIdade(),p.validateDataNascimento()}),e.qZA(),e.YNc(60,q,5,4,"div",11),e.qZA(),e.TgZ(61,"div",31)(62,"label",32),e._uU(63,"Idade: "),e.TgZ(64,"span",8),e._uU(65,"*"),e.qZA()(),e.TgZ(66,"input",33,34),e.NdJ("ngModelChange",function(h){return p.objeto.idade=h})("keyup.arrowup",function(){e.CHM(N);const h=e.MAs(67);return e.KtG(p.objeto.idade=p.arrowUp(h.value))})("keyup.arrowdown",function(){e.CHM(N);const h=e.MAs(67);return e.KtG(p.objeto.idade=p.arrowDown(h.value,!0))}),e.qZA()()(),e.TgZ(68,"div",5)(69,"div",35)(70,"label",36),e._uU(71,"E-mail: "),e.TgZ(72,"span",8),e._uU(73,"*"),e.qZA()(),e.TgZ(74,"input",37,38),e.NdJ("ngModelChange",function(h){return p.objeto.email=h}),e.qZA(),e.YNc(76,$,3,2,"div",11),e.qZA()(),e.TgZ(77,"div",5)(78,"div",39)(79,"label",40),e._uU(80,"Receita: "),e.TgZ(81,"span",8),e._uU(82,"*"),e.qZA()(),e.TgZ(83,"app-input-number",41),e.NdJ("valueChanges",function(h){return p.objeto.receita=h}),e.qZA()(),e.TgZ(84,"div",39)(85,"label",42),e._uU(86,"Despesas: "),e.TgZ(87,"span",8),e._uU(88,"*"),e.qZA()(),e.TgZ(89,"app-input-number",41),e.NdJ("valueChanges",function(h){return p.objeto.despesa=h}),e.qZA()()()()(),e.TgZ(90,"div",43)(91,"div",44)(92,"div",45)(93,"table",46)(94,"thead",47)(95,"tr"),e._UZ(96,"th"),e.TgZ(97,"th"),e._uU(98,"Aposentadoria"),e.qZA()()(),e.TgZ(99,"tbody")(100,"tr")(101,"td",48)(102,"small")(103,"b"),e._uU(104,"Idade"),e.qZA()()(),e.TgZ(105,"td")(106,"app-input-number",49),e.NdJ("valueChanges",function(h){return p.objeto.idadeAposentadoria=h}),e.qZA()()(),e.TgZ(107,"tr")(108,"td",48)(109,"small")(110,"b"),e._uU(111,"Renda Mensal"),e.qZA()()(),e.TgZ(112,"td")(113,"app-input-number",50),e.NdJ("valueChanges",function(h){return p.objeto.rendaMensalAposentadoria=h}),e.qZA()()(),e.TgZ(114,"tr")(115,"td",48)(116,"small")(117,"b"),e._uU(118,"Rentabilidade"),e.qZA()()(),e.TgZ(119,"td")(120,"app-input-number",51),e.NdJ("valueChanges",function(h){return p.objeto.rentabilidadeAposentadoria=h}),e.qZA()()()()()()()()(),e.TgZ(121,"div",52),e.YNc(122,z,3,2,"div",53),e.TgZ(123,"button",54),e.YNc(124,ee,1,0,"span",55),e._uU(125," Salvar "),e.qZA()()(),e.YNc(126,te,2,0,"ng-template",null,56,e.W1O)}if(2&s){const N=e.MAs(1),T=e.MAs(12),h=e.MAs(20),L=e.MAs(31),S=e.MAs(43),B=e.MAs(51),K=e.MAs(59),re=e.MAs(67),J=e.MAs(75),F=e.MAs(127);e.xp6(11),e.Q6J("ngModel",p.objeto.nome)("ngbPopover",F),e.xp6(2),e.Q6J("ngIf",T.touched&&T.errors),e.xp6(6),e.ekj("form-control-loading",p.loadingPerfilInvestidor),e.Q6J("ngModel",p.objeto.perfilInvestidor_Id)("ngbPopover",F),e.xp6(2),e.Q6J("ngValue",void 0),e.xp6(2),e.Q6J("ngForOf",p.perfilInvestidor),e.xp6(1),e.Q6J("ngIf",h.touched&&h.errors),e.xp6(6),e.ekj("form-control-loading",p.loadingEstadoCivil),e.Q6J("ngModel",p.objeto.estadoCivil_Id)("ngbPopover",F),e.xp6(2),e.Q6J("ngValue",void 0),e.xp6(2),e.Q6J("ngForOf",p.estadoCivil),e.xp6(1),e.Q6J("ngIf",L.touched&&L.errors),e.xp6(7),e.Q6J("ngModel",p.objeto.cpf)("ngbPopover",F),e.xp6(2),e.Q6J("ngIf",S.touched&&S.errors),e.xp6(6),e.Q6J("ngModel",p.objeto.rg)("ngbPopover",F),e.xp6(2),e.Q6J("ngIf",B.touched&&B.errors),e.xp6(6),e.Q6J("ngModel",p.objeto.dataNascimento)("ngbPopover",F)("min",p.dataNascimentoMin)("max",p.dataNascimentoMax),e.xp6(2),e.Q6J("ngIf",K.touched&&K.errors),e.xp6(6),e.Q6J("ngModel",p.objeto.idade)("ngbPopover",F)("disablePopover",null==re.errors),e.xp6(8),e.Q6J("email",!0)("ngModel",p.objeto.email)("ngbPopover",F),e.xp6(2),e.Q6J("ngIf",J.touched&&J.errors),e.xp6(7),e.Q6J("valueInput",p.objeto.receita)("inputId","receita")("mask","separator")("thousandSeparator",".")("decimalMarker",",")("prefix","R$")("min",1)("max",1e8)("required",!0),e.xp6(6),e.Q6J("valueInput",p.objeto.despesa)("inputId","despesa")("mask","separator")("thousandSeparator",".")("decimalMarker",",")("prefix","R$")("min",1)("max",1e8)("required",!0),e.xp6(17),e.Q6J("valueInput",p.objeto.idadeAposentadoria)("inputId","idadeAposentadoria")("mask","0*")("suffix"," anos")("min",20)("max",100)("required",!0)("showErrorMessage",!1),e.xp6(7),e.Q6J("valueInput",p.objeto.rendaMensalAposentadoria)("inputId","rendaMensalAposentadoria")("mask","separator.5")("thousandSeparator",".")("decimalMarker",",")("prefix","R$")("min",1)("max",1e8)("required",!0)("placeholder","R$ 00,00")("showErrorMessage",!1),e.xp6(7),e.Q6J("valueInput",p.objeto.rentabilidadeAposentadoria)("inputId","rentabilidadeAposentadoria")("mask","separator.5")("suffix","%")("max",1e8)("required",!0)("showErrorMessage",!1)("allowNegativeNumbers",!0)("placeholder","0,00%")("showErrorMessage",!1),e.xp6(2),e.Q6J("ngIf",p.erro||N.invalid),e.xp6(1),e.Q6J("disabled",N.invalid||p.loading),e.xp6(1),e.Q6J("ngIf",p.loading)}},dependencies:[c.sg,c.O5,I._Y,I.YN,I.Kr,I.Fj,I.EJ,I.JJ,I.JL,I.Q7,I.on,I.On,I.F,y.hx,U.o8,Z.l,c.Ts]}),i})()},7897:(j,P,r)=>{r.d(P,{l:()=>D});var e=r(4650),O=r(6895),M=r(433),f=r(1094),v=r(279);const A=["input"];function o(a,d){1&a&&(e.TgZ(0,"p",5),e._uU(1,"Este campo \xe9 obrigat\xf3rio."),e.qZA())}function c(a,d){1&a&&(e.TgZ(0,"p",5),e._uU(1,"Valor inv\xe1lido."),e.qZA())}function I(a,d){if(1&a&&(e.TgZ(0,"p",5),e._uU(1),e.qZA()),2&a){const n=e.oxw(2);e.xp6(1),e.hij("Valor m\xednimo \xe9 ",n.min,".")}}function y(a,d){if(1&a&&(e.TgZ(0,"p",5),e._uU(1),e.qZA()),2&a){const n=e.oxw(2);e.xp6(1),e.hij("Valor m\xe1ximo \xe9 ",n.max,".")}}function U(a,d){if(1&a&&(e.TgZ(0,"div"),e.YNc(1,o,2,0,"p",4),e.YNc(2,c,2,0,"p",4),e.YNc(3,I,2,1,"p",4),e.YNc(4,y,2,1,"p",4),e.qZA()),2&a){e.oxw();const n=e.MAs(1);e.xp6(1),e.Q6J("ngIf",n.errors.required),e.xp6(1),e.Q6J("ngIf",n.errors.mask),e.xp6(1),e.Q6J("ngIf",n.errors.min),e.xp6(1),e.Q6J("ngIf",n.errors.max)}}function Z(a,d){1&a&&(e.TgZ(0,"div",6),e._uU(1," Este campo \xe9 obrigat\xf3rio "),e.qZA())}let D=(()=>{class a{constructor(){this.thousandSeparator=".",this.decimalMarker=",",this.inputId="",this.required=!1,this.arrowControls=!0,this.showErrorMessage=!0,this.allowNegativeNumbers=!1,this.placeholder="",this.readonly=!1,this.valueChanges=new e.vpe}ngOnChanges(n){n.valueInput&&(this.valueInput=n.valueInput.currentValue),n.mask&&(this.mask=n.mask.currentValue),n.suffix&&(this.suffix=n.suffix.currentValue),n.prefix&&(this.prefix=n.prefix.currentValue),n.thousandSeparator&&(this.thousandSeparator=n.thousandSeparator.currentValue),n.decimalMarker&&(this.decimalMarker=n.decimalMarker.currentValue),n.inputId&&(this.inputId=n.inputId.currentValue),n.min&&(this.min=n.min.currentValue),n.max&&(this.max=n.max.currentValue),n.required&&(this.required=n.required.currentValue),n.arrowControls&&(this.arrowControls=n.arrowControls.currentValue),n.showErrorMessage&&(this.showErrorMessage=n.showErrorMessage.currentValue),n.placeholder&&(this.placeholder=n.placeholder.currentValue),n.allowNegativeNumbers&&(this.allowNegativeNumbers=n.allowNegativeNumbers.currentValue),n.readonly&&(this.readonly=n.readonly.currentValue),setTimeout(()=>{this.validate()},300)}validate(){null!=this.max&&this.valueInput>this.max?this.input.control.setErrors({max:!0}):null!=this.min&&this.valueInput<this.min&&this.input.control.setErrors({min:!0})}inputChanged(){this.valueChanges.emit(this.valueInput)}arrowUp(n,t=1,l=0,u=1e8,_=this.allowNegativeNumbers){var x=function g(a){return a.value+=a.skip,null!=a.max&&null!=a.max&&a.value>a.max&&(a.value=a.max),a.value}({value:n,skip:t,min:l,max:u,allowNegativeNumbers:_??!1});return this.valueInput=parseFloat(x),setTimeout(()=>this.validate(),500),x}arrowDown(n,t=1,l=0,u=1e8,_=this.allowNegativeNumbers){var x=function E(a){var d=a.value-a.skip;return!a.allowNegativeNumbers&&d<1?d=0:null!=a.min&&null!=a.min&&d<a.min&&(d=a.min),d}({value:n,skip:t,min:l,max:u,allowNegativeNumbers:_??!1});return this.valueInput=parseFloat(x),setTimeout(()=>this.validate(),500),n}}return a.\u0275fac=function(n){return new(n||a)},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-input-number"]],viewQuery:function(n,t){if(1&n&&e.Gf(A,5),2&n){let l;e.iGM(l=e.CRH())&&(t.input=l.first)}},inputs:{valueInput:"valueInput",mask:"mask",suffix:"suffix",prefix:"prefix",thousandSeparator:"thousandSeparator",decimalMarker:"decimalMarker",inputId:"inputId",min:"min",max:"max",required:"required",arrowControls:"arrowControls",showErrorMessage:"showErrorMessage",allowNegativeNumbers:"allowNegativeNumbers",placeholder:"placeholder",readonly:"readonly"},outputs:{valueChanges:"valueChanges"},features:[e.TTD],decls:5,vars:17,consts:[["type","text","popoverClass","popover-danger","triggers","mouseenter:mouseleave",1,"form-control","form-control-number",3,"id","name","ngModel","mask","thousandSeparator","decimalMarker","suffix","prefix","allowNegativeNumbers","ngbPopover","disablePopover","min","max","required","placeholder","readonly","ngModelChange","change","keyup.arrowup","keyup.arrowdown","keyup.shift.arrowup","keyup.shift.arrowdown","keyup.control.arrowup","keyup.control.arrowdown","keyup.alt.arrowUp","keyup.alt.arrowdown"],["input","ngModel"],[4,"ngIf"],["campoObrigatorio",""],["class","text-danger",4,"ngIf"],[1,"text-danger"],[1,"py-3","px-4"]],template:function(n,t){if(1&n){const l=e.EpF();e.TgZ(0,"input",0,1),e.NdJ("ngModelChange",function(_){return t.valueInput=_})("ngModelChange",function(){return t.inputChanged()})("change",function(){return t.validate()})("keyup.arrowup",function(){e.CHM(l);const _=e.MAs(1);return e.KtG(t.arrowControls?t.arrowUp(_.value):void 0)})("keyup.arrowdown",function(){e.CHM(l);const _=e.MAs(1);return e.KtG(t.arrowControls?t.arrowDown(_.value):void 0)})("keyup.shift.arrowup",function(){e.CHM(l);const _=e.MAs(1);return e.KtG(t.arrowControls?t.arrowUp(_.value,10):void 0)})("keyup.shift.arrowdown",function(){e.CHM(l);const _=e.MAs(1);return e.KtG(t.arrowControls?t.arrowDown(_.value,10):void 0)})("keyup.control.arrowup",function(){e.CHM(l);const _=e.MAs(1);return e.KtG(t.arrowControls?t.arrowUp(_.value,100):void 0)})("keyup.control.arrowdown",function(){e.CHM(l);const _=e.MAs(1);return e.KtG(t.arrowControls?t.arrowDown(_.value,100):void 0)})("keyup.alt.arrowUp",function(){e.CHM(l);const _=e.MAs(1);return e.KtG(t.arrowControls?t.arrowUp(_.value,.1):void 0)})("keyup.alt.arrowdown",function(){e.CHM(l);const _=e.MAs(1);return e.KtG(t.arrowControls?t.arrowDown(_.value,.1):void 0)}),e.qZA(),e.YNc(2,U,5,4,"div",2),e.YNc(3,Z,2,0,"ng-template",null,3,e.W1O)}if(2&n){const l=e.MAs(1),u=e.MAs(4);let _;e.Q6J("id",t.inputId)("name",t.inputId)("ngModel",t.valueInput)("mask",t.mask?t.mask:"")("thousandSeparator",t.thousandSeparator?t.thousandSeparator:"")("decimalMarker",t.decimalMarker)("suffix",t.suffix?t.suffix:"")("prefix",t.prefix?t.prefix+" ":"")("allowNegativeNumbers",null!==(_=t.allowNegativeNumbers)&&void 0!==_&&_)("ngbPopover",t.required?u:void 0)("disablePopover",null==l.errors)("min",t.min)("max",t.max)("required",t.required)("placeholder",t.placeholder)("readonly",t.readonly),e.xp6(2),e.Q6J("ngIf",l.touched&&l.errors&&t.showErrorMessage)}},dependencies:[O.O5,M.Fj,M.JJ,M.Q7,M.On,f.hx,v.o8]}),a})()},3866:(j,P,r)=>{function M(v=0,A){return v=++v,null!=A&&null!=A&&v>A&&(v=A),v}function f(v=0,A=!1){return(v=--v)<0&&!A&&(v=0),v}r.d(P,{DI:()=>f,zJ:()=>M})}}]);