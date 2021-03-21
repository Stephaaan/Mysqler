import {Component, OnInit, ViewChild} from '@angular/core';
import {DatabaseService} from "../../core/services/database/database.service";
import {catchError, map, tap} from "rxjs/operators";
import {DatabaseOkResult} from "../../models/database-ok-result.model";
import {DatabaseErrorResult} from "../../models/database-error-result.model";
import {EMPTY} from "rxjs";
import {DatabaseTableResult} from "../../models/database-table-result.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";



@Component({
  selector: 'app-sql-editor',
  templateUrl: './sql-editor.component.html',
  styleUrls: ['./sql-editor.component.scss']
})
export class SqlEditorComponent implements OnInit {
  DatabaseOkResult = DatabaseOkResult;
  DatabaseErrorResult = DatabaseErrorResult;
  DatabaseTableResult = DatabaseTableResult;
  readonly databases$ =  this.dbService.databases();
  fontSizeOptions = [5, 8, 10, 12, 14, 16, 18, 20];
  theme = 'vs-dark';
  themeOptions = ['vs', 'vs-dark'];
  code = "";
  readonly editorOptions = {
    cursorWidth: 1,
    readOnly:false,
    fontSize:16,
    matchBrackets:'near',
    minimap: { enabled: false },
    lineNumber: {
      lineNumbersType: 'on'
    }
  };


  results: any[] = [];

  constructor(private dbService: DatabaseService) {
    this.code = dbService.getCodeFromLocalStorage();
  }
  onCodeChanged(){
    this.dbService.saveCodeToLocalStorage(this.code);
  }

  execute() {
    this.dbService.executeCommand(this.code)
      .pipe(
        tap(() => this.results = []),
        map(items => {
          console.log(items);
          if(Array.isArray(items)){
            return items;
          }
          return [items];

        }),
        map(items => items.map(item => {
          console.log("items", items);
          if(item.affectedRows !== undefined) {
            return new DatabaseOkResult(item.message);
          }else if(Array.isArray(item)){
            return new DatabaseTableResult(item);
          }
          console.error("Unhandled Result Item", item);
          return item;

        })),
        catchError(err => {
          console.log(err)
          this.results = [...this.results, new DatabaseErrorResult(err.message)]
          return EMPTY;
        })
      )
      .subscribe(results => {
        console.log(results)
      this.results = results
    });
  }

  ngOnInit(): void {
  }
  isInstanceOf(value, type) {
    return value instanceof type;
  }
  logTheme(){
    console.log(this.theme)
  }

}

