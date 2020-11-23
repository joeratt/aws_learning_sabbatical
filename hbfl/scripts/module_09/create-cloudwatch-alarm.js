// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-2' })

// Declare local variables
const cw = new AWS.CloudWatch()
const alarmName = 'hamster-elb-alarm'
const topicArn = 'arn:aws:sns:us-east-2:896140738922:hamster-topic'
const tg = 'targetgroup/hamsterTG/151f2f663a47b311'
const lb = 'app/hamsterELB/33e3732a7196b20a'

createCloudWatchAlarm(alarmName, topicArn, tg, lb)
.then(data => console.log(data))

function createCloudWatchAlarm (alarmName, topicArn, tg, lb) {
  const params = {
    AlarmName: alarmName,
    ComparisonOperator: 'LessThanThreshold',
    EvaluationPeriods: 1,
    MetricName: 'HealthyHostCount',
    Namespace: 'AWS/ApplicationELB',
    Period: 60,
    Threshold: 1,
    AlarmActions: [
      topicArn
    ],
    Dimensions: [
      {
        Name: 'TargetGroup',
        Value: tg
      },
      {
        Name: 'LoadBalancer',
        Value: lb
      }
    ],
    Statistic: 'Average',
    TreatMissingData: 'breaching'
  }

  return new Promise((resolve, reject) => {
    cw.putMetricAlarm(params, (err,data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}
