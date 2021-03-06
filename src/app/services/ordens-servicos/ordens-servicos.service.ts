import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OrdensServicos, OrdensServicosAdd } from 'src/app/interfaces/ordens-servicos.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdensServicosService {

  private relativeLink: string = `${environment.api}/ordens-servicos`;

  constructor(private http: HttpClient) { }

  public findAll(parameters: any): Observable<Array<OrdensServicos>> {
    return this.http.get(`${this.relativeLink}/all?${parameters}`) as Observable<Array<OrdensServicos>>;
  }

  public findById(id: number): Observable<OrdensServicos> {
    return this.http.get(`${this.relativeLink}/${id}`) as Observable<OrdensServicos>;
  }

  public createOs(os: OrdensServicosAdd): Observable<OrdensServicos> {
    return this.http.post(`${this.relativeLink}`, os) as Observable<OrdensServicos>;
  }

  public alterOs(os: OrdensServicos): Observable<OrdensServicos> {
    return this.http.put(`${this.relativeLink}`, os) as Observable<OrdensServicos>;
  }

  public finalizarOs(id: number): Observable<OrdensServicos> {
    return this.http.put(`${this.relativeLink}/finalizar/${id}`, null) as Observable<OrdensServicos>;
  }

  public cancelarOs(id: number): Observable<OrdensServicos> {
    return this.http.put(`${this.relativeLink}/cancelar/${id}`, null) as Observable<OrdensServicos>;
  }
}
