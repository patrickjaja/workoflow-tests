// Jenkins Job DSL script for creating a freestyle job
job('workoflow-tests-e2e') {
    description('E2E tests for n8n webhook agent with semantic validation')
    
    scm {
        git {
            remote {
                url('https://github.com/patrickjaja/workoflow-tests.git')
            }
            branch('main')
        }
    }
    
    triggers {
        githubPush()
        cron('H 2 * * *') // Run daily at 2 AM
    }
    
    wrappers {
        credentialsBinding {
            string('AZURE_API_KEY', 'azure-api-key')
            string('AZURE_API_HOST', 'azure-api-host')
            string('AZURE_API_VERSION', 'azure-api-version')
            string('AZURE_DEPLOYMENT_NAME', 'azure-deployment-name')
            string('N8N_WEBHOOK_URL', 'n8n-webhook-url')
        }
        timeout {
            absolute(30)
        }
    }
    
    steps {
        shell('''
            #!/bin/bash
            set -e
            
            # Set test configuration
            export SEMANTIC_THRESHOLD=0.8
            export TEST_TIMEOUT=30000
            
            echo "=== Installing dependencies ==="
            npm ci
            
            echo "=== Validating test configuration ==="
            npm run test:dry-run
            
            echo "=== Running E2E tests ==="
            npm run test:e2e
            
            echo "=== Exporting test results ==="
            npm run test:export
        ''')
    }
    
    publishers {
        archiveArtifacts {
            pattern('test-results/**/*')
            allowEmpty(true)
        }
        
        junit('test-results/**/*.xml') {
            allowEmptyResults(true)
        }
        
        extendedEmail {
            triggers {
                failure {
                    subject('E2E Tests Failed: $PROJECT_NAME - Build # $BUILD_NUMBER')
                    content('The E2E tests have failed. Please check the console output at $BUILD_URL')
                    sendTo {
                        developers()
                    }
                }
                fixed {
                    subject('E2E Tests Fixed: $PROJECT_NAME - Build # $BUILD_NUMBER')
                    content('The E2E tests are now passing again.')
                    sendTo {
                        developers()
                    }
                }
            }
        }
    }
}