import { environment } from './../../../environments/environment';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { UploadFileService } from './../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {

  files!: Set<File>;
  submit: boolean = false;
  sub: Subscription[] = [];

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
  }

  onUpload() {
    if (this.fileExist()) {
      this.sub.push(this.service.upload(this.files,`${environment.BASE_URL}/upload`)
      .subscribe(response => console.log('Upload Concluído')));
    }
  }

  fileExist(): boolean {
    return this.files && this.files.size > 0 ? true : false;
  }

}
