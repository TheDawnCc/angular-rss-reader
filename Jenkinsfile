pipeline {
  agent {
    docker {
      image 'node:16'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      environment {
        CI = 'true'
      }
      steps {
        sh '''sh \'chmod 744 ./jenkins/scripts/test.sh\'
./jenkins/scripts/test.sh'''
      }
    }

  }
}