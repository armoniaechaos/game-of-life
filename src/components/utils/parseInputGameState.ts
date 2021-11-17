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

  const generationRaw = rows[0].split(" ")[1];
  const generation = generationRaw ? Number(generationRaw.replace(":", "")) : 0;

  const [height, width] = rows[1].split(" ");

  if (!height || !width || !Number(height) || !Number(width)) {
    throw new Error("Invalid input");
  }

  const matrix = rows.slice(2).map((row) => {
    return row.split("").map((cell) => {
      return cell === "*";
    });
  });

  return {
    generation: generation,
    height: Number(height),
    width: Number(width),
    matrix,
  };
}
