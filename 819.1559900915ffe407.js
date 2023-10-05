"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[819],{1735:(j,P,a)=>{a.d(P,{p:()=>y});var n=a(9876),m=a(4650),p=a(202),d=a(7185);let y=(()=>{class f{constructor(v,x,C){this.accountService=v,this.router=x,this.toastr=C}canActivate(v,x){let C=this.accountService.accountValue;return C?!(v.data.roles&&!v.data.roles.includes(C?.role)&&(this.toastr.error("Acesso n\xe3o autorizado."),this.router.navigate([""]),1)):(this.toastr.error("Acesso n\xe3o autorizado. <br> Fa\xe7a login."),this.router.navigate(["account","login"],{queryParams:{returnUrl:x.url}}),!1)}}return f.\u0275fac=function(v){return new(v||f)(m.LFG(n.B),m.LFG(p.F0),m.LFG(d._W))},f.\u0275prov=m.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"}),f})()},1819:(j,P,a)=>{a.r(P),a.d(P,{LoggedInModule:()=>Yn});var n=a(4650),m=a(6895),p=a(202),d=a(4409),y=a(1135),f=a(8259),U=a(9243),v=a(46);let x=(()=>{class o{constructor(t,e){this.crypto=t,this.table=e,this.open=new y.X(!1),this.menuHeaderOpen=new y.X(!1)}get aside(){var t=!!localStorage.getItem("navigation")&&this.crypto.decrypt(localStorage.getItem("navigation"));return this.setMenuAside(t),this.open.value}toggleMenuAside(){this.setMenuAside(!this.open.value)}setMenuAside(t){var e=this.crypto.encrypt(t)??"";localStorage.setItem("navigation",e),this.open.next(t)}toggleMenuHeader(){this.menuHeaderOpen.next(!this.menuHeaderOpen.value)}openMenuHeader(){this.menuHeaderOpen.next(!0)}closeMenuHeader(){this.menuHeaderOpen.next(!1)}clickOut(){var t=this;f("body").on("click",function(e){t.closeMenuHeader()}),f(".header__userLogado").on("click",function(e){e.stopPropagation()})}}return o.\u0275fac=function(t){return new(t||o)(n.LFG(U.w),n.LFG(v.i))},o.\u0275prov=n.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})(),C=(()=>{class o{constructor(t){this.crypto=t,this.ativado=new y.X(!1)}toggle(){this.setAtivado(!this.ativado.value)}setAtivado(t){this.ativado.next(t);var e=this.crypto.encrypt(this.ativado.value);null!=e?localStorage.setItem("dark-mode",e):localStorage.removeItem("dark-mode")}getAtivado(){var t=localStorage.getItem("dark-mode");if(t){var e=this.crypto.decrypt(t);null!=e&&this.setAtivado(e)}return this.ativado}}return o.\u0275fac=function(t){return new(t||o)(n.LFG(U.w))},o.\u0275prov=n.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var w=a(7549),k=a(5861),h=a(801),Z=a(9876),F=a(4506),b=a(3868);const H=function(){return["my-account"]};let q=(()=>{class o{constructor(t,e,l,s){var r=this;this.modoEscuro=t,this.accountService=e,this.header=l,this.alertService=s,this.Role=d.u,this.faSignOut=h.HEx,this.faIdCard=h.Ukp,this.faKey=h.DD4,this.faUser=h.ILF,this.modoEscuroAtivado=!1,this.menuHeaderOpen=!1,this.nomeAbreviado="",this.perfil="",this.subscription=[];var u=this.modoEscuro.getAtivado().subscribe(g=>this.modoEscuroAtivado=g);this.userLogado=this.accountService.accountValue;var M=this.accountService.account.subscribe(function(){var g=(0,k.Z)(function*(A){if(r.userLogado=A,A){r.perfil=d.u[A.perfilAcesso_Id];let O=A?.name.split(" ");r.nomeAbreviado=1==O.length?O[0]:O[0]+" "+O[O.length-1],null==A.passwordReset&&0==window.location.pathname.includes("my-account/change-password")&&r.alertService.info('\n                        <h5>Aten\xe7\xe3o</h5>\n                        <h6>Sua conta n\xe3o est\xe1 protegida!</h6>\n                        <p>Ap\xf3s sua conta ter sido cadastrada a senha padr\xe3o n\xe3o foi alterada, isso torna sua conta vulner\xe1vel \xe0 acessos n\xe3o autorizados.</p>\n                        <p>Por favor, altere sua senha em <a href="./my-account/change-password">/my-account/change-password</a>.</p>\n                    ')}});return function(A){return g.apply(this,arguments)}}());this.subscription.push(u),this.subscription.push(M);var _=this.header.menuHeaderOpen.subscribe(g=>this.menuHeaderOpen=g);this.subscription.push(_)}ngAfterViewInit(){this.header.clickOut()}ngOnDestroy(){this.subscription.forEach(t=>t.unsubscribe())}toggleMenuHeader(){this.header.toggleMenuHeader()}sair(){this.accountService.logout()}}return o.\u0275fac=function(t){return new(t||o)(n.Y36(C),n.Y36(Z.B),n.Y36(x),n.Y36(F.c))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-header"]],decls:23,vars:13,consts:[[1,"header"],[1,"header-logo"],["src","assets/img/logo-planner.png","alt","Logo Planner"],[1,"header__userLogado","ml-auto"],[1,"header__userLogado-content",3,"click"],[1,"header__userLogado-img"],[3,"icon"],[1,"header__userLogado-text"],[1,"header__userLogado-submenu"],[1,"header__userLogado-submenu-link"],[1,"header__userLogado-submenu-link",3,"routerLink"],[2,"margin-right","8px"],[1,"header__userLogado-submenu-link",3,"click"]],template:function(t,e){1&t&&(n.TgZ(0,"header",0)(1,"div",1),n._UZ(2,"img",2),n.qZA(),n.TgZ(3,"div",3)(4,"div",4),n.NdJ("click",function(){return e.toggleMenuHeader()}),n.TgZ(5,"div",5),n._UZ(6,"fa-icon",6),n.qZA(),n.TgZ(7,"div",7)(8,"p"),n._uU(9),n.qZA(),n.TgZ(10,"p"),n._uU(11),n.qZA()()()()(),n.TgZ(12,"div",8)(13,"p",9),n._uU(14,"Welcome"),n.qZA(),n.TgZ(15,"a",10)(16,"span",11),n._UZ(17,"fa-icon",6),n.qZA(),n._uU(18," Meus dados "),n.qZA(),n.TgZ(19,"a",12),n.NdJ("click",function(){return e.sair()}),n.TgZ(20,"span",11),n._UZ(21,"fa-icon",6),n.qZA(),n._uU(22," Sair "),n.qZA()()),2&t&&(n.ekj("dark",e.modoEscuroAtivado),n.xp6(4),n.ekj("header__userLogado-submenu--open",e.menuHeaderOpen),n.xp6(2),n.Q6J("icon",e.faUser),n.xp6(3),n.Oqu(null==e.userLogado?null:e.userLogado.email),n.xp6(2),n.Oqu(e.perfil),n.xp6(1),n.ekj("header__userLogado-submenu--open",e.menuHeaderOpen),n.xp6(3),n.Q6J("routerLink",n.DdM(12,H)),n.xp6(2),n.Q6J("icon",e.faIdCard),n.xp6(4),n.Q6J("icon",e.faSignOut))},dependencies:[p.yS,b.BN],styles:[".header[_ngcontent-%COMP%]{height:50px;position:sticky;top:0;left:0;width:100%;background-color:#fff;background-color:var(--primary);box-shadow:2px 2px 2px #0000000d;display:flex;align-items:center;justify-content:space-between;margin-top:0;margin-bottom:10px}.header-logo[_ngcontent-%COMP%]{height:100%;overflow:hidden;padding:5px 5px 5px 50px;z-index:-1;display:flex}.header-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:80%;width:auto;margin:auto 0;display:block}.header__userLogado[_ngcontent-%COMP%]{height:100%;position:relative;display:flex;justify-content:center;width:auto;margin-right:calc(.5vw + 10px);max-width:100%}.header__userLogado-content[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100%;padding:0 25px 0 30px;box-sizing:border-box;background-color:#fff;background-color:var(--primary);z-index:2;position:relative;cursor:pointer;margin:auto 0;transition:.3s;border:none}.header__userLogado-content[_ngcontent-%COMP%]:hover{background-color:#f5f5f5;background-color:var(--primary-dark)}.header__userLogado-content.header__userLogado-submenu--open[_ngcontent-%COMP%]{border:1px #d2d2d2 solid;border-color:var(--primary);background-color:var(--primary-dark);border-top:none;border-bottom:none;height:100%}.header__userLogado-img[_ngcontent-%COMP%]{width:25px;height:25px;background-size:cover;background-position:center;border-radius:50%;border:1px #c7c6c6 solid;background-color:#fff;cursor:pointer;margin-left:-15px;display:flex;align-items:center;justify-content:center;color:var(--primary)}.header__userLogado-img[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{color:var(--primary)}.header__userLogado-text[_ngcontent-%COMP%]{margin-left:10px;cursor:pointer}.header__userLogado-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#fafcff;cursor:pointer;line-height:1.2;font-size:12px;font-weight:100;letter-spacing:.4px;font-family:Light}.header__userLogado-submenu[_ngcontent-%COMP%]{position:fixed;top:50px;left:auto;right:calc(.5vw + 10px);transform:translateY(-100%);width:200px;border:1px #d2d2d2 solid;border-top:0;border-radius:0 0 3px 3px;display:flex;flex-flow:column;align-items:stretch;padding:5px 0;opacity:0;z-index:-1;visibility:hidden;transition:.3s;background-color:#fff}.header__userLogado-submenu.header__userLogado-submenu--open[_ngcontent-%COMP%]{transform:translate(0);opacity:1;visibility:visible;transition:.3s}p.header__userLogado-submenu-link[_ngcontent-%COMP%]{font-weight:700}.header__userLogado-submenu-link[_ngcontent-%COMP%]{padding:4px 15px;font-size:11px;font-family:Regular;color:#888;text-transform:uppercase;cursor:pointer;text-decoration:none}.header__userLogado-submenu-link[_ngcontent-%COMP%]:not(p):hover{background-color:#cdcdcd70}.header__nav[_ngcontent-%COMP%]{height:100%;display:flex}.header__nav-link[_ngcontent-%COMP%]{display:flex;align-items:center;padding:5px 1vw;text-decoration:none;color:#fbf9f9;transition:.3s}.header__nav-link[_ngcontent-%COMP%]:hover{background:#00000026}.dropdown-empresas[_ngcontent-%COMP%]{background-color:#484848;color:#fff}.dropdown-empresas[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{color:#484848;background:#fff}"]}),o})(),R=(()=>{class o{constructor(t){this.modoEscuro=t,this.modoEscuroAtivado=!1,this.subscription=[];var e=this.modoEscuro.getAtivado().subscribe(l=>this.modoEscuroAtivado=l);this.subscription.push(e)}ngOnDestroy(){this.subscription.forEach(t=>t.unsubscribe())}}return o.\u0275fac=function(t){return new(t||o)(n.Y36(C))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-footer"]],decls:3,vars:2,consts:[[1,"footer"],[1,"text-center"]],template:function(t,e){1&t&&(n.TgZ(0,"div",0)(1,"p",1),n._uU(2,"Copyright 2022"),n.qZA()()),2&t&&n.ekj("dark",e.modoEscuroAtivado)},styles:[".footer[_ngcontent-%COMP%]{height:26px;background:#100f0f;margin-top:auto;width:100vw;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px}.footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff;font-size:13px}"]}),o})();const z=function(o){return["minha-empresa",o]};function D(o,i){if(1&o&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"fa-icon",10),n.qZA(),n._uU(3," Minha empresa "),n.qZA()),2&o){const t=n.oxw();n.Q6J("routerLink",n.VKq(2,z,null==t.account||null==t.account.empresa?null:t.account.empresa.nome)),n.xp6(2),n.Q6J("icon",t.faIdCard)}}const B=function(){return["empresas"]};function G(o,i){if(1&o&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"fa-icon",10),n.qZA(),n._uU(3," Empresas "),n.qZA()),2&o){const t=n.oxw();n.Q6J("routerLink",n.DdM(2,B)),n.xp6(2),n.Q6J("icon",t.faCity)}}const K=function(){return["clientes"]};function V(o,i){1&o&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"i",11),n.qZA(),n._uU(3," Clientes "),n.qZA()),2&o&&n.Q6J("routerLink",n.DdM(1,K))}const W=function(){return["produtos"]};function X(o,i){if(1&o&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"fa-icon",10),n.qZA(),n._uU(3," Produtos "),n.qZA()),2&o){const t=n.oxw();n.Q6J("routerLink",n.DdM(2,W)),n.xp6(2),n.Q6J("icon",t.faHandHoldingDollar)}}const $=function(){return["carteira-setup"]};function nn(o,i){1&o&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"i",11),n.qZA(),n._uU(3," Setup "),n.qZA()),2&o&&n.Q6J("routerLink",n.DdM(1,$))}const on=function(){return["usuarios"]};function en(o,i){if(1&o&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"fa-icon",10),n.qZA(),n._uU(3," Usu\xe1rios "),n.qZA()),2&o){const t=n.oxw();n.Q6J("routerLink",n.DdM(2,on)),n.xp6(2),n.Q6J("icon",t.faUsers)}}let tn=(()=>{class o{constructor(t,e){this.header=t,this.accountService=e,this.Role=d.u,this.faHandHoldingDollar=h.VPG,this.faUsers=h.FVb,this.faPercent=h.jGC,this.faCity=h.SBo,this.faIdCard=h.Ukp,this.menuOpen=!1,this.subscription=[],this.menuOpen=this.header.aside;var l=this.header.open.subscribe(r=>this.menuOpen=r);this.subscription.push(l);var s=this.accountService.account.subscribe(r=>this.account=r);this.subscription.push(s)}ngOnDestroy(){this.subscription.forEach(t=>t.unsubscribe())}toggleAside(){this.header.toggleMenuAside()}}return o.\u0275fac=function(t){return new(t||o)(n.Y36(x),n.Y36(Z.B))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-navigation"]],decls:17,vars:8,consts:[[1,"navigation"],[1,"navigation__toggle-content"],[1,"navigation__toggle",3,"click"],[1,"navigation__content"],[1,"navigation__logo"],["src","assets/img/logo-planner.png","alt","Logo Planner"],[1,"navigation__links"],["class","navigation__links-item",3,"routerLink",4,"ngIf"],[1,"navigation__links-item",3,"routerLink"],[1,"navigation__item-icon"],[3,"icon"],[1,"pi","pi-wallet"]],template:function(t,e){1&t&&(n.TgZ(0,"aside",0)(1,"div",1)(2,"button",2),n.NdJ("click",function(){return e.toggleAside()}),n._UZ(3,"span")(4,"span")(5,"span"),n.qZA()(),n.TgZ(6,"div",3)(7,"div",4),n._UZ(8,"img",5)(9,"hr"),n.qZA(),n.TgZ(10,"div",6),n.YNc(11,D,4,4,"a",7),n.YNc(12,G,4,3,"a",7),n.YNc(13,V,4,2,"a",7),n.YNc(14,X,4,3,"a",7),n.YNc(15,nn,4,2,"a",7),n.YNc(16,en,4,3,"a",7),n.qZA()()()),2&t&&(n.ekj("open",e.menuOpen),n.xp6(11),n.Q6J("ngIf",(null==e.account?null:e.account.role)==e.Role.Master||(null==e.account?null:e.account.role)==e.Role.Backoffice),n.xp6(1),n.Q6J("ngIf",(null==e.account?null:e.account.role)==e.Role.Admin),n.xp6(1),n.Q6J("ngIf",(null==e.account?null:e.account.role)==e.Role.Admin||(null==e.account?null:e.account.role)==e.Role.Master||(null==e.account?null:e.account.role)==e.Role.Backoffice),n.xp6(1),n.Q6J("ngIf",(null==e.account?null:e.account.role)==e.Role.Admin||(null==e.account?null:e.account.role)==e.Role.Master),n.xp6(1),n.Q6J("ngIf",(null==e.account?null:e.account.role)==e.Role.Admin||(null==e.account?null:e.account.role)==e.Role.Master),n.xp6(1),n.Q6J("ngIf",(null==e.account?null:e.account.role)==e.Role.Admin||(null==e.account?null:e.account.role)==e.Role.Master))},dependencies:[m.O5,p.yS,b.BN],styles:[".navigation[_ngcontent-%COMP%]{position:fixed;left:0;top:0;height:100vh;max-width:230px;width:80%;transition:.3s;transform:translate(-100%)}.navigation.open[_ngcontent-%COMP%]{transform:translate(0)}.navigation__toggle-content[_ngcontent-%COMP%]{position:absolute;right:0;z-index:1;display:flex;align-items:center;justify-content:center;transform:translate(calc(100% + 10px));height:50px}.navigation__toggle[_ngcontent-%COMP%]{position:relative;left:5px;width:30px;height:30px;background-color:var(--primary);display:flex;align-items:center;justify-content:center;border:2px var(--primary) solid;border-radius:5px;transition:.3s}.navigation__toggle-logo[_ngcontent-%COMP%]{height:55px;overflow:hidden;transform:translateY(-5px) translate(-40px);padding:5px 5px 5px 50px;z-index:-1}.navigation__toggle-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;width:auto}.navigation__toggle[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.navigation.open[_ngcontent-%COMP%]   .navigation__toggle[_ngcontent-%COMP%]{background-color:var(--primary);border-color:var(--primary)}.navigation__toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{width:60%;height:2px;background-color:#fff;position:absolute;border-radius:5px}.navigation__toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child{transform:translateY(-5px)}.navigation__toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child{transform:translateY(5px)}.navigation__content[_ngcontent-%COMP%]{height:100vh;overflow-y:auto;display:flex;flex-flow:column;background-color:var(--primary);z-index:1;position:absolute;width:100%;box-shadow:2px 2px 13px 3px #00000036;transition:.3s}.navigation__logo[_ngcontent-%COMP%]{padding:13px 15px 0;display:flex;flex-flow:column;justify-content:space-between}.navigation__logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:auto;width:90%}.navigation__logo[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff;line-height:1}.navigation__logo[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%]{width:100%;height:1px;background-color:#fff;background-color:var(--primary);opacity:.3;opacity:0;margin:0}.navigation__links[_ngcontent-%COMP%]{display:flex;flex-flow:column;margin-top:2vh;position:relative;margin:calc(.5vh + 10px) 10px 0}.navigation__links[_ngcontent-%COMP%]:before{position:absolute;left:0;top:19px;height:calc(100% - 35px);width:1px;background-color:#fff;opacity:.3}.navigation__links-item[_ngcontent-%COMP%]{padding:6px 10px;text-decoration:none;color:#ffffffc7;font-weight:100;font-size:15px;text-transform:lowercase;transition:.3s;height:35px;position:relative;display:flex;align-items:center}.navigation__links-item[_ngcontent-%COMP%]:before{position:absolute;top:50%;left:0;width:20px;height:1px;background-color:#fff;opacity:.3;z-index:-1}.navigation__item-icon[_ngcontent-%COMP%]{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;background-color:#125268;border-radius:3px;margin-right:8px;transition:.2s;font-size:15px}.navigation__links-item[_ngcontent-%COMP%]:hover   .navigation__item-icon[_ngcontent-%COMP%]{background:var(--primary-light)}"]}),o})();const I=function(o){return{"z-index":o,position:"relative"}};let E=(()=>{class o{constructor(t,e,l,s){this.modoEscuro=t,this.modal=e,this.table=l,this.header=s,this.modoEscuroAtivado=!1,this.modalOpen=!1,this.navigationOpen=!1,this.loading=!1,this.subscription=[];var r=this.modoEscuro.getAtivado().subscribe(g=>this.modoEscuroAtivado=g),u=this.modal.getOpen().subscribe(g=>this.modalOpen=g),M=this.header.open.subscribe(g=>this.navigationOpen=g),_=this.table.loading.subscribe(g=>this.loading=g);this.subscription.push(r),this.subscription.push(u),this.subscription.push(M),this.subscription.push(_)}ngOnDestroy(){this.subscription.forEach(t=>t.unsubscribe())}}return o.\u0275fac=function(t){return new(t||o)(n.Y36(C),n.Y36(w.Q),n.Y36(v.i),n.Y36(x))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-initial"]],decls:6,vars:11,consts:[[3,"ngStyle"],[1,"main",3,"ngStyle"],[1,"main-content"]],template:function(t,e){1&t&&(n._UZ(0,"app-navigation",0),n.TgZ(1,"div",1)(2,"div",2),n._UZ(3,"app-header",0)(4,"router-outlet"),n.qZA()(),n._UZ(5,"app-footer")),2&t&&(n.Q6J("ngStyle",n.VKq(5,I,e.modalOpen?"2":"1")),n.xp6(1),n.Q6J("ngStyle",n.VKq(7,I,e.modalOpen?"3":"0")),n.xp6(1),n.ekj("navigation-open",e.navigationOpen),n.xp6(1),n.Q6J("ngStyle",n.VKq(9,I,e.modalOpen?"0":"1")))},dependencies:[m.PC,p.lC,q,R,tn],styles:[".main[_ngcontent-%COMP%]{padding:0;z-index:0;position:relative;min-height:calc(100vh - 26px)}@media (min-width: 800px){.main-content[_ngcontent-%COMP%]{max-width:100%;transition:.3s;margin-right:0;margin-left:auto;min-height:calc(100vh - 26px)}.main-content.navigation-open[_ngcontent-%COMP%]{max-width:calc(100% - 230px)}}"]}),o})();var Q=a(9398),an=a(8913),J=a(9808),L=a(1094);let rn=(()=>{class o{constructor(t,e){this.accountService=t,this.empresaService=e,this.faIdCard=h.Ukp,this.empresa=new Q.oW,this.cnpj="",this.empresa=this.accountService.accountValue?.empresa??new Q.oW,(0,J.n)(this.empresaService.get(this.empresa.id)).then(l=>{this.empresa=l,this.cnpj=this.empresa.cnpj.toString().padStart(14,"0")})}}return o.\u0275fac=function(t){return new(t||o)(n.Y36(Z.B),n.Y36(an.P))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-minha-empresa"]],decls:26,vars:8,consts:[[1,"page"],[1,"page__header"],[1,"title-icon"],[3,"icon"],[1,"mr-auto"],[1,"page__header-title"],[1,"page__header-subtitle"],[1,"d-flex","flex-wrap","justify-content-start","px-3"],[1,"col-md-5","col-12","mx-0","ps-0"],[1,"card","card-body"],[1,"home__container-header","mb-2"]],template:function(t,e){1&t&&(n.TgZ(0,"section",0)(1,"div",1)(2,"span",2),n._UZ(3,"fa-icon",3),n.qZA(),n.TgZ(4,"div",4)(5,"h3",5),n._uU(6),n.qZA(),n.TgZ(7,"p",6)(8,"small"),n._uU(9,"Dados da minha empresa"),n.qZA()()()(),n.TgZ(10,"div",7)(11,"div",8)(12,"div",9)(13,"div",10)(14,"h6"),n._uU(15,"Dados Cadastrais"),n.qZA()(),n.TgZ(16,"p"),n._uU(17,"Raz\xe3o social: "),n.TgZ(18,"strong"),n._uU(19),n.qZA()(),n.TgZ(20,"p"),n._uU(21),n.ALo(22,"mask"),n.qZA(),n.TgZ(23,"p"),n._uU(24),n.qZA()()()()(),n._UZ(25,"router-outlet")),2&t&&(n.xp6(3),n.Q6J("icon",e.faIdCard),n.xp6(3),n.Oqu(e.empresa.nome),n.xp6(13),n.Oqu(e.empresa.nome),n.xp6(2),n.hij("CNPJ: ",n.xi3(22,5,e.cnpj,"00.000.000/0000-00"),""),n.xp6(3),n.hij("Email: ",e.empresa.email,""))},dependencies:[p.lC,b.BN,L.Iq]}),o})();var S=a(878),Y=a(7185),N=a(3972),c=a(433);function sn(o,i){1&o&&(n.TgZ(0,"p",16),n._uU(1,"Este campo \xe9 obrigat\xf3rio."),n.qZA())}function ln(o,i){if(1&o&&(n.TgZ(0,"div",31),n.YNc(1,sn,2,0,"p",32),n.qZA()),2&o){n.oxw();const t=n.MAs(18);n.xp6(1),n.Q6J("ngIf",t.errors.required)}}function cn(o,i){1&o&&(n.TgZ(0,"p",16),n._uU(1,"Este campo \xe9 obrigat\xf3rio."),n.qZA())}function dn(o,i){1&o&&(n.TgZ(0,"p",16),n._uU(1,"Telefone/celular inv\xe1lido"),n.qZA())}function un(o,i){if(1&o&&(n.TgZ(0,"div",31),n.YNc(1,cn,2,0,"p",32),n.YNc(2,dn,2,0,"p",32),n.qZA()),2&o){n.oxw();const t=n.MAs(29);n.xp6(1),n.Q6J("ngIf",t.errors.required),n.xp6(1),n.Q6J("ngIf",t.errors.mask)}}function pn(o,i){1&o&&(n.TgZ(0,"p",16),n._uU(1,"Este campo \xe9 obrigat\xf3rio."),n.qZA())}function gn(o,i){1&o&&(n.TgZ(0,"p",16),n._uU(1,"E-mail inv\xe1lido"),n.qZA())}function mn(o,i){if(1&o&&(n.TgZ(0,"div",31),n.YNc(1,pn,2,0,"p",32),n.YNc(2,gn,2,0,"p",32),n.qZA()),2&o){n.oxw();const t=n.MAs(40);n.xp6(1),n.Q6J("ngIf",t.errors.required),n.xp6(1),n.Q6J("ngIf",t.errors.email)}}function hn(o,i){1&o&&(n._UZ(0,"p",34),n.ALo(1,"json")),2&o&&n.Q6J("innerHTML",n.lcZ(1,1,i.$implicit),n.oJD)}function fn(o,i){if(1&o&&(n.TgZ(0,"div"),n.YNc(1,hn,2,3,"p",33),n.qZA()),2&o){const t=n.oxw();n.xp6(1),n.Q6J("ngForOf",t.erro)}}function vn(o,i){1&o&&n._UZ(0,"span",35)}const _n=function(){return["change-password"]};let Cn=(()=>{class o{constructor(t,e,l,s,r){this.router=t,this.modal=e,this.toastr=l,this.loadingUtils=s,this.accountService=r,this.modalOpen=!1,this.faKey=h.DD4,this.subscription=[],this.loading=!1,this.mensagemErro="",this.erro=[];var u=this.modal.getOpen().subscribe(_=>this.modalOpen=_);this.subscription.push(u);var M=this.accountService.account.subscribe(_=>this.objeto=_);this.subscription.push(M),setTimeout(()=>{this.modal.setOpen(!0)},200)}ngOnDestroy(){this.subscription.forEach(t=>t.unsubscribe())}voltar(){this.modal.setOpen(!1),setTimeout(()=>{this.router.navigate([".."])},200)}editAccount(t){if(this.erro=[],this.loading=!0,this.loadingUtils.loading.next(!0),t.invalid)return this.erro.push("Formul\xe1rio inv\xe1lido"),void this.toastr.error("Formul\xe1rio inv\xe1lido");(0,J.n)(this.accountService.updateAccount({name:this.objeto?.name??"",telefoneCelular:this.objeto?.telefoneCelular??0,email:this.objeto?.email??""})).then(l=>{this.voltar()}).catch(l=>{var s=(0,S.b)(l);this.erro.push(s),this.toastr.error(s)}).finally(()=>{this.loading=!1}),setTimeout(()=>{this.loading=!1,this.loadingUtils.loading.next(!1)},300)}}return o.\u0275fac=function(t){return new(t||o)(n.Y36(p.F0),n.Y36(w.Q),n.Y36(Y._W),n.Y36(N.b),n.Y36(Z.B))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-my-account"]],decls:57,vars:15,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner"],[1,"modal__content"],[1,"modal__header"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body"],[3,"ngSubmit"],["form","ngForm"],[1,"form-row"],[1,"form-group","col-lg-12","col-md-12","col-sm-12","col-12","mb-2"],[1,"form-floating"],["type","name","id","name","name","name","placeholder","   ","required","",1,"form-control",3,"ngModel","ngModelChange"],["name","ngModel"],["for","name"],[1,"text-danger"],["class","pl-2 pt-2 pb-0",4,"ngIf"],["type","text","id","telefoneCelular","name","telefoneCelular","mask","(00) 0000-0000||(00) 0.0000-0000","pattern","^\\(?[1-9]{2}\\)? ?(?:[0-9]|9[0-9])[0-9]{3}\\-?[0-9]{4}$","placeholder","(11) x.0000-0000","required","",1,"form-control",3,"ngModel","hiddenInput","ngModelChange"],["telefoneCelular","ngModel"],["for","telefoneCelular"],["type","email","email","","id","email","name","email","placeholder","example@gmail.com","required","","readonly","",1,"form-control",3,"ngModel","ngModelChange"],["email","ngModel"],["for","email"],[1,"d-flex","justify-content-between","col-lg-12","flex-wrap","p-0"],[4,"ngIf"],[1,"d-flex","col-sm-12","ml-auto","mt-3","mr-0","px-0"],[1,"btn","btn-grey","ml-auto","mr-1",3,"routerLink"],[1,"ml-1",3,"icon"],["type","submit",1,"btn","btn-primary","mr-0",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],[1,"pl-2","pt-2","pb-0"],["class","text-danger",4,"ngIf"],["class","text-red",3,"innerHTML",4,"ngFor","ngForOf"],[1,"text-red",3,"innerHTML"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(t,e){if(1&t){const l=n.EpF();n.TgZ(0,"div",0)(1,"div",1),n.NdJ("click",function(){return e.voltar()}),n.qZA(),n.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5)(6,"strong"),n._uU(7,"Meus dados"),n.qZA()(),n.TgZ(8,"a",6),n.NdJ("click",function(){return e.voltar()}),n._UZ(9,"span")(10,"span"),n.qZA()(),n.TgZ(11,"div",7)(12,"form",8,9),n.NdJ("ngSubmit",function(){n.CHM(l);const r=n.MAs(13);return n.KtG(e.editAccount(r))}),n.TgZ(14,"div",10)(15,"div",11)(16,"div",12)(17,"input",13,14),n.NdJ("ngModelChange",function(r){return e.objeto.name=r}),n.qZA(),n.TgZ(19,"label",15)(20,"span"),n._uU(21,"Nome completo "),n.TgZ(22,"span",16),n._uU(23,"*"),n.qZA()()()(),n.YNc(24,ln,2,1,"div",17),n.qZA()(),n.TgZ(25,"div",10)(26,"div",11)(27,"div",12)(28,"input",18,19),n.NdJ("ngModelChange",function(r){return e.objeto.telefoneCelular=r}),n.qZA(),n.TgZ(30,"label",20)(31,"span"),n._uU(32,"Telefone/celular "),n.TgZ(33,"span",16),n._uU(34,"*"),n.qZA()()()(),n.YNc(35,un,3,2,"div",17),n.qZA()(),n.TgZ(36,"div",10)(37,"div",11)(38,"div",12)(39,"input",21,22),n.NdJ("ngModelChange",function(r){return e.objeto.email=r}),n.qZA(),n.TgZ(41,"label",23)(42,"span"),n._uU(43,"E-mail "),n.TgZ(44,"span",16),n._uU(45,"*"),n.qZA()()()(),n.YNc(46,mn,3,2,"div",17),n.qZA()(),n.TgZ(47,"div",24),n.YNc(48,fn,2,1,"div",25),n.TgZ(49,"div",26)(50,"a",27),n._uU(51," Alterar senha "),n._UZ(52,"fa-icon",28),n.qZA(),n.TgZ(53,"button",29),n.YNc(54,vn,1,0,"span",30),n._uU(55," Salvar "),n.qZA()()()()()()()(),n._UZ(56,"router-outlet")}if(2&t){const l=n.MAs(13),s=n.MAs(18),r=n.MAs(29),u=n.MAs(40);n.ekj("active",e.modalOpen),n.xp6(17),n.Q6J("ngModel",e.objeto.name),n.xp6(7),n.Q6J("ngIf",null!=s.errors&&s.touched),n.xp6(4),n.Q6J("ngModel",e.objeto.telefoneCelular)("hiddenInput",!1),n.xp6(7),n.Q6J("ngIf",null!=r.errors&&r.touched),n.xp6(4),n.Q6J("ngModel",e.objeto.email),n.xp6(7),n.Q6J("ngIf",null!=u.errors&&u.touched),n.xp6(2),n.Q6J("ngIf",e.erro),n.xp6(2),n.Q6J("routerLink",n.DdM(14,_n)),n.xp6(2),n.Q6J("icon",e.faKey),n.xp6(1),n.Q6J("disabled",l.invalid||e.loading),n.xp6(1),n.Q6J("ngIf",e.loading)}},dependencies:[m.sg,m.O5,p.lC,p.yS,L.hx,c._Y,c.Fj,c.JJ,c.JL,c.Q7,c.c5,c.on,c.On,c.F,b.BN,m.Ts]}),o})();var xn=a(1685);function Mn(o,i){1&o&&(n.TgZ(0,"p",16),n._uU(1,"Este campo \xe9 obrigat\xf3rio."),n.qZA())}function Zn(o,i){if(1&o&&(n.TgZ(0,"div",30),n.YNc(1,Mn,2,0,"p",31),n.qZA()),2&o){n.oxw();const t=n.MAs(18);n.xp6(1),n.Q6J("ngIf",t.errors.required)}}function An(o,i){1&o&&(n.TgZ(0,"p",16),n._uU(1,"Esse campo \xe9 obrigat\xf3rio"),n.qZA())}function yn(o,i){if(1&o&&(n.TgZ(0,"div",30),n.YNc(1,An,2,0,"p",31),n.qZA()),2&o){n.oxw();const t=n.MAs(29);n.xp6(1),n.Q6J("ngIf",t.errors.required)}}function bn(o,i){1&o&&(n.TgZ(0,"p",32),n._uU(1,"Senhas n\xe3o s\xe3o iguais"),n.qZA())}function Tn(o,i){1&o&&(n.TgZ(0,"span"),n._uU(1,"Exibir"),n.qZA())}function On(o,i){1&o&&(n.TgZ(0,"span"),n._uU(1,"Esconder"),n.qZA())}function Pn(o,i){if(1&o&&(n.TgZ(0,"div",10)(1,"p",16),n._uU(2),n.qZA()()),2&o){const t=n.oxw();n.xp6(2),n.Oqu(t.erro)}}let Un=(()=>{class o{constructor(t,e,l,s,r,u){this.router=t,this.activatedRoute=e,this.modal=l,this.toastr=s,this.loadingUtils=r,this.accountService=u,this.objeto=new xn.GR,this.loading=!1,this.modalOpen=!1,this.erro="",this.subscription=[];var M=this.accountService.account.subscribe(_=>this.account=_);this.subscription.push(M),setTimeout(()=>{this.modalOpen=!0},200)}ngOnInit(){}voltar(){this.modalOpen=!1,setTimeout(()=>{this.router.navigate([".."],{relativeTo:this.activatedRoute})},200)}send(t){return this.erro="",this.loading=!0,this.loadingUtils.loading.next(!0),t.invalid?(this.erro="Formul\xe1rio inv\xe1lido",void this.toastr.error("Formul\xe1rio inv\xe1lido")):this.objeto.confirmPassword!=this.objeto.password?(this.erro="Senha e confirma\xe7\xe3o de senha devem ser iguais",void this.toastr.error("Senha e confirma\xe7\xe3o de senha devem ser iguais")):((0,J.n)(this.accountService.changePassword(this.objeto)).then(e=>{this.voltar()}).catch(e=>{var l=(0,S.b)(e);this.erro=l,this.toastr.error(l)}).finally(()=>{this.loading=!1}),void setTimeout(()=>{this.loading=!1,this.loadingUtils.loading.next(!1)},300))}}return o.\u0275fac=function(t){return new(t||o)(n.Y36(p.F0),n.Y36(p.gz),n.Y36(w.Q),n.Y36(Y._W),n.Y36(N.b),n.Y36(Z.B))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-change-password"]],decls:51,vars:14,consts:[[1,"modal","modal-change-password"],[1,"modal__bg",3,"click"],[1,"modal__inner",2,"max-width","400px"],[1,"modal__content"],[1,"modal__header"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body"],[3,"ngSubmit"],["form","ngForm"],[1,"form-row"],[1,"form-group","col-lg-12","col-md-12","col-sm-12","col-12","mb-2"],[1,"form-floating"],["id","password","name","password","placeholder","******","required","",1,"form-control",3,"type","ngModel","ngModelChange"],["password","ngModel"],["for","password"],[1,"text-danger"],["class","pl-2 pt-2 pb-0",4,"ngIf"],["id","confirmPassword","name","confirmPassword","placeholder","******","required","",1,"form-control",3,"type","ngModel","ngModelChange"],["confirmPassword","ngModel"],["for","confirmPassword"],["class","text-danger p-2",4,"ngIf"],[1,"d-flex","align-items-center"],["type","checkbox","name","showHide","id","showHide","ngModel","",3,"value"],["showHide","ngModel"],["for","showHide",1,"ml-2"],[4,"ngIf"],["class","form-row",4,"ngIf"],[1,"form-group","form-floating","col-lg-12","col-md-12","col-sm-12","col-12","mb-2"],["type","submit",1,"btn","btn-primary","w-100","py-2",3,"disabled"],[1,"pl-2","pt-2","pb-0"],["class","text-danger",4,"ngIf"],[1,"text-danger","p-2"]],template:function(t,e){if(1&t){const l=n.EpF();n.TgZ(0,"div",0)(1,"div",1),n.NdJ("click",function(){return e.voltar()}),n.qZA(),n.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5)(6,"strong"),n._uU(7,"Alterar senha"),n.qZA()(),n.TgZ(8,"a",6),n.NdJ("click",function(){return e.voltar()}),n._UZ(9,"span")(10,"span"),n.qZA()(),n.TgZ(11,"div",7)(12,"form",8,9),n.NdJ("ngSubmit",function(){n.CHM(l);const r=n.MAs(13);return n.KtG(e.send(r))}),n.TgZ(14,"div",10)(15,"div",11)(16,"div",12)(17,"input",13,14),n.NdJ("ngModelChange",function(r){return e.objeto.password=r}),n.qZA(),n.TgZ(19,"label",15)(20,"span"),n._uU(21,"Senha "),n.TgZ(22,"span",16),n._uU(23,"*"),n.qZA()()()(),n.YNc(24,Zn,2,1,"div",17),n.qZA()(),n.TgZ(25,"div",10)(26,"div",11)(27,"div",12)(28,"input",18,19),n.NdJ("ngModelChange",function(r){return e.objeto.confirmPassword=r}),n.qZA(),n.TgZ(30,"label",20)(31,"span"),n._uU(32,"Confirmar Senha "),n.TgZ(33,"span",16),n._uU(34,"*"),n.qZA()()()(),n.YNc(35,yn,2,1,"div",17),n.YNc(36,bn,2,0,"p",21),n.qZA()(),n.TgZ(37,"div",10)(38,"div",11)(39,"div",22),n._UZ(40,"input",23,24),n.TgZ(42,"label",25),n.YNc(43,Tn,2,0,"span",26),n.YNc(44,On,2,0,"span",26),n._uU(45," senha "),n.qZA()()()(),n.YNc(46,Pn,3,1,"div",27),n.TgZ(47,"div",10)(48,"div",28)(49,"button",29),n._uU(50,"Salvar"),n.qZA()()()()()()()()}if(2&t){const l=n.MAs(13),s=n.MAs(18),r=n.MAs(29),u=n.MAs(41);n.ekj("active",e.modalOpen),n.xp6(17),n.Q6J("type",u.value?"password":"text")("ngModel",e.objeto.password),n.xp6(7),n.Q6J("ngIf",null!=s.errors&&s.touched),n.xp6(4),n.Q6J("type",u.value?"password":"text")("ngModel",e.objeto.confirmPassword),n.xp6(7),n.Q6J("ngIf",null!=r.errors&&r.touched),n.xp6(1),n.Q6J("ngIf",s.value!=r.value),n.xp6(4),n.Q6J("value",!0),n.xp6(3),n.Q6J("ngIf",u.value),n.xp6(1),n.Q6J("ngIf",!u.value),n.xp6(2),n.Q6J("ngIf",e.erro),n.xp6(3),n.Q6J("disabled",l.invalid||e.loading||s.value!=r.value)}},dependencies:[m.O5,c._Y,c.Fj,c.Wl,c.JJ,c.JL,c.Q7,c.On,c.F],styles:[".modal-change-password[_ngcontent-%COMP%]{z-index:999}"]}),o})();var T=a(1735);const En=[{path:"",component:E,children:[{path:"my-account",component:Cn,children:[{path:"change-password",component:Un}]},{path:"minha-empresa/:empresa_nome",component:rn},{path:"carteira-setup",loadChildren:()=>Promise.all([a.e(445),a.e(341),a.e(875),a.e(592),a.e(43)]).then(a.bind(a,2043)).then(o=>o.CarteiraSetupModule),canActivate:[T.p],data:{roles:[d.u.Admin,d.u.Master]}},{path:"clientes",loadChildren:()=>Promise.all([a.e(445),a.e(341),a.e(193),a.e(592),a.e(235)]).then(a.bind(a,235)).then(o=>o.ClientesModule),canActivate:[T.p],data:{roles:[d.u.Admin,d.u.Master,d.u.Backoffice]}},{path:"produtos",loadChildren:()=>Promise.all([a.e(445),a.e(490),a.e(592),a.e(730)]).then(a.bind(a,9179)).then(o=>o.ProdutosModule),canActivate:[T.p],data:{roles:[d.u.Admin,d.u.Master]}},{path:"usuarios",loadChildren:()=>Promise.all([a.e(445),a.e(843),a.e(592),a.e(343)]).then(a.bind(a,6343)).then(o=>o.UsuariosModule),canActivate:[T.p],data:{roles:[d.u.Admin,d.u.Master]}},{path:"empresas",loadChildren:()=>Promise.all([a.e(445),a.e(341),a.e(193),a.e(875),a.e(490),a.e(843),a.e(918)]).then(a.bind(a,4918)).then(o=>o.EmpresasModule),canActivate:[T.p],data:{roles:[d.u.Admin]}}]}];let Qn=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=n.oAB({type:o}),o.\u0275inj=n.cJS({imports:[p.Bz.forChild(En),p.Bz]}),o})();function Sn(o,i){return()=>new Promise((t,e)=>{(0,J.n)(o.refreshToken()).then(l=>{if("/account/login"==window.location.pathname){var s=window.location.search,r=s.split("?returnUrl=");(s=r[r.length-1]).trim()?i.navigateByUrl(decodeURIComponent(s)):i.navigate([""])}}).catch(l=>{}).finally(()=>{t()})})}let Yn=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=n.oAB({type:o,bootstrap:[E]}),o.\u0275inj=n.cJS({providers:[{provide:n.ip1,useFactory:Sn,multi:!0,deps:[Z.B,p.F0]}],imports:[m.ez,Qn,L.yI.forChild(),c.u5,b.uH]}),o})()}}]);