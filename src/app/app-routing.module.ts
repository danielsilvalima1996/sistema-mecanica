import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: 'ordem-servico', loadChildren:
      () => import('./ordem-servico/ordem-servico.module').then(m => m.OrdemServicoModule)
  },
  {
    path: 'cadastro', loadChildren:
      () => import('./cadastros/cadastros.module').then(m => m.CadastrosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash : false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
