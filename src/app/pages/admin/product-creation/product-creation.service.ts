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

  public success: boolean = false;
  public error: string | null = null;

  public postProduct(product: Product) {
    this.handleError(product);
    if (this.error) return;

    firstValueFrom(
      this.http.post<Product[]>(
        `${environment.apiURL}/product`,
        product,
        this.token.createAuthorizationHeader()
      )
    )
      .then((products) => {
        this.global.products = products;
        this.handleSuccess(3);
      })
      .catch((err) => {
        if (err.error.status === 409)
          this.error = 'Product already exists with that name';
      });
  }

  handleSuccess(seconds: number) {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, seconds * 1000);
  }

  handleError(product: Product) {
    if (!product) {
      this.error = 'Product is undefined';
    } else if (!product.name) {
      this.error = 'Product name is undefined';
    } else if (product.name.length < 3) {
      this.error = 'Product name must be at least 3 characters long';
    } else if (!product.price) {
      this.error = 'Product price is undefined';
    } else if (product.price < 0) {
      this.error = 'Product price must be greater than 0';
    } else if (!product.description) {
      this.error = 'Product description is undefined';
    } else if (product.description.length < 10) {
      this.error = 'Product description must be at least 10 characters long';
    } else if (!product.image) {
      this.error = 'Product image is undefined';
    } else {
      this.error = null;
    }
  }
}
