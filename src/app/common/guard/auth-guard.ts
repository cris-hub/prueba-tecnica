import { CanActivate, Router } from '@angular/router';

import { Injectable } from "@angular/core";
import { AuthService } from '../services/fire/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../services/fire/user.service';

@Injectable()
export class AuthGuard  {
 
  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        this.router.navigate(['/user']);
        return resolve(false);
      }, err => {
        return resolve(true);
      })
    })
  }
}
