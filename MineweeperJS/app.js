document.addEventListener("DOMContentLoaded", () => {
  const $ = document.querySelector.bind(document);

  const grid = $(".grid");
  let width = 10;
  let squares = [];
  let bombAmount = 20;
  let flagAmount = 20;
  let isGameOver = false;
  //CREATE BOARD

  function createBoard() {
    //PLACE BOMBS

    const bombsArray = Array(bombAmount).fill("bomb");
    const validArray = Array(width * width - bombAmount).fill("valid");
    const gameArray = [...validArray, ...bombsArray];
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
      square.classList.add(shuffledArray[i]);
      square.classList.add("initial");
      grid.appendChild(square);
      squares.push(square);

      // NORMAL CLICK
      square.addEventListener("click", (e) => {
        click(square);
      });

      // RIGHT CLICK || CTRL & LEFT CLICK
      square.oncontextmenu = (e) => {
        e.preventDefault();
        addFlag(square);
      };
    }

    //ADD NUMBERS
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;
      if (squares[i].classList.contains("valid")) {
        //WEST ⬅
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
          total++;
        //NORTH EAST ↗
        if (
          i > 9 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains("bomb")
        )
          total++;
        //NORTH ⬆
        if (i > 10 && squares[i - width].classList.contains("bomb")) total++;
        //NORTH WEST ↖
        if (
          i > 11 &&
          !isLeftEdge &&
          squares[i - 1 - width].classList.contains("bomb")
        )
          total++;
        //EAST ➡
        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains("bomb"))
          total++;
        //SOUTH WEST ↙
        if (
          i < 90 &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains("bomb")
        )
          total++;
        //SOUTH EAST ↘
        if (
          i < 88 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains("bomb")
        )
          total++;
        // SOUTH ⬇
        if (i < 89 && squares[i + width].classList.contains("bomb")) total++;
        squares[i].setAttribute("data", total);
      }
    }
  }

  createBoard();

  function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains("checked") && flagAmount > 0) {
      if (!square.classList.contains("flag")) {
        square.classList.add("flag");
        square.innerHTML = "🚩";
        flagAmount--;
        checkForWin();
      } else {
        square.classList.remove("flag");
        square.innerHTML = "";
        flagAmount++;
      }
      $("#count").innerHTML = flagAmount;
    }
  }

  function click(square) {
    const currentId = square.id;
    if (isGameOver) return;
    if (
      square.classList.contains("checked") ||
      square.classList.contains("flag")
    )
      return;
    if (square.classList.contains("bomb")) {
      gameOver(square);
      return;
    } else {
      let total = square.getAttribute("data");
      if (total != 0) {
        square.classList.add("checked");
        square.innerHTML = total;
        return;
      }
      checkSquare(currentId);
    }
    square.classList.add("checked");
  }

  // CHECK SURROUND SQUARES ONCE SQUARE IS CLICKED

  function checkSquare(currentId) {
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 10) {
        const newId = squares[parseInt(currentId - width)].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 89) {
        const newId = squares[parseInt(currentId) + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 10);
  }

  function gameOver(square) {
    $("#result").innerHTML = "FAILED";
    $("#result").style.color = "#ff5964";
    isGameOver = true;

    // SHOW ALL BOMBS
    squares.forEach((square) => {
      if (
        square.classList.contains("bomb") &&
        !square.classList.contains("flag")
      ) {
        square.innerHTML = "💣";
        square.style.borderColor = "#ff5964 #ff4754 #ff3341 #ff1f2e";
        square.style.backgroundColor = "#ff707a";
      }
    });
  }

  function checkForWin() {
    let matches = 0;
    for (let i = 0; i < squares.length; i++) {
      if (
        squares[i].classList.contains("flag") &&
        squares[i].classList.contains("bomb")
      ) {
        matches++;
      }
      if (matches === bombAmount) {
        $("#result").innerHTML = "SUCCESS";
        $("#result").style.color = "#67f178";
        isGameOver = true;
        return;
      }
    }
  }
});
