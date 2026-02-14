import swaggerJsdoc from "swagger-jsdoc";

const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Encomenda",
      version: "1.0.0",
      description:
        "API de entregas de encomendas. Permite cadastro de usuários, login, gestão de entregas e logs.",
      contact: {
        name: "Eloiza Almeida",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token JWT retornado no login (POST /sessions)",
        },
      },
      schemas: {
        UserCreate: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", minLength: 3, example: "João Silva" },
            email: { type: "string", format: "email", example: "joao@email.com" },
            password: { type: "string", minLength: 6, example: "123456" },
          },
        },
        SessionCreate: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "joao@email.com" },
            password: { type: "string", example: "123456" },
          },
        },
        DeliveryCreate: {
          type: "object",
          required: ["user_id", "description"],
          properties: {
            user_id: { type: "string", format: "uuid", example: "uuid-do-usuario" },
            description: { type: "string", example: "Encomenda expressa" },
          },
        },
        DeliveryStatusUpdate: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "string",
              enum: ["processing", "shipped", "delivered"],
            },
          },
        },
        DeliveryLogCreate: {
          type: "object",
          required: ["delivery_id", "description"],
          properties: {
            delivery_id: { type: "string", format: "uuid" },
            description: { type: "string", example: "Saiu para entrega" },
          },
        },
      },
    },
    tags: [
      { name: "Users", description: "Cadastro de usuários" },
      { name: "Sessions", description: "Autenticação (login)" },
      { name: "Deliveries", description: "Entregas (requer autenticação)" },
      { name: "Delivery Logs", description: "Logs de entregas (requer autenticação)" },
    ],
    paths: {
      "/users": {
        post: {
          tags: ["Users"],
          summary: "Criar usuário",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserCreate" },
              },
            },
          },
          responses: {
            201: { description: "Usuário criado" },
            400: { description: "Usuário já existe" },
          },
        },
      },
      "/sessions": {
        post: {
          tags: ["Sessions"],
          summary: "Login",
          description: "Retorna um token JWT. Use no header: Authorization: Bearer {token}",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SessionCreate" },
              },
            },
          },
          responses: {
            200: {
              description: "Token JWT",
              content: {
                "application/json": {
                  schema: { type: "string", example: "eyJhbGciOiJIUzI1NiIs..." },
                },
              },
            },
            401: { description: "Email ou senha inválidos" },
            404: { description: "Usuário não encontrado" },
          },
        },
      },
      "/deliveries": {
        post: {
          tags: ["Deliveries"],
          summary: "Criar entrega",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DeliveryCreate" },
              },
            },
          },
          responses: {
            201: { description: "Entrega criada" },
            401: { description: "Não autorizado" },
          },
        },
        get: {
          tags: ["Deliveries"],
          summary: "Listar entregas",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Lista de entregas com nome do usuário",
            },
            401: { description: "Não autorizado" },
          },
        },
      },
      "/deliveries/{id}/status": {
        patch: {
          tags: ["Deliveries"],
          summary: "Atualizar status da entrega",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", format: "uuid" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DeliveryStatusUpdate" },
              },
            },
          },
          responses: {
            200: { description: "Status atualizado" },
            401: { description: "Não autorizado" },
          },
        },
      },
      "/delivery-logs": {
        post: {
          tags: ["Delivery Logs"],
          summary: "Criar log de entrega",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DeliveryLogCreate" },
              },
            },
          },
          responses: {
            201: { description: "Log criado" },
            400: { description: "Entrega já entregue ou status inválido" },
            401: { description: "Não autorizado" },
            404: { description: "Entrega não encontrada" },
          },
        },
      },
      "/delivery-logs/{delivery_id}/show": {
        get: {
          tags: ["Delivery Logs"],
          summary: "Ver entrega com logs",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "delivery_id",
              in: "path",
              required: true,
              schema: { type: "string", format: "uuid" },
            },
          ],
          responses: {
            200: { description: "Entrega com logs e usuário" },
            401: { description: "Não autorizado" },
          },
        },
      },
    },
  },
  apis: [], // documentação está toda em definition.paths
};

const spec = swaggerJsdoc(options);

export default spec;
