pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    environment {
        // Azure OpenAI credentials
        AZURE_API_KEY = credentials('azure-api-key')
        AZURE_API_HOST = credentials('azure-api-host')
        AZURE_API_VERSION = credentials('azure-api-version')
        AZURE_DEPLOYMENT_NAME = credentials('azure-deployment-name')
        
        // n8n webhook configuration
        N8N_WEBHOOK_URL = credentials('n8n-webhook-url')
        
        // Test configuration
        SEMANTIC_THRESHOLD = '0.8'
        TEST_TIMEOUT = '30000'
        
        // Docker configuration
        DOCKER_BUILDKIT = '1'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/patrickjaja/workoflow-tests.git'
            }
        }
        
        stage('Install Docker Compose') {
            steps {
                sh '''
                    apk add --no-cache docker-cli docker-compose
                '''
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "Building Docker image..."
                    npm run docker:build
                '''
            }
        }
        
        stage('Run Tests in Docker') {
            steps {
                sh '''
                    echo "Running tests in Docker container..."
                    docker-compose up --exit-code-from promptfoo-shell
                '''
            }
        }
        
        stage('Export Results') {
            steps {
                sh '''
                    echo "Exporting test results..."
                    docker-compose run promptfoo-shell npm run test:export
                '''
                
                // Copy results from container
                sh '''
                    docker cp $(docker-compose ps -q promptfoo-shell):/app/test-results ./test-results || true
                '''
                
                // Archive test results
                archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
            }
        }
    }
    
    post {
        always {
            sh '''
                docker-compose down || true
                npm run docker:clean || true
            '''
            cleanWs()
        }
        success {
            echo 'E2E tests completed successfully!'
        }
        failure {
            echo 'E2E tests failed. Check the logs for details.'
        }
    }
}