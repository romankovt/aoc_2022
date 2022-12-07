const fs = require('fs');
let input = fs
  .readFileSync(process.cwd() + "/input.txt")
  .toString()
  .trim()
  .split("\n");

const bottomOfStack = /^[\d\s]+$/;
const digit = /\d/;

let stack = [];
let bottomLineStackIndex = input.findIndex(line => bottomOfStack.test(line));

function collectCrates(index) {
  let crates = []
    input
      .slice(0, bottomLineStackIndex)
      .forEach(line => {
          if (line[index] != " " && line[index] != undefined) {
            crates.push(line[index])
          }
        }
      )
  stack.push(crates.reverse());

  return stack;
}

// first part of the task
function moveCrates9000(amount, from, to) {
  let crate

  for(let i = 0; i < amount; i++) {
    crate = stack[from].pop();
    stack[to].push(crate);
  }
}

// second part of the task
function moveCrates9001(amount, from, to) {
  let crates = stack[from].splice(-amount, amount)
  stack[to].push(...crates);
}

for (let i = 0; i < input[bottomLineStackIndex].length; i++) {
  if (digit.test(input[bottomLineStackIndex][i])) { collectCrates(i) }
}

input.slice(bottomLineStackIndex + 2, input.length).forEach(line => {
  if (line != null || line != undefined) {
    let [amount, from, to] = line.match(/\d+/g)
    // moveCrates9000(amount, from - 1, to - 1); // algorithm for the first part of the task
    moveCrates9001(amount, from - 1, to - 1); // algorithm for the second part of the task
  }
});

stack.forEach(deck => { console.log(deck[deck.length - 1]) })
