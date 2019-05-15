'use strict'
const { TODO } = require('./TODO');
const { createTable } = require('./table');

// Функция поиска TODO комментариев в массиве файлов
function findToDoComments(files, parameter) {
    return files.reduce(function (acc, file) {
        return acc.concat(processFile(file, parameter));
    }, []);
}

/** Функция поиска TODO комментариев в файле
 * @param {Object} file
 * @param {String} parameter
 * @returns {TODO[]}
 */
function processFile(file, parameter) {
    if (typeof parameter !== 'string' && parameter !== undefined) {
        return [];
    }

    let result = new Array();

    const strArray = file.content.split('\n');
    const regex = /\/\/\s*todo\s*:?\s*/i; // Начало TODO комментария

    strArray.forEach(str => {
        if (regex.test(str)) { // В строке есть TODO комментарий
            let commentArray = str.split(regex); // Массив TODO комментариев без прификсов
            commentArray.shift(); // shift для удаления кода, предшествовавшего комментарию, или пустой строки
            commentArray.forEach(comment => {
                const toDo = new TODO(comment, file.name);
                // Учет параметров
                const satisfies = toDo.doesSatisfy(parameter);
                if (!toDo.isEmpty() && satisfies) {
                    result.push(toDo);
                }
            });
        }
    });

    return result;
}

function show(files, parameter) {
    print(findToDoComments(files, parameter));
}

function showSorted(files, sortParameter) {
    print(sort(findToDoComments(files), sortParameter));
}

function sort(array, sortParameter) {
    switch (sortParameter) {
        case 'importance':
            return array.sort((a, b) => a.importance < b.importance);
        case 'user':
            return array.sort((a, b) => {
                if (a.user === '' || b.user === '') return handleEmptyValues(a.user, b.user);
                return a.user.localeCompare(b.user)
            });
        case 'date':
            return array.sort((a, b) => {
                if (a.date === '' || b.date === '') return handleEmptyValues(a.date, b.date);
                return new Date(a.date) < new Date(b.date);
            });
        default:
            return array;
    }
}

function print(TODOs) {
    const table = createTable(TODOs);
    console.log(table.join('\n'));
}

function handleEmptyValues(a, b) {
    if (a === '' && b === '') return 0;
    if (a === '') return 1;
    if (b === '') return -1;
}

module.exports = {
    show,
    showSorted
};
