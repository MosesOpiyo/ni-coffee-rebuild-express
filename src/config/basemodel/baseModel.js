class BaseModel {
  constructor(tableName, schema) {
    this.tableName = tableName;
    this.schema = schema;
  }

  getCreateTableQuery() {
    return `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        ${this.schema.join(",\n")}
      );
    `;
  }
}

module.exports = BaseModel;