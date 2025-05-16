# Fullstack Challenge - Dictionary - André Canuto

## Introdução

Este é um desafio para que possamos ver as suas habilidades como Fullstack Developer.

Nesse desafio você deverá desenvolver um aplicativo para listar palavras em inglês, utilizando como base a API [Free Dictionary API](https://dictionaryapi.dev/). O projeto a ser desenvolvido por você tem como objetivo exibir termos em inglês e gerenciar as palavras visualizadas, conforme indicado nos casos de uso que estão logo abaixo.

- Observação: Optei por nao usar .env para facilitar a configuracao do projeto para avaliação.

### 🚀 Get Started!

#### 1. Docker

Rode o docker que ele irá iniciar todo a aplicação.

```cmd
docker-compose up --build
```

#### 2. Frontend

O frontend será apresentado através do link [http://localhost:5173](http://localhost:5173).

#### 2. Backend

O frontend será apresentado através do link [http://localhost:3000](http://localhost:3000).

##### Importe as palavras

Com o docker rodando, utilize a rota [http://localhost:3000/entries/en/import](http://localhost:3000/entries/en/import) para importar as palavras.

### Tecnologias (Front-End):

- Vue.js ✅
- Tailwind CSS ✅
- CSS Flexbox + CSS Grid ✅
- Design Mobile First ✅
- Gestão de dados (Redux, Context API, Localstorage, etc)
- Conceitos de Programação Funcional em JS (pelo menos .map, .filter e .reduce) ✅

#### Rodar Test

Este projeto utiliza o `vitest` para testes unitarios. Para rodar os testes, basta executar este comando no terminal.

```bash
yarn test:unit  
```

### Atividades

- [x] Como usuário, devo ser capaz de realizar login com usuário e senha
- [x] Como usuário, devo ser capaz de visualizar uma lista de palavras com rolagem infinita
- [x] Como usuário, devo ser capaz de visualizar uma palavra, significados e a fonética
- [x] Como usuário, devo ser capaz de salvar a palavra como favorito
- [x] Como usuário, devo ser capaz de remover a palavra como favorito
- [x] Como usuário, devo ser capaz de visitar uma lista com as palavras que já vi anteriormente
- [x] Seguir o wireframe para a página de listagem dos dados.
- [ ] Escrever Unit Tests ou E2E Test. Escolher a melhor abordagem e biblioteca;
- [x] Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;
- [ ] Colocar na URL os parametros utilizados na busca, para que seja possível compartilhar a URL;
- [ ] Implementar SSR no projeto;
- [ ] Implementar o projeto com PWA.

### Tecnologias (Back-End):

- NestJS (node) ✅
- MongoDB (Atlas) ✅

### Documentação

O projeto tem suporte de swagger para acompanhamento dos endpoints [http://localhost:3000/swagger]

### Atividades

- [x] Como usuário, devo ser capaz de realizar login com usuário e senha
- [x] Como usuário, devo ser capaz de visualizar a lista de palavras do dicionário
- [x] Como usuário, devo ser capaz de guardar no histórico palavras já visualizadas
- [x] Como usuário, devo ser capaz de visualizar o histórico de palavras já visualizadas
- [x] Como usuário, deve ser capaz de guardar uma palavra como favorita
- [x] Como usuário, deve ser capaz de apagar uma palavra favorita
- [x] Internamente, a API deve fazer proxy da API Free Dictionary, pois assim o front irá acessar somente a sua API
- [x] Você deve criar um script para baixar a lista de palavras do repositório e importar estas palavras para o banco de dados. A Free Dictionary API não possui endpoint com a lista de palavras. Para criar este endpoint será necessário alimentar o seu banco de dados com o [arquivo existente dentro do projeto no Github](https://github.com/meetDeveloper/freeDictionaryAPI/tree/master/meta/wordList).
- [x] Descrever a documentação da API utilizando o conceito de Open API 3.0;
- [ ] Escrever Unit Tests para os endpoints da API;
- [ ] Implementar paginação com cursores ao inves de usar page e limit . Ao realizar este diferencial, o retorno dos endpoints deve possuir a seguinte estrutura:
```json
{
    "results": [
        "fire",
        "firefly",
        "fireplace",
        "fireman"
    ],
    "totalDocs": 20,
    "previous": "eyIkb2lkIjoiNTgwZmQxNmjJkOGI5In0",
    "next": "eyIkb2lkIjoiNTgwZmQxNm1NjJkOGI4In0",
    "hasNext": true,
    "hasPrev": true,
}
```

- [ ] Salvar em cache o resultado das requisições ao Free Dictionary API, para agilizar a resposta em caso de buscas com parâmetros repetidos. Sugestões são usar o Redis e/ou MongoDB;
O cache pode ser feito a guardar todo o corpo das respostas ou para guardar o resultado das queries do banco. Para identificar a presença de cache, será necessário adicionar os seguintes headers nas respostas:
- x-cache: valores HIT (retornou dados em cache) ou MISS (precisou buscar no banco)
- x-response-time: duração da requisição em milissegundos


>  This is a challenge by [Coodesh](https://coodesh.com/)