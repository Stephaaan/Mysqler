import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Server} from "../../../models/server.model";
import {noWhitespaceValidator} from "../../../core/validators/no-whitespace.validator";
import {markAsDirtyAndValidate} from "../../../core/helpers/helpers";
import * as uuid from 'uuid';
import {FormMode} from "../../../models/form.model";
import {ipAddressValidator} from "../../../core/validators/ip-address.validator";

@Component({
  selector: 'app-add-server-dialog',
  templateUrl: './add-server-dialog.component.html',
  styleUrls: ['./add-server-dialog.component.scss']
})
export class AddServerDialogComponent implements OnInit {
  public ipMask = new RegExp(/(?:[0-9]{1,3}\.){3}[0-9]{1,3}/);
  public form: FormGroup;
  public formMode: FormMode = FormMode.CREATE;
  public FormMode = FormMode;
  public server: Server | null;
  constructor(public dialogRef: MatDialogRef<AddServerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {server: Server | null }) {
    console.log(data.server)
    if (data.server) {
      this.formMode = FormMode.EDIT
      this.server = data.server;
    }
    this.form = this.createFormGroup(data.server)
  }
  private createFormGroup(server: Server | null) {
    return new FormGroup({
      name: new FormControl(server?.name, [noWhitespaceValidator]),
      //IP must be by default empty string because masking function uses split without checking if value is string
      ip: new FormControl(server?.ip || "", [noWhitespaceValidator, ipAddressValidator]),
      port: new FormControl(server?.port, [noWhitespaceValidator]),
      username: new FormControl(server?.username, [noWhitespaceValidator]),
    })
  }
  ngOnInit(): void {

  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onAddClick(): void {
    markAsDirtyAndValidate(this.form);
    if(this.form.valid) {

      const server: Server = {
        name: this.form.controls['name'].value,
        ip: this.form.controls['ip'].value,
        port: this.form.controls['port'].value,
        username: this.form.controls['username'].value,
        id: uuid.v4()
      }
      if(this.formMode === FormMode.EDIT) {
        server.id = this.server.id
      }
      this.dialogRef.close(server)
    }
  }
}
