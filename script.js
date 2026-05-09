const puzzle = document.getElementById("puzzle");

let positions = [
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

positions.forEach(pos => {
  let div = document.createElement("div");
  div.className = "piece";
  div.style.backgroundPosition = pos;
  puzzle.appendChild(div);
});

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
    }
  });
});