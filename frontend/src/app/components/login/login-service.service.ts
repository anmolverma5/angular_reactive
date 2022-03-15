import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private apiService: ApiService) { }
  
  public authenticateUser(values: any) {
    const url = `/authenticate`;
    return this.apiService.postApi(url, values);
  }
}
