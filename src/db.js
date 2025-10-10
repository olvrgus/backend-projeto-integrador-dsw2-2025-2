// O objetivo deste arquivo é criar a variavel pool
//e colocar dentro dela a conexão com o postgres
// Estamos assim criando um mini pacote
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export { pool };