const puzzle = document.getElementById("puzzle");
const audioBox = document.getElementById("audioBox");
const musica = document.getElementById("musica");
const mensagem = document.getElementById("mensagem");
const tituloMensagem = document.getElementById("tituloMensagem");

let ordem = [];
let selecionada = null;

// cria ordem embaralhada SEM BUG
function embaralhar() {
  ordem = [...Array(9).keys()];
  for (let i = ordem.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
  }
}

function criarPuzzle() {
  puzzle.innerHTML = "";

  ordem.forEach((num, index) => {
    const div = document.createElement("div");
    div.classList.add("peca");

    const x = (num % 3) * 100;
    const y = Math.floor(num / 3) * 100;

    div.style.backgroundPosition = `-${x}px -${y}px`;

    // 👉 clique/toque (FUNCIONA NO CELULAR)
    div.addEventListener("click", () => clicar(index));

    puzzle.appendChild(div);
  });
}

function clicar(index) {
  if (selecionada === null) {
    selecionada = index;
  } else {
    trocar(selecionada, index);
    selecionada = null;
  }
}

function trocar(i1, i2) {
  [ordem[i1], ordem[i2]] = [ordem[i2], ordem[i1]];
  criarPuzzle();
  verificar();
}

function verificar() {
  let correto = ordem.every((num, i) => num === i);

  if (correto) {
    audioBox.style.display = "block";
    mensagem.style.display = "block";
    tituloMensagem.style.display = "block";

    musica.play();
  }
}

// INICIAR CERTO
embaralhar();
criarPuzzle();