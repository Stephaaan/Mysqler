export interface TableEditorRowModel {
  name: string;
  datatype: MysqlDatatype;
  datatypeSize?: number;
  isPrimary: boolean;
  isNotNull: boolean;
  isUnique: boolean;
  isBinary: boolean;
  isUnsigned: boolean;
  isAutoIncrement: boolean;
  defaultValue: string
}

export enum MysqlDatatype {
  //Numeric
  TINYINT = 'TINYINT',
  SMALLINT = 'SMALLINT',
  MEDIUMINT = 'MEDIUMINT',
  INT = 'INT',
  BIGINT = 'BIGINT',
  DECIMAL = 'DECIMAL',
  FLOAT = 'FLOAT',
  DOUBLE = 'DOUBLE',

  //String
  CHAR = 'CHAR',
  VARCHAR = 'VARCHAR',
  BINARY = 'BINARY',
  VARBINARY = 'VARBINARY',
  TINYBLOB = 'TINYBLOB',
  BLOB = 'BLOB',
  MEDIUMBLOB = 'MEDIUMBLOB',
  LONGBLOB = 'LONGBLOB',
  TINYTEXT = 'TINYTEXT',
  TEXT = 'TEXT',
  MEDIUMTEXT = 'MEDIUMTEXT',
  LONGTEXT = 'LONGTEXT',

  //Date
  DATE = 'DATE',
  TIME = 'TIME',
  DATETIME = 'DATETIME',
  TIMESTAMP = 'TIMESTAMP',
  YEAR = 'YEAR'
}
