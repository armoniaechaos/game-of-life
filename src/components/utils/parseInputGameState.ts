export type GameState = {
  generation: number;
  height: number;
  width: number;
  matrix: Array<Array<boolean>>;
};

// Parse input game state from text file
export default function parseInputGameState(input: string): GameState {
  const rows = input.split("\n");

  if (rows.length < 2) {
    throw new Error("Invalid input");
  }

  const generation = rows[0].split(" ")[1].replace(":", "");

  const [height, width] = rows[1].split(" ");

  const matrix = rows.slice(2).map((row) => {
    return row.split("").map((cell) => {
      return cell === "*";
    });
  });

  return {
    generation: Number(generation),
    height: Number(height),
    width: Number(width),
    matrix,
  };
}
