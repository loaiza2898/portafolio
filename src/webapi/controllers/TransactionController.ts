
import { Request, Response } from "express";
import { TransactionAppService } from "../../application/TransactionAppService";
import { Transaction } from "../../domain/entities/Transaction";

export class TransactionController {
  private service: TransactionAppService;

  constructor(service: TransactionAppService) {
    console.log("Servicio recibido en el controlador:", service);
    this.service = service;
    this.createTransaction = this.createTransaction.bind(this);
    this.updateTransaction = this.updateTransaction.bind(this);
    this.getTransactionById = this.getTransactionById.bind(this);
    this.getTransactionsByStatus = this.getTransactionsByStatus.bind(this);
    console.log("Servicio inyectado en el controlador:", service);
  }

  async createTransaction(req: Request, res: Response) {
    try {
      const transaction: Transaction = req.body;
      const result = await this.service.createTransaction(transaction);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const transaction: Transaction = req.body;
      const result = await this.service.updateTransaction(id, transaction);
      res.json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getTransactionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.service.getTransactionById(id);
      if (!result) throw new Error("Transacción no encontrada");
      res.json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getTransactionsByStatus(req: Request, res: Response) {
    try {
      const { status } = req.query;
      const result = await this.service.getTransactionsByStatus(status as string);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}