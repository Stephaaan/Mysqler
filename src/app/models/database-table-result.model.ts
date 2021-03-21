export class DatabaseTableResult {
  rows: DatabaseRow[] = [];
  constructor(arr) {
    this.rows = arr;
  }
}
type DatabaseRow = {[key: string]: any};
