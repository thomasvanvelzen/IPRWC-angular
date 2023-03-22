import { Component } from '@angular/core';
import { Product } from 'src/app/typings/product.type';
import { GlobalService } from '../../../services/global.service';
import { ProductCreationService } from './product-creation.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
})
export class ProductCreationComponent {
  public success: boolean = false;
  public error: string | null = null;

  constructor(
    public global: GlobalService,
    private productCreationService: ProductCreationService
  ) {}

  public product: Product = {
    id: null,
    name: null,
    description: null,
    category_id: 'discount',
    price: null,
    image: null,
  };

  public postProduct() {
    this.handleError(this.product);
    if (this.error) return;

    firstValueFrom(this.productCreationService.postProduct(this.product))
      .then(() => {
        this.global.loadProducts();
        this.handleSuccess(3);
      })
      .catch((err) => {
        if (err.error.status === 409)
          this.error = 'Product already exists with that name';
      });
  }

  handleSuccess(seconds: number) {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, seconds * 1000);
  }

  handleError(product: Product) {
    if (!product) {
      this.error = 'Product is undefined';
    } else if (!product.name) {
      this.error = 'Product name is undefined';
    } else if (product.name.length < 3) {
      this.error = 'Product name must be at least 3 characters long';
    } else if (!product.price) {
      this.error = 'Product price is undefined';
    } else if (product.price < 0) {
      this.error = 'Product price must be greater than 0';
    } else if (!product.description) {
      this.error = 'Product description is undefined';
    } else if (product.description.length < 10) {
      this.error = 'Product description must be at least 10 characters long';
    } else if (!product.image) {
      this.error = 'Product image is undefined';
    } else {
      this.error = null;
    }
  }
}
