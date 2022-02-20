import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Users } from 'src/app/model/Users';
import { ApiService } from './api.service';


function confirm_password(): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null | any => {
    let password = c.get('password');
    let cpassword = c.get('cpassword');
    alert(cpassword);
    if (password?.pristine || cpassword?.pristine) {
      return null;
    }
    if (password?.value !== cpassword?.value) {
      return false;
    }
    return { 'match': true };
  };
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  users = new Users();
  model: any;
  service: any;
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        cpassword: ['', [Validators.required]]
      }, { validators: confirm_password }),
    })
  }
  save(): void {
    console.log(this.signupForm);
    console.log('Saved: ' + JSON.stringify(this.signupForm.value));
    this.apiService.addPerson(this.signupForm.value)
      .subscribe(data => {
        console.warn(data)
        var anmol = 'anmol@gmail.com';
        const navigationExtras: NavigationExtras = { state: { data: 'Registerd successfully' } };
        this.router.navigate(['/login'], navigationExtras);
      })
  }
}
