//mapeando o body
const corpo = document.querySelector("body");
//mapeando o form e a tabela
const tabela = document.querySelector("#tbody");
const form = document.querySelector("#info-produtos");
let idx = form.idx.value;
//salvar no localStorage
const atualizarLocalStorage = (produtos) => {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}
const recuperarLocalStorage = () => JSON.parse(localStorage.getItem("produtos") || "[]");


//CAPTURANDO SESSION
let userId = Number(sessionStorage.getItem("logado"));

//LOCALSTORAGE
const usuarios = localStorage.getItem("usuarios");
const session = localStorage.getItem("session");


logadoOuNao();

function logadoOuNao() {
  if (session) {
    sessionStorage.setItem("log", session);
    userId = session;
  }
  if (!userId) {
    location.href = "cadastro.html"
  }
}
const salvarProdutos = (event) => {
  event.preventDefault();
  const nome = form.nomeProduto.value;
  const preco = Number(form.precoProduto.value);
  const prime = form.prime.checked;

  if (idx == "novo") {
    //adicionando ao vetor
    /*vetor recebendo a vetor que pega os dados do
    localStorage e adicionando a ela dados de um
    objeto*/
    const produtos = recuperarLocalStorage();

    let idProduto = 0;

    for (const pro of produtos) {
      if(pro.userId === userId){
         idProduto = Number(pro.id);
      }
     
    }
    produtos.push({id: idProduto += 1, nome, preco, prime, userId});
    atualizarLocalStorage(produtos);
    preencherTabela();
    //resetando as informações assim que forem cadastradas
    form.reset();
  } else {
    let produto = {id: idx, nome, preco, prime, userId};
    atualizarProduto(idx, produto)
    preencherTabela();
    form.reset()
  }
}
const preencherTabela = () => {
  const produtos = recuperarLocalStorage();
  tabela.innerHTML = "";
  for (let produto of produtos) {
    if (produto.userId === userId) {
      tabela.innerHTML += `
        <tr class="trNight">
        <th class="tbodyTh">${produto.id}</th>
          <td>${produto.nome}</td>
          <td>${produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
          <td>${produto.prime ? "Sim" : "Não"}</td>
          <td>
            <img src="img/trash.svg" onclick="removerProduto(${produto.id})">
            <label for="nomeProduto"><img src="img/edit.svg" onclick="editarProduto(${produto.id})"></label>
          </td>
          </tr>`;
    }
  }
}
const removerProduto = (id) => {
  const produtos = recuperarLocalStorage();
  //findIndex vai procurar o id do produto
  const indexProduto = produtos.findIndex(produto => produto.id === id)
  produtos.splice(indexProduto, 1)
  atualizarLocalStorage(produtos);
}
const editarProduto = (id) => {
  const produtos = recuperarLocalStorage();
  const indexProduto = produtos.findIndex((index) => index.id == id);
  form.nomeProduto.value = produtos[indexProduto].nome;
  form.precoProduto.value = produtos[indexProduto].preco;
  form.prime.checked = produtos[indexProduto].prime;
  idx = id;
}
const atualizarProduto = (id, produto) => {
  const produtos = recuperarLocalStorage();
  const indexProduto = produtos.findIndex((index) => index.id == id);
  produtos[indexProduto] = produto;
  atualizarLocalStorage(produtos);
  idx = "novo"
}

const sair = document.querySelector("#sair");
sair.addEventListener("click", (evento) => {
  evento.preventDefault();
  localStorage.removeItem("session");
  sessionStorage.removeItem("logado");
  location.href = "index.html";
})

//EVENTOS
form.addEventListener("submit", salvarProdutos)
//evento para continuar com as informações quando o html for carregado
document.addEventListener("DOMContentLoaded", preencherTabela)
