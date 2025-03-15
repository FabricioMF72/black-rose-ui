import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  contactForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      date: ["", Validators.required],
      service: ["", Validators.required],
      message: [""]
    });
  }
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Handle form submission
    } else {
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched(): void {
    Object.values(this.contactForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
