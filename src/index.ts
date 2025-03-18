import "reflect-metadata";
import express from "express";
import { connectMongoDB } from "./infrastructure/database/connections/mongoConnection";
import { connectSQLServer } from "./infrastructure/database/connections/sqlConnection";
import transactionRoutes from "./webapi/routes/transactionRoutes";
import authRoutes from "./webapi/routes/authRoutes";
import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from "./webapi/config/swagger";
import cors from "cors";
import { MongoTransactionRepository } from "./infrastructure/repositories/MongoTransactionRepository";
import { SqlLogRepository } from "./infrastructure/repositories/SqlLogRepository";
import { TransactionAppService } from "./application/TransactionAppService";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);


app.use(express.json());


app.use((req, res, next) => {
  console.log("Body recibido:", req.body);
  next();
});


connectMongoDB().catch((error) => {
  console.error("Error al conectar a MongoDB:", error);
  process.exit(1); 
});


connectSQLServer().catch((error) => {
  console.error("Error al conectar a SQL Server:", error);
  process.exit(1); 
});


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));


const mongoRepository = new MongoTransactionRepository();
const logRepository = new SqlLogRepository();
const transactionService = new TransactionAppService(mongoRepository, logRepository);


app.use("/api", authRoutes);
app.use("/api", transactionRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});