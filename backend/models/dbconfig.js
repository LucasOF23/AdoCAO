import 'dotenv/config'
import { Sequelize } from "sequelize";

const PGHOST = process.env['PGHOST'];
const PGPORT = process.env['PGPORT'] || 5432;
const PGUSER = process.env['PGUSER'];
const PGDATABASE = process.env['PGDATABASE'];
const PGPASSWORD = process.env['PGPASSWORD'];

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  dialect: "postgres",
  schema: PGDATABASE,
  host: PGHOST,
  port: PGPORT,
  ssl: false
});

export default sequelize;
