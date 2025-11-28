import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AuthInterceptor } from '../core/security/auth-interceptor';
import { provideBrowserGlobalErrorListeners } from '@angular/core';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule  // <-- essencial para HttpClient
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true   // permite múltiplos interceptors
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
