import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoSelectOption, PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Users } from 'src/app/interfaces/users.model';

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
    id: ['', []],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    avatar:['',[]],
    active: ['', [Validators.required]]
  })


  selects = {
    ativoOptions: <Array<PoSelectOption>>[
      { label: 'Ativo', value: 'true' },
      { label: 'Inativo', value: 'false' }]
  }

  public disabledId: boolean = false;
  public disabledFields: boolean = false;
  public loading: boolean;
  public id: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: PoDialogService,
    private notificationService: PoNotificationService,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {

    this.usuariosForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.usuariosForm.invalid;
    })

    if (this.router.url.indexOf('add') != -1) {
      this.page.title = 'Adicionar Usuário';
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Adicionar Usuário' }
      ],
        this.page.actions = [
          { label: 'Salvar',disabled: true, action: () => { this.cadastrarUsuario(this.usuariosForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
        this.disabledId = true;
    } else if (this.router.url.indexOf('edit') != -1) {
      this.page.title = 'Editar Usuário';
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Editar Usuário' }
      ],
        this.page.actions = [
          { label: 'Salvar',disabled: true, action: () => { this.salvar() } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          this.id = paramMap.get('id');
        })
        this.getDetailById(this.id);
        this.disabledId = true;
    } else {
      this.page.title = 'Visualizar Usuário';
      this.disabledFields = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Visualizar Usuário' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          this.id = paramMap.get('id');
        })
        this.getDetailById(this.id);
    }
  }

  getDetailById(id) {
    this.usuariosService
      .findById(id)
      .subscribe((data) => {
        this.usuariosForm.setValue(data)
      })
  }

  cadastrarUsuario(users: Users) {
    this.loading = true;
    if (this.usuariosForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      this.usuariosService
        .createUser(users)
        .subscribe((data) => {
          this.notificationService.success('Usuário cadastrado com sucesso!');
          this.router.navigate(['cadastro/usuarios/']);
          this.loading = false;
        },
          (error: any) => {
            this.notificationService.error('Erro ao salvar usuário!');
            this.loading = false;
          })
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
