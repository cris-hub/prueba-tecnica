import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { ToastrService } from 'ngx-toastr';
import { ConstrieModel } from '../../common/models/contries.model';
import { ContriesService } from '../../common/services/entity/contries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../common/models/user.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public contries: ConstrieModel[] = []
  user: UserModel = new UserModel();

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,

    private contriesService: ContriesService
  ) { }



  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }else {
        this.router.navigate(['/login'])
      }
    })
    this.getContries()
  }
  getContries() {
    this.contriesService.getContries().subscribe(res => {
      this.contries = res;
    })
  }
}
