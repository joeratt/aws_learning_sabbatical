// Imports
const AWS = require('aws-sdk')
const { reject } = require('bluebird')

AWS.config.update({ region:'us-east-2'})

// Declare local variables
const ec2 = new AWS.EC2()

createImage('i-0b20dbbee9ff681dc', 'hamsterImage')
.then(() => console.log('Complete'))

function createImage (seedInstanceId, imageName) {
  const params = {
    InstanceId: seedInstanceId,
    Name: imageName
  }

  return new Promise((resolve, reject) => {
      ec2.createImage(params, (err, data) => {
        if(err) reject(err)
        else resolve(data)
      })
  })
}
