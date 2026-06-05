import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideIonicAngular } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';

import { routes } from '../../app.routes';
import { authInterceptor } from '../interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [

    provideRouter(routes),

    provideHttpClient(
      withInterceptors([authInterceptor])
    ),

    provideIonicAngular(),

    // ⭐⭐⭐ CRITICAL PART ⭐⭐⭐
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: '__a1technician_db',
        driverOrder: ['indexeddb', 'localstorage']
      })
    )
  ]
};