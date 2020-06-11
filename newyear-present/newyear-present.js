// https://www.hackerrank.com/challenges/newyear-present/problem
'use strict';

// process.stdin.resume();
// process.stdin.setEncoding('utf-8');

// let inputString = '';
// let currentLine = 0;

// process.stdin.on('data', inputStdin => {
//   inputString += inputStdin;
// });

// process.stdin.on('end', _ => {
//   inputString = inputString.replace(/\s*$/, '')
//     .split('\n')
//     .map(str => str.replace(/\s*$/, ''));
//   main();
// });

// function readLine() {
//   return inputString[currentLine++];
// }

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

const getSum = arr => arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

const getIndexFromValue = (arr, value) => {
  let res = -1
  const element = arr.find((e, index) => {
    if (e.value === value) {
      res = index
      return true
    }
  })
  return res
}

const getIndexFromObject = (arr, obj) => {
  const element = arr.find(e => e.value === obj.value && e.index === obj.index)
  return element ? element.index : -1
}

const printArray = (arr, name) => {
  const original = arr.map(e => e.value)
  console.log(name, JSON.stringify(original))
}

function solve(n, l) {
  const counts = {}
  for (let i = 0; i < l.length; i += 1) {
    const num = l[i]
    counts[num] = (counts[num] || 0) + 1
  }
  const possibleSides = l.filter((e, index) => counts[e] >= 2 && l.indexOf(e) === index).sort()
  const withIndex = l.map((e, index) => ({
    value: e,
    index
  }))

  const calculateSide3 = (side) => {
    const sticksIndexes = []
    // the sticks that can be the possible 4 sticks
    const sticks = withIndex.filter(e => e.value < side)
    const multiplier = kCn(3, counts[side])
    if (sticks.length < 3) {
      return 0
    } else {
      // check if possible4Sticks contains a valid combination of 4 sticks
      const arr1 = sticks.slice()
      for (let i1 = 0; i1 < arr1.length; i1 += 1) {
        const a1 = arr1[i1]
        const arr2 = removeAtIndex(arr1, i1)
        for (let i2 = 0; i2 < arr2.length; i2 += 1) {
          const a2 = arr2[i2]
          if (a1.value + a2.value >= side) continue
          const arr3 = removeAtIndex(arr2, i2)
          for (let i3 = 0; i3 < arr3.length; i3 += 1) {
            const a3 = arr3[i3]
            if (a1.value + a2.value + a3.value === side) {
              const arr = [getIndexFromObject(arr1, a1), getIndexFromObject(arr1, a2), getIndexFromObject(arr1, a3)]
              if (!isExisted(sticksIndexes, arr)) {
                sticksIndexes.push(arr)
              }
            }
          }
        }
      }
    }
    const res3 = (sticksIndexes.length) * multiplier
    return res3
  }

  const calculateSide2 = (side) => {
    const sticksIndexes = []
    // the sticks that can be the possible 4 sticks
    const sticks = withIndex.filter(e => e.value < side)
    const multiplier = kCn(2, counts[side])
    if (sticks.length < 4) {
      return 0
    } else {
      // check if possible4Sticks contains a valid combination of 4 sticks
      const arr1 = sticks.slice()
      for (let i1 = 0; i1 < arr1.length; i1 += 1) {
        const a1 = arr1[i1]
        const arr2 = removeAtIndex(arr1, i1)
        for (let i2 = 0; i2 < arr2.length; i2 += 1) {
          const a2 = arr2[i2]
          if (a1.value + a2.value !== side) {
            continue
          }
          const arr3 = removeAtIndex(arr2, i2)
          for (let i3 = 0; i3 < arr3.length; i3 += 1) {
            const a3 = arr3[i3]
            const arr4 = removeAtIndex(arr3, i3)
            for (let i4 = 0; i4 < arr4.length; i4 += 1) {
              const a4 = arr4[i4]
              if (a3.value + a4.value !== side) {
                continue
              }
              const arr = [getIndexFromObject(arr1, a1), getIndexFromObject(arr1, a2), getIndexFromObject(arr1, a3), getIndexFromObject(arr1, a4)]
              if (!isExisted(sticksIndexes, arr)) {
                sticksIndexes.push(arr)
              }
            }
          }
        }
      }
    }
    const res2 = (sticksIndexes.length) * multiplier
    return res2
  }

  let res = 0
  for (let i = 0; i < possibleSides.length; i++) {
    const side = possibleSides[i]
    res += calculateSide2(side)
    if (counts[side] >= 3) res += calculateSide3(side)
  }
  console.log(res)
}
// solve(8, [4, 5, 1, 5, 1, 9, 4, 5])
// solve(8, [2, 5, 3, 5, 1, 9, 4, 5])
// solve(15, [1, 1, 1, 2, 2, 3, 3, 3, 2, 4, 5, 5, 4, 5, 4])
// solve(15, [10000000, 5000000, 5000000, 10000000, 10000000, 5000000, 5000000, 2500000, 2500000, 2500000, 3333333, 1666666, 1, 1, 3333333])
// END

function main() {
  const n = parseInt(readLine(), 10);

  const l = readLine().split(' ').map(lTemp => parseInt(lTemp, 10));

  solve(n, l)
}

// 8
// 4 5 1 5 1 9 4 5
// 3

// 15
// 1 1 1 2 2 3 3 3 2 4 5 5 4 5 4
// 460

// 15
// 10000000 5000000 5000000 10000000 10000000 5000000 5000000 2500000 2500000 2500000 3333333 1666666 1 1 3333333
// 31