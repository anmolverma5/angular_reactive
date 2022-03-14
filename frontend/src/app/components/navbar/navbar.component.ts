import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { Emitters } from 'src/app/shared/emitters/emitters';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  static ngOnInit() {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router,private apiService: ApiService) {
  }

  isLoggedin: Boolean = true;

  ngOnInit(): void {
    Emitters.authEmitter.emit(false);
    Emitters.authEmitter.subscribe(
      (auth: Boolean)=>{
        this.isLoggedin = auth;
    });
    // var aValue = localStorage.getItem('userToken');
    // if (aValue == null) {
    //   this.isLoggedin = true;
    // }
    // else 
    // {
    //   this.isLoggedin = false;
    // }
  }

  logout() {
    localStorage.clear();
    Emitters.authEmitter.emit(true);
    this.router.navigate(['login']);
  }

}
