import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FiltersComponent} from './components/filters/filters.component';
import {FormComponent} from './components/form/form.component';
import {ListComponent} from './components/list/list.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {CardComponent} from './components/list/common/components/card/card.component';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from './common/services/api.service';
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localeRu);

@NgModule({
  declarations: [AppComponent, FiltersComponent, FormComponent, ListComponent, CardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher,
    },
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
    ApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
