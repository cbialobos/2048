"use strict";

function slideArray(values) {
  let row = values.slice();
  row.push(null); //sentinelle
  for (let curPos = 0, j = 0; j < values.length; j++) {
    if (row[j] === null) {
      continue;
    }

    row[curPos] = row[j];
    if (curPos !== j) {
      row[j] = null;
    }
    if (row[j + 1] === row[curPos]) {
      row[curPos] *= 2;
      j++;
      row[j] = null;
    }

    curPos++;
  }
  row.pop(); // remove sentinelle
  return row;
}

module.exports = slideArray;
