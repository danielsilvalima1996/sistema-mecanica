(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"8g3Q":function(e,i,t){"use strict";t.r(i),t.d(i,"CadastrosModule",(function(){return x}));var a=t("ofXK"),o=t("tyNb"),r=t("fXoL"),s=t("wBT/"),l=t("VREw"),c=t("3Pt+"),n=t("3qF/");let d=(()=>{class e{constructor(e,i,t,a,o,r){this.notificationService=e,this.router=i,this.route=t,this.pecasService=a,this.fb=o,this.utilService=r,this.page={title:"Cadastro de Pe\xe7as",breadcrumb:{items:[{label:"Home"},{label:"Cadastros"},{label:"Pe\xe7as"}]},actions:[{label:"Adicionar",url:"cadastro/pecas/add"},{label:"Editar",action:()=>{this.editarPeca()}},{label:"Visualizar",action:()=>{this.viewPeca()}}]},this.table={columns:[{property:"id",label:"C\xf3digo",width:"10%"},{property:"marca",label:"Marca",width:"15%"},{property:"modelo",label:"Modelo",width:"20%"},{property:"descricao",label:"Descri\xe7\xe3o",width:"30%"},{property:"valorUnitario",label:"Valor Unit\xe1rio",width:"15%",type:"currency",format:"BRL"},{property:"active",label:"Ativo",width:"10%",type:"boolean"}],items:[],height:0,loading:!1},this.pecasForm=this.fb.group({idPeca:["",[]],marcaPeca:["",[]],descricaoPeca:["",[]],modeloPeca:["",[]],active:["",[]]}),this.selects={ativoOptions:[{label:"Ativo",value:!0},{label:"Inativo",value:!1},{label:"Todos",value:""}]},this.itemSelecionado=""}ngOnInit(){this.getPecas()}get controls(){return this.pecasForm.controls}getSelected(e){this.itemSelecionado=e.id}getUnSelected(){this.itemSelecionado=""}getPecas(){this.loading=!0,this.pecasService.findAll().subscribe(e=>{this.table.items=e},e=>{console.log(e.error),this.loading=!1})}editarPeca(){null!=this.itemSelecionado&&""!=this.itemSelecionado?this.router.navigate(["edit",this.itemSelecionado],{relativeTo:this.route}):this.notificationService.warning("Selecione uma pe\xe7a para editar!")}viewPeca(){null!=this.itemSelecionado&&""!=this.itemSelecionado?this.router.navigate(["view",this.itemSelecionado],{relativeTo:this.route}):this.notificationService.warning("Selecione uma pe\xe7a para visualizar!")}getFiltro(){this.loading=!0,this.pecasService.buscaFiltro(this.utilService.getParameters({idPeca:this.controls.idPeca.value,descricaoPeca:this.controls.descricaoPeca.value,marcaPeca:this.controls.marcaPeca.value,modeloPeca:this.controls.modeloPeca.value,active:this.controls.active.value})).subscribe(e=>{this.table.items=e,this.loading=!1},e=>{console.log(e.error),this.table.items=[],this.loading=!1})}}return e.\u0275fac=function(i){return new(i||e)(r.Nb(s.s),r.Nb(o.d),r.Nb(o.a),r.Nb(l.a),r.Nb(c.c),r.Nb(n.a))},e.\u0275cmp=r.Hb({type:e,selectors:[["app-pecas-list"]],decls:10,vars:9,consts:[[3,"p-title","p-actions","p-breadcrumb"],[3,"formGroup","keyup.enter"],[1,"po-row"],["p-label","C\xf3digo","p-clean","true","p-decimals-length","0","formControlName","idPeca",1,"po-md-2"],["p-label","Marca","p-clean","true","formControlName","marcaPeca",1,"po-md-2"],["p-label","Modelo","p-clean","true","formControlName","modeloPeca",1,"po-md-2"],["p-label","Descri\xe7\xe3o","p-clean","true","formControlName","descricaoPeca",1,"po-md-2"],["p-label","Ativo","formControlName","active",1,"po-md-2",3,"p-options"],["p-label","Buscar","p-icon","po-icon-search",1,"po-md-2","po-mt-4",3,"click"],["p-sort","true","p-striped","true","p-hide-text-overflow","true","p-checkbox","true","p-single-select","true",3,"p-columns","p-items","p-loading","p-height","p-selected","p-unselected"]],template:function(e,i){1&e&&(r.Tb(0,"po-page-default",0),r.Tb(1,"form",1),r.bc("keyup.enter",(function(){return i.getFiltro()})),r.Tb(2,"div",2),r.Ob(3,"po-decimal",3),r.Ob(4,"po-input",4),r.Ob(5,"po-input",5),r.Ob(6,"po-input",6),r.Ob(7,"po-select",7),r.Tb(8,"po-button",8),r.bc("click",(function(){return i.getFiltro()})),r.Sb(),r.Sb(),r.Sb(),r.Tb(9,"po-table",9),r.bc("p-selected",(function(e){return i.getSelected(e)}))("p-unselected",(function(){return i.getUnSelected()})),r.Sb(),r.Sb()),2&e&&(r.kc("p-title",i.page.title)("p-actions",i.page.actions)("p-breadcrumb",i.page.breadcrumb),r.zb(1),r.kc("formGroup",i.pecasForm),r.zb(6),r.kc("p-options",i.selects.ativoOptions),r.zb(2),r.kc("p-columns",i.table.columns)("p-items",i.table.items)("p-loading",i.table.loading)("p-height",i.table.height))},directives:[s.u,c.q,c.j,c.e,s.f,c.i,c.d,s.n,s.x,s.a,s.z],styles:[""]}),e})();function p(e,i){if(1&e&&r.Ob(0,"po-input",10),2&e){const e=r.dc();r.kc("p-readonly",e.disabledFields||e.disabledId)}}function b(e,i){1&e&&r.Ob(0,"po-loading-overlay",11)}let u=(()=>{class e{constructor(e,i,t,a,o,r,s){this.fb=e,this.router=i,this.location=t,this.dialog=a,this.pecasService=o,this.route=r,this.notificationService=s,this.page={title:"",breadcrumb:{items:[]},actions:[]},this.pecasForm=this.fb.group({id:["",[]],marca:["",[c.o.required]],modelo:["",[c.o.required]],descricao:["",[c.o.required]],valorUnitario:["",[c.o.required]],active:[!0,[c.o.required]]}),this.disabledId=!1,this.disabledFields=!1}ngOnInit(){-1!=this.router.url.indexOf("add")?(this.tipoTela="add",this.page.title="Adicionar Pe\xe7a",this.page.breadcrumb.items=[{label:"Home"},{label:"Cadastros"},{label:"Pe\xe7as"},{label:"Adicionar Pe\xe7a"}],this.page.actions=[{label:"Salvar",disabled:!0,action:()=>{this.cadastrarPecas(this.pecasForm.value)}},{label:"Cancelar",action:()=>{this.dialogVoltar()}}],this.pecasForm.valueChanges.subscribe(e=>{this.page.actions[0].disabled=this.pecasForm.invalid}),this.disabledId=!0):-1!=this.router.url.indexOf("edit")?(this.tipoTela="edit",this.page.title="Editar Pe\xe7a",this.page.breadcrumb.items=[{label:"Home"},{label:"Cadastros"},{label:"Pe\xe7as"},{label:"Editar Pe\xe7a"}],this.page.actions=[{label:"Salvar",disabled:!0,action:()=>{this.alterPeca()}},{label:"Cancelar",action:()=>{this.dialogVoltar()}}],this.route.paramMap.subscribe(e=>{this.id=e.get("id")}),this.getDetailById(this.id),this.pecasForm.valueChanges.subscribe(e=>{this.page.actions[0].disabled=this.pecasForm.invalid}),this.disabledId=!0):(this.tipoTela="view",this.page.title="Visualizar Pe\xe7a",this.disabledFields=!0,this.page.breadcrumb.items=[{label:"Home"},{label:"Cadastros"},{label:"Pe\xe7as"},{label:"Visualizar Pe\xe7a"}],this.page.actions=[{label:"Salvar",disabled:!0},{label:"Cancelar",action:()=>this.router.navigate(["cadastro/pecas"])}],this.route.paramMap.subscribe(e=>{this.id=e.get("id")}),this.getDetailById(this.id))}get controls(){return this.pecasForm.controls}getDetailById(e){this.loading=!0,this.pecasService.findById(e).subscribe(e=>{this.loading=!1,this.pecasForm.setValue(e)},i=>{this.router.navigate(["cadastro/pecas"]),this.notificationService.error(`Pe\xe7a ${e} n\xe3o encontrada`),this.loading=!1})}alterPeca(e){if(this.loading=!0,this.pecasForm.invalid)return this.notificationService.warning("Formul\xe1rio Inv\xe1lido!"),void(this.loading=!1);this.pecasService.alterPecas(this.id,{marca:this.controls.marca.value,modelo:this.controls.modelo.value,descricao:this.controls.descricao.value,valorUnitario:this.controls.valorUnitario.value,active:this.controls.active.value}).subscribe(e=>{this.notificationService.success("Pe\xe7a alterada com sucesso!"),this.router.navigate(["cadastro/pecas/"]),this.loading=!1},e=>{this.loading=!1})}cadastrarPecas(e){if(this.loading=!0,this.pecasForm.invalid)return this.notificationService.warning("Formul\xe1rio Inv\xe1lido!"),void(this.loading=!1);this.pecasService.createPecas(e).subscribe(e=>{this.notificationService.success("Pe\xe7a cadastrada com sucesso!"),this.router.navigate(["cadastro/pecas/"]),this.loading=!1},e=>{this.loading=!1})}dialogVoltar(){this.dialog.confirm({confirm:()=>this.router.navigate(["cadastro/pecas/"]),title:"Alerta",message:"Salve para n\xe3o perder os dados. Deseja voltar a tela de listagem?"})}}return e.\u0275fac=function(i){return new(i||e)(r.Nb(c.c),r.Nb(o.d),r.Nb(a.j),r.Nb(s.g),r.Nb(l.a),r.Nb(o.a),r.Nb(s.s))},e.\u0275cmp=r.Hb({type:e,selectors:[["app-pecas-edit"]],decls:10,vars:11,consts:[[3,"p-title","p-actions","p-breadcrumb"],[3,"formGroup"],[1,"po-row"],["class","po-md-2","p-label","C\xf3digo","formControlName","id",3,"p-readonly",4,"ngIf"],["p-label","Marca","p-required","true","formControlName","marca",1,"po-md-2",3,"p-readonly"],["p-label","Modelo","p-required","true","formControlName","modelo",1,"po-md-2",3,"p-readonly"],["p-label","Descri\xe7\xe3o","p-required","true","formControlName","descricao",1,"po-md-2",3,"p-readonly"],["formControlName","valorUnitario","p-decimals-length","2","p-icon","po-icon-finance","p-label","Valor Unit\xe1rio","p-required","","p-thousand-maxlength","13",1,"po-md-2",3,"p-readonly"],["formControlName","active","p-label","Ativo","p-label-off","Inativo","p-label-on","Ativo",3,"p-disabled"],["p-screen-lock","true","p-text","Carregando",4,"ngIf"],["p-label","C\xf3digo","formControlName","id",1,"po-md-2",3,"p-readonly"],["p-screen-lock","true","p-text","Carregando"]],template:function(e,i){1&e&&(r.Tb(0,"po-page-default",0),r.Tb(1,"form",1),r.Tb(2,"div",2),r.Bc(3,p,1,1,"po-input",3),r.Ob(4,"po-input",4),r.Ob(5,"po-input",5),r.Ob(6,"po-input",6),r.Ob(7,"po-decimal",7),r.Ob(8,"po-switch",8),r.Sb(),r.Sb(),r.Bc(9,b,1,0,"po-loading-overlay",9),r.Sb()),2&e&&(r.kc("p-title",i.page.title)("p-actions",i.page.actions)("p-breadcrumb",i.page.breadcrumb),r.zb(1),r.kc("formGroup",i.pecasForm),r.zb(2),r.kc("ngIf","add"!=i.tipoTela),r.zb(1),r.kc("p-readonly",i.disabledFields),r.zb(1),r.kc("p-readonly",i.disabledFields),r.zb(1),r.kc("p-readonly",i.disabledFields),r.zb(1),r.kc("p-readonly",i.disabledFields),r.zb(1),r.kc("p-disabled",i.disabledFields),r.zb(1),r.kc("ngIf",i.loading))},directives:[s.u,c.q,c.j,c.e,a.n,s.n,c.i,c.d,s.f,s.y,s.p],styles:[""]}),e})();var h=t("CMCI");function m(e,i){1&e&&r.Ob(0,"po-loading-overlay",9)}let g=(()=>{class e{constructor(e,i,t,a,o,r){this.notificationService=e,this.router=i,this.route=t,this.maoObraService=a,this.fb=o,this.utilService=r,this.page={title:"Cadastro de M\xe3o de Obra",breadcrumb:{items:[{label:"Home"},{label:"Cadastros"},{label:"M\xe3o de Obra"}]},actions:[{label:"Adicionar",url:"cadastro/mao-obra/add"},{label:"Editar",action:()=>{this.editarMaoObra()}},{label:"Visualizar",action:()=>{this.viewMaoObra()}}]},this.table={columns:[{property:"id",label:"C\xf3digo",width:"10%"},{property:"descricao",label:"Descri\xe7\xe3o",width:"30%"},{property:"valorUnitario",label:"Valor Unit\xe1rio",width:"15%",type:"currency",format:"BRL"},{property:"active",label:"Ativo",width:"10%",type:"boolean"}],items:[],height:0,loading:!1},this.maoObraForm=this.fb.group({id:["",[]],descricao:["",[]],active:[""]}),this.selects={ativoOptions:[{label:"Ativo",value:!0},{label:"Inativo",value:!1},{label:"Todos",value:""}]},this.itemSelecionado=""}ngOnInit(){this.getMaoObra()}get controls(){return this.maoObraForm.controls}getSelected(e){this.itemSelecionado=e.id}getUnSelected(){this.itemSelecionado=""}getMaoObra(){this.loading=!0,this.maoObraService.findAll().subscribe(e=>{this.table.items=e,this.loading=!1},e=>{console.log(e.error),this.loading=!1})}editarMaoObra(){null!=this.itemSelecionado&&""!=this.itemSelecionado?this.router.navigate(["edit",this.itemSelecionado],{relativeTo:this.route}):this.notificationService.warning("Selecione uma mao de obra para editar!")}viewMaoObra(){null!=this.itemSelecionado&&""!=this.itemSelecionado?this.router.navigate(["view",this.itemSelecionado],{relativeTo:this.route}):this.notificationService.warning("Selecione uma mao de obra para visualizar!")}getFiltro(){this.loading=!0,this.maoObraService.buscaFiltro(this.utilService.getParameters({id:this.controls.id.value,descricao:this.controls.descricao.value,active:this.controls.active.value})).subscribe(e=>{this.table.items=e,this.loading=!1},e=>{console.log(e.error),this.table.items=[],this.loading=!1})}}return e.\u0275fac=function(i){return new(i||e)(r.Nb(s.s),r.Nb(o.d),r.Nb(o.a),r.Nb(h.a),r.Nb(c.c),r.Nb(n.a))},e.\u0275cmp=r.Hb({type:e,selectors:[["app-mao-obra-list"]],decls:9,vars:10,consts:[[3,"p-title","p-actions","p-breadcrumb"],[3,"formGroup","keyup.enter"],[1,"po-row"],["p-label","C\xf3digo","p-clean","true","p-decimals-length","0","formControlName","id",1,"po-md-2"],["p-label","Descri\xe7\xe3o","p-clean","true","formControlName","descricao",1,"po-md-3"],["p-label","Ativo","formControlName","active",1,"po-md-2",3,"p-options"],["p-label","Buscar","p-icon","po-icon-search",1,"po-md-2","po-mt-4",3,"click"],["p-sort","true","p-striped","true","p-hide-text-overflow","true","p-checkbox","true","p-single-select","true",3,"p-columns","p-items","p-loading","p-height","p-selected","p-unselected"],["p-screen-lock","true","p-text","Carregando",4,"ngIf"],["p-screen-lock","true","p-text","Carregando"]],template:function(e,i){1&e&&(r.Tb(0,"po-page-default",0),r.Tb(1,"form",1),r.bc("keyup.enter",(function(){return i.getFiltro()})),r.Tb(2,"div",2),r.Ob(3,"po-decimal",3),r.Ob(4,"po-input",4),r.Ob(5,"po-select",5),r.Tb(6,"po-button",6),r.bc("click",(function(){return i.getFiltro()})),r.Sb(),r.Sb(),r.Sb(),r.Tb(7,"po-table",7),r.bc("p-selected",(function(e){return i.getSelected(e)}))("p-unselected",(function(){return i.getUnSelected()})),r.Sb(),r.Bc(8,m,1,0,"po-loading-overlay",8),r.Sb()),2&e&&(r.kc("p-title",i.page.title)("p-actions",i.page.actions)("p-breadcrumb",i.page.breadcrumb),r.zb(1),r.kc("formGroup",i.maoObraForm),r.zb(4),r.kc("p-options",i.selects.ativoOptions),r.zb(2),r.kc("p-columns",i.table.columns)("p-items",i.table.items)("p-loading",i.table.loading)("p-height",i.table.height),r.zb(1),r.kc("ngIf",i.loading))},directives:[s.u,c.q,c.j,c.e,s.f,c.i,c.d,s.n,s.x,s.a,s.z,a.n,s.p],styles:[""]}),e})();function v(e,i){if(1&e&&r.Ob(0,"po-input",8),2&e){const e=r.dc();r.kc("p-readonly",e.disabledFields||e.disabledId)}}function f(e,i){1&e&&r.Ob(0,"po-loading-overlay",9)}let S=(()=>{class e{constructor(e,i,t,a,o,r){this.fb=e,this.router=i,this.dialog=t,this.route=a,this.maoObraService=o,this.notificationService=r,this.page={title:"",breadcrumb:{items:[]},actions:[]},this.maoObraForm=this.fb.group({id:["",[]],descricao:["",[c.o.required]],valorUnitario:["",[c.o.required]],active:[!0,[c.o.required]]}),this.disabledId=!1,this.disabledFields=!1,this.id=""}ngOnInit(){-1!=this.router.url.indexOf("add")?(this.tipoTela="add",this.page.title="Adicionar M\xe3o de Obra",this.disabledId=!0,this.page.breadcrumb.items=[{label:"Home"},{label:"Cadastros"},{label:"M\xe3o de Obra"},{label:"Adicionar M\xe3o de Obra"}],this.page.actions=[{label:"Salvar",disabled:!0,action:()=>{this.cadastrarMaoObra(this.maoObraForm.value)}},{label:"Cancelar",action:()=>{this.dialogVoltar()}}],this.maoObraForm.valueChanges.subscribe(e=>{console.log(e),console.log(this.maoObraForm.invalid),this.page.actions[0].disabled=this.maoObraForm.invalid})):-1!=this.router.url.indexOf("edit")?(this.tipoTela="edit",this.page.title="Editar M\xe3o de Obra",this.disabledId=!0,this.page.breadcrumb.items=[{label:"Home"},{label:"Cadastros"},{label:"M\xe3o de Obra"},{label:"Editar M\xe3o de Obra"}],this.page.actions=[{label:"Salvar",disabled:!0,action:()=>{this.alterMaoObra(this.maoObraForm.value)}},{label:"Cancelar",action:()=>{this.dialogVoltar()}}],this.route.paramMap.subscribe(e=>{this.id=e.get("id")}),this.getDetailById(this.id),this.maoObraForm.valueChanges.subscribe(e=>{this.page.actions[0].disabled=this.maoObraForm.invalid})):(this.tipoTela="view",this.page.title="Visualizar M\xe3o de Obra",this.disabledId=!0,this.disabledFields=!0,this.page.breadcrumb.items=[{label:"Home"},{label:"Cadastros"},{label:"M\xe3o de Obra"},{label:"Visualizar M\xe3o de Obra"}],this.page.actions=[{label:"Salvar",disabled:!0},{label:"Cancelar",action:()=>this.router.navigate(["cadastro/mao-obra/"])}],this.route.paramMap.subscribe(e=>{this.id=e.get("id")}),this.getDetailById(this.id))}getDetailById(e){this.loading=!0,this.maoObraService.findById(e).subscribe(e=>{this.loading=!1,this.maoObraForm.setValue(e)},i=>{this.notificationService.error(`M\xe3o de obra ${e} n\xe3o encontrada`),this.router.navigate(["cadastro/mao-obra"]),this.loading=!1})}alterMaoObra(e){if(this.loading=!0,this.maoObraForm.invalid)return this.notificationService.warning("Formul\xe1rio Inv\xe1lido!"),void(this.loading=!1);this.maoObraService.alterMaoDeObra(e).subscribe(e=>{this.notificationService.success("M\xe3o de obra alterada com sucesso!"),this.router.navigate(["cadastro/mao-obra/"]),this.loading=!1},e=>{this.loading=!1})}cadastrarMaoObra(e){if(this.loading=!0,this.maoObraForm.invalid)return this.notificationService.warning("Formul\xe1rio Inv\xe1lido!"),void(this.loading=!1);this.maoObraService.createMaoDeObra(e).subscribe(e=>{this.notificationService.success("M\xe3o de obra cadastrada com sucesso!"),this.router.navigate(["cadastro/mao-obra/"]),this.loading=!1},e=>{this.loading=!1})}dialogVoltar(){this.dialog.confirm({confirm:()=>this.router.navigate(["cadastro/mao-obra/"]),title:"Alerta",message:"Salve para n\xe3o perder os dados. Deseja voltar a tela de listagem?"})}}return e.\u0275fac=function(i){return new(i||e)(r.Nb(c.c),r.Nb(o.d),r.Nb(s.g),r.Nb(o.a),r.Nb(h.a),r.Nb(s.s))},e.\u0275cmp=r.Hb({type:e,selectors:[["app-mao-obra-edit"]],decls:8,vars:9,consts:[[3,"p-title","p-actions","p-breadcrumb"],[3,"formGroup"],[1,"po-row"],["class","po-md-2","p-label","C\xf3digo","formControlName","id",3,"p-readonly",4,"ngIf"],["p-label","Descri\xe7\xe3o","p-required","true","formControlName","descricao",1,"po-md-2",3,"p-readonly"],["formControlName","valorUnitario","p-decimals-length","2","p-icon","po-icon-finance","p-label","Valor Unit\xe1rio","p-required","","p-thousand-maxlength","13",1,"po-md-2",3,"p-readonly"],["formControlName","active","p-label","Ativo","p-label-off","Inativo","p-label-on","Ativo",3,"p-disabled"],["p-screen-lock","true","p-text","Carregando",4,"ngIf"],["p-label","C\xf3digo","formControlName","id",1,"po-md-2",3,"p-readonly"],["p-screen-lock","true","p-text","Carregando"]],template:function(e,i){1&e&&(r.Tb(0,"po-page-default",0),r.Tb(1,"form",1),r.Tb(2,"div",2),r.Bc(3,v,1,1,"po-input",3),r.Ob(4,"po-input",4),r.Ob(5,"po-decimal",5),r.Ob(6,"po-switch",6),r.Sb(),r.Sb(),r.Bc(7,f,1,0,"po-loading-overlay",7),r.Sb()),2&e&&(r.kc("p-title",i.page.title)("p-actions",i.page.actions)("p-breadcrumb",i.page.breadcrumb),r.zb(1),r.kc("formGroup",i.maoObraForm),r.zb(2),r.kc("ngIf","add"!=i.tipoTela),r.zb(1),r.kc("p-readonly",i.disabledFields),r.zb(1),r.kc("p-readonly",i.disabledFields),r.zb(1),r.kc("p-disabled",i.disabledFields),r.zb(1),r.kc("ngIf",i.loading))},directives:[s.u,c.q,c.j,c.e,a.n,s.n,c.i,c.d,s.f,s.y,s.p],styles:[""]}),e})();var y=t("Un0G");function C(e,i){1&e&&r.Ob(0,"po-loading-overlay",11)}let O=(()=>{class e{constructor(e,i,t,a,o,r){this.notificationService=e,this.router=i,this.route=t,this.veiculosService=a,this.fb=o,this.utilService=r,this.page={title:"Cadastro de Ve\xedculos",breadcrumb:{items:[{label:"Home"},{label:"Cadastros"},{label:"Ve\xedculos"}]},actions:[{label:"Adicionar",url:"cadastro/veiculos/add"},{label:"Editar",action:()=>{this.editarVeiculo()}},{label:"Visualizar",action:()=>{this.viewVeiculo()}}]},this.table={columns:[{property:"id",label:"C\xf3digo",width:"10%"},{property:"marca",label:"Marca",width:"20%"},{property:"modelo",label:"Modelo",width:"20%"},{property:"ano",label:"Ano Ve\xedculo",width:"15%"},{property:"tipoCombustivel",label:"Tipo Combust\xedvel",width:"25%"},{property:"active",label:"Ativo",width:"10%",type:"boolean"}],items:[],height:0,loading:!1},this.veiculosForm=this.fb.group({id:["",[]],marca:["",[]],modelo:["",[]],ano:["",[]],active:["",[]]}),this.selects={ativoOptions:[{label:"Ativo",value:!0},{label:"Inativo",value:!1},{label:"Todos",value:""}]},this.itemSelecionado=""}ngOnInit(){this.getVeiculos()}get controls(){return this.veiculosForm.controls}getSelected(e){this.itemSelecionado=e.id,console.log(this.itemSelecionado)}getUnSelected(){this.itemSelecionado=""}getVeiculos(){this.loading=!0,this.veiculosService.findAll().subscribe(e=>{this.table.items=e,this.loading=!1},e=>{console.log(e.error),this.loading=!1,this.notificationService.error("N\xe3o h\xe1 dados")})}editarVeiculo(){null!=this.itemSelecionado&&""!=this.itemSelecionado?this.router.navigate(["edit",this.itemSelecionado],{relativeTo:this.route}):this.notificationService.warning("Selecione um ve\xedculo para editar!")}viewVeiculo(){null!=this.itemSelecionado&&""!=this.itemSelecionado?this.router.navigate(["view",this.itemSelecionado],{relativeTo:this.route}):this.notificationService.warning("Selecione um ve\xedculo para visualizar!")}getFiltro(){this.loading=!0,this.veiculosService.buscaFiltro(this.utilService.getParameters({idVeiculo:this.controls.id.value,anoVeiculo:this.controls.ano.value,marcaVeiculo:this.controls.marca.value,modeloVeiculo:this.controls.modelo.value,activeVeiculo:this.controls.active.value})).subscribe(e=>{this.table.items=e,this.loading=!1},e=>{console.log(e.error),this.table.items=[],this.loading=!1,this.notificationService.error("N\xe3o h\xe1 dados")})}}return e.\u0275fac=function(i){return new(i||e)(r.Nb(s.s),r.Nb(o.d),r.Nb(o.a),r.Nb(y.a),r.Nb(c.c),r.Nb(n.a))},e.\u0275cmp=r.Hb({type:e,selectors:[["app-veiculos-list"]],decls:11,vars:10,consts:[[3,"p-title","p-actions","p-breadcrumb"],[3,"formGroup","keyup.enter"],[1,"po-row"],["p-label","C\xf3digo","p-clean","true","p-decimals-length","0","formControlName","id",1,"po-md-2"],["p-label","Marca","p-clean","true","formControlName","marca",1,"po-md-2"],["p-label","Modelo","p-clean","true","formControlName","modelo",1,"po-md-2"],["p-label","Ano","p-clean","true","formControlName","ano",1,"po-md-2"],["p-label","Ativo","formControlName","active",1,"po-md-2",3,"p-options"],["p-label","Buscar","p-icon","po-icon-search",1,"po-md-2","po-mt-4",3,"click"],["p-sort","true","p-striped","true","p-hide-text-overflow","true","p-checkbox","true","p-single-select","true",3,"p-columns","p-items","p-loading","p-height","p-selected","p-unselected"],["p-screen-lock","true","p-text","Carregando",4,"ngIf"],["p-screen-lock","true","p-text","Carregando"]],template:function(e,i){1&e&&(r.Tb(0,"po-page-default",0),r.Tb(1,"form",1),r.bc("keyup.enter",(function(){return i.getFiltro()})),r.Tb(2,"div",2),r.Ob(3,"po-decimal",3),r.Ob(4,"po-input",4),r.Ob(5,"po-input",5),r.Ob(6,"po-input",6),r.Ob(7,"po-select",7),r.Tb(8,"po-button",8),r.bc("click",(function(){return i.getFiltro()})),r.Sb(),r.Sb(),r.Sb(),r.Tb(9,"po-table",9),r.bc("p-selected",(function(e){return i.getSelected(e)}))("p-unselected",(function(){return i.getUnSelected()})),r.Sb(),r.Bc(10,C,1,0,"po-loading-overlay",10),r.Sb()),2&e&&(r.kc("p-title",i.page.title)("p-actions",i.page.actions)("p-breadcrumb",i.page.breadcrumb),r.zb(1),r.kc("formGroup",i.veiculosForm),r.zb(6),r.kc("p-options",i.selects.ativoOptions),r.zb(2),r.kc("p-columns",i.table.columns)("p-items",i.table.items)("p-loading",i.table.loading)("p-height",i.table.height),r.zb(1),r.kc("ngIf",i.loading))},directives:[s.u,c.q,c.j,c.e,s.f,c.i,c.d,s.n,s.x,s.a,s.z,a.n,s.p],styles:[""]}),e})();function F(e,i){if(1&e&&r.Ob(0,"po-input",10),2&e){const e=r.dc();r.kc("p-readonly",e.disabledFields||e.disabledId)}}function N(e,i){1&e&&r.Ob(0,"po-loading-overlay",11)}let w=(()=>{class e{constructor(e,i,t,a,o,r){this.fb=e,this.router=i,this.dialog=t,this.notificationService=a,this.veiculosService=o,this.route=r,this.page={title:"",breadcrumb:{items:[]},actions:[]},this.veiculosForm=this.fb.group({id:["",[]],marca:["",[c.o.required]],modelo:["",[c.o.required]],ano:["",[c.o.required]],tipoCombustivel:["",[c.o.required]],active:[!0,[c.o.required]]}),this.disabledId=!1,this.disabledFields=!1}ngOnInit(){-1!=this.router.url.indexOf("add")?(this.tipoTela="add",this.page.title="Adicionar Ve\xedculo",this.page.breadcrumb.items=[{label:"Home"},{label:"Cadastros"},{label:"Ve\xedculos"},{label:"Adicionar Ve\xedculo"}],this.page.actions=[{label:"Salvar",disabled:!0,action:()=>{this.cadastrarVeiculo(this.veiculosForm.value)}},{label:"Cancelar",action:()=>{this.dialogVoltar()}}],this.disabledId=!0,this.veiculosForm.valueChanges.subscribe(e=>{this.page.actions[0].disabled=this.veiculosForm.invalid})):-1!=this.router.url.indexOf("edit")?(this.tipoTela="edit",this.page.title="Editar Ve\xedculo",this.page.breadcrumb.items=[{label:"Home"},{label:"Cadastros"},{label:"Ve\xedculos"},{label:"Editar Ve\xedculo"}],this.page.actions=[{label:"Salvar",disabled:!0,action:()=>{this.alterVeiculo()}},{label:"Cancelar",action:()=>{this.dialogVoltar()}}],this.veiculosForm.valueChanges.subscribe(e=>{this.page.actions[0].disabled=this.veiculosForm.invalid}),this.disabledId=!0,this.route.paramMap.subscribe(e=>{this.id=e.get("id")}),this.getDetailById(this.id)):(this.tipoTela="view",this.page.title="Visualizar Ve\xedculo",this.disabledFields=!0,this.page.breadcrumb.items=[{label:"Home"},{label:"Cadastros"},{label:"Ve\xedculos"},{label:"Visualizar Ve\xedculo"}],this.page.actions=[{label:"Salvar",disabled:!0},{label:"Cancelar",action:()=>this.router.navigate(["cadastro/veiculos"])}],this.route.paramMap.subscribe(e=>{this.id=e.get("id")}),this.getDetailById(this.id))}get controls(){return this.veiculosForm.controls}getDetailById(e){this.loading=!0,this.veiculosService.findById(e).subscribe(e=>{this.veiculosForm.setValue(e),this.loading=!1},i=>{this.router.navigate(["cadastro/veiculos"]),this.notificationService.error(`Ve\xedculo ${e} n\xe3o encontrado`),this.loading=!1})}alterVeiculo(e){if(this.loading=!0,this.veiculosForm.invalid)return this.notificationService.warning("Formul\xe1rio Inv\xe1lido!"),void(this.loading=!1);this.veiculosService.alterVeiculo(this.id,{marca:this.controls.marca.value,modelo:this.controls.modelo.value,ano:this.controls.ano.value,tipoCombustivel:this.controls.tipoCombustivel.value,active:this.controls.active.value}).subscribe(e=>{this.notificationService.success("Ve\xedculo alterado com sucesso!"),this.router.navigate(["cadastro/veiculos/"]),this.loading=!1},e=>{this.loading=!1})}cadastrarVeiculo(e){if(this.loading=!0,this.veiculosForm.invalid)return this.notificationService.warning("Formul\xe1rio Inv\xe1lido!"),void(this.loading=!1);this.veiculosService.createVeiculo(e).subscribe(e=>{this.notificationService.success("Ve\xedculo cadastrado com sucesso!"),this.router.navigate(["cadastro/veiculos/"]),this.loading=!1},e=>{this.loading=!1})}dialogVoltar(){this.dialog.confirm({confirm:()=>this.router.navigate(["cadastro/veiculos/"]),title:"Alerta",message:"Salve para n\xe3o perder os dados. Deseja voltar a tela de listagem?"})}salvar(){this.notificationService.success("Cadastro salvo com sucesso"),this.router.navigate(["cadastro/veiculos"])}}return e.\u0275fac=function(i){return new(i||e)(r.Nb(c.c),r.Nb(o.d),r.Nb(s.g),r.Nb(s.s),r.Nb(y.a),r.Nb(o.a))},e.\u0275cmp=r.Hb({type:e,selectors:[["app-veiculos-edit"]],decls:10,vars:11,consts:[[3,"p-title","p-actions","p-breadcrumb"],[3,"formGroup"],[1,"po-row"],["class","po-md-2","p-label","C\xf3digo","formControlName","id",3,"p-readonly",4,"ngIf"],["p-label","Marca","p-required","true","formControlName","marca",1,"po-md-2",3,"p-readonly"],["p-label","Modelo","p-required","true","formControlName","modelo",1,"po-md-2",3,"p-readonly"],["p-min","1885","p-maxlength","4","p-minlength","4","p-label","Ano Ve\xedculo","p-required","true","formControlName","ano","p-clean","",1,"po-md-2",3,"p-readonly"],["p-label","Tipo Combust\xedvel","p-required","true","formControlName","tipoCombustivel",1,"po-md-2",3,"p-readonly"],["formControlName","active","p-label","Ativo","p-label-off","Inativo","p-label-on","Ativo",3,"p-disabled"],["p-screen-lock","true","p-text","Carregando",4,"ngIf"],["p-label","C\xf3digo","formControlName","id",1,"po-md-2",3,"p-readonly"],["p-screen-lock","true","p-text","Carregando"]],template:function(e,i){1&e&&(r.Tb(0,"po-page-default",0),r.Tb(1,"form",1),r.Tb(2,"div",2),r.Bc(3,F,1,1,"po-input",3),r.Ob(4,"po-input",4),r.Ob(5,"po-input",5),r.Ob(6,"po-number",6),r.Ob(7,"po-input",7),r.Ob(8,"po-switch",8),r.Sb(),r.Sb(),r.Bc(9,N,1,0,"po-loading-overlay",9),r.Sb()),2&e&&(r.kc("p-title",i.page.title)("p-actions",i.page.actions)("p-breadcrumb",i.page.breadcrumb),r.zb(1),r.kc("formGroup",i.veiculosForm),r.zb(2),r.kc("ngIf","add"!=i.tipoTela),r.zb(1),r.kc("p-readonly",i.disabledFields),r.zb(1),r.kc("p-readonly",i.disabledFields),r.zb(1),r.kc("p-readonly",i.disabledFields),r.zb(1),r.kc("p-readonly",i.disabledFields),r.zb(1),r.kc("p-disabled",i.disabledFields),r.zb(1),r.kc("ngIf",i.loading))},directives:[s.u,c.q,c.j,c.e,a.n,s.n,c.i,c.d,s.t,s.y,s.p],styles:[""]}),e})();var k=t("7ZKF");function I(e,i){1&e&&r.Ob(0,"po-loading-overlay",10)}let z=(()=>{class e{constructor(e,i,t,a,o,r){this.notificationService=e,this.router=i,this.route=t,this.usuariosService=a,this.fb=o,this.utilService=r,this.page={title:"Cadastro de Usu\xe1rios",breadcrumb:{items:[{label:"Home"},{label:"Cadastros"},{label:"Usu\xe1rios"}]},actions:[{label:"Adicionar",url:"cadastro/usuarios/add"},{label:"Editar",action:()=>{this.editarUsuario()}},{label:"Visualizar",action:()=>{this.viewUsuario()}}]},this.table={columns:[{property:"id",label:"C\xf3digo",width:"25%"},{property:"email",label:"E-mail",width:"25%"},{property:"userName",label:"Nome de Usu\xe1rio",width:"25%"},{property:"active",label:"Ativo",width:"25%",type:"boolean"}],items:[],height:0,loading:!1},this.usuariosForm=this.fb.group({id:["",[]],email:["",[]],userName:["",[]],active:["",[]]}),this.selects={ativoOptions:[{label:"Ativo",value:!0},{label:"Inativo",value:!1},{label:"Todos",value:""}]},this.itemSelecionado=""}ngOnInit(){this.getUsuarios()}get controls(){return this.usuariosForm.controls}getSelected(e){this.itemSelecionado=e.id}getUnSelected(){this.itemSelecionado=""}getUsuarios(){this.usuariosService.findAll().subscribe(e=>{this.table.items=e})}editarUsuario(){null!=this.itemSelecionado&&""!=this.itemSelecionado?this.router.navigate(["edit",this.itemSelecionado],{relativeTo:this.route}):this.notificationService.warning("Selecione um usu\xe1rio para editar!")}viewUsuario(){null!=this.itemSelecionado&&""!=this.itemSelecionado?this.router.navigate(["view",this.itemSelecionado],{relativeTo:this.route}):this.notificationService.warning("Selecione um usu\xe1rio para visualizar!")}getFiltro(){this.loading=!0,this.usuariosService.buscaFiltro(this.utilService.getParameters({id:this.controls.id.value,email:this.controls.email.value,userName:this.controls.userName.value,active:this.controls.active.value})).subscribe(e=>{this.table.items=e,this.loading=!1},e=>{console.log(e.error),this.table.items=[],this.loading=!1})}}return e.\u0275fac=function(i){return new(i||e)(r.Nb(s.s),r.Nb(o.d),r.Nb(o.a),r.Nb(k.a),r.Nb(c.c),r.Nb(n.a))},e.\u0275cmp=r.Hb({type:e,selectors:[["app-usuarios-list"]],decls:10,vars:10,consts:[[3,"p-title","p-actions","p-breadcrumb"],[3,"formGroup","keyup.enter"],[1,"po-row"],["p-label","C\xf3digo","p-clean","true","p-decimals-length","0","formControlName","id",1,"po-md-2"],["p-label","E-mail","p-clean","true","formControlName","email",1,"po-md-2"],["p-label","Nome de Usu\xe1rio","p-clean","true","formControlName","userName",1,"po-md-2"],["p-label","Ativo","formControlName","active",1,"po-md-2",3,"p-options"],["p-label","Buscar","p-icon","po-icon-search",1,"po-md-2","po-mt-4",3,"click"],["p-sort","true","p-striped","true","p-hide-text-overflow","true","p-checkbox","true","p-single-select","true",3,"p-columns","p-items","p-loading","p-height","p-selected","p-unselected"],["p-screen-lock","true","p-text","Carregando",4,"ngIf"],["p-screen-lock","true","p-text","Carregando"]],template:function(e,i){1&e&&(r.Tb(0,"po-page-default",0),r.Tb(1,"form",1),r.bc("keyup.enter",(function(){return i.getFiltro()})),r.Tb(2,"div",2),r.Ob(3,"po-decimal",3),r.Ob(4,"po-input",4),r.Ob(5,"po-input",5),r.Ob(6,"po-select",6),r.Tb(7,"po-button",7),r.bc("click",(function(){return i.getFiltro()})),r.Sb(),r.Sb(),r.Sb(),r.Tb(8,"po-table",8),r.bc("p-selected",(function(e){return i.getSelected(e)}))("p-unselected",(function(){return i.getUnSelected()})),r.Sb(),r.Bc(9,I,1,0,"po-loading-overlay",9),r.Sb()),2&e&&(r.kc("p-title",i.page.title)("p-actions",i.page.actions)("p-breadcrumb",i.page.breadcrumb),r.zb(1),r.kc("formGroup",i.usuariosForm),r.zb(5),r.kc("p-options",i.selects.ativoOptions),r.zb(2),r.kc("p-columns",i.table.columns)("p-items",i.table.items)("p-loading",i.table.loading)("p-height",i.table.height),r.zb(1),r.kc("ngIf",i.loading))},directives:[s.u,c.q,c.j,c.e,s.f,c.i,c.d,s.n,s.x,s.a,s.z,a.n,s.p],styles:[""]}),e})();function V(e,i){if(1&e&&(r.Tb(0,"div",4),r.Ob(1,"po-input",5),r.Ob(2,"po-email",6),r.Ob(3,"po-password",7),r.Ob(4,"po-switch",8),r.Sb()),2&e){const e=r.dc();r.zb(1),r.kc("p-readonly",e.disabledFields),r.zb(1),r.kc("p-readonly",e.disabledFields),r.zb(1),r.kc("p-readonly",e.disabledFields),r.zb(1),r.kc("p-disabled",e.disabledFields||e.disabledId)}}function T(e,i){if(1&e&&(r.Tb(0,"div",4),r.Ob(1,"po-input",9),r.Ob(2,"po-input",5),r.Ob(3,"po-email",6),r.Ob(4,"po-password",7),r.Ob(5,"po-switch",8),r.Sb()),2&e){const e=r.dc();r.zb(1),r.kc("p-readonly",e.disabledFields||e.disabledId),r.zb(1),r.kc("p-readonly",e.disabledFields),r.zb(1),r.kc("p-readonly",e.disabledFields),r.zb(1),r.kc("p-readonly",e.disabledFields),r.zb(1),r.kc("p-disabled",e.disabledFields)}}function M(e,i){1&e&&r.Ob(0,"po-loading-overlay",10)}let U=(()=>{class e{constructor(e,i,t,a,o,r){this.fb=e,this.router=i,this.dialog=t,this.notificationService=a,this.route=o,this.usuariosService=r,this.page={title:"",breadcrumb:{items:[]},actions:[]},this.usuariosForm=this.fb.group({id:["",[]],avatar:["",[]],email:["",[c.o.required]],password:["",[]],userName:["",[c.o.required]],active:[!0,[c.o.required]]}),this.disabledId=!1,this.disabledFields=!1,this.tipoTela=""}ngOnInit(){-1!=this.router.url.indexOf("add")?(this.page.title="Adicionar Usu\xe1rio",this.tipoTela="add",this.page.breadcrumb.items=[{label:"Home"},{label:"Cadastros"},{label:"Usu\xe1rios"},{label:"Adicionar Usu\xe1rio"}],this.page.actions=[{label:"Salvar",disabled:!0,action:()=>{this.cadastrarUsuario(this.usuariosForm.value)}},{label:"Cancelar",action:()=>{this.dialogVoltar()}}],this.controls.password.setValidators([c.o.required,c.o.minLength(6),c.o.maxLength(12)]),this.disabledId=!0):-1!=this.router.url.indexOf("edit")?(this.page.title="Editar Usu\xe1rio",this.tipoTela="edit",this.page.breadcrumb.items=[{label:"Home"},{label:"Cadastros"},{label:"Usu\xe1rios"},{label:"Editar Usu\xe1rio"}],this.page.actions=[{label:"Salvar",disabled:!0,action:()=>{this.alterUsuario(this.usuariosForm.value)}},{label:"Cancelar",action:()=>{this.dialogVoltar()}}],this.route.paramMap.subscribe(e=>{this.id=e.get("id")}),this.getDetailById(this.id),this.disabledId=!0):(this.page.title="Visualizar Usu\xe1rio",this.tipoTela="view",this.disabledFields=!0,this.page.breadcrumb.items=[{label:"Home"},{label:"Cadastros"},{label:"Usu\xe1rios"},{label:"Visualizar Usu\xe1rio"}],this.page.actions=[{label:"Salvar",disabled:!0},{label:"Cancelar",action:()=>{this.dialogVoltar()}}],this.route.paramMap.subscribe(e=>{this.id=e.get("id")}),this.getDetailById(this.id)),"view"!=this.tipoTela&&this.usuariosForm.valueChanges.subscribe(e=>{this.page.actions[0].disabled=this.usuariosForm.invalid})}get controls(){return this.usuariosForm.controls}getDetailById(e){this.loading=!0,this.usuariosService.findById(e).subscribe(e=>{this.usuariosForm.setValue(e),this.loading=!1},e=>{this.router.navigate(["cadastro/usuarios"]),this.loading=!1})}alterUsuario(e){if(this.loading=!0,this.usuariosForm.invalid)return this.notificationService.warning("Formul\xe1rio Inv\xe1lido!"),void(this.loading=!1);this.usuariosService.alterUser(e).subscribe(e=>{this.notificationService.success("Usu\xe1rio alterado com sucesso!"),this.router.navigate(["cadastro/usuarios/"]),this.loading=!1},e=>{this.loading=!1})}cadastrarUsuario(e){if(this.loading=!0,this.usuariosForm.invalid)return this.notificationService.warning("Formul\xe1rio Inv\xe1lido!"),void(this.loading=!1);this.usuariosService.createUser(e).subscribe(e=>{this.notificationService.success("Usu\xe1rio cadastrado com sucesso!"),this.router.navigate(["cadastro/usuarios/"]),this.loading=!1},e=>{this.loading=!1})}dialogVoltar(){this.dialog.confirm({confirm:()=>this.router.navigate(["cadastro/usuarios/"]),title:"Alerta",message:"Salve para n\xe3o perder os dados. Deseja voltar a tela de listagem?"})}salvar(){this.notificationService.success("Cadastro salvo com sucesso"),this.router.navigate(["cadastro/usuarios"])}}return e.\u0275fac=function(i){return new(i||e)(r.Nb(c.c),r.Nb(o.d),r.Nb(s.g),r.Nb(s.s),r.Nb(o.a),r.Nb(k.a))},e.\u0275cmp=r.Hb({type:e,selectors:[["app-usuarios-edit"]],decls:5,vars:7,consts:[[3,"p-title","p-actions","p-breadcrumb"],[3,"formGroup"],["class","po-row",4,"ngIf"],["p-screen-lock","true","p-text","Carregando",4,"ngIf"],[1,"po-row"],["p-label","Nome Completo","p-required","true","formControlName","userName",1,"po-md-3",3,"p-readonly"],["formControlName","email","p-label","E-mail",1,"po-md-3",3,"p-readonly"],["p-error-pattern","A senha deve possuir pelo menos de 6 caracteres e no m\xe1ximo 12 ","formControlName","password","p-label","Senha",1,"po-md-3",3,"p-readonly"],["formControlName","active","p-label","Ativo","p-label-off","Inativo","p-label-on","Ativo",3,"p-disabled"],["p-label","C\xf3digo","formControlName","id",1,"po-md-1",3,"p-readonly"],["p-screen-lock","true","p-text","Carregando"]],template:function(e,i){1&e&&(r.Tb(0,"po-page-default",0),r.Tb(1,"form",1),r.Bc(2,V,5,4,"div",2),r.Bc(3,T,6,5,"div",2),r.Sb(),r.Bc(4,M,1,0,"po-loading-overlay",3),r.Sb()),2&e&&(r.kc("p-title",i.page.title)("p-actions",i.page.actions)("p-breadcrumb",i.page.breadcrumb),r.zb(1),r.kc("formGroup",i.usuariosForm),r.zb(1),r.kc("ngIf","add"==i.tipoTela),r.zb(1),r.kc("ngIf","add"!=i.tipoTela),r.zb(1),r.kc("ngIf",i.loading))},directives:[s.u,c.q,c.j,c.e,a.n,s.n,c.i,c.d,s.j,s.w,s.y,s.p],styles:[""]}),e})();const P=[{path:"pecas",children:[{path:"",component:d},{path:"add",component:u},{path:"view/:id",component:u},{path:"edit/:id",component:u}]},{path:"mao-obra",children:[{path:"",component:g},{path:"add",component:S},{path:"view/:id",component:S},{path:"edit/:id",component:S}]},{path:"veiculos",children:[{path:"",component:O},{path:"add",component:w},{path:"view/:id",component:w},{path:"edit/:id",component:w}]},{path:"usuarios",children:[{path:"",component:z},{path:"add",component:U},{path:"view/:id",component:U},{path:"edit/:id",component:U}]}];let A=(()=>{class e{}return e.\u0275mod=r.Lb({type:e}),e.\u0275inj=r.Kb({factory:function(i){return new(i||e)},imports:[[o.g.forChild(P)],o.g]}),e})(),x=(()=>{class e{}return e.\u0275mod=r.Lb({type:e}),e.\u0275inj=r.Kb({factory:function(i){return new(i||e)},imports:[[a.b,A,s.v,s.b,s.k,c.f,c.n,s.A,s.o]]}),e})()}}]);