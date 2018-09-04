export class FileUpload {

  $key: string;
  name: string;
  url: string;
  file: File;

  constructor(file?: File) {
    if (file) {
    this.file = file;
      
    }
  }
}
