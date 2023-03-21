import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private cart: CartService,
    public global: GlobalService
  ) {}

  public getTotalItemsInCart(): number {
    return this.cart.shoppingCart.reduce((a, b) => a + b.quantity, 0);
  }

  getFirstPartOfEmail(): string {
    return this.global.user.email.split('@')[0];
  }
}
