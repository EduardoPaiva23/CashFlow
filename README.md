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

## Endpoints

- `GET /health`: healthcheck
- `GET /docs`: Swagger UI

### Auth

- `POST /auth/register`: cria usuário
- `POST /auth/login`: autentica e retorna JWT
- `GET /me`: rota protegida, retorna o usuário autenticado

## Estrutura de pastas

- `src/config`: env e conexão com banco
- `src/routes`: definição de rotas
- `src/middleware`: middlewares (auth, error handler)
- `src/controllers`: handlers HTTP
- `src/models`: models do Mongo (Mongoose)
- `src/services`: regras de negócio

## Deploy e CI

Este repositório foi preparado para evoluir para CI com GitHub Actions e deploy na Vercel (em etapas futuras).

