# GYMBROTHERS

> O parceiro de treino que eu queria ter tido quando comecei na academia.

**Projeto individual · SPTech (São Paulo Tech School) · 2026**
Autor: **Rafael Oliveira**

---

## Sobre o projeto

Eu comecei a treinar sem ninguém para me orientar na dieta nem no treino. Errei muito, demorei para entender o que funcionava e passei por isso sozinho. O **GYMBROTHERS** nasceu dessa dor: é um sistema que caminha junto com quem está começando, como um parceiro de treino que eu não tive.

A ideia não é ser só uma ferramenta. É mostrar um caminho que funcionou comigo (o meu treino e a minha dieta) e, ao mesmo tempo, dar ao usuário um espaço para acompanhar a própria evolução e montar o próprio plano.

## Objetivo

Ajudar iniciantes na academia a:

- **saber onde estão e para onde vão**: peso atual, meta, IMC e evolução ao longo do tempo;
- **ter um ponto de partida** para treino e dieta, baseado em um plano real que deu resultado;
- **registrar o próprio treino e a própria dieta**, sem depender de planilhas soltas;
- **escolher a academia com mais informação**, vendo a avaliação de quem já treinou em cada uma.

## No que ele ajuda

| Dificuldade de quem começa | Como o GYMBROTHERS ajuda |
|---|---|
| Não sabe se está evoluindo | Gráfico de evolução com os pesos que o próprio usuário atualiza, mais a linha da meta |
| Não entende o que o IMC significa | IMC calculado automaticamente, com classificação e comparação início × hoje × meta |
| Não tem referência de treino | Tela de Treinos com o treino do autor como ponto de partida |
| Não sabe o que comer | Tela de Dieta com a dieta do autor, refeição por refeição |
| Quer montar o próprio plano | O usuário cadastra seus exercícios (carga, séries, repetições) e os alimentos da sua dieta |
| Não sabe qual academia escolher | Mapa com as academias que o autor já frequentou, com nota e avaliação |

## Como funciona

1. **Cadastro e login.** O usuário cria a conta e entra no sistema.
2. **Quiz de início.** Responde peso atual, altura, tempo de treino, frequência semanal, peso objetivo e grupo muscular foco. O IMC é calculado no servidor e guardado no banco.
3. **Dashboard.** Mostra peso atual e meta, quanto falta, o IMC com a classificação e dois gráficos: a **evolução do peso** (pontos reais + linha da meta) e o **IMC** (início, hoje e meta).
4. **Atualização de peso.** No **Perfil**, o usuário informa o novo peso. Cada atualização é salva no histórico e vira um ponto novo no gráfico do dashboard. O gráfico só muda quando o peso muda. A previsão de quando chega na meta só aparece depois de duas ou mais atualizações, usando o ritmo real do usuário.
5. **Treinos.** Mostra o "Treino do autor" e o "Meu treino". O usuário cadastra exercícios (ou cria um exercício novo) com carga, séries e repetições.
6. **Dieta.** Mostra a "Dieta do autor" (fixa no site) e a "Minha dieta", agrupada por refeição, onde o usuário cadastra os alimentos, a quantidade e a unidade.
7. **Academias.** Mapa interativo com as academias que o autor frequentou, com foto, nota de 0 a 5 e descrição.
8. **Sobre / Minha história.** Página com a trajetória do autor e o motivo do projeto.

## Telas

| Tela | Arquivo |
|---|---|
| Página inicial | `public/index.html` |
| Minha história | `public/historia.html` |
| Cadastro / Login | `public/cadastro.html`, `public/login.html` |
| Quiz | `public/quiz.html` |
| Dashboard | `public/dashboard.html` |
| Treinos | `public/treinos.html`, `public/cadastrarex.html` |
| Dieta | `public/dieta.html`, `public/cadastraralimento.html` |
| Academias | `public/academias.html` |
| Perfil (atualizar peso) | `public/perfil.html` |

<!-- Dica: salve prints das telas em docs/ e coloque aqui, por exemplo:
![Dashboard](docs/dashboard.png) -->

