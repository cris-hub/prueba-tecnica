import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './common/guard/auth-guard';
import { MembersComponent } from './members/members.component';
import { UserResolver } from './members/user.resolver';
import { AppComponent } from './app.component';

import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

  //Common
  { path: '', redirectTo: '/login' ,pathMatch: 'full'  },
  { path: 'login', component: LoginComponent , canActivate: [AuthGuard] },
  { path: 'register', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'user', component: ProfileComponent, resolve: { data: UserResolver } },

  {

    path: 'products', loadChildren: './product/product.module#ProductModule'
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
