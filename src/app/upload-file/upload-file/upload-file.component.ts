import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { UploadFileService } from './../upload-file.service';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {

  files!: Set<File>;
  submit: boolean = false;
  sub: Subscription[] = [];
  progress: number = 0;

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe());
    
  }

  onChange(event: any) {
    const selectedFiles = (<FileList>event.srcElement.files);

    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i]);
    }
    if (this.fileExist()) {
      this.submit = true;
    } else {
      this.submit = false;
    }
    console.log(this.files);
    this.progress = 0;
  }

  onUpload() {
    if (this.fileExist()) {
      this.sub.push(this.service.upload(this.files,`${environment.BASE_URL}/upload`)
      .pipe(
        uploadProgress(progress => {
          console.log(progress);
          this.progress = progress;
        }),
        filterResponse()
      ).subscribe(res => console.log('Upload Concluído')));


      // .subscribe({
      //   next: (event: HttpEvent<Object>) => {
      //     // HttpEventType
      //     // console.log(event);
      //     if(event.type === HttpEventType.Response){ 
      //       console.log('Upload Concluído');
      //     } else  if (event.type === HttpEventType.UploadProgress) {
      //       const percentDone = Math.round((event.loaded * 100) / (event.total? event.total: 1));
      //     // console.log(`Progresso ${percentDone}%`);
      //       this.progress = percentDone; 
      //     }
      //   }
      // }));
    }
  }

  fileExist(): boolean {
    return this.files && this.files.size > 0 ? true : false;
  }

}
