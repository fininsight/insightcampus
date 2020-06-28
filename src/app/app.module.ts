import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
   return localStorage.getItem('token');
 }

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      JwtModule.forRoot({
         config: {
           tokenGetter
         }
       }),
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ],
   schemas: [
      CUSTOM_ELEMENTS_SCHEMA
   ]
})
export class AppModule { }
