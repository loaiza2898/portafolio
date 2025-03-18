import { Log_Model } from "../database/models/LogModel";
import { AppDataSource } from "../database/connections/sqlConnection";

export class SqlLogRepository {
  async logAction(transactionId: string, action: string): Promise<void> {
    console.log("Intentando guardar log en SQL Server:", { transactionId, action });

    const log = new Log_Model();
    log.transactionId = transactionId;
    log.action = action;
    log.timestamp = new Date();

    try {
      await AppDataSource.manager.save(log);
      console.log("Log guardado exitosamente en SQL Server");
    } catch (error) {
           throw new Error("No se pudo guardar el log en SQL Server");
    }
  }
}