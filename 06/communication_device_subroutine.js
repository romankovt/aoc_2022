const fs = require('fs');
let input = fs
  .readFileSync(process.cwd() + "/input.txt")
  .toString()
  .trim()

let slidingArray = []

for (let i = 4; i < input.length; i++)  {
  slidingArray = input.slice(i - 4, i).split("");

  if (slidingArray.every((char, index) => slidingArray.indexOf(char) == index)) {
    console.log(slidingArray);
    console.log(`We need to process ${i} chars before message starts`)
    break;
  }
}

console.time("second loop took");

for (let i = 14; i < input.length; i++)  {
  slidingArray = input.substring(i - 14, i).split("");

  if ((new Set(slidingArray)).size == slidingArray.length) {
    console.log(`We need to process ${i} chars before message starts`)
    break;
  }
}
console.timeEnd("second loop took");
