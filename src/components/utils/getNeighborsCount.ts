// Function to get the number of neighbors of a cell given its coordinates
const getNeighborsCount = (
  matrix: Array<Array<boolean>>,
  y: number,
  x: number
) =>
  [
    matrix[x - 1]?.[y - 1],
    matrix[x - 1]?.[y],
    matrix[x - 1]?.[y + 1],

    matrix[x]?.[y + 1],

    matrix[x + 1]?.[y - 1],
    matrix[x + 1]?.[y],
    matrix[x + 1]?.[y + 1],

    matrix[x]?.[y - 1],
  ].filter((item) => {
    return Boolean(item);
  }).length;

export default getNeighborsCount;
