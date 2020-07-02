import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoDialogService, PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { PecasService } from 'src/app/services/pecas/pecas.service';
import { Pecas } from 'src/app/interfaces/pecas';

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
    id:['',[]],
    marca: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    valorUnitario: ['', [Validators.required]],
    active: [true, [Validators.required]]
  })

  public disabledId: boolean = false;
  public disabledFields: boolean = false;
  public loading: boolean;
  public id: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private dialog: PoDialogService,
    private pecasService: PecasService,
    private route: ActivatedRoute,
    private notificationService: PoNotificationService
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
          { label: 'Salvar',disabled:true, action: () => {this.cadastrarPecas(this.pecasForm.value)} },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
        this.pecasForm.valueChanges.subscribe((_) => {
          this.page.actions[0].disabled = this.pecasForm.invalid;
        })
        this.disabledId = true;
    } else if (this.router.url.indexOf('edit') != -1) {
      this.page.title = 'Editar Peça';
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Peças' },
        { label: 'Editar Peça' }
      ],
        this.page.actions = [
          { label: 'Salvar',disabled:true, action: () => { this.alterPeca() } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          this.id = paramMap.get('id');
        });
        this.getDetailById(this.id);
        this.pecasForm.valueChanges.subscribe((_) => {
          this.page.actions[0].disabled = this.pecasForm.invalid;
        })
        this.disabledId = true;
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
        ];
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          this.id = paramMap.get('id');
        })
        this.getDetailById(this.id);
    }
  }

  get controls() {
    return this.pecasForm.controls;
  }


  getDetailById(id) {
    this.pecasService
      .findById(id)
      .subscribe((data) => {
        console.log(data);
        
        this.pecasForm.setValue(data)
      })
  }

  alterPeca(parameters?: any) {
    this.loading = true;
    if (this.pecasForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {

      let obj = {
        marca: this.controls.marca.value,
        modelo: this.controls.modelo.value,
        descricao: this.controls.descricao.value,
        valorUnitario: this.controls.valorUnitario.value,
        active: this.controls.active.value
      }
      this.pecasService
        .alterPecas(this.id, obj)
        .subscribe((data) => {
          this.notificationService.success('Peça alterada com sucesso!');
          this.router.navigate(['cadastro/pecas/']);
          this.loading = false;
        },
          (error: any) => {
            // //this.notificationService.error('Erro ao salvar peça!');
            this.loading = false;
          })
    }
  }

  cadastrarPecas(pecas: Pecas) {
    this.loading = true;
    if (this.pecasForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      this.pecasService
        .createPecas(pecas)
        .subscribe((data) => {
          this.notificationService.success('Peça cadastrada com sucesso!');
          this.router.navigate(['cadastro/pecas/']);
          this.loading = false;
        },
          (error: any) => {
            // //this.notificationService.error('Erro ao salvar peça!');
            this.loading = false;
          })
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
