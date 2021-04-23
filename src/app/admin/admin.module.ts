import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/show/products.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule }   from '@angular/forms';
import { AddComponent } from './products/add/add.component';
import { EditComponent } from './products/edit/edit.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CategoriesComponent } from './categories/show/categories.component';
import { AddcategoryComponent } from './categories/addcategory/addcategory.component';
import { EditcategoryComponent } from './categories/editcategory/editcategory.component';
import { ShowComponent } from './users/show/show.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { EdituserComponent } from './users/edituser/edituser.component';
import { AddadminComponent } from './users/addadmin/addadmin.component';
import { ShoworderComponent } from './orders/showorder/showorder.component';
import { DetailorderComponent } from './orders/detailorder/detailorder.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { ChartsModule } from 'ng2-charts';
import { ContainerComponent } from './container/container.component';
import { PromotionComponent } from './promotion/promotion.component';
import { AddpromotionComponent } from './promotion/addpromotion/addpromotion.component';
import { EditpromotionComponent } from './promotion/editpromotion/editpromotion.component';
import { DocumentEditorAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { AddwarehouseComponent } from './warehouse/addwarehouse/addwarehouse.component';
import { SupplierComponent } from './supplier/supplier.component';
import { AddsupplierComponent } from './supplier/addsupplier/addsupplier.component';
import { EditsupplierComponent } from './supplier/editsupplier/editsupplier.component';
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
import { StoresComponent } from './stores/stores.component';
import { AddstoreComponent } from './stores/addstore/addstore.component';
import { EditstoreComponent } from './stores/editstore/editstore.component';
import { WhstoreComponent } from './stores/whstore/whstore.component';

@NgModule({
  declarations: [AdminComponent, ProductsComponent, TopbarComponent, SidebarComponent, AddComponent, EditComponent, CategoriesComponent, AddcategoryComponent, EditcategoryComponent, ShowComponent, EdituserComponent, AddadminComponent, ShoworderComponent, DetailorderComponent, StatisticalComponent, ContainerComponent, PromotionComponent,AddpromotionComponent, EditpromotionComponent, WarehouseComponent, AddwarehouseComponent, SupplierComponent, AddsupplierComponent, EditsupplierComponent,DetailsupplierComponent, OrderwarehouseComponent, AddorderwarehouseComponent, EditorderwarehouseComponent, DetailorderwarehouseComponent, DeliverybillComponent, VouchersComponent, AddvoucherComponent, DetailvoucherComponent, EditVoucherComponent, ShipperComponent, AccessoriesComponent, StoresComponent, AddstoreComponent, EditstoreComponent, WhstoreComponent],
  imports: [
    CKEditorModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    JwPaginationModule,
    NgxPaginationModule,
    ChartsModule,
    DocumentEditorAllModule    
  ]
})
export class AdminModule {}
