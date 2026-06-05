import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';

import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
  RouteReuseStrategy
} from '@angular/router';

import {
  IonicRouteStrategy,
  provideIonicAngular
} from '@ionic/angular/standalone';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    provideIonicAngular(),

    provideRouter(routes, withPreloading(PreloadAllModules)),

    provideHttpClient(
      withInterceptors([authInterceptor])
    ),

    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: '__a1technician_db',
        driverOrder: ['indexeddb', 'localstorage']
      })
    )
  ],
});