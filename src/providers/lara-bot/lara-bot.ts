import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


/*
  Generated class for the LaraBotProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LaraBotProvider {
  readonly token = '8a6c3d7462744742adac036e9de6cc00';
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation: Observable<String>;
  product: Observable<any>;

  constructor(public http: HttpClient) {
    console.log('Hello LaraBotProvider Provider');
  }


  converse(msg: string) {
    return this.client.textRequest(msg)
      .then(res => {
        return res.result;
      });
  }
}
