const puzzle = document.getElementById("puzzle");

// posições corretas
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

// EMBARALHAR FORTE (garantido)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(positions);

// LIMPA antes (IMPORTANTE)
puzzle.innerHTML = "";

// cria peças
positions.forEach(pos => {
  let div = document.createElement("div");
  div.className = "piece";
  div.style.backgroundPosition = pos;
  puzzle.appendChild(div);
});

// troca no toque (celular)
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