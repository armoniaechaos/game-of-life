import React from "react";
import Cell from "../Cell/Cell";
import style from "./grid.module.css";

interface GridProps {
  matrix: Array<Array<boolean>>;
  updateMatrix: (x: number, y: number, value: boolean) => void;
}

export default function Grid(props: GridProps) {
  const { matrix } = props;

  return (
    <div className={style.grid_wrapper}>
      {matrix.map((row, y) => (
        <div className={style.grid_row} key={y}>
          {row.map((item, x) => (
            <Cell
              x={x}
              y={y}
              key={`${x}-${y}`}
              alive={item}
              onClick={props.updateMatrix}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
