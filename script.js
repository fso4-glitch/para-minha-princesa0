const puzzle = document.getElementById("puzzle");

let positions = [];

// cria posições corretas
for (let i = 0; i < 9; i++) {
    positions.push(
        `${-(i % 3) * 120}px ${-Math.floor(i / 3) * 120}px`
    );
}

// embaralha as posições
positions.sort(() => Math.random() - 0.5);

// cria peças já embaralhadas
positions.forEach(pos => {
    let div = document.createElement("div");
    div.className = "piece";
    div.style.backgroundPosition = pos;
    puzzle.appendChild(div);
});

// lógica de troca
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