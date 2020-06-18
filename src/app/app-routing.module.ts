import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: 'ordem-servico', loadChildren:
      () => import('./ordem-servico/ordem-servico.module').then(m => m.OrdemServicoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
