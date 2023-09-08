import { useEffect, useState } from "react";
import "./App.css";
import Square from "./components/Square";
import { Patterns } from "./components/Patterns";

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const chooseSquare = (square) => {
    setBoard(
      board.map((val, idx) => {
        if (idx === square && val == "") {
          return player;
        }
        return val;
      })
    );
  };

  useEffect(() => {
    checkWin();
    checkIfTie();
    if (player == "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  useEffect(() => {
    if (result.state == `none`) alert(`winner : ${result.winner}`);
  }, [result]);

  const checkWin = () => {
    Patterns.forEach((currentPattern) => {
      const firstPlayer = board[currentPattern[0]];
      if (firstPlayer == "") return;
      let winner = true;
      currentPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          winner = false;
        }
      });
      if (winner) {
        setResult({ winner: player, state: "Won" });
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });
    if (filled) {
      setResult({winner:"No one", state:"Tie"})
    }
  };
  return (
    <>
      <h1>TIC - TAC - TOE</h1>
      <div className="app">
        <div className="board">
          <div className="row">
            <Square val={board[0]} chooseSquare={() => chooseSquare(0)} />
            <Square val={board[1]} chooseSquare={() => chooseSquare(1)} />
            <Square val={board[2]} chooseSquare={() => chooseSquare(2)} />
          </div>
          <div className="row">
            <Square val={board[3]} chooseSquare={() => chooseSquare(3)} />
            <Square val={board[4]} chooseSquare={() => chooseSquare(4)} />
            <Square val={board[5]} chooseSquare={() => chooseSquare(5)} />
          </div>
          <div className="row">
            <Square val={board[6]} chooseSquare={() => chooseSquare(6)} />
            <Square val={board[7]} chooseSquare={() => chooseSquare(7)} />
            <Square val={board[8]} chooseSquare={() => chooseSquare(8)} />
          </div>
        </div>
      </div>
      <button>Clear All</button>
    </>
  );
}

export default App;
