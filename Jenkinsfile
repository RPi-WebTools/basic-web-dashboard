pipeline {
    agent {
        docker {
            image 'node:alpine'
        }
    }

    environment {
        HOME = '.'
    }

    stages {
        stage('Install dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        stage('Jest Tests') {
            steps {
                sh 'npm test'
            }
			post {
                always {
                    publishHTML target: [
                        allowMissing          : false,
                        alwaysLinkToLastBuild : false,
                        keepAll               : true,
                        reportDir             : 'output/coverage/jest',
                        reportFiles           : 'index.html',
                        reportName            : 'Test Report'
                    ]
                }
            }
        }
        stage('Prod Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}