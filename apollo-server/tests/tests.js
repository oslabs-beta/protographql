test('query', () => {
	expect('SELECT * FROM Employees').toEqual('{name: "Haris", age:23}')
})