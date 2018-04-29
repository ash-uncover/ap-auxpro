module.exports = {
    "modulePaths": [
        "src",
        "test"
    ],
    "collectCoverageFrom": [
        "src/**/*.js"
    ],
    "coverageDirectory": "test/__coverage__",
    "coverageThreshold": {
        "global": {
            "branches": 100,
            "functions": 100,
            "lines": 100,
            "statements": 100
        }
    },
    "coverageReporters": [
        "json",
        "lcov",
        "text",
        "text-summary"
    ]
}
