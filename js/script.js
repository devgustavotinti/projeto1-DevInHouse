const form = document.querySelector("#form");
const inputTarefa = document.querySelector("#inputTarefa");
const lista = document.querySelector(".lista");
const msgErro = document.querySelector(".msgErro");
let itensLista = [];

// Aciona a função quando o usuário dar submit, prevendo o evento padrão do form
function adicionarItem(event) {
  event.preventDefault();
  adicionarNaLista(inputTarefa.value);
}
form.addEventListener("submit", adicionarItem);

// Pegará o valor da variavel Input Tarefa e acionará esta função
function adicionarNaLista(itemTarefa, status, indice) {
  let itemAdicionado = document.createElement('div')
  itemAdicionado.classList.add('containerItem')
  


  // se verdadeiro, rodará o código a seguir
  if (itemTarefa) {
    msgErro.innerText = null;
    inputTarefa.classList.remove("inativo");

    // criará os elementos a seguir dentro da div criado, pela variavel itemAdicionado
    itemAdicionado.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice} class="novoItem"> 
        <li> ${itemTarefa} </li>
        <input type="button" data-indice=${indice} value="X" onClick="removeItens(event)" class="removeItem">
        `


    lista.appendChild(itemAdicionado); // adicionará os itens abaixo da ul com a classe lista

    itensLista.push(itemTarefa); // adicionará os novos elementos ao final da array

    salveLocalStorage(); // salva os valores digitados automaticamente no localStorage

    inputTarefa.value = "";
    inputTarefa.focus();
  } // se for falso, aparecerá uma mensagem de alerta e bordas vermelhas no input
  else {
    inputTarefa.classList.add("inativo");
    msgErro.innerHTML = `<span>Atenção!</span>    Você deixou o espaço em branco, digite uma nova tarefa.`;
  }
}



// quando clicar no input button value X, removerá a div criada
function removeItens(event) {
  var item = document.querySelector(".containerItem");
  item.parentNode.removeChild(event.target.parentNode);

  localStorage.removeItem('listaProjeto', item)

  // localStorage.clear()

  // localStorage.clear()

  // console.log(event.target.previousElementSibling.innerText)

  // itensLista.remove(event.target.previousElementSibling.innerText)

}

// salvando os itens na key listaProjeto
function salveLocalStorage() {
  localStorage.setItem("listaProjeto", JSON.stringify(itensLista));
}

// carregará a página com os itens salvos no Local Storage com a key listaProjeto
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
