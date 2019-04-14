import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_gaurds/auth.gaurd';
import { LoginComponent }   from './login/login.component';
import { HomeComponent }   from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserAgreementComponent } from './tnc/user-agreement.component';
import { RegistrationOtpComponent } from './tnc/registration-otp.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'signup',  component: SignUpComponent },
  { path: 'agree/:id',  component: UserAgreementComponent },
  { path: 'verify-otp/:id',  component: RegistrationOtpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
export const routedComponents = [
                                  SignUpComponent,
                                  RegistrationOtpComponent,
                                  UserAgreementComponent,
                                  LoginComponent,
                                  HomeComponent
                                ];
