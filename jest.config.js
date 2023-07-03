module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	coverageDirectory: "coverage",
	roots: ["<rootDir>/src", "<rootDir>/test"],
	collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/main/**"],
	transform: {
		".+\\.ts$": "ts-jest",
	},
};
