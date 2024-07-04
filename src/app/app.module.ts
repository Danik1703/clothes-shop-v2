import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { JacketsCatalogComponent } from './jackets-catalog/jackets-catalog.component'; // Убедитесь, что этот импорт есть здесь

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    JacketsCatalogComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
