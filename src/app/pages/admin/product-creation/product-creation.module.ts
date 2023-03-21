import { NgModule } from '@angular/core';
import { ProductCreationComponent } from './product-creation.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', component: ProductCreationComponent }];

@NgModule({
  declarations: [ProductCreationComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  providers: [],
  bootstrap: [],
})
export class ProductCreationModule {}
