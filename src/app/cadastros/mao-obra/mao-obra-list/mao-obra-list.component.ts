import { Component, OnInit } from '@angular/core';
import { PoNotificationService, PoTableColumn, PoBreadcrumbItem, PoPageDefault, PoBreadcrumb } from '@po-ui/ng-components';
import { Router, ActivatedRoute } from '@angular/router';
import { MaoObraService } from 'src/app/services/mao-obra/mao-obra.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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

  filtros = {
    codigo: '',
    descricao: ''
  }

  maoObraForm: FormGroup = this.fb.group({
    codigo: ['',[]],
    descricao: ['', [Validators.required]]
  })

  private itemSelecionado: string = '';
  public loading: boolean;

  constructor(
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private maoObraService: MaoObraService,
    private fb: FormBuilder
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
          this.notificationService.error('Error ao obter dados');
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

  public filterByDescricao() {
    this.maoObraService
      .filterByDescricao(this.controls.descricao.value)
      .subscribe((data:any) => {
        this.table.items = data;
      })
  }


}