// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

// Declare local variables
const sns = new AWS.SNS()
const type = 'sms'
const endpoint = '12197768808'
const topicArn = 'arn:aws:sns:us-east-2:896140738922:hamster-topic'

createSubscription(type, topicArn, endpoint)
.then(data => console.log(data))

function createSubscription (type, topicArn, endpoint) {
  const params = {
    Protocol: type,
    TopicArn: topicArn,
    Endpoint: endpoint
  }

  return new Promise((resolve, reject) => {
    sns.subscribe(params, (err,data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}
