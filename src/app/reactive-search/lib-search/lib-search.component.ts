import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, tap, filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs';

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

    // programação / busca reativa e com programação funcional.

    this.results$ = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 1),
        //delay (200mseg)
        debounceTime(200),
        // mesmo valor até mudar
        distinctUntilChanged(),
        // tap(console.log),
        switchMap(value => this.service.search(value)),
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
      );

  }

  onSearch() {

    // programação / busca não-reativa.

    //console.log(this.queryField.value);

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
