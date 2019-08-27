test('query', () => {
	expect('{
        getAllAuthor {
            first_name
        }
    }').toEqual('{"getAllAuthor":[{"first_name":"Jk","__typename":"Author"},{"first_name":"JRR","__typename":"Author"},{"first_name":"Arthur C.","__typename":"Author"},{"first_name":"Douglas","__typename":"Author"}]}')
})