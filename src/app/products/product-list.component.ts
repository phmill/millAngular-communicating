import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = 'Product List';
  showImage: boolean;
  includeDetail: boolean = true;
  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
  parentListFilter: string;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private productService: ProductService) {}

  ngAfterViewInit(): void {
    this.parentListFilter = this.filterComponent.listFilter;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
        this.performFilter(this.parentListFilter);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(
        (product: IProduct) =>
          product.productName
            .toLocaleLowerCase()
            .indexOf(filterBy.toLocaleLowerCase()) !== -1
      );
    } else {
      this.filteredProducts = this.products;
    }
    console.log('filteredProducts: ', this.filteredProducts.length);
  }
}
