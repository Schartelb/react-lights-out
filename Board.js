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

function Board({ nrows = 4, ncols = 6, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard(nrows, ncols, chanceLightStartsOn));

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard(nrows, ncols, chanceLightStartsOn) {
    let initialBoard = [];
    initialBoard.length = nrows
    for (let y = 0; y < nrows; y++) {
      let row = []
      for (let x = 0; x < ncols; x++) {
        row.push({ coord: y + "-" + x, isLit: Math.random() > chanceLightStartsOn })
      }
      initialBoard[y] = row
    }
    return initialBoard;
  }

  function hasWon(board) {
    return board.flat().every((cell)=>cell.isLit)
    // TODO: check the board in state to determine whether the player has won.
  }

  const flipCell = (y, x, boardCopy) => {
    // if this coord is actually on board, flip it
    if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
      boardCopy[y][x].isLit = !boardCopy[y][x].isLit;
    }
  };

  function flipCellsAround(coord) {
    const newBoard = board.map((row) => 
      row.slice()
    )
    const [y, x] = coord.split("-").map(Number)
    
    flipCell(y, x, newBoard)
    flipCell(y + 1, x, newBoard)
    flipCell(y - 1, x, newBoard)
    flipCell(y, x + 1, newBoard)
    flipCell(y, x - 1, newBoard)
    
    setBoard(newBoard);

    hasWon(board)
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  return (
    hasWon(board)?<h2>YOU WIN!</h2>:<table>
      <tbody>
        {board.map((row) =>
          <tr>
            {row.map((cell) => {
              return <Cell isLit={cell.isLit}
                coord={cell.coord}
                flipCellsAroundMe={flipCellsAround} />
            })}
          </tr>)}
      </tbody>
    </table>
  )

  // TODO
}

export default Board;
