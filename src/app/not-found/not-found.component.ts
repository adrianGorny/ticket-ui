import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '@core/config/app-routes';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate([AppRoutes.MAIN]);
  }
}
