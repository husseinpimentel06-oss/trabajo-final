const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const method = event.httpMethod;
    
    if (method === 'GET') {
        const data = await dynamo.scan({ TableName: process.env.TABLE_NAME }).promise();
        return { statusCode: 200, body: JSON.stringify(data.Items) };
    }
    
    // Aquí podrías añadir lógica para emitir eventos a EventBridge
};