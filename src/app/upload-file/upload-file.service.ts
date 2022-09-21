import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { observeNotification } from 'rxjs/internal/Notification';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  upload(files: Set<File>, url: string){
    
    const formData = new FormData();
    files.forEach( file => formData.append('file', file, file.name));
    
    // modo de criar request puro no Angular / pode ser feito com form.value ao inves de formData.
    // const request = new HttpRequest('POST', url, formData);
    // return this.http.request(request);

    return this.http.post(url,formData, {
      observe: "events",
      reportProgress: true  
    });
  }
}
