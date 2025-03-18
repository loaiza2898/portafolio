import { DataSource } from "typeorm";
import { Log_Model } from "../models/LogModel"; 
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.SQL_SERVER,
  port: 1433,
  username: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  entities: [Log_Model],
  synchronize: process.env.NODE_ENV === "development", 
  options: {
    trustServerCertificate: true,
    connectTimeout: 100000,
  },
});

export const connectSQLServer = async () => {
  try {
        await AppDataSource.initialize();
    console.log("Conectado a SQL Server");
  } catch (error) {
        throw new Error("No se pudo conectar a SQL Server");
  }
};