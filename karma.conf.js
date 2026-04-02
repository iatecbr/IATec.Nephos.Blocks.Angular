const path = require('path');

module.exports = function (config) {
    const junitReportFile = process.env.JUNIT_REPORT_FILE || 'TESTS-results.xml';
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('karma-junit-reporter')
        ],
        client: {
            jasmine: {},
            clearContext: false
        },
        jasmineHtmlReporter: {
            suppressAll: true
        },
        coverageReporter: {
            dir: path.join(__dirname, './coverage'),
            subdir: '.',
            reporters: [
                {type: 'html'},
                {type: 'cobertura'},
                {type: 'text-summary'}
            ]
        },
        junitReporter: {
            outputDir: __dirname,
            outputFile: junitReportFile,
            useBrowserName: false
        },
        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
            }
        },
        browserDisconnectTimeout: 10000,
        browserDisconnectTolerance: 1,
        browserNoActivityTimeout: 60000,
        captureTimeout: 120000,
        reporters: ['progress', 'kjhtml', 'junit'],
        browsers: [process.env.CI ? 'ChromeHeadlessCI' : 'Chrome'],
        restartOnFileChange: true
    });
};
