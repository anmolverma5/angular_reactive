import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {
  }

  isLoggedin: any = '';

  ngOnInit(): void {
    var aValue = localStorage.getItem('userToken');
    if (aValue == null) {
      this.isLoggedin = true;
    }
    else {
      this.isLoggedin = false;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
