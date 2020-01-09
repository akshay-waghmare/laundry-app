import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextboxComponent } from './atoms/textbox/textbox.component';
import { FieldBuilderComponent } from './field-builder/field-builder/field-builder.component';
import { DynamicFormbuilderComponent } from './dynamic-formbuilder/dynamic-formbuilder.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [TextboxComponent, FieldBuilderComponent, DynamicFormbuilderComponent],
  exports: [TextboxComponent, FieldBuilderComponent, DynamicFormbuilderComponent,ReactiveFormsModule]
})
export class DynamicFormbuilderModule { }
