const chai = require('chai');
const path = require('path');
const child = require('child_process');

const { expect } = chai;
let proc;
const exec = path.join(__dirname, '../..', 'index.js');


describe('validationCheck show', () => {
    before(() => {
        process.chdir(__dirname);
    });

    beforeEach(() => {
        proc = child.exec('node ' + exec);
    });

    it('проверка на распознавание', (done) => {
        const result = `
  !  |  user  |  date  |  comment   |  fileName       
------------------------------------------------------
     |        |        |  ;comment  |  jsWithTodo.js  
     |        |        |  ;         |  jsWithTodo.js  
     |        |        |  ;;        |  jsWithTodo.js  
     |        |        |  ;;;       |  jsWithTodo.js  
     |        |        |  ;;;;      |  jsWithTodo.js  
     |        |        |  ;;d;      |  jsWithTodo.js  
     |        |        |  ;;;d;     |  jsWithTodo.js  
     |        |        |  u; d;  ;  |  jsWithTodo.js  
     |        |        |  u; d; ;d  |  jsWithTodo.js  
     |        |        |  comment   |  jsWithTodo.js  
  !  |        |        |  comment!  |  jsWithTodo.js  
------------------------------------------------------
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






