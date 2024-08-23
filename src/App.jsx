import "./App.css";
import { useState } from "react";
const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({children,updateBoard,index, isSelected })=>{
  const className = `square ${isSelected ? 'is-selected':''}`
  const handlClick = () =>{
    updateBoard(index)
  }

  return(
    <div className={className} onClick={handlClick}>
      {children}
    </div>
  )
}

function App() {
  const [board,setBoard] = useState(Array(9).fill(null))

  const [turn,setTurn] = useState(TURNS.X)

  const updateBoard = (index) =>{
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }

  return (
    <main className="board">
      <h1>Totito</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <div className="cell" key={index}>
              <span className="cell_content">
                <Square key={index} index={index} updateBoard={updateBoard} >{board[index]}</Square>
              </span>
            </div>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default App;
