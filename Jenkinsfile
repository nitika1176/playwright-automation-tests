pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/nitika1176/playwright-automation-tests.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // Install Chromium, Firefox, WebKit
                bat 'npx playwright install'
            }
        }

        stage('Run LOGINN Test - All Browsers') {
            steps {
                // Clean previous Allure results
                bat 'npm run clean:allure'

                // Run all tests on all browsers defined in config.js
                bat 'npx playwright test tests/LOGINN.test.js --workers=1'

                // Generate Allure report
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}
