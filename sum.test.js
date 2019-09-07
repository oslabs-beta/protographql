const {sum,hiName} = require('./sum');

test('adds 1 and 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
});

test('Say hello to Debbie', ()=> {
    expect(hiName("Debbie")).toBe("Hello Debbie");
});
