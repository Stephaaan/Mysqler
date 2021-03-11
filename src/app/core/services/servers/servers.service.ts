import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from "rxjs";
import {Server} from "../../../models/server.model";
import {createDatabaseConnection, createKnexConnection} from "../../helpers/helpers";


@Injectable({
  providedIn: 'root'
})
export class ServersService {
  private DATABASES_KEY = 'databases'
  public servers$ = new BehaviorSubject<Server[]>([]);

  constructor() {
    this.notify()
  }

  addServer(server: Server) {
    const allServers = [...this.servers, server]
    localStorage.setItem(this.DATABASES_KEY, JSON.stringify({servers: allServers}))
    this.notify();
  }

  removeServer(id: string) {
    const allServers = this.servers;
    localStorage.setItem(this.DATABASES_KEY, JSON.stringify({servers: allServers.filter(s => s.id !== id)}))
    this.notify();
  }

  editServer(server: Server) {
    // edit = remove old server from arr and then add edited version
    const allServers = this.servers.filter(s => s.id !== server.id);
    localStorage.setItem(this.DATABASES_KEY, JSON.stringify({servers: [...allServers, server]}))
    this.notify();
  }

  private get servers(): Server[] {
    if (localStorage.getItem(this.DATABASES_KEY) === null) {
      return [];
    }
    const parsed = JSON.parse(localStorage.getItem(this.DATABASES_KEY));
    //some weird stuff happening here when app is started first time
    if (parsed.servers[0] === null) {
      parsed.servers = []
    }
    return parsed.servers
  }

  private notify() {
    this.servers$.next(this.servers);
  }

  public testConnection(server: Server): Observable<unknown> {
    return new Observable<unknown>(observer => {
      const knex = createKnexConnection(server)
      console.log("trying to connect")
      knex.schema.raw("SHOW DATABASES")
        .then(() => {
          console.log("were okay")
          observer.next(true)
          observer.complete()
        })
        .catch((err) => {
          console.error(err);
          observer.error();
        })
        .finally(() => knex.destroy())
    })
  }
}

