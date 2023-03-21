import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { GlobalService } from '../../services/global.service';
import { Product } from 'src/app/typings/product.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(public global: GlobalService) {}

  options: AnimationOptions = {
    path: '/assets/sportswear.json',
  };
  options2: AnimationOptions = {
    path: '/assets/weightlifting.json',
  };
  options3: AnimationOptions = {
    path: '/assets/cardio.json',
  };
  options4: AnimationOptions = {
    path: '/assets/bodyweight.json',
  };
  sale: AnimationOptions = {
    path: '/assets/sale.json',
  };
}
