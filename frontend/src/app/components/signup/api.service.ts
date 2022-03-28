import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/model/Users';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class ApiService {


  constructor(private http: HttpClient) {
  }
  addPerson(person: Users): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = person;
    console.log(body);
    return this.http.post(`${environment.host}` + 'users', body, { 'headers': headers })
  }

}