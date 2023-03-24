"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[875],{4458:(S,D,o)=>{o.d(D,{G:()=>j});var E=o(801),t=o(6025),T=o(9205),O=o(9243),c=o(4650),Z=o(8627),m=o(7549),i=o(7185),A=o(3389),y=o(3868);let j=(()=>{class C{constructor(g,s,P,u,d){this.activatedRoute=g,this.modal=s,this.setupService=P,this.toastr=u,this.crypto=d,this.faTimes=E.NBC,this.faWallet=E.X5K,this.faChevronLeft=E.A35,this.modalOpen=!1,this.objeto=new t.Wj,this.erro=[],this.loading=!1,this.url="",this.url=this.activatedRoute.snapshot.pathFromRoot.map(p=>p.routeConfig?.path).join("/"),this.url.includes("empresas/editar")&&g.parent?.parent?.params.subscribe(p=>{p.empresa_id?this.objeto.empresa_Id=this.crypto.decrypt(p.empresa_id):this.voltar()})}ngOnInit(){}voltar(){this.modal.voltar()}resetForm(){this.objeto=new t.Wj,this.setupService.setObject(new t.Wj)}send(g){this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")?(this.setupService.add_To_Empresa_List(this.objeto)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(this.url.includes("empresas/editar"),this.setupService.create(this.objeto).subscribe({next:s=>{this.modal.voltar(),this.setupService.getList().subscribe()},error:s=>{this.loading=!1}}))}}return C.\u0275fac=function(g){return new(g||C)(c.Y36(Z.gz),c.Y36(m.Q),c.Y36(T.A),c.Y36(i._W),c.Y36(O.w))},C.\u0275cmp=c.Xpm({type:C,selectors:[["app-create"]],decls:13,vars:4,consts:[[1,"modal__content"],[1,"modal__header","pb-2",2,"padding","0 25px"],[1,"link","text-dark",3,"click"],[1,"mr-1",3,"icon"],[1,"text-orange","mt-2"],[1,"btn","btn-yellow",3,"click"],[1,"modal__body","mt-0"],[3,"objeto","loading","erro","sendData"]],template:function(g,s){1&g&&(c.TgZ(0,"div",0)(1,"div",1)(2,"div")(3,"a",2),c.NdJ("click",function(){return s.voltar()}),c._UZ(4,"fa-icon",3),c._uU(5," Voltar "),c.qZA(),c.TgZ(6,"h3",4),c._uU(7,"Adicionar carteira setup"),c.qZA()(),c.TgZ(8,"button",5),c.NdJ("click",function(){return s.resetForm()}),c._uU(9,"Limpar campos"),c.qZA()(),c.TgZ(10,"div",6)(11,"app-form-carteira-setup",7),c.NdJ("sendData",function(u){return s.send(u)}),c.qZA()()(),c._UZ(12,"router-outlet")),2&g&&(c.xp6(4),c.Q6J("icon",s.faChevronLeft),c.xp6(7),c.Q6J("objeto",s.objeto)("loading",s.loading)("erro",s.erro))},dependencies:[Z.lC,A.U,y.BN]}),C})()},8811:(S,D,o)=>{o.d(D,{T:()=>j});var E=o(5861),t=o(801),T=o(9808),O=o(6025),c=o(9205),Z=o(9243),m=o(4650),i=o(8627),A=o(7549),y=o(7119);let j=(()=>{class C{constructor(g,s,P,u){var d=this;this.activatedRoute=g,this.modal=s,this.setupService=P,this.crypto=u,this.faTimes=t.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.url="",this.objeto=new O.Wj,this.modal.getOpen().subscribe(p=>{this.modalOpen=p}),this.url=this.activatedRoute.snapshot.pathFromRoot.map(p=>p.routeConfig?.path).join("/"),g.params.subscribe(function(){var p=(0,E.Z)(function*(f){f.setup_id?(d.objeto.id=d.crypto.decrypt(f.setup_id),d.objeto=yield(0,T.n)(d.setupService.get(d.objeto.id))):d.voltar()});return function(f){return p.apply(this,arguments)}}())}ngOnInit(){setTimeout(()=>{this.modal.setOpen(!0)},200)}voltar(){this.modal.voltar()}}return C.\u0275fac=function(g){return new(g||C)(m.Y36(i.gz),m.Y36(A.Q),m.Y36(c.A),m.Y36(Z.w))},C.\u0275cmp=m.Xpm({type:C,selectors:[["app-deactivated"]],decls:5,vars:4,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[1,"modal__content"],[3,"objeto","service"]],template:function(g,s){1&g&&(m.TgZ(0,"div",0)(1,"div",1),m.NdJ("click",function(){return s.voltar()}),m.qZA(),m.TgZ(2,"div",2)(3,"div",3),m._UZ(4,"app-shared-deactivated",4),m.qZA()()()),2&g&&(m.ekj("active",s.modalOpen),m.xp6(4),m.Q6J("objeto",s.objeto)("service",s.setupService))},dependencies:[y.T]}),C})()},4115:(S,D,o)=>{o.d(D,{T:()=>g});var E=o(5861),t=o(801),T=o(9808),O=o(6025),c=o(8913),Z=o(9205),m=o(9243),i=o(4650),A=o(8627),y=o(7549),j=o(6895);function C(s,P){1&s&&(i.TgZ(0,"p")(1,"small"),i._uU(2,"Obs.: Se esse setup estiver relacionado a um planner, ele ser\xe1 apenas desativado, possibilitando futuras consultas. Se n\xe3o, esse setup ser\xe1 definitivamente removido."),i.qZA()())}function R(s,P){1&s&&i._UZ(0,"span",11)}let g=(()=>{class s{constructor(u,d,p,f,I){this.activatedRoute=u,this.modal=d,this.empresaService=p,this.setupService=f,this.crypto=I,this.faTimes=t.NBC,this.modalOpen=!1,this.erro=[],this.loading=!1,this.url="",this.objeto=new O.Wj,this.modal.getOpen().subscribe(M=>{this.modalOpen=M}),this.url=this.activatedRoute.snapshot.pathFromRoot.map(M=>M.routeConfig?.path).join("/"),u.params.subscribe(M=>{M.setup_id?this.objeto.id=this.crypto.decrypt(M.setup_id):this.voltar()}),(this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo)&&(this.objeto=this.empresaService.object.carteiraSetup.find(M=>M.id==this.objeto.id))}ngOnInit(){setTimeout(()=>{this.modal.setOpen(!0)},200)}voltar(){this.modal.voltar()}send(){var d,u=this;this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?(this.setupService.delete_To_Empresa_List(this.objeto.id)&&this.voltar(),this.loading=!1):this.setupService.delete(this.objeto.id).subscribe({next:(d=(0,E.Z)(function*(p){yield(0,T.n)(u.setupService.getList()),u.voltar(),u.setupService.setObject(new O.Wj)}),function(f){return d.apply(this,arguments)}),error:d=>{this.loading=!1}})}}return s.\u0275fac=function(u){return new(u||s)(i.Y36(A.gz),i.Y36(y.Q),i.Y36(c.P),i.Y36(Z.A),i.Y36(m.w))},s.\u0275cmp=i.Xpm({type:s,selectors:[["app-delete"]],decls:17,vars:4,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","600px"],[1,"modal__content"],[1,"modal__header","pb-2"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body","mt-0"],[4,"ngIf"],[1,"btn","btn-grey","ml-auto","d-flex","mt-2",3,"click"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(u,d){1&u&&(i.TgZ(0,"div",0)(1,"div",1),i.NdJ("click",function(){return d.voltar()}),i.qZA(),i.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5),i._uU(6,"Excluir setup"),i.qZA(),i.TgZ(7,"a",6),i.NdJ("click",function(){return d.voltar()}),i._UZ(8,"span")(9,"span"),i.qZA()(),i.TgZ(10,"div",7)(11,"p"),i._uU(12,"Tem certeza que deseja excluir esse setup? Essa opera\xe7\xe3o n\xe3o poder\xe1 ser desfeita!!"),i.qZA(),i.YNc(13,C,3,0,"p",8),i.TgZ(14,"button",9),i.NdJ("click",function(){return d.send()}),i.YNc(15,R,1,0,"span",10),i._uU(16," Excluir "),i.qZA()()()()()),2&u&&(i.ekj("active",d.modalOpen),i.xp6(13),i.Q6J("ngIf",!d.objeto.registroNaoSalvo),i.xp6(2),i.Q6J("ngIf",d.loading))},dependencies:[j.O5]}),s})()},5623:(S,D,o)=>{o.d(D,{F:()=>g});var E=o(5861),t=o(801),T=o(9808),O=o(6025),c=o(8913),Z=o(9205),m=o(9243),i=o(4650),A=o(8627),y=o(7185),j=o(7549),C=o(3389),R=o(3868);let g=(()=>{class s{constructor(u,d,p,f,I,M){this.activatedRoute=u,this.toastr=d,this.modal=p,this.crypto=f,this.setupService=I,this.empresaService=M,this.faTimes=t.NBC,this.faChevronLeft=t.A35,this.objeto=new O.Wj,this.erro=[],this.loading=!1,this.loadingProduto=!1,this.url="",this.url=this.activatedRoute.snapshot.pathFromRoot.map(x=>x.routeConfig?.path).join("/"),u.params.subscribe(x=>{x.setup_id?this.objeto.id=this.crypto.decrypt(x.setup_id):this.voltar()}),this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?this.objeto=this.empresaService.object.carteiraSetup.find(x=>x.id==this.objeto.id):this.setupService.get(this.objeto.id).subscribe({next:x=>{this.objeto=x},error:x=>{this.voltar()}})}ngOnInit(){setTimeout(()=>{this.modal.setOpen(!0)},200)}voltar(){this.modal.voltar()}resetForm(){this.objeto=new O.Wj,this.setupService.setObject(new O.Wj)}send(u){var p,d=this;this.loading=!0,this.erro=[],this.url.includes("empresas/cadastrar")||this.objeto.registroNaoSalvo?(this.setupService.edit_To_Empresa_List(this.objeto)&&(this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.voltar()),this.loading=!1):(this.url.includes("empresas/editar"),this.setupService.edit(this.objeto).subscribe({next:(p=(0,E.Z)(function*(f){yield(0,T.n)(d.setupService.getList()),d.modal.voltar()}),function(I){return p.apply(this,arguments)}),error:p=>{this.loading=!1},complete:()=>{}}))}}return s.\u0275fac=function(u){return new(u||s)(i.Y36(A.gz),i.Y36(y._W),i.Y36(j.Q),i.Y36(m.w),i.Y36(Z.A),i.Y36(c.P))},s.\u0275cmp=i.Xpm({type:s,selectors:[["app-edit"]],decls:13,vars:4,consts:[[1,"modal__content"],[1,"modal__header","pb-2",2,"padding","0 25px"],[1,"link","text-dark",3,"click"],[1,"mr-1",3,"icon"],[1,"text-orange","mt-2"],[1,"btn","btn-yellow",3,"click"],[1,"modal__body","mt-0"],[3,"objeto","loading","erro","sendData"]],template:function(u,d){1&u&&(i.TgZ(0,"div",0)(1,"div",1)(2,"div")(3,"a",2),i.NdJ("click",function(){return d.voltar()}),i._UZ(4,"fa-icon",3),i._uU(5," Voltar "),i.qZA(),i.TgZ(6,"h3",4),i._uU(7,"Editar carteira setup"),i.qZA()(),i.TgZ(8,"button",5),i.NdJ("click",function(){return d.resetForm()}),i._uU(9,"Limpar campos"),i.qZA()(),i.TgZ(10,"div",6)(11,"app-form-carteira-setup",7),i.NdJ("sendData",function(f){return d.send(f)}),i.qZA()()(),i._UZ(12,"router-outlet")),2&u&&(i.xp6(4),i.Q6J("icon",d.faChevronLeft),i.xp6(7),i.Q6J("objeto",d.objeto)("loading",d.loading)("erro",d.erro))},dependencies:[A.lC,C.U,R.BN]}),s})()},3389:(S,D,o)=>{o.d(D,{U:()=>ot});var E=o(5861),t=o(4650),T=o(801),O=o(6025),c=o(8913),Z=o(9205),m=o(8259),i=o(1956),y=[{field:"id",header:"Id",filterType:i.vA.text,filterDisplay:i.w2.menu,maskType:i.O.undefined},{field:"tipoRisco.nome",header:"Tipo de Risco",filterType:i.vA.text,filterDisplay:i.w2.menu,maskType:i.O.undefined},{field:"percentual",header:"Percentual",filterType:i.vA.numeric,filterDisplay:i.w2.menu,maskType:i.O.percentage,decimal:"1.2"}],j=o(9243),C=o(316),R=o(9535),g=o(9885),s=o(9808),P=o(4551),u=o(7185),d=o(8627),p=o(6895),f=o(433),I=o(3868),M=o(805),x=o(1094),L=o(2210),B=o(9364);const K=["chartProdutos"];function J(a,_){if(1&a){const e=t.EpF();t.TgZ(0,"div",40)(1,"input",41,42),t.NdJ("ngModelChange",function(n){t.CHM(e);const l=t.oxw();return t.KtG(l.selectedRisco=n)})("ngModelChange",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.tipoRiscoChange())}),t.qZA(),t.TgZ(3,"label",43),t._uU(4),t.qZA()()}if(2&a){const e=_.$implicit,r=t.oxw();t.xp6(1),t.MGl("id","tipoRisco-",e.nome,""),t.Q6J("ngModel",r.selectedRisco)("value",e)("checked",e.id==r.selectedRisco.id),t.xp6(2),t.MGl("for","tipoRisco-",e.nome,""),t.xp6(1),t.Oqu(e.nome)}}function N(a,_){if(1&a&&(t.TgZ(0,"div",45)(1,"div"),t._uU(2),t.qZA()()),2&a){const e=t.oxw(2);t.xp6(2),t.Oqu(e.produto.descricao)}}function w(a,_){if(1&a&&t.YNc(0,N,3,1,"div",44),2&a){const e=t.oxw();t.Q6J("ngIf",e.produto)}}function Y(a,_){if(1&a&&(t.TgZ(0,"div",46)(1,"div")(2,"p"),t._uU(3),t.qZA(),t.TgZ(4,"p")(5,"strong"),t._uU(6,"Tipo Risco:"),t.qZA(),t._uU(7),t.qZA()()()),2&a){const e=_.$implicit;t.xp6(3),t.Oqu(e.descricao),t.xp6(4),t.hij(" ",e.tipoRisco.nome,"")}}function Q(a,_){1&a&&(t.TgZ(0,"p",10),t._uU(1,"Selecione um risco para continuar."),t.qZA())}function k(a,_){if(1&a&&(t.TgZ(0,"p",10),t._uU(1),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.hij("Nenhum produto para ",e.selectedRisco.nome,".")}}function G(a,_){1&a&&(t.TgZ(0,"p",10),t._uU(1,"Informe o percentual"),t.qZA())}function z(a,_){if(1&a&&(t.TgZ(0,"p",10),t._uU(1),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.hij("Valor m\xe1ximo dispon\xedvel \xe9 ",e.selectedRisco.percentualDisponivel,"%")}}function H(a,_){if(1&a){const e=t.EpF();t.TgZ(0,"tr"),t._UZ(1,"td"),t.TgZ(2,"td"),t._uU(3),t.qZA(),t.TgZ(4,"td"),t._uU(5),t.qZA(),t.TgZ(6,"td"),t._uU(7),t.qZA(),t.TgZ(8,"td",54)(9,"input",55,28),t.NdJ("ngModelChange",function(n){const h=t.CHM(e).$implicit;return t.KtG(h.percentual=n)})("change",function(){t.CHM(e);const n=t.oxw(2);return n.setChartProduto(""),t.KtG(n.calcularPercentuais())}),t.qZA()(),t.TgZ(11,"td",56)(12,"button",57),t.NdJ("click",function(){const l=t.CHM(e).$implicit,h=t.oxw(2);return t.KtG(h.removeProduto(l))}),t._UZ(13,"fa-icon",58),t.TgZ(14,"span",59),t._uU(15,"Excluir"),t.qZA()()()()}if(2&a){const e=_.$implicit,r=_.index,n=t.oxw(2);let l,h;t.ekj("selected",e.produto.tipoRisco_Id==n.selectedRisco.id),t.xp6(3),t.Oqu(e.id),t.xp6(2),t.Oqu(e.produto.tipoRisco.nome),t.xp6(2),t.Oqu(e.produto.descricao),t.xp6(2),t.MGl("id","percentual-",r,"")("name","percentual-",r,""),t.Q6J("max",null==(l=n.getRisco(e.produto.tipoRisco_Id))?null:l.percentualDisponivel)("placeholder",(null==(h=n.getRisco(e.produto.tipoRisco_Id))?null:h.percentualDisponivel)+"% dispon\xedvel")("ngModel",e.percentual),t.xp6(4),t.Q6J("icon",n.faTrashAlt)}}function V(a,_){if(1&a&&(t.TgZ(0,"div",47)(1,"p",48),t._uU(2,"Itens selecionados"),t.qZA(),t.TgZ(3,"div",49)(4,"table",50)(5,"thead")(6,"tr"),t._UZ(7,"th",51),t.TgZ(8,"th",51),t._uU(9,"Id"),t.qZA(),t.TgZ(10,"th",51),t._uU(11,"Risco"),t.qZA(),t.TgZ(12,"th",51),t._uU(13,"Produto"),t.qZA(),t.TgZ(14,"th",51),t._uU(15,"Percentual"),t.qZA(),t._UZ(16,"th",52),t.qZA()(),t.TgZ(17,"tbody"),t.YNc(18,H,16,11,"tr",53),t.qZA()()()()),2&a){const e=t.oxw();t.xp6(18),t.Q6J("ngForOf",e.objeto.carteiraProdutoRel)}}function $(a,_){if(1&a&&(t.TgZ(0,"p",63),t._uU(1),t.qZA()),2&a){const e=_.$implicit;t.xp6(1),t.Oqu(e)}}function X(a,_){1&a&&(t.TgZ(0,"p",63),t._uU(1,"Preencha todos os campos obrigat\xf3rios (*) corretamente para salvar"),t.qZA())}function q(a,_){if(1&a&&(t.TgZ(0,"div",60),t.YNc(1,$,2,1,"p",61),t.YNc(2,X,2,0,"p",62),t.qZA()),2&a){const e=t.oxw(),r=t.MAs(1);t.xp6(1),t.Q6J("ngForOf",e.erro),t.xp6(1),t.Q6J("ngIf",r.invalid&&0==e.erro.length)}}function tt(a,_){1&a&&t._UZ(0,"span",64)}function et(a,_){1&a&&(t.TgZ(0,"div",65),t._uU(1," Este campo \xe9 obrigat\xf3rio "),t.qZA())}let ot=(()=>{class a{constructor(e,r,n,l,h,v,U,W){this.toastr=e,this.empresaService=r,this.produtoService=n,this.activatedRoute=l,this.setupService=h,this.dropdown=v,this.router=U,this.crypto=W,this.objeto=new O.Wj,this.loading=!1,this.erro=[],this.sendData=new t.vpe,this.produtos=[],this.faPlus=T.r8p,this.faTrashAlt=T.I7k,this.faChartSimple=T.Wpq,this.faTable=T.B3e,this.faEdit=T.Xcf,this.isEditPage=!1,this.loadingCarteiras=!0,this.loadingTributacao=!1,this.carteiraRiscoColumns=y,this.percentual="",this.tipoRiscos=[],this.selectedRisco=new C.p,this.url="",this.cmp=(b,F)=>(b>F)-(b<F),this.chartWidth="100%",this.chartHeight="70px",this.activatedRoute.params.subscribe(b=>{this.isEditPage=!!b.setup_id}),this.dropdown.tipoRisco.subscribe(b=>this.tipoRiscos=b),this.dropdown.getRisco().subscribe({next:b=>{this.selectedRisco=b[0],this.tipoRiscoChange()}}),this.url=this.activatedRoute.snapshot.pathFromRoot.map(b=>b.routeConfig?.path).join("/"),this.url.includes("empresas/cadastrar")?this.empresaService.empresa.subscribe(b=>{console.log(b.produto),this.produtos=b.produto}):this.produtoService.getList().subscribe({next:b=>{this.produtos=b}})}ngOnInit(){}ngOnChanges(e){e.objeto&&(this.objeto=e.objeto.currentValue,this.setChartProduto("ngOnChanges"),this.validatePercentualRisco()),e.loading&&(this.loading=e.loading.currentValue),e.erro&&(this.erro=e.erro.currentValue)}ngAfterViewInit(){var e=window.innerWidth,r=m(".chart-container").width()??0;this.chartWidth=(100/e*r).toString()+"vw"}onResize(e){var r=window.innerWidth,n=m(".chart-container").width()??0;this.chartWidth=(100/r*n).toString()+"vw"}send(e){if(e.invalid)return this.toastr.error("Campos inv\xe1lidos"),void(this.erro=["Campos inv\xe1lidos"]);this.erro=[],this.sendData.emit(e)}tipoRiscoChange(){var e=this;return(0,E.Z)(function*(){let r=[];r=e.url.includes("empresas/cadastrar")?e.empresaService.object.produto:yield(0,s.n)(e.produtoService.getList()),e.selectedRisco&&(e.produtos=r.filter(n=>n.tipoRisco_Id==e.selectedRisco.id)),e.percentual="",e.calcularPercentuais()})()}calcularPercentuais(){this.tipoRiscos=this.tipoRiscos.map(e=>{let r=this.objeto.carteiraProdutoRel.filter(n=>n.produto.tipoRisco_Id==e.id);return e.percentualDisponivel=r.length>0?100-r.map(n=>n.percentual).reduce((n,l)=>n+l):100,e})}getRisco(e){return this.tipoRiscos.find(r=>r.id==e)}setChartProduto(e){let r=0,n=this.objeto.carteiraProdutoRel.map(v=>v.produto.tipoRisco);n=n.filter((v,U,W)=>U===W.findIndex(b=>b.id===v.id));var l=70;n.forEach(v=>l+=30),this.chartHeight=l+"px",this.optionsProduto={onClick:v=>{},indexAxis:"y",responsive:!0,plugins:{legend:{display:!1},tooltip:{backgroundColor:"rgba(0,0,0,0.95)",padding:{x:15,y:10},callbacks:{beforeTitle:v=>v[0].element.$context.raw.produto.tipoRisco?.nome,title:v=>"",afterTitle:v=>v[0].element.$context.raw.produto.descricao}}},scales:{xAxes:{stacked:!0,min:0,max:100,suggestedMax:100,scaleLabel:{display:!0},grid:{drawBorder:!1},ticks:{callback:function(v,U,W){return v+"%"}}},yAxes:{scaleLabel:{display:!0},stacked:!0,drawOnChartArea:n.length>0,drawBorder:n.length>0,display:n.length>0}},parsing:{yAxisKey:"produto.tipoRisco.nome",xAxisKey:"percentual"}},this.objeto.carteiraProdutoRel.sort((v,U)=>this.cmp(v.produto.tipoRisco_Id,U.produto.tipoRisco_Id)||this.cmp(v.percentual,U.percentual));let h=this.objeto.carteiraProdutoRel.map(v=>({type:"bar",axis:"y",label:`${v.produto.descricao}`,backgroundColor:P.O[r++],data:[v]}));this.dataProduto={datasets:h},this.chartProdutos&&this.chartProdutos.chart.update()}adicionarProduto(){if(null==this.produto)this.toastr.error("Selecione um produto para adicionar");else{let n={id:0,percentual:this.percentual,carteiraSetup_Id:0,produto:this.produto,produto_Id:this.produto?.id};var e=this.objeto.carteiraProdutoRel.findIndex(l=>l.produto_Id==this.produto?.id),r=this.objeto.carteiraProdutoRel.find(l=>l.produto_Id==this.produto?.id);r&&-1!=e?(n.id=r.id,this.objeto.carteiraProdutoRel.splice(e,1,n)):this.objeto.carteiraProdutoRel.push(n),this.objeto.carteiraProdutoRel.sort((l,h)=>this.cmp(l.produto.tipoRisco_Id,h.produto.tipoRisco_Id)||this.cmp(l.percentual,h.percentual)),this.calcularPercentuais(),this.setChartProduto("adicionarProduto"),this.setupService.setObject(this.objeto),delete this.produto,this.percentual=""}}removeProduto(e){let r=this.objeto.carteiraProdutoRel.findIndex(n=>n.id==e.id&&n.produto_Id==e.produto.id);-1!=r&&(this.objeto.carteiraProdutoRel.splice(r,1),this.setupService.setObject(this.objeto),this.setChartProduto("removeProduto"),this.calcularPercentuais())}validatePercentualRisco(){let e=!1,r=[];for(let n of this.objeto.carteiraProdutoRel){let l=r.findIndex(h=>h.tipoRisco_Id==n.produto.tipoRisco_Id);-1!=l?r[l].percentual+=n.percentual:r.push({id:0,carteiraSetup_Id:n.carteiraSetup_Id,tipoRisco:n.produto.tipoRisco,tipoRisco_Id:n.produto.tipoRisco_Id,percentual:n.percentual})}return this.erro=r.filter(n=>100!=n.percentual).map(n=>`A soma do percentual dos produtos para cada tipo de risco ${n.tipoRisco.nome} deve ser 100%.`),0==this.objeto.carteiraProdutoRel.length&&this.erro.push("Voc\xea deve selecionar pelo menos um produto"),this.erro.length>0&&(e=!0),e}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(u._W),t.Y36(c.P),t.Y36(g.m),t.Y36(d.gz),t.Y36(Z.A),t.Y36(R.V),t.Y36(d.F0),t.Y36(j.w))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-form-carteira-setup"]],viewQuery:function(e,r){if(1&e&&t.Gf(K,5),2&e){let n;t.iGM(n=t.CRH())&&(r.chartProdutos=n.first)}},hostBindings:function(e,r){1&e&&t.NdJ("resize",function(l){return r.onResize(l)},!1,t.Jf7)},inputs:{objeto:"objeto",loading:"loading",erro:"erro"},outputs:{sendData:"sendData"},features:[t.TTD],decls:67,vars:22,consts:[[1,"needs-validation",3,"ngSubmit"],["form","ngForm"],[1,"row","d-flex","flex-wrap","align-items-stretch","mb-2"],[1,"col-lg-4","col-md-4","col-sm-4","col-12"],[1,"col-12","d-flex","flex-wrap","mt-2"],[1,"col-xl-4","col-lg-5","col-md-5","col-sm-12","col-12","ps-0","pe-sm-2","pe-0"],[1,"card","card-body","mb-2"],[1,"form-row"],[1,"form-group","col-sm-12"],["for","carteiraSetup",1,"h6"],[1,"text-danger"],["type","text","name","nome","id","nome","placeholder","Digite para cadastrar nova carteira",1,"form-control","my-1",3,"ngModel","ngModelChange"],["nome","ngModel"],[1,"form-row","mt-2","mb-2"],[1,"d-flex","align-items-start","justify-content-start","flex-wrap","col-12"],[1,"h6","me-3","w-100"],["class","mx-2",4,"ngFor","ngForOf"],[1,"form-row","justify-content-center","flex-column"],[1,"form-group","col-lg-12","col-md-12","col-sm-12","col-12"],["for","produto"],["id","produto","name","produto","optionLabel","descricao","filterBy","descricao, tipoRisco.nome","placeholder","Selecione",1,"form-control","novalidate",3,"options","ngModel","filter","showClear","ngModelChange"],["_produto","ngModel"],["pTemplate","selectedItem"],["pTemplate","item"],[1,"mt-1","px-1"],["class","text-danger",4,"ngIf"],["for","percentual"],["type","text","id","percentual","name","percentual","mask","separator","thousandSeparator",".","decimalMarker",",","suffix","%",1,"form-control",3,"max","placeholder","disabled","ngModel","ngModelChange"],["_percentual","ngModel"],[1,"form-group","align-items-end","px-1"],["type","button",1,"btn","btn-grey","w-100",3,"disabled","click"],[1,"col-xl-8","col-lg-7","col-md-7","col-sm-12","col-12","px-0"],["type","verticalBar",3,"options","data","height"],["chartProdutos",""],["class","col-12 px-2",4,"ngIf"],[1,"d-flex","align-items-start","p-0","mt-3"],["class","m-0",4,"ngIf"],[1,"btn","btn-primary","mr-0","ml-auto",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],["campoObrigatorio",""],[1,"mx-2"],["type","radio","name","tipoRisco",1,"mr-1","mt-1",3,"id","ngModel","value","checked","ngModelChange"],["tipoRisco","ngModel"],[3,"for"],["class","country-item country-item-value",4,"ngIf"],[1,"country-item","country-item-value"],[1,"country-item"],[1,"col-12","px-2"],[1,"h6"],[1,"overflow-x-auto","w-100"],[1,"table","table-striped","table-borderless","table-editable"],[1,"bg-dark","text-white","font-weight-normal"],[1,"bg-dark","text-white","font-weight-normal",2,"width","80px"],[3,"selected",4,"ngFor","ngForOf"],[2,"width","80px"],["type","text","mask","separator","thousandSeparator",".","decimalMarker",",","suffix","%",1,"form-control",3,"id","name","max","placeholder","ngModel","ngModelChange","change"],[1,"td-action"],["type","button",1,"btn-trash","ml-auto","d-block","px-2","text-dark",3,"click"],[1,"d-md-none","d-block",3,"icon"],[1,"d-md-block","d-none","btn","btn-dark"],[1,"m-0"],["class","text-red",4,"ngFor","ngForOf"],["class","text-red",4,"ngIf"],[1,"text-red"],[1,"spinner-border","spinner-border-sm","mr-1"],[1,"py-3","px-4"]],template:function(e,r){if(1&e){const n=t.EpF();t.TgZ(0,"form",0,1),t.NdJ("ngSubmit",function(){t.CHM(n);const h=t.MAs(1);return t.KtG(r.send(h))}),t.TgZ(2,"div",2),t._UZ(3,"div",3),t.TgZ(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"label",9),t._uU(10,"Nome: "),t.TgZ(11,"span",10),t._uU(12,"*"),t.qZA()(),t.TgZ(13,"div")(14,"input",11,12),t.NdJ("ngModelChange",function(h){return r.objeto.nome=h}),t.qZA()()()()(),t.TgZ(16,"div",6)(17,"div",13)(18,"div",14)(19,"p",15),t._uU(20,"Selecione o Risco"),t.qZA(),t.YNc(21,J,5,6,"div",16),t.qZA()(),t.TgZ(22,"div",17)(23,"div",18)(24,"label",19),t._uU(25,"Produto: "),t.TgZ(26,"span",10),t._uU(27,"*"),t.qZA()(),t.TgZ(28,"p-dropdown",20,21),t.NdJ("ngModelChange",function(h){return r.produto=h}),t.YNc(30,w,1,1,"ng-template",22),t.YNc(31,Y,8,2,"ng-template",23),t.qZA(),t.TgZ(32,"div",24),t.YNc(33,Q,2,0,"p",25),t.YNc(34,k,2,1,"p",25),t.qZA()(),t.TgZ(35,"div",18)(36,"label",26),t._uU(37,"Percentual: "),t.TgZ(38,"span",10),t._uU(39,"*"),t.qZA()(),t.TgZ(40,"input",27,28),t.NdJ("ngModelChange",function(h){return r.percentual=h}),t.qZA(),t.TgZ(42,"div",24),t.YNc(43,G,2,0,"p",25),t.YNc(44,z,2,1,"p",25),t.qZA()(),t.TgZ(45,"div",29)(46,"button",30),t.NdJ("click",function(){return r.adicionarProduto()}),t._uU(47," Adicionar "),t.qZA()()()()(),t.TgZ(48,"div",31)(49,"div",6)(50,"div")(51,"h6"),t._uU(52,"Divis\xe3o da carteira: "),t.TgZ(53,"span",10),t._uU(54,"*"),t.qZA()()(),t.TgZ(55,"div"),t._UZ(56,"p-chart",32,33),t.qZA()(),t.TgZ(58,"div",6),t.YNc(59,V,19,1,"div",34),t.qZA()()()(),t.TgZ(60,"div",35),t.YNc(61,q,3,2,"div",36),t.TgZ(62,"button",37),t.YNc(63,tt,1,0,"span",38),t._uU(64," Salvar "),t.qZA()()(),t.YNc(65,et,2,0,"ng-template",null,39,t.W1O)}if(2&e){const n=t.MAs(1),l=t.MAs(41);t.xp6(14),t.Q6J("ngModel",r.objeto.nome),t.xp6(7),t.Q6J("ngForOf",r.tipoRiscos),t.xp6(7),t.Q6J("options",r.produtos)("ngModel",r.produto)("filter",!0)("showClear",!0),t.xp6(5),t.Q6J("ngIf",null==r.selectedRisco),t.xp6(1),t.Q6J("ngIf",null!=r.selectedRisco&&0==r.produtos.length),t.xp6(6),t.Q6J("max",r.selectedRisco.percentualDisponivel)("placeholder",r.selectedRisco.percentualDisponivel+"% dispon\xedvel")("disabled",null==r.produto)("ngModel",r.percentual),t.xp6(3),t.Q6J("ngIf",l.touched&&""==l.value),t.xp6(1),t.Q6J("ngIf",r.percentual>r.selectedRisco.percentualDisponivel),t.xp6(2),t.Q6J("disabled",null==r.produto||""==r.percentual.toString()||r.percentual>r.selectedRisco.percentualDisponivel),t.xp6(10),t.Q6J("options",r.optionsProduto)("data",r.dataProduto)("height",r.chartHeight),t.xp6(3),t.Q6J("ngIf",r.objeto.carteiraProdutoRel.length>0),t.xp6(2),t.Q6J("ngIf",r.erro||n.invalid),t.xp6(1),t.Q6J("disabled",n.invalid||r.loading||r.validatePercentualRisco()),t.xp6(1),t.Q6J("ngIf",r.loading)}},dependencies:[p.sg,p.O5,f._Y,f.Fj,f._,f.JJ,f.JL,f.On,f.F,I.BN,M.jx,x.hx,L.Lt,B.C],styles:['.cdk-drop-list[_ngcontent-%COMP%]{position:relative;min-height:300px}.cdk-drop-list.cdkDrag[_ngcontent-%COMP%]:after{content:"";position:absolute;top:50%;left:50%;width:calc(100% - 10px);height:calc(100% - 10px);transform:translate(-50%,-50%);color:#00000073;font-size:18px;display:flex;align-items:center;justify-content:center;z-index:0}.cdk-drop-list.cdkDrag.empty[_ngcontent-%COMP%]:after{content:"Solte aqui para selecionar";border:1px #0000007a dashed}.cdk-drop-list.cdkDrag.empty[_ngcontent-%COMP%]:hover:after{border:1px #00000096 dashed;color:#00000096}.cdk-drag[_ngcontent-%COMP%]{position:relative;z-index:1;margin:0}.fade-in-right[_ngcontent-%COMP%]{animation:fade-in-right .5s forwards}.fade-out-left[_ngcontent-%COMP%]{animation:fade-out-left .5s forwards}.form-group[_ngcontent-%COMP%]{transition:.5s}@keyframes fade-in-right{0%{opacity:0;visibility:hidden;display:none;transform:translate(-100%)}20%{display:block}to{opacity:1;visibility:visible;transform:translate(0)}}@keyframes fade-out-left{0%{opacity:1;visibility:visible;transform:translate(0);display:block}20%{display:none}to{opacity:0;visibility:hidden;transform:translate(-100%)}}.data-view[_ngcontent-%COMP%]{background:linear-gradient(90deg,var(--grey-light) 50%,#ffffff 50%);border-radius:3px;background-size:200%;background-position:250%;display:flex;align-self:flex-start;position:relative;transition:.3s}.data-view[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{margin:0;padding:5px 10px;background-color:transparent;border-radius:3px}.data-view[_ngcontent-%COMP%]   .btn.active[_ngcontent-%COMP%], .data-view[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:first-child{color:#fff}.data-view[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child{border-radius:0 3px 3px 0;border-color:#595c5f;border-left:none}.data-view.right[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child{color:#fff}.data-view.right[_ngcontent-%COMP%]{transition:.3s;background-position:153%}.data-view.right[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:first-child{border:1px #8f8f8f solid;border-right:none;border-radius:3px 0 0 3px}.data-view.right[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:first-child{color:#212529;transition:.3s color}.mat-option[_ngcontent-%COMP%]{height:auto!important;padding:9px 11px!important;line-height:1!important}.mat-option-text[_ngcontent-%COMP%]{font-size:14px!important}.td-action[_ngcontent-%COMP%]{position:sticky;right:0}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-of-type(odd)   .td-action[_ngcontent-%COMP%]{background-color:#f3f3f3}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-of-type(even)   .td-action[_ngcontent-%COMP%]{background-color:#fff}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected[_ngcontent-%COMP%]:nth-of-type(even)   .td-action[_ngcontent-%COMP%]{background-color:#b9c8f3}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.selected[_ngcontent-%COMP%]:nth-of-type(odd)   .td-action[_ngcontent-%COMP%]{background-color:#bcc9f1}']}),a})()}}]);