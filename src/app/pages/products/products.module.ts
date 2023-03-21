import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LottieModule } from 'ngx-lottie';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'discount',
    component: ProductsComponent,
    data: { category: 'discount' },
  },
  {
    path: 'sportswear',
    component: ProductsComponent,
    data: { category: 'sportswear' },
  },
  {
    path: 'weightlifting',
    component: ProductsComponent,
    data: { category: 'weightlifting' },
  },
  {
    path: 'cardio',
    component: ProductsComponent,
    data: { category: 'cardio' },
  },
  {
    path: 'bodyweight',
    component: ProductsComponent,
    data: { category: 'bodyweight' },
  },
];

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [],
})
export class ProductsModule {}
