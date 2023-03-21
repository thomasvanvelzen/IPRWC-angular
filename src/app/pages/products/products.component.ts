import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  public categoryId:
    | 'discount'
    | 'sportswear'
    | 'weightlifting'
    | 'cardio'
    | 'bodyweight' = 'discount';
  
  public descriptions: { [key: string]: string } = {
    discount: 'Here you can find all the products that are on sale! Hurry up, because these products are only available for a limited time!',
    sportswear: 'Here you can find all the sportswear products! These can be used for all kinds of sports!',
    weightlifting: 'Here you can find all the weightlifting products! Good products for beginners and advanced weightlifters!',
    cardio: 'Here you can find all the cardio products! Good products for beginners and advanced cardio enthusiasts!',
    bodyweight: 'Here you can find all the bodyweight products! Perfect for people who want to train without weights! ',
  }

  constructor(
    public global: GlobalService,
    private route: ActivatedRoute
  ) {
    this.categoryId = route.snapshot.data['category'];
  }

  ngOnInit(): void { }
  
  getFilteredProducts() {
    if (this.categoryId === 'discount') return this.global.products;
    return this.global.products.filter(
      (product) => {
        return product.category_id === this.categoryId;
      }
    );
  }

  options: AnimationOptions = {
    path: `/assets/${this.route.snapshot.data['category']}.json`,
  };
}
