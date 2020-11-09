import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutes } from '@core/config/app-routes';
import { NotFoundComponent } from '@root/not-found/not-found.component';
import { OverviewComponent } from '@root/overview/overview.component';

const routes: Routes = [
  { path: AppRoutes.MAIN, redirectTo: AppRoutes.SEARCH, pathMatch: 'full' },
  {
    path: AppRoutes.SEARCH,
    loadChildren: () => import('@search/search.module').then(m => m.SearchModule)
  },
  {
    path: AppRoutes.OVERVIEW,
    component: OverviewComponent
  },
  {
    path: AppRoutes.NOT_FOUND,
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: AppRoutes.NOT_FOUND
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
