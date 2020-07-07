import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TitleCasePipe } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from '@app/app_container/app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '@app/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environments/environment';

// Routing
import { AppRoutingModule } from '@app/routing/app-routing.module';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from '@app/routing/route-serializer';

// Pages
import { PagesCollectionModule } from '@app/pages';

// Data dimension
import { ApplicationModule } from '@application/application.module';

// Components
import { ComponentCollectionModule } from '@app/components';

// Shared services
import { AlertsModule } from '@app/domain/alerts/alerts.module';
import { ModalCommunicationService } from '@app/services/modal-communication.service';
import { MainModule } from './domain/main/main.module';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    ClipboardModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    PagesCollectionModule,
    ApplicationModule,
    AlertsModule,
    ComponentCollectionModule,
    MainModule,
    EffectsModule.forRoot([]),
  ],
  providers: [
    TitleCasePipe,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    ModalCommunicationService,
    ApiService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

