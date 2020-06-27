import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdensServicosService } from 'src/app/services/ordens-servicos/ordens-servicos.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

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
            if (this.osSelected['isFinalizado']) {
              this.notificationService.information(`OS ${this.osSelected['id']} fechada, não pode ser editada!`);
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
          { value: true, color: 'color-11', label: 'Finalizado', tooltip: 'Serviço Finalizado' },
          { value: false, color: 'color-08', label: 'Andamento', tooltip: 'Serviço em Andamento' }
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

  constructor(
    private fb: FormBuilder,
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private osService: OrdensServicosService
  ) { }

  ngOnInit(): void {
    this.osForm = this.fb.group({
      id: [[]],
      nomeCompleto: [[]],
      observacoes: [[]],
    })

    this.buscar();

  }

  public get controls() {
    return this.osForm.controls;
  }

  public buscar(form?) {
    this.loading = true;
    this.osService
      .findAll().subscribe((data) => {
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

}
