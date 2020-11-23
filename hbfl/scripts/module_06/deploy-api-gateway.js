// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

// Declare local variables
const apiG = new AWS.APIGateway()
// I dunno here... I couldn't get the API Gateway to actually create...
const apiId = '/* TODO: Add api id */'

createDeployment(apiId, 'prod')
.then(data => console.log(data))

function createDeployment (apiId, stageName) {
  const params = { 
    restApiId: apiId,
    stageName: stageName
  }

  return new Promise((resolve, reject) => {
    apiG.createDeployment(params, (err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}
