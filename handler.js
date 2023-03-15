const AWS = require('aws-sdk');

const dynamodbClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
    AWS.config.update({
        region: "us-east-1",
    });

    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };

    try {
        switch (event.httpMethod) {
            case "GET":
                body = await dynamodbClient.get({
                    TableName: 'kintone-records',
                    Key: {
                        'partition_key': {
                            S: '22'
                        }
                    }
                }).promise();
                break;
            case "POST":
                let recordEvent = JSON.stringify(event, null, 2);
                let record = JSON.parse(event.body).record;
                let recordNumber = JSON.parse(event.body).record.$id.value;
            
            
                let putRequest = {
                    TableName: 'kintone-records',
                    Item: {
                        "partition_key": recordNumber,
                        "Text": "some text",
                        "event": event.httpMethod,
                        "record": record,
                        "recordEvent": recordEvent
                    }
                };
            
                await dynamodbClient.put(putRequest).promise()
                .then((data) => {
                    console.info('successfully added to dynamo', data)
                })
                .catch((err) => {
                    console.info('failed', err)
                })
                body = `Success`;
                break;
        }


    } catch (err) {
        statusCode = 400;
        body = err.message;

    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers
    };


};