import {NgModule} from '@angular/core';
import {LoginGuard} from "./shared/guards";
import {LoginComponent} from "./components/login/login.component";
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard-module/dashboard.module').then(m => m.DashboardModule)
  },
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
