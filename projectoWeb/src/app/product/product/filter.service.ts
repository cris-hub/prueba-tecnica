import { Injectable } from "@angular/core";


@Injectable()
export class filterService {

  filter: string = '';
  order: string = 'name';
  
  constructor(
   ) { }

}
