// https://www.hackerrank.com/challenges/apple-and-orange/problem?h_r=next-challenge&h_v=zen
'use strict';

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

// Complete the countApplesAndOranges function below.
function countApplesAndOranges(s, t, a, b, apples, oranges) {
  let numApples = 0
  let numOranges = 0
  apples.map(e => e + a).forEach(e => {
    if (e >= s && e <= t) {
      numApples += 1
    }
  })
  oranges.map(e => e + b).forEach(e => {
    if (e >= s && e <= t) {
      numOranges += 1
    }
  })
  console.log(numApples)
  console.log(numOranges)
}

function main() {
  const st = readLine().split(' ');

  const s = parseInt(st[0], 10);

  const t = parseInt(st[1], 10);

  const ab = readLine().split(' ');

  const a = parseInt(ab[0], 10);

  const b = parseInt(ab[1], 10);

  const mn = readLine().split(' ');

  const m = parseInt(mn[0], 10);

  const n = parseInt(mn[1], 10);

  const apples = readLine().split(' ').map(applesTemp => parseInt(applesTemp, 10));

  const oranges = readLine().split(' ').map(orangesTemp => parseInt(orangesTemp, 10));

  countApplesAndOranges(s, t, a, b, apples, oranges);
}