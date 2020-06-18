import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PecasListComponent } from './pecas/pecas-list/pecas-list.component';

const routes: Routes = [
    { path: 'pecas', component: PecasListComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CadastrosRoutingModule { }