// check de ganador
import { WINNER_COMBOS } from "../constants"

export const checkwinner = (boardCheck) =>{
  for(const combo of WINNER_COMBOS){
    const [ a ,b,c] = combo
    if(
      boardCheck[a] &&
      boardCheck[a]  === boardCheck[b] &&
      boardCheck[b] === boardCheck[c]
    ){
      return boardCheck[a]
    }
  }
  return null
}

export  const checkEndgame =  (newBoard)=>{
  return newBoard.every((square)=> square !== null)
}