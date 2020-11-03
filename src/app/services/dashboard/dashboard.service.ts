import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DadosDashboard } from 'src/app/interfaces/dados-dashboard.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private relativeLink = 'dados-dashboard';

  constructor(private http: HttpClient) { }

  public dadosDashboard(): Observable<DadosDashboard> {
    return this.http.get(`${environment.api}/${this.relativeLink}`) as Observable<DadosDashboard>;
  }
}
