pipeline {
    agent any
    
    stages {
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                // Run Node.js tests with Allure Report generation
                sh 'npx playwright tests:api'
            }
        }

          stage('Generate Report') {
            steps {
              sh  'npm run report'
            }
        }
        
        stage('Publish Allure Report') {
            steps {
                // Publish Allure Report to Jenkins
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])
            }
        }
        
       }
}