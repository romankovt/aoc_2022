const fs = require('fs');
let treeGrid = fs
  .readFileSync(process.cwd() + "/input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(line => line.split("").map(i => Number(i)));

console.time("All computations");
let visibleTreeCount = ((treeGrid.length * 2) + (treeGrid[0].length * 2)) - 4; // all grid edge trees are visible
let visibleTrees = []
let highestScenicScore = 0

for (let y = 1; y < treeGrid.length - 1; y++) {
  for (let x = 1; x < treeGrid[y].length - 1; x++) {
    let treeStat = calcTreeStat(x, y);

    if (treeStat.scenicScore > highestScenicScore) {
      highestScenicScore = treeStat.scenicScore;
    }

    if (treeStat.isTreeVisible) {
      visibleTrees.push([x, y])
      visibleTreeCount++;
    }
  }
}

function calcTreeStat(x, y) {
  let treeHeight = treeGrid[y][x]
  let isTreeVisible = null
  let leftScenic = 0
  let rightScenic = 0
  let upScenic = 0
  let downScenic = 0


  // check left
  for (let i = x - 1; i >= 0; i--) {
    leftScenic++;

    if (treeHeight <= treeGrid[y][i]) {
      break;
    }
    if (i === 0) {
      isTreeVisible = true
    }
  }

  // check right
  for (let i = x + 1; i < treeGrid[y].length; i++) {
    rightScenic++;

    if (treeHeight <= treeGrid[y][i]) {
      break;
    }

    if (i === treeGrid[y].length - 1) {
      isTreeVisible = true
    }
  }

  for (let i = y + 1; i < treeGrid.length; i++) {
    downScenic++;

    if (treeHeight <= treeGrid[i][x]) {
      break;
    }

    if (i === treeGrid.length - 1) {
      isTreeVisible = true
    }
  }

  for (let i = y - 1; i >= 0; i--) {
    upScenic++

    if (treeHeight <= treeGrid[i][x]) {
      break;
    }

    if (i === 0) {
      isTreeVisible = true
    }
  }

  return { isTreeVisible: isTreeVisible, scenicScore: leftScenic * rightScenic * upScenic * downScenic };
}

console.timeEnd("All computations");
console.log(`Visible trees count: ${visibleTreeCount}`)
console.log(`Highest scenic score: ${highestScenicScore}`)
