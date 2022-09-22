import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { observeNotification } from 'rxjs/internal/Notification';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  upload(files: Set<File>, url: string) {

    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));

    // modo de criar request puro no Angular / pode ser feito com form.value ao inves de formData.
    // const request = new HttpRequest('POST', url, formData);
    // return this.http.request(request);

    return this.http.post(url, formData, {
      observe: "events",
      reportProgress: true
    });
  }
  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json'
      // reportProgress
      // tem que setar content-length no backend.
    });

  }

  handleFile(res: any, fileName: string) {
    // cria o arquivo e informa pro browser o tipo dele.
    const file = new Blob([res], {
      type: res.type
    });

    // Hack javascript(código javascript)

    // Internet Explorer
    if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveOrOpenBlob(file);
      return;
    }

    //   // Google Chrome

    //   // cria uma arquivo de url utilizando um objeto file.
    //   const blob = window.URL.createObjectURL(file);

    //   // cria um link e seta o href com url
    //   const link = document.createElement('a');
    //   link.href = blob;

    //   // escolhe o nome do arquivo
    //   link.download = 'report.xls';

    //   // clica no link por trás dos panos.
    //   link.click();

    //   // remove o arquivo
    //   window.URL.revokeObjectURL(blob);
    //   link.remove();

    // }));

    // Google Chrome e Firefox

    // cria uma arquivo de url utilizando um objeto file.
    const blob = window.URL.createObjectURL(file);

    // cria um link e seta o href com url
    const link = document.createElement('a');
    link.href = blob;

    // escolhe o nome do arquivo
    link.download = fileName;

    // clica no link por trás dos panos.
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    // remove o arquivo
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);

  }
}
