import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import {DetailComponent} from "./detail/detail.component";
import {ServersComponent} from "./components/servers/servers.component";
import {SqlEditorComponent} from "./components/sql-editor/sql-editor.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'servers',
    pathMatch: 'full'
  },
  {
    path: 'servers',
    component: ServersComponent,
  },
  {
    path: 'editor',
    component: SqlEditorComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

