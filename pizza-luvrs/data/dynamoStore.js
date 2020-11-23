const AWS = require('aws-sdk')
const { reject } = require('lodash')

AWS.config.update({region: 'us-east-2'})

const dynamodb = new AWS.DynamoDB.DocumentClient()

async function putItem(table, item) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: table,
            Item: item
        }

    dynamodb.put(params, (err, data) => {
        if(err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})

}

async function getAllItems(table) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: table
        }

    dynamodb.scan(params, (err, data) => {
        if(err) {
            reject(err)
        } else {
            resolve(data.Items)
        }
    })
})

}

async function getItem(table, itemKey, id) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: table,
            Key: {
                [itemKey]: id
            }
        }

    dynamodb.get(params, (err, data) => {
        if(err) {
            reject(err)
        } else {
            resolve(data.Item)
        }
    })
})

}

module.exports = {
    putItem,
    getAllItems,
    getItem
}