import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoTableColumn, PoBreadcrumbItem, PoBreadcrumb, PoPageDefault } from '@po-ui/ng-components';

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
      { label: 'Visualizar', action: () => { this.viewVeiculo() } },
      { label: 'Editar', action: () => { this.editarVeiculo() } },
    ]
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'Codigo', width: '10%' },
      { property: 'marca', label: 'Marca', width: '20%' },
      { property: 'modelo', label: 'Modelo', width: '20%' },
      { property: 'anoVeiculo', label: 'Ano Veículo', width: '15%' },
      { property: 'tipoCombustivel', label: 'Tipo Combustível', width: '25%' },
      { property: 'active', label: 'Ativo', width: '10%', type: 'boolean' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  filtros: any = {
    id: '',
    marca: '',
    modelo:'',
    anoVeiculo: ''
  }


  private itemSelecionado: string = '';

  constructor(
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getVeiculos();
  }

  getSelected(event) {
    this.itemSelecionado = event.id
    console.log(this.itemSelecionado);

  }

  getUnSelected() {
    this.itemSelecionado = ''
  }

  getVeiculos() {

    this.table.items = [
      {
        "id": 1,
        "marca": "Volkswagen",
        "modelo": "G5",
        "anoVeiculo": "2010",
        "tipoCombustivel": 'Gasolina',
        "active":true
      }, {
        "id": 2,
        "marca": "Ford",
        "modelo": "Ka",
        "anoVeiculo": "2018",
        "tipoCombustivel": 'Flex',
        "active":true
      },
      {
        "id": 3,
        "marca": "Hyundai",
        "modelo": "Hb20 ",
        "anoVeiculo": "2010",
        "tipoCombustivel": 'Flex',
        "active":false
      },
      {
        "id": 4,
        "marca": "Fiat",
        "modelo": "Mille",
        "anoVeiculo": "2010",
        "tipoCombustivel": 'Flex',
        "active":true
      }
    ]
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


}
