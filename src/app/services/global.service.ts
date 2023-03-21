import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Product } from '../typings/product.type';
import { User } from '../typings/user.type';
import { HttpClient } from '@angular/common/http';
import decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class GlobalService implements OnInit {
  public user!: User;
  public products: Product[] = [];

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  ngOnInit(): void {}

  private async loadProducts() {
    this.http.get<Product[]>(`${environment.apiURL}/product/all`).subscribe(
      (products) => {
        this.products = products;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
