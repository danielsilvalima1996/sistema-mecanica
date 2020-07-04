import { Component, OnInit } from '@angular/core';
import { PoNotificationService, PoTableColumn, PoBreadcrumbItem, PoPageDefault, PoBreadcrumb } from '@po-ui/ng-components';
import { Router, ActivatedRoute } from '@angular/router';
import { MaoObraService } from 'src/app/services/mao-obra/mao-obra.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UtilService } from 'src/app/services/utils/util.service';

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
      { label: 'Editar', action: () => { this.editarMaoObra() } },
      { label: 'Visualizar', action: () => { this.viewMaoObra() } }
    ]
  }

  table = {
    columns: <PoTableColumn[]>[
      { property: 'id', label: 'Código', width: '10%' },
      { property: 'descricao', label: 'Descrição', width: '30%' },
      { property: 'valorUnitario', label: 'Valor Unitário', width: '15%', type: 'currency', format: 'BRL' },
      { property: 'active', label: 'Ativo', width: '10%', type: 'boolean' }
    ],
    items: [],
    height: 0,
    loading: false
  }

  maoObraForm: FormGroup = this.fb.group({
    id: ['', []],
    descricao: ['', []],
    active: ['']
  })

  selects = {
    ativoOptions: <Array<any>>[
      { label: 'Ativo', value: true },
      { label: 'Inativo', value: false },
      { label: 'Todos', value: '' }
    ]
  }

  private itemSelecionado: string = '';
  public loading: boolean;

  constructor(
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private maoObraService: MaoObraService,
    private fb: FormBuilder,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.getMaoObra();
  }

  get controls() {
    return this.maoObraForm.controls;
  }

  getSelected(event) {
    this.itemSelecionado = event.id
  }

  getUnSelected() {
    this.itemSelecionado = ''
  }

  getMaoObra() {
    this.loading = true;
    this.maoObraService.findAll()
      .subscribe((data) => {
        this.table.items = data;
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.loading = false;
          // //this.notificationService.error('Error ao obter dados');
        })
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

  getFiltro() {
    this.loading = true;
    let obj = {
      id: this.controls.id.value,
      descricao: this.controls.descricao.value,
      active: this.controls.active.value
    }
    this.maoObraService
      .buscaFiltro(this.utilService.getParameters(obj)).
      subscribe((data) => {
        this.table.items = data
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.table.items = [];
          this.loading = false;
          // //this.notificationService.error(error.error['message']);
        })
  }



}