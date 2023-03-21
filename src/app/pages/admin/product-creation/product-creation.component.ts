import { Component } from '@angular/core';
import { Product } from 'src/app/typings/product.type';
import { GlobalService } from '../../../services/global.service';
import { ProductCreationService } from './product-creation.service';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
})
export class ProductCreationComponent {
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
    this.productCreationService.postProduct(this.product);
  }
}
