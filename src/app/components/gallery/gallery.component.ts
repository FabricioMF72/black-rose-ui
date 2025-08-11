import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { PackagesService } from '../../services/packages.service';

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  packageList = this.packageService.getPackageList();
  categorySelected = this.packageService.getCategorySelected();
  showImageViewer = false;
  selectedImage = '';
  selectedImageIndex = 0;

  constructor(private packageService: PackagesService) {}

  changeCategory(category: string) {
    this.packageService.setCategorySelected(category);
    this.categorySelected = this.packageService.getCategorySelected();
    this.packageList = this.packageService.getPackageList();
  }

  getImagePath(imageName: string): string {
    // Convert to optimized path - assuming thumbnails in a subfolder
    return imageName;
  }

  openImageViewer(image: string, index: number): void {
    this.selectedImage = image;
    this.selectedImageIndex = index;
    this.showImageViewer = true;
    // Preload full resolution image
    this.preloadImage(image);
  }

  closeImageViewer(): void {
    this.showImageViewer = false;
  }

  nextImage(): void {
    if (this.selectedImageIndex < this.categorySelected!.imageList.length - 1) {
      this.selectedImageIndex++;
      this.selectedImage = this.categorySelected!.imageList[this.selectedImageIndex];
      this.preloadImage(this.selectedImage);
    }
  }

  previousImage(): void {
    if (this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
      this.selectedImage = this.categorySelected!.imageList[this.selectedImageIndex];
      this.preloadImage(this.selectedImage);
    }
  }

  private preloadImage(src: string): void {
    const img = new Image();
    img.src = src;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.showImageViewer) return;
    
    switch (event.key) {
      case 'Escape':
        this.closeImageViewer();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
    }
  }
}
