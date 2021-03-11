import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';


//Angular material
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatTreeModule} from '@angular/material/tree';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DetailComponent } from "./detail/detail.component";
import { ServersComponent } from './components/servers/servers.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { RemoveServerDialogComponent } from './components/modals/remove-server-dialog/remove-server-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AddServerDialogComponent } from './components/modals/add-server-dialog/add-server-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgxMaskModule} from "ngx-mask";
import { ConnectPasswordDialogComponent } from './components/modals/connect-password-dialog/connect-password-dialog.component';
import { DatabasesSelectorComponent } from './components/shared/databases-selector/databases-selector.component';
import { SqlEditorComponent } from './components/sql-editor/sql-editor.component';
import {CovalentCodeEditorModule} from "@covalent/code-editor";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { DatabaseTableResultComponent } from './components/database-table-result/database-table-result.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, DetailComponent, ServersComponent, RemoveServerDialogComponent, AddServerDialogComponent, ConnectPasswordDialogComponent, DatabasesSelectorComponent, SqlEditorComponent, DatabaseTableResultComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    //Angular material
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTreeModule,
    CovalentCodeEditorModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
