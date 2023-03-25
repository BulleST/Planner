"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[26],{6025:(M,c,r)=>{r.d(c,{T7:()=>D,Wj:()=>f});var a=r(655),l=r(43),n=r(805),o=r(1956);class f{constructor(){this.id=0,this.nome="",this.empresa_Id=0,this.carteiraProdutoRel=[],this.carteiraRiscoRel=[],this.registroNaoSalvo=!1}}(0,a.gn)([(0,l.Vp)(),(0,a.w6)("design:type",Boolean)],f.prototype,"ativo",void 0),(0,a.gn)([(0,l.Vp)(),(0,a.w6)("design:type",Boolean)],f.prototype,"registroNaoSalvo",void 0);class E{constructor(){this.id=0,this.nome="",this.empresa_Id=0,this.carteiraProdutoRel=[],this.registroNaoSalvo=!1}}(0,a.gn)([(0,l.Vp)(),(0,a.w6)("design:type",Boolean)],E.prototype,"ativo",void 0),(0,a.gn)([(0,l.Vp)(),(0,a.w6)("design:type",Boolean)],E.prototype,"registroNaoSalvo",void 0);var D=[{field:"id",header:"Id",maskType:o.O.undefined,filterType:o.vA.text,filterDisplay:o.w2.menu,filterShowMatchMode:!0},{field:"nome",header:"Carteira",maskType:o.O.undefined,filterType:o.vA.text,filterDisplay:o.w2.menu,filterShowMatchMode:!0},{field:"ativo",header:"Ativo",maskType:o.O.boolean,filterType:o.vA.text,filterDisplay:o.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,filterMatchMode:n.a6.CONTAINS,booleanValues:{true:"ativo",false:"inativo"}}]},6886:(M,c,r)=>{r.d(c,{Dw:()=>P,a7:()=>m});var a=r(655),l=r(43),n=r(805),o=r(1956),f=r(1442),E=r(5669),D=r(316);class m{constructor(){this.id=void 0,this.descricao="",this.empresa_Id=void 0,this.tipoAtivo_Id=void 0,this.tipoAtivo=new f.m,this.tipoRisco_Id=void 0,this.tipoRisco=new D.p,this.tipoLiquidez_Id=void 0,this.tipoLiquidez=new E.T,this.registroNaoSalvo=!1}}(0,a.gn)([(0,l.Vp)(),(0,a.w6)("design:type",Boolean)],m.prototype,"registroNaoSalvo",void 0);var P=[{field:"id",header:"Id",maskType:o.O.undefined,filterType:o.vA.text,filterDisplay:o.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,filterMatchMode:n.a6.CONTAINS},{field:"descricao",header:"Nome",maskType:o.O.undefined,filterType:o.vA.text,filterDisplay:o.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,filterMatchMode:n.a6.CONTAINS},{field:"tipoAtivo.nome",header:"Ativo",maskType:o.O.undefined,filterType:o.vA.text,filterDisplay:o.w2.menu,filterShowAddButton:!0,filterShowMatchMode:!0,filterMatchMode:n.a6.CONTAINS},{field:"tipoRisco.nome",header:"Risco",maskType:o.O.undefined,filterType:o.vA.text,filterDisplay:o.w2.menu,filterShowAddButton:!0,filterShowMatchMode:!0,filterMatchMode:n.a6.CONTAINS},{field:"tipoLiquidez.nome",header:"Liquidez",maskType:o.O.undefined,filterType:o.vA.text,filterDisplay:o.w2.menu,filterShowAddButton:!0,filterShowMatchMode:!0,filterMatchMode:n.a6.CONTAINS},{field:"ativo",header:"Ativo",maskType:o.O.boolean,filterType:o.vA.text,filterDisplay:o.w2.menu,filterShowAddButton:!1,filterShowMatchMode:!1,filterMatchMode:n.a6.CONTAINS,booleanValues:{true:"ativo",false:"inativo"}}]},1442:(M,c,r)=>{r.d(c,{m:()=>a});class a{constructor(){this.id=void 0,this.nome=""}}},5669:(M,c,r)=>{r.d(c,{T:()=>a});class a{constructor(){this.id=void 0,this.nome=""}}},316:(M,c,r)=>{r.d(c,{p:()=>n});var a=r(655),l=r(43);class n{constructor(){this.id=void 0,this.nome="",this.percentualDisponivel=0}}(0,a.gn)([(0,l.Vp)(),(0,a.w6)("design:type",Number)],n.prototype,"percentualDisponivel",void 0)},9885:(M,c,r)=>{r.d(c,{m:()=>C});var a=r(1135),l=r(4004),n=r(9243),o=r(2340),f=r(9535),E=r(9398),D=r(8913),m=r(46),R=r(6886),P=r(1685),A=r(9876),v=r(4409),_=r(4650),T=r(8627),g=r(529),O=r(7185);let C=(()=>{class e{constructor(t,s,d,u,h,S,I,p){this.router=t,this.table=s,this.http=d,this.toastr=u,this.crypto=h,this.dropdownService=S,this.empresaService=I,this.accountService=p,this.url=o.N.url,this.list=new a.X([]),this.objeto=new a.X(void 0),this.carteiraSetup=new a.X([]),this.empresa=new E.oW,this.account=new P.mR,this.empresaService.empresa.subscribe(L=>this.empresa=L),this.accountService.account.subscribe(L=>this.account=L??new P.mR)}getObject(){var t=localStorage.getItem("produto");return t&&this.setObject(this.crypto.decrypt(t)??new R.a7),this.objeto}setObject(t){localStorage.setItem("produto",this.crypto.encrypt(t)??""),this.objeto.next(t)}add_To_Empresa_List(t){if(this.empresa){var s=this.empresa.produto??[];let u=this.dropdownService.tipoAtivo.value.find(p=>p.id==t.tipoAtivo_Id);if(!u)return this.toastr.error("Selecione um tipo de ativo v\xe1lido!!"),!1;t.tipoAtivo=u;let h=this.dropdownService.tipoRisco.value.find(p=>p.id==t.tipoRisco_Id);if(!h)return this.toastr.error("Selecione um tipo de risco v\xe1lido!!"),!1;t.tipoRisco=h;let S=this.dropdownService.tipoLiquidez.value.find(p=>p.id==t.tipoLiquidez_Id);if(!S)return this.toastr.error("Selecione um tipo de liquidez v\xe1lido!!"),!1;t.tipoLiquidez=S,s.sort((p,L)=>p.id-L.id);var d=0==s.length?0:s[s.length-1].id;t.id=++d,t.registroNaoSalvo=!0;let I=Object.assign({},t);return s.push(I),this.empresa.produto=s,this.empresaService.setObject(this.empresa,"add_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0}return this.toastr.error("Nenhuma empresa selecionada."),!1}edit_To_Empresa_List(t){if(this.empresa){var s=this.empresa.produto??[];let d=s.findIndex(u=>u.id==t.id);if(-1!=d){let u=this.dropdownService.tipoAtivo.value.find(p=>p.id==t.tipoAtivo_Id);if(!u)return this.toastr.error("Selecione um tipo de ativo v\xe1lido!!"),!1;t.tipoAtivo=u;let h=this.dropdownService.tipoRisco.value.find(p=>p.id==t.tipoRisco_Id);if(!h)return this.toastr.error("Selecione um tipo de risco v\xe1lido!!"),!1;t.tipoRisco=h;let S=this.dropdownService.tipoLiquidez.value.find(p=>p.id==t.tipoLiquidez_Id);if(!S)return this.toastr.error("Selecione um tipo de liquidez v\xe1lido!!"),!1;t.tipoLiquidez=S;let I=Object.assign({},t);return s.splice(d,1,I),this.empresa.produto=s,this.empresaService.setObject(this.empresa,"edit_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),!0}return this.toastr.error("Produto n\xe3o encontrado!!"),!1}return this.toastr.error("Nenhuma empresa selecionada."),!1}delete_To_Empresa_List(t){if(this.empresa){var s=this.empresa.produto??[];let d=s.findIndex(u=>u.id==t);return-1!=d?(s.splice(d,1),this.empresa.produto=s,this.empresaService.setObject(this.empresa,"delete_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0):(this.toastr.error("Produto n\xe3o encontrado!!"),!1)}return this.toastr.error("Nenhuma empresa selecionada."),!1}getList(t){return this.http.get(`${this.url}/produto/all/${t=t??(this.account.perfilAcesso_Id!=v.u.Admin?this.account.empresa_Id:this.empresa.id)}`).pipe((0,l.U)(s=>(s=s.map(d=>(d.ativo=!d.dataDesativado,d)),this.list.next(s),s)))}get(t){return this.http.get(`${this.url}/produto/${t}`)}create(t){return this.http.post(`${this.url}/produto/${this.account.perfilAcesso_Id!=v.u.Admin?this.account.empresa_Id:this.empresa.id}`,t)}edit(t){return this.http.put(`${this.url}/produto/`,t)}deactivated(t,s){return this.http.patch(`${this.url}/produto/${t}/${s}`,{})}delete(t){return this.http.delete(`${this.url}/produto/${t}`)}}return e.\u0275fac=function(t){return new(t||e)(_.LFG(T.F0),_.LFG(m.i),_.LFG(g.eN),_.LFG(O._W),_.LFG(n.w),_.LFG(f.V),_.LFG(D.P),_.LFG(A.B))},e.\u0275prov=_.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},9205:(M,c,r)=>{r.d(c,{A:()=>g});var a=r(1135),l=r(4004),n=r(9243),o=r(2340),f=r(9398),E=r(8913),D=r(46),m=r(6025),R=r(4409),P=r(1685),A=r(9876),v=r(4650),_=r(529),T=r(7185);let g=(()=>{class O{constructor(e,i,t,s,d,u){this.table=e,this.http=i,this.toastr=t,this.crypto=s,this.empresaService=d,this.accountService=u,this.url=o.N.url,this.list=new a.X([]),this.objeto=new a.X(new m.Wj),this.empresa=new f.oW,this.account=new P.mR,this.empresaService.empresa.subscribe(h=>this.empresa=h),this.accountService.account.subscribe(h=>this.account=h??new P.mR)}getObject(){let e=localStorage.getItem("setup");if(e){let i=this.crypto.decrypt(e);i.carteiraRiscoRel=i.carteiraRiscoRel&&i.carteiraRiscoRel.length?i.carteiraRiscoRel:[],i.carteiraProdutoRel=i.carteiraProdutoRel&&i.carteiraProdutoRel.length?i.carteiraProdutoRel:[],i.ativo=null==i.dataDesativado||null==i.dataDesativado||!i.dataDesativado||!i.dataDesativado.trim(),this.objeto.next(i)}else this.setObject(new m.Wj);return this.objeto}setObject(e){e.ativo=null==e.dataDesativado||null==e.dataDesativado||!e.dataDesativado||!e.dataDesativado.toString().trim(),e.carteiraRiscoRel=e.carteiraRiscoRel&&e.carteiraRiscoRel.length?e.carteiraRiscoRel:[],e.carteiraProdutoRel=e.carteiraProdutoRel&&e.carteiraProdutoRel.length?e.carteiraProdutoRel:[],localStorage.setItem("setup",this.crypto.encrypt(e)??""),this.objeto.next(e)}add_To_Empresa_List(e){if(this.empresa){if(this.empresa.carteiraSetup.find(s=>s.nome.toLowerCase()==e.nome.toLowerCase()&&s.id!=e.id&&s.empresa_Id==e.empresa_Id))return this.toastr.error("Setup j\xe1 cadastrado nessa empresa."),!1;if(0==e.carteiraProdutoRel.length)return this.toastr.error("Insira produtos nesse setup."),!1;e.carteiraProdutoRel.map(s=>(s.carteiraSetup_Id=0,s)),this.empresa.carteiraSetup.sort((s,d)=>d.id-d.id);let t=this.empresa.carteiraSetup.length>0?this.empresa.carteiraSetup[this.empresa.carteiraSetup.length-1].id:0;return e.id=++t,e.ativo=!0,e.registroNaoSalvo=!0,this.empresa.carteiraSetup.push(e),this.empresaService.setObject(this.empresa,"add_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0}return this.toastr.error("Nenhuma empresa selecionada."),!1}edit_To_Empresa_List(e){if(this.empresa){let t=this.empresa.carteiraSetup.findIndex(d=>d.id==e.id);if(-1==t)return this.toastr.error("Setup n\xe3o encontrado."),!1;if(this.empresa.carteiraSetup.find(d=>d.nome.toLowerCase()==e.nome.toLowerCase()&&d.id!=e.id&&d.empresa_Id==e.empresa_Id))return this.toastr.error("Setup j\xe1 cadastrado nessa empresa."),!1;if(0==e.carteiraProdutoRel.length)return this.toastr.error("Insira produtos nesse setup."),!1;if(0==e.id){this.empresa.carteiraSetup.sort((u,h)=>h.id-h.id);let d=this.empresa.carteiraSetup.length>0?this.empresa.carteiraSetup[this.empresa.carteiraSetup.length-1].id:0;e.id=++d}e.ativo=!0;var i=this.empresa.carteiraSetup??[];return i.splice(t,1,e),this.empresa.carteiraSetup=i,this.empresaService.setObject(this.empresa,"edit_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0}return this.toastr.error("Nenhuma empresa selecionada."),!1}delete_To_Empresa_List(e){let i=this.empresa.carteiraSetup.findIndex(t=>t.id==e);return-1==i?(this.toastr.error("Registro n\xe3o encontrado!!"),!1):(this.empresa.carteiraSetup.splice(i,1),this.empresaService.setObject(this.empresa,"delete_To_Empresa_List"),this.toastr.success("Opera\xe7\xe3o conclu\xedda"),this.table.resetSelection(),!0)}excluirRisco(e){let i=this.getObject().value,t=i.carteiraRiscoRel.findIndex(s=>s.tipoRisco_Id==e.tipoRisco_Id);t&&(i.carteiraRiscoRel.splice(t,1),this.setObject(i))}getList(e){return this.http.get(`${this.url}/carteiraSetup/all/${e=e??(this.account.perfilAcesso_Id!=R.u.Admin?this.account.empresa_Id:this.empresa.id)}`).pipe((0,l.U)(i=>(i=i.map(t=>(t.ativo=null==t.dataDesativado,t)),this.list.next(i),i)))}get(e){return this.http.get(`${this.url}/carteiraSetup/${e}`).pipe((0,l.U)(i=>(this.setObject(i),i.ativo=null==i.dataDesativado,i)))}create(e){return this.http.post(`${this.url}/carteiraSetup/${this.account.perfilAcesso_Id!=R.u.Admin?this.account.empresa_Id:this.empresa.id}`,e)}edit(e){return this.http.put(`${this.url}/carteiraSetup/`,e)}deactivated(e,i){return this.http.patch(`${this.url}/carteiraSetup/${e}/${i}`,{})}delete(e){return this.http.delete(`${this.url}/carteiraSetup/${e}`)}}return O.\u0275fac=function(e){return new(e||O)(v.LFG(D.i),v.LFG(_.eN),v.LFG(T._W),v.LFG(n.w),v.LFG(E.P),v.LFG(A.B))},O.\u0275prov=v.Yz7({token:O,factory:O.\u0275fac,providedIn:"root"}),O})()},4551:(M,c,r)=>{r.d(c,{O:()=>l,w:()=>a});var a=(()=>{return(n=a||(a={})).primary="#3c86a0",n.primaryLight="#4a99b5",n.primaryDark="#146e8d",n.dark="#000",n.grey="#181818",n.greyLight="#ececed",a;var n})();let l=["#FF6F91","#FF9671","#C34A36","#008F7A","#F9F871","#845EC2","#2C73D2","#B0A8B9","#D65DB1","#008E9B","#4B4453","#0089BA","#FFC75F","#845EC2","#FF8066","#0081CF"]}}]);