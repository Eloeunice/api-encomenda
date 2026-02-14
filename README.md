# API Encomenda

API REST para gestão de entregas de encomendas. Permite cadastro de usuários, autenticação JWT, criação e acompanhamento de entregas e logs.

## Tecnologias

- **Node.js** + **Express 5** + **TypeScript**
- **Prisma** (PostgreSQL)
- **JWT** (autenticação)
- **Zod** (validação)
- **Swagger** (documentação OpenAPI)

## Pré-requisitos

- Node.js 18+
- PostgreSQL (ou use o Docker Compose)

## Configuração

1. Clone o repositório e instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/encomendas"
JWT_SECRET="sua-chave-secreta"
```

3. (Opcional) Suba o PostgreSQL com Docker:

```bash
docker compose up -d
```

4. Gere o Prisma Client e rode as migrações:

```bash
npx prisma generate
npx prisma migrate dev
```

5. Inicie o servidor:

```bash
npm run dev
```

A API estará em `http://localhost:3000`.

## Documentação da API (Swagger)

A documentação interativa está disponível em:

**http://localhost:3000/api-docs**

Lá você pode ver todos os endpoints, schemas e testar as requisições (incluindo autenticação Bearer JWT).

## Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|------------|------|
| POST | `/users` | Criar usuário | Não |
| POST | `/sessions` | Login (retorna JWT) | Não |
| POST | `/deliveries` | Criar entrega | Sim |
| GET | `/deliveries` | Listar entregas | Sim |
| PATCH | `/deliveries/:id/status` | Atualizar status da entrega | Sim |
| POST | `/delivery-logs` | Criar log de entrega | Sim |
| GET | `/delivery-logs/:delivery_id/show` | Ver entrega com logs | Sim |

Status de entrega: `processing` → `shipped` → `delivered`.

## Scripts

- `npm run dev` — inicia em modo desenvolvimento (tsx watch)
- `npm run eslint` — executa ESLint com auto-fix
- `npm run prettier` — formata o código com Prettier

## Autor

Eloiza Almeida
