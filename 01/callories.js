const fs = require('node:fs');

let input = fs.readFileSync(process.cwd() + "/input.txt").toString().split("\n");
let elfs_calories = [0];

for (line of input) {
  if (line != "") { // records of different elves separated by an empty line
    elfs_calories[elfs_calories.length - 1] += Number(line);
  } else {
    elfs_calories.push(0);
  }
}

elfs_calories.sort((a, b) => (b - a));
console.log(`Top 1 elf calories: ${elfs_calories[0]}`);
console.log(`Sum of top 3 elf calories: ${elfs_calories.slice(0, 3).reduce()}`);
