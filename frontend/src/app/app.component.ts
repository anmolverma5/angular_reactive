import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './shared/api.service';
import { Emitters } from './shared/emitters/emitters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Output() authEmitter = new EventEmitter();
  constructor(private apiService: ApiService, private router: Router) {
  }
  title = 'reactive';

  ngOnInit(): void {
    this.apiService.isLoggedIn()
  }
}
