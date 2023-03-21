import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { LottieModule } from 'ngx-lottie';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { LoginModule } from './pages/login/login.module';
import { FooterComponent } from './pages/layout/footer/footer.component';
import player from 'lottie-web/build/player/lottie_light';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [HeaderComponent, FooterComponent, AppComponent],
  imports: [
    LottieModule.forRoot({ player: playerFactory }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost'],
      },
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
