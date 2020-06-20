import { Component, OnInit } from '@angular/core';
import { PoNotificationService, PoTableColumn, PoBreadcrumbItem, PoPageDefault, PoBreadcrumb } from '@po-ui/ng-components';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mao-obra-list',
  templateUrl: './mao-obra-list.component.html',
  styleUrls: ['./mao-obra-list.component.css']
})
export class MaoObraListComponent implements OnInit {

  public page: PoPageDefault = {
    title: 'Cadastro de Mão de Obra',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Mão de Obra' }
      ]
    },
    actions: [
      { label: 'Adicionar', url: 'cadastro/mao-obra/add' },
      { label: 'Visualizar', action: () => { this.viewMaoObra() } },
      { label: 'Editar', action: () => { this.editarMaoObra() } },
    ]
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '10%' },
      { property: 'descricao', label: 'Descrição', width: '30%' },
      { property: 'valorUnitario', label: 'Valor Unitário', width: '15%', type: 'currency', format: 'BRL' },
      { property: 'active', label: 'Ativo', width: '10%', type: 'boolean' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  filtros: any = {
    codigo: '',
    descricao: ''
  }


  private itemSelecionado: string = '';

  constructor(
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMaoObra();
  }

  getSelected(event) {
    this.itemSelecionado = event.id
    console.log(this.itemSelecionado);

  }

  getUnSelected() {
    this.itemSelecionado = ''
  }

  getMaoObra() {

    this.table.items = [
      {
        "id": 1,
        "descricao": "Martelinho de Ouro",
        "valorUnitario": 140.00,
        "active":true
      }, {
        "id": 2,
        "descricao": "Serviço de Ajuste em Vidraças",
        "valorUnitario": 91.00,
        "active":true
      },
      {
        "id": 3,
        "descricao": "Serviço de Motor Completo 8v",
        "valorUnitario": 1200.00,
        "active":false
      },
      {
        "id": 4,
        "descricao": "Serviço de Motor Completo 16v",
        "valorUnitario": 1700.00,
        "active":true
      }
    ]
  }

  private editarMaoObra() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione uma mao de obra para editar!');
      return;
    } else {
      this.router.navigate(['edit', this.itemSelecionado], { relativeTo: this.route });
    }
  }

  private viewMaoObra() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione uma mao de obra para visualizar!');
      return;
    } else {
      this.router.navigate(['view', this.itemSelecionado], { relativeTo: this.route });
    }
  }


}