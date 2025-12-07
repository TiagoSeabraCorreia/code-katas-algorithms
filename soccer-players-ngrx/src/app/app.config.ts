import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { soccerPlayerReducer } from './soccer-player.reducer';
import { SoccerPlayerEffects } from './soccer-player.effect';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), 
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideEffects([SoccerPlayerEffects]), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideStore(
    {
      soccerPlayer: soccerPlayerReducer
    }
  )]
};
