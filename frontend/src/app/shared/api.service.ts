import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Emitters } from './emitters/emitters';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.API_URL;
  isLoggedin: any;
  constructor(private http: HttpClient,
    private router: Router) { }

  public getApi(url: string, params: any) {
    return this.http.get(url, params);
  }

  public postApi(url: string, params: any) {
    url = this.apiUrl + url;
    return this.http.post(url, params)
  }

  public isLoggedIn() {
    if (localStorage.getItem('userToken')) {
      //navigate\
      Emitters.authEmitter.emit(true);
      this.isLoggedin = true;
      this.router.navigate(['/welcome']);
    } else {
      Emitters.authEmitter.emit(false);
      this.isLoggedin = false;
      this.router.navigate(['/signup']);
    }
  }
}
