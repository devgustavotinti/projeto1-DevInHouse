const form = document.querySelector("#form");
const inputTarefa = document.querySelector("#inputTarefa");
const lista = document.querySelector(".lista");
const msgErro = document.querySelector(".msgErro");
const limparTarefa = document.querySelector('.limparTarefa')
let itensLista = [];


// Aciona a função quando o usuário dar submit, prevendo o evento padrão do form
function adicionarItem(event) {
  event.preventDefault();
  adicionarNaLista(inputTarefa.value);
}
form.addEventListener("submit", adicionarItem);


// Pegará o valor da variavel Input Tarefa e acionará esta função
function adicionarNaLista(itemTarefa) {
  let itemAdicionado = document.createElement('div')
  itemAdicionado.classList.add('containerItem')
  

  // se verdadeiro, rodará o código a seguir
  if (itemTarefa) {
    msgErro.innerText = null;
    inputTarefa.classList.remove("inativo");

    
    // criará os elementos a seguir dentro da div criado, pela variavel itemAdicionado
    itemAdicionado.innerHTML = `
        <input type="checkbox" class="novoItem"> 
        <li class="li"> ${itemTarefa} </li>
        <input type="button" value="X" onClick="removeItens(event)" class="removeItem">
        `


    lista.appendChild(itemAdicionado); // adicionará os itens abaixo da ul com a classe lista

    itensLista.push(itemTarefa); // adicionará os novos elementos ao final da array

    salveLocalStorage(); // salva os valores digitados automaticamente no localStorage

    inputTarefa.value = "";
    inputTarefa.focus();
  } // se for falso, aparecerá uma mensagem de alerta e bordas vermelhas no input
  else {
    inputTarefa.classList.add("inativo");
    msgErro.innerHTML = `<span>Atenção!</span> Você deixou o espaço em branco, digite uma nova tarefa.`;
  }
}


// quando clicar no input button value X, removerá a div criada
function removeItens(event) {
  var item = document.querySelector(".containerItem");
  item.parentNode.removeChild(event.target.parentNode);

  // Pega o texto da li
  // var descobrindoText = event.target.previousElementSibling.innerText

  // Descobri a posição em que o texto está na Array. ERRO: Não está encontrando a posição correta, está devolvendo -1
  // itensLista.indexOf(descobrindoPosicao)

  // Exclui o elemento encontrado 
  // itensLista.splice(descobrindoPosicao, 1)

  // Atualiza a array
  // localStorage.setItem("listaProjeto", JSON.stringify(itensLista))
}


// Salvando os itens na key listaProjeto
function salveLocalStorage() {
  localStorage.setItem("listaProjeto", JSON.stringify(itensLista)); // converte os valores para um formato de String
}

// Carregará a página com os itens salvos no Local Storage com a key listaProjeto
function carregarListaLocalStorage() {
  var listaLocalStorage = localStorage.getItem("listaProjeto");

  if (listaLocalStorage) {
    listaLocalStorage = JSON.parse(listaLocalStorage);

    for (let i = 0; i < listaLocalStorage.length; i++) {
      adicionarNaLista(listaLocalStorage[i]);
    }
  }
}
carregarListaLocalStorage();

// Remove todos os elementos da lista no localStorage e atualiza a página
function limparTarefas() {
  window.location.reload()
  localStorage.clear()
}
limparTarefa.addEventListener('click', limparTarefas)