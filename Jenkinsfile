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
                    echo "Creating empty .env file..."
                    touch .env
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
        
        stage('Validate Configuration') {
            steps {
                sh '''
                    echo "Validating test configuration..."
                    docker-compose run --rm promptfoo-shell npm run test:dry-run
                '''
            }
        }
        
        stage('Run E2E Tests') {
            steps {
                sh '''
                    echo "Running E2E tests..."
                    docker-compose run --rm promptfoo-shell npm run test:e2e
                '''
            }
        }
        
        stage('Generate Test Report') {
            steps {
                sh '''
                    echo "Exporting test results..."
                    docker-compose run --rm promptfoo-shell npm run test:export
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
