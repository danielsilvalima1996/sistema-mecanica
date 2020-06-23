import { Component } from '@angular/core';

import { PoMenuItem, PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { LoginService } from './services/authentication/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  logged: boolean = false;

  menus: Array<PoMenuItem> = [
    {
      label: 'Cadastros', icon: 'po-icon po-icon-edit', shortLabel: 'Cadastros', subItems: [
        { label: 'Mão de Obra', icon: 'po-icon po-icon-menu', shortLabel: '', link: '/cadastro/mao-obra' },
        { label: 'Peças', icon: 'po-icon po-icon-menu', shortLabel: '', link: '/cadastro/pecas' },
        { label: 'Usuários', icon: 'po-icon po-icon-menu', shortLabel: '', link: '/cadastro/usuarios' },
        { label: 'Veículos', icon: 'po-icon po-icon-menu', shortLabel: '', link: '/cadastro/veiculos' }
      ]
    },
    { label: 'Ordem Serviço', icon: 'po-icon po-icon-truck', shortLabel: 'OS', link: '/ordem-servico' },
    { label: 'Logout', icon: 'po-icon po-icon-exit', shortLabel: 'Sair', link:'/logout' }
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
          console.log(data);

          //this.getProfile();
          this.logged = data;

          this.menus = [
            {
              label: 'Cadastros', icon: 'po-icon po-icon-edit', shortLabel: 'Cadastros', subItems: [
                { label: 'Mão de Obra', icon: 'po-icon po-icon-menu', shortLabel: '', link: '/cadastro/mao-obra' },
                { label: 'Peças', icon: 'po-icon po-icon-menu', shortLabel: '', link: '/cadastro/pecas' },
                { label: 'Usuários', icon: 'po-icon po-icon-menu', shortLabel: '', link: '/cadastro/usuarios' },
                { label: 'Veículos', icon: 'po-icon po-icon-menu', shortLabel: '', link: '/cadastro/veiculos' }
              ]
            },
            { label: 'Ordem Serviço', icon: 'po-icon po-icon-truck', shortLabel: 'OS', link: '/ordem-servico' },
            { label: 'Logout', icon: 'po-icon po-icon-exit', shortLabel: 'Sair', action:()=>{this.confirmeLogout()}},
          ];
        } else {
          this.logged = data;
          this.router.navigate(['']);
        }
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
