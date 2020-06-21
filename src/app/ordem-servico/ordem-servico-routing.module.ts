import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdemServicoListComponent } from './ordem-servico-list/ordem-servico-list.component';
import { OrdemServicoAddComponent } from './ordem-servico-add/ordem-servico-add.component';
import { OrdemServicoEditComponent } from './ordem-servico-edit/ordem-servico-edit.component';


const routes: Routes = [
  { path: '', component: OrdemServicoListComponent },
  { path: 'add', component: OrdemServicoAddComponent },
  { path: 'view/:id', component: OrdemServicoEditComponent },
  { path: 'edit/:id', component: OrdemServicoEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdemServicoRoutingModule { }
