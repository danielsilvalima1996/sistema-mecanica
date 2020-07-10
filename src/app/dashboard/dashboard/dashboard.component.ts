import { Component, OnInit } from '@angular/core';
import { DadosDashboard } from 'src/app/interfaces/dados-dashboard.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PoNotificationService, PoPageDefault } from '@po-ui/ng-components';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public page: PoPageDefault = {
    actions: [
      {
        label: 'Exibir Valores', action: () => {
          this.ocultarValue = !this.ocultarValue;
          if (this.ocultarValue == true) {
            this.page.actions[0].label = 'Ocultar Valores';
          } else {
            this.page.actions[0].label = 'Exibir Valores';
          }
        }
      }
    ]
  }


  public dados: DadosDashboard;
  public loading: boolean;
  public ocultarValue: boolean = false

  constructor(
    private dashboardService: DashboardService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.dadosDashboard();
  }

  private dadosDashboard() {
    this.loading = true;
    this.dashboardService
      .dadosDashboard()
      .subscribe((data) => {
        Object.keys(data).map((item) => {
          console.log(data, item);
          if (data[item] == null) {
            data[item] = 0;
          }
        })
        this.dados = data
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          //this.notificationService.error('Error ao carregar dados.')
        })
  }

}
