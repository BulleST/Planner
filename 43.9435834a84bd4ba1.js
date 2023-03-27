"use strict";(self.webpackChunkplanner=self.webpackChunkplanner||[]).push([[43],{2043:(ce,m,l)=>{l.r(m),l.d(m,{CarteiraSetupModule:()=>ue});var d=l(6895),S=l(7185),u=l(8627),y=l(4458),g=l(8811),C=l(4115),V=l(5623),T=l(5861),f=l(6025),v=l(9398),w=l(8913),M=l(9205),H=l(46),E=l(9808),B=l(9876),t=l(4650),L=l(453),I=l(8944);function D(n,r){1&n&&t._UZ(0,"app-empresa-select")}const Z=function(){return["cadastrar"]},J=[{path:"cadastrar",component:y.G,title:"Planner - Cadastrar carteira "},{path:"editar/:setup_id",component:V.F,title:"Planner - Cadastrar carteira "},{path:"",component:(()=>{class n{constructor(e,i,a,s){var x=this;this.setupService=e,this.empresaService=i,this.table=a,this.accountService=s,this.objeto=new v.oW,this.columns=f.T7,this.list=[],this.tableLinks=[],this.empresaSelected=new v.oW,this.create=(o=this.setupService)=>{o.setObject(new f.Wj)},this.setupService.list.subscribe(o=>this.list=o),this.accountService.account.subscribe(o=>this.account=o),this.empresaService.empresa.subscribe(function(){var o=(0,T.Z)(function*(p){x.empresaSelected=p,0!=p.id&&(yield(0,E.n)(x.setupService.getList()))});return function(p){return o.apply(this,arguments)}}()),this.table.selected.subscribe(o=>{o&&(this.tableLinks=[{label:"Editar",routePath:["editar"],paramsFieldName:["id"]},{label:o.ativo?"Desabilitar":"Habilitar",routePath:[o.ativo?"desabilitar":"habilitar"],paramsFieldName:["id"]}],this.tableLinks=this.table.encryptParams(this.tableLinks))})}ngOnInit(){}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(M.A),t.Y36(w.P),t.Y36(H.i),t.Y36(B.B))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-list"]],decls:17,vars:16,consts:[[1,"page"],[1,"page__header"],[1,"title-icon"],[1,"pi","pi-wallet"],[1,"mr-auto"],[1,"page__header-title"],[1,"page__header-subtitle"],[1,"ml-auto","mb-0","col-xl-3","col-lg-4","col-md-5","col-sm-5","col-12","px-0"],[4,"ngIf"],[1,"page__body"],[3,"createLink","onCreate","canCreate","list","filterLink","filterTable","paginator","sortTable","menuTable","columns","tableLinks","selectable"]],template:function(e,i){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"span",2),t._UZ(3,"i",3),t.qZA(),t.TgZ(4,"div",4)(5,"h3",5),t._uU(6,"Setup"),t.qZA(),t.TgZ(7,"p",6)(8,"small"),t._uU(9,"Setup de produtos cadastrados em "),t.TgZ(10,"strong"),t._uU(11),t.qZA()()()(),t.TgZ(12,"div",7),t.YNc(13,D,1,0,"app-empresa-select",8),t.qZA()(),t.TgZ(14,"div",9),t._UZ(15,"app-list-shared",10),t.qZA()(),t._UZ(16,"router-outlet")),2&e&&(t.xp6(11),t.Oqu(i.empresaSelected.nome),t.xp6(2),t.Q6J("ngIf",i.account&&1==i.account.perfilAcesso_Id),t.xp6(2),t.Q6J("createLink",t.DdM(15,Z))("onCreate",i.create)("canCreate",!0)("list",i.list)("filterLink",!1)("filterTable",!0)("paginator",!0)("sortTable",!0)("menuTable",!0)("canCreate",!0)("columns",i.columns)("tableLinks",i.tableLinks)("selectable",!0))},dependencies:[d.O5,u.lC,L.o,I.l]}),n})(),children:[{path:"excluir/:setup_id",component:C.T,title:"Planner - Excluir carteira "},{path:"habilitar/:setup_id",component:g.T,title:"Planner - Habilitar carteira"},{path:"desabilitar/:setup_id",component:g.T,title:"Planner - Desabilitar carteira"}]}];let F=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[u.Bz.forChild(J),u.Bz]}),n})(),k=(()=>{class n{constructor(){}ngOnInit(){}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-carteira-setup"]],decls:1,vars:0,template:function(e,i){1&e&&t._UZ(0,"router-outlet")},dependencies:[u.lC]}),n})();var b=l(433),G=l(9880),K=l(1094),z=l(9364),Y=l(279),A=l(3868),N=l(5576),h=l(9592);const Q=["sliderHandle"],U=["sliderHandleStart"],W=["sliderHandleEnd"],O=function(n,r){return{left:n,width:r}};function j(n,r){if(1&n&&t._UZ(0,"span",4),2&n){const e=t.oxw();t.Q6J("ngStyle",t.WLB(1,O,null!=e.offset?e.offset+"%":e.handleValues[0]+"%",e.diff?e.diff+"%":e.handleValues[1]-e.handleValues[0]+"%"))}}const R=function(n,r){return{bottom:n,height:r}};function X(n,r){if(1&n&&t._UZ(0,"span",4),2&n){const e=t.oxw();t.Q6J("ngStyle",t.WLB(1,R,null!=e.offset?e.offset+"%":e.handleValues[0]+"%",e.diff?e.diff+"%":e.handleValues[1]-e.handleValues[0]+"%"))}}const $=function(n){return{height:n}};function q(n,r){if(1&n&&t._UZ(0,"span",4),2&n){const e=t.oxw();t.Q6J("ngStyle",t.VKq(1,$,e.handleValue+"%"))}}const ee=function(n){return{width:n}};function te(n,r){if(1&n&&t._UZ(0,"span",4),2&n){const e=t.oxw();t.Q6J("ngStyle",t.VKq(1,ee,e.handleValue+"%"))}}const c=function(n,r){return{left:n,bottom:r}};function ne(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"span",5,6),t.NdJ("keydown",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onHandleKeydown(a))})("mousedown",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onMouseDown(a))})("touchstart",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onTouchStart(a))})("touchmove",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onTouchMove(a))})("touchend",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onTouchEnd(a))}),t.qZA()}if(2&n){const e=t.oxw();t.Udp("transition",e.dragging?"none":null),t.Q6J("ngStyle",t.WLB(8,c,"horizontal"==e.orientation?e.handleValue+"%":null,"vertical"==e.orientation?e.handleValue+"%":null)),t.uIk("tabindex",e.disabled?null:e.tabindex)("aria-valuemin",e.min)("aria-valuenow",e.value)("aria-valuemax",e.max)("aria-labelledby",e.ariaLabelledBy)}}const _=function(n){return{"p-slider-handle-active":n}};function ie(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"span",7,8),t.NdJ("keydown",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onHandleKeydown(a,0))})("mousedown",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onMouseDown(a,0))})("touchstart",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onTouchStart(a,0))})("touchmove",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onTouchMove(a,0))})("touchend",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onTouchEnd(a))}),t.qZA()}if(2&n){const e=t.oxw();t.Udp("transition",e.dragging?"none":null),t.Q6J("ngStyle",t.WLB(9,c,e.rangeStartLeft,e.rangeStartBottom))("ngClass",t.VKq(12,_,0==e.handleIndex)),t.uIk("tabindex",e.disabled?null:e.tabindex)("aria-valuemin",e.min)("aria-valuenow",e.value?e.value[0]:null)("aria-valuemax",e.max)("aria-labelledby",e.ariaLabelledBy)}}function ae(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"span",7,9),t.NdJ("keydown",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onHandleKeydown(a,1))})("mousedown",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onMouseDown(a,1))})("touchstart",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onTouchStart(a,1))})("touchmove",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onTouchMove(a,1))})("touchend",function(a){t.CHM(e);const s=t.oxw();return t.KtG(s.onTouchEnd(a))}),t.qZA()}if(2&n){const e=t.oxw();t.Udp("transition",e.dragging?"none":null),t.Q6J("ngStyle",t.WLB(9,c,e.rangeEndLeft,e.rangeEndBottom))("ngClass",t.VKq(12,_,1==e.handleIndex)),t.uIk("tabindex",e.disabled?null:e.tabindex)("aria-valuemin",e.min)("aria-valuenow",e.value?e.value[1]:null)("aria-valuemax",e.max)("aria-labelledby",e.ariaLabelledBy)}}const se=function(n,r,e,i){return{"p-slider p-component":!0,"p-disabled":n,"p-slider-horizontal":r,"p-slider-vertical":e,"p-slider-animate":i}},re={provide:b.JU,useExisting:(0,t.Gpc)(()=>le),multi:!0};let le=(()=>{class n{constructor(e,i,a,s){this.el=e,this.renderer=i,this.ngZone=a,this.cd=s,this.min=0,this.max=100,this.orientation="horizontal",this.tabindex=0,this.onChange=new t.vpe,this.onSlideEnd=new t.vpe,this.handleValues=[],this.onModelChange=()=>{},this.onModelTouched=()=>{},this.handleIndex=0}onMouseDown(e,i){this.disabled||(this.dragging=!0,this.updateDomData(),this.sliderHandleClick=!0,this.handleIndex=this.range&&this.handleValues&&this.handleValues[0]===this.max?0:i,this.bindDragListeners(),e.target.focus(),e.preventDefault(),this.animate&&h.p.removeClass(this.el.nativeElement.children[0],"p-slider-animate"))}onTouchStart(e,i){if(!this.disabled){var a=e.changedTouches[0];this.startHandleValue=this.range?this.handleValues[i]:this.handleValue,this.dragging=!0,this.handleIndex=this.range&&this.handleValues&&this.handleValues[0]===this.max?0:i,"horizontal"===this.orientation?(this.startx=parseInt(a.clientX,10),this.barWidth=this.el.nativeElement.children[0].offsetWidth):(this.starty=parseInt(a.clientY,10),this.barHeight=this.el.nativeElement.children[0].offsetHeight),this.animate&&h.p.removeClass(this.el.nativeElement.children[0],"p-slider-animate"),e.preventDefault()}}onTouchMove(e,i){if(!this.disabled){var s,a=e.changedTouches[0];s="horizontal"===this.orientation?Math.floor(100*(parseInt(a.clientX,10)-this.startx)/this.barWidth)+this.startHandleValue:Math.floor(100*(this.starty-parseInt(a.clientY,10))/this.barHeight)+this.startHandleValue,this.setValueFromHandle(e,s),e.preventDefault()}}onTouchEnd(e,i){this.disabled||(this.dragging=!1,this.onSlideEnd.emit(this.range?{originalEvent:e,values:this.values}:{originalEvent:e,value:this.value}),this.animate&&h.p.addClass(this.el.nativeElement.children[0],"p-slider-animate"),e.preventDefault())}onBarClick(e){this.disabled||(this.sliderHandleClick||(this.updateDomData(),this.handleChange(e)),this.sliderHandleClick=!1)}onHandleKeydown(e,i){this.disabled||(38==e.which||39==e.which?this.spin(e,1,i):(37==e.which||40==e.which)&&this.spin(e,-1,i))}spin(e,i,a){let s=(this.step||1)*i;this.range?(this.handleIndex=a,this.updateValue(this.values[this.handleIndex]+s),this.updateHandleValue()):(this.updateValue(this.value+s),this.updateHandleValue()),e.preventDefault()}handleChange(e){let i=this.calculateHandleValue(e);this.setValueFromHandle(e,i)}bindDragListeners(){this.ngZone.runOutsideAngular(()=>{const e=this.el?this.el.nativeElement.ownerDocument:"document";this.dragListener||(this.dragListener=this.renderer.listen(e,"mousemove",i=>{this.dragging&&this.ngZone.run(()=>{this.handleChange(i)})})),this.mouseupListener||(this.mouseupListener=this.renderer.listen(e,"mouseup",i=>{this.dragging&&(this.dragging=!1,this.ngZone.run(()=>{this.onSlideEnd.emit(this.range?{originalEvent:i,values:this.values}:{originalEvent:i,value:this.value}),this.animate&&h.p.addClass(this.el.nativeElement.children[0],"p-slider-animate")}))}))})}unbindDragListeners(){this.dragListener&&this.dragListener(),this.mouseupListener&&this.mouseupListener()}setValueFromHandle(e,i){this.sliderHandleClick=!1;let a=this.getValueFromHandle(i);this.range?this.step?this.handleStepChange(a,this.values[this.handleIndex]):(this.handleValues[this.handleIndex]=i,this.updateValue(a,e)):this.step?this.handleStepChange(a,this.value):(this.handleValue=i,this.updateValue(a,e)),this.cd.markForCheck()}handleStepChange(e,i){let a=e-i,s=i;a<0?s=i+Math.ceil(e/this.step-i/this.step)*this.step:a>0&&(s=i+Math.floor(e/this.step-i/this.step)*this.step),this.updateValue(s),this.updateHandleValue()}writeValue(e){this.range?this.values=e||[0,0]:this.value=e||0,this.updateHandleValue(),this.cd.markForCheck()}registerOnChange(e){this.onModelChange=e}registerOnTouched(e){this.onModelTouched=e}setDisabledState(e){this.disabled=e,this.cd.markForCheck()}get rangeStartLeft(){return this.isVertical()?null:this.handleValues[0]+"%"}get rangeStartBottom(){return this.isVertical()?this.handleValues[0]+"%":"auto"}get rangeEndLeft(){return this.isVertical()?null:this.handleValues[1]+"%"}get rangeEndBottom(){return this.isVertical()?this.handleValues[1]+"%":"auto"}isVertical(){return"vertical"===this.orientation}updateDomData(){let e=this.el.nativeElement.children[0].getBoundingClientRect();this.initX=e.left+h.p.getWindowScrollLeft(),this.initY=e.top+h.p.getWindowScrollTop(),this.barWidth=this.el.nativeElement.children[0].offsetWidth,this.barHeight=this.el.nativeElement.children[0].offsetHeight}calculateHandleValue(e){return"horizontal"===this.orientation?100*(e.pageX-this.initX)/this.barWidth:100*(this.initY+this.barHeight-e.pageY)/this.barHeight}updateHandleValue(){this.range?(this.handleValues[0]=100*(this.values[0]<this.min?0:this.values[0]-this.min)/(this.max-this.min),this.handleValues[1]=100*(this.values[1]>this.max?100:this.values[1]-this.min)/(this.max-this.min)):this.handleValue=this.value<this.min?0:this.value>this.max?100:100*(this.value-this.min)/(this.max-this.min)}updateValue(e,i){if(this.range){let a=e;0==this.handleIndex?(a<this.min?(a=this.min,this.handleValues[0]=0):a>this.values[1]&&(a>this.max&&(a=this.max,this.handleValues[0]=100),this.handleValues[0]=a),this.sliderHandleStart.nativeElement.focus()):(a>this.max?(a=this.max,this.handleValues[1]=100,this.offset=this.handleValues[1]):a<this.min?(a=this.min,this.handleValues[1]=a):a<this.values[0]&&(this.offset=this.handleValues[1]),this.sliderHandleEnd.nativeElement.focus()),this.diff=Math.abs(this.handleValues[0]-this.handleValues[1]),this.offset=Math.min(this.handleValues[0],this.handleValues[1]),this.values[this.handleIndex]=this.getNormalizedValue(a),this.onModelChange([this.minVal,this.maxVal]),this.onChange.emit({event:i,values:this.values})}else e<this.min?(e=this.min,this.handleValue=0):e>this.max&&(e=this.max,this.handleValue=100),this.value=this.getNormalizedValue(e),this.onModelChange(this.value),this.onChange.emit({event:i,value:this.value}),this.sliderHandle.nativeElement.focus()}getValueFromHandle(e){return e/100*(this.max-this.min)+this.min}getDecimalsCount(e){return e&&Math.floor(e)!==e&&e.toString().split(".")[1].length||0}getNormalizedValue(e){let i=this.getDecimalsCount(this.step);return i>0?+e.toFixed(i):Math.floor(e)}ngOnDestroy(){this.unbindDragListeners()}get minVal(){return Math.min(this.values[1],this.values[0])}get maxVal(){return Math.max(this.values[1],this.values[0])}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(t.SBq),t.Y36(t.Qsj),t.Y36(t.R0b),t.Y36(t.sBO))},n.\u0275cmp=t.Xpm({type:n,selectors:[["p-slider"]],viewQuery:function(e,i){if(1&e&&(t.Gf(Q,5),t.Gf(U,5),t.Gf(W,5)),2&e){let a;t.iGM(a=t.CRH())&&(i.sliderHandle=a.first),t.iGM(a=t.CRH())&&(i.sliderHandleStart=a.first),t.iGM(a=t.CRH())&&(i.sliderHandleEnd=a.first)}},hostAttrs:[1,"p-element"],inputs:{animate:"animate",disabled:"disabled",min:"min",max:"max",orientation:"orientation",step:"step",range:"range",style:"style",styleClass:"styleClass",ariaLabelledBy:"ariaLabelledBy",tabindex:"tabindex"},outputs:{onChange:"onChange",onSlideEnd:"onSlideEnd"},features:[t._Bn([re])],decls:8,vars:16,consts:[[3,"ngStyle","ngClass","click"],["class","p-slider-range",3,"ngStyle",4,"ngIf"],["class","p-slider-handle",3,"transition","ngStyle","keydown","mousedown","touchstart","touchmove","touchend",4,"ngIf"],["class","p-slider-handle",3,"transition","ngStyle","ngClass","keydown","mousedown","touchstart","touchmove","touchend",4,"ngIf"],[1,"p-slider-range",3,"ngStyle"],[1,"p-slider-handle",3,"ngStyle","keydown","mousedown","touchstart","touchmove","touchend"],["sliderHandle",""],[1,"p-slider-handle",3,"ngStyle","ngClass","keydown","mousedown","touchstart","touchmove","touchend"],["sliderHandleStart",""],["sliderHandleEnd",""]],template:function(e,i){1&e&&(t.TgZ(0,"div",0),t.NdJ("click",function(s){return i.onBarClick(s)}),t.YNc(1,j,1,4,"span",1),t.YNc(2,X,1,4,"span",1),t.YNc(3,q,1,3,"span",1),t.YNc(4,te,1,3,"span",1),t.YNc(5,ne,2,11,"span",2),t.YNc(6,ie,2,14,"span",3),t.YNc(7,ae,2,14,"span",3),t.qZA()),2&e&&(t.Tol(i.styleClass),t.Q6J("ngStyle",i.style)("ngClass",t.l5B(11,se,i.disabled,"horizontal"==i.orientation,"vertical"==i.orientation,i.animate)),t.xp6(1),t.Q6J("ngIf",i.range&&"horizontal"==i.orientation),t.xp6(1),t.Q6J("ngIf",i.range&&"vertical"==i.orientation),t.xp6(1),t.Q6J("ngIf",!i.range&&"vertical"==i.orientation),t.xp6(1),t.Q6J("ngIf",!i.range&&"horizontal"==i.orientation),t.xp6(1),t.Q6J("ngIf",!i.range),t.xp6(1),t.Q6J("ngIf",i.range),t.xp6(1),t.Q6J("ngIf",i.range))},dependencies:[d.mk,d.O5,d.PC],styles:[".p-slider{position:relative}.p-slider .p-slider-handle{position:absolute;cursor:grab;touch-action:none;display:block}.p-slider-range{position:absolute;display:block}.p-slider-horizontal .p-slider-range{top:0;left:0;height:100%}.p-slider-horizontal .p-slider-handle{top:50%}.p-slider-vertical{height:100px}.p-slider-vertical .p-slider-handle{left:50%}.p-slider-vertical .p-slider-range{bottom:0;left:0;width:100%}\n"],encapsulation:2,changeDetection:0}),n})(),oe=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[d.ez]}),n})(),he=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[d.ez]}),n})(),ue=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n,bootstrap:[k]}),n.\u0275inj=t.cJS({imports:[d.ez,F,G.m,S.Rh,b.u5,K.yI.forChild(),z.S,Y.dT,A.uH,N.U$,oe,he]}),n})()}}]);