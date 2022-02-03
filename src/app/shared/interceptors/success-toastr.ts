import Toastr from "toastr2";
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';


enum API {
  DELETE = 'DELETE',
  PUT = 'PUT',
  POST = 'POST'
}


@Injectable()
export class SuccessToastr implements HttpInterceptor {
  private toastr = new Toastr()

  constructor() {
  }


  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {
          switch (request.method) {
            case API.POST: {
              this.toastr.success('Created', '', {timeOut: 1500})
              break;
            }
            case API.PUT: {
              this.toastr.success('Updated', '', {timeOut: 1500})
              break;
            }
            case API.DELETE: {
              this.toastr.success('Deleted', '', {timeOut: 1500})
              break;
            }
          }
        }

      })
    );
  }
}
