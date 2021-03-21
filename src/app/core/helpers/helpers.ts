import {AbstractControl, FormArray, FormGroup} from "@angular/forms";
import {Server} from "../../models/server.model";
const mysql = (<any>window).require('mysql');
const knex = (<any>window).require('knex');
export function markAsDirtyAndValidate(control: AbstractControl) {
  if(control instanceof FormGroup){
    control.markAsDirty();
    control.updateValueAndValidity()
  }else if(control instanceof FormArray){
    control.controls.forEach((control) => markAsDirtyAndValidate(control));
  }
}
export function createDatabaseConnection(server: Server) {
  return mysql.createConnection(createConnectionSetupObject(server))
}
function createConnectionSetupObject(server: Server) {
  const a = {
    host: server.ip,
    user: server.username,
    port: server.port,
    password: server.password,
    database: "",
    multipleStatements: true,
  }
  console.log(a)
  return a

}
export function createKnexConnection(server: Server){
  return knex({
    client: 'mysql',
    connection: createConnectionSetupObject(server),
    "pool": {
      "min": 2,
      "max": 20
    },
  })
}
