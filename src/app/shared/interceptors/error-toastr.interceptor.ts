import Toastr from "toastr2";
import {Injectable} from '@angular/core';
import {catchError} from "rxjs/operators";
import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class ErrorToastrInterceptor implements HttpInterceptor {

  private tostr = new Toastr()

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.tostr.error(err.message);
          return throwError(() => err);
        })
      );
  }
}
