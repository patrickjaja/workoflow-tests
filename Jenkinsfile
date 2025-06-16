pipeline {
    agent any
    
    environment {
        // Azure OpenAI credentials
        AZURE_API_KEY = credentials('azure-api-key')
        AZURE_API_HOST = credentials('azure-api-host')
        AZURE_API_VERSION = credentials('azure-api-version')
        AZURE_DEPLOYMENT_NAME = credentials('azure-deployment-name')
        
        // n8n webhook configuration
        N8N_WEBHOOK_URL = credentials('n8n-webhook-url')
        N8N_BASIC_AUTH_USERNAME = credentials('n8n-basic-auth-username')
        N8N_BASIC_AUTH_PASSWORD = credentials('n8n-basic-auth-password')

        // Test configuration
        SEMANTIC_THRESHOLD = '0.8'
        TEST_TIMEOUT = '30000'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup') {
            steps {
                sh '''
                    echo "Installing dependencies..."
                    npm ci
                '''
            }
        }
        
        stage('Validate Configuration') {
            steps {
                sh '''
                    echo "Validating test configuration..."
                    npm run test:dry-run
                '''
            }
        }
        
        stage('Run E2E Tests') {
            steps {
                sh '''
                    echo "Running E2E tests..."
                    npm run test:e2e
                '''
            }
        }
        
        stage('Generate Test Report') {
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
        always {
            // Clean workspace using deleteDir() as fallback for cleanWs()
            deleteDir()
        }
        success {
            echo 'E2E tests completed successfully!'
        }
        failure {
            echo 'E2E tests failed. Check the logs for details.'
        }
    }
}
