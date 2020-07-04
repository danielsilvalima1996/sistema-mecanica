import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoDialogService, PoNotificationService, PoTableColumn, PoTableAction, PoTagType } from '@po-ui/ng-components';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { OrdensServicosService } from 'src/app/services/ordens-servicos/ordens-servicos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MaoObraService } from 'src/app/services/mao-obra/mao-obra.service';
import { VeiculoService } from 'src/app/services/veiculo/veiculo.service';
import { OrdensServicos } from 'src/app/interfaces/ordens-servicos.model';
import { OsMaoDeObraEnvio, OsMaoDeObra } from 'src/app/interfaces/os-mao-de-obra';
import { OsMaoObraService } from 'src/app/services/os-mao-obra/os-mao-obra.service';
import { OsPecasService } from 'src/app/services/os-pecas/os-pecas.service';
import { PecasService } from 'src/app/services/pecas/pecas.service';
import { OsPecasEnvio } from 'src/app/interfaces/os-pecas';

@Component({
  selector: 'app-ordem-servico-edit',
  templateUrl: './ordem-servico-edit.component.html',
  styleUrls: ['./ordem-servico-edit.component.css']
})
export class OrdemServicoEditComponent implements OnInit {

  public page: PoPageDefault = {
    title: 'Nova OS',
    actions: []
  }

  private id: number;

  public tipoRelatorio: string = '';

