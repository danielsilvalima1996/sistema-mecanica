import { Component, OnInit } from '@angular/core';
import { PoPageDefault } from '@po-ui/ng-components';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ordem-servico-list',
  templateUrl: './ordem-servico-list.component.html',
  styleUrls: ['./ordem-servico-list.component.css']
})
export class OrdemServicoListComponent implements OnInit {

  public page: PoPageDefault = {
    title: 'Ordens de Serviço',
    actions: [
      { label: 'Adicionar', action: () => { } },
      { label: 'Visualizar', action: () => { } },
      { label: 'Editar', action: () => { } },
    ]
  }

  public osForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
