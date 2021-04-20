import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipperComponent } from './shipper.component';
import { OrderComponent } from './order/order.component';
import { InforComponent } from './infor/infor.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {path:'',component:ShipperComponent,
    children:[
      {path:'',component:OrderComponent},
      {path:'shipperinfor',component:InforComponent},
      {path:'map',component:MapComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipperRoutingModule { }
