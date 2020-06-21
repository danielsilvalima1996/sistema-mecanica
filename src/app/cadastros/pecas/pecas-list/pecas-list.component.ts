import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoTableColumn, PoNotificationService } from '@po-ui/ng-components';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pecas-list',
  templateUrl: './pecas-list.component.html',
  styleUrls: ['./pecas-list.component.css']
})
export class PecasListComponent implements OnInit {

  public page: PoPageDefault = {
    title: 'Cadastro de Peças',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Peças' }
      ]
    },
    actions: [
      { label: 'Adicionar', url: 'cadastro/pecas/add' },
      { label: 'Visualizar', action: () => { this.viewPeca() } },
      { label: 'Editar', action: () => { this.editarPeca() } },
    ]
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'ID', width: '10%' },
      { property: 'marca', label: 'Marca', width: '15%' },
      { property: 'modelo', label: 'Modelo', width: '20%' },
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
    marca: '',
    descricao: ''
  }


  private itemSelecionado: string = '';

  constructor(
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPecas();
  }

  getSelected(event) {
    this.itemSelecionado = event.id
    console.log(this.itemSelecionado);

  }

  getUnSelected() {
    this.itemSelecionado = ''
  }

  getPecas() {

    this.table.items = [
      {
        "id": 1,
        "marca": "Pirelli",
        "modelo": "Pneu Aro 14 ",
        "descricao": "Pneu Aro 14 175/70R14 Pirelli Cinturato P1",
        "valorUnitario": 279.90,
        "active":true
      }, {
        "id": 2,
        "marca": "Lampada",
        "modelo": "Lampada",
        "descricao": "Lampada 14w",
        "valorUnitario": 20.90,
        "active":true
      },
      {
        "id": 3,
        "marca": "Pirelli",
        "modelo": "Pneu Aro 17 ",
        "descricao": "Pneu Aro 17 175/70R14 Pirelli Cinturato P1",
        "valorUnitario": 379.90,
        "active":false
      },
      {
        "id": 4,
        "marca": "Vipal",
        "modelo": "Rmb-01",
        "descricao": "Remendo para Pneu",
        "valorUnitario": 0.50,
        "active":true
      }
    ]
  }

  private editarPeca() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione uma peça para editar!');
      return;
    } else {
      this.router.navigate(['edit', this.itemSelecionado], { relativeTo: this.route });
    }
  }

  private viewPeca() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione uma peça para visualizar!');
      return;
    } else {
      this.router.navigate(['view', this.itemSelecionado], { relativeTo: this.route });
    }
  }


}
