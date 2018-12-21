function getColumnValues(board, colIndex) {
    let values = [];
    for (let i = 0; i < board.length; i++) {
        values.push(board[i][colIndex]);
    }
    return values;
}

function setColumnValues(board, colIndex, values) {
    for (let i = 0; i < board.length; i++) {
        board[i][colIndex] = values[i];
    }
}

class BoardAction {

    static rowGetAction(board, rowIndex) {
        return board[rowIndex];
    }

    static rowSetAction(board, rowIndex, newValue) {
        board[rowIndex] = newValue;
    }
  
    static reverseRowGetAction(board, rowIndex) {
        return board[rowIndex].reverse();
    }  

    static reverseRowSetAction(board, rowIndex, newValue) {
        board[rowIndex] = newValue.reverse();
    }

    static colGetAction(board, colIndex) {
        return getColumnValues(board, colIndex);
    } 

    static colSetAction(board, colIndex, newValue) {
        setColumnValues(board, colIndex, newValue);
    }

    static reverseColGetAction(board, colIndex) {
        return getColumnValues(board, colIndex).reverse();
    }

    static reverseColSetAction(board, colIndex, newValue)  {
        setColumnValues(board, colIndex, newValue.reverse());
    }
}

module.exports = BoardAction;