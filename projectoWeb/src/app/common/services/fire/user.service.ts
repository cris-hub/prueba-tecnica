import { Injectable, Output, EventEmitter } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ToastrService } from "ngx-toastr";
import { UserModel } from "../../models/user.model";
import { MenuItem } from "primeng/api";

@Injectable()
export class UserService {
  public isUserLogin: Boolean = false;
  public user: UserModel = new UserModel();
  public itemsTabs
  @Output() fire: EventEmitter<any> = new EventEmitter();
  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private toastrService: ToastrService
  ) {
    this.itemsTabs = []
  }

  change() {
    console.log('change started');
    this.fire.emit(true);
  }
  getEmittedValue() {
    return this.fire;
  }
  getCurrentUser() {
    let tab = this
    let promise = new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        // tab = [{ label: 'products', routerLink: '/products' }];
        // tab.unshift(<MenuItem>{ label: 'Profile', routerLink: '/user' })
        if (user) {
          tab.itemsTabs = [{ label: 'products', routerLink: '/products' }];
          Object.assign(tab.user, user)

          tab.fire.emit(tab.user)
          tab.itemsTabs.unshift(<MenuItem>{ label: 'Profile', routerLink: '/user' })
          resolve(user);

        } else {
          reject('No user logged in');
        }
      })

    })
    return promise
  }

  updateCurrentUser(value : UserModel) {
    return new Promise((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name ? value.name : user.displayName ,
        photoURL: value.image ? value.image : user.photoURL
      }).then(res => {
        resolve(res)
      }, err => reject(err))
    })
  }
}