import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  private packageList = signal([
    {
      category: 'Weddings',
      description: 'Capture the magic of your special day with stunning wedding photography. From the intimate moments to the grand celebrations, we ensure every emotion and detail is beautifully preserved.',
      selected: true,
      imageList: ["galery-1.jpg", "galery-2.jpg", "galery-3.jpg", "galery-4.jpg", "galery-5.jpg", "galery-6.jpg"]
    },
    {
      category: 'Family',
      description: 'Celebrate the love and connection of your family with a heartwarming photo session. Whether at home or outdoors, we create timeless memories that you will cherish forever.',
      selected: false,
      imageList: []
    },
    {
      category: 'Maternity',
      description: 'Embrace the beauty of motherhood with a maternity photoshoot. We capture the joy, anticipation, and glow of this special journey, creating lasting memories for you and your baby.',
      selected: false,
      imageList: []
    },
    {
      category: 'Sweet 15',
      description: 'Celebrate this milestone with a magical Quinceañera photoshoot. Whether elegant, fun, or glamorous, we capture the essence of your unique personality and style.',
      selected: false,
      imageList: []
    },
    {
      category: 'Outdoor',
      description: 'Take advantage of natural light and breathtaking scenery with an outdoor photoshoot. Whether for portraits, couples, or special occasions, we create stunning, natural-looking images.',
      selected: false,
      imageList: ["outdoor-1.jpg", "outdoor-2.jpg", "outdoor-3.jpg", "outdoor-4.jpg", "outdoor-5.jpg", "outdoor-6.jpg"]
    }
  ]);

  constructor() {}

  getPackageList() {
    return this.packageList();
  }

  getCategorySelected() {
    return this.packageList().find(pkg => pkg.selected === true);
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
