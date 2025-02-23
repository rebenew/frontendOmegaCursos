import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
        provideRouter(routes),
        importProvidersFrom(FormsModule, ReactiveFormsModule),
        provideHttpClient(withFetch())
    ]
}).catch(err => console.error(err));

