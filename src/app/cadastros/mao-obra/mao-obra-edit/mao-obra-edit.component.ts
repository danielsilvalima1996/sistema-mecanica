import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { PoDialogService, PoSelectOption, PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoNotificationService } from '@po-ui/ng-components';
import { MaoObraService } from 'src/app/services/mao-obra/mao-obra.service';
import { MaoDeObra } from 'src/app/interfaces/mao-de-obra';
import { HttpErrorResponse } from '@angular/common/http';

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
    id: ['', []],
    descricao: ['', [Validators.required]],
    valorUnitario: ['', [Validators.required]],
    active: [true, [Validators.required]]
  })

  public disabledId: boolean = false;
  public disabledFields: boolean = false;
  private id: string = '';
  public loading: boolean;

  public tipoTela: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: PoDialogService,
    private route: ActivatedRoute,
    private maoObraService: MaoObraService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit(): void {
    if (this.router.url.indexOf('add') != -1) {
      this.tipoTela = 'add';
      this.page.title = 'Adicionar Mão de Obra';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Mão de Obra' },
        { label: 'Adicionar Mão de Obra' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.cadastrarMaoObra(this.maoObraForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
      this.maoObraForm.valueChanges.subscribe((_) => {
        console.log(_);
        console.log(this.maoObraForm.invalid);

        this.page.actions[0].disabled = this.maoObraForm.invalid;
      });
    } else if (this.router.url.indexOf('edit') != -1) {
      this.tipoTela = 'edit';
      this.page.title = 'Editar Mão de Obra';
      this.disabledId = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Mão de Obra' },
        { label: 'Editar Mão de Obra' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true, action: () => { this.alterMaoObra(this.maoObraForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];

      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        this.id = paramMap.get('id');
      })
      this.getDetailById(this.id);
      this.maoObraForm.valueChanges.subscribe((_) => {
        this.page.actions[0].disabled = this.maoObraForm.invalid;
      });
    } else {
      this.tipoTela = 'view';
      this.page.title = 'Visualizar Mão de Obra';
      this.disabledId = true;
      this.disabledFields = true;
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Mão de Obra' },
        { label: 'Visualizar Mão de Obra' }
      ],
        this.page.actions = [
          { label: 'Salvar', disabled: true },
          { label: 'Cancelar', action: () => this.router.navigate(['cadastro/mao-obra/']) }
        ];
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        this.id = paramMap.get('id');
      })
      this.getDetailById(this.id);
    }
  }

  getDetailById(id) {
    this.loading = true;
    this.maoObraService
      .findById(id)
      .subscribe((data) => {
        this.loading = false;
        this.maoObraForm.setValue(data);
      },
        (error: HttpErrorResponse) => {
          this.notificationService.error(`Mão de obra ${id} não encontrada`);
          this.router.navigate(['cadastro/mao-obra'])
          this.loading = false;
        })
  }

  alterMaoObra(maoObra: MaoDeObra) {
    this.loading = true;
    if (this.maoObraForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      this.maoObraService
        .alterMaoDeObra(maoObra)
        .subscribe((data) => {
          this.notificationService.success('Mão de obra alterada com sucesso!');
          this.router.navigate(['cadastro/mao-obra/']);
          this.loading = false;
        },
          (error: any) => {
            // //this.notificationService.error('Erro ao salvar mão de obra!');
            this.loading = false;
          })
    }
  }

  cadastrarMaoObra(maoObra: MaoDeObra) {
    this.loading = true;
    if (this.maoObraForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      this.maoObraService
        .createMaoDeObra(maoObra)
        .subscribe((data) => {
          this.notificationService.success('Mão de obra cadastrada com sucesso!');
          this.router.navigate(['cadastro/mao-obra/']);
          this.loading = false;
        },
          (error: any) => {
            // //this.notificationService.error('Erro ao salvar mão de obra!');
            this.loading = false;
          })
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