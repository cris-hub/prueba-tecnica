import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FileUpload } from '../../models/fileupload';
import * as firebase from 'firebase';
import { query } from '@angular/animations';

@Injectable()
export class UploadFileService {
  FileUploadList: AngularFireList<FileUpload>;
  FileUpload: FileUpload
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase) { }

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    let result;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;

      }
    );
    return new Promise<any>((resolve, rej) => {
      let result = this.saveFileData(fileUpload).then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        rej(err);
      })

    })
  }

  private saveFileData(fileUpload: FileUpload) {
    fileUpload.url = this.basePath +'/'+ fileUpload.file.name
    fileUpload.name = fileUpload.file.name

    let result = this.db.list(`${this.basePath}/`).push(fileUpload);
    return result;
  }


  getFilesData() {
    this.FileUploadList = this.db.list('uploads');
    return this.FileUploadList;
  }
  getFileData( keyFile : string) {
    return this.db.object('uploads/' + keyFile)
  }

  // getFileUploads(numberItems): AngularFireList<FileUpload> {
  //   return this.db.list(this.basePath, ref =>
  //     ref.limitToLast(numberItems));
  // }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.$key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

   getileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    return storageRef.child(`${this.basePath}/${name}`).getDownloadURL()
  }
}

