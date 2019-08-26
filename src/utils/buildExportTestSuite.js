let fs = require('fs');
let archiver = require('archiver');

exports.createTest = function(queries, responses) {
    let tests = '';
    for (let i=0; i<queries.length; i++) {
        if (i > 0) {
            tests = tests.concat('\n\ntest(\'query\', () => {\n\texpect(\''+queries[i]+'\').toEqual(\''+responses[i]+'\')\n})');
        } else {
            tests = tests.concat('test(\'query\', () => {\n\texpect(\''+queries[i]+'\').toEqual(\''+responses[i]+'\')\n})');
        }
    }
    return tests;
};