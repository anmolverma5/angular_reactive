import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/model/Users';
import { Emitters } from 'src/app/shared/emitters/emitters';
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
    private loginService: LoginServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['anmol@gmail.com', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.required, Validators.minLength(6)]]
    })
  }
  save() {
    console.log(this.loginForm);
    console.log("save: " + JSON.stringify(this.loginForm.value));
    this.loginService.authenticateUser(this.loginForm.value).subscribe((token: any) => {
      localStorage.setItem('userToken', token);
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', this.loginForm.value.email);
      this.router.navigate(['/welcome']);
      Emitters.authEmitter.emit(false);
    })
  }

}
