import React from "react";
import parseInputGameState, { GameState } from "../utils/parseInputGameState";
import style from "./gameControls.module.css";

interface IGameLoopProps {
  onLoadState: (state: GameState) => void;
  onNextGeneration: () => void;
  onReset: () => void;
}
export default function GameControls(props: IGameLoopProps) {
  const fileInput = React.createRef<HTMLInputElement>();

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;

      if (text) {
        try {
          const gameState = parseInputGameState(text.toString());
          if (gameState) {
            props.onLoadState(gameState);
          }
        } catch (e) {
          alert("Invalid input file");
          fileInput.current!.value = "";
        }
      }
    };

    reader.readAsText(file);
  }

  return (
    <div className={style.gameControls}>
      <button onClick={props.onNextGeneration}>Next generation</button>
      <button onClick={props.onReset}>Reset state</button>
      <input type="file" id="file" ref={fileInput} onChange={onChange} />
    </div>
  );
}
