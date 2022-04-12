import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BtnCellRenderer } from './components/renderer/btn-cell-renderer.component';
import { SignupComponent } from './components/signup/signup.component';
import { SettingsComponent } from './components/welcome/settings/settings.component';
import { UserComponent } from './components/welcome/user/user.component';
import { WelcomeComponent } from './components/welcome/welcome.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    NotfoundComponent,
    WelcomeComponent,
    UserComponent,
    SettingsComponent,
    BtnCellRenderer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    AgGridModule.withComponents([BtnCellRenderer])
  ],
  providers: [{
    provide: JWT_OPTIONS, useValue: JWT_OPTIONS
  },
    JwtHelperService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
