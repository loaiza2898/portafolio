import { Transaction } from "../../domain/entities/Transaction";
import { TransactionRepository } from "../../domain/interfaces/TransactionRepository";
import { TransactionModel } from "../database/models/TransactionModel";



export class MongoTransactionRepository implements TransactionRepository {
  
  async create(transaction: Transaction): Promise<Transaction> {
    console.log("Creando transacción en MongoDB:", transaction);
    const newTransaction = new TransactionModel(transaction);
    await newTransaction.save();
    return transaction;
  }

  async update(id: string, transaction: Transaction): Promise<Transaction | null> {
    const updated = await TransactionModel.findOneAndUpdate({ id }, transaction, { new: true });
    return updated ? updated.toObject() : null;
  }

  async findById(id: string): Promise<Transaction | null> {
    const result = await TransactionModel.findOne({ id }); 
    return result ? result.toObject() : null;
  }

  async findByStatus(status: string): Promise<Transaction[]> {
    const results = await TransactionModel.find({ status });
    return results.map((doc) => doc.toObject());
  }
}