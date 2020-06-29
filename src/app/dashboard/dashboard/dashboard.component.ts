import { Component, OnInit } from '@angular/core';
import { DadosDashboard } from 'src/app/interfaces/dados-dashboard.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public dados: DadosDashboard;
  public loading: boolean;

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
        this.dados = data;
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.notificationService.error('Error ao carregar dados.')
        })
  }

}
