import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user-login';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = 'http://localhost:9090';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }



  public login(user: UserLogin): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/users/login`,user, this.httpOptions) ;
  }

  public signout(user: UserLogin): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/users/login`,user, this.httpOptions) ;
  }

  public deleteUser(id: number, token: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    }
    return this.http.delete<any>(`${this.apiServerUrl}/users/deleteById/`+ id, options) ;
  }

  public addUser(user: any, token: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    }
    return this.http.post<any>(`${this.apiServerUrl}/users/`, user, options) ;
  }

  public modifyUser(user: any, token: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    }
    return this.http.post<any>(`${this.apiServerUrl}/users/`, user, options) ;
  }

  public getAllUsers(token: any): Observable<any> { // need to post the access token to the backend to get the rights to access the database;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    }
    return this.http.get<any>(`${this.apiServerUrl}/users/all`, options);
  }


  public getUserById(id: string | null, token: any): Observable<any> { // need to post the access token to the backend to get the rights to access the database;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    }
    return this.http.get<any>(`${this.apiServerUrl}/users/getById/` + id, options);
  }



}
