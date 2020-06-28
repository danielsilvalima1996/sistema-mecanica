import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdensServicosService } from 'src/app/services/ordens-servicos/ordens-servicos.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { UtilService } from 'src/app/services/utils/util.service';
import { VeiculoService } from 'src/app/services/veiculo/veiculo.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-ordem-servico-list',
  templateUrl: './ordem-servico-list.component.html',
  styleUrls: ['./ordem-servico-list.component.css']
})
export class OrdemServicoListComponent implements OnInit {

  public page: PoPageDefault = {
    title: 'Ordens de Serviço',
    actions: [
      { label: 'Adicionar', action: () => { this.router.navigate(['add'], { relativeTo: this.route }) } },
      {
        label: 'Editar', action: () => {
          if (this.isSelected()) {
            if (this.osSelected['isFinalizado'] != 0) {
              this.notificationService.information(`OS ${this.osSelected['id']} ${this.osSelected['isFinalizado'] == 1 ? 'finalizada' : 'cancelada'}, não pode ser editada!`);
            } else {
              this.router.navigate(['edit', this.osSelected['id']], { relativeTo: this.route })
            }
          }
        }
      },
      {
        label: 'Visualizar', action: () => {
          if (this.isSelected()) {
            this.router.navigate(['view', this.osSelected['id']], { relativeTo: this.route })
          }
        }
      },
    ]
  }

  public osForm: FormGroup;

  private osSelected = {};

  public table = {
    columns: <Array<PoTableColumn>>[
      { label: 'OS', property: 'id' },
      {
        label: 'Status', property: 'isFinalizado', type: 'label', labels: [
          { value: 0, color: 'color-08', label: 'Andamento', tooltip: 'Serviço em Andamento' },
          { value: 1, color: 'color-11', label: 'Finalizado', tooltip: 'Serviço Finalizado' },
          { value: 2, color: 'color-07', label: 'Cancelado', tooltip: 'Serviço Cancelado' }
        ]
      },
      { label: 'Data Entrada', property: 'entrada', type: 'date', format: 'dd/MM/yyyy' },
      { label: 'Nome Cliente', property: 'nomeCliente' },
      { label: 'CPF / CNPJ', property: 'cpfCnpj' },
      { label: 'DDD', property: 'ddd' },
      { label: 'Telefone', property: 'telefone' },
      { label: 'Veiculo', property: 'idVeiculo' },
      { label: 'Placa', property: 'placa' },
      { label: 'Data Saída', property: 'saida', type: 'date', format: 'dd/MM/yyyy' },
      { label: 'Observações', property: 'observacoes' },
      { label: 'Total Mão de Obra', property: 'totalOsMaoDeObra', type: 'currency', format: 'BRL' },
      { label: 'Total Peças', property: 'totalOsPecas', type: 'currency', format: 'BRL' },
      { label: 'Total Serviço', property: 'totalServico', type: 'currency', format: 'BRL' },
      { label: 'Responsável', property: 'idUsuario' },
    ],
    items: []
  }

  public loading: boolean;

  public selects = {
    veiculos: <Array<PoSelectOption>>[
      {label: 'Todos', value: ''}
    ],
    usuarios: <Array<PoSelectOption>>[
      {label: 'Todos', value: ''}
    ],
    status: <Array<PoSelectOption>>[
      { label: 'Em Andamento', value: 0 },
      { label: 'Finalizado', value: 1 },
      { label: 'Cancelado', value: 2 },
      { label: 'Todos', value: '' },
    ]
  }

  constructor(
    private fb: FormBuilder,
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private osService: OrdensServicosService,
    private utilService: UtilService,
    private veiculoService: VeiculoService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.osForm = this.fb.group({
      id: ['', []],
      nomeCliente: ['', []],
      cpfCnpj: ['', []],
      observacoes: ['', []],
      idVeiculo: ['', []],
      placa: ['', []],
      idUsuario: ['', []],
      isFinalizado: ['', []]
    })

    this.listarUsuarios();
    this.listarVeiculos();

    this.buscar(this.osForm.value);

  }

  public get controls() {
    return this.osForm.controls;
  }

  public buscar(form?) {
    this.loading = true;
    this.osService
      .findAll(this.utilService.getParameters(form))
      .subscribe((data) => {
        this.table.items = data.map((item) => {
          return {
            id: item.id,
            isFinalizado: item.isFinalizado,
            entrada: item.entrada,
            nomeCliente: item.nomeCliente,
            cpfCnpj: item.cpfCnpj,
            ddd: item.ddd,
            telefone: item.telefone,
            idVeiculo: `${item.idVeiculo.marca} - ${item.idVeiculo.modelo}`,
            placa: item.placa,
            saida: item.saida,
            observacoes: item.observacoes,
            totalOsMaoDeObra: item.totalOsMaoDeObra,
            totalOsPecas: item.totalOsPecas,
            totalServico: item.totalServico,
            idUsuario: item.idUsuario.userName
          }
        });
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.loading = false;
          this.notificationService.error('Error ao obter dados');
        })
  }

  public selected(event) {
    this.osSelected = event;
  }

  public unSelected(event) {
    this.osSelected = {};
  }

  private isSelected() {
    if (Object.keys(this.osSelected).length <= 0) {
      this.notificationService.warning('Selecione uma OS!');
      return false;
    }
    return true;
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
          this.notificationService.error('Error ao listar veiculos.');
          this.loading = false;
        })
  }

  private listarUsuarios() {
    this.loading = true;
    this.usuariosService.findByActive(true)
      .subscribe((data) => {
        data.map((item) => {
          this.selects.usuarios.push({ label: item.userName, value: item.id });
        });
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          console.log('Error usuarios: ', error.message);
          this.notificationService.error('Error ao listar usuários.');
          this.loading = false;
        })
  }

}
