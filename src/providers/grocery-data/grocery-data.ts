import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

/*
  Generated class for the GroceryDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceryDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GroceryDataProvider Provider');
  }

  orderList(order): Observable<any> {
    console.log("inside grocery list data service");
    return this.http.post("http://45.33.34.17/api/grocery", order).map(res => {
      return res
    });
  }

}
