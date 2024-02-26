import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
import getConfig from './src/configs/config';

dotenv.config({
  path: './environments/local.env',
});
const postgresConfig = getConfig().postgres;

export default new DataSource({
  type: 'postgres',
  host: postgresConfig.host,
  port: postgresConfig.port,
  username: postgresConfig.user,
  password: postgresConfig.password,
  database: postgresConfig.dbName,
  entities: [
    path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
  ],
  migrations: [
    path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
  ],
  synchronize: false,
});
