import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private _http:HttpClient) { }

  read(){
    return this._http.get('http://localhost:3000/user');
  }

  create(obj:any){
    return this._http.post('http://localhost:3000/user',obj); 
  }

  update(id:any,obj:any){
    return this._http.put('http://localhost:3000/user/'+id,obj);
  }

  delete(id:any){
    return this._http.delete('http://localhost:3000/user/'+id);
  }
  
}
