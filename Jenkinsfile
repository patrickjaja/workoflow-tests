pipeline {
    agent none
    
    environment {
        // Test configuration (other vars are inherited from Jenkins job config)
        SEMANTIC_THRESHOLD = '0.8'
        TEST_TIMEOUT = '30000'
    }
    
    stages {
        stage('Checkout') {
            agent any
            steps {
                checkout scm
            }
        }
        
        stage('Setup') {
            agent any
            steps {
                sh '''
                    echo "Installing dependencies..."
                    npm ci
                '''
            }
        }
        
        stage('Validate Configuration') {
            agent any
            steps {
                sh '''
                    echo "Validating test configuration..."
                    npm run test:dry-run
                '''
            }
        }
        
        stage('Run E2E Tests') {
            agent any
            steps {
                sh '''
                    echo "Running E2E tests..."
                    npm run test:e2e
                '''
            }
        }
        
        stage('Generate Test Report') {
            agent any
            steps {
                sh '''
                    echo "Exporting test results..."
                    npm run test:export
                '''
                
                // Archive test results
                archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                
                // Publish test results if JUnit format is available
                junit allowEmptyResults: true, testResults: 'test-results/**/*.xml'
            }
        }
    }
    
    post {
//         always {
//             script {
//                 if (currentBuild.rawBuild.getExecutor() != null) {
//                     deleteDir()
//                 }
//             }
//         }
        success {
            echo 'E2E tests completed successfully!'
        }
        failure {
            echo 'E2E tests failed. Check the logs for details.'
        }
    }
}
