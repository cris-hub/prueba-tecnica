import { Component, OnInit } from '@angular/core';
import { ProductoService } from './producto.service';
import { ContriesService } from '../common/services/entity/contries.service';
import { ConstrieModel } from '../common/models/contries.model';
import { filterService } from './product/filter.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductoService]

})
export class ProductsComponent implements OnInit {
  public contries: ConstrieModel[] = []

  constructor(
    private productoService: ProductoService,
    private contriesService: ContriesService,

    
  ) { }


  ngOnInit() {

  }


}
