/* eslint no-underscore-dangle: 0 */

import fs from "fs";
import { join, dirname, basename } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../config/sequelize.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const base = basename(__filename);
const db = {};

const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== base && file.slice(-3) === ".js"
  );

await Promise.all(
  files.map(async (file) => {
    try {
      const filePath = join(__dirname, file);
      const modelModule = await import(pathToFileURL(filePath).href);

      if (typeof modelModule.default !== "function") {
        console.warn(`⚠️  Skipped "${file}" — No default export function.`);
        return;
      }

      const model = modelModule.default(sequelize, DataTypes);
      db[model.name] = model;
    } catch (err) {
      console.error(`❌ Failed to import model file "${file}":`, err);
    }
  })
);

// Setup model associations if present
Object.keys(db).forEach((modelName) => {
  if (typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
});

// Attach Sequelize instance
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export with nested `db` key to support legacy `db.db.Model` usage
export default { db };
