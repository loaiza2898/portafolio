import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Transacciones",
      version: "1.0.0",
      description: "API para gestionar transacciones financieras",
    },
    servers: [{ url: "http://localhost:3000/api" }],
    components: {
      schemas: {
        Transaction: {
          type: "object",
          properties: {
            id: { type: "string", example: "1" },
            amount: { type: "number", example: 100.5 },
            currency: { type: "string", example: "USD" },
            date: { type: "string", format: "date-time", example: "2024-05-20T00:00:00.000Z" },
            status: { type: "string", example: "completed" },
          },
          required: ["id", "amount", "currency", "date", "status"],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/webapi/routes/*.ts"], 
};

export const swaggerSpec = swaggerJSDoc(options);