# CashFlow API

Estrutura inicial de uma API REST com **JavaScript + Express**, **autenticação JWT**, **MongoDB** e **Swagger**.

## Requisitos

- Node.js 18+ (recomendado: 20+)
- MongoDB (local ou Atlas)

## Como rodar

1) Instale dependências:

```bash
npm install
```

2) Configure ambiente:

```bash
copy .env.example .env
```

Edite o `.env` com seus valores (principalmente `MONGODB_URI` e `JWT_SECRET`).

3) Inicie a API:

- Modo estático:

```bash
npm run start
```

- Modo desenvolvimento (reinicia ao alterar arquivos):

```bash
npm run dev
```

## Testes

```bash
npm test
```

## Endpoints

- `GET /health`: healthcheck
- `GET /docs`: Swagger UI

### Auth (conforme Jira)

- `POST /users`: cria usuário (CAF-1)
- `POST /sessions`: autentica e retorna JWT (CAF-2)
- `GET /me`: rota protegida, retorna o usuário autenticado
- `POST /transactions`: rota protegida, registra receita/despesa (CAF-3)
- `GET /summary`: rota protegida, saldo/resumo (CAF-4)

## Estrutura de pastas

- `src/config`: env e conexão com banco
- `src/routes`: definição de rotas
- `src/middleware`: middlewares (auth, error handler)
- `src/controllers`: handlers HTTP
- `src/models`: models do Mongo (Mongoose)
- `src/services`: regras de negócio

## Deploy e CI

Este repositório foi preparado para evoluir para CI com GitHub Actions e deploy na Vercel (em etapas futuras).

