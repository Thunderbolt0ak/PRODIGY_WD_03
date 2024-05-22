let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let againbttn = document.querySelector("#play-again");
let singlemode = document.querySelector("#single");
let multimode = document.querySelector("#multi");
let turn = "X";
let end = false;
let singlePlayer = false;
boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!end && e.innerHTML === "") {
            e.innerHTML = turn;
            win();
            draw();
            if (turn === "X") {
                turn = "O";
                document.querySelector(".bg").style.left = "85px";
            } else {
                turn = "X";
                document.querySelector(".bg").style.left = "0";
            }
            if (singlePlayer && turn === "O" && !end) {
                setTimeout(() => sinmove(), 500); 
            }}});});
function sinmove() {
    let availableBoxes = Array.from(boxes).filter(box => box.innerHTML === "");
    if (availableBoxes.length > 0) {
        let sinchoice = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        sinchoice.innerHTML = turn;
        win();
        draw();
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }}
function win() {
    let winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < 8; i++) {
        let pattern0 = boxes[winPatterns[i][0]].innerHTML;
        let pattern1 = boxes[winPatterns[i][1]].innerHTML;
        let pattern2 = boxes[winPatterns[i][2]].innerHTML;
        if (pattern0 !== "" && pattern0 === pattern1 && pattern0 === pattern2) {
            end = true;
            document.querySelector("#results").innerHTML = turn + " wins";
            againbttn.style.display = "inline";
            for (let j = 0; j < 3; j++) {
                boxes[winPatterns[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winPatterns[i][j]].style.color = "#000";
            }}}}
function draw() {
    if (!end) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });
        if (isDraw) {
            end = true;
            document.querySelector("#results").innerHTML = "Draw";
            againbttn.style.display = "inline";
        }}}
function resetGame() {
    end = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    againbttn.style.display = "none";
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });}
resetbtn.addEventListener("click", resetGame);
againbttn.addEventListener("click", resetGame);
singlemode.addEventListener("click", () => {
    singlePlayer = true;
    resetGame();
    singlemode.classList.add("selected");
    multimode.classList.remove("selected");
});
multimode.addEventListener("click", () => {
    singlePlayer = false;
    resetGame();
    multimode.classList.add("selected");
    singlemode.classList.remove("selected");
});
multimode.classList.add("selected");
