"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[257],{7257:(S,y,a)=>{a.r(y),a.d(y,{LoggedInModule:()=>yn});var n=a(4650),h=a(6895),d=a(8627),g=a(9876),Z=a(7185);let f=(()=>{class e{constructor(t,o,l){this.accountService=t,this.router=o,this.toastr=l}canActivate(t,o){let l=this.accountService.accountValue;return l?!(t.data.roles&&!t.data.roles.includes(l?.role)&&(this.toastr.error("Acesso n\xe3o autorizado.1"),this.router.navigate([""]),1)):(this.toastr.error("Acesso n\xe3o autorizado. "),this.toastr.error("Fa\xe7a login. "),this.router.navigate(["account","login"],{queryParams:{returnUrl:o.url}}),!1)}}return e.\u0275fac=function(t){return new(t||e)(n.LFG(g.B),n.LFG(d.F0),n.LFG(Z._W))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var c=a(4409),_=a(1135),v=a(8259),A=a(9243),U=a(46);let b=(()=>{class e{constructor(t,o){this.crypto=t,this.table=o,this.open=new _.X(!1),this.menuHeaderOpen=new _.X(!1)}get aside(){var t=!!localStorage.getItem("navigation")&&this.crypto.decrypt(localStorage.getItem("navigation"));return this.setMenuAside(t),this.open.value}toggleMenuAside(){this.setMenuAside(!this.open.value)}setMenuAside(t){var o=this.crypto.encrypt(t)??"";localStorage.setItem("navigation",o),this.open.next(t)}toggleMenuHeader(){this.menuHeaderOpen.next(!this.menuHeaderOpen.value)}openMenuHeader(){this.menuHeaderOpen.next(!0)}closeMenuHeader(){this.menuHeaderOpen.next(!1)}clickOut(){var t=this;v("body").on("click",function(o){t.setMenuAside(!1),t.closeMenuHeader()}),v(".header__userLogado").on("click",function(o){o.stopPropagation()}),v(".navigation__toggle").on("click",function(o){o.stopPropagation()}),v(".aside").on("click",function(o){o.stopPropagation()})}}return e.\u0275fac=function(t){return new(t||e)(n.LFG(A.w),n.LFG(U.i))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})(),T=(()=>{class e{constructor(t){this.crypto=t,this.ativado=new _.X(!1)}toggle(){this.setAtivado(!this.ativado.value)}setAtivado(t){this.ativado.next(t);var o=this.crypto.encrypt(this.ativado.value);null!=o?localStorage.setItem("dark-mode",o):localStorage.removeItem("dark-mode")}getAtivado(){var t=localStorage.getItem("dark-mode");if(t){var o=this.crypto.decrypt(t);null!=o&&this.setAtivado(o)}return this.ativado}}return e.\u0275fac=function(t){return new(t||e)(n.LFG(A.w))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var L=a(7549),I=a(5861),p=a(801),J=a(8913),x=a(3868);const Q=function(){return["my-account"]};let N=(()=>{class e{constructor(t,o,l,s){var r=this;this.modoEscuro=t,this.accountService=o,this.header=l,this.empresaService=s,this.Role=c.u,this.faSignOut=p.HEx,this.faIdCard=p.Ukp,this.faKey=p.DD4,this.faUser=p.ILF,this.modoEscuroAtivado=!1,this.userLogadoOpen=!1,this.nomeAbreviado="",this.perfil="",this.modoEscuro.getAtivado().subscribe(u=>this.modoEscuroAtivado=u),this.header.menuHeaderOpen.subscribe(u=>this.userLogadoOpen=u),this.accountService.account.subscribe(function(){var u=(0,I.Z)(function*(M){if(r.userLogado=M,M){r.perfil=c.u[M.perfilAcesso_Id];let C=M?.name.split(" ");r.nomeAbreviado=1==C.length?C[0]:C[0]+" "+C[C.length-1]}});return function(M){return u.apply(this,arguments)}}())}ngOnInit(){}toggleMenuHeader(){this.header.toggleMenuHeader()}sair(){this.accountService.logout()}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(T),n.Y36(g.B),n.Y36(b),n.Y36(J.P))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-header"]],decls:25,vars:14,consts:[[1,"header"],[1,"header-logo"],["src","assets/img/logo-planner.png","alt","Logo Planner"],[1,"header__userLogado","ml-auto"],[1,"header__userLogado-content",3,"click"],[1,"header__userLogado-img"],[3,"icon"],[1,"header__userLogado-text"],[1,"header__userLogado-submenu"],[1,"header__userLogado-submenu-link"],[1,"header__userLogado-submenu-link",3,"routerLink"],[2,"margin-right","8px"],[1,"header__userLogado-submenu-link",3,"click"]],template:function(t,o){1&t&&(n.TgZ(0,"header",0)(1,"div",1),n._UZ(2,"img",2),n.qZA(),n.TgZ(3,"div",3)(4,"div",4),n.NdJ("click",function(){return o.toggleMenuHeader()}),n.TgZ(5,"div",5),n._UZ(6,"fa-icon",6),n.qZA(),n.TgZ(7,"div",7)(8,"p"),n._uU(9),n.qZA(),n.TgZ(10,"p"),n._uU(11),n.qZA(),n.TgZ(12,"p"),n._uU(13),n.qZA()()()()(),n.TgZ(14,"div",8)(15,"p",9),n._uU(16,"Welcome"),n.qZA(),n.TgZ(17,"a",10)(18,"span",11),n._UZ(19,"fa-icon",6),n.qZA(),n._uU(20," Meus dados "),n.qZA(),n.TgZ(21,"a",12),n.NdJ("click",function(){return o.sair()}),n.TgZ(22,"span",11),n._UZ(23,"fa-icon",6),n.qZA(),n._uU(24," Sair "),n.qZA()()),2&t&&(n.ekj("dark",o.modoEscuroAtivado),n.xp6(4),n.ekj("header__userLogado-submenu--open",o.userLogadoOpen),n.xp6(2),n.Q6J("icon",o.faUser),n.xp6(3),n.Oqu(o.nomeAbreviado),n.xp6(2),n.Oqu(null==o.userLogado?null:o.userLogado.email),n.xp6(2),n.Oqu(o.perfil),n.xp6(1),n.ekj("header__userLogado-submenu--open",o.userLogadoOpen),n.xp6(3),n.Q6J("routerLink",n.DdM(13,Q)),n.xp6(2),n.Q6J("icon",o.faIdCard),n.xp6(4),n.Q6J("icon",o.faSignOut))},dependencies:[d.yS,x.BN],styles:[".header[_ngcontent-%COMP%]{height:50px;position:sticky;top:0;left:0;width:100%;background-color:#fff;background-color:var(--primary);box-shadow:2px 2px 2px #0000000d;display:flex;align-items:center;justify-content:space-between;margin-top:0;margin-bottom:10px}.header-logo[_ngcontent-%COMP%]{height:100%;overflow:hidden;padding:5px 5px 5px 50px;z-index:-1;display:flex}.header-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:80%;width:auto;margin:auto 0;display:block}.header__userLogado[_ngcontent-%COMP%]{height:100%;position:relative;display:flex;justify-content:center;width:auto;right:20px;max-width:100%}.header__userLogado-content[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100%;padding:0 25px 0 30px;box-sizing:border-box;background-color:#fff;background-color:var(--primary);z-index:2;position:relative;cursor:pointer;margin:auto 0;transition:.3s;border:none}.header__userLogado-content[_ngcontent-%COMP%]:hover{background-color:#f5f5f5;background-color:var(--primary-dark)}.header__userLogado-content.header__userLogado-submenu--open[_ngcontent-%COMP%]{border:1px #d2d2d2 solid;border-color:var(--primary);background-color:var(--primary-dark);border-top:none;border-bottom:none;height:100%}.header__userLogado-img[_ngcontent-%COMP%]{width:25px;height:25px;background-size:cover;background-position:center;border-radius:50%;border:1px #c7c6c6 solid;background-color:#fff;cursor:pointer;margin-left:-15px;display:flex;align-items:center;justify-content:center;color:var(--primary)}.header__userLogado-img[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{color:var(--primary)}.header__userLogado-text[_ngcontent-%COMP%]{margin-left:10px;cursor:pointer}.header__userLogado-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#fafcff;cursor:pointer;line-height:1.2;font-size:12px;font-weight:100;letter-spacing:.4px;font-family:Light}.header__userLogado-submenu[_ngcontent-%COMP%]{position:absolute;top:0%;left:auto;right:0vw;transform:translateY(-100%);width:200px;border:1px #d2d2d2 solid;border-top:0;border-radius:0 0 3px 3px;display:flex;flex-flow:column;align-items:stretch;padding:5px 0;opacity:0;z-index:-1;visibility:hidden;transition:.3s;background-color:#fff}.header__userLogado-submenu.header__userLogado-submenu--open[_ngcontent-%COMP%]{transform:translate(0);opacity:1;visibility:visible;transition:.3s;top:100%}p.header__userLogado-submenu-link[_ngcontent-%COMP%]{font-weight:700}.header__userLogado-submenu-link[_ngcontent-%COMP%]{padding:4px 15px;font-size:11px;font-family:Regular;color:#888;text-transform:uppercase;cursor:pointer;text-decoration:none}.header__userLogado-submenu-link[_ngcontent-%COMP%]:not(p):hover{background-color:#cdcdcd70}.header__nav[_ngcontent-%COMP%]{height:100%;display:flex}.header__nav-link[_ngcontent-%COMP%]{display:flex;align-items:center;padding:5px 1vw;text-decoration:none;color:#fbf9f9;transition:.3s}.header__nav-link[_ngcontent-%COMP%]:hover{background:#00000026}.dropdown-empresas[_ngcontent-%COMP%]{background-color:#484848;color:#fff}.dropdown-empresas[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{color:#484848;background:#fff}"]}),e})(),Y=(()=>{class e{constructor(t){this.modoEscuro=t,this.modoEscuroAtivado=!1,this.modoEscuro.getAtivado().subscribe(o=>this.modoEscuroAtivado=o)}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(T))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-footer"]],decls:3,vars:2,consts:[[1,"footer"],[1,"text-center"]],template:function(t,o){1&t&&(n.TgZ(0,"div",0)(1,"p",1),n._uU(2,"Copyright 2022"),n.qZA()()),2&t&&n.ekj("dark",o.modoEscuroAtivado)},styles:[".footer[_ngcontent-%COMP%]{height:26px;background:#100f0f;margin-top:auto;width:100vw;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px}.footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff;font-size:13px}"]}),e})();const j=function(e){return["minha-empresa",e]};function F(e,i){if(1&e&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"fa-icon",10),n.qZA(),n._uU(3," Minha empresa "),n.qZA()),2&e){const t=n.oxw();n.Q6J("routerLink",n.VKq(2,j,null==t.account||null==t.account.empresa?null:t.account.empresa.nome)),n.xp6(2),n.Q6J("icon",t.faIdCard)}}const w=function(){return["empresas"]};function H(e,i){if(1&e&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"fa-icon",10),n.qZA(),n._uU(3," Empresas "),n.qZA()),2&e){const t=n.oxw();n.Q6J("routerLink",n.DdM(2,w)),n.xp6(2),n.Q6J("icon",t.faCity)}}const z=function(){return["clientes"]};function q(e,i){1&e&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"i",11),n.qZA(),n._uU(3," Clientes "),n.qZA()),2&e&&n.Q6J("routerLink",n.DdM(1,z))}const R=function(){return["produtos"]};function B(e,i){if(1&e&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"fa-icon",10),n.qZA(),n._uU(3," Produtos "),n.qZA()),2&e){const t=n.oxw();n.Q6J("routerLink",n.DdM(2,R)),n.xp6(2),n.Q6J("icon",t.faHandHoldingDollar)}}const D=function(){return["carteira-setup"]};function V(e,i){1&e&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"i",11),n.qZA(),n._uU(3," Setup "),n.qZA()),2&e&&n.Q6J("routerLink",n.DdM(1,D))}const G=function(){return["usuarios"]};function K(e,i){if(1&e&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"fa-icon",10),n.qZA(),n._uU(3," Usu\xe1rios "),n.qZA()),2&e){const t=n.oxw();n.Q6J("routerLink",n.DdM(2,G)),n.xp6(2),n.Q6J("icon",t.faUsers)}}let X=(()=>{class e{constructor(t,o){var l=this;this.header=t,this.accountService=o,this.Role=c.u,this.faHandHoldingDollar=p.VPG,this.faUsers=p.FVb,this.faPercent=p.jGC,this.faCity=p.SBo,this.faIdCard=p.Ukp,this.menuOpen=!1,this.menuOpen=this.header.aside,this.header.open.subscribe(s=>this.menuOpen=s),this.accountService.account.subscribe(function(){var s=(0,I.Z)(function*(r){l.account=r});return function(r){return s.apply(this,arguments)}}())}ngOnInit(){}toggleAside(){this.header.toggleMenuAside()}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(b),n.Y36(g.B))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-navigation"]],decls:17,vars:8,consts:[[1,"navigation"],[1,"navigation__toggle-content"],[1,"navigation__toggle",3,"click"],[1,"navigation__content"],[1,"navigation__logo"],["src","assets/img/logo-planner.png","alt","Logo Planner"],[1,"navigation__links"],["class","navigation__links-item",3,"routerLink",4,"ngIf"],[1,"navigation__links-item",3,"routerLink"],[1,"navigation__item-icon"],[3,"icon"],[1,"pi","pi-wallet"]],template:function(t,o){1&t&&(n.TgZ(0,"aside",0)(1,"div",1)(2,"button",2),n.NdJ("click",function(){return o.toggleAside()}),n._UZ(3,"span")(4,"span")(5,"span"),n.qZA()(),n.TgZ(6,"div",3)(7,"div",4),n._UZ(8,"img",5)(9,"hr"),n.qZA(),n.TgZ(10,"div",6),n.YNc(11,F,4,4,"a",7),n.YNc(12,H,4,3,"a",7),n.YNc(13,q,4,2,"a",7),n.YNc(14,B,4,3,"a",7),n.YNc(15,V,4,2,"a",7),n.YNc(16,K,4,3,"a",7),n.qZA()()()),2&t&&(n.ekj("open",o.menuOpen),n.xp6(11),n.Q6J("ngIf",(null==o.account?null:o.account.role)==o.Role.Master||(null==o.account?null:o.account.role)==o.Role.Backoffice),n.xp6(1),n.Q6J("ngIf",(null==o.account?null:o.account.role)==o.Role.Admin),n.xp6(1),n.Q6J("ngIf",(null==o.account?null:o.account.role)==o.Role.Admin||(null==o.account?null:o.account.role)==o.Role.Master||(null==o.account?null:o.account.role)==o.Role.Backoffice),n.xp6(1),n.Q6J("ngIf",(null==o.account?null:o.account.role)==o.Role.Admin||(null==o.account?null:o.account.role)==o.Role.Master),n.xp6(1),n.Q6J("ngIf",(null==o.account?null:o.account.role)==o.Role.Admin||(null==o.account?null:o.account.role)==o.Role.Master),n.xp6(1),n.Q6J("ngIf",(null==o.account?null:o.account.role)==o.Role.Admin||(null==o.account?null:o.account.role)==o.Role.Master))},dependencies:[h.O5,d.yS,x.BN],styles:[".navigation[_ngcontent-%COMP%]{position:fixed;left:0;top:0;height:100vh;max-width:230px;width:80%;transition:.3s;transform:translate(-100%)}.navigation.open[_ngcontent-%COMP%]{transform:translate(0)}.navigation__toggle-content[_ngcontent-%COMP%]{position:absolute;right:0;z-index:1;display:flex;align-items:center;justify-content:center;transform:translate(calc(100% + 10px));height:50px}.navigation__toggle[_ngcontent-%COMP%]{position:relative;left:5px;width:30px;height:30px;background-color:var(--primary);display:flex;align-items:center;justify-content:center;border:2px var(--primary) solid;border-radius:5px;transition:.3s}.navigation__toggle-logo[_ngcontent-%COMP%]{height:55px;overflow:hidden;transform:translateY(-5px) translate(-40px);padding:5px 5px 5px 50px;z-index:-1}.navigation__toggle-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;width:auto}.navigation__toggle[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.navigation.open[_ngcontent-%COMP%]   .navigation__toggle[_ngcontent-%COMP%]{background-color:var(--primary);border-color:var(--primary)}.navigation__toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{width:60%;height:2px;background-color:#fff;position:absolute;border-radius:5px}.navigation__toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child{transform:translateY(-5px)}.navigation__toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child{transform:translateY(5px)}.navigation__content[_ngcontent-%COMP%]{height:100vh;overflow-y:auto;display:flex;flex-flow:column;background-color:var(--primary);z-index:1;position:absolute;width:100%;box-shadow:2px 2px 13px 3px #00000036;transition:.3s}.navigation__logo[_ngcontent-%COMP%]{padding:13px 15px 0;display:flex;flex-flow:column;justify-content:space-between}.navigation__logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:auto;width:90%}.navigation__logo[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff;line-height:1}.navigation__logo[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%]{width:100%;height:1px;background-color:#fff;background-color:var(--primary);opacity:.3;opacity:0;margin:0}.navigation__links[_ngcontent-%COMP%]{display:flex;flex-flow:column;margin-top:2vh;position:relative;margin:calc(.5vh + 10px) 10px 0}.navigation__links[_ngcontent-%COMP%]:before{position:absolute;left:0;top:19px;height:calc(100% - 35px);width:1px;background-color:#fff;opacity:.3}.navigation__links-item[_ngcontent-%COMP%]{padding:6px 10px;text-decoration:none;color:#ffffffc7;font-weight:100;font-size:15px;text-transform:lowercase;transition:.3s;height:35px;position:relative;display:flex;align-items:center}.navigation__links-item[_ngcontent-%COMP%]:before{position:absolute;top:50%;left:0;width:20px;height:1px;background-color:#fff;opacity:.3;z-index:-1}.navigation__item-icon[_ngcontent-%COMP%]{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;background-color:#125268;border-radius:3px;margin-right:8px;transition:.2s;font-size:15px}.navigation__links-item[_ngcontent-%COMP%]:hover   .navigation__item-icon[_ngcontent-%COMP%]{background:var(--primary-light)}"]}),e})();const O=function(e){return{"z-index":e,position:"relative"}};let k=(()=>{class e{constructor(t,o,l,s){this.modoEscuro=t,this.modal=o,this.table=l,this.header=s,this.modoEscuroAtivado=!1,this.modalOpen=!1,this.navigationOpen=!1,this.loading=!1,this.modoEscuro.getAtivado().subscribe(r=>this.modoEscuroAtivado=r),this.modal.getOpen().subscribe(r=>this.modalOpen=r),this.header.open.subscribe(r=>this.navigationOpen=r),this.table.loading.subscribe(r=>this.loading=r)}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(T),n.Y36(L.Q),n.Y36(U.i),n.Y36(b))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-initial"]],decls:6,vars:14,consts:[[3,"ngStyle"],[1,"main",3,"ngStyle"],[1,"main-content"]],template:function(t,o){1&t&&(n._UZ(0,"app-navigation",0),n.TgZ(1,"div",1)(2,"div",2),n._UZ(3,"app-header",0)(4,"router-outlet"),n.qZA()(),n._UZ(5,"app-footer",0)),2&t&&(n.Q6J("ngStyle",n.VKq(6,O,o.modalOpen?"1":"2")),n.xp6(1),n.Q6J("ngStyle",n.VKq(8,O,o.modalOpen?"2":"0")),n.xp6(1),n.ekj("navigation-open",o.navigationOpen),n.xp6(1),n.Q6J("ngStyle",n.VKq(10,O,o.modalOpen?"0":"1")),n.xp6(2),n.Q6J("ngStyle",n.VKq(12,O,o.modalOpen?"0":"1")))},dependencies:[h.PC,d.lC,N,Y,X],styles:[".main[_ngcontent-%COMP%]{padding:0;z-index:0;position:relative;min-height:calc(100vh - 26px)}@media (min-width: 800px){.main-content[_ngcontent-%COMP%]{max-width:100vw;transition:.3s;margin-right:0;margin-left:auto;min-height:calc(100vh - 26px)}.main-content.navigation-open[_ngcontent-%COMP%]{max-width:calc(100vw - 230px);margin-left:auto}}"]}),e})();var E=a(9398),P=a(1094);let W=(()=>{class e{constructor(t,o){this.accountService=t,this.empresaService=o,this.faIdCard=p.Ukp,this.empresa=new E.oW,this.cnpj="",this.empresa=this.accountService.accountValue?.empresa??new E.oW,this.empresaService.get(this.empresa.id).subscribe(l=>{this.empresa=l,this.cnpj=this.empresa.cnpj.toString().padStart(14,"0")})}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(g.B),n.Y36(J.P))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-minha-empresa"]],decls:39,vars:12,consts:[[1,"page"],[1,"page__header"],[1,"title-icon"],[3,"icon"],[1,"mr-auto"],[1,"page__header-title"],[1,"page__header-subtitle"],[1,"d-flex","flex-wrap","justify-content-start","px-3"],[1,"col-md-5","col-12","mx-0","ps-0"],[1,"card","card-body"],[1,"home__container-header","mb-2"],[1,"col-md-5","col-12","mx-0","px-0"]],template:function(t,o){1&t&&(n.TgZ(0,"section",0)(1,"div",1)(2,"span",2),n._UZ(3,"fa-icon",3),n.qZA(),n.TgZ(4,"div",4)(5,"h3",5),n._uU(6),n.qZA(),n.TgZ(7,"p",6)(8,"small"),n._uU(9,"Dados da minha empresa"),n.qZA()()()(),n.TgZ(10,"div",7)(11,"div",8)(12,"div",9)(13,"div",10)(14,"h6"),n._uU(15,"Dados Cadastrais"),n.qZA()(),n.TgZ(16,"p"),n._uU(17,"Raz\xe3o social: "),n.TgZ(18,"strong"),n._uU(19),n.qZA()(),n.TgZ(20,"p"),n._uU(21),n.ALo(22,"mask"),n.qZA(),n.TgZ(23,"p"),n._uU(24),n.qZA()()(),n.TgZ(25,"div",11)(26,"div",9)(27,"div",10)(28,"h6"),n._uU(29,"Contagem de registros"),n.qZA()(),n.TgZ(30,"p"),n._uU(31),n.qZA(),n.TgZ(32,"p"),n._uU(33),n.qZA(),n.TgZ(34,"p"),n._uU(35),n.qZA(),n.TgZ(36,"p"),n._uU(37),n.qZA()()()()(),n._UZ(38,"router-outlet")),2&t&&(n.xp6(3),n.Q6J("icon",o.faIdCard),n.xp6(3),n.Oqu(o.empresa.nome),n.xp6(13),n.Oqu(o.empresa.nome),n.xp6(2),n.hij("CNPJ: ",n.xi3(22,9,o.cnpj,"00.000.000/0000-00"),""),n.xp6(3),n.hij("Email: ",o.empresa.email,""),n.xp6(7),n.hij("Usu\xe1rios: ",o.empresa.account.length," total"),n.xp6(2),n.hij("Produtos: ",o.empresa.produto.length," total"),n.xp6(2),n.hij("Setups: ",o.empresa.carteiraSetup.length," total"),n.xp6(2),n.hij("Clientes: ",o.empresa.cliente.length," total"))},dependencies:[d.lC,x.BN,P.Iq]}),e})();var $=a(1800),m=a(433);function nn(e,i){1&e&&(n.TgZ(0,"p",16),n._uU(1,"Este campo \xe9 obrigat\xf3rio."),n.qZA())}function en(e,i){if(1&e&&(n.TgZ(0,"div",31),n.YNc(1,nn,2,0,"p",32),n.qZA()),2&e){n.oxw();const t=n.MAs(18);n.xp6(1),n.Q6J("ngIf",t.errors.required)}}function on(e,i){1&e&&(n.TgZ(0,"p",16),n._uU(1,"Este campo \xe9 obrigat\xf3rio."),n.qZA())}function tn(e,i){1&e&&(n.TgZ(0,"p",16),n._uU(1,"Telefone/celular inv\xe1lido"),n.qZA())}function an(e,i){if(1&e&&(n.TgZ(0,"div",31),n.YNc(1,on,2,0,"p",32),n.YNc(2,tn,2,0,"p",32),n.qZA()),2&e){n.oxw();const t=n.MAs(29);n.xp6(1),n.Q6J("ngIf",t.errors.required),n.xp6(1),n.Q6J("ngIf",t.errors.mask)}}function rn(e,i){1&e&&(n.TgZ(0,"p",16),n._uU(1,"Este campo \xe9 obrigat\xf3rio."),n.qZA())}function sn(e,i){1&e&&(n.TgZ(0,"p",16),n._uU(1,"E-mail inv\xe1lido"),n.qZA())}function ln(e,i){if(1&e&&(n.TgZ(0,"div",31),n.YNc(1,rn,2,0,"p",32),n.YNc(2,sn,2,0,"p",32),n.qZA()),2&e){n.oxw();const t=n.MAs(40);n.xp6(1),n.Q6J("ngIf",t.errors.required),n.xp6(1),n.Q6J("ngIf",t.errors.email)}}function cn(e,i){if(1&e&&(n.TgZ(0,"li",34),n._uU(1),n.qZA()),2&e){const t=i.$implicit;n.xp6(1),n.Oqu(t)}}function dn(e,i){if(1&e&&(n.TgZ(0,"ul"),n.YNc(1,cn,2,1,"li",33),n.qZA()),2&e){const t=n.oxw();n.xp6(1),n.Q6J("ngForOf",t.erro)}}function un(e,i){1&e&&n._UZ(0,"span",35)}const pn=function(){return["..","reset-password"]},_n=[{path:"",component:k,children:[{path:"my-account",component:(()=>{class e{constructor(t,o,l,s,r){this.router=t,this.modal=o,this.toastr=l,this._loading=s,this.accountService=r,this.modalOpen=!1,this.faKey=p.DD4,this.loading=!1,this.mensagemErro="",this.erro=[],this.modal.getOpen().subscribe(u=>{this.modalOpen=u}),this.accountService.account.subscribe(u=>this.objeto=u)}ngOnInit(){setTimeout(()=>{this.modal.setOpen(!0)},200)}voltar(){this.modal.setOpen(!1),setTimeout(()=>{this.router.navigate([".."])},200)}create(t){if(this.erro=[],this.loading=!0,this._loading.loading.next(!0),t.invalid)return this.erro.push("Formul\xe1rio inv\xe1lido"),void this.toastr.error("Formul\xe1rio inv\xe1lido");setTimeout(()=>{this.loading=!1,this._loading.loading.next(!1)},300)}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(d.F0),n.Y36(L.Q),n.Y36(Z._W),n.Y36($.g),n.Y36(g.B))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-my-account"]],decls:56,vars:15,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner"],[1,"modal__content"],[1,"modal__header"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body"],[3,"ngSubmit"],["form","ngForm"],[1,"form-row"],[1,"form-group","col-lg-12","col-md-12","col-sm-12","col-12","mb-2"],[1,"form-floating"],["type","name","id","name","name","name","placeholder","   ","required","",1,"form-control",3,"ngModel","ngModelChange"],["name","ngModel"],["for","name"],[1,"text-danger"],["class","pl-2 pt-2 pb-0",4,"ngIf"],["type","telefoneCelular","id","telefoneCelular","name","telefoneCelular","mask","(00) 0000-0000||(00) 0.0000-0000","placeholder","(11) x.0000-0000","required","",1,"form-control",3,"ngModel","hiddenInput","ngModelChange"],["telefoneCelular","ngModel"],["for","telefoneCelular"],["type","email","email","","id","email","name","email","placeholder","example@gmail.com","required","",1,"form-control",3,"ngModel","ngModelChange"],["email","ngModel"],["for","email"],[1,"d-flex","justify-content-between","col-lg-12","flex-wrap","p-0"],[4,"ngIf"],[1,"d-flex","col-sm-12","ml-auto","mt-3","mr-0","px-0"],[1,"btn","btn-grey","ml-auto","mr-1",3,"routerLink"],[1,"ml-1",3,"icon"],["type","submit",1,"btn","btn-primary","mr-0",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],[1,"pl-2","pt-2","pb-0"],["class","text-danger",4,"ngIf"],["class","text-red",4,"ngFor","ngForOf"],[1,"text-red"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(t,o){if(1&t){const l=n.EpF();n.TgZ(0,"div",0)(1,"div",1),n.NdJ("click",function(){return o.voltar()}),n.qZA(),n.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5)(6,"strong"),n._uU(7,"Meus dados"),n.qZA()(),n.TgZ(8,"a",6),n.NdJ("click",function(){return o.voltar()}),n._UZ(9,"span")(10,"span"),n.qZA()(),n.TgZ(11,"div",7)(12,"form",8,9),n.NdJ("ngSubmit",function(){n.CHM(l);const r=n.MAs(13);return n.KtG(o.create(r))}),n.TgZ(14,"div",10)(15,"div",11)(16,"div",12)(17,"input",13,14),n.NdJ("ngModelChange",function(r){return o.objeto.name=r}),n.qZA(),n.TgZ(19,"label",15)(20,"span"),n._uU(21,"Nome completo "),n.TgZ(22,"span",16),n._uU(23,"*"),n.qZA()()()(),n.YNc(24,en,2,1,"div",17),n.qZA()(),n.TgZ(25,"div",10)(26,"div",11)(27,"div",12)(28,"input",18,19),n.NdJ("ngModelChange",function(r){return o.objeto.telefoneCelular=r}),n.qZA(),n.TgZ(30,"label",20)(31,"span"),n._uU(32,"Telefone/celular "),n.TgZ(33,"span",16),n._uU(34,"*"),n.qZA()()()(),n.YNc(35,an,3,2,"div",17),n.qZA()(),n.TgZ(36,"div",10)(37,"div",11)(38,"div",12)(39,"input",21,22),n.NdJ("ngModelChange",function(r){return o.objeto.email=r}),n.qZA(),n.TgZ(41,"label",23)(42,"span"),n._uU(43,"E-mail "),n.TgZ(44,"span",16),n._uU(45,"*"),n.qZA()()()(),n.YNc(46,ln,3,2,"div",17),n.qZA()(),n.TgZ(47,"div",24),n.YNc(48,dn,2,1,"ul",25),n.TgZ(49,"div",26)(50,"a",27),n._uU(51," Resetar senha "),n._UZ(52,"fa-icon",28),n.qZA(),n.TgZ(53,"button",29),n.YNc(54,un,1,0,"span",30),n._uU(55," Salvar "),n.qZA()()()()()()()()}if(2&t){const l=n.MAs(13),s=n.MAs(18),r=n.MAs(29),u=n.MAs(40);n.ekj("active",o.modalOpen),n.xp6(17),n.Q6J("ngModel",o.objeto.name),n.xp6(7),n.Q6J("ngIf",null!=s.errors&&s.touched),n.xp6(4),n.Q6J("ngModel",o.objeto.telefoneCelular)("hiddenInput",!1),n.xp6(7),n.Q6J("ngIf",null!=r.errors&&r.touched),n.xp6(4),n.Q6J("ngModel",o.objeto.email),n.xp6(7),n.Q6J("ngIf",null!=u.errors&&u.touched),n.xp6(2),n.Q6J("ngIf",o.erro),n.xp6(2),n.Q6J("routerLink",n.DdM(14,pn)),n.xp6(2),n.Q6J("icon",o.faKey),n.xp6(1),n.Q6J("disabled",l.invalid||o.loading),n.xp6(1),n.Q6J("ngIf",o.loading)}},dependencies:[h.sg,h.O5,d.yS,P.hx,m._Y,m.Fj,m.JJ,m.JL,m.Q7,m.on,m.On,m.F,x.BN]}),e})()},{path:"minha-empresa/:empresa_nome",component:W},{path:"carteira-setup",loadChildren:()=>Promise.all([a.e(642),a.e(26),a.e(875),a.e(592),a.e(43)]).then(a.bind(a,2043)).then(e=>e.CarteiraSetupModule),canActivate:[f],data:{roles:[c.u.Admin,c.u.Master]}},{path:"clientes",loadChildren:()=>Promise.all([a.e(642),a.e(26),a.e(588),a.e(592),a.e(553)]).then(a.bind(a,1553)).then(e=>e.ClientesModule),canActivate:[f],data:{roles:[c.u.Admin,c.u.Master,c.u.Backoffice]}},{path:"produtos",loadChildren:()=>Promise.all([a.e(642),a.e(490),a.e(592),a.e(730)]).then(a.bind(a,9179)).then(e=>e.ProdutosModule),canActivate:[f],data:{roles:[c.u.Admin,c.u.Master]}},{path:"usuarios",loadChildren:()=>Promise.all([a.e(642),a.e(843),a.e(592),a.e(343)]).then(a.bind(a,6343)).then(e=>e.UsuariosModule),canActivate:[f],data:{roles:[c.u.Admin,c.u.Master]}},{path:"empresas",loadChildren:()=>Promise.all([a.e(642),a.e(26),a.e(588),a.e(875),a.e(843),a.e(490),a.e(268)]).then(a.bind(a,2268)).then(e=>e.EmpresasModule),canActivate:[f],data:{roles:[c.u.Admin]}}]}];let xn=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[d.Bz.forChild(_n),d.Bz]}),e})();var Mn=a(9808);function Cn(e,i){return()=>new Promise((t,o)=>{(0,Mn.n)(e.refreshToken()).then(l=>{if("/account/login"==window.location.pathname){var s=window.location.search,r=s.split("?returnUrl=");s=r[r.length-1],console.log(s),s.trim()?i.navigateByUrl(decodeURIComponent(s)):i.navigate([""])}}).catch(l=>{}).finally(()=>{t()})})}let yn=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e,bootstrap:[k]}),e.\u0275inj=n.cJS({providers:[{provide:n.ip1,useFactory:Cn,multi:!0,deps:[g.B,d.F0]}],imports:[h.ez,xn,P.yI.forChild(),m.u5,x.uH]}),e})()},9808:(S,y,a)=>{a.d(y,{n:()=>h});var n=a(6805);function h(d,g){const Z="object"==typeof g;return new Promise((f,c)=>{let v,_=!1;d.subscribe({next:A=>{v=A,_=!0},error:c,complete:()=>{_?f(v):Z?f(g.defaultValue):c(new n.K)}})})}}}]);