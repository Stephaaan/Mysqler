import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Server} from "../../models/server.model";
import {MatDialog} from "@angular/material/dialog";
import {RemoveServerDialogComponent} from "../modals/remove-server-dialog/remove-server-dialog.component";
import {catchError, filter, switchMap, takeUntil, tap} from "rxjs/operators";
import {AddServerDialogComponent} from "../modals/add-server-dialog/add-server-dialog.component";
import {EMPTY, from, Observable, of, Subject} from "rxjs";
import {ServersService} from "../../core/services/servers/servers.service";
import {ConnectPasswordDialogComponent} from "../modals/connect-password-dialog/connect-password-dialog.component";
import {Router} from "@angular/router";
import {DatabaseService} from "../../core/services/database/database.service";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit, OnDestroy{
  public servers$: Observable<Server[]>
  public unsubscribe$ = new Subject<boolean>();
  constructor(public dialog: MatDialog, private serversService: ServersService, private router: Router, private zone: NgZone, private dbService: DatabaseService) {
    this.servers$ = this.serversService.servers$
  }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    this.unsubscribe$.next(true)
  }

  removeServer(server: Server) {
    const dialogRef = this.dialog.open(RemoveServerDialogComponent, {width: '250px', data: {name: server.name}})
    dialogRef.afterClosed().pipe(
      filter(result => result !== false)
    ).subscribe(() => {
      this.serversService.removeServer(server.id);
    })
  }

  addServer() {
    const dialogRef = this.dialog.open(AddServerDialogComponent, {width: '300px', data: {}})
    dialogRef.afterClosed().pipe(
      filter(result => result !== null)
    ).subscribe((server) => {
      this.serversService.addServer(server);
    })
  }

  editServer(server: Server) {
    const dialogRef = this.dialog.open(AddServerDialogComponent, {width: '300px', data: {server}})
    dialogRef.afterClosed().pipe(
      filter(result => result !== null)
    ).subscribe((server) => {
      this.serversService.editServer(server)
    })
  }

  connectToServer(server: Server) {
    const dialogRef = this.dialog.open(ConnectPasswordDialogComponent, {width: '300px'})
    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$),
      filter(result => result !== null),
      tap(() => console.log("teeeest")),
      switchMap((password: string) => {
        server.password = password;
        return this.serversService.testConnection(server)
      }),
      tap(() => console.log("teeeest")),
      catchError(err => {
        console.log("error", err)
        //here we need to add popup that informs user that server is unreachable
        return EMPTY;
      })
    ).subscribe(() => {
      //we need to go back to the angular zone from mysql lib
      this.zone.run(() => {
        this.dbService.selectedServer = server;
        this.navigateToEditor()
      })
    });
  }
  private navigateToEditor(){
    this.router.navigate(['/editor']);
  }
  stopPropagation(e) {
    e.stopPropagation();
  }
}
