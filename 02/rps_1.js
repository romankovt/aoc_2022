const fs = require('node:fs');
let input = fs.readFileSync(process.cwd() + "/input.txt").toString().trim().split("\n");

// A, X - rock
// B, Y - paper
// C, Z - scissors
const MOVES = {
  "A": "X",
  "B": "Y",
  "C": "Z"
};

const POINTS_FOR_MOVES = {
  "X": 1,
  "Y": 2,
  "Z": 3
};

function points_from_round(opponent_move, my_move) {
  let points_won = POINTS_FOR_MOVES[my_move];
  switch(opponent_move) {
  case "A":
    if (my_move == "X") {
      points_won += 3;
    } else if (my_move == "Y") {
      points_won += 6;
    }
    break;
  case "B":
    if (my_move == "Y") {
      points_won += 3;
    } else if (my_move == "Z") {
      points_won += 6;
    }
    break;
  case "C":
    if (my_move == "Z") {
      points_won += 3;
    } else if (my_move == "X") {
      points_won += 6;
    }
  }

  return points_won;
}

let total_points = input.reduce((total, i) => {
    return total + points_from_round(...i.split(" "));
  }, 0);

console.log(total_points);
