import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DatabaseTableResult} from "../../models/database-table-result.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-database-table-result',
  templateUrl: './database-table-result.component.html',
  styleUrls: ['./database-table-result.component.scss']
})
export class DatabaseTableResultComponent implements OnInit, AfterViewInit {
  @Input() table: DatabaseTableResult;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<any> | null = null;
  constructor() {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.table.rows);
    this.dataSource.paginator = this.paginator;
  }
  ObjectKeys(object: any){
    return Object.keys(object);
  }


}
