import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PecasListComponent } from './pecas/pecas-list/pecas-list.component';
import { PecasEditComponent } from './pecas/pecas-edit/pecas-edit.component';
import { CadastrosRoutingModule } from './cadastros-routing.module';
import { PoPageModule, PoButtonModule, PoFieldModule, PoTableModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaoObraListComponent } from './mao-obra/mao-obra-list/mao-obra-list.component';
import { MaoObraEditComponent } from './mao-obra/mao-obra-edit/mao-obra-edit.component';
import { VeiculosListComponent } from './veiculos/veiculos-list/veiculos-list.component';
import { VeiculosEditComponent } from './veiculos/veiculos-edit/veiculos-edit.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuariosEditComponent } from './usuarios/usuarios-edit/usuarios-edit.component';


@NgModule({
  declarations: [PecasListComponent, PecasEditComponent, MaoObraListComponent, MaoObraEditComponent, VeiculosListComponent, VeiculosEditComponent, UsuariosListComponent, UsuariosEditComponent],
  imports: [
    CommonModule,
    CadastrosRoutingModule,
    PoPageModule,
    PoButtonModule,
    PoFieldModule,
    FormsModule,
    ReactiveFormsModule,
    PoTableModule
  ]
})
export class CadastrosModule { }
