import {Component, OnInit} from '@angular/core';
import {MysqlDatatype, TableEditorRowModel} from "../../models/table-editor-row.model";
import {FormArray, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

@Component({
  selector: 'app-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.scss']
})
export class TableEditorComponent implements OnInit {
  form = new FormGroup(
    {
      rows: new FormArray([
        this.generateBasicTableRow()
      ])
    })
  constructor() { }

  matcher = new TableRowErrorStateMatcher();

  ngOnInit(): void {
  }
  addFormGroup(){
    this.rows.push(this.generateBasicTableRow())
  }
  removeFormGroup(index: number){
    this.rows.removeAt(index)
  }
  private generateBasicTableRow(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      datatype: new FormControl(MysqlDatatype.INT),
      datatypeSize: new FormControl(null),
      isPrimary: new FormControl(false),
      isNotNull: new FormControl(false),
      isUnique: new FormControl(false),
      isBinary: new FormControl(false),
      isUnsigned: new FormControl(false),
      isAutoIncrement: new FormControl(false),
      defaultValue: new FormControl("")
    })
  }
  get rows(): FormArray{
    return this.form.get('rows') as FormArray;
  }
}
export class TableRowErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
