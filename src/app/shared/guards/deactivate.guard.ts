import {Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {CanDeactivate, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<{ canDeactivate: () => boolean }> {

  canDeactivate(
    component: { canDeactivate: () => boolean },
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate();
  }

}
