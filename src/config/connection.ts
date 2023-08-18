import { Dialect, Sequelize } from 'sequelize';
import 'dotenv/config'
import { dbConfig } from './index';


const { username, password, database, host, dialect, port } = dbConfig.development;


const sequelize = new Sequelize(database!, username!, password!, {
  host: host,
  port: +!port,
  dialect: dialect! as Dialect,
});

export { sequelize };
