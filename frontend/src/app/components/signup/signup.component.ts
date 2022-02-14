import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Users } from 'src/app/model/Users';


function confirm_password(): ValidatorFn{
  return(c: AbstractControl): {[key:string]: boolean} | null | any => {
    let password = c.get('password');
    let cpassword = c.get('cpassword');
    if (password?.pristine || cpassword?.pristine){
      return null;
    }
    if(password?.value === cpassword?.value){
    return false;
    }
    return {'match': true};
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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['',[ Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required,Validators.minLength(6)]],
      cpassword: ['', [Validators.required,Validators.minLength(6)]]
      }, {validators: confirm_password}),      
    })
    // this.signupForm = new FormGroup({
    //   firstname: new FormControl(),
    //   lastname: new FormControl(),
    //   email: new FormControl(),
    //   password: new FormControl(),
    //   cpassword: new FormControl()
    // });
  }
  save(): void {
    console.log(this.signupForm);
    console.log('Saved: ' + JSON.stringify(this.signupForm.value));
  }

}
