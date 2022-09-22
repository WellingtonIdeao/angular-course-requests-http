import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class LibSearchService {

  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  readonly FIELDS = 'filename,description,version'; 
  
  constructor(private http: HttpClient) { }

  search(value: string) {

    // 1º modo de passar parâmetros (não reativo)
    const params_ = {
      search: value,
      fields: this.FIELDS
    }
    // 2º modo de passar parâmetros(recomendado, não reativo) 
    let params = new HttpParams();
    params = params.set('search', value);

    // passar mais de um valor para  o mesmo parâmetros (search)
    // params = params.append('search', '2');
    
    params = params.set('fields', this.FIELDS);
    
    // return this.http.get(this.SEARCH_URL, {
    //   params: {
    //     search: value,
    //     fields: this.FIELDS
    //   }
    // });
    return this.http.get(this.SEARCH_URL, {params});
  }
}

