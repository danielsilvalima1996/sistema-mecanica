import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoDialogService, PoNotificationService, PoTableColumn } from '@po-ui/ng-components';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { OsMaoDeObraEnvio } from 'src/app/interfaces/mao-de-obra';
import { OsPecasEnvio } from 'src/app/interfaces/pecas';

@Component({
  selector: 'app-ordem-servico-edit',
  templateUrl: './ordem-servico-edit.component.html',
  styleUrls: ['./ordem-servico-edit.component.css']
})
export class OrdemServicoEditComponent implements OnInit {

  public page: PoPageDefault = {
    title: 'Nova OS',
    actions: [
      { label: 'Salvar', action: () => { this.salvar() } },
      { label: 'Voltar', action: () => { this.dialogVoltar() } }
    ]
  }

  private id: number;

  public tipoRelatorio: string = '';

  public tableMao = {
    columns: <Array<PoTableColumn>>[
      { label: 'Id', property: 'id' },
      { label: 'Qtd', property: 'qtd' },
      { label: 'Valor Unitário', property: 'valorUnitario', type: 'currency', format: 'BRL' },
      { label: '', property: 'total', type: 'currency', format: 'BRL' }
    ],
    items: []
  }
  public tablePeca = {
    columns: <Array<PoTableColumn>>[
      { label: 'Id', property: 'id' },
      { label: 'Qtd', property: 'qtd' },
      { label: 'Valor Unitário', property: 'valorUnitario', type: 'currency', format: 'BRL' },
      { label: '', property: 'total', type: 'currency', format: 'BRL' }
    ],
    items: []
  }


  public osAddForm: FormGroup;
  public maoObraForm: FormGroup;
  public pecasForm: FormGroup;

  public selects = {
    veiculos: <Array<PoSelectOption>>[
      { label: 'Parati', value: 0 },
      { label: 'Fox', value: 1 },
      { label: 'Celta', value: 2 },
    ],
    maoDeObra: <Array<PoSelectOption>>[
      { label: 'Lavagem', value: 0 },
      { label: 'Troca de óleo', value: 1 },
      { label: 'Troca de escapamento', value: 2 },
      { label: 'Alinhamento', value: 3 },
      { label: 'Balanceamento', value: 4 },
      { label: 'Troca de pneus', value: 5 }
    ],
    pecas: <Array<PoSelectOption>>[]
  }

  constructor(
    private fb: FormBuilder,
    private dialog: PoDialogService,
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.router.url.indexOf('edit') != -1) {
      this.getId();
      this.tipoRelatorio = 'edit';
      this.page.title = `Editar OS ${this.id}`;
    } else {
      this.getId();
      this.tipoRelatorio = 'view';
      this.page.title = `Visualizar OS ${this.id}`;
    }

    this.osAddForm = this.fb.group({
      id: ['', []],
      entrada: ['', []],
      saida: ['', []],
      nomeCliente: ['', []],
      cpfCnpj: ['', []],
      ddd: ['', []],
      telefone: ['', []],
      observacoes: ['', []],
      idVeiculo: ['', []],
      idOsMaoDeObra: ['', []],
      totalMaoDeObra: ['', []],
      idOsPecas: ['', []],
      totalPecas: ['', []],
      totalServico: ['', []],
      idUsuario: ['', []],
      isFinalizado: ['', []],
    })

    this.maoObraForm = this.fb.group({
      qtd: ['', [Validators.required]],
      idMaoDeObra: ['', [Validators.required]]
    })

    this.pecasForm = this.fb.group({
      qtd: ['', [Validators.required]],
      idPecas: ['', [Validators.required]]
    })

  }

  public get controls() {
    return this.osAddForm.controls;
  }

  private getId() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = parseInt(paramMap.get('id'), 10);
    })
  }

  public addMaoObra(event) {
    let obj: OsMaoDeObraEnvio = {
      idMaoDeObra: event['id'],
      idOrdensServico: this.id,
      qtd: event['qtd']
    }
    console.log(obj);
    this.tableMao.items.push({ id: null, descricao: event['id'], qtd: obj.qtd, valorUnitario: 10, total: 100 })
    this.maoObraForm.reset();
  }

  public addPeca(event) {
    let obj: OsPecasEnvio = {
      idOrdensServico: this.id,
      idPecas: event['id'],
      qtd: event['qtd']
    }
    console.log(obj);
    this.tablePeca.items.push({ id: null, descricao: event['id'], qtd: obj.qtd, valorUnitario: 10, total: 100 })
    this.pecasForm.reset();
  }

  private dialogVoltar() {
    this.dialog.confirm({
      confirm: () => this.router.navigate(['ordem-servico']),
      title: 'Alerta',
      message: 'Salve para não perder os dados. Deseja voltar a tela de listagem?'
    })
  }

  private salvar() {
    console.log(this.osAddForm.value);
    this.notificationService.success('Salvo com sucesso');
    this.router.navigate(['ordem-servico/edit', 1]);
  }

}
