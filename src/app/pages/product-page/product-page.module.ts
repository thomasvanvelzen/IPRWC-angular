import { NgModule } from '@angular/core';
import { ProductPageComponent } from './product-page.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: ':id',
    component: ProductPageComponent,
  },
];

@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
  bootstrap: [],
})
export class ProductPageModule {}
