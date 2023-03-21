import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { TokenService } from 'src/app/services/token.service';
import { Product } from 'src/app/typings/product.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class ProductCreationService {
  constructor(
    private http: HttpClient,
    public global: GlobalService,
    private token: TokenService
  ) {}

  public postProduct(product: Product) {
    firstValueFrom(
      this.http.post<Product[]>(
        `${environment.apiURL}/product/create`,
        product,
        this.token.createAuthorizationHeader()
      )
    ).then((products) => {
      this.global.products = products;
    });
  }
}
