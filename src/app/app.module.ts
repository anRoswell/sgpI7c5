import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ComunesModule } from './common/comunes.module';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Libreria
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicStorageModule } from '@ionic/storage-angular';

// SQLite
import { DbnameVersionService } from './services/dbname-version.service';
import { SQLiteService } from './services/sqlite.service';
import { InitializeAppService } from './services/initialize-app.service';
import { AuthorPostsService } from './services/author-posts.service';

//
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Interceptors
import { TokenInterceptor } from './interceptors/token.interceptor';

// Services
import { LoggerService } from './services/logger.service';
import { AuthenticateService } from './services/authenticate.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpService } from './services/http.service';
import { StorageService } from './services/storage.service';
import { BackButtonService } from './services/back-button.service';

// Components

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      innerHTMLTemplatesEnabled: true,
    }),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ComunesModule,
  ],
  providers: [
    SQLiteService,
    InitializeAppService,
    AuthorPostsService,
    DbnameVersionService,
    AuthGuardService,
    AuthenticateService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: 'ILogger',
      useClass: LoggerService,
    },
    {
      provide: 'IHttp',
      useClass: HttpService,
    },
    {
      provide: 'IAuthenticate',
      useClass: AuthenticateService,
    },
    {
      provide: 'IStorage',
      useClass: StorageService,
    },
    {
      provide: 'IBackButton',
      useClass: BackButtonService,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
