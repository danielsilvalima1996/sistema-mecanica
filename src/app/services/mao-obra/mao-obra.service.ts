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
    return this.http.get(`${this.relativeLink}?id=${id}`) as Observable<MaoDeObra>;
  }

  public createMaoDeObra(maoObra: MaoDeObra): Observable<MaoDeObra> {
    return this.http.post(`${this.relativeLink}/cadastrar`, maoObra) as Observable<MaoDeObra>;
  }

  public alterMaoDeObra(maoObra: MaoDeObra): Observable<MaoDeObra> {
    return this.http.put(`${this.relativeLink}/atualizar`, maoObra) as Observable<MaoDeObra>;
  }

}
