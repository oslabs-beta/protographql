exports.createTest = function(queries, responses) {
    let tests = '';
    for (let i=0; i<queries.length; i++) {
        if (i > 0) {
            //If this is the first entry add two empty lines.
            tests = tests.concat('\n\ntest(\'query\', () => {\n\texpect(\''+queries[i]+'\').toEqual(\''+responses[i]+'\')\n})');
        } else {
            tests = tests.concat('test(\'query\', () => {\n\texpect(\''+queries[i]+'\').toEqual(\''+responses[i]+'\')\n})');
        }
    }
    return tests;
};