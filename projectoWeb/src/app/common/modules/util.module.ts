import { NgModule } from '@angular/core'
import { PaginationComponent } from '../directivas/paginacion/paginacion.component';
import { ConfirmacionComponent } from '../directivas/confirmacion/confirmacion.component';
import { CommonModule } from '@angular/common';
import { ValidacionDirective } from '../directivas/validacion/validacion.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TabMenuModule } from 'primeng/tabmenu';
import { FormUploadComponent } from '../components/form-upload/form-upload.component';
import { SafePipe } from '../pipes/sife.pipe';
import { OrderModule } from 'ngx-order-pipe';




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    Ng2SearchPipeModule,
    AngularFontAwesomeModule,
    TabMenuModule,
    OrderModule,
  ],

  declarations: [
    PaginationComponent,
    ConfirmacionComponent,
    ValidacionDirective,
    SafePipe,
    FormUploadComponent,
  ],

  exports: [
    PaginationComponent,
    FormUploadComponent,
    ConfirmacionComponent,
    ValidacionDirective,
    FormsModule,
    AngularFontAwesomeModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    TabMenuModule,
    SafePipe,
    OrderModule
  ],

})

export class UtilModule { }
