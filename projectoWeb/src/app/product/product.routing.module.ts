import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ProductsComponent } from './products.component';
import { UserResolver } from '../members/user.resolver';



const routes: Routes = [



  { path: '', component: ProductsComponent,resolve: { data: UserResolver } },



];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
