# Blog app — Full Stack Open: Next.js

Blog app submission for chapter 4 of
[Full Stack Open: Next.js](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs).

> **Nota sobre desenvolvimento assistido por IA:** Este projeto foi
> desenvolvido com auxílio do **Claude Code** (Anthropic) como par de
> programação. Ver a seção [AI pair programming](#ai-pair-programming)
> abaixo para detalhes sobre onde e como a IA foi utilizada.

## Stack

- Next.js 15 (App Router) + React 19
- NextAuth.js (Credentials provider, JWT sessions)
- Drizzle ORM + Postgres (Neon)
- Tailwind CSS v4
- MDX for the homepage
- Playwright for end-to-end tests

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the env file and fill in the values:

   ```bash
   cp .env.local.example .env.local
   ```

   - `DATABASE_URL` — Postgres connection string (e.g. from [Neon](https://neon.tech))
   - `AUTH_SECRET` — generate with `openssl rand -base64 32`
   - `AUTH_URL` — `http://localhost:3000` locally

3. Run migrations:

   ```bash
   npx drizzle-kit generate
   npx drizzle-kit migrate
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Run end-to-end tests (optional):

   ```bash
   npm run test:e2e
   ```

## Features

- User registration and login with hashed passwords (bcrypt)
- Server-side and client-side form validation via `useActionState`
- Notifications via React Context
- Blog filtering by title on the listing page
- Personal **My page** (`/me`) with API token generation
- REST endpoint `GET /api/me` authenticated by `Authorization: Bearer <token>`
- Personal reading list (auto-add on blog creation, manual add from other blogs)
- Testing endpoints `DELETE /api/testing/reset` and `POST /api/testing/users` (disabled in production)
- MDX-powered static homepage
- Playwright E2E test suite running on GitHub Actions

---

## AI pair programming

Durante o desenvolvimento eu utilizei o **Claude Code** como assistente de
programação. Todas as decisões de arquitetura, escopo e entrega foram
minhas — o agente atuou como par de programação para acelerar tarefas
repetitivas, esclarecer pontos do material do curso e ajudar a debugar.

### Mapa de onde a IA foi usada

| Área | O que o Claude Code ajudou | O que ficou comigo |
|---|---|---|
| 🏗️ **Scaffolding** | Sugeriu a estrutura inicial de pastas (`db/`, `app/services/`, `app/actions/`, `app/components/`) e a configuração do `tsconfig.json` com path alias `@/*` apontando para a raiz | Escolher o nome do projeto, decidir não usar `src/` |
| 🗄️ **Drizzle ORM** | Gerou o boilerplate inicial do `schema.ts` (users, blogs, reading_list) com relações | Decidi o modelo de domínio e quais campos cada tabela teria |
| 🔐 **NextAuth** | Tradução do exemplo do material para o blog (Credentials provider, JWT) | Configuração dos secrets, fluxo de login/logout |
| 📝 **Formulários** | Padrão do `useActionState` com `RegisterState` / `CreateBlogState` para retornar erros + valores | Validação de regras de negócio (mínimo 5 chars, confirmação de senha, etc.) |
| 🎨 **Tailwind** | Sugeriu combinações de classes utilitárias para componentes (navbar, cards de blog, formulários) | Escolhas de cor, layout geral |
| 🔔 **Notification Context** | Estrutura do `NotificationContext.tsx` com `useState` + `setTimeout` para auto-dismiss | Quando exibir notificações no fluxo de UX |
| 🧪 **Playwright (Ex. 24)** | **Aqui o Claude foi essencial:** adicionou todos os `data-testid` necessários no DOM, configurou `playwright.config.ts` com `webServer`, e corrigiu o conflito entre o gate `NODE_ENV === "production"` dos endpoints de testing e o servidor de produção do Next | Eu rodei os testes, fui apontando falhas e o agente foi ajustando |
| ⚙️ **GitHub Actions** | Copiou o workflow do repositório de referência `fullstack-hy2020/next-js-tests` e ajustou o `drizzle.config.ts` para carregar `.env.test` em CI | Eu criei os secrets no GitHub (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL) |
| 🪲 **Debugging** | Identificou que o teste `can regenerate API token` falhava porque a latência do Neon excedia o `waitForTimeout(500)`, e propôs gerar o UUID no cliente para atualização otimista | Aprovei a abordagem e validei que não quebrava nada |

### Como foi o fluxo de trabalho

1. Eu lia o exercício do material do curso e descrevia o objetivo para o agente
2. O agente propunha uma implementação (geralmente em arquivos)
3. Eu revisava o diff, pedia ajustes ou rodava localmente para validar
4. Quando algo quebrava, eu colava o erro e o agente debugava junto comigo
5. Os commits foram organizados por fase (scaffolding → schema → auth → ...) para facilitar revisão posterior

### Por que documento isso?

Porque acredito que **honestidade sobre as ferramentas usadas** é mais
valiosa do que fingir autoria solo. O entendimento conceitual do
material, as decisões de modelagem e o debugging continuam sendo meus —
o agente só acelerou a digitação e me ajudou a sair de blocos quando
travei. Se você é estudante do curso e está olhando este repo, recomendo
**fazer primeiro sem IA** e usar agentes só depois de entender o
material; é assim que se aprende.

— Pedro Aruanã Silva Mascarenhas
