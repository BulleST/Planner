"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[875],{4458:(W,Z,a)=>{a.d(Z,{G:()=>D});var R=a(801),t=a(9808),v=a(6025),A=a(9205),I=a(9243),y=a(878),i=a(4650),l=a(202),j=a(7549),S=a(7185),U=a(3389),T=a(3868);let D=(()=>{class _{constructor(m,d,p,h,O){if(this.activatedRoute=m,this.modal=d,this.setupService=p,this.toastr=h,this.crypto=O,this.faTimes=R.NBC,this.faWallet=R.X5K,this.faChevronLeft=R.A35,this.modalOpen=!1,this.objeto=new v.Wj,this.erro=[],this.loading=!1,this.url="",this.subscription=[],this.clearData=!1,this.routerBack=["../"],this.routeBackOptions={relativeTo:this.activatedRoute},this.url=this.activatedRoute.snapshot.pathFromRoot.map(b=>b.routeConfig?.path).join("/"),this.url.includes("empresas/editar")){var C=m.parent?.parent?.params.subscribe(b=>{b.empresa_id?this.objeto.empresa_Id=this.crypto.decrypt(b.empresa_id):this.voltar()});C&&this.subscription.push(C)}this.objeto.carteiraProdutoRel.push({id:0,carteiraSetup_Id:0,percentual:0,produto_Id:61,produto:{id:61,descricao:"Conta Corrente",tipoRisco_Id:1,tipoRisco:{id:1,nome:"Baix\xedssimo"},tipoAtivo_Id:1,tipoLiquidez_Id:0}})}voltar(){this.modal.voltar(this.routerBack,this.routeBackOptions)}ngOnDestroy(){this.subscription.forEach(m=>m.unsubscribe())}resetForm(){this.objeto=new v.Wj,this.setupService.setObject(new v.Wj),this.clearData=!0}send(m){this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")?(this.setupService.add_To_Empresa_List(this.objeto)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(this.url.includes("empresas/editar"),(0,t.n)(this.setupService.create(this.objeto)).then(d=>{this.voltar(),(0,t.n)(this.setupService.getList())}).catch(d=>{this.erro.push((0,y.b)(d))}).finally(()=>this.loading=!1))}}return _.\u0275fac=function(m){return new(m||_)(i.Y36(l.gz),i.Y36(j.Q),i.Y36(A.A),i.Y36(S._W),i.Y36(I.w))},_.\u0275cmp=i.Xpm({type:_,selectors:[["app-create"]],decls:13,vars:5,consts:[[1,"modal__content"],[1,"modal__header","pb-2",2,"padding","0 25px"],[1,"link","text-dark",3,"click"],[1,"mr-1",3,"icon"],[1,"text-orange","mt-2"],[1,"btn","btn-yellow",3,"click"],[1,"modal__body","mt-0"],[3,"objeto","loading","erro","clearData","sendData"]],template:function(m,d){1&m&&(i.TgZ(0,"div",0)(1,"div",1)(2,"div")(3,"a",2),i.NdJ("click",function(){return d.voltar()}),i._UZ(4,"fa-icon",3),i._uU(5," Voltar "),i.qZA(),i.TgZ(6,"h3",4),i._uU(7,"Adicionar carteira setup"),i.qZA()(),i.TgZ(8,"button",5),i.NdJ("click",function(){return d.resetForm()}),i._uU(9,"Limpar campos"),i.qZA()(),i.TgZ(10,"div",6)(11,"app-form-carteira-setup",7),i.NdJ("sendData",function(h){return d.send(h)}),i.qZA()()(),i._UZ(12,"router-outlet")),2&m&&(i.xp6(4),i.Q6J("icon",d.faChevronLeft),i.xp6(7),i.Q6J("objeto",d.objeto)("loading",d.loading)("erro",d.erro)("clearData",d.clearData))},dependencies:[l.lC,U.U,T.BN]}),_})()},8811:(W,Z,a)=>{a.d(Z,{T:()=>U});var R=a(5861),t=a(801),v=a(9808),A=a(6025),I=a(9205),y=a(9243),i=a(4650),l=a(202),j=a(7549),S=a(7119);let U=(()=>{class T{constructor(_,f,m,d){var p=this;this.activatedRoute=_,this.modal=f,this.setupService=m,this.crypto=d,this.faTimes=t.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.url="",this.objeto=new A.Wj,this.subscription=[],this.routerBack=["../../"],this.routeBackOptions={relativeTo:this.activatedRoute};var h=this.modal.getOpen().subscribe(C=>this.modalOpen=C);this.subscription.push(h),this.url=this.activatedRoute.snapshot.pathFromRoot.map(C=>C.routeConfig?.path).join("/");var O=_.params.subscribe(function(){var C=(0,R.Z)(function*(b){b.setup_id?(p.objeto.id=p.crypto.decrypt(b.setup_id),p.objeto=yield(0,v.n)(p.setupService.get(p.objeto.id))):p.voltar()});return function(b){return C.apply(this,arguments)}}());this.subscription.push(O),setTimeout(()=>{this.modal.setOpen(!0)},200)}ngOnDestroy(){this.subscription.forEach(_=>_.unsubscribe())}voltar(){this.modal.voltar(this.routerBack,this.routeBackOptions)}}return T.\u0275fac=function(_){return new(_||T)(i.Y36(l.gz),i.Y36(j.Q),i.Y36(I.A),i.Y36(y.w))},T.\u0275cmp=i.Xpm({type:T,selectors:[["app-deactivated"]],decls:5,vars:4,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[1,"modal__content"],[3,"objeto","service"]],template:function(_,f){1&_&&(i.TgZ(0,"div",0)(1,"div",1),i.NdJ("click",function(){return f.voltar()}),i.qZA(),i.TgZ(2,"div",2)(3,"div",3),i._UZ(4,"app-shared-deactivated",4),i.qZA()()()),2&_&&(i.ekj("active",f.modalOpen),i.xp6(4),i.Q6J("objeto",f.objeto)("service",f.setupService))},dependencies:[S.T]}),T})()},4115:(W,Z,a)=>{a.d(Z,{T:()=>D});var R=a(801),t=a(9808),v=a(6025),A=a(8913),I=a(9205),y=a(9243),i=a(4650),l=a(202),j=a(7549),S=a(6895);function U(_,f){1&_&&(i.TgZ(0,"p")(1,"small"),i._uU(2,"Obs.: Se esse setup estiver relacionado a um planner, ele ser\xe1 apenas desativado, possibilitando futuras consultas. Se n\xe3o, esse setup ser\xe1 definitivamente removido."),i.qZA()())}function T(_,f){1&_&&i._UZ(0,"span",11)}let D=(()=>{class _{constructor(m,d,p,h,O){this.activatedRoute=m,this.modal=d,this.empresaService=p,this.setupService=h,this.crypto=O,this.faTimes=R.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.url="",this.objeto=new v.Wj,this.subscription=[],this.routerBack=["../../"],this.routeBackOptions={relativeTo:this.activatedRoute};var C=this.modal.getOpen().subscribe(M=>this.modalOpen=M);this.subscription.push(C),this.url=this.activatedRoute.snapshot.pathFromRoot.map(M=>M.routeConfig?.path).join("/");var b=m.params.subscribe(M=>{M.setup_id?this.objeto.id=this.crypto.decrypt(M.setup_id):this.voltar()});this.subscription.push(b),(this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo)&&(this.objeto=this.empresaService.object.carteiraSetup.find(M=>M.id==this.objeto.id)),setTimeout(()=>{this.modal.setOpen(!0)},200)}ngOnDestroy(){this.subscription.forEach(m=>m.unsubscribe())}voltar(){this.modal.voltar(this.routerBack,this.routeBackOptions)}send(){this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?(this.setupService.delete_To_Empresa_List(this.objeto.id)&&this.voltar(),this.loading=!1):(0,t.n)(this.setupService.delete(this.objeto.id)).then(m=>{(0,t.n)(this.setupService.getList()),this.voltar(),this.setupService.setObject(new v.Wj)}).catch().finally(()=>this.loading=!1)}}return _.\u0275fac=function(m){return new(m||_)(i.Y36(l.gz),i.Y36(j.Q),i.Y36(A.P),i.Y36(I.A),i.Y36(y.w))},_.\u0275cmp=i.Xpm({type:_,selectors:[["app-delete"]],decls:17,vars:4,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],[4,"ngIf"],[1,"btn","btn-grey","ml-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(m,d){1&m&&(i.TgZ(0,"div",0)(1,"div",1),i.NdJ("click",function(){return d.voltar()}),i.qZA(),i.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),i._uU(6,"Excluir setup"),i.qZA(),i.TgZ(7,"a",6),i.NdJ("click",function(){return d.voltar()}),i._UZ(8,"span")(9,"span"),i.qZA()(),i.TgZ(10,"div",7)(11,"p"),i._uU(12,"Tem certeza que deseja excluir esse setup? Essa opera\xe7\xe3o n\xe3o poder\xe1 ser desfeita!!"),i.qZA(),i.YNc(13,U,3,0,"p",8),i.TgZ(14,"button",9),i.NdJ("click",function(){return d.send()}),i.YNc(15,T,1,0,"span",10),i._uU(16," Excluir "),i.qZA()()()()()),2&m&&(i.ekj("active",d.modalOpen),i.xp6(13),i.Q6J("ngIf",!d.objeto.registroNaoSalvo),i.xp6(2),i.Q6J("ngIf",d.loading))},dependencies:[S.O5]}),_})()},5623:(W,Z,a)=>{a.d(Z,{F:()=>_});var R=a(801),t=a(9808),v=a(6025),A=a(8913),I=a(9205),y=a(9243),i=a(878),l=a(4650),j=a(202),S=a(7185),U=a(7549),T=a(3389),D=a(3868);let _=(()=>{class f{constructor(d,p,h,O,C,b){this.activatedRoute=d,this.toastr=p,this.modal=h,this.crypto=O,this.setupService=C,this.empresaService=b,this.faTimes=R.NBC,this.faChevronLeft=R.A35,this.objeto=new v.Wj,this.erro=[],this.loading=!1,this.loadingProduto=!1,this.url="",this.subscription=[],this.routerBack=["../../"],this.routeBackOptions={relativeTo:this.activatedRoute},this.url=this.activatedRoute.snapshot.pathFromRoot.map(E=>E.routeConfig?.path).join("/");var M=d.params.subscribe(E=>{E.setup_id?this.objeto.id=this.crypto.decrypt(E.setup_id):this.voltar()});this.subscription.push(M),this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?this.objeto=this.empresaService.object.carteiraSetup.find(E=>E.id==this.objeto.id):(0,t.n)(this.setupService.get(this.objeto.id)).then(E=>{this.objeto=E}).catch(E=>{this.voltar()}).finally(()=>this.loading=!1)}ngOnDestroy(){this.subscription.forEach(d=>d.unsubscribe())}voltar(){this.modal.voltar(this.routerBack,this.routeBackOptions)}resetForm(){this.objeto=new v.Wj,this.setupService.setObject(new v.Wj)}send(d){this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?(this.setupService.edit_To_Empresa_List(this.objeto)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(this.url.includes("empresas/editar"),(0,t.n)(this.setupService.edit(this.objeto)).then(p=>{(0,t.n)(this.setupService.getList()),this.modal.voltar(this.routerBack,this.routeBackOptions)}).catch(p=>{this.erro.push((0,i.b)(p))}).finally(()=>this.loading=!1))}}return f.\u0275fac=function(d){return new(d||f)(l.Y36(j.gz),l.Y36(S._W),l.Y36(U.Q),l.Y36(y.w),l.Y36(I.A),l.Y36(A.P))},f.\u0275cmp=l.Xpm({type:f,selectors:[["app-edit"]],decls:13,vars:4,consts:[[1,"modal__content"],[1,"modal__header","pb-2",2,"padding","0 25px"],[1,"link","text-dark",3,"click"],[1,"mr-1",3,"icon"],[1,"text-orange","mt-2"],[1,"btn","btn-yellow",3,"click"],[1,"modal__body","mt-0"],[3,"objeto","loading","erro","sendData"]],template:function(d,p){1&d&&(l.TgZ(0,"div",0)(1,"div",1)(2,"div")(3,"a",2),l.NdJ("click",function(){return p.voltar()}),l._UZ(4,"fa-icon",3),l._uU(5," Voltar "),l.qZA(),l.TgZ(6,"h3",4),l._uU(7,"Editar carteira setup"),l.qZA()(),l.TgZ(8,"button",5),l.NdJ("click",function(){return p.resetForm()}),l._uU(9,"Limpar campos"),l.qZA()(),l.TgZ(10,"div",6)(11,"app-form-carteira-setup",7),l.NdJ("sendData",function(O){return p.send(O)}),l.qZA()()(),l._UZ(12,"router-outlet")),2&d&&(l.xp6(4),l.Q6J("icon",p.faChevronLeft),l.xp6(7),l.Q6J("objeto",p.objeto)("loading",p.loading)("erro",p.erro))},dependencies:[j.lC,T.U,D.BN]}),f})()},3389:(W,Z,a)=>{a.d(Z,{U:()=>ht});var R=a(5861),t=a(4650),v=a(801),A=a(6025),I=a(8913),y=a(9205),i=a(8259),l=a(1956),S=[{field:"id",header:"Id",filterType:l.vA.text,filterDisplay:l.w2.menu,maskType:l.O.undefined},{field:"tipoRisco.nome",header:"Tipo de Risco",filterType:l.vA.text,filterDisplay:l.w2.menu,maskType:l.O.undefined},{field:"percentual",header:"Percentual",filterType:l.vA.numeric,filterDisplay:l.w2.menu,maskType:l.O.percentage,decimal:"1.2"}],U=a(316),T=a(9535),D=a(9885),_=a(9808),f=a(4551),m=a(7185),d=a(202),p=a(6895),h=a(433),O=a(3868),C=a(805),b=a(1094),M=a(279),E=a(2210),N=a(9364),J=a(7897);const K=["chartProdutos"],Y=["_percentual"];function k(n,u){1&n&&(t.TgZ(0,"p",40),t._uU(1,"Esse campo \xe9 obrigat\xf3rio"),t.qZA())}function Q(n,u){1&n&&(t.TgZ(0,"span"),t._uU(1,"Remova os espa\xe7os antes e depois do texto."),t.qZA())}function G(n,u){if(1&n&&(t.TgZ(0,"p",10),t.YNc(1,Q,2,0,"span",13),t.qZA()),2&n){t.oxw(2);const e=t.MAs(14);t.xp6(1),t.Q6J("ngIf","^\\S(.*\\S)?$"==e.errors.pattern.requiredPattern)}}function V(n,u){if(1&n&&(t.TgZ(0,"div"),t.YNc(1,k,2,0,"p",39),t.YNc(2,G,2,1,"p",25),t.qZA()),2&n){t.oxw();const e=t.MAs(14);t.xp6(1),t.Q6J("ngIf",e.errors.required),t.xp6(1),t.Q6J("ngIf",e.errors.pattern)}}function q(n,u){if(1&n){const e=t.EpF();t.TgZ(0,"div",41)(1,"input",42,43),t.NdJ("ngModelChange",function(s){t.CHM(e);const c=t.oxw();return t.KtG(c.selectedRisco=s)})("ngModelChange",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.calculaPercentualMaxRisco())})("change",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.setProdutosByRisco())}),t.qZA(),t.TgZ(3,"label",44),t._uU(4),t.qZA()()}if(2&n){const e=u.$implicit,o=t.oxw();t.xp6(1),t.MGl("id","tipoRisco-",e.nome,""),t.Q6J("ngModel",o.selectedRisco)("value",e)("checked",e.id==o.selectedRisco.id),t.xp6(2),t.MGl("for","tipoRisco-",e.nome,""),t.xp6(1),t.Oqu(e.nome)}}function z(n,u){if(1&n&&(t.TgZ(0,"span",48),t._uU(1," Inativo "),t.qZA()),2&n){t.oxw();const e=t.MAs(5);t.Q6J("ngbPopover",e)}}function H(n,u){if(1&n&&(t.TgZ(0,"div",49),t._uU(1),t.ALo(2,"date"),t.qZA()),2&n){const e=t.oxw().$implicit;t.xp6(1),t.hij("Desativado em ",t.Dn7(2,1,e.dataDesativado,"dd/MM/yyyy","UTC")," ")}}function $(n,u){if(1&n&&(t.TgZ(0,"div",45)(1,"span"),t._uU(2),t.qZA(),t.YNc(3,z,2,1,"span",46),t.YNc(4,H,3,5,"ng-template",null,47,t.W1O),t.qZA()),2&n){const e=u.$implicit;t.xp6(2),t.Oqu(e.descricao),t.xp6(1),t.Q6J("ngIf",e.dataDesativado)}}function X(n,u){1&n&&(t.TgZ(0,"p",10),t._uU(1,"Selecione um risco para continuar."),t.qZA())}function tt(n,u){if(1&n&&(t.TgZ(0,"p",10),t._uU(1),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.hij("Nenhum produto dispon\xedvel em ",e.selectedRisco.nome,".")}}function et(n,u){1&n&&(t.TgZ(0,"p",10),t._uU(1,"Informe o percentual"),t.qZA())}function ot(n,u){if(1&n&&(t.TgZ(0,"p",10),t._uU(1),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.hij("Valor m\xe1ximo dispon\xedvel \xe9 ",e.selectedRisco.percentualDisponivel,"%")}}function it(n,u){if(1&n&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&n){const e=t.oxw().$implicit;t.xp6(1),t.Oqu(e.produto.tipoRisco.nome)}}function rt(n,u){1&n&&(t.TgZ(0,"span"),t._uU(1,"-"),t.qZA())}function at(n,u){if(1&n){const e=t.EpF();t.TgZ(0,"div"),t._UZ(1,"input",60,61),t.TgZ(3,"input",62,63),t.NdJ("ngModelChange",function(s){t.CHM(e);const c=t.oxw().$implicit;return t.KtG(c.percentual=s)})("change",function(){t.CHM(e);const s=t.MAs(4),c=t.oxw().$implicit,r=t.oxw(2);return t.KtG(r.change(s,c))}),t.qZA()()}if(2&n){const e=t.MAs(2),o=t.oxw(),s=o.$implicit,c=o.index,r=t.oxw(2);let g;t.xp6(1),t.hYB("id","max-",s.produto.tipoRisco.nome,"-",c,"")("name","max-",s.produto.tipoRisco.nome,"-",c,""),t.Q6J("ngModel",null==(g=r.getRisco(s.produto.tipoRisco_Id))?null:g.percentualDisponivel),t.xp6(2),t.hYB("id","percentual-",s.produto.tipoRisco.nome,"-",c,"")("name","percentual-",s.produto.tipoRisco.nome,"-",c,""),t.Q6J("min",1)("placeholder",e.value+"% dispon\xedvel")("ngModel",s.percentual)}}function nt(n,u){1&n&&(t.TgZ(0,"span"),t._uU(1,"-"),t.qZA())}function st(n,u){if(1&n){const e=t.EpF();t.TgZ(0,"button",64),t.NdJ("click",function(){t.CHM(e);const s=t.oxw().$implicit,c=t.oxw(2);return t.KtG(c.removeProduto(s))}),t._UZ(1,"fa-icon",65),t.TgZ(2,"span",66),t._uU(3,"Excluir"),t.qZA()()}if(2&n){const e=t.oxw(3);t.xp6(1),t.Q6J("icon",e.faTrashAlt)}}function ct(n,u){if(1&n&&(t.TgZ(0,"tr"),t._UZ(1,"td"),t.TgZ(2,"td"),t._uU(3),t.qZA(),t.TgZ(4,"td"),t.YNc(5,it,2,1,"span",13),t.YNc(6,rt,2,0,"span",13),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td",57),t.YNc(10,at,5,12,"div",13),t.YNc(11,nt,2,0,"span",13),t.qZA(),t.TgZ(12,"td",58),t.YNc(13,st,4,1,"button",59),t.qZA()()),2&n){const e=u.$implicit,o=t.oxw(2);t.Gre("tiporisco-",e.produto.tipoRisco_Id,""),t.ekj("selected",e.produto.tipoRisco_Id==o.selectedRisco.id),t.xp6(3),t.Oqu(e.id),t.xp6(2),t.Q6J("ngIf",e.produto.tipoRisco),t.xp6(1),t.Q6J("ngIf",!e.produto.tipoRisco),t.xp6(2),t.Oqu(e.produto.descricao),t.xp6(2),t.Q6J("ngIf",61!=e.produto.id),t.xp6(1),t.Q6J("ngIf",61==e.produto.id),t.xp6(2),t.Q6J("ngIf",61!=e.produto.id)}}function lt(n,u){if(1&n&&(t.TgZ(0,"div",6)(1,"div",50)(2,"p",51),t._uU(3,"Itens selecionados"),t.qZA(),t.TgZ(4,"div",52)(5,"table",53)(6,"thead")(7,"tr"),t._UZ(8,"th",54),t.TgZ(9,"th",54),t._uU(10,"Id"),t.qZA(),t.TgZ(11,"th",54),t._uU(12,"Risco"),t.qZA(),t.TgZ(13,"th",54),t._uU(14,"Produto"),t.qZA(),t.TgZ(15,"th",54),t._uU(16,"Percentual"),t.qZA(),t._UZ(17,"th",55),t.qZA()(),t.TgZ(18,"tbody"),t.YNc(19,ct,14,12,"tr",56),t.qZA()()()()()),2&n){const e=t.oxw();t.xp6(19),t.Q6J("ngForOf",e.objeto.carteiraProdutoRel)}}function dt(n,u){if(1&n&&(t.TgZ(0,"p",70),t._uU(1),t.ALo(2,"json"),t.qZA()),2&n){const e=u.$implicit;t.xp6(1),t.Oqu(t.lcZ(2,1,e))}}function pt(n,u){1&n&&(t.TgZ(0,"p",70),t._uU(1,"Preencha todos os campos obrigat\xf3rios (*) corretamente para salvar"),t.qZA())}function ut(n,u){if(1&n&&(t.TgZ(0,"div",67),t.YNc(1,dt,3,3,"p",68),t.YNc(2,pt,2,0,"p",69),t.qZA()),2&n){const e=t.oxw(),o=t.MAs(1);t.xp6(1),t.Q6J("ngForOf",e.erro),t.xp6(1),t.Q6J("ngIf",o.invalid&&0==e.erro.length)}}function _t(n,u){1&n&&t._UZ(0,"span",71)}function mt(n,u){1&n&&(t.TgZ(0,"div",72),t._uU(1," Este campo \xe9 obrigat\xf3rio "),t.qZA())}let ht=(()=>{class n{constructor(e,o,s,c,r,g){var x=this;this.toastr=e,this.empresaService=o,this.produtoService=s,this.activatedRoute=c,this.setupService=r,this.dropdown=g,this.objeto=new A.Wj,this.loading=!1,this.erro=[],this.sendData=new t.vpe,this.clearData=!1,this.faPlus=v.r8p,this.faTrashAlt=v.I7k,this.faChartSimple=v.Wpq,this.faTable=v.B3e,this.faEdit=v.Xcf,this.isEditPage=!1,this.loadingCarteiras=!0,this.loadingTributacao=!1,this.carteiraRiscoColumns=S,this.allProdutos=[],this.produtosRisco=[],this.percentual="",this.tipoRiscos=[],this.selectedRisco=new U.p,this.url="",this.cmp=(P,F)=>(P>F)-(P<F),this.chartWidth="100%",this.chartHeight="70px",this.subscription=[],this.hasViewInit=!1;var B=this.activatedRoute.params.subscribe(P=>this.isEditPage=!!P.setup_id);this.subscription.push(B),(0,_.n)(this.dropdown.getRisco()).then(P=>{this.selectedRisco=P[0]}).finally(()=>this.loading=!1);var L=this.dropdown.tipoRisco.subscribe(P=>this.tipoRiscos=P);if(this.subscription.push(L),this.url=this.activatedRoute.snapshot.pathFromRoot.map(P=>P.routeConfig?.path).join("/"),this.url.includes("empresas/cadastrar")){var w=this.empresaService.empresa.subscribe(P=>{this.allProdutos=P.produto});this.subscription.push(w)}else(0,_.n)(this.produtoService.getList()).then(function(){var P=(0,R.Z)(function*(F){x.allProdutos=F,0==x.tipoRiscos.length&&(x.selectedRisco={id:1,nome:"Baixissimo",percentualDisponivel:100}),x.setProdutosByRisco()});return function(F){return P.apply(this,arguments)}}())}ngOnDestroy(){this.subscription.forEach(e=>e.unsubscribe())}ngOnChanges(e){e.objeto&&(this.objeto=e.objeto.currentValue,this.hasViewInit&&(this.setChartProduto(),this.validatePercentualRisco())),e.loading&&(this.loading=e.loading.currentValue),e.erro&&(this.erro=e.erro.currentValue),e.clearData&&(this.clearData=e.clearData.currentValue,this.clearData&&(delete this.produto,this.percentual=""))}ngAfterViewInit(){this.hasViewInit=!0;var e=window.innerWidth,o=i(".chart-container").width()??0;this.chartWidth=(100/e*o).toString()+"vw",this.setChartProduto(),this.validatePercentualRisco()}parseFloat(e){return parseFloat(e)}onResize(e){var o=window.innerWidth,s=i(".chart-container").width()??0;this.chartWidth=(100/o*s).toString()+"vw"}send(e){if(e.invalid)return this.toastr.error("Campos inv\xe1lidos"),void(this.erro=["Campos inv\xe1lidos"]);this.erro=[],this.sendData.emit(e)}setProdutosByRisco(){console.log("setProdutosByRisco");let e=this.objeto.carteiraProdutoRel.map(o=>o.produto_Id);this.produtosRisco=this.allProdutos.filter(o=>o.tipoRisco_Id==this.selectedRisco.id&&null==o.dataDesativado&&!e.includes(o.id)),this.produtosRisco=this.produtosRisco.sort((o,s)=>o.descricao<s.descricao?-1:o.descricao>s.descricao?1:0),this.percentual="",this.calculaPercentualMaxRisco()}change(e,o){this.calculaPercentualMaxRisco(),this.validateInput(e,1,this.calculaPercentualMaxProduto(o.produto)),this.validatePercentualRisco(),this.setChartProduto();var s=this.objeto.carteiraProdutoRel.filter(r=>r.produto.tipoRisco_Id==o.produto.tipoRisco_Id),c=s.map(r=>r.percentual).reduce((r,g)=>r+g);this.percentuais.forEach((r,g)=>{this.objeto.carteiraProdutoRel.map((B,L)=>s.map(w=>w.produto_Id).includes(B.produto_Id)?L:-1).filter(B=>-1!=B).includes(g+1)&&(c>100?r.control.setErrors({max:!0}):(delete r.control.errors?.max,r.control.updateValueAndValidity()))})}calculaPercentualMaxRisco(){this.tipoRiscos=this.tipoRiscos.map(e=>{let o=this.objeto.carteiraProdutoRel.filter(c=>c.produto.tipoRisco_Id==e.id);var s=o.length>0?o.map(c=>c.percentual).reduce((c,r)=>c+r):0;return e.percentualDisponivel=100-s,e.percentualDisponivel=e.percentualDisponivel<0?0:e.percentualDisponivel,e})}calculaPercentualMaxProduto(e){var o=this.objeto.carteiraProdutoRel.filter(r=>r.produto_Id!=e.id&&r.produto.tipoRisco_Id==e.tipoRisco_Id).map(r=>r.percentual),c=100-(o.length>0?o.reduce((r,g)=>r+g):0);return c<0?0:c}setChartProduto(){let e=0,o=this.objeto.carteiraProdutoRel.filter(c=>null!=c.produto.tipoRisco).map(c=>c.produto.tipoRisco);if(o=o.filter((c,r,g)=>r===g.findIndex(x=>x.id===c.id)),o.length>0){var s=70;o.forEach(r=>s=s+=30),this.chartHeight=s+"px",this.optionsChartProduto={onClick:r=>{},indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{backgroundColor:"rgba(0,0,0,0.95)",padding:{x:15,y:10},callbacks:{beforeTitle:r=>r[0].element.$context.raw.produto.tipoRisco?.nome,title:r=>""}}},scales:{xAxes:{stacked:!0,min:0,max:100,suggestedMax:100,scaleLabel:{display:!0},grid:{drawBorder:!1},ticks:{callback:function(r,g,x){return r+"%"}}},yAxes:{scaleLabel:{display:!0},stacked:!0,drawOnChartArea:o.length>0,drawBorder:o.length>0,display:o.length>0}},parsing:{yAxisKey:"produto.tipoRisco.nome",xAxisKey:"percentual"}},this.objeto.carteiraProdutoRel.sort((r,g)=>this.cmp(r.produto.tipoRisco_Id,g.produto.tipoRisco_Id)||this.cmp(r.produto.descricao,g.produto.descricao));let c=this.objeto.carteiraProdutoRel.map(r=>({type:"bar",axis:"y",label:`${r.produto.descricao}`,backgroundColor:f.O[e++],data:[r]}));this.dataProduto={datasets:c},setTimeout(()=>{this.chartProdutos.chart.update()},300)}}getRisco(e){return this.tipoRiscos.find(o=>o.id==e)}adicionarProduto(){if(this.produto){let s={id:0,percentual:this.percentual,carteiraSetup_Id:0,produto:this.produto,produto_Id:this.produto.id};var e=this.objeto.carteiraProdutoRel.findIndex(c=>c.produto_Id==this.produto?.id),o=this.objeto.carteiraProdutoRel.find(c=>c.produto_Id==this.produto?.id);o&&-1!=e?(s.id=o.id,this.objeto.carteiraProdutoRel.splice(e,1,s)):this.objeto.carteiraProdutoRel.push(s),this.objeto.carteiraProdutoRel.sort((c,r)=>this.cmp(c.produto.tipoRisco_Id,r.produto.tipoRisco_Id)||this.cmp(c.produto.descricao,r.produto.descricao)),this.setupService.setObject(this.objeto),delete this.produto,this.setProdutosByRisco(),this.calculaPercentualMaxRisco(),this.setChartProduto(),this.validatePercentualRisco()}else this.toastr.error("Selecione um produto para adicionar")}removeProduto(e){let o=this.objeto.carteiraProdutoRel.findIndex(s=>s.id==e.id&&s.produto_Id==e.produto.id);-1!=o&&(this.objeto.carteiraProdutoRel.splice(o,1),this.setupService.setObject(this.objeto),this.setChartProduto(),this.setProdutosByRisco(),this.validatePercentualRisco())}validatePercentualRisco(){if(console.log("validatePercentualRisco"),0==this.objeto.carteiraProdutoRel.length)return this.erro.push("Voc\xea deve selecionar pelo menos um produto"),!1;let e=!1,o=[],s=this.objeto.carteiraProdutoRel.filter(r=>null!=r.produto.tipoRisco);for(let r of s){let g=o.findIndex(x=>x.tipoRisco_Id==r.produto.tipoRisco_Id);-1!=g?o[g].percentual+=r.percentual:o.push({id:0,carteiraSetup_Id:r.carteiraSetup_Id,tipoRisco:r.produto.tipoRisco,tipoRisco_Id:r.produto.tipoRisco_Id,percentual:r.percentual,showMenuOption:!0,canSelect:!0})}var c=this.objeto.carteiraProdutoRel.filter(r=>1==r.produto.tipoRisco_Id);return console.log("condicao 1",o.filter(r=>1!=r.tipoRisco_Id&&100!=r.percentual)),console.log("condicao 2",o.filter(r=>1==r.tipoRisco_Id&&c.length>1&&100!=r.percentual)),console.log("condicao 3",o.filter(r=>1!=r.tipoRisco_Id&&100!=r.percentual||1==r.tipoRisco_Id&&c.length>1&&100!=r.percentual)),this.erro=o.filter(r=>1!=r.tipoRisco_Id&&100!=r.percentual||1==r.tipoRisco_Id&&c.length>1&&100!=r.percentual).map(r=>`A soma do percentual dos produtos para o risco ${r.tipoRisco.nome} deve ser 100%.`),this.erro.length>0&&(e=!0),e}validateInput(e,o,s){return e.value>100||e.value>s?(e.control.setErrors({max:!0}),e):(e.value<o&&e.control.setErrors({min:!0}),e)}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(m._W),t.Y36(I.P),t.Y36(D.m),t.Y36(d.gz),t.Y36(y.A),t.Y36(T.V))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-form-carteira-setup"]],viewQuery:function(e,o){if(1&e&&(t.Gf(K,5),t.Gf(Y,5)),2&e){let s;t.iGM(s=t.CRH())&&(o.chartProdutos=s.first),t.iGM(s=t.CRH())&&(o.percentuais=s)}},hostBindings:function(e,o){1&e&&t.NdJ("resize",function(c){return o.onResize(c)},!1,t.Jf7)},inputs:{objeto:"objeto",loading:"loading",erro:"erro",clearData:"clearData"},outputs:{sendData:"sendData"},features:[t.TTD],decls:64,vars:29,consts:[[1,"needs-validation",3,"ngSubmit"],["form","ngForm"],[1,"row","d-flex","flex-wrap","align-items-stretch","mb-2"],[1,"col-lg-4","col-md-4","col-sm-4","col-12"],[1,"col-12","d-flex","flex-wrap","mt-2"],[1,"col-xl-4","col-lg-5","col-md-5","col-sm-12","col-12","ps-0","pe-sm-2","pe-0"],[1,"card","card-body","mb-2"],[1,"form-row"],[1,"form-group","col-sm-12"],["for","carteiraSetup",1,"h6"],[1,"text-danger"],["type","text","name","nome","id","nome","placeholder","Digite para cadastrar nova carteira","pattern","\\S(.*\\S)?",1,"form-control","my-1",3,"ngModel","required","ngModelChange","change"],["nome","ngModel"],[4,"ngIf"],[1,"form-row","mt-2","mb-2"],[1,"d-flex","align-items-start","justify-content-start","flex-wrap","col-12"],[1,"h6","me-3","w-100"],["class","mx-2",4,"ngFor","ngForOf"],[1,"form-row","justify-content-center","flex-column"],[1,"form-group","col-lg-12","col-md-12","col-sm-12","col-12"],["for","produto"],["id","produto","name","produto","optionLabel","descricao","optionDisabled","dataDesativado","filterBy","descricao, tipoRisco.nome","placeholder","Selecione para adicionar",1,"form-control","novalidate",3,"options","ngModel","filter","showClear","ngModelChange"],["_produto","ngModel"],["pTemplate","item"],[1,"mt-1","px-1"],["class","text-danger",4,"ngIf"],["for","percentual"],["suffix","%","placeholder","Entre 20 e 100 anos",3,"valueInput","inputId","mask","min","max","required","showErrorMessage","placeholder","allowNegativeNumbers","valueChanges"],[1,"form-group","align-items-end","px-1"],["type","button",1,"btn","btn-grey","w-100",3,"disabled","click"],[1,"col-xl-8","col-lg-7","col-md-7","col-sm-12","col-12","px-0"],["type","verticalBar",3,"options","data","height"],["chartProdutos",""],["class","card card-body mb-2",4,"ngIf"],[1,"d-flex","align-items-start","p-0","mt-3"],["class","m-0",4,"ngIf"],[1,"btn","btn-primary","mr-0","ml-auto",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],["campoObrigatorio",""],["class","text-danger error",4,"ngIf"],[1,"text-danger","error"],[1,"mx-2"],["type","radio","name","tipoRisco",1,"mr-1","mt-1",3,"id","ngModel","value","checked","ngModelChange","change"],["tipoRisco","ngModel"],[3,"for"],[1,"d-flex","align-items-center","justify-content-between"],["class","flag flag-red",3,"ngbPopover",4,"ngIf"],["ativo",""],[1,"flag","flag-red",3,"ngbPopover"],[1,"py-2","px-3"],[1,"col-12","px-2"],[1,"h6"],[1,"overflow-x-auto","w-100"],[1,"table","table-striped","table-borderless","table-editable"],[1,"bg-dark","text-white","font-weight-normal"],[1,"bg-dark","text-white","font-weight-normal",2,"width","80px"],[3,"selected","class",4,"ngFor","ngForOf"],[2,"width","110px","height","43px"],[1,"td-action"],["type","button","class","btn-trash ml-auto d-block px-2 text-dark",3,"click",4,"ngIf"],["type","number","hidden","",3,"id","name","ngModel"],["max",""],["type","text","mask","separator","thousandSeparator",".","decimalMarker",",","suffix","%","required","",1,"form-control",3,"id","name","min","placeholder","ngModel","ngModelChange","change"],["_percentual","ngModel"],["type","button",1,"btn-trash","ml-auto","d-block","px-2","text-dark",3,"click"],[1,"d-md-none","d-block",3,"icon"],[1,"d-md-block","d-none","btn","btn-dark"],[1,"m-0"],["class","text-red",4,"ngFor","ngForOf"],["class","text-red",4,"ngIf"],[1,"text-red"],[1,"spinner-border","spinner-border-sm","mr-1"],[1,"py-3","px-4"]],template:function(e,o){if(1&e){const s=t.EpF();t.TgZ(0,"form",0,1),t.NdJ("ngSubmit",function(){t.CHM(s);const r=t.MAs(1);return t.KtG(o.send(r))}),t.TgZ(2,"div",2),t._UZ(3,"div",3),t.TgZ(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"label",9),t._uU(10,"Nome: "),t.TgZ(11,"span",10),t._uU(12,"*"),t.qZA()(),t.TgZ(13,"input",11,12),t.NdJ("ngModelChange",function(r){return o.objeto.nome=r})("change",function(){t.CHM(s);const r=t.MAs(14);return t.KtG(o.objeto.nome=r.value.trim())}),t.qZA(),t.YNc(15,V,3,2,"div",13),t.qZA()()(),t.TgZ(16,"div",6)(17,"div",14)(18,"div",15)(19,"p",16),t._uU(20,"Selecione o Risco"),t.qZA(),t.YNc(21,q,5,6,"div",17),t.qZA()(),t.TgZ(22,"div",18)(23,"div",19)(24,"label",20),t._uU(25,"Produto: "),t.TgZ(26,"span",10),t._uU(27,"*"),t.qZA()(),t.TgZ(28,"p-dropdown",21,22),t.NdJ("ngModelChange",function(r){return o.produto=r}),t.YNc(30,$,6,2,"ng-template",23),t.qZA(),t.TgZ(31,"div",24),t.YNc(32,X,2,0,"p",25),t.YNc(33,tt,2,1,"p",25),t.qZA()(),t.TgZ(34,"div",19)(35,"label",26),t._uU(36,"Percentual: "),t.TgZ(37,"span",10),t._uU(38,"*"),t.qZA()(),t.TgZ(39,"app-input-number",27),t.NdJ("valueChanges",function(r){return o.percentual=r}),t.qZA(),t.TgZ(40,"div",24),t.YNc(41,et,2,0,"p",25),t.YNc(42,ot,2,1,"p",25),t.qZA()(),t.TgZ(43,"div",28)(44,"button",29),t.NdJ("click",function(){return o.adicionarProduto()}),t._uU(45," Adicionar "),t.qZA()()()()(),t.TgZ(46,"div",30)(47,"div",6)(48,"div")(49,"h6"),t._uU(50,"Divis\xe3o da carteira: "),t.TgZ(51,"span",10),t._uU(52,"*"),t.qZA()()(),t.TgZ(53,"div"),t._UZ(54,"p-chart",31,32),t.qZA()(),t.YNc(56,lt,20,1,"div",33),t.qZA()()(),t.TgZ(57,"div",34),t.YNc(58,ut,3,2,"div",35),t.TgZ(59,"button",36),t.YNc(60,_t,1,0,"span",37),t._uU(61," Salvar "),t.qZA()()(),t.YNc(62,mt,2,0,"ng-template",null,38,t.W1O)}if(2&e){const s=t.MAs(1),c=t.MAs(14);t.xp6(13),t.Q6J("ngModel",o.objeto.nome)("required",!0),t.xp6(2),t.Q6J("ngIf",c.touched&&c.errors),t.xp6(6),t.Q6J("ngForOf",o.tipoRiscos),t.xp6(7),t.Q6J("options",o.produtosRisco)("ngModel",o.produto)("filter",!0)("showClear",!0),t.xp6(4),t.Q6J("ngIf",null==o.selectedRisco),t.xp6(1),t.Q6J("ngIf",null!=o.selectedRisco&&0==o.produtosRisco.length),t.xp6(6),t.Q6J("valueInput",o.percentual)("inputId","percentual")("mask","separator")("min",0)("max",o.selectedRisco.percentualDisponivel)("required",!1)("showErrorMessage",!1)("placeholder",o.produtosRisco.length>0?o.selectedRisco.percentualDisponivel+"% dispon\xedvel":"")("allowNegativeNumbers",!1),t.xp6(2),t.Q6J("ngIf",!o.percentual),t.xp6(1),t.Q6J("ngIf",o.percentual>o.selectedRisco.percentualDisponivel),t.xp6(2),t.Q6J("disabled",null==o.produto||""==o.percentual.toString()||o.percentual>o.selectedRisco.percentualDisponivel),t.xp6(10),t.Q6J("options",o.optionsChartProduto)("data",o.dataProduto)("height",o.chartHeight),t.xp6(2),t.Q6J("ngIf",o.objeto.carteiraProdutoRel.length>0),t.xp6(2),t.Q6J("ngIf",o.erro||s.invalid),t.xp6(1),t.Q6J("disabled",s.invalid||o.loading||o.validatePercentualRisco()),t.xp6(1),t.Q6J("ngIf",o.loading)}},dependencies:[p.sg,p.O5,h._Y,h.Fj,h.wV,h._,h.JJ,h.JL,h.Q7,h.c5,h.On,h.F,O.BN,C.jx,b.hx,M.o8,E.Lt,N.C,J.l,p.Ts,p.uU],styles:['.cdk-drop-list[_ngcontent-%COMP%]{position:relative;min-height:300px}.cdk-drop-list.cdkDrag[_ngcontent-%COMP%]:after{content:"";position:absolute;top:50%;left:50%;width:calc(100% - 10px);height:calc(100% - 10px);transform:translate(-50%,-50%);color:#00000073;font-size:18px;display:flex;align-items:center;justify-content:center;z-index:0}.cdk-drop-list.cdkDrag.empty[_ngcontent-%COMP%]:after{content:"Solte aqui para selecionar";border:1px #0000007a dashed}.cdk-drop-list.cdkDrag.empty[_ngcontent-%COMP%]:hover:after{border:1px #00000096 dashed;color:#00000096}.cdk-drag[_ngcontent-%COMP%]{position:relative;z-index:1;margin:0}.fade-in-right[_ngcontent-%COMP%]{animation:fade-in-right .5s forwards}.fade-out-left[_ngcontent-%COMP%]{animation:fade-out-left .5s forwards}.form-group[_ngcontent-%COMP%]{transition:.5s}@keyframes fade-in-right{0%{opacity:0;visibility:hidden;display:none;transform:translate(-100%)}20%{display:block}to{opacity:1;visibility:visible;transform:translate(0)}}@keyframes fade-out-left{0%{opacity:1;visibility:visible;transform:translate(0);display:block}20%{display:none}to{opacity:0;visibility:hidden;transform:translate(-100%)}}.data-view[_ngcontent-%COMP%]{background:linear-gradient(90deg,var(--grey-light) 50%,#ffffff 50%);border-radius:3px;background-size:200%;background-position:250%;display:flex;align-self:flex-start;position:relative;transition:.3s}.data-view[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{margin:0;padding:5px 10px;background-color:transparent;border-radius:3px}.data-view[_ngcontent-%COMP%]   .btn.active[_ngcontent-%COMP%], .data-view[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:first-child{color:#fff}.data-view[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child{border-radius:0 3px 3px 0;border-color:#595c5f;border-left:none}.data-view.right[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child{color:#fff}.data-view.right[_ngcontent-%COMP%]{transition:.3s;background-position:153%}.data-view.right[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:first-child{border:1px #8f8f8f solid;border-right:none;border-radius:3px 0 0 3px}.data-view.right[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:first-child{color:#212529;transition:.3s color}.mat-option[_ngcontent-%COMP%]{height:auto!important;padding:9px 11px!important;line-height:1!important}.mat-option-text[_ngcontent-%COMP%]{font-size:14px!important}.td-action[_ngcontent-%COMP%]{position:sticky;right:0}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-of-type(odd)   .td-action[_ngcontent-%COMP%]{background-color:#f3f3f3}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-of-type(even)   .td-action[_ngcontent-%COMP%]{background-color:#fff}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected[_ngcontent-%COMP%]:nth-of-type(even)   .td-action[_ngcontent-%COMP%]{background-color:#b9c8f3}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected[_ngcontent-%COMP%]:nth-of-type(odd)   .td-action[_ngcontent-%COMP%]{background-color:#bcc9f1}']}),n})()}}]);