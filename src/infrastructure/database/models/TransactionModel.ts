import { Schema, model } from "mongoose";
import { Transaction } from "../../../domain/entities/Transaction";

const transactionSchema = new Schema<Transaction>({
  id: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
});

export const TransactionModel = model<Transaction>("Transaction", transactionSchema);