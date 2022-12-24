const fs = require('fs');
let commands = fs
  .readFileSync(process.cwd() + "/input.txt")
  .toString()
  .trim()
  .split("\n");

console.time("solution time")

const STARTING_CYCLE = 20;
const MEASURE_PERIOD = 40;

let x = 1; // name of the register
let cycles = 0;
let instruction;
let value
let signalStrength = [];
let screen = "";


commands.forEach(command => {
  [instruction, value] = command.split(" ")
  value = Number(value);

  if (instruction === "noop") {
    executeCycle()
  }

  if (instruction === "addx") {
    executeCycle();
    executeCycle(() => x += value);
  }
});

function executeCycle(callback) {
  if (cycles === STARTING_CYCLE || ((cycles - STARTING_CYCLE) % MEASURE_PERIOD === 0)) {
    signalStrength.push(cycles * x);
  }

  if ([x - 1, x, x + 1].includes(cycles % 40)) {
    screen += "#"
  } else {
    screen += "."
  }

  cycles++;

  if (callback != undefined) {
    callback();
  }
}
console.timeEnd("solution time");
console.log(`signalStrength: ${signalStrength.reduce((acc, i) => acc + i, 0)}`)
// split string into lines with width of 40
console.log("-----------------")
screen.match(/.{1,40}/g).forEach(line => console.log(line));
