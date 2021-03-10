import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipperRoutingModule } from './shipper-routing.module';
import { ShipperComponent } from './shipper.component';
import { TopbarComponent } from './topbar/topbar.component';
import { OrderComponent } from './order/order.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InforComponent } from './infor/infor.component';
import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [ShipperComponent, TopbarComponent, OrderComponent, InforComponent],
  imports: [
    CommonModule,
    ShipperRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class ShipperModule { }
