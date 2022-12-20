import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 4, ncols = 6, chanceLightStartsOn = .5 }) {
  const [board, setBoard] = useState(createBoard(nrows, ncols, chanceLightStartsOn));

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard(nrows, ncols, chanceLightStartsOn) {
    let initialBoard = [];
    initialBoard.length = nrows
    for (let y = 0; y < nrows; y++) {
      let row = []
      for (let x = 0; x < ncols; x++) {
        row.push(<Cell coord={`${y}-${x}`} key={`${y}-${x}`} flipCellsAroundMe={flipCellsAround}
          isLit={Math.random() > chanceLightStartsOn} />
        )
      }
      initialBoard[y] = <tr key={y}>{row}</tr>
    }
    return initialBoard;
  }

  function hasWon(board) {
    const lit = document.getElementsByClassName("lit")
    console.log(lit)
    // TODO: check the board in state to determine whether the player has won.
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      console.log("setBoard")
      const [y, x] = coord.split("-").map(Number);
      const flipCell = (y, x, boardCopy) => {
        console.log(boardCopy[y][x])
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }

        
      };
      const newBoard =()=>{ oldBoard.map((row) => 
        row.slice()
        )}

      // TODO: Make a (deep) copy of the oldBoard
      flipCell(y, x, newBoard)
      flipCell(y + 1, x, newBoard)
      flipCell(y - 1, x, newBoard)
      flipCell(y, x + 1, newBoard)
      flipCell(y, x - 1, newBoard)
      // TODO: in the copy, flip this cell and the cells around it
      return newBoard
      // TODO: return the copy
    });
;
hasWon(board)
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  return (
    <table>
      <tbody>
        {board}
      </tbody></table>
  )

  // TODO
}

export default Board;
