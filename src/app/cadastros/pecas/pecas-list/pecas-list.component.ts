import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoBreadcrumb, PoBreadcrumbItem, PoTableColumn, PoNotificationService } from '@po-ui/ng-components';
import { ActivatedRoute, Router } from '@angular/router';
import { PecasService } from 'src/app/services/pecas/pecas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  pecasForm: FormGroup = this.fb.group({
    id: ['', []],
    marca: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
  })


  private itemSelecionado: string = '';
  public loading: boolean;

  constructor(
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private pecasService: PecasService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getPecas();
  }

  get controls() {
    return this.pecasForm.controls;
  }

  getSelected(event) {
    this.itemSelecionado = event.id;
  }

  getUnSelected() {
    this.itemSelecionado = ''
  }

  getPecas() {
    this.loading = true;
    this.pecasService.findAll()
    .subscribe((data)=>{
      this.table.items = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.error);
      this.loading = false;
      this.notificationService.error('Error ao obter dados');
    })
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

  getFiltro() {
    this.loading = true;
    this.pecasService
      .findByMarca(this.controls.marca.value).
      subscribe((data:any) => {
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
