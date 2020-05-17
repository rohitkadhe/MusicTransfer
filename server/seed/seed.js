const db = require("../db/db");

const createUsersTable = async () => {
  await db.schema.createTable("users", (table) => {
    table.increments("id").primary().unsigned();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("name").notNullable();
    table.timestamp("joined_on").defaultTo(db.fn.now());
  });
};

module.exports = createUsersTable;
