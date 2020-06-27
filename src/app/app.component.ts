import { Component } from '@angular/core';

import { PoMenuItem, PoDialogService, PoNotificationService, PoToolbarProfile, PoToolbarAction } from '@po-ui/ng-components';
import { LoginService } from './services/authentication/login/login.service';
import { Router } from '@angular/router';
import { Users } from './interfaces/users.model';
const { cpf } = require('cpf-cnpj-validator');
const { cnpj } = require('cpf-cnpj-validator');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  logged: boolean = false;
  profile: PoToolbarProfile;

  profileActions: Array<PoToolbarAction> = [
    {
      label: 'Sair',
      icon: 'po-icon po-icon-exit',
      separator: true,
      type: 'danger',
      action: () => this.confirmeLogout()
    }
  ]

  menus: Array<PoMenuItem> = [
    {
      label: 'Cadastros', icon: 'po-icon po-icon-edit', shortLabel: 'Cadastros', subItems: [
        { label: 'Mão de Obra', icon: 'po-icon po-icon-menu', shortLabel: '', link: '/cadastro/mao-obra' },
        { label: 'Peças', icon: 'po-icon po-icon-menu', shortLabel: '', link: '/cadastro/pecas' },
        { label: 'Usuários', icon: 'po-icon po-icon-menu', shortLabel: '', link: '/cadastro/usuarios' },
        { label: 'Veículos', icon: 'po-icon po-icon-menu', shortLabel: '', link: '/cadastro/veiculos' }
      ]
    },
    { label: 'Ordem Serviço', icon: 'po-icon po-icon-truck', shortLabel: 'OS', link: '/ordem-servico' }
  ];

  constructor(
    private loginService: LoginService,
    private dialogService: PoDialogService,
    private router: Router,
    private notificationService: PoNotificationService,
  ) { }

  ngOnInit() {
    this.loginService.getIsLogged$
      .subscribe((data) => {
        if (data) {
          this.getProfile();
          this.logged = data;
        } else {
          this.logged = data;
          this.router.navigate(['']);
        }
      })

      /* Exemplo Validador  https://github.com/carvalhoviniciusluiz/cpf-cnpj-validator */

      let testeCpf = '44961407801'

      let e = cpf.isValid(testeCpf);
      console.log("CPF",e);
  
  
      let testeCnpj = '17534128000138'
  
      let f = cnpj.isValid(testeCnpj);
      console.log("CNPJ",f);
      
  }

  getProfile() {
    let user: Users;
    this.loginService.getUserInformation$.
      subscribe((data) => {
        let profile = {
          title: data.username,
          subtitle: data.email,
          avatar: data.avatar
        }
        this.profile = profile;
      })
  }


  confirmeLogout() {
    this.dialogService.confirm({
      title: 'Sair',
      message: 'Deseja realmente sair?',
      confirm: () => { this.loginService.logout(); },
      cancel: () => { }
    });
  }


}
