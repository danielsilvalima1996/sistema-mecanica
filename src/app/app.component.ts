import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
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

}
