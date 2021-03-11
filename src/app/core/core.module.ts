import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToBooleanPipe } from './pipes/to-boolean.pipe';
import { DebugPipe } from './pipes/debug.pipe';

@NgModule({
    declarations: [ToBooleanPipe, DebugPipe],
  exports: [
    ToBooleanPipe,
    DebugPipe
  ],
    imports: [
        CommonModule
    ]
})
export class CoreModule { }
