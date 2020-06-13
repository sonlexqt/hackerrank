// https://www.hackerrank.com/challenges/divisible-sum-pairs/problem?h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString.replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the divisibleSumPairs function below.
function divisibleSumPairs(n, k, ar) {
  let count = 0
  for (let i = 0; i < ar.length; i += 1) {
    for (let j = 0; j < ar.length; j += 1) {
      if (j === i) continue
      if ((ar[i] + ar[j]) % k === 0) count += 1
    }
  }
  return count / 2
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const nk = readLine().split(' ');

  const n = parseInt(nk[0], 10);

  const k = parseInt(nk[1], 10);

  const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));

  let result = divisibleSumPairs(n, k, ar);

  ws.write(result + "\n");

  ws.end();
}