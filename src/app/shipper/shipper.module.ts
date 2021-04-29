import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipperRoutingModule } from './shipper-routing.module';
import { ShipperComponent } from './shipper.component';
import { TopbarComponent } from './topbar/topbar.component';
import { OrderComponent } from './order/order.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InforComponent } from './infor/infor.component';
import { FormsModule }   from '@angular/forms';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import {GoogleMapsModule} from '@angular/google-maps'
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AgmDirectionModule } from 'agm-direction';


@NgModule({
  declarations: [ShipperComponent, TopbarComponent, OrderComponent, InforComponent, MapComponent],
  imports: [
    CommonModule,
    ShipperRoutingModule,
    NgxPaginationModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAofrlMwlRyXzbZNtsBfdkRl0GXZRsHpnk",
      libraries: ['places']
    }),
    AgmDirectionModule
  ]
})
export class ShipperModule { }
