import { Router } from "express";
import { TransactionController } from "../controllers/TransactionController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { MongoTransactionRepository } from "../../infrastructure/repositories/MongoTransactionRepository";
import { TransactionAppService } from "../../application/TransactionAppService";
import { SqlLogRepository } from "../../infrastructure/repositories/SqlLogRepository";

const router = Router();


const mongoRepository = new MongoTransactionRepository();
const logRepository = new SqlLogRepository();
const service = new TransactionAppService(mongoRepository, logRepository);


const controller = new TransactionController(service);

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Transacciones
 *   description: Endpoints para gestionar transacciones financieras
 */

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Obtiene una transacción por ID
 *     tags: [Transacciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transacción encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Transaction"
 *       404:
 *         description: Transacción no encontrada
 */

router.get("/transactions/:id", controller.getTransactionById);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Obtiene transacciones por estado
 *     tags: [Transacciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de transacciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Transaction"
 */

router.get("/transactions", controller.getTransactionsByStatus);

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Crea una nueva transacción
 *     tags: [Transacciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Transaction"
 *     responses:
 *       201:
 *         description: Transacción creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Transaction"
 *       400:
 *         description: Error de validación
 */

router.post("/transactions", controller.createTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Actualiza una transacción existente
 *     tags: [Transacciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Transaction"
 *     responses:
 *       200:
 *         description: Transacción actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Transaction"
 *       404:
 *         description: Transacción no encontrada
 */

router.put("/transactions/:id", controller.updateTransaction);



export default router;