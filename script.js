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

// embaralhar
positions.sort(() => Math.random() - 0.5);

// criar peças
positions.forEach(pos => {
    let div = document.createElement("div");
    div.className = "piece";
    div.style.backgroundPosition = pos;
    puzzle.appendChild(div);
});

let primeira = null;

document.querySelectorAll(".piece").forEach(piece => {

    piece.addEventListener("touchstart", () => {
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