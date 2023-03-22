import { Injectable } from '@angular/core';
import { Product } from 'src/app/typings/product.type';
import { GlobalService } from 'src/app/services/global.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

type CartItem = { productId: number; quantity: number };
type CartItemWithProduct = { product: Product; quantity: number };

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class CartService {
  public shoppingCart$ = new BehaviorSubject<CartItem[]>([]);
  public shoppingCartWithProducts: CartItemWithProduct[] = [];

  constructor(private global: GlobalService) {
    this.global.products$.subscribe((products) => {
      if (products) {
        this.initializeShoppingCart();
      }
    });

    this.shoppingCart$.subscribe((cart) => {
      if (cart) {
        this.saveShoppingCart();
        this.getProductsFromIdsInCart();
      }
    });
  }

  private initializeShoppingCart(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.shoppingCart$.next(JSON.parse(cart));
    }
  }

  public addItemToCart(productId: number): void {
    const cart = this.shoppingCart$.getValue();
    const item = cart.find((item) => item.productId === productId);
    if (item) {
      item.quantity++;
    } else {
      cart.push({ productId, quantity: 1 });
      this.shoppingCart$.next(cart);
    }
  }

  public removeItemFromCart(productId: number): void {
    const cart = this.shoppingCart$.getValue();
    const item = cart.find((item) => item.productId === productId);
    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.shoppingCart$.next(
          cart.filter((item) => item.productId !== productId)
        );
      }
    }
  }

  public removeItemFromCartCompletely(productId: number): void {
    const cart = this.shoppingCart$.getValue();
    this.shoppingCart$.next(
      cart.filter((item) => item.productId !== productId)
    );
  }

  public saveShoppingCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.shoppingCart$.getValue()));
  }

  public getProductsFromIdsInCart(): void {
    const cart = this.shoppingCart$.getValue();
    const productIds = cart.map((item) => item.productId);
    const products = this.global.products?.filter((product) =>
      productIds.includes(product.id as number)
    );

    this.shoppingCartWithProducts = products.map((product) => {
      const quantity = cart.find(
        (item) => item.productId === product.id
      )?.quantity;
      return { product, quantity: quantity || 0 };
    });
  }
}
