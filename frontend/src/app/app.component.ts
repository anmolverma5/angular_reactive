import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {

  }
  title = 'reactive';

  ngOnInit(): void {
    this.apiService.isLoggedIn()
  }
}
