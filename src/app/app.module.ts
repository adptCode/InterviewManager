import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { FilterComponent } from './components/filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule // He eligido ReactiveForms para el formulario
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
