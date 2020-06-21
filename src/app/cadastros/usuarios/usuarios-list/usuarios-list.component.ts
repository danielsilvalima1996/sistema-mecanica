import { Component, OnInit } from '@angular/core';
import { PoNotificationService, PoTableColumn, PoBreadcrumbItem, PoPageDefault, PoBreadcrumb } from '@po-ui/ng-components';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  public page: PoPageDefault = {
    title: 'Cadastro de Usuários',
    breadcrumb: <PoBreadcrumb>{
      items: <PoBreadcrumbItem[]>[
        { label: 'Home' },
        { label: 'Cadastros' },
        { label: 'Usuários' }
      ]
    },
    actions: [
      { label: 'Adicionar', url: 'cadastro/usuarios/add' },
      { label: 'Visualizar', action: () => { this.viewUsuario() } },
      { label: 'Editar', action: () => { this.editarUsuario() } },
    ]
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'Código', width: '25%' },
      { property: 'email', label: 'E-mail', width: '25%' },
      { property: 'nomeCompleto', label: 'Nome Completo', width: '25%' },
      { property: 'active', label: 'Ativo', width: '25%', type: 'boolean' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  filtros: any = {
    id: '',
    email: '',
    nomeCompleto:'',
  }


  private itemSelecionado: string = '';

  constructor(
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getSelected(event) {
    this.itemSelecionado = event.id
    console.log(this.itemSelecionado);

  }

  getUnSelected() {
    this.itemSelecionado = ''
  }

  getUsuarios() {

    this.table.items = [
      {
        "id": 1,
        "nomeCompleto": "Alison Keuver da Silva",
        "email": "alison.keuver@gmail.com",
        "active":true
      },     {
        "id": 2,
        "nomeCompleto": "Daniel Lima",
        "email": "daniel.lima@gmail.com",
        "active":true
      },
      {
        "id": 3,
        "nomeCompleto": "Cristian Coelho",
        "email": "cristian.coelho@gmail.com",
        "active":true
      },
      {
        "id": 4,
        "nomeCompleto": "João da Silva",
        "email": "joao.silva@gmail.com",
        "active":true
      }
    ]
  }

  private editarUsuario() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione um usuário para editar!');
      return;
    } else {
      this.router.navigate(['edit', this.itemSelecionado], { relativeTo: this.route });
    }
  }

  private viewUsuario() {
    if (this.itemSelecionado == null || this.itemSelecionado == '') {
      this.notificationService.warning('Selecione um usuário para visualizar!');
      return;
    } else {
      this.router.navigate(['view', this.itemSelecionado], { relativeTo: this.route });
    }
  }


}