const fs = require('fs');
let input = fs
  .readFileSync(process.cwd() + "/input.txt")
  .toString()
  .trim()
  .split("\n");

let tree = {}
let currentPath = []
const TOTAL_SPACE = 70_000_000
const UPDATE_SIZE = 30_000_000

function isCommand(line) {
  return line[0] == "$";
}

function handleCommand(line) {
  let tokenizedLine = line.split(" ");
  let command = tokenizedLine[1]
  let arg = tokenizedLine[2]

  if (command == "cd") { handleCd(command, arg); }
}

function handleCd(command, arg) {
  if (arg == "..") {
    currentPath.pop()
  } else {
    currentPath.push(arg)
    let leaf = tree;

    for (let i = 0; i < currentPath.length; i++) {
      if (leaf[currentPath[i]] == undefined) {
        leaf[currentPath[i]] = { "type": "dir", "size": 0, "files": {} }
      } else {
        leaf = leaf[currentPath[i]]["files"]
      }
    }
  }
}

function logFileSize(line) {
  if (/^\d/.test(line)) {
    let [size, name] = line.split(" ");
    size = Number(size);

    let leaf = findLeafForCurrentPath(tree);

    if (!leaf["files"].hasOwnProperty(name)) {
      leaf["files"][name] = { "size": size, "type": "file" }

      leaf = tree["/"];

      for (let i = 1; i <= currentPath.length; i++) {
        leaf["size"] += size
        leaf = leaf["files"][currentPath[i]]
      }
    }
  }
}

function findLeafForCurrentPath(tree) {
  let leaf = tree["/"];

  for (let i = 1; i < currentPath.length; i++) {
    leaf = leaf["files"][currentPath[i]]
  };

  return leaf;
};

input.forEach(line => { isCommand(line) ? handleCommand(line) : logFileSize(line) });

function calcTotal(tree) {
  let counter = 0;

  for (const prop in tree["files"]) {
    if (tree["files"][prop]["type"] == "dir") {
      counter += calcTotal(tree["files"][prop])
      if (tree["files"][prop]["size"] <= 100000) {
        counter += tree["files"][prop]["size"]
      }
    }
  }

  return counter
}

function findCandidateToDelete(tree, needSpace) {
  let candidate = Infinity;

  for (const prop in tree["files"]) {
    if (tree["files"][prop]["type"] == "dir" && tree["files"][prop]["size"] >= needSpace) {

      if (tree["files"][prop]["size"] < candidate) {
        candidate = tree["files"][prop]["size"]
      };
      findCandidateToDelete(tree["files"][prop])
      deeperCandidate = findCandidateToDelete(tree["files"][prop], needSpace)
      if (typeof deeperCandidate != undefined && deeperCandidate < candidate) {
        candidate = deeperCandidate;
      }
    }
  }

  return candidate
}

console.log(`Sum of dirs under 100_000: ${calcTotal(tree["/"])}`); // 1307902
let unusedSpace = TOTAL_SPACE - tree["/"]["size"];
let needToDelete = UPDATE_SIZE - unusedSpace;
console.log(`Unused space ${unusedSpace}`);
console.log(`Need to free ${needToDelete}`);
console.log(`Min to delete ${findCandidateToDelete(tree["/"], needToDelete)}`); // 7068748
