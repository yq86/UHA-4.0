pipeline {
    agent {
        docker {
            image 'node:16.13.0'
            args '-u root:root -p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build Back') {
            steps {
                sh 'cd back && npm install'
            }
        }
        stage('Test Back') {
            steps {
                sh 'cd back && npm test'
            }
        }
        stage('Deploy Back') {
            steps {
                sh 'cd back && npm run build'
            }
        }
        stage('Build Front') {
            steps {
                sh 'cd front && npm install'
            }
        }
        stage('Deploy Front') {
            steps {
                sh 'cd front && ng serve'
            }
        }
    }
}
