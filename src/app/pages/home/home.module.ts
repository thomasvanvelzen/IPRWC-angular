import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LottieModule } from 'ngx-lottie';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', component: HomeComponent }];

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [],
})
export class HomeModule {}
