import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertType } from '../models/alert.model';
import { AlertService } from '../services/alert.service';
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this.handleError(error);
        return throwError(error.error.message);
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    this.alertService.addAlert(error.error.message, AlertType.ERROR, true);
  }
}
