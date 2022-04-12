import { Component, ElementRef, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { ApiService } from "src/app/shared/api.service";


@Component({
    selector: "btn-cell-renderer",
    template: `
<button class="action-button edit" (click)="btnClickedHandler(content,$event)" data-type="{{this.params.data.id}}" data-action="edit" > edit  </button>
<button class="action-button delete" (click)="delete()"   data-action="delete" > delete </button>

<ng-template #content let-modal>
  <div class="modal-header">
    <h4 class="modal-title" id="modal-basic-title">Profile update</h4>
    <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
  </div>
  <div class="modal-body">
    <form>
      <div class="mb-3">
      <form novalidate [formGroup]="signupForm" (ngSubmit)="save()" class="form">
      <div class="form-control-custom">
        <label for="username">First Name</label>
        <input type="text" id="firstname" name="firstname" placeholder="First Name" formControlName="firstname"
          [ngClass]="{'is-invalid': (signupForm.get('firstname')?.touched || signupForm.get('firstname')?.dirty && !signupForm.valid)}" />
        <span class="invalid-feedback">
          <span *ngIf="signupForm.get('firstname')?.errors?.['required']">
            Please enter your first name.
          </span>
          <span *ngIf="signupForm.get('firstname')?.errors?.['minlength']">
            The first name must be longer than 3 characters.
          </span>
        </span>
      </div>
      <div class="form-control-custom">
        <label for="username">Last Name</label>
        <input type="text" id="lastname" name="lastname" placeholder="Last Name" formControlName="lastname"
          [ngClass]="{'is-invalid': (signupForm.get('lastname')?.touched || signupForm.get('lastname')?.dirty && !signupForm.valid)}" />
        <span class="invalid-feedback">
          <span *ngIf="signupForm.get('lastname')?.errors?.['required']">
            Please enter your first name.
          </span>
          <span *ngIf="signupForm.get('lastname')?.errors?.['minlength']">
            The first name must be longer than 3 characters.
          </span>
        </span>
      </div>
      <div class="form-control-custom">
        <label for="username">Email</label>
        <input type="email" id="emailid" name="emailid" placeholder="Enter Email Address" formControlName="email"
          [ngClass]="{'is-invalid': (signupForm.get('email')?.touched || signupForm.get('email')?.dirty && !signupForm.valid)}" />
        <span class="invalid-feedback">
          <span *ngIf="signupForm.get('email')?.errors?.['required']">
            Please enter your Email
          </span>
          <span *ngIf="signupForm.get('email')?.errors?.['email']">
            Please enter the Valid Email
          </span>
        </span>
      </div>
      <div formGroupName="passwordGroup">
        <div class="form-control-custom">
          <label for="username">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter Password" formControlName="password"
            [ngClass]="{'is-invalid': signupForm.get('passwordGroup')?.errors ||
                ((signupForm.get('passwordGroup.password')?.touched || 
                signupForm.get('passwordGroup.password')?.dirty) && 
                 !signupForm.get('passwordGroup.password')?.valid) }" />
          <span class="invalid-feedback">
            <span *ngIf="signupForm.get('passwordGroup.password')?.errors?.['required']">
              Please enter your Password.
            </span>
            <span *ngIf="signupForm.get('passwordGroup.password')?.errors?.['minlength']">
              The Password must be longer than 6 characters.
            </span>
          </span>
        </div>
        <div class="form-control-custom">
          <label for="username">Confirm Password</label>
          <input type="password" id="cpassword" name="cpassword" placeholder="Confirm Password"
            formControlName="cpassword" [ngClass]="{'is-invalid': signupForm.get('passwordGroup')?.errors ||
                ((signupForm.get('passwordGroup.cpassword')?.touched || 
                signupForm.get('passwordGroup.cpassword')?.dirty) && 
                 !signupForm.get('passwordGroup.cpassword')?.valid) }" />
          <span class="invalid-feedback">
            <span *ngIf="signupForm.get('passwordGroup.cpassword')?.errors?.['required']">
              Please enter your Password.
            </span>
            <span *ngIf="signupForm.get('passwordGroup.cpassword')?.errors?.['minlength']">
              The Password must be longer than 6 characters.
            </span>
            <span *ngIf="signupForm.get('passwordGroup')?.errors?.['match']">
              The confirmation does not match the Password.
            </span>
          </span>
        </div>
      </div>
      <button type="submit" class="button" class="button" class="button" name="submit"
        [title]="signupForm.valid ? 'Save Your entered data': 'Disabled'" [disabled]="!signupForm.valid">Submit</button>
    </form>
        <div class="input-group">
        </div>
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="modal.close('Save click')">Close</button>
  </div>
</ng-template>
  `
})
export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
    signupForm!: FormGroup;
    closeResult = '';
    type: any;
    $event: any
    user_id = [1, 2, 28, 33, 34];
    constructor(private modalService: NgbModal, private elementRef: ElementRef, private fb: FormBuilder, private apiService: ApiService, private router: Router) { }
    ngOnInit(): void {
        this.signupForm = this.fb.group({
            firstname: ['', [Validators.required, Validators.minLength(3)]],
            lastname: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            passwordGroup: this.fb.group({
                password: ['', [Validators.required, Validators.minLength(6)]],
                cpassword: ['', [Validators.required, Validators.minLength(6)]]
            }),
        })
    }
    refresh(params: ICellRendererParams): boolean {
        throw new Error("Method not implemented.");
    }
    public params: any;

    agInit(params: any): void {
        this.params = params;
        console.log(this.params.data.id);
    }

    btnClickedHandler(content: any, $event: any) {
        alert($event.target.getAttribute('type'));
        console.log(this.type = this.elementRef.nativeElement.getAttribute('data-type'));
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    delete() {
        alert('delete');
    }
    save(): void {
        alert("hello boi");
    }

    ngOnDestroy() {
        // no need to remove the button click handler
        // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
    }
}
