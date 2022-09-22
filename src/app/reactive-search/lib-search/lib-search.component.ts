import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';

import { LibSearchService } from './lib-search.service';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  results$!: Observable<any>;
  total: number = 0;


  constructor(private service: LibSearchService) { }

  ngOnInit(): void {
  }

  onSearch() {
    console.log(this.queryField.value);

    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {
      this.results$ = this.service.search(value)
        .pipe(
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results)
        );
    }
  }

}
