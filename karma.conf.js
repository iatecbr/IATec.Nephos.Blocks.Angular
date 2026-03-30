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
                {type: 'text-summary'}
            ]
        },
        junitReporter: {
            outputDir: __dirname,
            outputFile: junitReportFile,
            useBrowserName: false
        },
        reporters: ['progress', 'kjhtml', 'junit'],
        browsers: ['Chrome'],
        restartOnFileChange: true
    });
};
