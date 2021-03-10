import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipperComponent } from '../admin/shipper/shipper.component';
import { AuthComponent } from './auth.component';
import { EntercodeComponent } from './forgotpassword/entercode/entercode.component';
import { EnternewpassComponent } from './forgotpassword/enternewpass/enternewpass.component';
import { SendemailComponent } from './forgotpassword/sendemail/sendemail.component';
import { LoginComponent } from './login/login.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { LoginshipperComponent } from './loginshipper/loginshipper.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'',component:AuthComponent,
    children:[
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
      {path:'forgotpassword/sendemail',component:SendemailComponent},
      {path:'forgotpassword/entercode/:email',component:EntercodeComponent},
      {path:'forgotpassword/enternewpass/:email',component:EnternewpassComponent},
      {path:'loginadmin',component:LoginadminComponent},
      {path:'loginshipper',component:LoginshipperComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
