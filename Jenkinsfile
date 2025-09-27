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
                // Downloads Chromium, Firefox, WebKit for Playwright
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm run clean:allure'
                bat 'npx playwright test tests/LOGINN.test.js'
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

