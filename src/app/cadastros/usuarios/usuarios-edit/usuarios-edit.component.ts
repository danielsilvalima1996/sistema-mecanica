import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoSelectOption, PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css']
})
export class UsuariosEditComponent implements OnInit {

  public page: PoPageDefault = {
    title: '',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[]
    },
    actions: []
  }

  usuariosForm: FormGroup = this.fb.group({
    // id: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    nomeCompleto: ['', [Validators.required]],
    avatar:['',[]],
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
    private dialog: PoDialogService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit(): void {
    if (this.router.url.indexOf('add') != -1) {
      this.page.title = 'Adicionar Usuários';
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Adicionar Usuários' }
      ],
        this.page.actions = [
          { label: 'Salvar', action: () => { this.salvar() } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ]
    } else if (this.router.url.indexOf('edit') != -1) {
      this.page.title = 'Editar Usuários';
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Editar Usuários' }
      ],
        this.page.actions = [
          { label: 'Salvar', action: () => { this.salvar() } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ]
    } else {
      this.page.title = 'Visualizar Usuários';
      this.disabledFields = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Visualizar Usuários' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ]
    }
  }

  private dialogVoltar() {
    this.dialog.confirm({
      confirm: () => this.router.navigate(['cadastro/usuarios/']),
      title: 'Alerta',
      message: 'Salve para não perder os dados. Deseja voltar a tela de listagem?'
    })
  }

  private salvar() {
    this.notificationService.success('Cadastro salvo com sucesso');
    this.router.navigate(['cadastro/usuarios']);
  }

}
