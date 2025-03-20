import { Injectable, signal } from '@angular/core';
import Package from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  private packageList = signal<Package[]>([
    {
      category: 'Weddings',
      description: 'Your special day deserves to be captured with attention to detail and heartfelt sensitivity. I strive for every bride to see me as a trusted friend, there to help with anything they need while I document each moment with honesty and authenticity.',
      selected: true,
      imageList: ["galery-1.jpg", "galery-2.jpg", "galery-3.jpg", "galery-4.jpg", "galery-5.jpg", "galery-6.jpg"]
    },
    {
      category: 'Family',
      description: 'Preserve the bonds and shared laughter with family photo sessions that reflect the essence of your home and loved ones.',
      selected: false,
      imageList: ["outdoor-1.jpg", "outdoor-2.jpg", "outdoor-3.jpg", "outdoor-4.jpg", "outdoor-5.jpg", "outdoor-6.jpg"]
    },
    {
      category: 'Outdoor',
      description: 'Relaxed sessions in natural settings that highlight your personality and tell your story in a genuine way.',
      selected: false,
      imageList: ["outdoor-1.jpg", "outdoor-2.jpg", "outdoor-3.jpg", "outdoor-4.jpg", "outdoor-5.jpg", "outdoor-6.jpg"]
    }
  ]);

  constructor() {}

  getPackageList():Package[] {
    return this.packageList();
  }

  getCategorySelected():Package {
    return this.packageList().find(pkg => pkg.selected === true)!;
  }

  setCategorySelected(category: string) {
    this.packageList.update(packages => 
      packages.map(pkg => ({
        ...pkg,
        selected: pkg.category === category
      }))
    );
  }
}
