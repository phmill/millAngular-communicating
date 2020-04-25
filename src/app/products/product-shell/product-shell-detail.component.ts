import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-product-shell-detail',
  templateUrl: './product-shell-detail.component.html',
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';

  product: IProduct | null;
  sub: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.sub = this.productService.selectedProductChange$.subscribe(
      (selectedProduct) => (this.product = selectedProduct)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
