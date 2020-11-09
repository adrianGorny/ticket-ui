import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@root/app-routing.module';
import { AppComponent } from '@root/app.component';

import { NotFoundComponent } from '@root/not-found/not-found.component';
import { CoreModule } from '@core/core.module';
import { HeaderComponent } from './header/header.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, HeaderComponent, OverviewComponent],
  imports: [
    CoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
