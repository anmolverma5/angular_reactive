import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { Users } from '../model/Users';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.host;
  email: any = this.apiService.getUserFromLocalCache();
  token: any = this.apiService.getToken();
  todoitemscount: any;
  data: Users[] = [];
  completed: any;
  constructor(public httpRequest: HttpRequest<any>, private apiService: ApiService) {
    console.log('Service Chalpadi');
    this.getData()
      .pipe(
        map((res: any) =>
          res.map((data: any) => {
            return {
              data
            };
          })
        )
      )
      .subscribe((data: any) => {
        console.warn(data);
        this.data = data;
        this.todoitemscount = this.data.length;
        //console.warn(this.todoitemscount);
      });
  }
  postData = {
    authorization: this.token,
    email: this.email
  };
  getData() {
    var headers = new Headers();
    headers.append('authorization', 'Bearer ' + this.token);
    headers.append('Content-Type', 'application/json');
    return this.apiService.getApi_new(`${this.host}/userData`, null, headers);
  }
}