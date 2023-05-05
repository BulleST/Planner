"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[875],{4458:(W,x,i)=>{i.d(x,{G:()=>R});var T=i(801),t=i(9808),f=i(6025),Z=i(9205),A=i(9243),y=i(878),o=i(4650),s=i(202),j=i(7549),U=i(7185),I=i(3389),M=i(3868);let R=(()=>{class u{constructor(p,l,c,v,C){if(this.activatedRoute=p,this.modal=l,this.setupService=c,this.toastr=v,this.crypto=C,this.faTimes=T.NBC,this.faWallet=T.X5K,this.faChevronLeft=T.A35,this.modalOpen=!1,this.objeto=new f.Wj,this.erro=[],this.loading=!1,this.url="",this.subscription=[],this.clearData=!1,this.url=this.activatedRoute.snapshot.pathFromRoot.map(P=>P.routeConfig?.path).join("/"),this.url.includes("empresas/editar")){var b=p.parent?.parent?.params.subscribe(P=>{P.empresa_id?this.objeto.empresa_Id=this.crypto.decrypt(P.empresa_id):this.voltar()});b&&this.subscription.push(b)}}voltar(){this.modal.voltar()}ngOnDestroy(){this.subscription.forEach(p=>p.unsubscribe())}resetForm(){this.objeto=new f.Wj,this.setupService.setObject(new f.Wj),this.clearData=!0}send(p){this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")?(this.setupService.add_To_Empresa_List(this.objeto)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(this.url.includes("empresas/editar"),(0,t.n)(this.setupService.create(this.objeto)).then(l=>{this.modal.voltar(),(0,t.n)(this.setupService.getList())}).catch(l=>{this.erro.push((0,y.b)(l))}).finally(()=>this.loading=!1))}}return u.\u0275fac=function(p){return new(p||u)(o.Y36(s.gz),o.Y36(j.Q),o.Y36(Z.A),o.Y36(U._W),o.Y36(A.w))},u.\u0275cmp=o.Xpm({type:u,selectors:[["app-create"]],decls:13,vars:5,consts:[[1,"modal__content"],[1,"modal__header","pb-2",2,"padding","0 25px"],[1,"link","text-dark",3,"click"],[1,"mr-1",3,"icon"],[1,"text-orange","mt-2"],[1,"btn","btn-yellow",3,"click"],[1,"modal__body","mt-0"],[3,"objeto","loading","erro","clearData","sendData"]],template:function(p,l){1&p&&(o.TgZ(0,"div",0)(1,"div",1)(2,"div")(3,"a",2),o.NdJ("click",function(){return l.voltar()}),o._UZ(4,"fa-icon",3),o._uU(5," Voltar "),o.qZA(),o.TgZ(6,"h3",4),o._uU(7,"Adicionar carteira setup"),o.qZA()(),o.TgZ(8,"button",5),o.NdJ("click",function(){return l.resetForm()}),o._uU(9,"Limpar campos"),o.qZA()(),o.TgZ(10,"div",6)(11,"app-form-carteira-setup",7),o.NdJ("sendData",function(v){return l.send(v)}),o.qZA()()(),o._UZ(12,"router-outlet")),2&p&&(o.xp6(4),o.Q6J("icon",l.faChevronLeft),o.xp6(7),o.Q6J("objeto",l.objeto)("loading",l.loading)("erro",l.erro)("clearData",l.clearData))},dependencies:[s.lC,I.U,M.BN]}),u})()},8811:(W,x,i)=>{i.d(x,{T:()=>I});var T=i(5861),t=i(801),f=i(9808),Z=i(6025),A=i(9205),y=i(9243),o=i(4650),s=i(202),j=i(7549),U=i(7119);let I=(()=>{class M{constructor(u,_,p,l){var c=this;this.activatedRoute=u,this.modal=_,this.setupService=p,this.crypto=l,this.faTimes=t.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.url="",this.objeto=new Z.Wj,this.subscription=[];var v=this.modal.getOpen().subscribe(b=>this.modalOpen=b);this.subscription.push(v),this.url=this.activatedRoute.snapshot.pathFromRoot.map(b=>b.routeConfig?.path).join("/");var C=u.params.subscribe(function(){var b=(0,T.Z)(function*(P){P.setup_id?(c.objeto.id=c.crypto.decrypt(P.setup_id),c.objeto=yield(0,f.n)(c.setupService.get(c.objeto.id))):c.voltar()});return function(P){return b.apply(this,arguments)}}());this.subscription.push(C),setTimeout(()=>{this.modal.setOpen(!0)},200)}ngOnDestroy(){this.subscription.forEach(u=>u.unsubscribe())}voltar(){this.modal.voltar()}}return M.\u0275fac=function(u){return new(u||M)(o.Y36(s.gz),o.Y36(j.Q),o.Y36(A.A),o.Y36(y.w))},M.\u0275cmp=o.Xpm({type:M,selectors:[["app-deactivated"]],decls:5,vars:4,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[1,"modal__content"],[3,"objeto","service"]],template:function(u,_){1&u&&(o.TgZ(0,"div",0)(1,"div",1),o.NdJ("click",function(){return _.voltar()}),o.qZA(),o.TgZ(2,"div",2)(3,"div",3),o._UZ(4,"app-shared-deactivated",4),o.qZA()()()),2&u&&(o.ekj("active",_.modalOpen),o.xp6(4),o.Q6J("objeto",_.objeto)("service",_.setupService))},dependencies:[U.T]}),M})()},4115:(W,x,i)=>{i.d(x,{T:()=>R});var T=i(801),t=i(9808),f=i(6025),Z=i(8913),A=i(9205),y=i(9243),o=i(4650),s=i(202),j=i(7549),U=i(6895);function I(u,_){1&u&&(o.TgZ(0,"p")(1,"small"),o._uU(2,"Obs.: Se esse setup estiver relacionado a um planner, ele ser\xe1 apenas desativado, possibilitando futuras consultas. Se n\xe3o, esse setup ser\xe1 definitivamente removido."),o.qZA()())}function M(u,_){1&u&&o._UZ(0,"span",11)}let R=(()=>{class u{constructor(p,l,c,v,C){this.activatedRoute=p,this.modal=l,this.empresaService=c,this.setupService=v,this.crypto=C,this.faTimes=T.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.url="",this.objeto=new f.Wj,this.subscription=[];var b=this.modal.getOpen().subscribe(E=>this.modalOpen=E);this.subscription.push(b),this.url=this.activatedRoute.snapshot.pathFromRoot.map(E=>E.routeConfig?.path).join("/");var P=p.params.subscribe(E=>{E.setup_id?this.objeto.id=this.crypto.decrypt(E.setup_id):this.voltar()});this.subscription.push(P),(this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo)&&(this.objeto=this.empresaService.object.carteiraSetup.find(E=>E.id==this.objeto.id)),setTimeout(()=>{this.modal.setOpen(!0)},200)}ngOnDestroy(){this.subscription.forEach(p=>p.unsubscribe())}voltar(){this.modal.voltar()}send(){this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?(this.setupService.delete_To_Empresa_List(this.objeto.id)&&this.voltar(),this.loading=!1):(0,t.n)(this.setupService.delete(this.objeto.id)).then(p=>{(0,t.n)(this.setupService.getList()),this.voltar(),this.setupService.setObject(new f.Wj)}).catch().finally(()=>this.loading=!1)}}return u.\u0275fac=function(p){return new(p||u)(o.Y36(s.gz),o.Y36(j.Q),o.Y36(Z.P),o.Y36(A.A),o.Y36(y.w))},u.\u0275cmp=o.Xpm({type:u,selectors:[["app-delete"]],decls:17,vars:4,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],[4,"ngIf"],[1,"btn","btn-grey","ml-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(p,l){1&p&&(o.TgZ(0,"div",0)(1,"div",1),o.NdJ("click",function(){return l.voltar()}),o.qZA(),o.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),o._uU(6,"Excluir setup"),o.qZA(),o.TgZ(7,"a",6),o.NdJ("click",function(){return l.voltar()}),o._UZ(8,"span")(9,"span"),o.qZA()(),o.TgZ(10,"div",7)(11,"p"),o._uU(12,"Tem certeza que deseja excluir esse setup? Essa opera\xe7\xe3o n\xe3o poder\xe1 ser desfeita!!"),o.qZA(),o.YNc(13,I,3,0,"p",8),o.TgZ(14,"button",9),o.NdJ("click",function(){return l.send()}),o.YNc(15,M,1,0,"span",10),o._uU(16," Excluir "),o.qZA()()()()()),2&p&&(o.ekj("active",l.modalOpen),o.xp6(13),o.Q6J("ngIf",!l.objeto.registroNaoSalvo),o.xp6(2),o.Q6J("ngIf",l.loading))},dependencies:[U.O5]}),u})()},5623:(W,x,i)=>{i.d(x,{F:()=>u});var T=i(801),t=i(9808),f=i(6025),Z=i(8913),A=i(9205),y=i(9243),o=i(878),s=i(4650),j=i(202),U=i(7185),I=i(7549),M=i(3389),R=i(3868);let u=(()=>{class _{constructor(l,c,v,C,b,P){this.activatedRoute=l,this.toastr=c,this.modal=v,this.crypto=C,this.setupService=b,this.empresaService=P,this.faTimes=T.NBC,this.faChevronLeft=T.A35,this.objeto=new f.Wj,this.erro=[],this.loading=!1,this.loadingProduto=!1,this.url="",this.subscription=[],this.url=this.activatedRoute.snapshot.pathFromRoot.map(D=>D.routeConfig?.path).join("/");var E=l.params.subscribe(D=>{D.setup_id?this.objeto.id=this.crypto.decrypt(D.setup_id):this.voltar()});this.subscription.push(E),this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?this.objeto=this.empresaService.object.carteiraSetup.find(D=>D.id==this.objeto.id):(0,t.n)(this.setupService.get(this.objeto.id)).then(D=>{this.objeto=D}).catch(D=>{this.voltar()}).finally(()=>this.loading=!1),setTimeout(()=>{this.modal.setOpen(!0)},200)}ngOnDestroy(){this.subscription.forEach(l=>l.unsubscribe())}voltar(){this.modal.voltar()}resetForm(){this.objeto=new f.Wj,this.setupService.setObject(new f.Wj)}send(l){this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?(this.setupService.edit_To_Empresa_List(this.objeto)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(this.url.includes("empresas/editar"),(0,t.n)(this.setupService.edit(this.objeto)).then(c=>{(0,t.n)(this.setupService.getList()),this.modal.voltar()}).catch(c=>{this.erro.push((0,o.b)(c))}).finally(()=>this.loading=!1))}}return _.\u0275fac=function(l){return new(l||_)(s.Y36(j.gz),s.Y36(U._W),s.Y36(I.Q),s.Y36(y.w),s.Y36(A.A),s.Y36(Z.P))},_.\u0275cmp=s.Xpm({type:_,selectors:[["app-edit"]],decls:13,vars:4,consts:[[1,"modal__content"],[1,"modal__header","pb-2",2,"padding","0 25px"],[1,"link","text-dark",3,"click"],[1,"mr-1",3,"icon"],[1,"text-orange","mt-2"],[1,"btn","btn-yellow",3,"click"],[1,"modal__body","mt-0"],[3,"objeto","loading","erro","sendData"]],template:function(l,c){1&l&&(s.TgZ(0,"div",0)(1,"div",1)(2,"div")(3,"a",2),s.NdJ("click",function(){return c.voltar()}),s._UZ(4,"fa-icon",3),s._uU(5," Voltar "),s.qZA(),s.TgZ(6,"h3",4),s._uU(7,"Editar carteira setup"),s.qZA()(),s.TgZ(8,"button",5),s.NdJ("click",function(){return c.resetForm()}),s._uU(9,"Limpar campos"),s.qZA()(),s.TgZ(10,"div",6)(11,"app-form-carteira-setup",7),s.NdJ("sendData",function(C){return c.send(C)}),s.qZA()()(),s._UZ(12,"router-outlet")),2&l&&(s.xp6(4),s.Q6J("icon",c.faChevronLeft),s.xp6(7),s.Q6J("objeto",c.objeto)("loading",c.loading)("erro",c.erro))},dependencies:[j.lC,M.U,R.BN]}),_})()},3389:(W,x,i)=>{i.d(x,{U:()=>rt});var T=i(5861),t=i(4650),f=i(801),Z=i(6025),A=i(8913),y=i(9205),o=i(8259),s=i(1956),U=[{field:"id",header:"Id",filterType:s.vA.text,filterDisplay:s.w2.menu,maskType:s.O.undefined},{field:"tipoRisco.nome",header:"Tipo de Risco",filterType:s.vA.text,filterDisplay:s.w2.menu,maskType:s.O.undefined},{field:"percentual",header:"Percentual",filterType:s.vA.numeric,filterDisplay:s.w2.menu,maskType:s.O.percentage,decimal:"1.2"}],I=i(9243),M=i(316),R=i(9535),u=i(9885),_=i(9808),p=i(4551),l=i(7185),c=i(202),v=i(6895),C=i(433),b=i(3868),P=i(805),E=i(1094),D=i(279),K=i(2210),J=i(9364);const N=["chartProdutos"];function w(a,m){if(1&a){const e=t.EpF();t.TgZ(0,"div",39)(1,"input",40,41),t.NdJ("ngModelChange",function(n){t.CHM(e);const d=t.oxw();return t.KtG(d.selectedRisco=n)})("ngModelChange",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.tipoRiscoChange())}),t.qZA(),t.TgZ(3,"label",42),t._uU(4),t.qZA()()}if(2&a){const e=m.$implicit,r=t.oxw();t.xp6(1),t.MGl("id","tipoRisco-",e.nome,""),t.Q6J("ngModel",r.selectedRisco)("value",e)("checked",e.id==r.selectedRisco.id),t.xp6(2),t.MGl("for","tipoRisco-",e.nome,""),t.xp6(1),t.Oqu(e.nome)}}function Y(a,m){if(1&a&&(t.TgZ(0,"span",46),t._uU(1," Inativo "),t.qZA()),2&a){t.oxw();const e=t.MAs(5);t.Q6J("ngbPopover",e)}}function Q(a,m){if(1&a&&(t.TgZ(0,"div",47),t._uU(1),t.ALo(2,"date"),t.qZA()),2&a){const e=t.oxw().$implicit;t.xp6(1),t.hij("Desativado em ",t.Dn7(2,1,e.dataDesativado,"dd/MM/yyyy","UTC")," ")}}function k(a,m){if(1&a&&(t.TgZ(0,"div",43)(1,"span"),t._uU(2),t.qZA(),t.YNc(3,Y,2,1,"span",44),t.YNc(4,Q,3,5,"ng-template",null,45,t.W1O),t.qZA()),2&a){const e=m.$implicit;t.xp6(2),t.Oqu(e.descricao),t.xp6(1),t.Q6J("ngIf",e.dataDesativado)}}function z(a,m){1&a&&(t.TgZ(0,"p",10),t._uU(1,"Selecione um risco para continuar."),t.qZA())}function G(a,m){if(1&a&&(t.TgZ(0,"p",10),t._uU(1),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.hij("Nenhum produto para ",e.selectedRisco.nome,".")}}function H(a,m){1&a&&(t.TgZ(0,"p",10),t._uU(1,"Informe o percentual"),t.qZA())}function V(a,m){if(1&a&&(t.TgZ(0,"p",10),t._uU(1),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.hij("Valor m\xe1ximo dispon\xedvel \xe9 ",e.selectedRisco.percentualDisponivel,"%")}}function $(a,m){if(1&a){const e=t.EpF();t.TgZ(0,"tr"),t._UZ(1,"td"),t.TgZ(2,"td"),t._uU(3),t.qZA(),t.TgZ(4,"td"),t._uU(5),t.qZA(),t.TgZ(6,"td"),t._uU(7),t.qZA(),t.TgZ(8,"td",55)(9,"input",56,27),t.NdJ("ngModelChange",function(n){const h=t.CHM(e).$implicit;return t.KtG(h.percentual=n)})("change",function(){t.CHM(e);const n=t.oxw(2);return n.setChartProduto(""),t.KtG(n.calcularPercentuais())}),t.qZA()(),t.TgZ(11,"td",57)(12,"button",58),t.NdJ("click",function(){const d=t.CHM(e).$implicit,h=t.oxw(2);return t.KtG(h.removeProduto(d))}),t._UZ(13,"fa-icon",59),t.TgZ(14,"span",60),t._uU(15,"Excluir"),t.qZA()()()()}if(2&a){const e=m.$implicit,r=m.index,n=t.oxw(2);let d,h;t.ekj("selected",e.produto.tipoRisco_Id==n.selectedRisco.id),t.xp6(3),t.Oqu(e.id),t.xp6(2),t.Oqu(e.produto.tipoRisco.nome),t.xp6(2),t.Oqu(e.produto.descricao),t.xp6(2),t.MGl("id","percentual-",r,"")("name","percentual-",r,""),t.Q6J("max",null==(d=n.getRisco(e.produto.tipoRisco_Id))?null:d.percentualDisponivel)("placeholder",(null==(h=n.getRisco(e.produto.tipoRisco_Id))?null:h.percentualDisponivel)+"% dispon\xedvel")("ngModel",e.percentual),t.xp6(4),t.Q6J("icon",n.faTrashAlt)}}function X(a,m){if(1&a&&(t.TgZ(0,"div",6)(1,"div",48)(2,"p",49),t._uU(3,"Itens selecionados"),t.qZA(),t.TgZ(4,"div",50)(5,"table",51)(6,"thead")(7,"tr"),t._UZ(8,"th",52),t.TgZ(9,"th",52),t._uU(10,"Id"),t.qZA(),t.TgZ(11,"th",52),t._uU(12,"Risco"),t.qZA(),t.TgZ(13,"th",52),t._uU(14,"Produto"),t.qZA(),t.TgZ(15,"th",52),t._uU(16,"Percentual"),t.qZA(),t._UZ(17,"th",53),t.qZA()(),t.TgZ(18,"tbody"),t.YNc(19,$,16,11,"tr",54),t.qZA()()()()()),2&a){const e=t.oxw();t.xp6(19),t.Q6J("ngForOf",e.objeto.carteiraProdutoRel)}}function q(a,m){if(1&a&&(t.TgZ(0,"p",64),t._uU(1),t.ALo(2,"json"),t.qZA()),2&a){const e=m.$implicit;t.xp6(1),t.Oqu(t.lcZ(2,1,e))}}function tt(a,m){1&a&&(t.TgZ(0,"p",64),t._uU(1,"Preencha todos os campos obrigat\xf3rios (*) corretamente para salvar"),t.qZA())}function et(a,m){if(1&a&&(t.TgZ(0,"div",61),t.YNc(1,q,3,3,"p",62),t.YNc(2,tt,2,0,"p",63),t.qZA()),2&a){const e=t.oxw(),r=t.MAs(1);t.xp6(1),t.Q6J("ngForOf",e.erro),t.xp6(1),t.Q6J("ngIf",r.invalid&&0==e.erro.length)}}function ot(a,m){1&a&&t._UZ(0,"span",65)}function it(a,m){1&a&&(t.TgZ(0,"div",66),t._uU(1," Este campo \xe9 obrigat\xf3rio "),t.qZA())}let rt=(()=>{class a{constructor(e,r,n,d,h,g,S,F){this.toastr=e,this.empresaService=r,this.produtoService=n,this.activatedRoute=d,this.setupService=h,this.dropdown=g,this.router=S,this.crypto=F,this.objeto=new Z.Wj,this.loading=!1,this.erro=[],this.sendData=new t.vpe,this.clearData=!1,this.produtos=[],this.faPlus=f.r8p,this.faTrashAlt=f.I7k,this.faChartSimple=f.Wpq,this.faTable=f.B3e,this.faEdit=f.Xcf,this.isEditPage=!1,this.loadingCarteiras=!0,this.loadingTributacao=!1,this.carteiraRiscoColumns=U,this.percentual="",this.tipoRiscos=[],this.selectedRisco=new M.p,this.url="",this.cmp=(O,B)=>(O>B)-(O<B),this.chartWidth="100%",this.chartHeight="70px",this.subscription=[];var L=this.activatedRoute.params.subscribe(O=>this.isEditPage=!!O.setup_id);this.subscription.push(L);var nt=this.dropdown.tipoRisco.subscribe(O=>this.tipoRiscos=O);if(this.subscription.push(nt),(0,_.n)(this.dropdown.getRisco()).then(O=>{this.selectedRisco=O[0],this.tipoRiscoChange()}).finally(()=>this.loading=!1),this.url=this.activatedRoute.snapshot.pathFromRoot.map(O=>O.routeConfig?.path).join("/"),this.url.includes("empresas/cadastrar")){var at=this.empresaService.empresa.subscribe(O=>this.produtos=O.produto);this.subscription.push(at)}else(0,_.n)(this.produtoService.getList()).then(O=>this.produtos=O)}ngOnDestroy(){this.subscription.forEach(e=>e.unsubscribe())}ngOnChanges(e){e.objeto&&(this.objeto=e.objeto.currentValue,this.setChartProduto("ngOnChanges"),this.validatePercentualRisco()),e.loading&&(this.loading=e.loading.currentValue),e.erro&&(this.erro=e.erro.currentValue),e.clearData&&(this.clearData=e.clearData.currentValue,this.clearData&&(delete this.produto,this.percentual=""))}ngAfterViewInit(){var e=window.innerWidth,r=o(".chart-container").width()??0;this.chartWidth=(100/e*r).toString()+"vw"}onResize(e){var r=window.innerWidth,n=o(".chart-container").width()??0;this.chartWidth=(100/r*n).toString()+"vw"}send(e){if(e.invalid)return this.toastr.error("Campos inv\xe1lidos"),void(this.erro=["Campos inv\xe1lidos"]);this.erro=[],this.sendData.emit(e)}tipoRiscoChange(){var e=this;return(0,T.Z)(function*(){let r=[];r=e.url.includes("empresas/cadastrar")?e.empresaService.object.produto:yield(0,_.n)(e.produtoService.getList()),e.selectedRisco&&(e.produtos=r.filter(n=>n.tipoRisco_Id==e.selectedRisco.id)),e.percentual="",e.calcularPercentuais()})()}calcularPercentuais(){this.tipoRiscos=this.tipoRiscos.map(e=>{let r=this.objeto.carteiraProdutoRel.filter(n=>n.produto.tipoRisco_Id==e.id);return e.percentualDisponivel=r.length>0?100-r.map(n=>n.percentual).reduce((n,d)=>n+d):100,e})}getRisco(e){return this.tipoRiscos.find(r=>r.id==e)}setChartProduto(e){let r=0,n=this.objeto.carteiraProdutoRel.map(g=>g.produto.tipoRisco);n=n.filter((g,S,F)=>S===F.findIndex(L=>L.id===g.id));var d=70;n.forEach(g=>d+=30),this.chartHeight=d+"px",this.optionsProduto={onClick:g=>{},indexAxis:"y",responsive:!0,plugins:{legend:{display:!1},tooltip:{backgroundColor:"rgba(0,0,0,0.95)",padding:{x:15,y:10},callbacks:{beforeTitle:g=>g[0].element.$context.raw.produto.tipoRisco?.nome,title:g=>"",afterTitle:g=>g[0].element.$context.raw.produto.descricao}}},scales:{xAxes:{stacked:!0,min:0,max:100,suggestedMax:100,scaleLabel:{display:!0},grid:{drawBorder:!1},ticks:{callback:function(g,S,F){return g+"%"}}},yAxes:{scaleLabel:{display:!0},stacked:!0,drawOnChartArea:n.length>0,drawBorder:n.length>0,display:n.length>0}},parsing:{yAxisKey:"produto.tipoRisco.nome",xAxisKey:"percentual"}},this.objeto.carteiraProdutoRel.sort((g,S)=>this.cmp(g.produto.tipoRisco_Id,S.produto.tipoRisco_Id)||this.cmp(g.percentual,S.percentual));let h=this.objeto.carteiraProdutoRel.map(g=>({type:"bar",axis:"y",label:`${g.produto.descricao}`,backgroundColor:p.O[r++],data:[g]}));this.dataProduto={datasets:h},this.chartProdutos&&this.chartProdutos.chart.update()}adicionarProduto(){if(this.produto){let n={id:0,percentual:this.percentual,carteiraSetup_Id:0,produto:this.produto,produto_Id:this.produto.id};var e=this.objeto.carteiraProdutoRel.findIndex(d=>d.produto_Id==this.produto?.id),r=this.objeto.carteiraProdutoRel.find(d=>d.produto_Id==this.produto?.id);r&&-1!=e?(n.id=r.id,this.objeto.carteiraProdutoRel.splice(e,1,n)):this.objeto.carteiraProdutoRel.push(n),this.objeto.carteiraProdutoRel.sort((d,h)=>this.cmp(d.produto.tipoRisco_Id,h.produto.tipoRisco_Id)||this.cmp(d.percentual,h.percentual)),this.calcularPercentuais(),this.setChartProduto("adicionarProduto"),this.setupService.setObject(this.objeto),delete this.produto,this.percentual=""}else this.toastr.error("Selecione um produto para adicionar")}removeProduto(e){let r=this.objeto.carteiraProdutoRel.findIndex(n=>n.id==e.id&&n.produto_Id==e.produto.id);-1!=r&&(this.objeto.carteiraProdutoRel.splice(r,1),this.setupService.setObject(this.objeto),this.setChartProduto("removeProduto"),this.calcularPercentuais())}validatePercentualRisco(){let e=!1,r=[];for(let n of this.objeto.carteiraProdutoRel){let d=r.findIndex(h=>h.tipoRisco_Id==n.produto.tipoRisco_Id);-1!=d?r[d].percentual+=n.percentual:r.push({id:0,carteiraSetup_Id:n.carteiraSetup_Id,tipoRisco:n.produto.tipoRisco,tipoRisco_Id:n.produto.tipoRisco_Id,percentual:n.percentual})}return this.erro=r.filter(n=>100!=n.percentual).map(n=>`A soma do percentual dos produtos para cada tipo de risco ${n.tipoRisco.nome} deve ser 100%.`),0==this.objeto.carteiraProdutoRel.length&&this.erro.push("Voc\xea deve selecionar pelo menos um produto"),this.erro.length>0&&(e=!0),e}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(l._W),t.Y36(A.P),t.Y36(u.m),t.Y36(c.gz),t.Y36(y.A),t.Y36(R.V),t.Y36(c.F0),t.Y36(I.w))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-form-carteira-setup"]],viewQuery:function(e,r){if(1&e&&t.Gf(N,5),2&e){let n;t.iGM(n=t.CRH())&&(r.chartProdutos=n.first)}},hostBindings:function(e,r){1&e&&t.NdJ("resize",function(d){return r.onResize(d)},!1,t.Jf7)},inputs:{objeto:"objeto",loading:"loading",erro:"erro",clearData:"clearData"},outputs:{sendData:"sendData"},features:[t.TTD],decls:65,vars:22,consts:[[1,"needs-validation",3,"ngSubmit"],["form","ngForm"],[1,"row","d-flex","flex-wrap","align-items-stretch","mb-2"],[1,"col-lg-4","col-md-4","col-sm-4","col-12"],[1,"col-12","d-flex","flex-wrap","mt-2"],[1,"col-xl-4","col-lg-5","col-md-5","col-sm-12","col-12","ps-0","pe-sm-2","pe-0"],[1,"card","card-body","mb-2"],[1,"form-row"],[1,"form-group","col-sm-12"],["for","carteiraSetup",1,"h6"],[1,"text-danger"],["type","text","name","nome","id","nome","placeholder","Digite para cadastrar nova carteira",1,"form-control","my-1",3,"ngModel","ngModelChange"],["nome","ngModel"],[1,"form-row","mt-2","mb-2"],[1,"d-flex","align-items-start","justify-content-start","flex-wrap","col-12"],[1,"h6","me-3","w-100"],["class","mx-2",4,"ngFor","ngForOf"],[1,"form-row","justify-content-center","flex-column"],[1,"form-group","col-lg-12","col-md-12","col-sm-12","col-12"],["for","produto"],["id","produto","name","produto","optionLabel","descricao","optionDisabled","dataDesativado","filterBy","descricao, tipoRisco.nome","placeholder","Selecione para adicionar",1,"form-control","novalidate",3,"options","ngModel","filter","showClear","ngModelChange"],["_produto","ngModel"],["pTemplate","item"],[1,"mt-1","px-1"],["class","text-danger",4,"ngIf"],["for","percentual"],["type","text","id","percentual","name","percentual","mask","separator","thousandSeparator",".","decimalMarker",",","suffix","%",1,"form-control",3,"max","placeholder","disabled","ngModel","ngModelChange"],["_percentual","ngModel"],[1,"form-group","align-items-end","px-1"],["type","button",1,"btn","btn-grey","w-100",3,"disabled","click"],[1,"col-xl-8","col-lg-7","col-md-7","col-sm-12","col-12","px-0"],["type","verticalBar",3,"options","data","height"],["chartProdutos",""],["class","card card-body mb-2",4,"ngIf"],[1,"d-flex","align-items-start","p-0","mt-3"],["class","m-0",4,"ngIf"],[1,"btn","btn-primary","mr-0","ml-auto",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],["campoObrigatorio",""],[1,"mx-2"],["type","radio","name","tipoRisco",1,"mr-1","mt-1",3,"id","ngModel","value","checked","ngModelChange"],["tipoRisco","ngModel"],[3,"for"],[1,"d-flex","align-items-center","justify-content-between"],["class","flag flag-red",3,"ngbPopover",4,"ngIf"],["ativo",""],[1,"flag","flag-red",3,"ngbPopover"],[1,"py-2","px-3"],[1,"col-12","px-2"],[1,"h6"],[1,"overflow-x-auto","w-100"],[1,"table","table-striped","table-borderless","table-editable"],[1,"bg-dark","text-white","font-weight-normal"],[1,"bg-dark","text-white","font-weight-normal",2,"width","80px"],[3,"selected",4,"ngFor","ngForOf"],[2,"width","80px"],["type","text","mask","separator","thousandSeparator",".","decimalMarker",",","suffix","%",1,"form-control",3,"id","name","max","placeholder","ngModel","ngModelChange","change"],[1,"td-action"],["type","button",1,"btn-trash","ml-auto","d-block","px-2","text-dark",3,"click"],[1,"d-md-none","d-block",3,"icon"],[1,"d-md-block","d-none","btn","btn-dark"],[1,"m-0"],["class","text-red",4,"ngFor","ngForOf"],["class","text-red",4,"ngIf"],[1,"text-red"],[1,"spinner-border","spinner-border-sm","mr-1"],[1,"py-3","px-4"]],template:function(e,r){if(1&e){const n=t.EpF();t.TgZ(0,"form",0,1),t.NdJ("ngSubmit",function(){t.CHM(n);const h=t.MAs(1);return t.KtG(r.send(h))}),t.TgZ(2,"div",2),t._UZ(3,"div",3),t.TgZ(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"label",9),t._uU(10,"Nome: "),t.TgZ(11,"span",10),t._uU(12,"*"),t.qZA()(),t.TgZ(13,"div")(14,"input",11,12),t.NdJ("ngModelChange",function(h){return r.objeto.nome=h}),t.qZA()()()()(),t.TgZ(16,"div",6)(17,"div",13)(18,"div",14)(19,"p",15),t._uU(20,"Selecione o Risco"),t.qZA(),t.YNc(21,w,5,6,"div",16),t.qZA()(),t.TgZ(22,"div",17)(23,"div",18)(24,"label",19),t._uU(25,"Produto: "),t.TgZ(26,"span",10),t._uU(27,"*"),t.qZA()(),t.TgZ(28,"p-dropdown",20,21),t.NdJ("ngModelChange",function(h){return r.produto=h}),t.YNc(30,k,6,2,"ng-template",22),t.qZA(),t.TgZ(31,"div",23),t.YNc(32,z,2,0,"p",24),t.YNc(33,G,2,1,"p",24),t.qZA()(),t.TgZ(34,"div",18)(35,"label",25),t._uU(36,"Percentual: "),t.TgZ(37,"span",10),t._uU(38,"*"),t.qZA()(),t.TgZ(39,"input",26,27),t.NdJ("ngModelChange",function(h){return r.percentual=h}),t.qZA(),t.TgZ(41,"div",23),t.YNc(42,H,2,0,"p",24),t.YNc(43,V,2,1,"p",24),t.qZA()(),t.TgZ(44,"div",28)(45,"button",29),t.NdJ("click",function(){return r.adicionarProduto()}),t._uU(46," Adicionar "),t.qZA()()()()(),t.TgZ(47,"div",30)(48,"div",6)(49,"div")(50,"h6"),t._uU(51,"Divis\xe3o da carteira: "),t.TgZ(52,"span",10),t._uU(53,"*"),t.qZA()()(),t.TgZ(54,"div"),t._UZ(55,"p-chart",31,32),t.qZA()(),t.YNc(57,X,20,1,"div",33),t.qZA()()(),t.TgZ(58,"div",34),t.YNc(59,et,3,2,"div",35),t.TgZ(60,"button",36),t.YNc(61,ot,1,0,"span",37),t._uU(62," Salvar "),t.qZA()()(),t.YNc(63,it,2,0,"ng-template",null,38,t.W1O)}if(2&e){const n=t.MAs(1),d=t.MAs(40);t.xp6(14),t.Q6J("ngModel",r.objeto.nome),t.xp6(7),t.Q6J("ngForOf",r.tipoRiscos),t.xp6(7),t.Q6J("options",r.produtos)("ngModel",r.produto)("filter",!0)("showClear",!0),t.xp6(4),t.Q6J("ngIf",null==r.selectedRisco),t.xp6(1),t.Q6J("ngIf",null!=r.selectedRisco&&0==r.produtos.length),t.xp6(6),t.Q6J("max",r.selectedRisco.percentualDisponivel)("placeholder",r.selectedRisco.percentualDisponivel+"% dispon\xedvel")("disabled",null==r.produto)("ngModel",r.percentual),t.xp6(3),t.Q6J("ngIf",d.touched&&""==d.value),t.xp6(1),t.Q6J("ngIf",r.percentual>r.selectedRisco.percentualDisponivel),t.xp6(2),t.Q6J("disabled",null==r.produto||""==r.percentual.toString()||r.percentual>r.selectedRisco.percentualDisponivel),t.xp6(10),t.Q6J("options",r.optionsProduto)("data",r.dataProduto)("height",r.chartHeight),t.xp6(2),t.Q6J("ngIf",r.objeto.carteiraProdutoRel.length>0),t.xp6(2),t.Q6J("ngIf",r.erro||n.invalid),t.xp6(1),t.Q6J("disabled",n.invalid||r.loading||r.validatePercentualRisco()),t.xp6(1),t.Q6J("ngIf",r.loading)}},dependencies:[v.sg,v.O5,C._Y,C.Fj,C._,C.JJ,C.JL,C.On,C.F,b.BN,P.jx,E.hx,D.o8,K.Lt,J.C,v.Ts,v.uU],styles:['.cdk-drop-list[_ngcontent-%COMP%]{position:relative;min-height:300px}.cdk-drop-list.cdkDrag[_ngcontent-%COMP%]:after{content:"";position:absolute;top:50%;left:50%;width:calc(100% - 10px);height:calc(100% - 10px);transform:translate(-50%,-50%);color:#00000073;font-size:18px;display:flex;align-items:center;justify-content:center;z-index:0}.cdk-drop-list.cdkDrag.empty[_ngcontent-%COMP%]:after{content:"Solte aqui para selecionar";border:1px #0000007a dashed}.cdk-drop-list.cdkDrag.empty[_ngcontent-%COMP%]:hover:after{border:1px #00000096 dashed;color:#00000096}.cdk-drag[_ngcontent-%COMP%]{position:relative;z-index:1;margin:0}.fade-in-right[_ngcontent-%COMP%]{animation:fade-in-right .5s forwards}.fade-out-left[_ngcontent-%COMP%]{animation:fade-out-left .5s forwards}.form-group[_ngcontent-%COMP%]{transition:.5s}@keyframes fade-in-right{0%{opacity:0;visibility:hidden;display:none;transform:translate(-100%)}20%{display:block}to{opacity:1;visibility:visible;transform:translate(0)}}@keyframes fade-out-left{0%{opacity:1;visibility:visible;transform:translate(0);display:block}20%{display:none}to{opacity:0;visibility:hidden;transform:translate(-100%)}}.data-view[_ngcontent-%COMP%]{background:linear-gradient(90deg,var(--grey-light) 50%,#ffffff 50%);border-radius:3px;background-size:200%;background-position:250%;display:flex;align-self:flex-start;position:relative;transition:.3s}.data-view[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{margin:0;padding:5px 10px;background-color:transparent;border-radius:3px}.data-view[_ngcontent-%COMP%]   .btn.active[_ngcontent-%COMP%], .data-view[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:first-child{color:#fff}.data-view[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child{border-radius:0 3px 3px 0;border-color:#595c5f;border-left:none}.data-view.right[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child{color:#fff}.data-view.right[_ngcontent-%COMP%]{transition:.3s;background-position:153%}.data-view.right[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:first-child{border:1px #8f8f8f solid;border-right:none;border-radius:3px 0 0 3px}.data-view.right[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:first-child{color:#212529;transition:.3s color}.mat-option[_ngcontent-%COMP%]{height:auto!important;padding:9px 11px!important;line-height:1!important}.mat-option-text[_ngcontent-%COMP%]{font-size:14px!important}.td-action[_ngcontent-%COMP%]{position:sticky;right:0}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-of-type(odd)   .td-action[_ngcontent-%COMP%]{background-color:#f3f3f3}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-of-type(even)   .td-action[_ngcontent-%COMP%]{background-color:#fff}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected[_ngcontent-%COMP%]:nth-of-type(even)   .td-action[_ngcontent-%COMP%]{background-color:#b9c8f3}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected[_ngcontent-%COMP%]:nth-of-type(odd)   .td-action[_ngcontent-%COMP%]{background-color:#bcc9f1}']}),a})()}}]);