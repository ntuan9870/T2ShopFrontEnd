import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CompleteComponent } from './cart/complete/complete.component';
import { ThanhtoanComponent } from './cart/thanhtoan/thanhtoan.component';
import { CategoryComponent } from './category/category.component';
import { ClientComponent } from './client.component';
import { DetailproductComponent } from './detailproduct/detailproduct.component';
import { FilterComponent } from './filter/filter.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ChangepassComponent } from './profile/changepass/changepass.component';
import { DetailComponent } from './profile/history/detail/detail.component';
import { HistoryComponent } from './profile/history/history.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SupplierComponent } from './supplier/supplier.component';
import { FovoriteproductComponent } from './profile/fovoriteproduct/fovoriteproduct.component';

const routes: Routes = [
  {path:'',component:ClientComponent,
    children:[
      {path:'products/:id',component:DetailproductComponent},
      {path:'categories/:id',component:CategoryComponent},
      {path:'',component:HomeComponent},
      {path:'home',component:HomeComponent},
      {path:'cart',children:[
        {path:'',component:CartComponent},
        {path:'thanhtoan/:id',component:ThanhtoanComponent},
        {path:'complete',component:CompleteComponent}
      ]},
      {path:'search/:key',component:SearchComponent},
      {path:'filter',component:FilterComponent},
      {path:'profile',component:ProfileComponent},
      {path:'profile/history',children:[
        {path:'',component:HistoryComponent},
        {path:'detail/:id',component:DetailComponent},
      ]},
      {path:'profile/changepass',component:ChangepassComponent},
      {path:'profile/fovoriteproduct',component:FovoriteproductComponent},
      {path:'supplier/confirm/:id',component:SupplierComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
