"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[952],{2952:(Tn,P,a)=>{a.r(P),a.d(P,{LoggedInModule:()=>bn});var n=a(4650),f=a(6895),p=a(8627),h=a(9876),U=a(7185);let v=(()=>{class e{constructor(t,o,r){this.accountService=t,this.router=o,this.toastr=r}canActivate(t,o){let r=this.accountService.accountValue;return r?!(t.data.roles&&!t.data.roles.includes(r?.role)&&(this.toastr.error("Acesso n\xe3o autorizado.1"),this.router.navigate([""]),1)):(this.toastr.error("Acesso n\xe3o autorizado. "),this.toastr.error("Fa\xe7a login. "),this.router.navigate(["account","login"],{queryParams:{returnUrl:o.url}}),!1)}}return e.\u0275fac=function(t){return new(t||e)(n.LFG(h.B),n.LFG(p.F0),n.LFG(U._W))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var d=a(4409),A=a(1135),_=a(8259),I=a(9243),L=a(46);let Z=(()=>{class e{constructor(t,o){this.crypto=t,this.table=o,this.open=new A.X(!1),this.menuHeaderOpen=new A.X(!1)}get aside(){var t=!!localStorage.getItem("navigation")&&this.crypto.decrypt(localStorage.getItem("navigation"));return this.setMenuAside(t),this.open.value}toggleMenuAside(){this.setMenuAside(!this.open.value)}setMenuAside(t){var o=this.crypto.encrypt(t)??"";localStorage.setItem("navigation",o),this.open.next(t)}toggleMenuHeader(){this.menuHeaderOpen.next(!this.menuHeaderOpen.value)}openMenuHeader(){this.menuHeaderOpen.next(!0)}closeMenuHeader(){this.menuHeaderOpen.next(!1)}clickOut(){var t=this;_("body").on("click",function(o){t.setMenuAside(!1),t.closeMenuHeader()}),_(".header__userLogado").on("click",function(o){o.stopPropagation()}),_(".navigation__toggle").on("click",function(o){o.stopPropagation()}),_(".aside").on("click",function(o){o.stopPropagation()})}}return e.\u0275fac=function(t){return new(t||e)(n.LFG(I.w),n.LFG(L.i))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})(),O=(()=>{class e{constructor(t){this.crypto=t,this.ativado=new A.X(!1)}toggle(){this.setAtivado(!this.ativado.value)}setAtivado(t){this.ativado.next(t);var o=this.crypto.encrypt(this.ativado.value);null!=o?localStorage.setItem("dark-mode",o):localStorage.removeItem("dark-mode")}getAtivado(){var t=localStorage.getItem("dark-mode");if(t){var o=this.crypto.decrypt(t);null!=o&&this.setAtivado(o)}return this.ativado}}return e.\u0275fac=function(t){return new(t||e)(n.LFG(I.w))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();function b(e){this.message=e}(b.prototype=new Error).name="InvalidCharacterError";var k=typeof window<"u"&&window.atob&&window.atob.bind(window)||function(e){var i=String(e).replace(/=+$/,"");if(i.length%4==1)throw new b("'atob' failed: The string to be decoded is not correctly encoded.");for(var t,o,r=0,s=0,l="";o=i.charAt(s++);~o&&(t=r%4?64*t+o:o,r++%4)?l+=String.fromCharCode(255&t>>(-2*r&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return l};function y(e){this.message=e}(y.prototype=new Error).name="InvalidTokenError";var J=a(7549),S=a(5861),u=a(801),E=a(8913),x=a(3868);const F=function(){return["my-account"]};let H=(()=>{class e{constructor(t,o,r,s){var l=this;this.modoEscuro=t,this.accountService=o,this.header=r,this.empresaService=s,this.Role=d.u,this.faSignOut=u.HEx,this.faIdCard=u.Ukp,this.faKey=u.DD4,this.faUser=u.ILF,this.modoEscuroAtivado=!1,this.userLogadoOpen=!1,this.nomeAbreviado="",this.perfil="",this.modoEscuro.getAtivado().subscribe(c=>this.modoEscuroAtivado=c),this.header.menuHeaderOpen.subscribe(c=>this.userLogadoOpen=c),this.accountService.account.subscribe(function(){var c=(0,S.Z)(function*(m){if(l.userLogado=m,m){l.perfil=d.u[m.perfilAcesso_Id];let M=m?.name.split(" ");l.nomeAbreviado=1==M.length?M[0]:M[0]+" "+M[M.length-1]}});return function(m){return c.apply(this,arguments)}}())}ngOnInit(){}toggleMenuHeader(){this.header.toggleMenuHeader()}sair(){this.accountService.logout()}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(O),n.Y36(h.B),n.Y36(Z),n.Y36(E.P))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-header"]],decls:25,vars:14,consts:[[1,"header"],[1,"header-logo"],["src","assets/img/logo-planner.png","alt","Logo Planner"],[1,"header__userLogado","ml-auto"],[1,"header__userLogado-content",3,"click"],[1,"header__userLogado-img"],[3,"icon"],[1,"header__userLogado-text"],[1,"header__userLogado-submenu"],[1,"header__userLogado-submenu-link"],[1,"header__userLogado-submenu-link",3,"routerLink"],[2,"margin-right","8px"],[1,"header__userLogado-submenu-link",3,"click"]],template:function(t,o){1&t&&(n.TgZ(0,"header",0)(1,"div",1),n._UZ(2,"img",2),n.qZA(),n.TgZ(3,"div",3)(4,"div",4),n.NdJ("click",function(){return o.toggleMenuHeader()}),n.TgZ(5,"div",5),n._UZ(6,"fa-icon",6),n.qZA(),n.TgZ(7,"div",7)(8,"p"),n._uU(9),n.qZA(),n.TgZ(10,"p"),n._uU(11),n.qZA(),n.TgZ(12,"p"),n._uU(13),n.qZA()()()()(),n.TgZ(14,"div",8)(15,"p",9),n._uU(16,"Welcome"),n.qZA(),n.TgZ(17,"a",10)(18,"span",11),n._UZ(19,"fa-icon",6),n.qZA(),n._uU(20," Meus dados "),n.qZA(),n.TgZ(21,"a",12),n.NdJ("click",function(){return o.sair()}),n.TgZ(22,"span",11),n._UZ(23,"fa-icon",6),n.qZA(),n._uU(24," Sair "),n.qZA()()),2&t&&(n.ekj("dark",o.modoEscuroAtivado),n.xp6(4),n.ekj("header__userLogado-submenu--open",o.userLogadoOpen),n.xp6(2),n.Q6J("icon",o.faUser),n.xp6(3),n.Oqu(o.nomeAbreviado),n.xp6(2),n.Oqu(null==o.userLogado?null:o.userLogado.email),n.xp6(2),n.Oqu(o.perfil),n.xp6(1),n.ekj("header__userLogado-submenu--open",o.userLogadoOpen),n.xp6(3),n.Q6J("routerLink",n.DdM(13,F)),n.xp6(2),n.Q6J("icon",o.faIdCard),n.xp6(4),n.Q6J("icon",o.faSignOut))},dependencies:[p.yS,x.BN],styles:[".header[_ngcontent-%COMP%]{height:50px;position:sticky;top:0;left:0;width:100%;background-color:#fff;background-color:var(--primary);box-shadow:2px 2px 2px #0000000d;display:flex;align-items:center;justify-content:space-between;margin-top:0;margin-bottom:10px}.header-logo[_ngcontent-%COMP%]{height:100%;overflow:hidden;padding:5px 5px 5px 50px;z-index:-1;display:flex}.header-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:80%;width:auto;margin:auto 0;display:block}.header__userLogado[_ngcontent-%COMP%]{height:100%;position:relative;display:flex;justify-content:center;width:auto;right:20px;max-width:100%}.header__userLogado-content[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100%;padding:0 25px 0 30px;box-sizing:border-box;background-color:#fff;background-color:var(--primary);z-index:2;position:relative;cursor:pointer;margin:auto 0;transition:.3s;border:none}.header__userLogado-content[_ngcontent-%COMP%]:hover{background-color:#f5f5f5;background-color:var(--primary-dark)}.header__userLogado-content.header__userLogado-submenu--open[_ngcontent-%COMP%]{border:1px #d2d2d2 solid;border-color:var(--primary);background-color:var(--primary-dark);border-top:none;border-bottom:none;height:100%}.header__userLogado-img[_ngcontent-%COMP%]{width:25px;height:25px;background-size:cover;background-position:center;border-radius:50%;border:1px #c7c6c6 solid;background-color:#fff;cursor:pointer;margin-left:-15px;display:flex;align-items:center;justify-content:center;color:var(--primary)}.header__userLogado-img[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{color:var(--primary)}.header__userLogado-text[_ngcontent-%COMP%]{margin-left:10px;cursor:pointer}.header__userLogado-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#fafcff;cursor:pointer;line-height:1.2;font-size:12px;font-weight:100;letter-spacing:.4px;font-family:Light}.header__userLogado-submenu[_ngcontent-%COMP%]{position:absolute;top:0%;left:auto;right:0vw;transform:translateY(-100%);width:200px;border:1px #d2d2d2 solid;border-top:0;border-radius:0 0 3px 3px;display:flex;flex-flow:column;align-items:stretch;padding:5px 0;opacity:0;z-index:-1;visibility:hidden;transition:.3s;background-color:#fff}.header__userLogado-submenu.header__userLogado-submenu--open[_ngcontent-%COMP%]{transform:translate(0);opacity:1;visibility:visible;transition:.3s;top:100%}p.header__userLogado-submenu-link[_ngcontent-%COMP%]{font-weight:700}.header__userLogado-submenu-link[_ngcontent-%COMP%]{padding:4px 15px;font-size:11px;font-family:Regular;color:#888;text-transform:uppercase;cursor:pointer;text-decoration:none}.header__userLogado-submenu-link[_ngcontent-%COMP%]:not(p):hover{background-color:#cdcdcd70}.header__nav[_ngcontent-%COMP%]{height:100%;display:flex}.header__nav-link[_ngcontent-%COMP%]{display:flex;align-items:center;padding:5px 1vw;text-decoration:none;color:#fbf9f9;transition:.3s}.header__nav-link[_ngcontent-%COMP%]:hover{background:#00000026}.dropdown-empresas[_ngcontent-%COMP%]{background-color:#484848;color:#fff}.dropdown-empresas[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{color:#484848;background:#fff}"]}),e})(),q=(()=>{class e{constructor(t){this.modoEscuro=t,this.modoEscuroAtivado=!1,this.modoEscuro.getAtivado().subscribe(o=>this.modoEscuroAtivado=o)}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(O))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-footer"]],decls:3,vars:2,consts:[[1,"footer"],[1,"text-center"]],template:function(t,o){1&t&&(n.TgZ(0,"div",0)(1,"p",1),n._uU(2,"Copyright 2022"),n.qZA()()),2&t&&n.ekj("dark",o.modoEscuroAtivado)},styles:[".footer[_ngcontent-%COMP%]{height:26px;background:#100f0f;margin-top:auto;width:100vw;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px}.footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff;font-size:13px}"]}),e})();const z=function(e){return["minha-empresa",e]};function R(e,i){if(1&e&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"fa-icon",10),n.qZA(),n._uU(3," Minha empresa "),n.qZA()),2&e){const t=n.oxw();n.Q6J("routerLink",n.VKq(2,z,null==t.account||null==t.account.empresa?null:t.account.empresa.nome)),n.xp6(2),n.Q6J("icon",t.faIdCard)}}const B=function(){return["empresas"]};function D(e,i){if(1&e&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"fa-icon",10),n.qZA(),n._uU(3," Empresas "),n.qZA()),2&e){const t=n.oxw();n.Q6J("routerLink",n.DdM(2,B)),n.xp6(2),n.Q6J("icon",t.faCity)}}const G=function(){return["clientes"]};function V(e,i){1&e&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"i",11),n.qZA(),n._uU(3," Clientes "),n.qZA()),2&e&&n.Q6J("routerLink",n.DdM(1,G))}const K=function(){return["produtos"]};function X(e,i){if(1&e&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"fa-icon",10),n.qZA(),n._uU(3," Produtos "),n.qZA()),2&e){const t=n.oxw();n.Q6J("routerLink",n.DdM(2,K)),n.xp6(2),n.Q6J("icon",t.faHandHoldingDollar)}}const W=function(){return["carteira-setup"]};function $(e,i){1&e&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"i",11),n.qZA(),n._uU(3," Setup "),n.qZA()),2&e&&n.Q6J("routerLink",n.DdM(1,W))}const nn=function(){return["usuarios"]};function en(e,i){if(1&e&&(n.TgZ(0,"a",8)(1,"span",9),n._UZ(2,"fa-icon",10),n.qZA(),n._uU(3," Usu\xe1rios "),n.qZA()),2&e){const t=n.oxw();n.Q6J("routerLink",n.DdM(2,nn)),n.xp6(2),n.Q6J("icon",t.faUsers)}}let on=(()=>{class e{constructor(t,o){var r=this;this.header=t,this.accountService=o,this.Role=d.u,this.faHandHoldingDollar=u.VPG,this.faUsers=u.FVb,this.faPercent=u.jGC,this.faCity=u.SBo,this.faIdCard=u.Ukp,this.menuOpen=!1,this.menuOpen=this.header.aside,this.header.open.subscribe(s=>this.menuOpen=s),this.accountService.account.subscribe(function(){var s=(0,S.Z)(function*(l){r.account=l});return function(l){return s.apply(this,arguments)}}())}ngOnInit(){}toggleAside(){this.header.toggleMenuAside()}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(Z),n.Y36(h.B))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-navigation"]],decls:17,vars:8,consts:[[1,"navigation"],[1,"navigation__toggle-content"],[1,"navigation__toggle",3,"click"],[1,"navigation__content"],[1,"navigation__logo"],["src","assets/img/logo-planner.png","alt","Logo Planner"],[1,"navigation__links"],["class","navigation__links-item",3,"routerLink",4,"ngIf"],[1,"navigation__links-item",3,"routerLink"],[1,"navigation__item-icon"],[3,"icon"],[1,"pi","pi-wallet"]],template:function(t,o){1&t&&(n.TgZ(0,"aside",0)(1,"div",1)(2,"button",2),n.NdJ("click",function(){return o.toggleAside()}),n._UZ(3,"span")(4,"span")(5,"span"),n.qZA()(),n.TgZ(6,"div",3)(7,"div",4),n._UZ(8,"img",5)(9,"hr"),n.qZA(),n.TgZ(10,"div",6),n.YNc(11,R,4,4,"a",7),n.YNc(12,D,4,3,"a",7),n.YNc(13,V,4,2,"a",7),n.YNc(14,X,4,3,"a",7),n.YNc(15,$,4,2,"a",7),n.YNc(16,en,4,3,"a",7),n.qZA()()()),2&t&&(n.ekj("open",o.menuOpen),n.xp6(11),n.Q6J("ngIf",(null==o.account?null:o.account.role)==o.Role.Master||(null==o.account?null:o.account.role)==o.Role.Backoffice),n.xp6(1),n.Q6J("ngIf",(null==o.account?null:o.account.role)==o.Role.Admin),n.xp6(1),n.Q6J("ngIf",(null==o.account?null:o.account.role)==o.Role.Admin||(null==o.account?null:o.account.role)==o.Role.Master||(null==o.account?null:o.account.role)==o.Role.Backoffice),n.xp6(1),n.Q6J("ngIf",(null==o.account?null:o.account.role)==o.Role.Admin||(null==o.account?null:o.account.role)==o.Role.Master),n.xp6(1),n.Q6J("ngIf",(null==o.account?null:o.account.role)==o.Role.Admin||(null==o.account?null:o.account.role)==o.Role.Master),n.xp6(1),n.Q6J("ngIf",(null==o.account?null:o.account.role)==o.Role.Admin||(null==o.account?null:o.account.role)==o.Role.Master))},dependencies:[f.O5,p.yS,x.BN],styles:[".navigation[_ngcontent-%COMP%]{position:fixed;left:0;top:0;height:100vh;max-width:230px;width:80%;transition:.3s;transform:translate(-100%)}.navigation.open[_ngcontent-%COMP%]{transform:translate(0)}.navigation__toggle-content[_ngcontent-%COMP%]{position:absolute;right:0;z-index:1;display:flex;align-items:center;justify-content:center;transform:translate(calc(100% + 10px));height:50px}.navigation__toggle[_ngcontent-%COMP%]{position:relative;left:5px;width:30px;height:30px;background-color:var(--primary);display:flex;align-items:center;justify-content:center;border:2px var(--primary) solid;border-radius:5px;transition:.3s}.navigation__toggle-logo[_ngcontent-%COMP%]{height:55px;overflow:hidden;transform:translateY(-5px) translate(-40px);padding:5px 5px 5px 50px;z-index:-1}.navigation__toggle-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;width:auto}.navigation__toggle[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.navigation.open[_ngcontent-%COMP%]   .navigation__toggle[_ngcontent-%COMP%]{background-color:var(--primary);border-color:var(--primary)}.navigation__toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{width:60%;height:2px;background-color:#fff;position:absolute;border-radius:5px}.navigation__toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child{transform:translateY(-5px)}.navigation__toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child{transform:translateY(5px)}.navigation__content[_ngcontent-%COMP%]{height:100vh;overflow-y:auto;display:flex;flex-flow:column;background-color:var(--primary);z-index:1;position:absolute;width:100%;box-shadow:2px 2px 13px 3px #00000036;transition:.3s}.navigation__logo[_ngcontent-%COMP%]{padding:13px 15px 0;display:flex;flex-flow:column;justify-content:space-between}.navigation__logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:auto;width:90%}.navigation__logo[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff;line-height:1}.navigation__logo[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%]{width:100%;height:1px;background-color:#fff;background-color:var(--primary);opacity:.3;opacity:0;margin:0}.navigation__links[_ngcontent-%COMP%]{display:flex;flex-flow:column;margin-top:2vh;position:relative;margin:calc(.5vh + 10px) 10px 0}.navigation__links[_ngcontent-%COMP%]:before{position:absolute;left:0;top:19px;height:calc(100% - 35px);width:1px;background-color:#fff;opacity:.3}.navigation__links-item[_ngcontent-%COMP%]{padding:6px 10px;text-decoration:none;color:#ffffffc7;font-weight:100;font-size:15px;text-transform:lowercase;transition:.3s;height:35px;position:relative;display:flex;align-items:center}.navigation__links-item[_ngcontent-%COMP%]:before{position:absolute;top:50%;left:0;width:20px;height:1px;background-color:#fff;opacity:.3;z-index:-1}.navigation__item-icon[_ngcontent-%COMP%]{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;background-color:#125268;border-radius:3px;margin-right:8px;transition:.2s;font-size:15px}.navigation__links-item[_ngcontent-%COMP%]:hover   .navigation__item-icon[_ngcontent-%COMP%]{background:var(--primary-light)}"]}),e})();const C=function(e){return{"z-index":e,position:"relative"}};let Q=(()=>{class e{constructor(t,o,r,s,l){this.modoEscuro=t,this.modal=o,this.table=r,this.header=s,this.account=l,this.modoEscuroAtivado=!1,this.modalOpen=!1,this.navigationOpen=!1,this.loading=!1,this.modoEscuro.getAtivado().subscribe(c=>this.modoEscuroAtivado=c),this.modal.getOpen().subscribe(c=>this.modalOpen=c),this.header.open.subscribe(c=>this.navigationOpen=c),this.table.loading.subscribe(c=>this.loading=c),this.account.account.subscribe(c=>{if(c){var m=this.getDecodedAccessToken(c?.jwtToken);console.log(m)}})}ngOnInit(){}getDecodedAccessToken(t){try{return function Y(e,i){if("string"!=typeof e)throw new y("Invalid token specified");var t=!0===(i=i||{}).header?0:1;try{return JSON.parse(function j(e){var i=e.replace(/-/g,"+").replace(/_/g,"/");switch(i.length%4){case 0:break;case 2:i+="==";break;case 3:i+="=";break;default:throw"Illegal base64url string!"}try{return decodeURIComponent(k(i).replace(/(.)/g,function(o,r){var s=r.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}catch{return k(i)}}(e.split(".")[t]))}catch(o){throw new y("Invalid token specified: "+o.message)}}(t)}catch{return null}}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(O),n.Y36(J.Q),n.Y36(L.i),n.Y36(Z),n.Y36(h.B))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-initial"]],decls:6,vars:14,consts:[[3,"ngStyle"],[1,"main",3,"ngStyle"],[1,"main-content"]],template:function(t,o){1&t&&(n._UZ(0,"app-navigation",0),n.TgZ(1,"div",1)(2,"div",2),n._UZ(3,"app-header",0)(4,"router-outlet"),n.qZA()(),n._UZ(5,"app-footer",0)),2&t&&(n.Q6J("ngStyle",n.VKq(6,C,o.modalOpen?"1":"2")),n.xp6(1),n.Q6J("ngStyle",n.VKq(8,C,o.modalOpen?"2":"0")),n.xp6(1),n.ekj("navigation-open",o.navigationOpen),n.xp6(1),n.Q6J("ngStyle",n.VKq(10,C,o.modalOpen?"0":"1")),n.xp6(2),n.Q6J("ngStyle",n.VKq(12,C,o.modalOpen?"0":"1")))},dependencies:[f.PC,p.lC,H,q,on],styles:[".main[_ngcontent-%COMP%]{padding:0;z-index:0;position:relative;min-height:calc(100vh - 26px)}@media (min-width: 800px){.main-content[_ngcontent-%COMP%]{max-width:100vw;transition:.3s;margin-right:0;margin-left:auto;min-height:calc(100vh - 26px)}.main-content.navigation-open[_ngcontent-%COMP%]{max-width:calc(100vw - 230px);margin-left:auto}}"]}),e})();var N=a(9398),T=a(1094);let tn=(()=>{class e{constructor(t,o){this.accountService=t,this.empresaService=o,this.faIdCard=u.Ukp,this.empresa=new N.oW,this.cnpj="",this.empresa=this.accountService.accountValue?.empresa??new N.oW,this.empresaService.get(this.empresa.id).subscribe(r=>{this.empresa=r,this.cnpj=this.empresa.cnpj.toString().padStart(14,"0")})}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(h.B),n.Y36(E.P))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-minha-empresa"]],decls:39,vars:12,consts:[[1,"page"],[1,"page__header"],[1,"title-icon"],[3,"icon"],[1,"mr-auto"],[1,"page__header-title"],[1,"page__header-subtitle"],[1,"d-flex","flex-wrap","justify-content-start","px-3"],[1,"col-md-5","col-12","mx-0","ps-0"],[1,"card","card-body"],[1,"home__container-header","mb-2"],[1,"col-md-5","col-12","mx-0","px-0"]],template:function(t,o){1&t&&(n.TgZ(0,"section",0)(1,"div",1)(2,"span",2),n._UZ(3,"fa-icon",3),n.qZA(),n.TgZ(4,"div",4)(5,"h3",5),n._uU(6),n.qZA(),n.TgZ(7,"p",6)(8,"small"),n._uU(9,"Dados da minha empresa"),n.qZA()()()(),n.TgZ(10,"div",7)(11,"div",8)(12,"div",9)(13,"div",10)(14,"h6"),n._uU(15,"Dados Cadastrais"),n.qZA()(),n.TgZ(16,"p"),n._uU(17,"Raz\xe3o social: "),n.TgZ(18,"strong"),n._uU(19),n.qZA()(),n.TgZ(20,"p"),n._uU(21),n.ALo(22,"mask"),n.qZA(),n.TgZ(23,"p"),n._uU(24),n.qZA()()(),n.TgZ(25,"div",11)(26,"div",9)(27,"div",10)(28,"h6"),n._uU(29,"Contagem de registros"),n.qZA()(),n.TgZ(30,"p"),n._uU(31),n.qZA(),n.TgZ(32,"p"),n._uU(33),n.qZA(),n.TgZ(34,"p"),n._uU(35),n.qZA(),n.TgZ(36,"p"),n._uU(37),n.qZA()()()()(),n._UZ(38,"router-outlet")),2&t&&(n.xp6(3),n.Q6J("icon",o.faIdCard),n.xp6(3),n.Oqu(o.empresa.nome),n.xp6(13),n.Oqu(o.empresa.nome),n.xp6(2),n.hij("CNPJ: ",n.xi3(22,9,o.cnpj,"00.000.000/0000-00"),""),n.xp6(3),n.hij("Email: ",o.empresa.email,""),n.xp6(7),n.hij("Usu\xe1rios: ",o.empresa.account.length," total"),n.xp6(2),n.hij("Produtos: ",o.empresa.produto.length," total"),n.xp6(2),n.hij("Setups: ",o.empresa.carteiraSetup.length," total"),n.xp6(2),n.hij("Clientes: ",o.empresa.cliente.length," total"))},dependencies:[p.lC,x.BN,T.Iq]}),e})();var an=a(1800),g=a(433);function rn(e,i){1&e&&(n.TgZ(0,"p",16),n._uU(1,"Este campo \xe9 obrigat\xf3rio."),n.qZA())}function sn(e,i){if(1&e&&(n.TgZ(0,"div",31),n.YNc(1,rn,2,0,"p",32),n.qZA()),2&e){n.oxw();const t=n.MAs(18);n.xp6(1),n.Q6J("ngIf",t.errors.required)}}function ln(e,i){1&e&&(n.TgZ(0,"p",16),n._uU(1,"Este campo \xe9 obrigat\xf3rio."),n.qZA())}function cn(e,i){1&e&&(n.TgZ(0,"p",16),n._uU(1,"Telefone/celular inv\xe1lido"),n.qZA())}function dn(e,i){if(1&e&&(n.TgZ(0,"div",31),n.YNc(1,ln,2,0,"p",32),n.YNc(2,cn,2,0,"p",32),n.qZA()),2&e){n.oxw();const t=n.MAs(29);n.xp6(1),n.Q6J("ngIf",t.errors.required),n.xp6(1),n.Q6J("ngIf",t.errors.mask)}}function un(e,i){1&e&&(n.TgZ(0,"p",16),n._uU(1,"Este campo \xe9 obrigat\xf3rio."),n.qZA())}function pn(e,i){1&e&&(n.TgZ(0,"p",16),n._uU(1,"E-mail inv\xe1lido"),n.qZA())}function gn(e,i){if(1&e&&(n.TgZ(0,"div",31),n.YNc(1,un,2,0,"p",32),n.YNc(2,pn,2,0,"p",32),n.qZA()),2&e){n.oxw();const t=n.MAs(40);n.xp6(1),n.Q6J("ngIf",t.errors.required),n.xp6(1),n.Q6J("ngIf",t.errors.email)}}function mn(e,i){if(1&e&&(n.TgZ(0,"li",34),n._uU(1),n.qZA()),2&e){const t=i.$implicit;n.xp6(1),n.Oqu(t)}}function hn(e,i){if(1&e&&(n.TgZ(0,"ul"),n.YNc(1,mn,2,1,"li",33),n.qZA()),2&e){const t=n.oxw();n.xp6(1),n.Q6J("ngForOf",t.erro)}}function fn(e,i){1&e&&n._UZ(0,"span",35)}const vn=function(){return["..","reset-password"]},An=[{path:"",component:Q,children:[{path:"my-account",component:(()=>{class e{constructor(t,o,r,s){this.router=t,this.modal=o,this.toastr=r,this._loading=s,this.modalOpen=!1,this.faKey=u.DD4,this.objeto={nome:"",email:"",celular:""},this.loading=!1,this.mensagemErro="",this.erro=[],this.modal.getOpen().subscribe(l=>{this.modalOpen=l})}ngOnInit(){setTimeout(()=>{this.modal.setOpen(!0)},200)}voltar(){this.modal.setOpen(!1),setTimeout(()=>{this.router.navigate([".."])},200)}create(t){if(this.erro=[],this.loading=!0,this._loading.loading.next(!0),t.invalid)return this.erro.push("Formul\xe1rio inv\xe1lido"),void this.toastr.error("Formul\xe1rio inv\xe1lido");setTimeout(()=>{this.loading=!1,this._loading.loading.next(!1)},300)}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(p.F0),n.Y36(J.Q),n.Y36(U._W),n.Y36(an.g))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-my-account"]],decls:56,vars:15,consts:[[1,"modal"],[1,"modal__bg",3,"click"],[1,"modal__inner"],[1,"modal__content"],[1,"modal__header"],[1,"text-orange"],[1,"modal__header-close","btn-close",3,"click"],[1,"modal__body"],[3,"ngSubmit"],["form","ngForm"],[1,"form-row"],[1,"form-group","col-lg-12","col-md-12","col-sm-12","col-12","mb-2"],[1,"form-floating"],["type","nome","id","nome","name","nome","placeholder","   ","required","",1,"form-control",3,"ngModel","ngModelChange"],["nome","ngModel"],["for","nome"],[1,"text-danger"],["class","pl-2 pt-2 pb-0",4,"ngIf"],["type","celular","celular","","id","celular","name","celular","mask","(00) 0000-0000||(00) 0.0000-0000","placeholder","(11) x.0000-0000","required","",1,"form-control",3,"ngModel","hiddenInput","ngModelChange"],["celular","ngModel"],["for","celular"],["type","email","email","","id","email","name","email","placeholder","example@gmail.com","required","",1,"form-control",3,"ngModel","ngModelChange"],["email","ngModel"],["for","email"],[1,"d-flex","justify-content-between","col-lg-12","flex-wrap","p-0"],[4,"ngIf"],[1,"d-flex","col-sm-12","ml-auto","mt-3","mr-0","px-0"],[1,"btn","btn-grey","ml-auto","mr-1",3,"routerLink"],[1,"ml-1",3,"icon"],["type","submit",1,"btn","btn-primary","mr-0",3,"disabled"],["class","spinner-border spinner-border-sm mr-1",4,"ngIf"],[1,"pl-2","pt-2","pb-0"],["class","text-danger",4,"ngIf"],["class","text-red",4,"ngFor","ngForOf"],[1,"text-red"],[1,"spinner-border","spinner-border-sm","mr-1"]],template:function(t,o){if(1&t){const r=n.EpF();n.TgZ(0,"div",0)(1,"div",1),n.NdJ("click",function(){return o.voltar()}),n.qZA(),n.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"h3",5)(6,"strong"),n._uU(7,"Meus dados"),n.qZA()(),n.TgZ(8,"a",6),n.NdJ("click",function(){return o.voltar()}),n._UZ(9,"span")(10,"span"),n.qZA()(),n.TgZ(11,"div",7)(12,"form",8,9),n.NdJ("ngSubmit",function(){n.CHM(r);const l=n.MAs(13);return n.KtG(o.create(l))}),n.TgZ(14,"div",10)(15,"div",11)(16,"div",12)(17,"input",13,14),n.NdJ("ngModelChange",function(l){return o.objeto.nome=l}),n.qZA(),n.TgZ(19,"label",15)(20,"span"),n._uU(21,"Nome completo "),n.TgZ(22,"span",16),n._uU(23,"*"),n.qZA()()()(),n.YNc(24,sn,2,1,"div",17),n.qZA()(),n.TgZ(25,"div",10)(26,"div",11)(27,"div",12)(28,"input",18,19),n.NdJ("ngModelChange",function(l){return o.objeto.celular=l}),n.qZA(),n.TgZ(30,"label",20)(31,"span"),n._uU(32,"Telefone/Celular "),n.TgZ(33,"span",16),n._uU(34,"*"),n.qZA()()()(),n.YNc(35,dn,3,2,"div",17),n.qZA()(),n.TgZ(36,"div",10)(37,"div",11)(38,"div",12)(39,"input",21,22),n.NdJ("ngModelChange",function(l){return o.objeto.email=l}),n.qZA(),n.TgZ(41,"label",23)(42,"span"),n._uU(43,"E-mail "),n.TgZ(44,"span",16),n._uU(45,"*"),n.qZA()()()(),n.YNc(46,gn,3,2,"div",17),n.qZA()(),n.TgZ(47,"div",24),n.YNc(48,hn,2,1,"ul",25),n.TgZ(49,"div",26)(50,"a",27),n._uU(51," Resetar senha "),n._UZ(52,"fa-icon",28),n.qZA(),n.TgZ(53,"button",29),n.YNc(54,fn,1,0,"span",30),n._uU(55," Salvar "),n.qZA()()()()()()()()}if(2&t){const r=n.MAs(13),s=n.MAs(18),l=n.MAs(29),c=n.MAs(40);n.ekj("active",o.modalOpen),n.xp6(17),n.Q6J("ngModel",o.objeto.nome),n.xp6(7),n.Q6J("ngIf",null!=s.errors&&s.touched),n.xp6(4),n.Q6J("ngModel",o.objeto.celular)("hiddenInput",!1),n.xp6(7),n.Q6J("ngIf",null!=l.errors&&l.touched),n.xp6(4),n.Q6J("ngModel",o.objeto.email),n.xp6(7),n.Q6J("ngIf",null!=c.errors&&c.touched),n.xp6(2),n.Q6J("ngIf",o.erro),n.xp6(2),n.Q6J("routerLink",n.DdM(14,vn)),n.xp6(2),n.Q6J("icon",o.faKey),n.xp6(1),n.Q6J("disabled",r.invalid||o.loading),n.xp6(1),n.Q6J("ngIf",o.loading)}},dependencies:[f.sg,f.O5,p.yS,T.hx,g._Y,g.Fj,g.JJ,g.JL,g.Q7,g.on,g.On,g.F,x.BN]}),e})()},{path:"minha-empresa/:empresa_nome",component:tn},{path:"carteira-setup",loadChildren:()=>Promise.all([a.e(642),a.e(26),a.e(875),a.e(592),a.e(43)]).then(a.bind(a,2043)).then(e=>e.CarteiraSetupModule),canActivate:[v],data:{roles:[d.u.Admin,d.u.Master]}},{path:"clientes",loadChildren:()=>Promise.all([a.e(642),a.e(26),a.e(588),a.e(592),a.e(834)]).then(a.bind(a,4834)).then(e=>e.ClientesModule),canActivate:[v],data:{roles:[d.u.Admin,d.u.Master,d.u.Backoffice]}},{path:"produtos",loadChildren:()=>Promise.all([a.e(642),a.e(490),a.e(592),a.e(730)]).then(a.bind(a,9179)).then(e=>e.ProdutosModule),canActivate:[v],data:{roles:[d.u.Admin,d.u.Master]}},{path:"usuarios",loadChildren:()=>Promise.all([a.e(642),a.e(843),a.e(592),a.e(343)]).then(a.bind(a,6343)).then(e=>e.UsuariosModule),canActivate:[v],data:{roles:[d.u.Admin,d.u.Master]}},{path:"empresas",loadChildren:()=>Promise.all([a.e(642),a.e(26),a.e(588),a.e(875),a.e(843),a.e(490),a.e(268)]).then(a.bind(a,2268)).then(e=>e.EmpresasModule),canActivate:[v],data:{roles:[d.u.Admin]}}]}];let Zn=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[p.Bz.forChild(An),p.Bz]}),e})();var On=a(4284);let bn=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e,bootstrap:[Q]}),e.\u0275inj=n.cJS({providers:[{provide:n.ip1,useFactory:On.A,multi:!0,deps:[h.B]}],imports:[f.ez,Zn,T.yI.forChild(),g.u5,x.uH]}),e})()}}]);