import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddcategoryComponent } from './categories/addcategory/addcategory.component';
import { EditcategoryComponent } from './categories/editcategory/editcategory.component';
import { CategoriesComponent } from './categories/show/categories.component';
import { DetailorderComponent } from './orders/detailorder/detailorder.component';
import { ShoworderComponent } from './orders/showorder/showorder.component';
import { AddComponent } from './products/add/add.component';
import { EditComponent } from './products/edit/edit.component';
import { ProductsComponent } from './products/show/products.component';
import { AddadminComponent } from './users/addadmin/addadmin.component';
import { EdituserComponent } from './users/edituser/edituser.component';
import { ShowComponent } from './users/show/show.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { PromotionComponent } from './promotion/promotion.component';
import { AddpromotionComponent } from 'src/app/admin/promotion/addpromotion/addpromotion.component';
import { EditpromotionComponent } from './promotion/editpromotion/editpromotion.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { AddwarehouseComponent } from './warehouse/addwarehouse/addwarehouse.component';
import { SupplierComponent } from './supplier/supplier.component';
import { AddsupplierComponent } from './supplier/addsupplier/addsupplier.component';
import { EditsupplierComponent } from './supplier/editsupplier/editsupplier.component';
import { ContainerComponent } from './container/container.component';
import { DetailsupplierComponent } from './supplier/detailsupplier/detailsupplier.component';
import { OrderwarehouseComponent } from './warehouse/orderwarehouse/orderwarehouse.component';
import { AddorderwarehouseComponent } from './warehouse/orderwarehouse/addorderwarehouse/addorderwarehouse.component';
import { EditorderwarehouseComponent } from './warehouse/orderwarehouse/editorderwarehouse/editorderwarehouse.component';
import { DetailorderwarehouseComponent } from './warehouse/orderwarehouse/detailorderwarehouse/detailorderwarehouse.component';
import { DeliverybillComponent } from './warehouse/deliverybill/deliverybill.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { AddvoucherComponent } from './vouchers/addvoucher/addvoucher.component';
import { DetailvoucherComponent } from './vouchers/detailvoucher/detailvoucher.component';
import { EditVoucherComponent } from './vouchers/edit-voucher/edit-voucher.component';
import { ShipperComponent } from './shipper/shipper.component';
import { AccessoriesComponent } from './accessories/accessories.component';

const routes: Routes = [
  {path:'',component:AdminComponent,
    children:[
      {path:'products',
        children:[
          {path:'',component:ProductsComponent},
          {path:'show/:id',component:ProductsComponent},
          {path:'add/:id',component:AddComponent},
          {path:'edit/:id',component:EditComponent}
        ]
      },{
        path:'categories',
        children:[
          {path:'',component:CategoriesComponent},
          {path:'show',component:CategoriesComponent},
          {path:'add',component:AddcategoryComponent},
          {path:'add/edit/:id',component:EditcategoryComponent}
        ]
      },{
        path:'users',
        children:[
          {path:'show',component:ShowComponent},
          {path:'edit/:id',component:EdituserComponent},
          {path:'add',component:AddadminComponent}
        ]
      },{
        path:'orders',
        children:[
          {path:'show',component:ShoworderComponent},
          {path:'detail/:id/:user_id',component:DetailorderComponent}
        ]
      },
      {
        path:'statistical',component:StatisticalComponent 
      },
      {
        path:'',component:ContainerComponent 
      },
      {
        path:'promotion',
        children:[
          {path:'',component:PromotionComponent},
          {path:'add',component:AddpromotionComponent},
          {path:'edit/:id',component:EditpromotionComponent}
        ]
      },
      {
        path:'warehouse',
        children:[
          {path:'',component:WarehouseComponent},
          {path:'add',component:AddwarehouseComponent},
          {path:'order',component:OrderwarehouseComponent},
          {path:'order/add',component:AddorderwarehouseComponent},
          {path:'order/detail/:id',component:DetailorderwarehouseComponent},
          {path:'order/edit/:id',component:EditorderwarehouseComponent},
          {path:'deliverybill',component:DeliverybillComponent}
        ]
      },
      {
        path:'supplier',
        children:[
          {path:'',component:SupplierComponent},
          {path:'add',component:AddsupplierComponent},
          {path:'edit/:id',component:EditsupplierComponent},
          {path:'detail/:id',component:DetailsupplierComponent}
        ]
      },
      {
        path:'voucher',
        children:[
          {path:'',component:VouchersComponent},
          {path:'add',component:AddvoucherComponent},
          {path:'edit/:id',component:EditVoucherComponent},
          {path:'detailvoucher/:id',component:DetailvoucherComponent}
        ]
      },
      {
        path:'shipper',
        children:[
          {path:'',component:ShipperComponent}
          
        ]
      },
      {
        path:'accessories',
        children:[
          {path:'',component:AccessoriesComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
