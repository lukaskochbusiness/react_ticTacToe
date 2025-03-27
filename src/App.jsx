import React from 'react';

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2], // oben
    [3, 4, 5], // mitte
    [6, 7, 8], // unten
    [0, 3, 6], // links
    [1, 4, 7], // mitte vertikal
    [2, 5, 8], // rechts
    [0, 4, 8], // diagonal \
    [2, 4, 6], // diagonal /
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;   // wenn schon belegt oder Gewinner fest steht --> nichts tun

    const nextSquares = squares.slice();    // Kopie vom aktuellen Array
    nextSquares[i] = xIsNext ? "X" : "O";   // Setze "X" oder "O" je nach Spieler

    setSquares(nextSquares);
    setXIsNext(!xIsNext);                   // Spielerwechsel
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner:" + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>

      <div className='status'>{status}</div>

      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board />
    </div>
  );
}

export default App;
