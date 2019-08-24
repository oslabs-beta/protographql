let fs = require('fs');
let archiver = require('archiver');

// hard-coded query data (will be replaced with dynamic data as soon as the code is ready)
let query = ['SELECT * FROM Employees', 'SELECT * FROM Employees WHERE name=\"Haris\"'];

// hard-coded response data (will be replaced with dynamic data as soon as the code is ready)
let response = [
    ['{name:\'Haris\', age:23}, {name:\'Shaun\', age:26}'],
    ['{name:\'Haris\', age:23}']
];

// iterate over the number of queries and write to the test file each test
for (let i=0; i<query.length; i++) {
    fs.appendFileSync('test-suite.js', 'test(\'query\', () => {\n\texpect(\''+query[i]+'\').toEqual('+response[i]+');\n});\n\n');
}

let output = fs.createWriteStream('/Users/harishambasic/Downloads' + '/protographqlTestSuite.zip');

var archive = archiver('zip', {
    zlib: { level: 9 } // set the compression level
});

// when the archiver functionality is complete and no errors have occurred, outout 'zip complete'
output.on('close', function () {
    console.log('zip complete');
});

archive.on('error', function(err){
    console.log(err);
});

// pipe archive data to the file
archive.pipe(output);

archive.append(fs.createReadStream(__dirname + '/test-suite.js'), { name: '/tests-suite/test-suite.js' });

// delete the 'test-suite.js' file
fs.unlink('test-suite.js', function(err) {
    if (err) {
        throw err;
    }
});

// finalize the archive (i.e: we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
archive.finalize();
