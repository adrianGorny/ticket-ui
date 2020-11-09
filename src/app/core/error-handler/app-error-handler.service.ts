import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfig } from '@core/config/app-config';

@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private snackBar: MatSnackBar, private readonly zone: NgZone) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    const displayMessage = 'An error occurred.';

    this.showNotification(displayMessage, 'Error');

    super.handleError(error);
  }

  private showNotification(message: string, action?: string) {
    this.zone.run(() =>
      this.snackBar.open(message, action, {
        duration: AppConfig.snackBarDuration,
        panelClass: 'error-notification-overlay',
      })
    );
  }
}
