import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaoDeObra } from 'src/app/interfaces/mao-de-obra';

@Injectable({
  providedIn: 'root'
})
export class MaoObraService {

  private relativeLink: string = `${environment.api}/mao-obra`;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Array<MaoDeObra>> {
    return this.http.get(`${this.relativeLink}/all`) as Observable<Array<MaoDeObra>>;
  }

  public findById(id: any): Observable<MaoDeObra> {
    return this.http.get(`${this.relativeLink}/${id}`) as Observable<MaoDeObra>;
  }

  public createMaoDeObra(maoObra: MaoDeObra): Observable<MaoDeObra> {
    return this.http.post(`${this.relativeLink}/cadastrar`, maoObra) as Observable<MaoDeObra>;
  }

  public alterMaoDeObra(maoObra: MaoDeObra): Observable<MaoDeObra> {
    return this.http.put(`${this.relativeLink}/atualizar`, maoObra) as Observable<MaoDeObra>;
  }

  public filterByDescricao(descricao: any) {
    return this.http.get(`${this.relativeLink}/descricao?descricao=${descricao}`)
  }

  public buscaFiltro(parameters?: any): Observable<Array<MaoDeObra>> {
    return this.http.get(`${this.relativeLink}/busca?${parameters}`) as Observable<Array<MaoDeObra>>;
  }

  public findAllByActive(active: boolean): Observable<Array<MaoDeObra>> {
    return this.http.get(`${this.relativeLink}/active?active=${active}`) as Observable<Array<MaoDeObra>>;
  }

}
