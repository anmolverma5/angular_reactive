import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/model/Users';


@Injectable({ providedIn: 'root' })
export class ApiService {

  baseURL: string = "http://localhost:3000/";

  constructor(private http: HttpClient) {
  }
  addPerson(person: Users): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = person;
    console.log(body);
    return this.http.post(this.baseURL + 'users', body, { 'headers': headers })
  }
  //   getPeople(): Observable<Users[]> {
  //     console.log('getPeople '+this.baseURL + 'users')
  //     return this.http.get<Users[]>(this.baseURL + 'users')
  //   }



}