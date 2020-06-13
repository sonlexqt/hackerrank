// https://www.hackerrank.com/challenges/migratory-birds/problem?h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the migratoryBirds function below.
function migratoryBirds(arr) {
  const counts = {}
  for (let i = 0; i < arr.length; i += 1) {
    counts[arr[i]] = counts[arr[i]] ? counts[arr[i]] + 1 : 1
  }
  const sorted = Object.keys(counts)
    .map(k => ({
      value: k,
      count: counts[k],
    }))
    .sort((a, b) => {
      if (a.count === b.count) return b.value - a.value
      return a.count - b.count
    })
  return sorted[sorted.length - 1].value
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const arrCount = parseInt(readLine().trim(), 10);

  const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

  const result = migratoryBirds(arr);

  ws.write(result + '\n');

  ws.end();
}