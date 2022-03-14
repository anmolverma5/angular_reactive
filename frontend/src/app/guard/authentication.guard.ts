import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
    return this.isUserLoggedIn();
  }
  private isUserLoggedIn(): boolean
  {
    if(localStorage.getItem('userToken'))
    {
      return true;
    }
    this.router.navigate(['/login']);
    return false;

  }
  
}
