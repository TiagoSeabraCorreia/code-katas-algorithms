import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productReducer } from './product.reducer';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ProductEffect } from './product.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideStore({
      products: productReducer
    }),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideEffects([ProductEffect]), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
