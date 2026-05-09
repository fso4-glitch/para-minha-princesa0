const puzzle = document.getElementById("puzzle");

// posições das peças (0 a 8)
let pieces = [0,1,2,3,4,5,6,7,8];

// embaralhar de verdade
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(pieces);

// limpa antes
puzzle.innerHTML = "";

// cria peças embaralhadas
pieces.forEach(num => {
    let div = document.createElement("div");
    div.className = "piece";

    div.style.backgroundImage = "url('foto.jpg')";

    let x = (num % 3) * 120;
    let y = Math.floor(num / 3) * 120;

    div.style.backgroundPosition = `-${x}px -${y}px`;

    puzzle.appendChild(div);
});

// troca ao tocar/clicar
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