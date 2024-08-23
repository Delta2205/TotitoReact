export const saveGameToStorage = ({board , turn})=>{
  window.localStorage.setItem('board',JSON.stringify(board))
  window.localStorage.setItem('trun',turn)
}

export const resetGameStorage =()=>{
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')

}