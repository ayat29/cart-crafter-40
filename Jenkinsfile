pipeline {
    agent any
    
    environment {
        SONAR_TOKEN = credentials('SONAR_TOKEN')
        OCTOPUS_ACCESS_TOKEN=credentials('OCTOPUS_ACCESS_TOKEN')
        OCTOPUS_URL='https://gomart.octopus.app/'
    }

    stages {
        
        stage('Build') {
            steps {
                // bat 'Start-Service com.docker.service'
                echo 'Building the application...'
                bat 'npm --prefix E:/SIT753-HD/cart-crafter-40 run build'
            }
        }

        stage('Test') {
            steps {
                bat 'npm --prefix E:/SIT753-HD/cart-crafter-40 test'
            }
        }

        stage('Code Quality Analysis') {
            steps {
                dir('E:/SIT753-HD/cart-crafter-40') {
                echo 'Analyzing code quality...'
                bat 'npm test -- --run --coverage'
                bat 'sonar-scanner "-Dsonar.projectKey=lovable-react-app" "-Dsonar.organization=ayat29" "-Dsonar.sources=src" "-Dsonar.host.url=https://sonarcloud.io" "-Dsonar.login=5e290ab518edf8d2bf226d6a2b32c9e56f9493ea"'
                }
            }
        }

        // stage('Security Scan') {
        //     steps {
        //         echo 'Running security scans...'
        //         // Example: OWASP Dependency Check
        //         sh 'mvn org.owasp:dependency-check-maven:check'
        //     }
        // }

        stage('Deploy') {
            steps {
                echo "Deploying to staging environment..."
                bat 'docker-compose -f E:/SIT753-HD/cart-crafter-40/docker-compose.yml up -d --build'
            }
        }

        stage('Release') {
            steps {
                dir('E:/SIT753-HD') {
                    bat 'docker tag cart-crafter-40-web ayat29/cart-crafter-40-web'
                    bat 'docker push ayat29/cart-crafter-40-web'
                    bat 'octopus login --server %OCTOPUS_URL% --api-key %OCTOPUS_ACCESS_TOKEN% --space Default'
                    echo 'Releasing to production...'
                    bat './deploy.bat'
                }
            }
        }

        // stage('Monitoring & Alerting') {
        //     steps {
        //         echo 'Triggering monitoring and alerting setup...'
        //         // Example: Call monitoring scripts or API
        //         sh './monitoring_setup.sh'
        //     }
        // }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
