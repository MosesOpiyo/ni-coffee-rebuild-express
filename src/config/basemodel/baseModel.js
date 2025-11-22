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

  toJSON() {
    // Return all own enumerable properties
    const obj = {};
    for (let key of Object.keys(this)) {
      obj[key] = this[key];
    }
    return obj;
  }
}

module.exports = BaseModel;