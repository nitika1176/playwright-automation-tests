pipeline {
    agent any

    //triggers {
      //  cron('23 11 * * *') // Runs daily at 11:23 AM
    //}

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

                // Debug: list contents of allure-report
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

                    // Zip only if folder exists, ignore errors
                    bat '''
                    if exist allure-report (
                        powershell Compress-Archive -Path "allure-report\\*" -DestinationPath "allure-report.zip" -Force
                    ) else (
                        echo "Allure report folder does not exist, skipping zip"
                    )
                    '''

                    echo "Workspace contents after zipping:"
                    bat 'dir /s'

                    // Send email with attachment if exists
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
