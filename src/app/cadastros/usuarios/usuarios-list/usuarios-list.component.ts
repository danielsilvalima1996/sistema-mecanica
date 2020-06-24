import { Component, OnInit } from '@angular/core';
import { PoNotificationService, PoTableColumn, PoBreadcrumbItem, PoPageDefault, PoBreadcrumb } from '@po-ui/ng-components';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Users } from 'src/app/interfaces/users.model';

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
      { property: 'userName', label: 'Nome de Usuário', width: '25%' },
      { property: 'active', label: 'Ativo', width: '25%', type: 'boolean' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  filtros: any = {
    id: '',
    email: '',
    nomeCompleto: '',
  }


  private itemSelecionado: string = '';

  constructor(
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getSelected(event) {
    this.itemSelecionado = event.id
  }

  getUnSelected() {
    this.itemSelecionado = ''
  }

  getUsuarios() {

    this.usuariosService
      .findAll()
      .subscribe((data: any) => {
        this.table.items = data
      })
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