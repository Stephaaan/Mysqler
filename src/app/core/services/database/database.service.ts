import {Injectable} from '@angular/core';
import {Server} from "../../../models/server.model";
import {createDatabaseConnection, createKnexConnection} from "../../helpers/helpers";
import {bindNodeCallback, Observable, of} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {Router} from "@angular/router";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public selectedServer: Server | null = null;
  public CODE_KEY="CODE"
  constructor(private router: Router) {
  }

  public databases = (): Observable<{ "Database": string }[] | null>  => {
    if(this.selectedServer === null) {
      this.router.navigate(["/"]);
    }
    const knex = createKnexConnection(this.selectedServer)
    const queryPromise = knex.schema.raw('SHOW DATABASES').finally(() => knex.destroy())
    return fromPromise<[{ "Database": string }[], any]>(queryPromise).pipe(map(rsp => rsp[0]))
  }
  public executeCommand = (command: string): Observable<any> => {
    if (this.selectedServer === null) {
      this.router.navigate(["/"]);
    }
    //add automatically ; at the end of string;
    if (command.slice(-1) !== ";") {
      command += ";";
    }
    const knex = createKnexConnection(this.selectedServer);
    const queryPromise = knex.schema.raw(command).finally(() => knex.destroy());
    return fromPromise<[{ "Database": string }[], any]>(queryPromise).pipe(map(rsp => {
      //if there is only one command, wrap it in array
      if (command.split(';').length <= 2 ) {
        return [rsp[0]];
      }
      return rsp[0];
    }));
  };
  public saveCodeToLocalStorage(code: string){
    localStorage.setItem(this.CODE_KEY + '.' + this.selectedServer.id, code);
  }
  public getCodeFromLocalStorage(){
    return localStorage.getItem(this.CODE_KEY + '.' + this.selectedServer.id);
  }
}
