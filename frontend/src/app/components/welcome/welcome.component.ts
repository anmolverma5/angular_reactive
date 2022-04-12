import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/shared/api.service';
import { Emitters } from 'src/app/shared/emitters/emitters';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  email: any;

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    if (this.jwtHelper.isTokenExpired(this.apiService.getToken())) {
      localStorage.clear();
      Emitters.authEmitter.emit(true);
      this.router.navigate(['login']);
    } else {
      console.log('JWT is Vaild');
    }
    this.email = localStorage.getItem('user');
  }

}

