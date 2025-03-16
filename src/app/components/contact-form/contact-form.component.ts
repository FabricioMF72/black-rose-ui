import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  packageName: string | null = null;
  contactForm: FormGroup;
  
  constructor(private fb: FormBuilder,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.packageName = params['package'] || null;
    });
    this.contactForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      date: ["", Validators.required],
      service: [this.packageName, Validators.required],
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
