function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUfs();

function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`;

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

//Itens de coleta
//Pegar todos os Li`s

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  //Adding or remove class in JavaScript
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  // console.log(`ITEM ID:`, itemId);

  //verificar se esxtem itens selecionas, se sim
  //pegar os itens selecionados

  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId;
    return itemFound;
  });

  console.log(alreadySelected);

  //Se já estiver selecionado, tirar da selecao
  if (alreadySelected >= 0) {
    //tirar da seleceao
    const filteredItems = selectedItems.filter((item) => {
      const itemsIsDifferent = item != itemId; //false
      return itemsIsDifferent;
    });

    selectedItems = filteredItems;
  } else {
    //se nao estiver selecionado,
    //Adicionar  a selecao
    selectedItems.push(itemId);
  }

  // console.log(`SELECTED ITEMS:`, selectedItems);

  //atualizar o campo escondido (hide input) (LINHA 51)
  collectedItems.value = selectedItems;
}