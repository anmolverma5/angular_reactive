import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { Users } from '../model/Users';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  messageSource = new BehaviorSubject<any>('Total Work TODO=>');
  currentMessage = this.messageSource.asObservable();
  todoitemscount: any;
  data: Users[] = [];
  todoItems = new BehaviorSubject<Users[]>([]);
  todoItemsList$ = this.todoItems.asObservable();
  completed: any;
  constructor(private apiService: ApiService) {
    console.log('Service Chalpadi');
    this.todoItems;
    this.getData()
      .pipe(
        map((res: any) =>
          res.map((data: any) => {
            return {
              id: data.id,
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              password: data.password,
            };
          })
        )
      )
      .subscribe((data: any) => {
        console.warn(data);
        this.data = data;
        this.todoItems.next(data);
        this.todoitemscount = this.data.length;
        //console.warn(this.todoitemscount);
      });
  }
  getData(params = {}) {
    console.log(this.apiService.getToken());
    return this.apiService.getApiCall(`${environment.host}userData`, params);
  }
  changeMessage(message: any) {
    this.messageSource.next(message);
  }
}