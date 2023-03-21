import { Injectable } from '@angular/core';
import { Product } from 'src/app/typings/product.type';
import { GlobalService } from 'src/app/services/global.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class CartService {
  public shoppingCart: { productId: number; quantity: number }[] = [];
  public shoppingCartWithProducts: { product: Product; quantity: number }[] =
    [];

  constructor(private global: GlobalService) {
    this.initializeShoppingCart();
  }

  private initializeShoppingCart(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.shoppingCart = JSON.parse(cart);
    }
  }

  public addItemToCart(productId: number): void {
    const item = this.shoppingCart.find((item) => item.productId === productId);
    if (item) {
      item.quantity++;
    } else {
      this.shoppingCart.push({ productId, quantity: 1 });
    }
    this.saveShoppingCart();
    this.getProductsFromIdsInCart();
  }

  public removeItemFromCart(productId: number): void {
    const item = this.shoppingCart.find((item) => item.productId === productId);
    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.shoppingCart = this.shoppingCart.filter(
          (item) => item.productId !== productId
        );
      }
    }
    this.saveShoppingCart();
    this.getProductsFromIdsInCart();
  }

  public removeItemFromCartCompletely(productId: number): void {
    this.shoppingCart = this.shoppingCart.filter(
      (item) => item.productId !== productId
    );
    this.saveShoppingCart();
    this.getProductsFromIdsInCart();
  }

  public saveShoppingCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.shoppingCart));
  }

  public getProductsFromIdsInCart(): void {
    const productIds = this.shoppingCart.map((item) => item.productId);
    const products = this.global.products?.filter((product) =>
      productIds.includes(product.id as number)
    );

    this.shoppingCartWithProducts = products.map((product) => {
      const quantity = this.shoppingCart.find(
        (item) => item.productId === product.id
      )?.quantity;
      return { product, quantity: quantity || 0 };
    });
  }
}
