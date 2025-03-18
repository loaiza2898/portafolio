import { Transaction } from "../entities/Transaction";

export interface TransactionService {
  createTransaction(transaction: Transaction): Promise<Transaction>;
  updateTransaction(id: string, transaction: Transaction): Promise<Transaction | null>;
  getTransactionById(id: string): Promise<Transaction | null>;
  getTransactionsByStatus(status: string): Promise<Transaction[]>;
}