"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[875],{4458:(W,R,r)=>{r.d(R,{G:()=>D});var M=r(801),t=r(9808),v=r(6025),Z=r(9205),A=r(9243),y=r(878),o=r(4650),s=r(202),I=r(7549),U=r(7185),j=r(3389),T=r(3868);let D=(()=>{class c{constructor(u,l,p,g,E){if(this.activatedRoute=u,this.modal=l,this.setupService=p,this.toastr=g,this.crypto=E,this.faTimes=M.NBC,this.faWallet=M.X5K,this.faChevronLeft=M.A35,this.modalOpen=!1,this.objeto=new v.Wj,this.erro=[],this.loading=!1,this.url="",this.subscription=[],this.clearData=!1,this.url=this.activatedRoute.snapshot.pathFromRoot.map(P=>P.routeConfig?.path).join("/"),this.url.includes("empresas/editar")){var b=u.parent?.parent?.params.subscribe(P=>{P.empresa_id?this.objeto.empresa_Id=this.crypto.decrypt(P.empresa_id):this.voltar()});b&&this.subscription.push(b)}}voltar(){this.modal.voltar()}ngOnDestroy(){this.subscription.forEach(u=>u.unsubscribe())}resetForm(){this.objeto=new v.Wj,this.setupService.setObject(new v.Wj),this.clearData=!0}send(u){this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")?(this.setupService.add_To_Empresa_List(this.objeto)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(this.url.includes("empresas/editar"),(0,t.n)(this.setupService.create(this.objeto)).then(l=>{this.modal.voltar(),(0,t.n)(this.setupService.getList())}).catch(l=>{this.erro.push((0,y.b)(l))}).finally(()=>this.loading=!1))}}return c.\u0275fac=function(u){return new(u||c)(o.Y36(s.gz),o.Y36(I.Q),o.Y36(Z.A),o.Y36(U._W),o.Y36(A.w))},c.\u0275cmp=o.Xpm({type:c,selectors:[["app-create"]],decls:13,vars:5,consts:[[1,"modal__content"],[1,"modal__header","pb-2",2,"padding","0 25px"],[1,"link","text-dark",3,"click"],[1,"mr-1",3,"icon"],[1,"text-orange","mt-2"],[1,"btn","btn-yellow",3,"click"],[1,"modal__body","mt-0"],[3,"objeto","loading","erro","clearData","sendData"]],template:function(u,l){1&u&&(o.TgZ(0,"div",0)(1,"div",1)(2,"div")(3,"a",2),o.NdJ("click",function(){return l.voltar()}),o._UZ(4,"fa-icon",3),o._uU(5," Voltar "),o.qZA(),o.TgZ(6,"h3",4),o._uU(7,"Adicionar carteira setup"),o.qZA()(),o.TgZ(8,"button",5),o.NdJ("click",function(){return l.resetForm()}),o._uU(9,"Limpar campos"),o.qZA()(),o.TgZ(10,"div",6)(11,"app-form-carteira-setup",7),o.NdJ("sendData",function(g){return l.send(g)}),o.qZA()()(),o._UZ(12,"router-outlet")),2&u&&(o.xp6(4),o.Q6J("icon",l.faChevronLeft),o.xp6(7),o.Q6J("objeto",l.objeto)("loading",l.loading)("erro",l.erro)("clearData",l.clearData))},dependencies:[s.lC,j.U,T.BN]}),c})()},8811:(W,R,r)=>{r.d(R,{T:()=>j});var M=r(5861),t=r(801),v=r(9808),Z=r(6025),A=r(9205),y=r(9243),o=r(4650),s=r(202),I=r(7549),U=r(7119);let j=(()=>{class T{constructor(c,h,u,l){var p=this;this.activatedRoute=c,this.modal=h,this.setupService=u,this.crypto=l,this.faTimes=t.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.url="",this.objeto=new Z.Wj,this.subscription=[];var g=this.modal.getOpen().subscribe(b=>this.modalOpen=b);this.subscription.push(g),this.url=this.activatedRoute.snapshot.pathFromRoot.map(b=>b.routeConfig?.path).join("/");var E=c.params.subscribe(function(){var b=(0,M.Z)(function*(P){P.setup_id?(p.objeto.id=p.crypto.decrypt(P.setup_id),p.objeto=yield(0,v.n)(p.setupService.get(p.objeto.id))):p.voltar()});return function(P){return b.apply(this,arguments)}}());this.subscription.push(E),setTimeout(()=>{this.modal.setOpen(!0)},200)}ngOnDestroy(){this.subscription.forEach(c=>c.unsubscribe())}voltar(){this.modal.voltar()}}return T.\u0275fac=function(c){return new(c||T)(o.Y36(s.gz),o.Y36(I.Q),o.Y36(A.A),o.Y36(y.w))},T.\u0275cmp=o.Xpm({type:T,selectors:[["app-deactivated"]],decls:5,vars:4,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[1,"modal__content"],[3,"objeto","service"]],template:function(c,h){1&c&&(o.TgZ(0,"div",0)(1,"div",1),o.NdJ("click",function(){return h.voltar()}),o.qZA(),o.TgZ(2,"div",2)(3,"div",3),o._UZ(4,"app-shared-deactivated",4),o.qZA()()()),2&c&&(o.ekj("active",h.modalOpen),o.xp6(4),o.Q6J("objeto",h.objeto)("service",h.setupService))},dependencies:[U.T]}),T})()},4115:(W,R,r)=>{r.d(R,{T:()=>D});var M=r(801),t=r(9808),v=r(6025),Z=r(8913),A=r(9205),y=r(9243),o=r(4650),s=r(202),I=r(7549),U=r(6895);function j(c,h){1&c&&(o.TgZ(0,"p")(1,"small"),o._uU(2,"Obs.: Se esse setup estiver relacionado a um planner, ele ser\xe1 apenas desativado, possibilitando futuras consultas. Se n\xe3o, esse setup ser\xe1 definitivamente removido."),o.qZA()())}function T(c,h){1&c&&o._UZ(0,"span",11)}let D=(()=>{class c{constructor(u,l,p,g,E){this.activatedRoute=u,this.modal=l,this.empresaService=p,this.setupService=g,this.crypto=E,this.faTimes=M.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.url="",this.objeto=new v.Wj,this.subscription=[];var b=this.modal.getOpen().subscribe(O=>this.modalOpen=O);this.subscription.push(b),this.url=this.activatedRoute.snapshot.pathFromRoot.map(O=>O.routeConfig?.path).join("/");var P=u.params.subscribe(O=>{O.setup_id?this.objeto.id=this.crypto.decrypt(O.setup_id):this.voltar()});this.subscription.push(P),(this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo)&&(this.objeto=this.empresaService.object.carteiraSetup.find(O=>O.id==this.objeto.id)),setTimeout(()=>{this.modal.setOpen(!0)},200)}ngOnDestroy(){this.subscription.forEach(u=>u.unsubscribe())}voltar(){this.modal.voltar()}send(){this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?(this.setupService.delete_To_Empresa_List(this.objeto.id)&&this.voltar(),this.loading=!1):(0,t.n)(this.setupService.delete(this.objeto.id)).then(u=>{(0,t.n)(this.setupService.getList()),this.voltar(),this.setupService.setObject(new v.Wj)}).catch().finally(()=>this.loading=!1)}}return c.\u0275fac=function(u){return new(u||c)(o.Y36(s.gz),o.Y36(I.Q),o.Y36(Z.P),o.Y36(A.A),o.Y36(y.w))},c.\u0275cmp=o.Xpm({type:c,selectors:[["app-delete"]],decls:17,vars:4,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],[4,"ngIf"],[1,"btn","btn-grey","ml-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(u,l){1&u&&(o.TgZ(0,"div",0)(1,"div",1),o.NdJ("click",function(){return l.voltar()}),o.qZA(),o.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),o._uU(6,"Excluir setup"),o.qZA(),o.TgZ(7,"a",6),o.NdJ("click",function(){return l.voltar()}),o._UZ(8,"span")(9,"span"),o.qZA()(),o.TgZ(10,"div",7)(11,"p"),o._uU(12,"Tem certeza que deseja excluir esse setup? Essa opera\xe7\xe3o n\xe3o poder\xe1 ser desfeita!!"),o.qZA(),o.YNc(13,j,3,0,"p",8),o.TgZ(14,"button",9),o.NdJ("click",function(){return l.send()}),o.YNc(15,T,1,0,"span",10),o._uU(16," Excluir "),o.qZA()()()()()),2&u&&(o.ekj("active",l.modalOpen),o.xp6(13),o.Q6J("ngIf",!l.objeto.registroNaoSalvo),o.xp6(2),o.Q6J("ngIf",l.loading))},dependencies:[U.O5]}),c})()},5623:(W,R,r)=>{r.d(R,{F:()=>c});var M=r(801),t=r(9808),v=r(6025),Z=r(8913),A=r(9205),y=r(9243),o=r(878),s=r(4650),I=r(202),U=r(7185),j=r(7549),T=r(3389),D=r(3868);let c=(()=>{class h{constructor(l,p,g,E,b,P){this.activatedRoute=l,this.toastr=p,this.modal=g,this.crypto=E,this.setupService=b,this.empresaService=P,this.faTimes=M.NBC,this.faChevronLeft=M.A35,this.objeto=new v.Wj,this.erro=[],this.loading=!1,this.loadingProduto=!1,this.url="",this.subscription=[],this.url=this.activatedRoute.snapshot.pathFromRoot.map(x=>x.routeConfig?.path).join("/");var O=l.params.subscribe(x=>{x.setup_id?this.objeto.id=this.crypto.decrypt(x.setup_id):this.voltar()});this.subscription.push(O),this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?this.objeto=this.empresaService.object.carteiraSetup.find(x=>x.id==this.objeto.id):(0,t.n)(this.setupService.get(this.objeto.id)).then(x=>{this.objeto=x}).catch(x=>{this.voltar()}).finally(()=>this.loading=!1)}ngOnDestroy(){this.subscription.forEach(l=>l.unsubscribe())}voltar(){this.modal.voltar()}resetForm(){this.objeto=new v.Wj,this.setupService.setObject(new v.Wj)}send(l){this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?(this.setupService.edit_To_Empresa_List(this.objeto)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(this.url.includes("empresas/editar"),(0,t.n)(this.setupService.edit(this.objeto)).then(p=>{(0,t.n)(this.setupService.getList()),this.modal.voltar()}).catch(p=>{this.erro.push((0,o.b)(p))}).finally(()=>this.loading=!1))}}return h.\u0275fac=function(l){return new(l||h)(s.Y36(I.gz),s.Y36(U._W),s.Y36(j.Q),s.Y36(y.w),s.Y36(A.A),s.Y36(Z.P))},h.\u0275cmp=s.Xpm({type:h,selectors:[["app-edit"]],decls:13,vars:4,consts:[[1,"modal__content"],[1,"modal__header","pb-2",2,"padding","0 25px"],[1,"link","text-dark",3,"click"],[1,"mr-1",3,"icon"],[1,"text-orange","mt-2"],[1,"btn","btn-yellow",3,"click"],[1,"modal__body","mt-0"],[3,"objeto","loading","erro","sendData"]],template:function(l,p){1&l&&(s.TgZ(0,"div",0)(1,"div",1)(2,"div")(3,"a",2),s.NdJ("click",function(){return p.voltar()}),s._UZ(4,"fa-icon",3),s._uU(5," Voltar "),s.qZA(),s.TgZ(6,"h3",4),s._uU(7,"Editar carteira setup"),s.qZA()(),s.TgZ(8,"button",5),s.NdJ("click",function(){return p.resetForm()}),s._uU(9,"Limpar campos"),s.qZA()(),s.TgZ(10,"div",6)(11,"app-form-carteira-setup",7),s.NdJ("sendData",function(E){return p.send(E)}),s.qZA()()(),s._UZ(12,"router-outlet")),2&l&&(s.xp6(4),s.Q6J("icon",p.faChevronLeft),s.xp6(7),s.Q6J("objeto",p.objeto)("loading",p.loading)("erro",p.erro))},dependencies:[I.lC,T.U,D.BN]}),h})()},3389:(W,R,r)=>{r.d(R,{U:()=>pt});var M=r(5861),t=r(4650),v=r(801),Z=r(6025),A=r(8913),y=r(9205),o=r(8259),s=r(1956),U=[{field:"id",header:"Id",filterType:s.vA.text,filterDisplay:s.w2.menu,maskType:s.O.undefined},{field:"tipoRisco.nome",header:"Tipo de Risco",filterType:s.vA.text,filterDisplay:s.w2.menu,maskType:s.O.undefined},{field:"percentual",header:"Percentual",filterType:s.vA.numeric,filterDisplay:s.w2.menu,maskType:s.O.percentage,decimal:"1.2"}],j=r(316),T=r(9535),D=r(9885),c=r(9808),h=r(4551),u=r(7185),l=r(202),p=r(6895),g=r(433),E=r(3868),b=r(805),P=r(1094),O=r(279),x=r(2210),J=r(9364);const N=["chartProdutos"];function w(n,_){1&n&&(t.TgZ(0,"p",41),t._uU(1,"Esse campo \xe9 obrigat\xf3rio"),t.qZA())}function K(n,_){if(1&n&&(t.TgZ(0,"div"),t.YNc(1,w,2,0,"p",40),t.qZA()),2&n){t.oxw();const e=t.MAs(14);t.xp6(1),t.Q6J("ngIf",e.errors.required)}}function Y(n,_){if(1&n){const e=t.EpF();t.TgZ(0,"div",42)(1,"input",43,44),t.NdJ("ngModelChange",function(a){t.CHM(e);const d=t.oxw();return t.KtG(d.selectedRisco=a)})("ngModelChange",function(){t.CHM(e);const a=t.oxw();return t.KtG(a.tipoRiscoChange())}),t.qZA(),t.TgZ(3,"label",45),t._uU(4),t.qZA()()}if(2&n){const e=_.$implicit,i=t.oxw();t.xp6(1),t.MGl("id","tipoRisco-",e.nome,""),t.Q6J("ngModel",i.selectedRisco)("value",e)("checked",e.id==i.selectedRisco.id),t.xp6(2),t.MGl("for","tipoRisco-",e.nome,""),t.xp6(1),t.Oqu(e.nome)}}function Q(n,_){if(1&n&&(t.TgZ(0,"span",49),t._uU(1," Inativo "),t.qZA()),2&n){t.oxw();const e=t.MAs(5);t.Q6J("ngbPopover",e)}}function k(n,_){if(1&n&&(t.TgZ(0,"div",50),t._uU(1),t.ALo(2,"date"),t.qZA()),2&n){const e=t.oxw().$implicit;t.xp6(1),t.hij("Desativado em ",t.Dn7(2,1,e.dataDesativado,"dd/MM/yyyy","UTC")," ")}}function H(n,_){if(1&n&&(t.TgZ(0,"div",46)(1,"span"),t._uU(2),t.qZA(),t.YNc(3,Q,2,1,"span",47),t.YNc(4,k,3,5,"ng-template",null,48,t.W1O),t.qZA()),2&n){const e=_.$implicit;t.xp6(2),t.Oqu(e.descricao),t.xp6(1),t.Q6J("ngIf",e.dataDesativado)}}function z(n,_){1&n&&(t.TgZ(0,"p",10),t._uU(1,"Selecione um risco para continuar."),t.qZA())}function G(n,_){if(1&n&&(t.TgZ(0,"p",10),t._uU(1),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.hij("Nenhum produto para ",e.selectedRisco.nome,".")}}function V(n,_){1&n&&(t.TgZ(0,"p",10),t._uU(1,"Informe o percentual"),t.qZA())}function $(n,_){if(1&n&&(t.TgZ(0,"p",10),t._uU(1),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.hij("Valor m\xe1ximo dispon\xedvel \xe9 ",e.selectedRisco.percentualDisponivel,"%")}}function q(n,_){if(1&n&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&n){const e=t.oxw().$implicit;t.xp6(1),t.Oqu(e.produto.tipoRisco.nome)}}function X(n,_){1&n&&(t.TgZ(0,"span"),t._uU(1,"-"),t.qZA())}function tt(n,_){if(1&n){const e=t.EpF();t.TgZ(0,"input",62,28),t.NdJ("ngModelChange",function(a){t.CHM(e);const d=t.oxw().$implicit;return t.KtG(d.percentual=a)})("change",function(){t.CHM(e);const a=t.oxw(3);return a.setChartProduto(""),t.KtG(a.calcularPercentuais())}),t.qZA()}if(2&n){const e=t.oxw(),i=e.$implicit,a=e.index,d=t.oxw(2);let m,F;t.hYB("id","percentual-",i.produto.tipoRisco.nome,"-",a,"")("name","percentual-",i.produto.tipoRisco.nome,"-",a,""),t.Q6J("max",null==(m=d.getRisco(i.produto.tipoRisco_Id))?null:m.percentualDisponivel)("placeholder",(null==(F=d.getRisco(i.produto.tipoRisco_Id))?null:F.percentualDisponivel)+"% dispon\xedvel")("ngModel",i.percentual)}}function et(n,_){1&n&&(t.TgZ(0,"span"),t._uU(1,"-"),t.qZA())}function ot(n,_){if(1&n){const e=t.EpF();t.TgZ(0,"button",63),t.NdJ("click",function(){t.CHM(e);const a=t.oxw().$implicit,d=t.oxw(2);return t.KtG(d.removeProduto(a))}),t._UZ(1,"fa-icon",64),t.TgZ(2,"span",65),t._uU(3,"Excluir"),t.qZA()()}if(2&n){const e=t.oxw(3);t.xp6(1),t.Q6J("icon",e.faTrashAlt)}}function it(n,_){if(1&n&&(t.TgZ(0,"tr"),t._UZ(1,"td"),t.TgZ(2,"td"),t._uU(3),t.qZA(),t.TgZ(4,"td"),t.YNc(5,q,2,1,"span",13),t.YNc(6,X,2,0,"span",13),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td",58),t.YNc(10,tt,2,7,"input",59),t.YNc(11,et,2,0,"span",13),t.qZA(),t.TgZ(12,"td",60),t.YNc(13,ot,4,1,"button",61),t.qZA()()),2&n){const e=_.$implicit,i=t.oxw(2);t.ekj("selected",e.produto.tipoRisco_Id==i.selectedRisco.id),t.xp6(3),t.Oqu(e.id),t.xp6(2),t.Q6J("ngIf",e.produto.tipoRisco),t.xp6(1),t.Q6J("ngIf",!e.produto.tipoRisco),t.xp6(2),t.Oqu(e.produto.descricao),t.xp6(2),t.Q6J("ngIf",61!=e.produto.id),t.xp6(1),t.Q6J("ngIf",61==e.produto.id),t.xp6(2),t.Q6J("ngIf",61!=e.produto.id)}}function rt(n,_){if(1&n&&(t.TgZ(0,"div",6)(1,"div",51)(2,"p",52),t._uU(3,"Itens selecionados"),t.qZA(),t.TgZ(4,"div",53)(5,"table",54)(6,"thead")(7,"tr"),t._UZ(8,"th",55),t.TgZ(9,"th",55),t._uU(10,"Id"),t.qZA(),t.TgZ(11,"th",55),t._uU(12,"Risco"),t.qZA(),t.TgZ(13,"th",55),t._uU(14,"Produto"),t.qZA(),t.TgZ(15,"th",55),t._uU(16,"Percentual"),t.qZA(),t._UZ(17,"th",56),t.qZA()(),t.TgZ(18,"tbody"),t.YNc(19,it,14,9,"tr",57),t.qZA()()()()()),2&n){const e=t.oxw();t.xp6(19),t.Q6J("ngForOf",e.objeto.carteiraProdutoRel)}}function nt(n,_){if(1&n&&(t.TgZ(0,"p",69),t._uU(1),t.ALo(2,"json"),t.qZA()),2&n){const e=_.$implicit;t.xp6(1),t.Oqu(t.lcZ(2,1,e))}}function at(n,_){1&n&&(t.TgZ(0,"p",69),t._uU(1,"Preencha todos os campos obrigat\xf3rios (*) corretamente para salvar"),t.qZA())}function st(n,_){if(1&n&&(t.TgZ(0,"div",66),t.YNc(1,nt,3,3,"p",67),t.YNc(2,at,2,0,"p",68),t.qZA()),2&n){const e=t.oxw(),i=t.MAs(1);t.xp6(1),t.Q6J("ngForOf",e.erro),t.xp6(1),t.Q6J("ngIf",i.invalid&&0==e.erro.length)}}function dt(n,_){1&n&&t._UZ(0,"span",70)}function lt(n,_){1&n&&(t.TgZ(0,"div",71),t._uU(1," Este campo \xe9 obrigat\xf3rio "),t.qZA())}let pt=(()=>{class n{constructor(e,i,a,d,m,F){this.toastr=e,this.empresaService=i,this.produtoService=a,this.activatedRoute=d,this.setupService=m,this.dropdown=F,this.objeto=new Z.Wj,this.loading=!1,this.erro=[],this.sendData=new t.vpe,this.clearData=!1,this.produtos=[],this.faPlus=v.r8p,this.faTrashAlt=v.I7k,this.faChartSimple=v.Wpq,this.faTable=v.B3e,this.faEdit=v.Xcf,this.isEditPage=!1,this.loadingCarteiras=!0,this.loadingTributacao=!1,this.carteiraRiscoColumns=U,this.percentual="",this.tipoRiscos=[],this.selectedRisco=new j.p,this.url="",this.cmp=(C,B)=>(C>B)-(C<B),this.chartWidth="100%",this.chartHeight="70px",this.subscription=[];var f=this.activatedRoute.params.subscribe(C=>this.isEditPage=!!C.setup_id);this.subscription.push(f);var S=this.dropdown.tipoRisco.subscribe(C=>this.tipoRiscos=C);if(this.subscription.push(S),(0,c.n)(this.dropdown.getRisco()).then(C=>{this.selectedRisco=C[0],this.tipoRiscoChange()}).finally(()=>this.loading=!1),this.url=this.activatedRoute.snapshot.pathFromRoot.map(C=>C.routeConfig?.path).join("/"),this.url.includes("empresas/cadastrar")){var L=this.empresaService.empresa.subscribe(C=>this.produtos=C.produto);this.subscription.push(L)}else(0,c.n)(this.produtoService.getList()).then(C=>this.produtos=C)}ngOnDestroy(){this.subscription.forEach(e=>e.unsubscribe())}ngOnChanges(e){e.objeto&&(this.objeto=e.objeto.currentValue,this.setChartProduto("ngOnChanges"),this.validatePercentualRisco()),e.loading&&(this.loading=e.loading.currentValue),e.erro&&(this.erro=e.erro.currentValue),e.clearData&&(this.clearData=e.clearData.currentValue,this.clearData&&(delete this.produto,this.percentual=""))}ngAfterViewInit(){var e=window.innerWidth,i=o(".chart-container").width()??0;this.chartWidth=(100/e*i).toString()+"vw",this.setChartProduto("ngAfterViewInit")}onResize(e){var i=window.innerWidth,a=o(".chart-container").width()??0;this.chartWidth=(100/i*a).toString()+"vw"}send(e){if(e.invalid)return this.toastr.error("Campos inv\xe1lidos"),void(this.erro=["Campos inv\xe1lidos"]);this.erro=[],this.sendData.emit(e)}tipoRiscoChange(){var e=this;return(0,M.Z)(function*(){let i=[];i=e.url.includes("empresas/cadastrar")?e.empresaService.object.produto:yield(0,c.n)(e.produtoService.getList()),e.selectedRisco&&(e.produtos=i.filter(a=>a.tipoRisco_Id==e.selectedRisco.id)),e.percentual="",e.calcularPercentuais()})()}calcularPercentuais(){this.tipoRiscos=this.tipoRiscos.map(e=>{let i=this.objeto.carteiraProdutoRel.filter(d=>d.produto.tipoRisco_Id==e.id);var a=i.length>0?i.map(d=>d.percentual).reduce((d,m)=>d+m):0;return e.percentualDisponivel=100-a,e})}getRisco(e){return this.tipoRiscos.find(i=>i.id==e)}setChartProduto(e){console.log("where",e);let i=0,a=this.objeto.carteiraProdutoRel.filter(f=>null!=f.produto.tipoRisco).map(f=>f.produto.tipoRisco);a=a.filter((f,S,L)=>S===L.findIndex(C=>C.id===f.id));var d=70;a.forEach(f=>d=d+=30),this.chartHeight=d+"px",console.log("chartHeight",this.chartHeight),this.optionsChartProduto={onClick:f=>{},indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{backgroundColor:"rgba(0,0,0,0.95)",padding:{x:15,y:10},callbacks:{beforeTitle:f=>f[0].element.$context.raw.produto.tipoRisco?.nome,title:f=>""}}},scales:{xAxes:{stacked:!0,min:0,max:100,suggestedMax:100,scaleLabel:{display:!0},grid:{drawBorder:!1},ticks:{callback:function(f,S,L){return f+"%"}}},yAxes:{scaleLabel:{display:!0},stacked:!0,drawOnChartArea:a.length>0,drawBorder:a.length>0,display:a.length>0}},parsing:{yAxisKey:"produto.tipoRisco.nome",xAxisKey:"percentual"}},this.objeto.carteiraProdutoRel.sort((f,S)=>this.cmp(f.produto.tipoRisco_Id,S.produto.tipoRisco_Id)||this.cmp(f.percentual,S.percentual));let m=this.objeto.carteiraProdutoRel.map(f=>({type:"bar",axis:"y",label:`${f.produto.descricao}`,backgroundColor:h.O[i++],data:[f]}));if(this.dataProduto={datasets:m},this.chartProdutos){console.log("oi",this.chartProdutos,this.optionsChartProduto);var F=this.chartProdutos.chart.update();console.log(F)}}adicionarProduto(){if(this.produto){let a={id:0,percentual:this.percentual,carteiraSetup_Id:0,produto:this.produto,produto_Id:this.produto.id};var e=this.objeto.carteiraProdutoRel.findIndex(d=>d.produto_Id==this.produto?.id),i=this.objeto.carteiraProdutoRel.find(d=>d.produto_Id==this.produto?.id);i&&-1!=e?(a.id=i.id,this.objeto.carteiraProdutoRel.splice(e,1,a)):this.objeto.carteiraProdutoRel.push(a),this.objeto.carteiraProdutoRel.sort((d,m)=>this.cmp(d.produto.tipoRisco_Id,m.produto.tipoRisco_Id)||this.cmp(d.percentual,m.percentual)),this.calcularPercentuais(),this.setChartProduto("adicionarProduto"),this.setupService.setObject(this.objeto),delete this.produto,this.percentual=""}else this.toastr.error("Selecione um produto para adicionar");console.groupEnd()}removeProduto(e){let i=this.objeto.carteiraProdutoRel.findIndex(a=>a.id==e.id&&a.produto_Id==e.produto.id);-1!=i&&(this.objeto.carteiraProdutoRel.splice(i,1),this.setupService.setObject(this.objeto),this.setChartProduto("removeProduto"),this.calcularPercentuais())}validatePercentualRisco(){let e=!1,i=[];for(let a of this.objeto.carteiraProdutoRel.filter(d=>null!=d.produto.tipoRisco)){let d=i.findIndex(m=>m.tipoRisco_Id==a.produto.tipoRisco_Id);-1!=d?i[d].percentual+=a.percentual:i.push({id:0,carteiraSetup_Id:a.carteiraSetup_Id,tipoRisco:a.produto.tipoRisco,tipoRisco_Id:a.produto.tipoRisco_Id,percentual:a.percentual})}return this.erro=i.filter(a=>100!=a.percentual).map(a=>`A soma do percentual dos produtos para cada tipo de risco ${a.tipoRisco.nome} deve ser 100%.`),0==this.objeto.carteiraProdutoRel.length&&this.erro.push("Voc\xea deve selecionar pelo menos um produto"),this.erro.length>0&&(e=!0),e}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(u._W),t.Y36(A.P),t.Y36(D.m),t.Y36(l.gz),t.Y36(y.A),t.Y36(T.V))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-form-carteira-setup"]],viewQuery:function(e,i){if(1&e&&t.Gf(N,5),2&e){let a;t.iGM(a=t.CRH())&&(i.chartProdutos=a.first)}},hostBindings:function(e,i){1&e&&t.NdJ("resize",function(d){return i.onResize(d)},!1,t.Jf7)},inputs:{objeto:"objeto",loading:"loading",erro:"erro",clearData:"clearData"},outputs:{sendData:"sendData"},features:[t.TTD],decls:65,vars:24,consts:[[1,"needs-validation",3,"ngSubmit"],["form","ngForm"],[1,"row","d-flex","flex-wrap","align-items-stretch","mb-2"],[1,"col-lg-4","col-md-4","col-sm-4","col-12"],[1,"col-12","d-flex","flex-wrap","mt-2"],[1,"col-xl-4","col-lg-5","col-md-5","col-sm-12","col-12","ps-0","pe-sm-2","pe-0"],[1,"card","card-body","mb-2"],[1,"form-row"],[1,"form-group","col-sm-12"],["for","carteiraSetup",1,"h6"],[1,"text-danger"],["type","text","name","nome","id","nome","placeholder","Digite para cadastrar nova carteira",1,"form-control","my-1",3,"ngModel","required","ngModelChange"],["nome","ngModel"],[4,"ngIf"],[1,"form-row","mt-2","mb-2"],[1,"d-flex","align-items-start","justify-content-start","flex-wrap","col-12"],[1,"h6","me-3","w-100"],["class","mx-2",4,"ngFor","ngForOf"],[1,"form-row","justify-content-center","flex-column"],[1,"form-group","col-lg-12","col-md-12","col-sm-12","col-12"],["for","produto"],["id","produto","name","produto","optionLabel","descricao","optionDisabled","dataDesativado","filterBy","descricao, tipoRisco.nome","placeholder","Selecione para adicionar",1,"form-control","novalidate",3,"options","ngModel","filter","showClear","ngModelChange"],["_produto","ngModel"],["pTemplate","item"],[1,"mt-1","px-1"],["class","text-danger",4,"ngIf"],["for","percentual"],["type","text","id","percentual","name","percentual","mask","separator","thousandSeparator",".","decimalMarker",",","suffix","%",1,"form-control",3,"max","placeholder","disabled","ngModel","ngModelChange"],["_percentual","ngModel"],[1,"form-group","align-items-end","px-1"],["type","button",1,"btn","btn-grey","w-100",3,"disabled","click"],[1,"col-xl-8","col-lg-7","col-md-7","col-sm-12","col-12","px-0"],["type","verticalBar",3,"options","data","height"],["chartProdutos",""],["class","card card-body mb-2",4,"ngIf"],[1,"d-flex","align-items-start","p-0","mt-3"],["class","m-0",4,"ngIf"],[1,"btn","btn-primary","mr-0","ml-auto",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],["campoObrigatorio",""],["class","text-danger error",4,"ngIf"],[1,"text-danger","error"],[1,"mx-2"],["type","radio","name","tipoRisco",1,"mr-1","mt-1",3,"id","ngModel","value","checked","ngModelChange"],["tipoRisco","ngModel"],[3,"for"],[1,"d-flex","align-items-center","justify-content-between"],["class","flag flag-red",3,"ngbPopover",4,"ngIf"],["ativo",""],[1,"flag","flag-red",3,"ngbPopover"],[1,"py-2","px-3"],[1,"col-12","px-2"],[1,"h6"],[1,"overflow-x-auto","w-100"],[1,"table","table-striped","table-borderless","table-editable"],[1,"bg-dark","text-white","font-weight-normal"],[1,"bg-dark","text-white","font-weight-normal",2,"width","80px"],[3,"selected",4,"ngFor","ngForOf"],[2,"width","80px","height","43px"],["type","text","class","form-control","mask","separator","thousandSeparator",".","decimalMarker",",","suffix","%",3,"id","name","max","placeholder","ngModel","ngModelChange","change",4,"ngIf"],[1,"td-action"],["type","button","class","btn-trash ml-auto d-block px-2 text-dark",3,"click",4,"ngIf"],["type","text","mask","separator","thousandSeparator",".","decimalMarker",",","suffix","%",1,"form-control",3,"id","name","max","placeholder","ngModel","ngModelChange","change"],["type","button",1,"btn-trash","ml-auto","d-block","px-2","text-dark",3,"click"],[1,"d-md-none","d-block",3,"icon"],[1,"d-md-block","d-none","btn","btn-dark"],[1,"m-0"],["class","text-red",4,"ngFor","ngForOf"],["class","text-red",4,"ngIf"],[1,"text-red"],[1,"spinner-border","spinner-border-sm","mr-1"],[1,"py-3","px-4"]],template:function(e,i){if(1&e){const a=t.EpF();t.TgZ(0,"form",0,1),t.NdJ("ngSubmit",function(){t.CHM(a);const m=t.MAs(1);return t.KtG(i.send(m))}),t.TgZ(2,"div",2),t._UZ(3,"div",3),t.TgZ(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"label",9),t._uU(10,"Nome: "),t.TgZ(11,"span",10),t._uU(12,"*"),t.qZA()(),t.TgZ(13,"input",11,12),t.NdJ("ngModelChange",function(m){return i.objeto.nome=m}),t.qZA(),t.YNc(15,K,2,1,"div",13),t.qZA()()(),t.TgZ(16,"div",6)(17,"div",14)(18,"div",15)(19,"p",16),t._uU(20,"Selecione o Risco"),t.qZA(),t.YNc(21,Y,5,6,"div",17),t.qZA()(),t.TgZ(22,"div",18)(23,"div",19)(24,"label",20),t._uU(25,"Produto: "),t.TgZ(26,"span",10),t._uU(27,"*"),t.qZA()(),t.TgZ(28,"p-dropdown",21,22),t.NdJ("ngModelChange",function(m){return i.produto=m}),t.YNc(30,H,6,2,"ng-template",23),t.qZA(),t.TgZ(31,"div",24),t.YNc(32,z,2,0,"p",25),t.YNc(33,G,2,1,"p",25),t.qZA()(),t.TgZ(34,"div",19)(35,"label",26),t._uU(36,"Percentual: "),t.TgZ(37,"span",10),t._uU(38,"*"),t.qZA()(),t.TgZ(39,"input",27,28),t.NdJ("ngModelChange",function(m){return i.percentual=m}),t.qZA(),t.TgZ(41,"div",24),t.YNc(42,V,2,0,"p",25),t.YNc(43,$,2,1,"p",25),t.qZA()(),t.TgZ(44,"div",29)(45,"button",30),t.NdJ("click",function(){return i.adicionarProduto()}),t._uU(46," Adicionar "),t.qZA()()()()(),t.TgZ(47,"div",31)(48,"div",6)(49,"div")(50,"h6"),t._uU(51,"Divis\xe3o da carteira: "),t.TgZ(52,"span",10),t._uU(53,"*"),t.qZA()()(),t.TgZ(54,"div"),t._UZ(55,"p-chart",32,33),t.qZA()(),t.YNc(57,rt,20,1,"div",34),t.qZA()()(),t.TgZ(58,"div",35),t.YNc(59,st,3,2,"div",36),t.TgZ(60,"button",37),t.YNc(61,dt,1,0,"span",38),t._uU(62," Salvar "),t.qZA()()(),t.YNc(63,lt,2,0,"ng-template",null,39,t.W1O)}if(2&e){const a=t.MAs(1),d=t.MAs(14),m=t.MAs(40);t.xp6(13),t.Q6J("ngModel",i.objeto.nome)("required",!0),t.xp6(2),t.Q6J("ngIf",d.touched&&d.errors),t.xp6(6),t.Q6J("ngForOf",i.tipoRiscos),t.xp6(7),t.Q6J("options",i.produtos)("ngModel",i.produto)("filter",!0)("showClear",!0),t.xp6(4),t.Q6J("ngIf",null==i.selectedRisco),t.xp6(1),t.Q6J("ngIf",null!=i.selectedRisco&&0==i.produtos.length),t.xp6(6),t.Q6J("max",i.selectedRisco.percentualDisponivel)("placeholder",i.selectedRisco.percentualDisponivel+"% dispon\xedvel")("disabled",null==i.produto)("ngModel",i.percentual),t.xp6(3),t.Q6J("ngIf",m.touched&&""==m.value),t.xp6(1),t.Q6J("ngIf",i.percentual>i.selectedRisco.percentualDisponivel),t.xp6(2),t.Q6J("disabled",null==i.produto||""==i.percentual.toString()||i.percentual>i.selectedRisco.percentualDisponivel),t.xp6(10),t.Q6J("options",i.optionsChartProduto)("data",i.dataProduto)("height",i.chartHeight),t.xp6(2),t.Q6J("ngIf",i.objeto.carteiraProdutoRel.length>0),t.xp6(2),t.Q6J("ngIf",i.erro||a.invalid),t.xp6(1),t.Q6J("disabled",a.invalid||i.loading||i.validatePercentualRisco()),t.xp6(1),t.Q6J("ngIf",i.loading)}},dependencies:[p.sg,p.O5,g._Y,g.Fj,g._,g.JJ,g.JL,g.Q7,g.On,g.F,E.BN,b.jx,P.hx,O.o8,x.Lt,J.C,p.Ts,p.uU],styles:['.cdk-drop-list[_ngcontent-%COMP%]{position:relative;min-height:300px}.cdk-drop-list.cdkDrag[_ngcontent-%COMP%]:after{content:"";position:absolute;top:50%;left:50%;width:calc(100% - 10px);height:calc(100% - 10px);transform:translate(-50%,-50%);color:#00000073;font-size:18px;display:flex;align-items:center;justify-content:center;z-index:0}.cdk-drop-list.cdkDrag.empty[_ngcontent-%COMP%]:after{content:"Solte aqui para selecionar";border:1px #0000007a dashed}.cdk-drop-list.cdkDrag.empty[_ngcontent-%COMP%]:hover:after{border:1px #00000096 dashed;color:#00000096}.cdk-drag[_ngcontent-%COMP%]{position:relative;z-index:1;margin:0}.fade-in-right[_ngcontent-%COMP%]{animation:fade-in-right .5s forwards}.fade-out-left[_ngcontent-%COMP%]{animation:fade-out-left .5s forwards}.form-group[_ngcontent-%COMP%]{transition:.5s}@keyframes fade-in-right{0%{opacity:0;visibility:hidden;display:none;transform:translate(-100%)}20%{display:block}to{opacity:1;visibility:visible;transform:translate(0)}}@keyframes fade-out-left{0%{opacity:1;visibility:visible;transform:translate(0);display:block}20%{display:none}to{opacity:0;visibility:hidden;transform:translate(-100%)}}.data-view[_ngcontent-%COMP%]{background:linear-gradient(90deg,var(--grey-light) 50%,#ffffff 50%);border-radius:3px;background-size:200%;background-position:250%;display:flex;align-self:flex-start;position:relative;transition:.3s}.data-view[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{margin:0;padding:5px 10px;background-color:transparent;border-radius:3px}.data-view[_ngcontent-%COMP%]   .btn.active[_ngcontent-%COMP%], .data-view[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:first-child{color:#fff}.data-view[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child{border-radius:0 3px 3px 0;border-color:#595c5f;border-left:none}.data-view.right[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child{color:#fff}.data-view.right[_ngcontent-%COMP%]{transition:.3s;background-position:153%}.data-view.right[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:first-child{border:1px #8f8f8f solid;border-right:none;border-radius:3px 0 0 3px}.data-view.right[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:first-child{color:#212529;transition:.3s color}.mat-option[_ngcontent-%COMP%]{height:auto!important;padding:9px 11px!important;line-height:1!important}.mat-option-text[_ngcontent-%COMP%]{font-size:14px!important}.td-action[_ngcontent-%COMP%]{position:sticky;right:0}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-of-type(odd)   .td-action[_ngcontent-%COMP%]{background-color:#f3f3f3}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-of-type(even)   .td-action[_ngcontent-%COMP%]{background-color:#fff}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected[_ngcontent-%COMP%]:nth-of-type(even)   .td-action[_ngcontent-%COMP%]{background-color:#b9c8f3}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected[_ngcontent-%COMP%]:nth-of-type(odd)   .td-action[_ngcontent-%COMP%]{background-color:#bcc9f1}']}),n})()}}]);