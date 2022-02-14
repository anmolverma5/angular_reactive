import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Users } from 'src/app/model/Users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  users = new Users();
  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
    })
  }
  save(){
    console.log(this.loginForm);
    console.log("save: " + JSON.stringify(this.loginForm.value));
  }

}
