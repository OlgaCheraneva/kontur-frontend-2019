'use strict'

const tableInfo = {
    user: {
        columnName: 'user',
        minSize: 4,
        maxSize: 10,
        size: 4
    },
    date: {
        columnName: 'date',
        minSize: 4,
        maxSize: 10,
        size: 4
    },
    comment: {
        columnName: 'comment',
        minSize: 7,
        maxSize: 50,
        size: 7
    },
    fileName: {
        columnName: 'fileName',
        minSize: 8,
        maxSize: 15,
        size: 8
    }
}

const dots = '...';
const indent = '  ';
const verticalDelimiter = '|';
const horizontalDelimiter = '-';
const NUMBER_OF_INDENTS = 2;
const FIRST_COL_LENGTH = 6;

function createTable(array) {
    let table = [];
    const preparedData = prepareData(array);
    const tableLength = calculateTableLength();
    const header = createHeader();
    const line = createLine(tableLength);

    table.push(header);
    table.push(line);

    // Получение табличного представления данных
    preparedData.forEach(item => {
        let tableLine = '';
        Object.keys(item).forEach(key => {
            let content = '';
            if (key === 'importance') {
                content = item[key] > 0 ? '!' : ' ';
            } else {
                content = item[key];
                const extraLength = tableInfo[key].size - content.length;
                for (let i = 0; i < extraLength; i++) {
                    content += ' ';
                }
            }

            tableLine += indent + (content) + indent + verticalDelimiter;
        });
        tableLine = tableLine.slice(0, tableLine.length - 1);
        table.push(tableLine);
    });

    if (preparedData) {
        table.push(line);
    }

    return table;
}

function prepareData(array) {
    array.forEach(item => {
        Object.keys(tableInfo).forEach(colName => {
            const column = tableInfo[colName];
            const length = item[colName].length;
            if (column.minSize <= length && length <= column.maxSize) {
                // Размер данных не превышает допустимый размер
                column.size = Math.max(column.size, length);
            } else if (length > column.maxSize) {
                // Размер данных превышает допустимый размер
                column.size = column.maxSize;
                // Сокращение данных до допустимого размера
                item[colName] = item[colName].slice(0, column.maxSize - dots.length) + dots;
            }
        });
    });

    return array;
}

function calculateTableLength() {
    return FIRST_COL_LENGTH +
        Object.keys(tableInfo).reduce(function (acc, colName) {
            return acc + tableInfo[colName].size + indent.length * NUMBER_OF_INDENTS + verticalDelimiter.length;
        }, 0) - verticalDelimiter.length;
}

function createLine(tableLength) {
    let line = '';
    for (let i = 0; i < tableLength; i++) {
        line += horizontalDelimiter;
    }

    return line;
}

function createHeader() {
    let header = indent + '!' + indent + verticalDelimiter;

    const colNames = Object.keys(tableInfo);
    colNames.forEach(colName => {
        const column = tableInfo[colName];
        header += indent + colName + indent;
        const extraLength = column.size - column.minSize;
        // Выравнивание
        for (let i = 0; i < extraLength; i++) {
            header += ' ';
        }
        header += verticalDelimiter;
    })

    return header.slice(0, header.length - 1);
}

module.exports = {
    createTable
}
