import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ProductModel } from "../common/models/product.model";

@Injectable()
export class ProductoService {
  ProducList: AngularFireList<any>;



  selectedProduct: ProductModel = new ProductModel();
  constructor(
    private firebase: AngularFireDatabase) { }

  getData() {
    this.ProducList = this.firebase.list('Products');
    return this.ProducList;
  }

  insertProduct(productModel: ProductModel) {
    debugger
    delete productModel['$key']
    delete this.selectedProduct['$key']
    delete this.selectedProduct.fileUpload['$key']
    Object.assign(productModel, this.selectedProduct)
    this.ProducList.push(productModel);
  }

  updateProduct(productModel: ProductModel) {
    Object.assign(productModel, this.selectedProduct)
    let key = productModel.$key


    delete productModel['$key']
    delete productModel.fileUpload['$key']
 
    this.ProducList.update(key,
      productModel);
  }

  deleteProduct($key: string) {
    this.ProducList.remove($key);
  }

}
