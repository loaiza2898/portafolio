import { Transaction } from "../entities/Transaction";

export interface TransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  update(id: string, transaction: Transaction): Promise<Transaction | null>;
  findById(id: string): Promise<Transaction | null>;
  findByStatus(status: string): Promise<Transaction[]>;
}