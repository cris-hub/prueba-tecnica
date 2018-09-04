import { FileUpload } from "./fileupload";

export class ProductModel {
  $key: string;
  name: string;
  details: string;
  releaseDate: Date;
  mailManufacturer: string;
  countryManufacturing : string;
  Price : number;
  available : number;
  sold : number;
  fileUploadKey : string
  fileUpload : FileUpload
  constructor() {

  }
}
