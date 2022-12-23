const fs = require('fs');
let moves = fs
  .readFileSync(process.cwd() + "/input.txt")
  .toString()
  .trim()
  .split("\n");

console.time("solution time")

const KNOTS_COUNT = 10; // part one just have 2 knots
let knots = [];

// populate rope with knots
for (let i = 0; i < KNOTS_COUNT; i++) {
  knots.push([0, 0]);
}

// track unique coordinates "visited" by last knot of the rope
let visitedPositions = new Set(["0,0"]);

moves.forEach(moveInstruction => {
  let [direction, times] = moveInstruction.split(" ");

  for (let i = 0; i < times; i++) {
    knots[0] = moveHead(direction, knots[0]);

    // after we moved the head we just need to drag every knot according to the given rules
    for (let n = 1; n < knots.length; n++) {
      knots[n] = dragKnot(knots[n], knots[n - 1]);

      // only the last knot visited positions matter for the solution
      if (n === knots.length - 1) {
        visitedPositions.add(`${knots[n][0]},${knots[n][1]}`);
      }
    }
  }
});

function moveHead(direction, knot) {
  let [x, y] = knot;

  switch (direction) {
  case "R":
    x++;
    break;
  case "L":
    x--;
    break;
  case "U":
    y++;
    break;
  case "D":
    y--;
    break;
  }

  return [x, y];
}

function dragKnot(knot, prevKnot) {
  let [knotX, knotY] = knot;
  let [prevKnotX, prevKnotY] = prevKnot;
  //
  if (prevKnotX === knotX && prevKnotY === knotY) {
    return [knotX, knotY];
  }

  let absDiffX = Math.abs(prevKnotX - knotX);
  let absDiffY = Math.abs(prevKnotY - knotY);
  let xDirection = determineRelativeDirection(prevKnotX, knotX);
  let yDirection = determineRelativeDirection(prevKnotY, knotY);

  // diagonal move
  if (absDiffX + absDiffY == 3) {
    xDirection > 0 ? knotX++ : knotX--;
    yDirection > 0 ? knotY++ : knotY--;
  } else {
    // "regular" move
    if (absDiffX > 1) {
      xDirection > 0 ? knotX++ : knotX--;
    }

    if (absDiffY > 1) {
      yDirection > 0 ? knotY++ : knotY--;
    }
  }

  return [knotX, knotY];
}

// 0 didn't move
// 1 move to the right
// -1 move to the left
function determineRelativeDirection(prevKnotCoord, knotCoord) {
  if (prevKnotCoord - knotCoord === 0) {
    return 0;
  } else {
     return prevKnotCoord - knotCoord > 0 ? 1 : -1;
  }
}

console.log(`Count: ${visitedPositions.size}`);
console.timeEnd("solution time");
