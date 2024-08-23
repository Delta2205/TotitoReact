import "./App.css";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./Components/Square";
import { TURNS } from "./constants";
import { checkwinner } from "./Logic/board";
import { WinnerModal } from "./Components/WinnerModal";
import { checkEndgame } from "./Logic/board";
import { saveGameToStorage,resetGameStorage } from "./Logic/Storage";
function App() {
  const [board,setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage):Array(9).fill(null)
  })

  const [turn,setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner,setWinner] = useState(null)
  
  // revisnado combinaciones ganadoras para ver si hay un ganador
  
  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

 
  const updateBoard = (index) =>{
    // no actulizar esta posición si ya tienen algo  
    if(board[index] || winner) return
    // actualizando el tablero 
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiando de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // GUARDANDO PARTIDA EN LOCAL STORAGE
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    const newWinner = checkwinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndgame(newBoard)){
      setWinner(false) // empate en el juego 
    }
  }

  return (
    <main className="board">
      <h1>Totito</h1>
      <button onClick={resetGame}>Resetear Partida</button>
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
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  );
}

export default App;
