import { Component, OnInit } from '@angular/core';
import { PoPageDefault, PoSelectOption, PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { OrdensServicosAdd, OrdensServicos } from 'src/app/interfaces/ordens-servicos.model';
import { VeiculoService } from 'src/app/services/veiculo/veiculo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OrdensServicosService } from 'src/app/services/ordens-servicos/ordens-servicos.service';
import { LoginService } from 'src/app/services/authentication/login/login.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

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
    maoDeObra: <Array<PoSelectOption>>[],
    tipoPessoa: <Array<PoSelectOption>>[
      { label: 'CNPJ', value: 'j' },
      { label: 'CPF', value: 'f' }
    ],
    usuarios: <Array<PoSelectOption>>[]
  }

  public mask: string = '999.999.999-99';

  public loading: boolean = false;

  public labelPessoa: string = 'CPF';

  constructor(
    private fb: FormBuilder,
    private dialog: PoDialogService,
    private notificationService: PoNotificationService,
    private router: Router,
    private veiculoService: VeiculoService,
    private osService: OrdensServicosService,
    private loginService: LoginService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.listarVeiculos();
    this.listarUsuarios();

    this.osAddForm = this.fb.group({
      nomeCliente: ['', [Validators.required]],
      cpfCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      ddd: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]],
      telefone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      observacoes: ['', []],
      idVeiculo: ['', [Validators.required]],
      idUsuario: ['', []],
      tipoPessoa: ['f', [Validators.required]],
      placa: ['', Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern("^[A-Za-z0-9]*\\d+[A-Za-z0-9]*$")]
    })

    this.loginService.getUserInformation$.subscribe((data) => {
      this.controls['idUsuario'].setValue(data.id);
    })

    this.osAddForm.valueChanges
      .subscribe((_) => {
        this.page.actions[0].disabled = this.osAddForm.invalid;
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
      },
      placa: this.controls['placa'].value
    }

    this.osService.createOs(os)
      .subscribe((data) => {
        this.notificationService.success('Salvo com sucesso');
        this.router.navigate(['ordem-servico/edit', data.id]);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.notificationService.error('Error ao salvar OS');
          console.log('Error OS: ', error.message);
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

  private listarUsuarios() {
    this.usuariosService.findByActive(true).subscribe((data) => {
      data.map((item) => {
        this.selects.usuarios.push({ label: item.userName, value: item.id });
      })
    },
      (error: HttpErrorResponse) => {
        console.log('Error veiculos: ', error.error);
        this.notificationService.error('Error ao listar usuários.')
      })
  }

}
