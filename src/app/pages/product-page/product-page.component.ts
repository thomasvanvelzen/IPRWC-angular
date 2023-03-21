import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/typings/product.type';
import { CartService } from '../cart/cart.service';
import { ReviewService } from '../../services/review.service';
import { Review } from 'src/app/typings/review.type';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {
  public product!: Product;

  public shownReviews: Review[] = [];
  public shownProducts: Product[] = [];

  constructor(
    public global: GlobalService,
    private route: ActivatedRoute,
    public cart: CartService,
    private review: ReviewService
  ) {}

  ngOnInit(): void {
    this.initializeItem();
  }

  public initializeItem() {
    const loader = setInterval(() => {
      if (this.global.products.length > 0) {
        this.product = this.getProduct();
        this.shownProducts = this.getFourRandomItemsWithSimilarCategory();
        this.shownReviews = this.getFourRandomReviews();
        clearInterval(loader);
      }
    }, 1);
  }

  private getProduct() {
    return this.global.products.find((product) => {
      return product.id == this.route.snapshot.paramMap.get('id');
    }) as Product;
  }

  public getFourRandomReviews() {
    return this.review.getRandomReviews(4);
  }

  public getFourRandomItemsWithSimilarCategory() {
    const products = this.global.products
      .filter((product) => {
        return (
          product.category_id === this.product.category_id &&
          product.id !== this.product.id
        );
      })
      .sort(() => Math.random() - 0.5);
    return products.slice(0, 4);
  }

  public addToCart() {
    this.cart.addItemToCart(this.product.id as number);
  }
}
