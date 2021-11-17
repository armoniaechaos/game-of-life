import React from "react";
import style from "./cell.module.css";

interface CellProps {
  alive: boolean;
  x: number;
  y: number;
  onClick: (x: number, y: number, value: boolean) => void;
}

export default function Cell(props: CellProps) {
  function onClick() {
    props.onClick(props.x, props.y, !props.alive);
  }

  return (
    <div
      onClick={onClick}
      className={`${style.cell} ${props.alive ? style.alive : ""}`}
    ></div>
  );
}
