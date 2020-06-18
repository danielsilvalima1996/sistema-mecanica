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
        { label: 'Peças', icon: 'po-icon po-icon-menu', shortLabel: '', link: '/cadastro/pecas' }
      ]
    },
    { label: 'Ordem Serviço', icon: 'po-icon po-icon-truck', shortLabel: 'OS', link: '/ordem-servico' }
  ];

}
