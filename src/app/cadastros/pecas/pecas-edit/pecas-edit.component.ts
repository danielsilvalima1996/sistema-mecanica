import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoDialogService, PoSelectOption } from '@po-ui/ng-components';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pecas-edit',
  templateUrl: './pecas-edit.component.html',
  styleUrls: ['./pecas-edit.component.css']
})
export class PecasEditComponent implements OnInit {

  public page: PoPageDefault = {
    title: '',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[]
    },
    actions: []
  }

  pecasForm: FormGroup = this.fb.group({
    marca: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    valorUnitario: ['', [Validators.required]],
    active: [1, [Validators.required]]
  })


  selects = {
    ativoOptions: <Array<PoSelectOption>>[
      { label: 'Ativo', value: 1 },
      { label: 'Inativo', value: 2 }]
  }



  public disabledFields: boolean = false;
  private route

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private dialog: PoDialogService
  ) { }

  ngOnInit(): void {
    if (this.router.url.indexOf('add') != -1) {
      this.page.title = 'Adicionar Peça';
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Peças' },
        { label: 'Adicionar Peça' }
      ],
        this.page.actions = [
          { label: 'Salvar', action: () => { } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ]
    } else if (this.router.url.indexOf('edit') != -1) {
      this.page.title = 'Editar Peça';
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Peças' },
        { label: 'Editar Peça' }
      ],
        this.page.actions = [
          { label: 'Salvar', action: () => { } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ]
    } else {
      this.page.title = 'Visualizar Peça';
      this.disabledFields = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Peças' },
        { label: 'Visualizar Peça' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ]
    }
  }

  private dialogVoltar() {
    this.dialog.confirm({
      confirm: () => this.router.navigate(['cadastro/pecas/']),
      title: 'Alerta',
      message: 'Salve para não perder os dados. Deseja voltar a tela de listagem?'
    })
  }

}
