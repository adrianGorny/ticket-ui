import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { SearchComponent } from '@search/search.component';
import { SearchListComponent } from '@search/search-list/search-list.component';
import { SearchHeaderComponent } from '@search/search-header/search-header.component';
import { StoreModule } from '@ngrx/store';
import * as fromSearch from './store/reducers/search.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './store/effects/search.effects';
import { SearchKeyboardComponent } from './search-keyboard/search-keyboard.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchListComponent,
    SearchHeaderComponent,
    SearchKeyboardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchComponent
      }
    ]),
    StoreModule.forFeature(fromSearch.searchFeatureKey, fromSearch.searchReducer),
    EffectsModule.forFeature([SearchEffects])
  ]
})
export class SearchModule {}
