import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  isLoggedin: any;
  constructor(private http: HttpClient,
    private router: Router,
  ) { }

  public getApi(url: string, params: any) {
    return this.http.get(url, params);
  }
  public getApi_new(url: string, params: any, headers: any) {
    return this.http.post(url, params, headers);
  }
  public postApi(url: string, params: any) {
    url = this.apiUrl + url;
    return this.http.post(url, params)
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
    return this.http.get(url, params);
  }
  public getUserFromLocalCache(): Users {
    const user: any = localStorage.getItem('user');
    return JSON.parse(user);
  }
  public getToken() {
    this.token = localStorage.getItem('token');
    return JSON.parse(this.token);
  }
  public userData(params: any) {
    const url = `/userData`;
    return this.http.get(url, params);
  }

}
