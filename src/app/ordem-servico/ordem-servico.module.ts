import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdemServicoRoutingModule } from './ordem-servico-routing.module';
import { PoPageModule, PoButtonModule, PoFieldModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdemServicoListComponent } from './ordem-servico-list/ordem-servico-list.component';


@NgModule({
  declarations: [OrdemServicoListComponent],
  imports: [
    CommonModule,
    OrdemServicoRoutingModule,
    PoPageModule,
    PoButtonModule,
    PoFieldModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrdemServicoModule { }
