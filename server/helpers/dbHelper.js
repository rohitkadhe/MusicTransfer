var db = require("../db/db");

const save = async (tableName, model, returnParams) => {
  try {
    const result = await db(tableName).insert(model).returning(returnParams);
    return result;
  } catch (err) {
    throw new MusicTransferError(`Error saving to ${tableName} table`);
  }
};

const find = async (tableName, columns, query) => {
  const res = db.from(tableName).column(columns).where(query);
  return res;
};

module.exports = { save, find };
