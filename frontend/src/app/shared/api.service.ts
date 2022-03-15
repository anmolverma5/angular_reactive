import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  @ViewChild(NavbarComponent) NavbarComponent: NavbarComponent | undefined
  private apiUrl = environment.API_URL;
  isLoggedin: any;
  constructor(private http: HttpClient,
    private router: Router,
  ) { }

  public getApi(url: string, params: any) {
    return this.http.get(url, params);
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
  public userData(url: string, params: any) {
    return this.http.get(url, params);
  }
}
