# Create-Dynamo-Item-from-Kintone-Lambda
This API Gateway was created to listen to Lambda/POST requests, and add the item to Dynamo. The POST request comes from Kintone Webhook.

NPM Project:
1. npm init
2. install Kintone REST API package
3. Package the project as a ZIP file called handler.zip
4. Upload to Lambda

Dynamo:
1. Create a new table called kintone-records
2. Give Lambda permission to write to the Dynamo table

API Gateway:
1. Create a new REST API
2. Create GET, POST, PUT, DELETE methods
3. Give Lambda proxy permission to each method

Lambda: 
1. Upload the handler.zip
2. Give Lambda permission to write to Dynamo
