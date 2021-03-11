import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-connect-password-dialog',
  templateUrl: './connect-password-dialog.component.html',
  styleUrls: ['./connect-password-dialog.component.scss']
})
export class ConnectPasswordDialogComponent implements OnInit {
  public password = "";

  constructor( public dialogRef: MatDialogRef<ConnectPasswordDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: {name: string}) { }

  ngOnInit(): void {
  }

  onConnectClick() {
    this.dialogRef.close(this.password);
  }
  onCancelClick() {
    this.dialogRef.close(null);
  }

}
