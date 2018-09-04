import { Component, OnInit, OnChanges } from '@angular/core';
import { LoaderService } from './common/services/entity/loaderService';
import { MenuItem } from 'primeng/api';
import { SimpleChanges } from '@angular/core';
import { UserModel } from './common/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {

  }
  user: UserModel = new UserModel();
  showLoader: boolean;
  itemsNav: MenuItem[]
  itemsTabs: MenuItem[]
  constructor(
    private loaderService: LoaderService,
  ) {
    this.showLoader = false;
  }

  ngOnInit() {


    this.itemsNav = [{ label: 
      "technical test" }];
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }

}
