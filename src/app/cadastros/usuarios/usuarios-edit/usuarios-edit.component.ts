import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoSelectOption, PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Users } from 'src/app/interfaces/users.model';
import { HttpErrorResponse } from '@angular/common/http';

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
    avatar: ['', []],
    email: ['', [Validators.required]],
    password: ['', []],
    userName: ['', [Validators.required]],
    active: [true, [Validators.required]]
  })

  public disabledId: boolean = false;
  public disabledFields: boolean = false;
  public loading: boolean;
  public id: any;
  public tipoTela: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: PoDialogService,
    private notificationService: PoNotificationService,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    if (this.router.url.indexOf('add') != -1) {
      this.page.title = 'Adicionar Usuário';
      this.tipoTela = 'add';
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Adicionar Usuário' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.cadastrarUsuario(this.usuariosForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
      this.controls.password.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(12)]);
      this.disabledId = true;
    } else if (this.router.url.indexOf('edit') != -1) {
      this.page.title = 'Editar Usuário';
      this.tipoTela = 'edit';
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' },
        { label: 'Editar Usuário' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.alterUsuario(this.usuariosForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        this.id = paramMap.get('id');
      })
      this.getDetailById(this.id);
      this.disabledId = true;
    } else {
      this.page.title = 'Visualizar Usuário';
      this.tipoTela = 'view';
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
    };

    if (this.tipoTela != 'view') {
      this.usuariosForm.valueChanges.subscribe((_) => {
        this.page.actions[0].disabled = this.usuariosForm.invalid;
      });
    }
  }

  get controls() {
    return this.usuariosForm.controls;
  }


  getDetailById(id) {
    this.loading = true;
    this.usuariosService
      .findById(id)
      .subscribe((data) => {
        this.usuariosForm.setValue(data);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.router.navigate(['cadastro/usuarios']);
          this.loading = false;
        })
  }

  alterUsuario(usuario: Users) {
    this.loading = true;
    if (this.usuariosForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      this.usuariosService
        .alterUser(usuario)
        .subscribe((data) => {
          this.notificationService.success('Usuário alterado com sucesso!');
          this.router.navigate(['cadastro/usuarios/']);
          this.loading = false;
        },
          (error: any) => {
            //this.notificationService.error('Erro ao salvar usuário!');
            this.loading = false;
          })
    }
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
            //this.notificationService.error('Erro ao salvar usuário!');
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
