import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PecasListComponent } from './pecas/pecas-list/pecas-list.component';
import { PecasEditComponent } from './pecas/pecas-edit/pecas-edit.component';
import { MaoObraListComponent } from './mao-obra/mao-obra-list/mao-obra-list.component';
import { MaoObraEditComponent } from './mao-obra/mao-obra-edit/mao-obra-edit.component';
import { VeiculosListComponent } from './veiculos/veiculos-list/veiculos-list.component';
import { VeiculosEditComponent } from './veiculos/veiculos-edit/veiculos-edit.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuariosEditComponent } from './usuarios/usuarios-edit/usuarios-edit.component';

const routes: Routes = [
  {
    path: 'pecas', children: [
      { path: '', component: PecasListComponent },
      { path: 'add', component: PecasEditComponent },
      { path: 'view/:id', component: PecasEditComponent },
      { path: 'edit/:id', component: PecasEditComponent },
    ]
  },
  {
    path: 'mao-obra', children: [
      { path: '', component: MaoObraListComponent },
      { path: 'add', component: MaoObraEditComponent },
      { path: 'view/:id', component: MaoObraEditComponent },
      { path: 'edit/:id', component: MaoObraEditComponent },
    ]
  },
  {
    path: 'veiculos', children: [
      { path: '', component: VeiculosListComponent },
      { path: 'add', component: VeiculosEditComponent },
      { path: 'view/:id', component: VeiculosEditComponent },
      { path: 'edit/:id', component: VeiculosEditComponent },
    ]
  },
  {
    path: 'usuarios', children: [
      { path: '', component: UsuariosListComponent },
      { path: 'add', component: UsuariosEditComponent },
      { path: 'view/:id', component: UsuariosEditComponent },
      { path: 'edit/:id', component: UsuariosEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosRoutingModule { }