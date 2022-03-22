import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService ) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if(httpRequest.url.includes(`${this.apiService.host}/login`))
    {
      return httpHandler.handle(httpRequest);
    }
    if(httpRequest.url.includes(`${this.apiService.host}/register`))
    {
      return httpHandler.handle(httpRequest);
    }
    if(httpRequest.url.includes(`${this.apiService.host}/api`))
    {
      return httpHandler.handle(httpRequest);
    }
    return httpHandler.handle(httpRequest);
  }
}
