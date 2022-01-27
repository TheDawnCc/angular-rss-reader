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

    stage('Deliver') {
      steps {
        sh '''chmod 744 ./jenkins/scripts/deliver.sh
./jenkins/scripts/deliver.sh'''
        input 'Finished using the web site? (Click "Proceed" to continue)'
        sh '''chmod 744 ./jenkins/scripts/kill.sh
./jenkins/scripts/kill.sh'''
      }
    }

  }
}