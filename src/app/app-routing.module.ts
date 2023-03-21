import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService as RoleGuard } from './auth/role-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'CUSTOMER',
    },
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./pages/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'product-page',
    loadChildren: () =>
      import('./pages/product-page/product-page.module').then(
        (m) => m.ProductPageModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/product-creation/product-creation.module').then(
        (m) => m.ProductCreationModule
      ),
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ADMIN',
    },
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
