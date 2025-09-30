pipeline {
    agent any

    triggers {
        cron('23 11 * * *') // Runs daily at 11:23 AM
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
                // Clean previous Allure results
                bat 'npm run clean:allure'

                // Run tests sequentially
                bat 'npx playwright test tests/LOGINN.test.js --workers=1'

                // Generate Allure report
                bat 'npx allure generate allure-results --clean -o allure-report'

                // List contents of allure-report to confirm
                bat 'dir allure-report'
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }

    post {
        always {
            script {
                try {
                    echo "Workspace contents before zipping:"
                    bat 'dir /s'

                    // Zip the Allure report using full workspace path
                    bat 'powershell -Command "Compress-Archive -Path \'%WORKSPACE%\\allure-report\\*\' -DestinationPath \'%WORKSPACE%\\allure-report.zip\' -Force"'

                    echo "Workspace contents after zipping:"
                    bat 'dir /s'

                    // Send email with the zipped Allure report attached
                    mail body: "Please find attached the Allure report for this build.",
                         subject: "Jenkins Build - Allure Report",
                         to: "sharmanitika1111@gmail.com",
                         attachLog: true,
                         attachmentsPattern: '**/allure-report.zip'

                } catch (err) {
                    echo "Email sending failed: ${err}"
                }
            }
        }
    }
}
