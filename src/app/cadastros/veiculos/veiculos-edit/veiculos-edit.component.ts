import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PoDialogService, PoSelectOption, PoBreadcrumb, PoBreadcrumbItem, PoPageDefault, PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-veiculos-edit',
  templateUrl: './veiculos-edit.component.html',
  styleUrls: ['./veiculos-edit.component.css']
})
export class VeiculosEditComponent implements OnInit {

  public page: PoPageDefault = {
    title: '',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[]
    },
    actions: []
  }

  veiculosForm: FormGroup = this.fb.group({
    marca: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    anoVeiculo: ['', [Validators.required]],
    tipoCombustivel: ['', [Validators.required]],
    active: [1, [Validators.required]]
  })


  selects = {
    ativoOptions: <Array<PoSelectOption>>[
      { label: 'Ativo', value: 1 },
      { label: 'Inativo', value: 2 }]
  }



  public disabledFields: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: PoDialogService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit(): void {
    if (this.router.url.indexOf('add') != -1) {
      this.page.title = 'Adicionar Veículo';
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Veículos' },
        { label: 'Adicionar Veículo' }
      ],
        this.page.actions = [
          { label: 'Salvar', action: () => { this.salvar() } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ]
    } else if (this.router.url.indexOf('edit') != -1) {
      this.page.title = 'Editar Veículo';
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Veículos' },
        { label: 'Editar Veículo' }
      ],
        this.page.actions = [
          { label: 'Salvar', action: () => { this.salvar() } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ]
    } else {
      this.page.title = 'Visualizar Veículo';
      this.disabledFields = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Veículos' },
        { label: 'Visualizar Veículo' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ]
    }
  }

  private dialogVoltar() {
    this.dialog.confirm({
      confirm: () => this.router.navigate(['cadastro/veiculos/']),
      title: 'Alerta',
      message: 'Salve para não perder os dados. Deseja voltar a tela de listagem?'
    })
  }

  private salvar() {
    this.notificationService.success('Cadastro salvo com sucesso');
    this.router.navigate(['cadastro/veiculos']);
  }

}