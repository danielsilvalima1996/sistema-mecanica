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

  public findById(id: any): Observable<Veiculo> {
    return this.http.get(`${this.relativeLink}/buscar-veiculo/${id}`) as Observable<Veiculo>;
  }

  public createVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post(`${this.relativeLink}/cadastrar-veiculo`, veiculo) as Observable<Veiculo>;
  }

  public alterVeiculo(id: number, veiculo: any): Observable<Veiculo> {
    return this.http.put(`${this.relativeLink}/atualizar-veiculo/${id}`, veiculo) as Observable<Veiculo>;
  }

  public buscaFiltro(parameters?:any){
    return this.http.get(`${this.relativeLink}/buscar-por-filtros?${parameters}`) as Observable<Array<Veiculo>>;
  }


}

