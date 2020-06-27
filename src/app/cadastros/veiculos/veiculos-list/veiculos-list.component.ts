import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoTableColumn, PoBreadcrumbItem, PoBreadcrumb, PoPageDefault } from '@po-ui/ng-components';
import { VeiculoService } from 'src/app/services/veiculo/veiculo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UtilService } from 'src/app/services/utils/util.service';

@Component({
  selector: 'app-veiculos-list',
  templateUrl: './veiculos-list.component.html',
  styleUrls: ['./veiculos-list.component.css']
})
export class VeiculosListComponent implements OnInit {

  public page: PoPageDefault = {
    title: 'Cadastro de Veículos',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Veículos' }
      ]
    },
    actions: [
      { label: 'Adicionar', url: 'cadastro/veiculos/add' },
      { label: 'Editar', action: () => { this.editarVeiculo() } },
      { label: 'Visualizar', action: () => { this.viewVeiculo() } }
    ]
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'Codigo', width: '10%' },
      { property: 'marca', label: 'Marca', width: '20%' },
      { property: 'modelo', label: 'Modelo', width: '20%' },
      { property: 'ano', label: 'Ano Veículo', width: '15%' },
      { property: 'tipoCombustivel', label: 'Tipo Combustível', width: '25%' },
      { property: 'active', label: 'Ativo', width: '10%', type: 'boolean' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  veiculosForm: FormGroup = this.fb.group({
    id: ['', []],
    marca: ['', []],
    modelo: ['', []],
    ano: ['', []]
  })


  private itemSelecionado: string = '';
  public loading: boolean

  constructor(
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private veiculosService: VeiculoService,
    private fb: FormBuilder,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.getVeiculos();
  }

  get controls() {
    return this.veiculosForm.controls;
  }

  getSelected(event) {
    this.itemSelecionado = event.id
    console.log(this.itemSelecionado);

  }

  getUnSelected() {
    this.itemSelecionado = ''
  }

  getVeiculos() {
    this.loading = true;
    this.veiculosService.findAll()
      .subscribe((data) => {
        this.table.items = data;
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.loading = false;
          this.notificationService.error('Error ao obter dados');
        })
  }

  private editarVeiculo() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione um veículo para editar!');
      return;
    } else {
      this.router.navigate(['edit', this.itemSelecionado], { relativeTo: this.route });
    }
  }

  private viewVeiculo() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione um veículo para visualizar!');
      return;
    } else {
      this.router.navigate(['view', this.itemSelecionado], { relativeTo: this.route });
    }
  }

  getFiltro() {
    this.loading = true;
    let obj = {
      idVeiculo: this.controls.id.value,
      anoVeiculo: this.controls.ano.value,
      marcaVeiculo: this.controls.marca.value,
      modeloVeiculo: this.controls.modelo.value,
    }
    this.veiculosService
      .buscaFiltro(this.utilService.getParameters(obj)).
      subscribe((data) => {
        this.table.items = data
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.table.items = [];
        this.loading = false;
        this.notificationService.error('Error ao obter dados');
      })
  }





}
