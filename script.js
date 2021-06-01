//
let gameboard = (function () {
  let container = document.querySelector(".section-container");

  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      let section = document.createElement("div");
      section.classList.add("section" + i + j);
      section.classList.add("section");
      section.textContent = "";

      container.appendChild(section);
    }
  }

  let rows = [
    [NaN, NaN, NaN],
    [NaN, NaN, NaN],
    [NaN, NaN, NaN],
  ];

  let columns = [
    [NaN, NaN, NaN],
    [NaN, NaN, NaN],
    [NaN, NaN, NaN],
  ];
  return {
    rows: rows,
    columns: columns,
    container: container,
  };
})();

function player(name, sign) {
  return {
    name: name,
    sign: sign,
  };
}

let game = (function () {
  let player1 = player("player1", "X");
  let player2 = player("player2", "O");
  var playingSide = player1;
  function turn(e) {
    if (playingSide === player1) {
      e.target.textContent = "O";
      e.target.classList.add("player1");
      playingSide = player2;
      let temp = [...e.target.classList][0];
      let j = temp[temp.length - 1];
      let i = temp[temp.length - 2];
      gameboard.rows[i - 1][j - 1] = e.target.textContent;
      gameboard.columns[j - 1][i - 1] = e.target.textContent;
      check(player1);
    } else {
      e.target.textContent = "X";
      e.target.classList.add("player2");
      playingSide = player1;
      let temp = [...e.target.classList][0];
      let j = temp[temp.length - 1];
      let i = temp[temp.length - 2];
      gameboard.rows[i - 1][j - 1] = e.target.textContent;
      gameboard.columns[j - 1][i - 1] = e.target.textContent;
      check(player2);
    }
  }
  let sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.addEventListener("click", turn);
  });
})();

function check(playingSide) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        (gameboard.rows[i][j] === gameboard.rows[i][j + 1] &&
          gameboard.rows[i][j + 1] === gameboard.rows[i][j + 2]) ||
        (gameboard.columns[i][j] === gameboard.columns[i][j + 1] &&
          gameboard.columns[i][j + 1] === gameboard.columns[i][j + 2]) ||
        (gameboard.rows[0][0] === gameboard.rows[1][1] &&
          gameboard.rows[1][1] === gameboard.rows[2][2]) ||
        (gameboard.rows[0][2] === gameboard.rows[1][1] &&
          gameboard.rows[1][1] === gameboard.rows[2][0])
      ) {
        gameboard.container.classList.add("end");
        const scoreBoard = document.querySelector(".score-board");
        scoreBoard.textContent = `winner is ${playingSide.name}`;
        return `winner is ${playingSide.name}`;
      }
    }
  }
}
