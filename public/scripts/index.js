/* Criando uma const para o botao e buscando o campo usando o nome ou caminho do mesmo*/
const buttonSerch = document.querySelector("#page-home main a");
/* Criando uma const para selecionar o modal definido pelo ID */
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");

buttonSerch.addEventListener("click", () => {
  /* Remevendo a classe HIde onde oculta o diplay para mostrarlo*/
  modal.classList.remove("hide");
});

close.addEventListener("click", () => {
  /*Ouvindo as classes do model e adicionando o hide para esconder o display */
  modal.classList.add("hide");
});
