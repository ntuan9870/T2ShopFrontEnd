import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/guards/auth.guard';
import { JwPaginationModule } from 'jw-angular-pagination';
import { SendemailComponent } from './auth/forgotpassword/sendemail/sendemail.component';
import { EntercodeComponent } from './auth/forgotpassword/entercode/entercode.component';
import { EnternewpassComponent } from './auth/forgotpassword/enternewpass/enternewpass.component';
import { CountdownModule } from 'ngx-countdown';
import { RatingModule } from 'ng-starrating';
import { DocumentEditorAllModule } from '@syncfusion/ej2-angular-documenteditor';

import {registerLocaleData} from '@angular/common'
import localeVi from '@angular/common/locales/vi'
import { LoginadminComponent } from './auth/loginadmin/loginadmin.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import {SocialLoginModule,AuthServiceConfig,FacebookLoginProvider,GoogleLoginProvider} from 'ng4-social-login';
import { LoginshipperComponent } from './auth/loginshipper/loginshipper.component';


const config= new AuthServiceConfig([
    {
      id:GoogleLoginProvider.PROVIDER_ID,
      provider:new GoogleLoginProvider('881831905664-hq421q4ubrgenkclb638au7qhq1ucn1a.apps.googleusercontent.com')
    },
    {
      id:FacebookLoginProvider.PROVIDER_ID,
      provider:new FacebookLoginProvider('576688693221910')
    }
  ],false);
export function provideConfig(){
  return config;
}

registerLocaleData(localeVi,'vi-VN')

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SendemailComponent,
    EntercodeComponent,
    EnternewpassComponent,
    LoginadminComponent,
    LoginshipperComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    JwPaginationModule,
    CountdownModule,
    RatingModule,
    NgxCaptchaModule,
    SocialLoginModule,
    DocumentEditorAllModule
  ],
  providers: [AuthGuard,{provide:AuthServiceConfig,useFactory:provideConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
