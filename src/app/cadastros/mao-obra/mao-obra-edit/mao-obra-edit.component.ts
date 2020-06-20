import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PoDialogService, PoSelectOption, PoPageDefault, PoBreadcrumb, PoBreadcrumbItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-mao-obra-edit',
  templateUrl: './mao-obra-edit.component.html',
  styleUrls: ['./mao-obra-edit.component.css']
})
export class MaoObraEditComponent implements OnInit {

  public page: PoPageDefault = {
    title: '',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[]
    },
    actions: []
  }

  maoObraForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
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
    private dialog: PoDialogService
  ) { }

  ngOnInit(): void {
    if (this.router.url.indexOf('add') != -1) {
      this.page.title = 'Adicionar Mão de Obra';
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Mão de Obra' },
        { label: 'Adicionar Mão de Obra' }
      ],
        this.page.actions = [
          { label: 'Salvar', action: () => { } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ]
    } else if (this.router.url.indexOf('edit') != -1) {
      this.page.title = 'Editar Mão de Obra';
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Mão de Obra' },
        { label: 'Editar Mão de Obra' }
      ],
        this.page.actions = [
          { label: 'Salvar', action: () => { } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ]
    } else {
      this.page.title = 'Visualizar Mão de Obra';
      this.disabledFields = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Mão de Obra' },
        { label: 'Visualizar Mão de Obra' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ]
    }
  }

  private dialogVoltar() {
    this.dialog.confirm({
      confirm: () => this.router.navigate(['cadastro/mao-obra/']),
      title: 'Alerta',
      message: 'Salve para não perder os dados. Deseja voltar a tela de listagem?'
    })
  }

}