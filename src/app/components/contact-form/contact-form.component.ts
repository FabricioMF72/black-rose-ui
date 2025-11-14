import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { MailService } from '../../services/mail.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {
  packageName: string | null = null;
  contactForm: FormGroup;
  isSending = false;
  sendSuccess: boolean | null = null;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private mailService: MailService,
    private seoService: SeoService
  ) {
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

  ngOnInit(): void {
    // Configurar SEO para la página de contacto
    this.seoService.setContactSeo();
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSending = true;
      this.mailService.sendEmail(this.contactForm.value)
        .then(() => {
          this.isSending = false;
          this.sendSuccess = true;
          this.contactForm.reset();
        })
        .catch(() => {
          this.isSending = false;
          this.sendSuccess = false;
        });
    } else {
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched(): void {
    Object.values(this.contactForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  openInstagram(): void {
    // Replace with your Instagram URL
    window.open('https://www.instagram.com/kendra_saenz_fotografia/', '_blank');
  }

  openWhatsApp(): void {
    // Replace with your WhatsApp number
    window.open('https://wa.me/+50671267591', '_blank');
  }

  openEmail(): void {
    // Replace with your email address
    window.open('mailto:your-email@example.com', '_blank');
  }
}
