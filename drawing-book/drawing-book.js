// https://www.hackerrank.com/challenges/drawing-book/problem
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
  inputString = inputString.trim().split('\n').map(str => str.trim());

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the pageCount function below.
 */
function pageCount(n, p) {
  /*
   * Write your code here.
   */
  const first = Math.ceil((p - 1) / 2)
  let last
  if (n % 2 === 0 && n - p === 1) {
    last = 1
  } else {
    last = Math.floor((n - p) / 2)
  }
  return Math.min(first, last)
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine(), 10);

  const p = parseInt(readLine(), 10);

  let result = pageCount(n, p);

  ws.write(result + "\n");

  ws.end();
}