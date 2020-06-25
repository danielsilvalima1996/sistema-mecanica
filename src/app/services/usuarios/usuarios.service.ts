import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Users } from 'src/app/interfaces/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private relativeLink: string = `${environment.api}/users`;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Array<Users>> {
    return this.http.get(`${this.relativeLink}/all`) as Observable<Array<Users>>;
  }

  public findById(id: any): Observable<Users> {
    return this.http.get(`${this.relativeLink}/${id}`) as Observable<Users>;
  }

  public createUser(users: Users): Observable<Users> {
    return this.http.post(`${this.relativeLink}`, users) as Observable<Users>;
  }

  public alterUser(users: Users): Observable<Users> {
    return this.http.put(`${this.relativeLink}`, users) as Observable<Users>;
  }

}
