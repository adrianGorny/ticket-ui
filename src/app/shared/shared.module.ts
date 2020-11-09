import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@shared/modules/material.module';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { ErrorInfoComponent } from './components/error-info/error-info.component';

@NgModule({
  declarations: [LoadingComponent, ErrorInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    LoadingComponent,
    ErrorInfoComponent,
  ],
})
export class SharedModule {}
