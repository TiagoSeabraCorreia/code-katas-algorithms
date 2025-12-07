import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { serviceTypesReducer } from './service-type.reducer';
import { ServiceTypeEffects } from './service-type.effect';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideStore({
        serviceTypes: serviceTypesReducer
    }), provideEffects(ServiceTypeEffects), provideRouterStore(), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideHttpClient(withFetch())]    
};
