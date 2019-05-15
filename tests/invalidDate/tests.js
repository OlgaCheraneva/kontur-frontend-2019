const chai = require('chai');
const path = require('path');
const child = require('child_process');

const { expect } = chai;
let proc;
const exec = path.join(__dirname, '../..', 'index.js');


describe('invalidDate show', () => {
    before(() => {
        process.chdir(__dirname);
    });

    beforeEach(() => {
        proc = child.exec('node ' + exec);
    });
    // Дата в расширенном комментарии пишется строго полностью
    it('проверка валидности даты в todo', (done) => {
        const result = `
  !  |  user  |  date        |  comment          |  fileName       
-------------------------------------------------------------------
     |        |              |  п; 123; comment  |  jsWithTodo.js  
     |        |              |  п;123;comment    |  jsWithTodo.js  
     |        |              |  ;123;            |  jsWithTodo.js  
     |  п     |  0000-00-00  |  c                |  jsWithTodo.js  
     |  п     |  0000-00-00  |  ;c               |  jsWithTodo.js  
     |        |  0000-00-00  |  c                |  jsWithTodo.js  
     |        |              |  п; 123; comment  |  jsWithTodo.js  
     |        |              |  п;123;comment    |  jsWithTodo.js  
     |        |              |  ;123;            |  jsWithTodo.js  
     |  п     |  0000-00-00  |  c                |  jsWithTodo.js  
     |  п     |  0000-00-00  |  ;c               |  jsWithTodo.js  
     |        |  0000-00-00  |  c                |  jsWithTodo.js  
     |        |              |  п; 123; comment  |  jsWithTodo.js  
     |        |              |  п;123;comment    |  jsWithTodo.js  
     |        |              |  ;123;            |  jsWithTodo.js  
     |  п     |  0000-00-00  |  c                |  jsWithTodo.js  
     |  п     |  0000-00-00  |  ;c               |  jsWithTodo.js  
     |        |  0000-00-00  |  c                |  jsWithTodo.js  
     |        |              |  п; 123; comment  |  jsWithTodo.js  
     |        |              |  п;123;comment    |  jsWithTodo.js  
     |        |              |  ;123;            |  jsWithTodo.js  
     |  п     |  0000-00-00  |  c                |  jsWithTodo.js  
     |  п     |  0000-00-00  |  ;c               |  jsWithTodo.js  
     |        |  0000-00-00  |  c                |  jsWithTodo.js  
-------------------------------------------------------------------
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






