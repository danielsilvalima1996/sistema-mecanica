import { Injectable } from '@angular/core';
import { OsPecas, OsPecasEnvio } from 'src/app/interfaces/os-pecas';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OsPecasService {

  private relativeLink = 'os-pecas';

  constructor(private http: HttpClient) { }

  public createOsPecas(peca: OsPecasEnvio, id: number): Observable<OsPecas> {
    return this.http.post(`${environment.api}/${this.relativeLink}/${id}`, peca) as Observable<OsPecas>;
  }

  public deleteOsPecas(peca: OsPecas, id: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: peca
    }
    return this.http.delete(`${environment.api}/${this.relativeLink}/${id}`, options);
  }
}
