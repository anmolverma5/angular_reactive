import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  user_name: string = "Anmol Verma";

  constructor(private http: HttpClient,private router: Router, private apiService: ApiService,private users: UserService) { }

  ngOnInit(): void {
    const kasa = this.users.getData();
    console.warn(kasa);
  }

}
