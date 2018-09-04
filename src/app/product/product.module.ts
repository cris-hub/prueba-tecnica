import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product.routing.module';
import { UtilModule } from '../common/modules/util.module';
import { ListComponent } from './list/list.component';
import { FormProductComponent } from './form-product/form-product.component';
import { ProductoService } from './producto.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    UtilModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  declarations: [ListComponent,FormProductComponent,ProductComponent,ProductsComponent],
  exports: [FormProductComponent],

})
export class ProductModule { }
