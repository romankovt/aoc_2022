const fs = require('node:fs');
let input = fs.readFileSync(process.cwd() + "/input.txt").toString().trim().split("\n");

const POINTS_FOR_MOVES = {
  "A": 1, // "rock"
  "B": 2, // "paper"
  "C": 3 // "scissors"
};

const POINTS_FOR_OUTCOME = {
  "win": 6,
  "draw": 3,
  "lose": 0
};

const COUNTER_MOVES_MAP = {
  "win": { "A": "B", "B": "C", "C": "A" },
  "lose": { "A": "C", "B": "A", "C": "B" },
  "draw": { "A": "A", "B": "B", "C": "C" }
};

const OUTCOME_MAP = {
  "X": "lose",
  "Y": "draw",
  "Z": "win"
}

function points_from_round(opponent_move, needed_outcome) {
  let decoded_outcome = OUTCOME_MAP[needed_outcome];
  let my_move = COUNTER_MOVES_MAP[decoded_outcome][opponent_move];

  return POINTS_FOR_MOVES[my_move] + POINTS_FOR_OUTCOME[decoded_outcome];
}

let total_points = input.reduce((total, i) => {
    return total + points_from_round(...i.split(" "));
  }, 0);

console.log(total_points);
