import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class UrlPrefixInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({url: `${environment.endpointKey}/${request.url}`});
    return next.handle(request);
  }
}
