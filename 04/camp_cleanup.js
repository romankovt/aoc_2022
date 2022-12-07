const fs = require('fs');
let input = fs
  .readFileSync(process.cwd() + "/input.txt")
  .toString()
  .trim()
  .split("\n");

function sectionFullyOverlap(firstSection, secondSection) {
  return (firstSection[0] <= secondSection[0] && firstSection[1] >= secondSection[1]) ||
    (secondSection[0] <= firstSection[0] && secondSection[1] >= firstSection[1])
}

function sectionPartiallyOverlap(firstSection, secondSection) {
  return (firstSection[0] < secondSection[0] && firstSection[1] >= secondSection[0]) ||
    secondSection[1] >= firstSection[0] && secondSection[0] < firstSection[0]

}

let fullyOverllapingRanges = [];
let partiallyOverllapingRanges = [];

input.forEach(elfPair => {
  let [firstElfSections, secondElfSections] = elfPair.split(",");
  firstElfSections = firstElfSections.split("-").map(i => Number(i));
  secondElfSections = secondElfSections.split("-").map(i => Number(i));

  if (sectionFullyOverlap(firstElfSections, secondElfSections)) {
    fullyOverllapingRanges.push(elfPair);
    partiallyOverllapingRanges.push(elfPair);
  } else if (sectionPartiallyOverlap(firstElfSections, secondElfSections)) {
    partiallyOverllapingRanges.push(elfPair);
  };
});

// console.log(fullyOverllapingRanges);
// console.log(partiallyOverllapingRanges);
console.log(`Overlapping ranges count: ${fullyOverllapingRanges.length}`);
console.log(`Partially overlapping ranges count: ${partiallyOverllapingRanges.length}`);
