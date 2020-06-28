import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdemServicoRoutingModule } from './ordem-servico-routing.module';
import { PoPageModule, PoButtonModule, PoFieldModule, PoTableModule, PoDividerModule, PoInfoModule, PoLoadingModule, PoTagModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdemServicoListComponent } from './ordem-servico-list/ordem-servico-list.component';
import { OrdemServicoEditComponent } from './ordem-servico-edit/ordem-servico-edit.component';
import { OrdemServicoAddComponent } from './ordem-servico-add/ordem-servico-add.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [OrdemServicoListComponent, OrdemServicoEditComponent, OrdemServicoAddComponent],
  imports: [
    CommonModule,
    OrdemServicoRoutingModule,
    PoPageModule,
    PoButtonModule,
    PoFieldModule,
    FormsModule,
    ReactiveFormsModule,
    PoTableModule,
    PoDividerModule,
    PoInfoModule,
    PoLoadingModule,
    PoTagModule
  ]
})
export class OrdemServicoModule { }
