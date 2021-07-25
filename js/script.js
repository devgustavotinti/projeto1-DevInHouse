const form = document.querySelector("#form");
const inputTarefa = document.querySelector("#inputTarefa");
const lista = document.querySelector(".lista");
const msgErro = document.querySelector(".msgErro");
let itensLista = [];

let itemTarefa = inputTarefa.value

// let li = document.createElement('li')

// let inputCheck = document.createElement('input')
// inputCheck.setAttribute('type', 'checkbox')

// let inputButton = document.createElement('input')
// inputButton.setAttribute('type', 'button')
// inputButton.setAttribute('value', 'X')

// Aciona a função quando o usuário dar submit, prevendo o evento padrão do form
function adicionarItem(event) {
  event.preventDefault();
  adicionarNaLista(inputTarefa.value);
}
form.addEventListener("submit", adicionarItem);


// Pegará o valor da variavel Input Tarefa e acionará esta função
function adicionarNaLista(itemTarefa, indice) {
  let itemAdicionado = document.createElement('div')
  itemAdicionado.classList.add('containerItem')
  

  // se verdadeiro, rodará o código a seguir
  if (itemTarefa) {
    msgErro.innerText = null;
    inputTarefa.classList.remove("inativo");

    // li.appendChild(document.createTextNode(itemTarefa)) 


    // itemAdicionado.appendChild(inputCheck)
    // itemAdicionado.appendChild(li)
    // itemAdicionado.appendChild(inputButton)
    
    // criará os elementos a seguir dentro da div criado, pela variavel itemAdicionado
    itemAdicionado.innerHTML = `
        <input type="checkbox" class="novoItem" data-indice=${indice}> 
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
  return itemTarefa
}


// quando clicar no input button value X, removerá a div criada
function removeItens(event) {
  var item = document.querySelector(".containerItem");
  item.parentNode.removeChild(event.target.parentNode);

  var descobrindoText = event.target.previousElementSibling.innerText 
  // itensLista.indexOf(descobrindoPosicao)
  // itensLista.splice(descobrindoPosicao, 1)
  // localStorage.setItem("listaProjeto", JSON.stringify(itensLista))
  
  // var procura = itensLista.indexOf(descobrindoPosicao)
  // var remove = itensLista.splice(descobrindoPosicao, 1)

  console.log(descobrindoText)
  // console.log(procura)
  // console.log(remove)

  // console.log('indexOf:', itensLista.indexOf(descobrindoPosicao))
  // console.log('Splice:', itensLista.splice(descobrindoPosicao, 1))
  // console.log('Splice:', itensLista.pop(descobrindoPosicao, 1))
  // console.log('itensLista:', itensLista)

  // localStorage.setItem("listaProjeto", JSON.stringify(itensLista))

  // console.log(localStorage.listaProjeto)
  // localStorage.setItem('listaProjeto')
  // localStorage.clear()
  // console.log(event.target.previousElementSibling.innerText)
  // itensLista.remove(event.target.previousElementSibling.innerText)
}



// salvando os itens na key listaProjeto
function salveLocalStorage() {
  localStorage.setItem("listaProjeto", JSON.stringify(itensLista)); // converte os valores para um formato de String
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
