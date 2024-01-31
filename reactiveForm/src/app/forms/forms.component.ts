import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  userForm!: FormGroup;
  submitted: boolean=false;
  valid:boolean=false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      middleName: ['', Validators.maxLength(20)],
      age: ['', [Validators.required, Validators.pattern('^(?:1[0-9]|[2-4][0-9]|50)$'),this.isNumberValidator]],
      gender: ['', Validators.required],
      address: this.formBuilder.group({
        street: ['', [Validators.required, Validators.maxLength(20)]],
        landmark: ['', Validators.maxLength(20)],
        city: ['', [Validators.required, Validators.maxLength(20)]],
        state: ['', [Validators.required, Validators.maxLength(20)]],
        zipCode: ['', [Validators.required,this.isNumberValidator, Validators.maxLength(20)]],
        country: ['', [Validators.required, Validators.maxLength(20)]]
      }),
      hobbies: this.formBuilder.array([
        this.formBuilder.control('')
      ])
    });
  }

  get hobbies() {
    return this.userForm.get('hobbies') as FormArray;
  }
  isNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    const age = control.value;
    if (isNaN(age)) {
      return { 'notANumber': true };
    }
    return null;
  }

  addHobby() {
    this.hobbies.push(this.formBuilder.control(''));
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  onSubmit() {
    this.submitted=true;
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.valid=true;
    } else {
      this.valid=false;
      console.log("Form is invalid");
    }
  }
}
