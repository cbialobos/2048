function slideArray(values) {
  let newArray = Array(values.length).fill(null);
  //j : index
  // curPos: where to put new value
  for (let curPos = 0, j = 0; j < values.length; j++) {
    if (values[j] === null) {
      continue;
    }

    if (newArray[curPos] === null) {
      newArray[curPos] = values[j];
      continue;
    }

    if (newArray[curPos] === values[j]) {
      newArray[curPos] *= 2;
      curPos++;
    }
    else {
      curPos++;
      newArray[curPos] = values[j];
    }

  }
  return newArray;
}

module.exports = slideArray;
