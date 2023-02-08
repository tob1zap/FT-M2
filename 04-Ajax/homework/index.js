//const DeleteRequireCache = require("@11ty/eleventy/src/Util/DeleteRequireCache");

const [boton] = $("#boton");
const [search] = $("#search");
const [deleteButton] = $("#delete");
const url = "http://localhost:5000/amigos";
const [lista] = $("#lista");

const listaDeAmigos = (response) => {
  lista.innerHTML = "";
  response.forEach((friend) => {
    const newLi = document.createElement("li");
    newLi.innerText = `${friend.id} - ${friend.name}`;
    lista.appendChild(newLi);
  });
};

const mostrarAmigos = () => {
  //  $("#lista").empty();
  $.get(url, listaDeAmigos);
};

const buscarAmigo = () => {
  const [input] = $("#input");
  const id = input.value;
  id.innerText = "";
  $.get(`${url}/${id}`, (response) => {
    const [amigo] = $("#amigo");
    amigo.innerText = response.name;
  });
};

const borrarAmigo = () => {
  const [inputDelete] = $("#inputDelete");
  const id = inputDelete.value;
  $.ajax({
    type: "DELETE",
    url: `${url}/${id}`,
    success: (response) => listaDeAmigos(response),
  });
};

boton.addEventListener("click", mostrarAmigos);
search.addEventListener("click", buscarAmigo);
deleteButton.addEventListener("click", borrarAmigo);
