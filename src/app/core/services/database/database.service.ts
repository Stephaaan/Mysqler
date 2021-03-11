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
    if(this.selectedServer === null) {
      this.router.navigate(["/"]);
    }
    console.log(command)
    const knex = createKnexConnection(this.selectedServer)
    const queryPromise = knex.schema.raw(command).finally(() => knex.destroy())
    return fromPromise<[{ "Database": string }[], any]>(queryPromise).pipe(map(rsp => rsp[0]))
  }
}
