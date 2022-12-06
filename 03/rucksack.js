const fs = require('fs');
let input = fs
  .readFileSync(process.cwd() + "/input.txt")
  .toString()
  .trim()
  .split("\n");

function priorityForChar(char) {
  if (char === char.toUpperCase()) {
    return char.charCodeAt(0) - "A".charCodeAt(0) + 27;
  } else {
    return char.charCodeAt(0) - "a".charCodeAt(0) + 1;
  };
}

// First part of the puzzle
let totalDupGiftPriority = 0;
input.forEach(sack => {
  let firstSack = sack.substring(0, sack.length / 2).split("");
  let secondSack = sack.substring(sack.length / 2, sack.length).split("");
  let duplicateGift = firstSack.find(gift => secondSack.includes(gift));
  totalDupGiftPriority += priorityForChar(duplicateGift);
});

console.log(`Total points for dup gifts: ${totalDupGiftPriority}`);

// Second part of the puzzle
let totalBadgesPriority = 0;
for (var i = 0; i <= input.length - 3; i += 3) {
  let authBadge = input[i].split("").find(gift => input[i + 1].includes(gift) && input[i + 2].includes(gift));
  totalBadgesPriority += priorityForChar(authBadge);
}

console.log(`Total points for badges: ${totalBadgesPriority}`);