## Tecnologias

- **Back-end:** Node.js, Express, MySQL, dotenv, cors, nodemon
- **Front-end:** HTML, CSS e JavaScript puro (sem framework)
- **Gráficos:** [Chart.js](https://www.chartjs.org/)
- **Mapa:** [Leaflet](https://leafletjs.com/) com mapas do OpenStreetMap (sem chave de API)

## Estrutura do projeto

```
.
├── public/                # telas (HTML, CSS, imagens)
│   └── img/
├── src/
│   ├── app.js             # servidor Express
│   ├── routes/            # rotas
│   ├── controllers/       # validação e regras
│   ├── models/            # consultas SQL
│   └── database/db.js     # conexão com o MySQL
├── dieta-migracao.sql     # colunas novas da dieta
├── registro-peso.sql      # tabela do histórico de peso
├── .env                   # configurações (não vai para o GitHub)
└── package.json
```

## Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou mais novo
- MySQL 8.0.16 ou mais novo

### Passo a passo

```bash
# 1. clone o repositório
git clone <url-do-repositorio>
cd <pasta-do-projeto>

# 2. instale as dependências
npm install
```

3. **Crie o banco** `projetoindividual` no MySQL e as tabelas (`users`, `infopeso`, `dieta`, `alimento` e as de exercícios).
4. Rode os scripts complementares:
   - `registro-peso.sql`: cria a tabela `registro_peso` (histórico de pesagens);
   - `dieta-migracao.sql`: adiciona as colunas `refeicao` e `unidade` em `alimento` e corrige o `CHECK` da tabela `dieta`.
5. **Configure o `.env`** com os dados de conexão do seu MySQL (veja `src/database/db.js`) e o id do autor:

   ```env
   ID_AUTOR=1
   ```

   O `ID_AUTOR` é o id, na tabela `users`, do usuário cujo treino aparece como "Treino do autor" para todos.
6. **Inicie o servidor:**

   ```bash
   npx nodemon src/app.js
   ```

7. Abra **http://localhost:3000** no navegador e entre sempre por esse endereço. A sessão fica guardada no navegador por endereço, então abrir os arquivos direto pelo explorador de arquivos manda para o login.

## Rotas da API

| Método | Rota | O que faz |
|---|---|---|
| POST | `/users/cadastrar` | Cria a conta |
| POST | `/users/autenticar` | Login |
| POST | `/quiz` | Salva as respostas do quiz (IMC calculado no servidor) |
| GET | `/users/:id/dashboard` | Peso do quiz, meta e altura |
| POST | `/pesos` | Registra uma atualização de peso |
| GET | `/users/:id/pesos` | Histórico de pesos do usuário |
| GET / POST | `/exercicios` | Lista / cria exercícios |
| POST | `/registros` | Registra carga, séries e repetições |
| GET | `/users/:id/registros` | Treino do usuário |
| GET | `/autor/registros` | Treino do autor |
| POST | `/alimentos` | Cadastra um alimento na dieta do usuário |
| GET | `/users/:id/alimentos` | Dieta do usuário |

## Decisões de projeto

- **O que é do autor fica no site; o que é do usuário vai para o banco.** A dieta e as academias do autor são conteúdo fixo da página. Só o que o usuário cadastra (peso, exercícios, alimentos) é gravado no MySQL.
- **O gráfico de evolução só usa dados reais.** Não existe projeção em linha reta: o gráfico muda apenas quando o usuário atualiza o peso.
- **Segurança básica.** Consultas SQL parametrizadas (`?`), validação nos controllers e conteúdo digitado pelo usuário exibido como texto (nunca como HTML).

## Melhorias futuras

- Guardar a senha com hash (por exemplo, bcrypt) e autenticar com token (JWT) em vez de guardar só o id na sessão do navegador
- Editar e excluir registros de treino, dieta e peso
- Sugestão de treino e dieta de acordo com o objetivo do usuário
- Avaliação de academias enviada pelos próprios usuários

## Autor

**Rafael Oliveira** — aluno da SPTech, projeto individual de 2026.
