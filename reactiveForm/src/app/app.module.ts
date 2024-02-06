import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsComponent } from './forms/forms.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, FormsComponent],
  imports: [BrowserModule, CommonModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
