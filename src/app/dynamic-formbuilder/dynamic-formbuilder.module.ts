import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextboxComponent } from './atoms/textbox/textbox.component';
import { FieldBuilderComponent } from './field-builder/field-builder/field-builder.component';
import { DynamicFormbuilderComponent } from './dynamic-formbuilder/dynamic-formbuilder.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RadioComponent } from './atoms/radio/radio.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [TextboxComponent, FieldBuilderComponent, DynamicFormbuilderComponent, RadioComponent],
  exports: [TextboxComponent, FieldBuilderComponent, DynamicFormbuilderComponent,ReactiveFormsModule,FormsModule]
})
export class DynamicFormbuilderModule { }
