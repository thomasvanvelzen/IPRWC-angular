import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/typings/product.type';
import { CartService } from './cart.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  constructor(public cart: CartService, public global: GlobalService) {}

  ngOnInit(): void {
    this.cart.getProductsFromIdsInCart();
  }

  public getIncreasedPrice(item: { product: Product; quantity: number }) {
    return (1.1 * item.quantity * (item.product.price as number)).toFixed(2);
  }

  public getNormalPrice(item: { product: Product; quantity: number }) {
    return (item.quantity * (item.product.price as number)).toFixed(2);
  }

  public addItemToCart(item: { product: Product; quantity: number }) {
    this.cart.addItemToCart(item.product.id as number);
  }

  public removeItemFromCart(item: { product: Product; quantity: number }) {
    this.cart.removeItemFromCart(item.product.id as number);
  }

  public removeItemFromCartCompletely(item: {
    product: Product;
    quantity: number;
  }) {
    this.cart.removeItemFromCartCompletely(item.product.id as number);
  }

  public getTotalPrice(): string {
    return this.cart.shoppingCartWithProducts
      .map((item) => (item.product.price as number) * item.quantity)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);
  }

  public getTenProcentOfTotalPrice(): string {
    return (0.1 * parseFloat(this.getTotalPrice())).toFixed(2);
  }

  public getTotalPricePlusTenProcent(): string {
    return (
      parseFloat(this.getTotalPrice()) +
      parseFloat(this.getTenProcentOfTotalPrice())
    ).toFixed(2);
  }

  public getTotalItemsInCart(): number {
    return this.cart.shoppingCartWithProducts.reduce(
      (a, b) => a + b.quantity,
      0
    );
  }

  public isCartEmpty(): boolean {
    return this.getTotalItemsInCart() === 0;
  }
}
