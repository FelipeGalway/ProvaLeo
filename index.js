const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Front/index.html");
});

app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});

let nomes = [];

// CREATE
app.post("/cadastroNome", (req, res) => {
    const { nome } = req.body;
    nomes.push(nome);
    console.log("Nome cadastrado:", nome);
    res.sendFile(__dirname + "/Front/index.html");
});

// READ
app.get("/mostrarNomes", (req, res) => {
    console.log("Nomes cadastrados:", nomes);

    // Create a string with the names to display
    const namesToDisplay = nomes.join(', '); // Join names with a comma and space

    // Inject the names into the HTML response
    const htmlResponse = `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CRUD de Nomes</title>
            <link rel="stylesheet" href="/styles.css"/>
        </head>
        <body>
            <h1>Cadastro Nome</h1>
            <form action="/cadastroNome" method="post">
                <label for="nome">Nome:</label>
                <input type="text" name="nome" id="nome">
                <button type="submit">Enviar</button>
            </form>            
            <form action="/mostrarNomes" method="get">
                <span id="mostrar">${namesToDisplay}</span> <!-- Display names here -->
                <button type="submit">Mostrar Nomes</button>
            </form>
            <h2>Atualizar Nome</h2>
            <form action="/atualizarNome" method="post">
                <input type="hidden" name="_method" value="post">
                <label for="nomeParaAtualizar">Nome para Atualizar:</label>
                <input type="text" name="nomeParaAtualizar" id="nomeParaAtualizar">
                <label for="nomeAtualizado">Nome Atualizado:</label>
                <input type="text" name="nomeAtualizado" id="nomeAtualizado">
                <button type="submit">Atualizar</button>
            </form>
            <h2>Deletar Nome</h2>
            <form action="/deletarNome" method="post">
                <input type="hidden" name="_method" value="delete">
                <label for="nomeParaDeletar">Nome para Deletar:</label>
                <input type="text" name="nomeParaDeletar" id="nomeParaDeletar">
                <button type="submit">Deletar</button>
            </form>            
        </body>
        </html>
    `;

    res.send(htmlResponse); 
});

// UPDATE
app.post("/atualizarNome", (req, res) => {
    const { nomeParaAtualizar, nomeAtualizado } = req.body;

    const index = nomes.findIndex((nome) => nome === nomeParaAtualizar);

    if (index !== -1) {
        nomes[index] = nomeAtualizado;
        console.log("Nome atualizado para:", nomeAtualizado);
    } else {
        console.log("Nome não encontrado:", nomeParaAtualizar);
    }

    res.sendFile(__dirname + "/Front/index.html");
});

// DELETE
app.post("/deletarNome", (req, res) => {
    const { nomeParaDeletar } = req.body;
    const index = nomes.findIndex((nome) => nome === nomeParaDeletar);
    if (index !== -1) {
        nomes.splice(index, 1);
        console.log("Nome deletado:", nomeParaDeletar);
    } else {
        console.log("Nome não encontrado:", nomeParaDeletar);
    }
    res.sendFile(__dirname + "/Front/index.html");
});
