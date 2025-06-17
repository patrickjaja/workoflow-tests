pipeline {
    agent any
    
    environment {
        // Test configuration (other vars are inherited from Jenkins job config)
        SEMANTIC_THRESHOLD = '0.8'
        TEST_TIMEOUT = '30000'
        DOCKER_BUILDKIT = '1'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Environment') {
            steps {
                sh '''
                    echo "Creating .env file from Jenkins environment variables..."
                    cat > .env << EOF
N8N_WEBHOOK_URL=$N8N_WEBHOOK_URL
N8N_BASIC_AUTH_ENCODED=$N8N_BASIC_AUTH_ENCODED
AZURE_API_KEY=$AZURE_API_KEY
AZURE_API_HOST=$AZURE_API_HOST
AZURE_API_VERSION=$AZURE_API_VERSION
AZURE_DEPLOYMENT_NAME=$AZURE_DEPLOYMENT_NAME
OPENAI_API_KEY=$OPENAI_API_KEY
TEST_ENVIRONMENT=$TEST_ENVIRONMENT
SEMANTIC_THRESHOLD=$SEMANTIC_THRESHOLD
MAX_RETRIES=$MAX_RETRIES
TEST_TIMEOUT=$TEST_TIMEOUT
EOF
                    echo ".env file created with environment variables"
                '''
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "Building Docker image..."
                    docker-compose build promptfoo-shell
                '''
            }
        }
        
        stage('Run E2E Tests') {
            steps {
                sh '''
                    echo "Running E2E tests..."
                    docker-compose run --rm promptfoo-shell promptfoo eval -c configs/promptfoo.yaml --no-cache -o test-results/output.html
                '''
            }
        }
        
        stage('Generate Test Report') {
            steps {
                sh '''
                    echo "Exporting test results..."
                    docker-compose run --rm promptfoo-shell promptfoo export -o test-results/report.html
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
            sh '''
                # Clean up Docker containers
                docker-compose down || true
                # Clean workspace
                rm -rf node_modules || true
                rm -f .env || true
            '''
        }
        success {
            echo 'E2E tests completed successfully!'
        }
        failure {
            echo 'E2E tests failed. Check the logs for details.'
        }
    }
}
