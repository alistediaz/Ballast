import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { CourseService } from '../course.service';
import { Course } from '../courses';
import { Student } from '../student';
import { dobValidator } from '../shared/valid-dob.directive';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  @Input() course: Course | undefined;
  @Output() register = new EventEmitter();

  actualDate = new Date();
  maxYear = this.actualDate.getFullYear() - 16;
  maxDate = new Date(this.maxYear, this.actualDate.getMonth(), this.actualDate.getDate());


  student: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    dob: this.maxDate,
    address: '',
    email: '',
    phone: '',
  };

  signUpForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.nonNullable.group({
      firstName: new FormControl(this.student.firstName, [Validators.required]),
      lastName: new FormControl(this.student.lastName, [Validators.required]),
      dob: new FormControl(undefined, [Validators.required, dobValidator(this.maxDate)]),
      address: new FormControl(this.student.address, [Validators.required]),
      email: new FormControl(this.student.email, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(this.student.phone, [Validators.required]),
    });
  }

  get firstName() {
    return this.signUpForm.get('firstName')!;
  }
  get lastName() {
    return this.signUpForm.get('lastName')!;
  }
  get dob() {
    return this.signUpForm.get('dob')!;
  }
  get address() {
    return this.signUpForm.get('address')!;
  }
  get email() {
    return this.signUpForm.get('email')!;
  }
  get phone() {
    return this.signUpForm.get('phone')!;
  }

  onSubmit(): void {
    console.log('Your order has been submitted', this.signUpForm.value);
    this.signUpForm.reset();
  }
}
