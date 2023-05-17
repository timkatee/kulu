module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    moduleNameMapper: {
        '^@application/(.*)': '<rootDir>/src/application/$1',
        '^@domain/(.*)': '<rootDir>/src/domain/$1',
        '^@infrastructure/(.*)': '<rootDir>/src/infrastructure/$1',
        '^@commons/(.*)': '<rootDir>/src/commons/$1',
    },
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/*spec.ts'],
    transform: {
        '^.+\\.(t|j)s$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.json',
                ignoreCodes: ['TS151001'],
            },
        ],
    },
    collectCoverage: true,
    // silent: true,
    verbose: true
};