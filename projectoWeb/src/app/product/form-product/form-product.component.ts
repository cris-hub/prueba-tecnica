import { Component, OnInit, Input } from '@angular/core';
import { ProductoService } from '../producto.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ProductModel } from '../../common/models/product.model';
import { UploadFileService } from '../../common/services/fire/upload-file.service';
import { FileUpload } from '../../common/models/fileupload';
import { DomSanitizer } from '@angular/platform-browser';
import { ConstrieModel } from '../../common/models/contries.model';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],

})
export class FormProductComponent implements OnInit {
  @Input() public contries : ConstrieModel[]
  constructor(
    public productoService: ProductoService,
    public sanitizer: DomSanitizer,
    public uploadFileService: UploadFileService,
    private tostr: ToastrService) { }

  ngOnInit() {

    this.resetForm();
  }

  onSubmit(productoForm: NgForm) {
    if (!productoForm.valid) {
      return
    }
    if (productoForm.value.$key == null)
      this.productoService.insertProduct(productoForm.value);
    else
      this.productoService.updateProduct(productoForm.value);
    this.resetForm(productoForm);
    this.tostr.success('Submitted Succcessfully', 'Employee Register');
  }
  asignFile(keyFile: string) {
    let x = this.uploadFileService.getFileData(keyFile);
    x.snapshotChanges().subscribe(res => {
      var y = res.payload.toJSON();
      y["$key"] = res.key;
      this.productoService.selectedProduct.fileUploadKey = y["$key"]
     this.uploadFileService.getileStorage(y['name']).then(res => {
      y["url"] =  res
      if (this.productoService.selectedProduct.fileUpload) {
        Object.assign(this.productoService.selectedProduct.fileUpload,y)
      }else {
      this.productoService.selectedProduct.fileUpload = y as FileUpload

      }
      })
    })
  }
  resetForm(productoForm?: NgForm) {
    if (productoForm != null)
      productoForm.reset();
    this.productoService.selectedProduct = <ProductModel>{
      $key: null,
      name: '',
      details: '',
      releaseDate: null,
      mailManufacturer: '',
      countryManufacturing: '',
      Price: null,
      available: null,
      sold: null,
      fileUpload : new FileUpload()
    }
  }

}