  public tableMao = {
    columns: <Array<PoTableColumn>>[
      { label: 'Id', property: 'id' },
      { label: 'Descrição', property: 'descricao' },
      { label: 'Quantidade', property: 'quantidade' },
      { label: 'Valor Unitário', property: 'valorUnitario', type: 'currency', format: 'BRL' },
      { label: '', property: 'total', type: 'currency', format: 'BRL' }
    ],
    items: <Array<any>>[],
    actions: <Array<PoTableAction>>[
      { label: 'Remover', icon: 'po-icon po-icon-close', action: this.removeMaoObra.bind(this) }
    ]
  }
  public tablePeca = {
    columns: <Array<PoTableColumn>>[
      { label: 'Id', property: 'id' },
      { label: 'Descrição', property: 'descricao' },
      { label: 'Quantidade', property: 'quantidade' },
      { label: 'Valor Unitário', property: 'valorUnitario', type: 'currency', format: 'BRL' },
      { label: '', property: 'total', type: 'currency', format: 'BRL' }
    ],
    items: [],
    actions: <Array<PoTableAction>>[
      { label: 'Remover', icon: 'po-icon po-icon-close', action: this.removePecas.bind(this) }
    ]
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

  public tag = {
    color: '',
    label: 'Status',
    type: <PoTagType>'',
    value: '',
  }

  constructor(
    private fb: FormBuilder,
    private dialog: PoDialogService,
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private osService: OrdensServicosService,
    private maoObraService: MaoObraService,
    private veiculoService: VeiculoService,
    private osMaoObraService: OsMaoObraService,
    private osPecasService: OsPecasService,
    private pecasService: PecasService
  ) { }

  ngOnInit(): void {
    this.getId();
    this.listarMaoDeObra();
    this.listarPecas();
    this.listarVeiculos();
    this.findById(this.id);

    if (this.router.url.indexOf('edit') != -1) {
      this.tipoRelatorio = 'edit';
      this.page.title = `Editar OS ${this.id}`;
      this.page.actions = [
        { label: 'Atualizar', action: () => { this.alterar() }, disabled: true },
        { label: 'Voltar', action: () => this.dialogVoltar() },
        { label: 'Finalizar Serviço', action: () => { this.finalizarServico() } },
        { label: 'Cancelar Serviço', action: () => { this.cancelarServico() }, type: 'danger', separator: true }
      ]
    } else {
      this.tipoRelatorio = 'view';
      this.page.title = `Visualizar OS ${this.id}`;
      this.page.actions = [
        {
          label: 'Voltar', action: () => this.router.navigate(['ordem-servico'])
        }
      ]
      this.tableMao.actions = [];
      this.tablePeca.actions = [];
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
      placa: ['', []],
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
      quantidade: ['', [Validators.required]],
      idMaoDeObra: ['', [Validators.required]]
    })

    this.pecasForm = this.fb.group({
      quantidade: ['', [Validators.required]],
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
    this.loading = true;
    let obj: OsMaoDeObraEnvio = {
      idMaoDeObra: {
        id: event['idMaoDeObra']
      },
      quantidade: event['quantidade']
    }
    this.osMaoObraService
      .createOsMaoDeObra(obj, this.id)
      .subscribe((data) => {
        this.notificationService.success(`Mão de obra adicionada com sucesso!`);
        this.maoObraForm.reset();
        this.findById(this.id);
      },
        (error: HttpErrorResponse) => {
          //this.notificationService.error(error.message);
          this.loading = false;
        })
  }

  public addPeca(event) {
    this.loading = true;
    let obj: OsPecasEnvio = {
      idPecas: {
        id: event['idPecas']
      },
      quantidade: event['quantidade']
    }
    this.osPecasService
      .createOsPecas(obj, this.id)
      .subscribe((data) => {
        this.notificationService.success(`Peça adicionada com sucesso!`);
        this.pecasForm.reset();
        this.findById(this.id);
      },
        (error: HttpErrorResponse) => {
          //this.notificationService.error(error.message);
          this.loading = false;
        })
  }

  private dialogVoltar() {
    this.dialog.confirm({
      confirm: () => this.router.navigate(['ordem-servico']),
      title: 'Alerta',
      message: 'Salve para não perder os dados. Deseja voltar a tela de listagem?'
    })
  }

  private removeMaoObra(event) {
    this.loading = true;
    let obj = this.osGet.idOsMaoDeObra.find(item => item.id == event['id'])
    this.osMaoObraService
      .deleteOsMaoDeObra(obj, this.id)
      .subscribe((_) => {
        this.notificationService.success(`Mão de obra ${obj.idMaoDeObra.descricao} removida com sucesso!`);
        this.findById(this.id);
      },
        (error: HttpErrorResponse) => {
          //this.notificationService.error(error.message);
          this.loading = false;
        })
  }

  private removePecas(event) {
    this.loading = true;
    let obj = this.osGet.idOsPecas.find(item => item.id == event['id'])
    this.osPecasService
      .deleteOsPecas(obj, this.id)
      .subscribe((_) => {
        this.notificationService.success(`Peça ${obj.idPecas.descricao} removida com sucesso!`);
        this.findById(this.id);
      },
        (error: HttpErrorResponse) => {
          //this.notificationService.error(error.message);
          this.loading = false;
        })
  }

  private alterar() {
    this.loading = true;
    this.osGet.ddd = this.controls['ddd'].value;
    this.osGet.telefone = this.controls['telefone'].value;
    this.osGet.observacoes = this.controls['observacoes'].value;

    this.osService.alterOs(this.osGet)
      .subscribe((data) => {
        this.notificationService.success('OS ' + this.osGet.id + ' atualizada com sucesso!');
        this.findById(this.osGet.id);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log('Error ao atualizar OS ' + this.osGet.id, error.message);
          this.notificationService.success('Error ao atualizar OS ' + this.osGet.id);
          this.loading = false;
        })

  }

  private findById(id: number) {
    this.loading = true;
    this.osService.findById(id)
      .subscribe((data) => {
        if (data.isFinalizado != 0 && this.tipoRelatorio == 'edit') {
          this.notificationService.error(`Não é possível editar uma OS ${data.isFinalizado == 1 ? 'em andamento' : 'cancelada'}`);
          this.router.navigate(['ordem-servico/view', data.id]);
        } else {
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
          this.controls['placa'].setValue(data.placa);
          this.controls['idOsMaoDeObra'].setValue(data.idOsMaoDeObra);
          this.controls['totalMaoDeObra'].setValue(data.totalOsMaoDeObra);
          this.controls['idOsPecas'].setValue(data.idOsPecas);
          this.controls['totalPecas'].setValue(data.totalOsPecas);
          this.controls['totalServico'].setValue(data.totalServico);
          this.controls['idUsuario'].setValue(data.idUsuario.userName ? data.idUsuario.userName : '');
          this.controls['isFinalizado'].setValue(data.isFinalizado);

          if (data.isFinalizado == 0) {
            this.tag.color = 'color-08';
            this.tag.type = PoTagType.Warning;
            this.tag.value = 'Em Andamento';
          } else if (data.isFinalizado == 1) {
            this.tag.color = 'color-11';
            this.tag.type = PoTagType.Success;
            this.tag.value = 'Finalizado';
          } else {
            this.tag.color = 'color-07';
            this.tag.type = PoTagType.Danger;
            this.tag.value = 'Cancelado';
          }

          this.tableMao.items = data.idOsMaoDeObra.map((item) => {
            return {
              id: item.id,
              descricao: item.idMaoDeObra.descricao,
              quantidade: item.quantidade,
              valorUnitario: item.valorUnitario,
              total: item.total
            }
          });

          this.tablePeca.items = data.idOsPecas.map((item) => {
            return {
              id: item.id,
              descricao: item.idPecas.descricao,
              quantidade: item.quantidade,
              valorUnitario: item.valorUnitario,
              total: item.total,
            }

          })
        }
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log('Error ao carregar: ', error.message);
          //this.notificationService.error('Error ao carregar OS ' + id);
          this.loading = false;
          this.router.navigate(['ordem-servico']);
        })
  }

  private listarMaoDeObra() {
    this.loading = false;
    this.maoObraService
      .findAllByActive(true)
      .subscribe((data) => {
        data.map((item) => {
          this.selects.maoDeObra.push({ label: `${item.descricao} - R$ ${item.valorUnitario}`, value: item.id })
        })
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log('Error carregar mão de obra: ', error.message);
          this.loading = false;
        })
  }

  private listarPecas() {
    this.loading = false;
    this.pecasService.findAllByActive()
      .subscribe((data) => {
        data.map((item) => {
          this.selects.pecas.push({ label: `${item.marca} - ${item.descricao} - R$ ${item.valorUnitario}`, value: item.id })
        })
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log('Error carregar peças: ', error.message);
          this.loading = false;
        })
  }

  private listarVeiculos() {
    this.loading = true;
    this.veiculoService.findByActive()
      .subscribe((data) => {
        data.map((item) => {
          this.selects.veiculos.push({ label: `${item.marca} - ${item.modelo}`, value: item.id });
        });
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log('Error veiculos: ', error.message);
          //this.notificationService.error('Error ao listar veiculos.');
          this.loading = false;
        })
  }

  private finalizarServico() {
    this.loading = true;
    this.osService.finalizarOs(this.osGet.id)
      .subscribe((data) => {
        this.notificationService.success('OS ' + this.osGet.id + ' finalizada com sucesso!');
        this.router.navigate(['/ordem-servico/view', data.id]);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log('Error ao carregar: ', error.message);
          //this.notificationService.error('Error ao carregar OS ' + this.osGet.id);
          this.loading = false;
        })
  }

  private cancelarServico() {
    this.loading = true;
    this.osService.cancelarOs(this.osGet.id)
      .subscribe((data) => {
        this.notificationService.success('OS ' + this.osGet.id + ' cancelada com sucesso!');
        this.router.navigate(['/ordem-servico/view', data.id]);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log('Error ao carregar: ', error.message);
          //this.notificationService.error('Error ao carregar OS ' + this.osGet.id);
          this.loading = false;
        })
  }

}
