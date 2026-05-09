const puzzle = document.getElementById("puzzle");
const audioBox = document.getElementById("audioBox");
const musica = document.getElementById("musica");
const mensagem = document.getElementById("mensagem");
const tituloMensagem = document.getElementById("tituloMensagem");

let pecas = [];
let ordem = [];

// cria peças
for (let i = 0; i < 9; i++) {
  pecas.push(i);
}

// embaralhar
ordem = pecas.sort(() => Math.random() - 0.5);

function criarPuzzle() {
  puzzle.innerHTML = "";

  ordem.forEach((num, index) => {
    const div = document.createElement("div");
    div.classList.add("peca");

    const x = (num % 3) * 100;
    const y = Math.floor(num / 3) * 100;

    div.style.backgroundPosition = `-${x}px -${y}px`;

    div.setAttribute("draggable", true);
    div.dataset.index = index;

    // arrastar
    div.addEventListener("dragstart", dragStart);
    div.addEventListener("dragover", dragOver);
    div.addEventListener("drop", drop);

    // toque (celular)
    div.addEventListener("click", () => trocar(index));

    puzzle.appendChild(div);
  });
}

let arrastando = null;

function dragStart(e) {
  arrastando = e.target.dataset.index;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  const alvo = e.target.dataset.index;
  trocarPecas(arrastando, alvo);
}

function trocar(index) {
  if (arrastando === null) {
    arrastando = index;
  } else {
    trocarPecas(arrastando, index);
    arrastando = null;
  }
}

function trocarPecas(i1, i2) {
  [ordem[i1], ordem[i2]] = [ordem[i2], ordem[i1]];
  criarPuzzle();
  verificar();
}

function verificar() {
  let correto = ordem.every((num, i) => num === i);

  if (correto) {
    // 🎵 mostra áudio
    audioBox.style.display = "block";

    // 💖 mostra mensagem
    mensagem.style.display = "block";
    tituloMensagem.style.display = "block";

    // tenta tocar
    musica.play();
  }
}

// iniciar já embaralhado
criarPuzzle();