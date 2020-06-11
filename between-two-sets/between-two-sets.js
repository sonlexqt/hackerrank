// https://www.hackerrank.com/challenges/between-two-sets/problem?h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen
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

/*
 * Complete the 'getTotalX' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER_ARRAY b
 */

function isFactor(f, arr) {
  return arr.every(e => e % f === 0)
}

function gcd2(a, b) {
  // Greatest common divisor of 2 integers
  if (!b) return b === 0 ? a : NaN;
  return gcd2(b, a % b);
}

function gcd(array) {
  // Greatest common divisor of a list of integers
  var n = 0;
  for (var i = 0; i < array.length; ++i)
    n = gcd2(array[i], n);
  return n;
}

function lcm2(a, b) {
  // Least common multiple of 2 integers
  return a * b / gcd2(a, b);
}

function lcm(array) {
  // Least common multiple of a list of integers
  var n = 1;
  for (var i = 0; i < array.length; ++i)
    n = lcm2(array[i], n);
  return n;
}

function getTotalX(a, b) {
  // Write your code here
  let res = 0
  const lastA = a[a.length - 1]
  const firstB = b[0]
  const myLCM = lcm(a)
  const times = firstB / myLCM
  for (let i = 1; i <= times; i += 1) {
    const num = i * lastA
    if (isFactor(num, b)) res += 1
  }
  return res
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

  const n = parseInt(firstMultipleInput[0], 10);

  const m = parseInt(firstMultipleInput[1], 10);

  const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

  const brr = readLine().replace(/\s+$/g, '').split(' ').map(brrTemp => parseInt(brrTemp, 10));

  const total = getTotalX(arr, brr);

  ws.write(total + '\n');

  ws.end();
}