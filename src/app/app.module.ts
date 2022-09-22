import { CursosModule } from './cursos/cursos.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ReactiveSearchModule } from './reactive-search/reactive-search.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CursosModule,
    HttpClientModule,
    SharedModule,
    ReactiveSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
