// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

// Declare local variables
const route53 = new AWS.Route53()
const hzId = '/hostedzone/Z03913583BQXI7MYK5KR9'

createRecordSet(hzId)
.then(data => console.log(data))

function createRecordSet (hzId) {
  const params = { 
    HostedZoneId: hzId,
    ChangeBatch: {
      Changes: [
        {
          Action: 'CREATE',
          ResourceRecordSet: {
            Name: 'hbfl.online',
            Type: 'A',
            AliasTarget: {
              DNSName: 'hamsterELB-304202288.us-east-2.elb.amazonaws.com',
              EvaluateTargetHealth: false,
              HostedZoneId: 'Z3AADJGX6KTTL2'
            }
          }
        }
      ]
    }
  }
  // Link to ELB Regions:
  // https://docs.aws.amazon.com/general/latest/gr/elb.html

  return new Promise((resolve, reject) => {
    route53.changeResourceRecordSets(params,(err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}
