import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  public sendEmail(formValues: any): Promise<any> {
    // Map form values to your emailjs template parameters
    const templateParams = {
      name: formValues.firstname,
      lastName: formValues.lastname,
      email: formValues.email,
      Email: formValues.email,
      Date: formValues.date,
      time: new Date().toLocaleTimeString(),
      package: formValues.service,
      message: formValues.message,
    };
    return emailjs.send(
      'service_vtiyemw',      // Replace with your Service ID
      'template_n0yvjhp',     // Replace with your Template ID
      templateParams,
      'fToYV09MgNEFd9AHi'     // Replace with your Public Key
    );
  }
}
