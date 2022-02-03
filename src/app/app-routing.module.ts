import {NgModule} from '@angular/core';
import {LoginGuard} from "./shared/guards";
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
