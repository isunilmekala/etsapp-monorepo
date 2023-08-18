import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormRendererComponent } from './components/form-renderer/form-renderer.component';
import { ElementsRendererComponent } from './components/elements-renderer/elements-renderer.component';
import { FormElementConfigurationsComponent } from './components/form-element-configurations/form-element-configurations.component';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  declarations: [
    FormRendererComponent,
    ElementsRendererComponent,
    FormElementConfigurationsComponent,
    TabsComponent
  ],
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule],
    exports: [
      FormRendererComponent
    ]
})
export class DynamicFormsModule { }
