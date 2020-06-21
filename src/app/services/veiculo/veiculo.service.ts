import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from 'src/app/interfaces/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private relativeLink = `${environment.api}/veiculo`;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Array<Veiculo>> {
    return this.http.get(`${this.relativeLink}/listar-veiculos`) as Observable<Array<Veiculo>>;
  }
}
