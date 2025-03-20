import 'dotenv/config';
import pg from 'pg';
import { envs } from '../config/envs.js'; 

const pool = new pg.Pool({
  host: envs.DB_HOST,  
  user: envs.USER_DB,  
  password: envs.PASSWORD_DB,  
  database: envs.NAME_DATABASE,  
  allowExitOnIdle: true,
  // connectionString: process.env.DATABASE_URL,
});

export default pool;
