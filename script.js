const puzzle = document.getElementById("puzzle");

const correto = [
  "0% 0%",
  "50% 0%",
  "100% 0%",
  "0% 50%",
  "50% 50%",
  "100% 50%",
  "0% 100%",
  "50% 100%",
  "100% 100%"
];

// criar peças
correto.forEach(pos => {
  let div = document.createElement("div");
  div.className = "piece";
  div.style.backgroundPosition = pos;
  div.setAttribute("draggable", true);
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

// verificar se completou
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
      document.getElementById("declaracao").style.display = "block";

      // 🔥 desce suave
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });

      // 🔊 toca música automaticamente
      document.getElementById("musica").play();
    }, 300);
  }
}

// troca peças
function trocar(a, b) {
  let temp = a.style.backgroundPosition;
  a.style.backgroundPosition = b.style.backgroundPosition;
  b.style.backgroundPosition = temp;
  verificar();
}

let arrastando = null;

document.querySelectorAll(".piece").forEach(piece => {

  piece.addEventListener("dragstart", () => {
    arrastando = piece;
  });

  piece.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  piece.addEventListener("drop", () => {
    if (arrastando && arrastando !== piece) {
      trocar(arrastando, piece);
    }
  });

  // 📱 mobile
  piece.addEventListener("touchstart", () => {
    arrastando = piece;
  });

  piece.addEventListener("touchend", (e) => {
    let touch = e.changedTouches[0];
    let alvo = document.elementFromPoint(touch.clientX, touch.clientY);

    if (alvo && alvo.classList.contains("piece") && arrastando !== alvo) {
      trocar(arrastando, alvo);
    }
  });
});

// iniciar
window.onload = embaralhar;