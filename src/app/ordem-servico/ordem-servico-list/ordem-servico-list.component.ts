import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoTableColumn, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
      { label: 'Nome Cliente', property: 'nomeCompleto' },
      { label: 'CPF / CNPJ', property: 'cpfCnpj' },
      { label: 'DDD', property: 'ddd' },
      { label: 'Telefone', property: 'telefone' },
      { label: 'Veiculo', property: 'idVeiculo' },
      { label: 'Data Saída', property: 'saida', type: 'date', format: 'dd/MM/yyyy' },
      { label: 'Observações', property: 'observacoes' },
      { label: 'Total Mão de Obra', property: 'totalMaoDeObra', type: 'currency', format: 'BRL' },
      { label: 'Total Peças', property: 'totalPecas', type: 'currency', format: 'BRL' },
      { label: 'Total Serviço', property: 'totalServico', type: 'currency', format: 'BRL' },
      { label: 'Responsável', property: 'idUsuario' },
    ],
    items: [
      {
        isFinalizado: true,
        id: 1,
        entrada: '2020-03-01',
        nomeCompleto: 'Daniel Lima',
        cpfCnpj: '12345678998',
        ddd: '11',
        telefone: '986284900',
        idVeiculo: 'Parati',
        saida: '2020-03-06',
        observacoes: 'parcelado em 20 vezes',
        totalMaoDeObra: 138.99,
        totalPecas: 250,
        totalServico: 388.99,
        idUsuario: 'Marcos'
      },
      {
        isFinalizado: false,
        id: 2,
        entrada: '2020-06-15',
        nomeCompleto: 'Alison Keuver',
        cpfCnpj: '98765432199',
        ddd: '11',
        telefone: '977519963',
        idVeiculo: 'Fox',
        saida: '',
        observacoes: '',
        totalMaoDeObra: 0,
        totalPecas: 0,
        totalServico: 0,
        idUsuario: 'Darlan'
      },
      {
        isFinalizado: true,
        id: 3,
        entrada: '2020-06-01',
        nomeCompleto: 'Cristian Coelho',
        cpfCnpj: '65412397866',
        ddd: '11',
        telefone: '956477780',
        idVeiculo: 'Celta',
        saida: '2020-06-02',
        observacoes: 'Pago a vista',
        totalMaoDeObra: 250,
        totalPecas: 500,
        totalServico: 750,
        idUsuario: 'Vanessa'
      },
    ]
  }

  constructor(
    private fb: FormBuilder,
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.osForm = this.fb.group({
      id: [[]],
      nomeCompleto: [[]],
      observacoes: [[]],
    })

  }

  public get controls() {
    return this.osForm.controls;
  }

  public buscar(form) {
    console.log(form);
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
