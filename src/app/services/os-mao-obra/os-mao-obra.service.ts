import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { OsMaoDeObraEnvio, OsMaoDeObra } from 'src/app/interfaces/os-mao-de-obra';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OsMaoObraService {

  private relativeLink = 'os-mao-obra';

  constructor(private http: HttpClient) { }

  public createOsMaoDeObra(mao: OsMaoDeObraEnvio, id: number): Observable<OsMaoDeObra> {
    return this.http.post(`${environment.api}/${this.relativeLink}/${id}`, mao) as Observable<OsMaoDeObra>;
  }

  public deleteOsMaoDeObra(mao: OsMaoDeObra, id: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: mao
    }
    return this.http.delete(`${environment.api}/${this.relativeLink}/${id}`, options);
  }
}
