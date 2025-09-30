pipeline {
    agent any

    triggers {
        cron('15 11 * * *') // Runs daily at 11:15 AM
    }

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
                bat 'npx playwright install'
            }
        }

        stage('Run LOGINN Test - All Browsers') {
            steps {
                bat 'npm run clean:allure'
                bat 'npx playwright test tests/LOGINN.test.js --workers=1'
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

