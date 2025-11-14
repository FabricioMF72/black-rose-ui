import { Injectable, Inject, PLATFORM_ID, Optional, InjectionToken } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Response } from 'express';

// Create a token for the response object
export const RESPONSE = new InjectionToken<Response>('response');

@Injectable({
  providedIn: 'root'
})
export class HttpStatusService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(RESPONSE) private response: Response
  ) {}

  setStatus(code: number): void {
    if (isPlatformServer(this.platformId) && this.response) {
      this.response.status(code);
    }
  }

  set404(): void {
    this.setStatus(404);
  }
}