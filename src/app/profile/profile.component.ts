import { Component, OnInit } from '@angular/core';
import { UserModel } from '../common/models/user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../common/services/fire/user.service';
import { AuthService } from '../common/services/fire/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UploadFileService } from '../common/services/fire/upload-file.service';
import { FileUpload } from '../common/models/fileupload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user: UserModel = new UserModel();
  profileForm: FormGroup;


  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private uploadFileService: UploadFileService
  ) {

  }

  ngOnInit(): void {

    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    })
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }
  asignarDocumento(idDocuemtn) {
    let x = this.uploadFileService.getFileData(idDocuemtn);
    let user;

    x.snapshotChanges().subscribe(res => {
      var y = res.payload.toJSON();
      y["$key"] = res.key;
      this.uploadFileService.getileStorage(y['name']).then(res => {
        y["url"] = res
        this.user.image = y["url"]
        this.save(this.user)
      })
    })

  }


  save(value) {
    this.userService.updateCurrentUser(value)
      .then(res => {
        console.log(res);
      }, err => console.log(err))
  }
}
