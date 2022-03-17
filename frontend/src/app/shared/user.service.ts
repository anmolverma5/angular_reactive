import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Users } from '../model/Users';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  email :any = this.apiService.getUserFromLocalCache();
  token :any = this.apiService.getToken();
  todoitemscount: any;
  data: Users[] = [];
  completed: any;
  constructor(private apiService: ApiService) {
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
  url = 'http://localhost:3000/userData';
  postData = {
    authorization: this.token,
    email: this.email
  };
  getData() {
    return this.apiService.getApi(this.url , this.postData);
  }
}