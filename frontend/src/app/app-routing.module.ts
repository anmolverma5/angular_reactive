import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SignupComponent } from './components/signup/signup.component';
import { SettingsComponent } from './components/welcome/settings/settings.component';
import { UserComponent } from './components/welcome/user/user.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { ApiService } from './shared/api.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'welcome', component: WelcomeComponent,
  canActivate: [AuthenticationGuard]
},
  { path: 'settings', component: SettingsComponent },
  { path: 'user', component: UserComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard, ApiService]
})
export class AppRoutingModule { }
