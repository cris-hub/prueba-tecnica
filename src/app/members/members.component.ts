import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserModel } from '../common/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../common/services/fire/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../common/services/fire/auth.service';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MENU } from '../common/const/nav';
import { ToastrService } from 'ngx-toastr';
import { filterService } from '../product/product/filter.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }
  @Input() itemsTabs: MenuItem[];
  @Input() itemsNav: MenuItem[];
  @Input() shearch: boolean = false;
  user: UserModel = null
  activeMenu: Boolean = false;
  constructor(
    public authService: AuthService,
    public userService: UserService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    public filterService: filterService,

  ) {
  }
  ngOnInit(): void {
    this.userService.getEmittedValue()
      .subscribe(item => {
        if (item) {
          this.itemsTabs = this.userService.itemsTabs
          if(this.itemsTabs)
          {
          if(this.itemsTabs.length>0)
            this.activeMenu = true
            else 
            this.activeMenu = false
          }
      
        }
      });

  }

  logout() {
    this.itemsTabs= this.userService.itemsTabs = []


    this.authService.doLogout()
      .then((res) => {
        this.itemsTabs = []
        this.user = null
        this.activeMenu = false

        this.router.navigate(['/'])
      }, (error) => {
        this.user = null

      });
  }
}
