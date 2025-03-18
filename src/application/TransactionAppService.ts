import { TransactionRepository } from "../domain/interfaces/TransactionRepository";
import { TransactionService } from "../domain/interfaces/TransactionService"; 
import { Transaction } from "../domain/entities/Transaction";
import { SqlLogRepository } from "../infrastructure/repositories/SqlLogRepository";

export class TransactionAppService implements TransactionService { 
  constructor(
    private repository: TransactionRepository,
    private logRepository: SqlLogRepository 
  ) {
    console.log("Repositorio recibido en el servicio:", repository); 
  }

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    if (transaction.amount <= 0) throw new Error("El monto debe ser mayor a 0");
    if (!["USD", "COP"].includes(transaction.currency)) {
      throw new Error("Moneda no válida (solo USD o COP)");
    }

   
    const createdTransaction = await this.repository.create(transaction);
    
    await this.logRepository.logAction(createdTransaction.id, "Transaction created");
    return createdTransaction;
  }

  async updateTransaction(id: string, transaction: Transaction): Promise<Transaction | null> {
    const existingTransaction = await this.repository.findById(id);
    if (!existingTransaction) throw new Error("Transacción no encontrada");

       await this.logRepository.logAction(id, "Transaction updated");
    return this.repository.update(id, transaction);
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    console.log("Buscando transacción con ID:", id);
    return this.repository.findById(id);
  }

  async getTransactionsByStatus(status: string): Promise<Transaction[]> {
    return this.repository.findByStatus(status);
  }
}