import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Users } from 'src/app/model/Users';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  users = new Users();

  constructor(private fb: FormBuilder,
    private loginService: LoginServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['anmol@gmail.com'],
      password: ['12345678']
    })
  }
  save() {
    console.log(this.loginForm);
    console.log("save: " + JSON.stringify(this.loginForm.value));
    this.loginService.authenticateUser(this.loginForm.value).subscribe((token: any) => {
      localStorage.setItem('userToken', token);
    })
  }

}
