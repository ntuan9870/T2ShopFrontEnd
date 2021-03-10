import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/guards/auth.guard';
import { ShipperService } from './services/shipper.service';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./client/client.module').then(m=>m.ClientModule)},
  {path:'admin',canActivate:[AuthGuard],loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'shipper',canActivate:[ShipperService],loadChildren:()=>import('./shipper/shipper.module').then(m=>m.ShipperModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
