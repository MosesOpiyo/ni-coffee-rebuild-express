const { newDb } = require('pg-mem');
const crypto = require('crypto');

let db;
let client;

// Initialize pg-mem DB
async function initDb(tablesSql = '') {
  db = newDb();

  // UUID generator
  db.public.registerFunction({
    name: 'gen_random_uuid',
    returns: 'uuid',
    implementation: () => crypto.randomUUID(),
  });

  // NOW() function
  db.public.registerFunction({
    name: 'now',
    returns: 'timestamp',
    implementation: () => new Date(),
  });

  // Create tables
  if (tablesSql) {
    await db.public.none(tablesSql); // use 'none' instead of 'query'
  }

  // Create a pg client
  const pg = db.adapters.createPg(); // factory
  client = new pg.Client();           // real client instance
  await client.connect();

  return client;
}

// Generic CRUD functions using 'client.query' instead of adapter.query
const create = async (table, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

  const res = await client.query(
    `INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders}) RETURNING *`,
    values
  );
  return res.rows[0];
};

const findAll = async (table) => {
  const res = await client.query(`SELECT * FROM ${table}`);
  return res.rows;
};

const findById = async (table, id) => {
  const res = await client.query(`SELECT * FROM ${table} WHERE id=$1`, [id]);
  return res.rows[0];
};

const update = async (table, id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setClause = keys.map((key, i) => `${key}=$${i + 1}`).join(', ');

  const res = await client.query(
    `UPDATE ${table} SET ${setClause} WHERE id=$${keys.length + 1} RETURNING *`,
    [...values, id]
  );
  return res.rows[0];
};

const remove = async (table, id) => {
  const res = await client.query(`DELETE FROM ${table} WHERE id=$1 RETURNING *`, [id]);
  return res.rows[0];
};

module.exports = {
  initDb,
  create,
  findAll,
  findById,
  update,
  remove,
  db,
  client,
};
