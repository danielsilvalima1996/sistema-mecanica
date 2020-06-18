import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdemServicoListComponent } from './ordem-servico-list/ordem-servico-list.component';
import { PoPageModule, PoTableModule, PoFieldModule, PoButtonModule } from '@po-ui/ng-components';



@NgModule({
  declarations: [OrdemServicoListComponent],
  imports: [
    CommonModule,
    PoPageModule,
    PoTableModule,
    PoFieldModule,
    PoButtonModule
  ]
})
export class OrdemServicoModule { }
