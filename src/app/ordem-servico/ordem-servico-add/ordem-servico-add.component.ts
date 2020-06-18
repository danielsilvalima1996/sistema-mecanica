import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ordem-servico-add',
  templateUrl: './ordem-servico-add.component.html',
  styleUrls: ['./ordem-servico-add.component.css']
})
export class OrdemServicoAddComponent implements OnInit {

  public page: PoPageDefault = {
    title: 'Nova OS',
    actions: [
      { label: 'Salvar', action: () => { this.salvar() } },
      { label: 'Voltar', action: () => { this.dialogVoltar() } }
    ]
  }


  public osAddForm: FormGroup;

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
    ]
  }

  constructor(
    private fb: FormBuilder,
    private dialog: PoDialogService,
    private notificationService: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.osAddForm = this.fb.group({
      nomeCliente: ['', [Validators.required]],
      cpfCnpj: ['', [Validators.required]],
      ddd: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      observacoes: ['', [Validators.required]],
      idVeiculo: ['', [Validators.required]],
      idUsuario: ['', [Validators.required]],
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
    console.log(this.osAddForm.value);
    this.notificationService.success('Salvo com sucesso');
    this.router.navigate(['ordem-servico/edit', 1]);
  }

}
