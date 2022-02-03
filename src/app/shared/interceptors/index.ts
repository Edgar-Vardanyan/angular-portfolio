import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {UrlPrefixInterceptor} from "./url-prefix.interceptor";
import {SuccessToastr} from './success-toastr';
import {ErrorToastrInterceptor} from "./error-toastr.interceptor";

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: UrlPrefixInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: SuccessToastr, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ErrorToastrInterceptor, multi: true},
];
