import buildEnvURI from '../src/utils/buildENV';
import buildENV from '../src/utils/buildENV';

test('When trying to create the Environment URI the result is not null: ', () => {
    expect(buildEnvURI("thisIsNotNull")).not.toBeNull;
});

test('When trying to create the Environment URI the result is a string: ', () => {
    expect(typeof((buildENV("thisIsAString")))).toBe('string');
});

test('Create the correct Environment URI given test input: ', () => {
    expect(buildEnvURI("theCorrectURIString")).toBe("DB_URI=theCorrectURIString");
});
