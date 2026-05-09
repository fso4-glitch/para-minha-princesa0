const btn = document.getElementById("btn");
const conteudo = document.getElementById("conteudo");
const puzzle = document.getElementById("puzzle");
const finalMsg = document.getElementById("final");

btn.onclick = () => {
    conteudo.classList.remove("hidden");
    btn.style.display = "none";
    criarPuzzle();
};

let ordem = [];

function criarPuzzle() {
    puzzle.innerHTML = "";
    ordem = [...Array(9).keys()];

    ordem.sort(() => Math.random() - 0.5);

    ordem.forEach((num, index) => {
        const div = document.createElement("div");
        div.className = "piece";
        div.draggable = true;
        div.dataset.index = index;
        div.dataset.value = num;

        div.style.backgroundPosition =
            `${-(num % 3) * 100}px ${-Math.floor(num / 3) * 100}px`;

        div.addEventListener("dragstart", dragStart);
        div.addEventListener("dragover", dragOver);
        div.addEventListener("drop", drop);

        puzzle.appendChild(div);
    });
}

let dragged;

function dragStart(e) {
    dragged = e.target;
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    if (e.target.className === "piece") {
        let temp = dragged.style.backgroundPosition;
        dragged.style.backgroundPosition = e.target.style.backgroundPosition;
        e.target.style.backgroundPosition = temp;

        let tempVal = dragged.dataset.value;
        dragged.dataset.value = e.target.dataset.value;
        e.target.dataset.value = tempVal;

        verificar();
    }
}

function verificar() {
    const pieces = document.querySelectorAll(".piece");
    let certo = true;

    pieces.forEach((p, i) => {
        if (parseInt(p.dataset.value) !== i) {
            certo = false;
        }
    });

    if (certo) {
        finalMsg.classList.remove("hidden");
    }
}