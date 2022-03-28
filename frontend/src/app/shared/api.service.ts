import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Users } from '../model/Users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  @ViewChild(NavbarComponent) NavbarComponent: NavbarComponent | undefined
  private apiUrl = environment.API_URL;
  private token: any;
  public host = environment.host;
  isLoggedin: any;
  constructor(private http: HttpClient,
    private router: Router,
  ) { }
  getTransferIp() {
    return new HttpHeaders().set(
      "Authorization", `Bearer ${this.token}`
    );
  }
  public getApi(url: string, params: any) {
    return this.http.get(url, params);
  }

  public postApi(url: string, params: any) {
    url = this.apiUrl + url;
    return this.http.post(url, params)
  }
  public getDecodedAccessToken(): any {
    try {
      return jwt_decode(this.token);
    } catch (Error) {
      return null;
    }
  }
  public isLoggedIn() {
    if (localStorage.getItem('userToken')) {
      this.router.navigate(['/welcome']);
      NavbarComponent.ngOnInit()
    } else {
      this.router.navigate(['/home']);
    }
  }

  public getApiCall(url: string, params: any): Observable<any> {
    return this.http.get(url, { headers: this.getTransferIp() });
  }
  public getUserFromLocalCache(): Users {
    const user: any = localStorage.getItem('user');
    return JSON.parse(user);
  }
  public getToken() {
    this.token = localStorage.getItem('userToken');
    return this.token;
  }
  public userData(params: any) {
    return this.http.get(`${environment.host}url`, params);
  }
  public updateUser(person: Users): Observable<any> {
    const body = person;
    return this.http.post(`${environment.host}` + 'userUpdate', body, { headers: this.getTransferIp() })
  }

}