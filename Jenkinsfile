pipeline {
  agent {
    label 'test'
  }
  
  environment {
    var1 = 'test var'
    
    type = 'micro'
  }
  
  stage('var example') {
    steps {
      powershell '''
      
      echo ${env:WORKSPACE}
      echo ${env:type}
      '''
    }
  }
  
  stage('install&test') {
    steps {
      powershell '''
      npm install
      npm test
      '''
    }
  }
  
  stage('build') {
    steps{
      powershell 'npm build'
    }
  }
  
  post{
    always{
      archiveArtifacts artifacts: 'build/',fingerprint:true
      junit 'test-results.xml'
    }
  }
 
}
