import React, { useCallback } from "react";
import getNeighborsCount from "./utils/getNeighborsCount";

import Grid from "./Grid/Grid";
import GameControls from "./GameControls/GameControls";
import { GameState } from "./utils/parseInputGameState";
// function to mutate the matrix state
const mutateMatrix = (
  matrix: Array<Array<boolean>>,
  y: number,
  x: number,
  value: boolean
) =>
  matrix.map((row: Array<boolean>, indexY: number) => {
    if (y === indexY) {
      return row.map((item: boolean, indexX: number) => {
        if (indexX === x) {
          return value;
        }

        return item;
      });
    }

    return row;
  });

const live = (matrix: Array<Array<boolean>>) =>
  matrix.map((row, y) =>
    row.map((alive, x) => {
      const neighbours = getNeighborsCount(matrix, x, y);

      //  Any live cell with fewer than two live neighbours dies
      if (neighbours < 2) {
        return false;
      }

      // Any live cell with more than three live neighbours dies
      if (neighbours > 3) {
        return false;
      }

      // Any live cell with two or three live neighbours lives on to the next generation.
      if (alive && (neighbours === 2 || neighbours === 3)) {
        return true;
      }

      // Any dead cell with exactly three live neighbours becomes a live cell.
      if (neighbours === 3) {
        return true;
      }

      return false;
    })
  );

interface IGameLoopProps {}

export const MATRIX_WIDTH = 8;
export const MATRIX_HEIGHT = 4;

export default function GameLoop(props: IGameLoopProps) {
  const [generation, setGeneration] = React.useState(0);
  const [matrixWidth, setMatrixWidth] = React.useState(MATRIX_WIDTH);
  const [matrixHeigth, setMatrixHeigth] = React.useState(MATRIX_HEIGHT);

  const [matrix, setMatrix] = React.useState<boolean[][]>(
    Array(matrixHeigth).fill(Array(matrixWidth).fill(false))
  );

  const updateMatrix = useCallback(
    (x, y, value) => {
      setMatrix(mutateMatrix(matrix, y, x, value));
    },
    [matrix]
  );

  function onNextGeneration() {
    setMatrix(live(matrix));
    setGeneration(generation + 1);
  }

  function onLoadState(state: GameState) {
    setMatrix(state.matrix);
    setMatrixHeigth(state.height);
    setMatrixWidth(state.width);
    setGeneration(state.generation);
    alert("Game loaded");
  }

  function onReset() {
    setMatrix(Array(matrixHeigth).fill(Array(matrixWidth).fill(false)));
    setGeneration(0);
  }

  return (
    <div>
      <p>Generation: {generation}</p>
      <p>
        {matrixHeigth} {matrixWidth}
      </p>
      <Grid matrix={matrix} updateMatrix={updateMatrix} />

      <GameControls
        onLoadState={onLoadState}
        onNextGeneration={onNextGeneration}
        onReset={onReset}
      />
    </div>
  );
}
