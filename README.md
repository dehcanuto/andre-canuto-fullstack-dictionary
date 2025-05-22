# 📚 Fullstack Challenge - Dictionary - André Canuto

## ✨ Introdução

Este é um desafio para avaliarmos suas habilidades como **Fullstack Developer**.

Neste projeto, você deverá desenvolver um aplicativo para listar e gerenciar palavras em inglês utilizando a API [📘 Free Dictionary API](https://dictionaryapi.dev/). O objetivo é exibir termos, salvar favoritos, manter histórico e seguir as boas práticas de desenvolvimento fullstack.

> ⚠️ Observação: optei por **não usar `.env`** para facilitar a configuração durante a avaliação.

---

## 🚀 Get Started

### 📦 Instale as dependências

```bash
# Backend (NestJS)
cd backend-nestjs
yarn install

# Frontend React
cd frontend-react
yarn install

# Frontend Vue
cd frontend-vue
yarn install
```

### 🐳 Docker

Para subir toda a aplicação, utilize:

```bash
docker-compose up --build
```

---

## 🌐 Frontend

O projeto possui **duas interfaces web**:

- 🟢 **Vue**: [http://localhost:5173](http://localhost:5173)
- 🔵 **React**: [http://localhost:5174](http://localhost:5174)

---

## ⚙️ Backend

O backend estará disponível em: [http://localhost:3000](http://localhost:3000)

### 📥 Importe as palavras

As palavras já estão importadas no Cluster Atlas, mas caso necessite:

Com o docker rodando, acesse:

> [http://localhost:3000/entries/en/import](http://localhost:3000/entries/en/import)

---

## 🔐 Login

Um usuário de teste está disponível para facilitar os testes de autenticação:

```txt
Email:  user@teste.com
Senha:  1234
```
---

## 🛠️ Tecnologias - Frontend

- ⚛️ React / 🔰 Vue (ambos com TypeScript e Vite)
- 🎨 Tailwind CSS
- 📱 Design Mobile First (Flexbox + Grid)
- 🧠 Gerenciamento de estado (Redux, Context API, LocalStorage)
- 🔄 Programação funcional (uso de `.map`, `.filter`, `.reduce`)

### 🧪 Rodar testes

Utilize `Vitest` para rodar os testes no frontend:

```bash
yarn test:unit
```

---

## 📋 Funcionalidades - Frontend

- ✅ Login com e-mail e senha
- ✅ Listagem de palavras com rolagem infinita
- ✅ Visualização da palavra, significados e fonética
- ✅ Salvar e remover palavras como favoritas
- ✅ Visualizar histórico de palavras acessadas
- ✅ Interface responsiva conforme wireframe
- ✅ Testes automatizados (Unit ou E2E)
- ✅ Docker configurado para facilitar deploy

---

## 🔧 Tecnologias - Backend

- 🚀 NestJS (Node.js)
- 🗃️ MongoDB (Atlas)

### 🧪 Rodar testes

Utilize `Jest` para rodar os testes no backend:

```bash
yarn test
```

---

## 📋 Funcionalidades - Backend

- ✅ Autenticação com login e senha
- ✅ Listagem de palavras do dicionário
- ✅ Histórico de palavras visualizadas
- ✅ Marcar/desmarcar palavras como favoritas
- ✅ Proxy da Free Dictionary API (o front consome apenas sua API)
- ✅ Script de importação da lista de palavras (baseada no [repositório oficial](https://github.com/meetDeveloper/freeDictionaryAPI/tree/master/meta/wordList))
- ✅ Documentação com OpenAPI 3.0 (Swagger em [http://localhost:3000/swagger](http://localhost:3000/swagger))
- ✅ Cache de resultados com Redis/MongoDB
- ✅ Testes unitários dos endpoints

---

> 💼 Desafio desenvolvido para [Coodesh](https://coodesh.com/)
