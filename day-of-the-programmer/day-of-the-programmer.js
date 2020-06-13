// https://www.hackerrank.com/challenges/day-of-the-programmer/problem
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

function isLeapJulianYear(year) {
  return year % 4 === 0
}

function isLeapGregorianYear(year) {
  return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)
}

function calculateInJulianYear(year) {
  const daysInFeb = isLeapJulianYear(year) ? 29 : 28
  const day = 256 - 31 - daysInFeb - 31 - 30 - 31 - 30 - 31 - 31
  return `${day}.09.${year}`
}

function calculateInGregorianCalendar(year) {
  const daysInFeb = isLeapGregorianYear(year) ? 29 : 28
  const day = 256 - 31 - daysInFeb - 31 - 30 - 31 - 30 - 31 - 31
  return `${day}.09.${year}`
}

function calculateIn1918(year) {
  const daysInFeb = isLeapGregorianYear(year) ? 29 : 28
  const day = 256 - 31 - (daysInFeb - 13) - 31 - 30 - 31 - 30 - 31 - 31
  return `${day}.09.${year}`
}

// Complete the dayOfProgrammer function below.
function dayOfProgrammer(year) {
  let day
  if (year <= 1917) {
    day = calculateInJulianYear(year)
  } else if (year === 1918) {
    day = calculateIn1918(year)
  } else {
    day = calculateInGregorianCalendar(year)
  }
  return day
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const year = parseInt(readLine().trim(), 10);

  const result = dayOfProgrammer(year);

  ws.write(result + '\n');

  ws.end();
}