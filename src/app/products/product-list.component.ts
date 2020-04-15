import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = 'Product List';
  showImage: boolean;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  @ViewChild('filterElement') filterElementRef: ElementRef;

  private _listFilter: string;

  public set listFilter(v: string) {
    this._listFilter = v;
    this.performFilter(this._listFilter);
  }
  public get listFilter(): string {
    return this._listFilter;
  }

  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private productService: ProductService) {}

  ngAfterViewInit(): void {
    this.filterElementRef.nativeElement?.focus();
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
        this.performFilter(this.listFilter);
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
  }
}
