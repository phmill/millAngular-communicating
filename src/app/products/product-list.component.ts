import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  includeDetail: boolean = true;
  @ViewChild(CriteriaComponent, { static: true })
  filterComponent: CriteriaComponent;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  filteredProducts: IProduct[];
  products: IProduct[];

  get showImage(): boolean {
    return this.productParameterService.showImage;
  }
  set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }

  constructor(
    private productService: ProductService,
    private productParameterService: ProductParameterService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
        this.filterComponent.listFilter = this.productParameterService.filterBy;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  onValueChange(value: string): void {
    this.productParameterService.filterBy = value;
    this.performFilter(value);
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
