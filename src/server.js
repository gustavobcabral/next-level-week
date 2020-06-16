const express = require("express");
const server = express();

//pegar banco de dados
const db = require("./database/db");

//configurar pasta publica para mostrar nas paginas
server.use(express.static("public"));

// habilita o uso do req.body minha aplicacao
server.use(express.urlencoded({ extended: true }));

// utilizando tamplete engine (nunjucks poder usar js em arquivo html)
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//Configurar caminhos da aplicacao
// Pagina inicial
server.get("/", (req, res) => {
  /* enviando um arquivo __dirname = diretorio onde esta */
  return res.render("index.html");
});

server.get("/create-point", (req, res) => {
  //req.query : Query strings da nossa url
  console.log(req.query);

  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
  // req.body: o corpo do nosso formulario
  // console.log(req.body);

  // inserir dados no banco de dados

  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `;

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return "Erro no cadastro!";
    }
    console.log("Cadastrado com sucesso!");
    console.log(this);
    //retornar somente após o cadastro
    return res.render("create-point.html", { saved: true });
  }

  db.run(query, values, afterInsertData);
});

server.get("/search", (req, res) => {
  const search = req.query.search;
  if (search == "") {
    //Pesquisa vazia
    return res.render("search-results.html", { total: 0 });
  }

  //pegar dados do banco
  db.all(`SELECT * FROM places WHERE CITY LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    console.log("Aqui estão seus registros!");
    console.log(rows);

    //mostrando o total de elementos
    const total = rows.length;
    //Mostrar pagina html com os dadsos do banco de dados
    return res.render("search-results.html", { places: rows, total });
  });
});

//ligar servidor
server.listen(3000);
