// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

// Declare local variables
const ec2 = new AWS.EC2()
const volumeId = 'vol-045623b95cef91d51'
const instanceId = 'i-0b20dbbee9ff681dc'
// NOTE: I couldn't get this to work for the life of me

detachVolume(volumeId)
.then(() => attachVolume(instanceId, volumeId))

function detachVolume (volumeId) {
  const params = {
    VolumeId: volumeId
  }

  return new Promise((resolve, reject) => {
    ec2.detachVolume(params, (err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}

function attachVolume (instanceId, volumeId) {
  const params = {
    InstanceId: instanceId,
    VolumeId: volumeId,
    Device: '/dev/sdf'
  }

  return new Promise((resolve, reject) => {
    ec2.attachVolume(params, (err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}
