import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoDialogService, PoNotificationService, PoTableColumn } from '@po-ui/ng-components';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { OrdensServicosService } from 'src/app/services/ordens-servicos/ordens-servicos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MaoObraService } from 'src/app/services/mao-obra/mao-obra.service';
import { VeiculoService } from 'src/app/services/veiculo/veiculo.service';
import { OrdensServicos } from 'src/app/interfaces/ordens-servicos.model';

@Component({
  selector: 'app-ordem-servico-edit',
  templateUrl: './ordem-servico-edit.component.html',
  styleUrls: ['./ordem-servico-edit.component.css']
})
export class OrdemServicoEditComponent implements OnInit {

  public page: PoPageDefault = {
    title: 'Nova OS',
    actions: [
      { label: 'Salvar', action: () => { this.salvar() }, disabled: true },
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
    veiculos: <Array<PoSelectOption>>[],
    maoDeObra: <Array<PoSelectOption>>[],
    pecas: <Array<PoSelectOption>>[]
  }

  public loading: boolean = true;

  private osGet: OrdensServicos;

  constructor(
    private fb: FormBuilder,
    private dialog: PoDialogService,
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private osService: OrdensServicosService,
    private maoObraService: MaoObraService,
    private veiculoService: VeiculoService
  ) { }

  ngOnInit(): void {
    this.getId();
    this.listarMaoDeObra();
    this.listarVeiculos();
    this.findById(this.id);
    if (this.router.url.indexOf('edit') != -1) {
      this.tipoRelatorio = 'edit';
      this.page.title = `Editar OS ${this.id}`;
    } else {
      this.tipoRelatorio = 'view';
      this.page.title = `Visualizar OS ${this.id}`;
    }

    this.osAddForm = this.fb.group({
      id: ['', []],
      entrada: ['', []],
      saida: ['', []],
      nomeCliente: ['', []],
      cpfCnpj: ['', []],
      ddd: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]],
      telefone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      observacoes: ['', [Validators.required]],
      idVeiculo: ['', []],
      idOsMaoDeObra: ['', []],
      totalMaoDeObra: ['', []],
      idOsPecas: ['', []],
      totalPecas: ['', []],
      totalServico: ['', []],
      idUsuario: ['', []]
    })

    this.osAddForm.valueChanges.subscribe((_) => {
      this.page.actions[0].disabled = this.osAddForm.invalid
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
    let obj = {
      idMaoDeObra: event['id'],
      idOrdensServico: this.id,
      qtd: event['qtd']
    }
    console.log(obj);
    this.tableMao.items.push({ id: null, descricao: event['id'], qtd: obj.qtd, valorUnitario: 10, total: 100 })
    this.maoObraForm.reset();
  }

  public addPeca(event) {
    let obj = {
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
    // this.osGet.ddd = this.controls['ddd'].value,
    // this.osGet.telefone = this.controls['telefone'].value,
    // this.osGet.observacoes = this.controls['observacoes'].value

    // this.osService.alterOs(this.osGet).subscribe((data) => {
      
    // })

    console.log(this.osAddForm.value);
    this.notificationService.success('Salvo com sucesso');
    this.router.navigate(['ordem-servico/edit', 1]);
  }

  private findById(id: number) {
    this.loading = true;
    this.osService.findById(id)
      .subscribe((data) => {
        this.osGet = data;
        this.controls['id'].setValue(data.id);
        this.controls['entrada'].setValue(new Date(data.entrada));
        this.controls['saida'].setValue(data.saida);
        this.controls['nomeCliente'].setValue(data.nomeCliente);
        this.controls['cpfCnpj'].setValue(data.cpfCnpj);
        this.controls['ddd'].setValue(data.ddd);
        this.controls['telefone'].setValue(data.telefone);
        this.controls['observacoes'].setValue(data.observacoes);
        this.controls['idVeiculo'].setValue(data.idVeiculo.id);
        this.controls['idOsMaoDeObra'].setValue(data.idOsMaoDeObra);
        this.controls['totalMaoDeObra'].setValue(data.totalOsMaoDeObra);
        this.controls['idOsPecas'].setValue(data.idOsPecas);
        this.controls['totalPecas'].setValue(data.totalOsPecas);
        this.controls['totalServico'].setValue(data.totalServico);
        this.controls['idUsuario'].setValue(data.idUsuario.userName);
        this.controls['isFinalizado'].setValue(data.isFinalizado);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.notificationService.error('Error ao carregar OS ' + id)
        })
  }

  private listarMaoDeObra() {
    this.loading = false;
    this.maoObraService.findAll()
      .subscribe((data) => {
        data.map((item) => {
          this.selects.maoDeObra.push({ label: item.descricao, value: item.id })
        })
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log('Error carregar mão de obra: ', error.error);
          this.loading = false;
        })
  }

  private listarVeiculos() {
    this.veiculoService.findAll().subscribe((data) => {
      data.map((item) => {
        this.selects.veiculos.push({ label: `${item.marca} - ${item.modelo}`, value: item.id });
      })
    },
      (error: HttpErrorResponse) => {
        console.log('Error veiculos: ', error.error);
        this.notificationService.error('Error ao listar veiculos.')
      })
  }

}
