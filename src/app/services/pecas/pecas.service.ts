import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pecas } from 'src/app/interfaces/pecas';

@Injectable({
  providedIn: 'root'
})
export class PecasService {

  private relativeLink: string = `${environment.api}/peca`;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Array<Pecas>> {
    return this.http.get(`${this.relativeLink}/listar-pecas`) as Observable<Array<Pecas>>;
  }

  public findById(id: any): Observable<Pecas> {
    return this.http.get(`${this.relativeLink}/buscar-peca/${id}`) as Observable<Pecas>;
  }

  public createPecas(pecas: Pecas): Observable<Pecas> {
    return this.http.post(`${this.relativeLink}/cadastrar-peca`, pecas) as Observable<Pecas>;
  }

  public alterPecas(id: number, maoObra: any): Observable<Pecas> {
    return this.http.put(`${this.relativeLink}/atualizar-peca/${id}`, maoObra) as Observable<Pecas>;
  }

  public buscaFiltro(parameters?:any){
    return this.http.get(`${this.relativeLink}/buscar-peca-por-filtros?${parameters}`) as Observable<Array<Pecas>>;
  }

  public findAllByActive(): Observable<Array<Pecas>> {
    return this.http.get(`${this.relativeLink}/listar-pecas-ativas`) as Observable<Array<Pecas>>;
  }

}
