const puzzle = document.getElementById("puzzle");

// posições corretas
const correto = [
  "0px 0px",
  "-120px 0px",
  "-240px 0px",
  "0px -120px",
  "-120px -120px",
  "-240px -120px",
  "0px -240px",
  "-120px -240px",
  "-240px -240px"
];

// criar peças
correto.forEach(pos => {
  let div = document.createElement("div");
  div.className = "piece";
  div.style.backgroundPosition = pos;
  puzzle.appendChild(div);
});

// embaralhar
function embaralhar() {
  let pieces = document.querySelectorAll(".piece");
  let posicoes = [];

  pieces.forEach(p => posicoes.push(p.style.backgroundPosition));

  for (let i = posicoes.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [posicoes[i], posicoes[j]] = [posicoes[j], posicoes[i]];
  }

  pieces.forEach((p, i) => {
    p.style.backgroundPosition = posicoes[i];
  });
}

// verificar se terminou
function verificar() {
  let pieces = document.querySelectorAll(".piece");
  let certo = true;

  pieces.forEach((p, i) => {
    if (p.style.backgroundPosition !== correto[i]) {
      certo = false;
    }
  });

  if (certo) {
    setTimeout(() => {
      alert("Você conseguiu ❤️\nEu te amo 💖");
    }, 200);
  }
}

// troca peças
let primeira = null;

document.querySelectorAll(".piece").forEach(piece => {
  piece.addEventListener("click", () => {
    if (!primeira) {
      primeira = piece;
      piece.style.border = "2px solid red";
    } else {
      let temp = primeira.style.backgroundPosition;
      primeira.style.backgroundPosition = piece.style.backgroundPosition;
      piece.style.backgroundPosition = temp;

      primeira.style.border = "1px solid #fff";
      primeira = null;

      verificar(); // 👈 verifica depois de cada jogada
    }
  });
});

// 🔥 embaralha automaticamente ao abrir
window.onload = embaralhar;