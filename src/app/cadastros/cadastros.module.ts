import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PecasListComponent } from './pecas/pecas-list/pecas-list.component';
import { PecasEditComponent } from './pecas/pecas-edit/pecas-edit.component';
import { CadastrosRoutingModule } from './cadastros-routing.module';



@NgModule({
  declarations: [PecasListComponent, PecasEditComponent],
  imports: [
    CommonModule,
    CadastrosRoutingModule
  ]
})
export class CadastrosModule { }
