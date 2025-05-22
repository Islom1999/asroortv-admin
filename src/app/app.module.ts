import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/token.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        NgxPermissionsModule.forRoot(),
        AppRoutingModule,
        FormsModule
    ],
    providers: [
        { provide: NZ_I18N, useValue: en_US },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // provideAnimationsAsync(),
        provideAnimations(),
        provideHttpClient(),
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
export class AppModule { }
