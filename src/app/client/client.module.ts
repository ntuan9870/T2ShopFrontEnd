import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ProductsComponent } from './products/products.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DetailproductComponent } from './detailproduct/detailproduct.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { ThanhtoanComponent } from './cart/thanhtoan/thanhtoan.component';
import { CompleteComponent } from './cart/complete/complete.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './profile/history/history.component';
import { ChangepassComponent } from './profile/changepass/changepass.component';
import { DetailComponent } from './profile/history/detail/detail.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { RatingModule } from 'ng-starrating';
import { FilterComponent } from './filter/filter.component';
import {NgxPayPalModule } from 'ngx-paypal';
import { SupplierComponent } from './supplier/supplier.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { PromotionmaxComponent } from './promotionmax/promotionmax.component';

@NgModule({
  declarations: [ClientComponent, ProductsComponent, TopbarComponent, SidebarComponent, FooterComponent, HomeComponent, DetailproductComponent, CategoryComponent, CompleteComponent, CartComponent, ThanhtoanComponent, SearchComponent, ProfileComponent, HistoryComponent, ChangepassComponent, DetailComponent, FilterComponent, SupplierComponent, ChatbotComponent, PromotionmaxComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    JwPaginationModule,
    NgxPaginationModule,
    RatingModule,
    NgxPayPalModule
  ]
})
export class ClientModule { }
