const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');
const { show, showSorted } = require('./commandProcessor');

const files = getFiles();
app();

function app() {
    console.log('Please, write your command!');
    readLine(processCommand);
}

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => {
        const name = path.split('/').pop();
        const content = readFile(path);
        return { name, content };
    });
}

function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            show(files);
            break;
        case 'important':
            show(files, command);
            break;
        default:
            if (command.startsWith('user ') && command !== 'user ') {
                show(files, command);
            } else if (/^date \d{4}(-\d{2}){0,2}$/gi.test(command)) {
                show(files, command);
            } else if (command === 'sort importance' ||
                command === 'sort user' ||
                command === 'sort date') {
                showSorted(files, command.split(' ')[1]);
            } else {
                console.log('wrong command');
            }
            break;
    }
}
