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
}
