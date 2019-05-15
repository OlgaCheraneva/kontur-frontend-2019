const chai = require('chai');
const path = require('path');
const child = require('child_process');

const { expect } = chai;
let proc;
const exec = path.join(__dirname, '../..', 'index.js');


describe('Команда show', () => {
    before(() => {
        process.chdir(__dirname);
    });

    beforeEach(() => {
        proc = child.exec('node ' + exec);
    });

    it('должен показывать список todo', (done) => {
        const result = `
  !  |  user  |  date        |  comment    |  fileName       
-------------------------------------------------------------
     |        |              |  comment    |  jsWithTodo.js  
     |        |              |  comment    |  jsWithTodo.js  
     |        |              |  comment    |  jsWithTodo.js  
     |        |              |  comment    |  jsWithTodo.js  
     |        |              |  comment    |  jsWithTodo.js  
     |        |              |  comment    |  jsWithTodo.js  
  !  |        |              |  comment!   |  jsWithTodo.js  
     |        |              |  comment    |  jsWithTodo.js  
  !  |        |              |  comment!   |  jsWithTodo.js  
     |        |              |  comment    |  jsWithTodo.js  
  !  |        |              |  comment!   |  jsWithTodo.js  
     |        |              |  comment    |  jsWithTodo.js  
     |        |              |  ;;comment  |  jsWithTodo.js  
     |        |              |  comment    |  jsWithTodo.js  
     |        |              |  u;;c       |  jsWithTodo.js  
     |        |              |  comment    |  jsWithTodo.js  
     |        |              |  comment    |  jsWithTodo.js  
     |        |              |  u;;c       |  jsWithTodo.js  
     |        |  0000-01-01  |  comment    |  jsWithTodo.js  
     |        |  0000-01-01  |  comment    |  jsWithTodo.js  
     |  u     |  0000-01-01  |  comment    |  jsWithTodo.js  
     |        |  0000-01-01  |  comment    |  jsWithTodo.js  
     |  u     |  0000-01-01  |  comment    |  jsWithTodo.js  
     |  u     |  0000-01-01  |  comment    |  jsWithTodo.js  
     |        |              |  ;123;c     |  jsWithTodo.js  
     |        |              |  ;123;c     |  jsWithTodo.js  
     |        |              |  u;123;c    |  jsWithTodo.js  
     |        |              |  ;123;c     |  jsWithTodo.js  
     |        |              |  u;123;c    |  jsWithTodo.js  
  !  |        |              |  u;123;c!   |  jsWithTodo.js  
-------------------------------------------------------------
`.trim();

        proc.stdout.once('data', function () {
            proc.stdin.write('show\r');
            proc.stdout.once('data', function (output) {
                expect(output.toString('utf-8').trim()).to.eq(result);
                done();
            });
        });
    });
});






