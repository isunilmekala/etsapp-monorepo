import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { BpcmComponentComponent } from './bpcm-component/bpcm-component.component';
import { HttpClientModule } from '@angular/common/http';
import { DynamicFormsModule } from 'dynamic-forms';

@NgModule({
  declarations: [AppComponent, BpcmComponentComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    DynamicFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
