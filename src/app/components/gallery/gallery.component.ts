import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { PackagesService } from '../../services/packages.service';

@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  packageList = this.packageService.getPackageList();
  categorySelected = this.packageService.getCategorySelected();

  constructor(private packageService: PackagesService) {}

   ngOnInit() {}

  changeCategory(category: string) {
    this.packageService.setCategorySelected(category);
    this.categorySelected = this.packageService.getCategorySelected();
    this.packageList = this.packageService.getPackageList();
  }
}
