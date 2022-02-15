import { AbstractControl, ValidatorFn } from "@angular/forms";

function confirm_password(): ValidatorFn{
    return(c: AbstractControl): { [key: string]: boolean } | null | any => {
      let password = c.get('password');
      let cpassword = c.get('cpassword');
      alert(cpassword);
      if (password?.pristine || cpassword?.pristine){
        return null;
      }
      if(password?.value !== cpassword?.value){
      return false;
      }
      return {'match': true};
    };
  }