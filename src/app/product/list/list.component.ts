import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from '../../common/models/product.model';
import { DomSanitizer } from '@angular/platform-browser';
import { filterService } from '../product/filter.service';
import { PaginacionModel } from '../../common/models/PaginacionModel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],


})
export class ListComponent implements OnInit {
  ProductList: ProductModel[];
  public showImage: boolean = true;
  public paginacion: PaginacionModel;
  public reverse: boolean = false;
  constructor(
    public productoService: ProductoService,
    public filterService: filterService,
    public sanitizer: DomSanitizer,
    private tostr: ToastrService) { }


  ngOnInit() {
    this.paginacion = new PaginacionModel(1, 5);

    this.getData()
  }

  setOrder(order: string) {
    if (this.filterService.order === order) {
      this.reverse = !this.reverse;
    }


    this.filterService.order = order

  }

  getData() {
    let x = this.productoService.getData();
    x.snapshotChanges().subscribe(item => {
      this.ProductList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.ProductList.push(y as ProductModel);
        this.ProductList = this.ProductList.reverse()

      });
      this.paginacion.TotalRegistros = this.ProductList.length
    });

  }

  cambioPagina(page: any) {
    this.filterService.filter = ''
    this.filterService.order = 'name'

    this.paginacion.PaginaActual = page;
    this.getData();
  }
  limiteConsulta(event: any) {
    this.paginacion = new PaginacionModel(1, event);
    this.getData();
  }


  onEdit(emp: ProductModel) {
    document.getElementById('modalSugerir').click()
    this.productoService.selectedProduct = Object.assign({}, emp);

  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.productoService.deleteProduct(key);
      this.tostr.warning("Deleted Successfully", "Employee register");
    }
  }
}
