// https://www.hackerrank.com/challenges/the-birthday-bar/problem?h_r=next-challenge&h_v=zen
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

function getSum(arr) {
  return arr.reduce((acc, value) => acc + value, 0)
}

// Complete the birthday function below.
function birthday(s, d, m) {
  let res = 0
  for (let i = 0; i <= s.length - m; i += 1) {
    const arr = s.slice(i, i + m)
    if (getSum(arr) === d) res += 1
  }
  return res
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

  const dm = readLine().replace(/\s+$/g, '').split(' ');

  const d = parseInt(dm[0], 10);

  const m = parseInt(dm[1], 10);

  const result = birthday(s, d, m);

  ws.write(result + '\n');

  ws.end();
}