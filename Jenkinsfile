pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'SSH', url: 'git@github.com:saiaditya200/mini-todo-app.git', branch: 'main'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                sh '''
                cd mini-todo-backend
                npm install
                '''
            }
        }

        stage('Restart Backend with PM2') {
            steps {
                sh '''
                cd mini-todo-backend
                pm2 restart todo-backend || pm2 start server.js --name todo-backend
                '''
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                sh '''
                cd mini-todo-frontend
                npm install
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                cd mini-todo-frontend
                npm run build
                '''
            }
        }
    }
}
