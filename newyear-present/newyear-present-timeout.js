// https://www.hackerrank.com/challenges/newyear-present/problem
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

// START
const kCn = (k, n) => {
  // calculate Ckn
  if (k === 0 || k === n) return 1
  return kCn(k - 1, n - 1) + kCn(k, n - 1)
}

const removeAtIndex = (arr, index) => {
  return arr.filter((e, i) => i !== index)
}

// check if arr1 contains arr2
const isExisted = (arr1, arr2) => arr1.some(e => arr2.every(v => e.indexOf(v) >= 0))

const getCombinations = (k, array) => {
  let results = []
  if (k === array.length) {
    results = [array]
  } else if (k === 0) {
    results = []
  } else {
    const total = kCn(k, array.length)
    while (results.length < total) {
      for (let i = 0; i < array.length; i += 1) {
        const element = array[i]
        const sub = getCombinations(k - 1, removeAtIndex(array, i))
        let subx = []
        if (sub.length === 0) {
          subx = [
            [element]
          ]
        } else {
          subx = sub.map(s => [
            element,
            ...s,
          ])
        }
        subx.forEach(s => {
          const e = isExisted(results, s)
          if (!e) {
            results.push(s)
          }
        })
      }
    }
  }
  return results
}

const getSum = arr => arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

function solve(n, l) {
  const NUMBER_OF_STICKS = 6
  const fixed = l.map((e, index) => `${e}-i${index}`)
  const combinations = getCombinations(NUMBER_OF_STICKS, fixed)
  const unfixed = combinations.map(c => c.map(e => Number(e[0])))
  const filter = c => {
    if (getSum(c) % 4 !== 0) return false
    else {
      const side = getSum(c) / 4
      let count = 0
      c.forEach(e => {
        if (e === side) count += 1
      })
      return count === 2
    }
  }
  const filtered = unfixed
    .filter(filter)
  console.log(filtered.length)
}
// END

function main() {
  const n = parseInt(readLine(), 10);

  const l = readLine().split(' ').map(lTemp => parseInt(lTemp, 10));

  solve(n, l)
}