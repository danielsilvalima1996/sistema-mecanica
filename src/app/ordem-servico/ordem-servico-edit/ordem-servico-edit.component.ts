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
      { label: 'Atualizar', action: () => { this.alterar() }, disabled: true },
      { label: 'Finalizar Serviço', action: () => { this.finalizarServico() }, type: 'danger' },
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
    pecas: <Array<PoSelectOption>>[],
    tipoPessoa: <Array<PoSelectOption>>[
      { label: 'CNPJ', value: 'j' },
      { label: 'CPF', value: 'f' }
    ]
  }

  public loading: boolean = true;

  private osGet: OrdensServicos;

  public mask: string = '999.999.999-99';

  public labelPessoa: string = 'CPF';

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
      // this.page.actions[0].disabled = true;
      this.page.actions[1].disabled = true;
    }

    this.osAddForm = this.fb.group({
      id: ['', []],
      entrada: ['', []],
      saida: ['', []],
      nomeCliente: ['', []],
      cpfCnpj: ['', []],
      ddd: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]],
      telefone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      observacoes: ['', []],
      idVeiculo: ['', []],
      idOsMaoDeObra: ['', []],
      totalMaoDeObra: ['', []],
      idOsPecas: ['', []],
      totalPecas: ['', []],
      totalServico: ['', []],
      idUsuario: ['', []],
      isFinalizado: [],
      tipoPessoa: ['f', [Validators.required]]
    })

    this.osAddForm.valueChanges.subscribe((_) => {
      if (this.tipoRelatorio != 'view') {
        this.page.actions[0].disabled = this.osAddForm.invalid
      }
    })

    this.controls['tipoPessoa'].valueChanges
      .subscribe((data: string) => {
        if (data == 'j') {
          this.mask = '99.999.999/9999-99';
          this.labelPessoa = 'CNPJ';
        } else {
          this.labelPessoa = 'CPF';
          this.mask = '999.999.999-99';
        }
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

  private alterar() {
    this.loading = true;
    this.osGet.ddd = this.controls['ddd'].value,
      this.osGet.telefone = this.controls['telefone'].value,
      this.osGet.observacoes = this.controls['observacoes'].value

    this.osService.alterOs(this.osGet)
      .subscribe((data) => {
        this.notificationService.success('OS ' + this.osGet.id + ' atualizada com sucesso!');
        this.findById(this.osGet.id);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log('Error ao atualizar OS ' + this.osGet.id, error.error);
          this.notificationService.success('Error ao atualizar OS ' + this.osGet.id);
          this.loading = false;
        })

  }

  private findById(id: number) {
    this.loading = true;
    this.osService.findById(id)
      .subscribe((data) => {
        this.osGet = data;
        this.controls['id'].setValue(data.id);
        this.controls['entrada'].setValue(new Date(data.entrada));
        this.controls['saida'].setValue(new Date(data.saida));
        this.controls['nomeCliente'].setValue(data.nomeCliente);
        this.controls['cpfCnpj'].setValue(data.cpfCnpj);
        this.controls['ddd'].setValue(data.ddd);
        this.controls['telefone'].setValue(data.telefone);
        this.controls['observacoes'].setValue(data.observacoes);
        this.controls['idVeiculo'].setValue(data.idVeiculo.id ? data.idVeiculo.id : null);
        this.controls['idOsMaoDeObra'].setValue(data.idOsMaoDeObra);
        this.controls['totalMaoDeObra'].setValue(data.totalOsMaoDeObra);
        this.controls['idOsPecas'].setValue(data.idOsPecas);
        this.controls['totalPecas'].setValue(data.totalOsPecas);
        this.controls['totalServico'].setValue(data.totalServico);
        this.controls['idUsuario'].setValue(data.idUsuario.userName ? data.idUsuario.userName : '');
        this.controls['isFinalizado'].setValue(data.isFinalizado);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log('Error ao carregar: ', error.error);
          this.notificationService.error('Error ao carregar OS ' + id);
          this.loading = false;
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
    this.loading = true;
    this.veiculoService.findAll()
      .subscribe((data) => {
        data.map((item) => {
          this.selects.veiculos.push({ label: `${item.marca} - ${item.modelo}`, value: item.id });
        });
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log('Error veiculos: ', error.error);
          this.notificationService.error('Error ao listar veiculos.');
          this.loading = false;
        })
  }

  private finalizarServico() {
    this.loading = true;
    this.osGet.isFinalizado = true;
    this.osService.alterOs(this.osGet)
      .subscribe((data) => {
        this.notificationService.success('OS ' + this.osGet.id + ' atualizada com sucesso!');
        this.router.navigate(['/ordem-servico/view', data.id]);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log('Error ao carregar: ', error.error);
          this.notificationService.error('Error ao carregar OS ' + this.osGet.id);
          this.loading = false;
        })
  }

}
