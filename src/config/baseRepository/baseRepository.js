const db = require('../database');

class BaseRepository {
    constructor(table, ModelClass) {
        this.table = table;
        this.ModelClass = ModelClass;
    }

    async _query(query, params = []) {
    const rows = await db.query(query, params);
    if (!rows || rows.length === 0) return [];
    return rows.map(r => new this.ModelClass(r));
  }

  // -------------------------------
  // Find all
  // -------------------------------
  async findAll() {
    const query = `SELECT * FROM ${this.table}`;
    return this._query(query);
  }

  // -------------------------------
  // Find by ID
  // -------------------------------
  async findById(id) {
    const query = `SELECT * FROM ${this.table} WHERE id = $1 LIMIT 1`;
    const rows = await this._query(query, [id]);
    return rows[0] || null;
  }

  // -------------------------------
  // Generic: findOne("field = $1", [value])
  // -------------------------------
  async findOne(where, params = []) {
    const query = `SELECT * FROM ${this.table} WHERE ${where} LIMIT 1`;
    const rows = await this._query(query, params);
    return rows[0] || null;
  }

  // -------------------------------
  // Generic: findMany
  // -------------------------------
  async findMany(where = "", params = []) {
    const query = `SELECT * FROM ${this.table} ${where ? "WHERE " + where : ""}`;
    return this._query(query, params);
  }

  // -------------------------------
  // Find by single field
  // -------------------------------
  async findBy(field, value) {
    const query = `SELECT * FROM ${this.table} WHERE ${field} = $1`;
    return this._query(query, [value]);
  }

  // -------------------------------
  // Find records WHERE field IN (...)
  // -------------------------------
  async findIn(field, values = []) {
    if (!Array.isArray(values) || values.length === 0) return [];
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
    const query = `SELECT * FROM ${this.table} WHERE ${field} IN (${placeholders})`;
    return this._query(query, values);
  }

  // -------------------------------
  // Create single record
  // -------------------------------
  async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

    const query = `
      INSERT INTO ${this.table} (${keys.join(", ")}, created_at, updated_at)
      VALUES (${placeholders}, NOW(), NOW())
      RETURNING *
    `;

    const rows = await this._query(query, values);
    return rows[0];
  }

  // -------------------------------
  // Bulk Create
  // -------------------------------
  async createMany(dataArray = []) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return [];
    
    const keys = Object.keys(dataArray[0]);
    const rowsSql = [];
    const params = [];

    dataArray.forEach((data, rowIndex) => {
      const rowPlaceholders = keys.map((_, colIndex) => {
        params.push(data[keys[colIndex]]);
        return `$${params.length}`;
      }).join(", ");
      rowsSql.push(`(${rowPlaceholders}, NOW(), NOW())`);
    });

    const query = `
      INSERT INTO ${this.table} (${keys.join(", ")}, created_at, updated_at)
      VALUES ${rowsSql.join(", ")}
      RETURNING *
    `;

    return this._query(query, params);
  }

  // -------------------------------
  // Update record
  // -------------------------------
  async update(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");

    const query = `
      UPDATE ${this.table}
      SET ${setClause}, updated_at = NOW()
      WHERE id = $${keys.length + 1}
      RETURNING *
    `;

    const rows = await this._query(query, [...values, id]);
    return rows[0] || null;
  }

  // -------------------------------
  // Delete by ID
  // -------------------------------
  async delete(id) {
    const query = `DELETE FROM ${this.table} WHERE id = $1 RETURNING *`;
    const rows = await this._query(query, [id]);
    return rows[0] || null;
  }

  // -------------------------------
  // Bulk delete WHERE id IN (...)
  // -------------------------------
  async deleteMany(ids = []) {
    if (!Array.isArray(ids) || ids.length === 0) return [];
    const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");
    const query = `
      DELETE FROM ${this.table}
      WHERE id IN (${placeholders})
      RETURNING *
    `;
    return this._query(query, ids);
  }

  // -------------------------------
  // Raw query (full multi-row support)
  // -------------------------------
  async rawQuery(query, params = []) {
    return this._query(query, params);
  }
}

module.exports = BaseRepository;
