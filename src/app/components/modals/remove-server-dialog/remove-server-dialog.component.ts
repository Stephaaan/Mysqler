import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-remove-server-dialog',
  templateUrl: './remove-server-dialog.component.html',
  styleUrls: ['./remove-server-dialog.component.scss']
})
export class RemoveServerDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<RemoveServerDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: {name: string}) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onYesClick(): void {
    this.dialogRef.close(true)
  }
}
