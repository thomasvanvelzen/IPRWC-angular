import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Product } from '../typings/product.type';
import { User } from '../typings/user.type';
import { HttpClient } from '@angular/common/http';
import decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class GlobalService implements OnInit {
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    []
  );

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  ngOnInit(): void {}

  private async loadProducts() {
    this.http.get<Product[]>(`${environment.apiURL}/product/all`).subscribe(
      (products) => {
        this.products$.next(products);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  public get products() {
    return this.products$.getValue();
  }

  public set products(products: Product[]) {
    this.products$.next(products);
  }

  public get user() {
    return this.user$.getValue() as User;
  }

  public set user(user: User) {
    this.user$.next(user);
  }
}
