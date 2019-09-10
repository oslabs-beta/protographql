import buildEnvURI from './buildENV';

test('Create the correct environment string.', () => {
    expect(buildEnvURI("thecorrectstring")).toBe("DB_URI=thecorrectstring");
});
