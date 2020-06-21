import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { OrdensServicosAdd, OrdensServicos } from 'src/app/interfaces/ordens-servicos.model';
import { VeiculoService } from 'src/app/services/veiculo/veiculo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OrdensServicosService } from 'src/app/services/ordens-servicos/ordens-servicos.service';

@Component({
  selector: 'app-ordem-servico-add',
  templateUrl: './ordem-servico-add.component.html',
  styleUrls: ['./ordem-servico-add.component.css']
})
export class OrdemServicoAddComponent implements OnInit {

  public page: PoPageDefault = {
    title: 'Nova OS',
    actions: [
      { label: 'Salvar', action: () => { this.salvar() }, disabled: true },
      { label: 'Voltar', action: () => { this.dialogVoltar() } }
    ]
  }


  public osAddForm: FormGroup;

  public selects = {
    veiculos: <Array<PoSelectOption>>[],
    maoDeObra: <Array<PoSelectOption>>[]
  }

  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialog: PoDialogService,
    private notificationService: PoNotificationService,
    private router: Router,
    private veiculoService: VeiculoService,
    private osService: OrdensServicosService
  ) { }

  ngOnInit(): void {
    this.listarVeiculos();

    this.osAddForm = this.fb.group({
      nomeCliente: ['', [Validators.required]],
      cpfCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      ddd: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]],
      telefone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      observacoes: ['', [Validators.required]],
      idVeiculo: ['', [Validators.required]],
      idUsuario: [1, []],
    })

    this.osAddForm.valueChanges
      .subscribe((_) => {
        this.page.actions[0].disabled = this.osAddForm.invalid;
      })

  }

  public get controls() {
    return this.osAddForm.controls;
  }

  private dialogVoltar() {
    this.dialog.confirm({
      confirm: () => this.router.navigate(['ordem-servico']),
      title: 'Alerta',
      message: 'Salve para não perder os dados. Deseja voltar a tela de listagem?'
    })
  }

  private salvar() {
    this.loading = true;
    let os: OrdensServicosAdd = {
      nomeCliente: this.controls['nomeCliente'].value,
      cpfCnpj: this.controls['cpfCnpj'].value,
      ddd: this.controls['ddd'].value,
      telefone: this.controls['telefone'].value,
      observacoes: this.controls['observacoes'].value,
      idVeiculo: {
        id: this.controls['idVeiculo'].value,
      },
      idUsuario: {
        id: this.controls['idUsuario'].value
      }

    }
    console.log(os, 'id usuario chumbado');

    this.osService.createOs(os)
      .subscribe((data) => {
        this.notificationService.success('Salvo com sucesso');
        this.router.navigate(['ordem-servico/edit', 1]);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.notificationService.error('Error ao salvar OS');
          console.log('Error OS: ', error.error);
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
