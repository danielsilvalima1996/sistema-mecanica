import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { PoDialogService, PoSelectOption, PoBreadcrumb, PoBreadcrumbItem, PoPageDefault, PoNotificationService } from '@po-ui/ng-components';
import { VeiculoService } from 'src/app/services/veiculo/veiculo.service';
import { Veiculo } from 'src/app/interfaces/veiculo.model';

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
    id: ['', []],
    marca: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    ano: ['', [Validators.required]],
    tipoCombustivel: ['', [Validators.required]],
    active: ['', [Validators.required]]
  })


  selects = {
    ativoOptions: <Array<PoSelectOption>>[
      { label: 'Ativo', value: 'true' },
      { label: 'Inativo', value: 'false' }]
  }



  public loading: boolean
  public disabledId: boolean = false;
  public disabledFields: boolean = false;
  private id: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: PoDialogService,
    private notificationService: PoNotificationService,
    private veiculosService: VeiculoService,
    private route: ActivatedRoute
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
          { label: 'Salvar',disabled:true, action: () => { this.cadastrarVeiculo(this.veiculosForm.value) } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
      this.disabledId = true;
      this.veiculosForm.valueChanges.subscribe((_) => {
        this.page.actions[0].disabled = this.veiculosForm.invalid;
      });
    } else if (this.router.url.indexOf('edit') != -1) {
      this.page.title = 'Editar Veículo';
      this.page.breadcrumb.items = [
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Veículos' },
        { label: 'Editar Veículo' }
      ],
        this.page.actions = [
          { label: 'Salvar',disabled:true, action: () => { this.alterVeiculo() } },
          { label: 'Cancelar', action: () => { this.dialogVoltar() } }
        ];
        this.veiculosForm.valueChanges.subscribe((_) => {
          this.page.actions[0].disabled = this.veiculosForm.invalid;
        });
      this.disabledId = true;
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        this.id = paramMap.get('id');
      })
      this.getDetailById(this.id);

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
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        this.id = paramMap.get('id');
      })
      this.getDetailById(this.id);
    }
  }

  get controls() {
    return this.veiculosForm.controls;
  }

  getDetailById(id) {
    this.veiculosService
      .findById(id)
      .subscribe((data) => {
        console.log(data);
        this.veiculosForm.setValue(data)
      })
  }

  alterVeiculo(parameters?: any) {
    this.loading = true;
    if (this.veiculosForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {

      let obj = {
        marca: this.controls.marca.value,
        modelo: this.controls.modelo.value,
        ano: this.controls.ano.value,
        tipoCombustivel: this.controls.tipoCombustivel.value,
        active: this.controls.active.value
      }
      this.veiculosService
        .alterVeiculo(this.id, obj)
        .subscribe((data) => {
          this.notificationService.success('Veículo alterado com sucesso!');
          this.router.navigate(['cadastro/veiculos/']);
          this.loading = false;
        },
          (error: any) => {
            this.notificationService.error('Erro ao salvar veículo!');
            this.loading = false;
          })
    }
  }

  cadastrarVeiculo(veiculo: Veiculo) {
    this.loading = true;
    if (this.veiculosForm.invalid) {
      this.notificationService.warning('Formulário Inválido!');
      this.loading = false;
      return;
    } else {
      this.veiculosService
        .createVeiculo(veiculo)
        .subscribe((data) => {
          this.notificationService.success('Veículo cadastrado com sucesso!');
          this.router.navigate(['cadastro/veiculos/']);
          this.loading = false;
        },
          (error: any) => {
            this.notificationService.error('Erro ao salvar veículo!');
            this.loading = false;
          })
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