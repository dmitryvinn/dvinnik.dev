---
category: 'article'
cover: './cover.jpg'
title: 'Implementing Webhooks From The WhatsApp Business Platform'
description: 'In this article, we’ll walk through a tutorial that demonstrates how to set up an application that receives messages and stores them in a database.'
date: '2022-05-19'
tags: ['business-messaging']
published: true
canonicalUrl: 'https://business.whatsapp.com/blog/how-to-use-webhooks-from-whatsapp-business-api'
---

![cover](./cover.jpg)

*By Dmitry Vinnik*

*Originally posted [here](https://business.whatsapp.com/blog/how-to-use-webhooks-from-whatsapp-business-api).*

Webhooks are a simple way for services to send data whenever something happens. You set up an application or server to receive messages and give the service the address. When an event triggers in the service, it can simply call the webhook to send the message to your application.

The WhatsApp Business Platform offers a variety of options for different events that you can integrate into your application or service as long as it supports HTTPS and has a valid SSL certificate. This gives you the ability to automate responses to WhatsApp messages in real time.

In this article, we’ll examine ways to set up webhooks to connect with WhatsApp. We’ll also walk through a tutorial that demonstrates how to set up an application that receives messages and stores them in a database.

**Implementing Webhooks**

Businesses of any size benefit from using WhatsApp to establish 2-way conversations with their customers. Use cases fall into three main categories: customer service, marketing.

Webhooks can provide notifications about different types of events. For example, received message events go through the messages webhook. You can use this webhook to reduce the burden on customer service agents by filtering out common customer queries. Simple messages are passed to a chatbot service to formulate a response, and anything that can’t be immediately answered is escalated to live agents.

Received message events can also contain media, if users send images, or interaction details, if users click a button to respond to a message instead of typing a reply.

Now that we’ve explored some use cases for WhatsApp webhooks, let’s dive into the tutorial. We’ll examine a simple use case where customers provide review feedback via WhatsApp messages. We’ll show you how to store these reviews in a database, where they can be analyzed to understand common review themes or general sentiment around a particular product.

**Node.js Webhook Listener with AWS Lambda**

Imagine that your business wants to use the WhatsApp Business Platform to contact customers with a message asking them to review a product they recently purchased. Your business wants to let the customer respond to the message with their review, and then you want to store that review in a database.

To do this, you’ll create an AWS Lambda function using Node.js and store the data in DynamoDB. Using these technologies makes the whole stack serverless, removing infrastructure burden while developing and letting you scale up or down automatically to match demand. This also helps make pricing more flexible, as you only pay for what you use.

**Configure Your App**

First, initialize a new Node.js project. The Serverless Framework is a good choice, as it simplifies setup and deployment for AWS Lambda functions.

Enter the following commands to initialize the project:

npm init
serverless create --template aws-nodejs
npm install -s express serverless-http serverless-offline
Once your project is initialized, you then need to create an endpoint that will allow you to verify your application with the WhatsApp Business Platform. This is a requirement when creating your app on Meta for Developers.

Replace the boilerplate code in handler.js with the following:

const serverless = require('serverless-http')
const express = require('express')
const app = express()

const token = process.env.TOKEN

```
app.get('/webhooks',  (req, res) => {
 if (
   req.query['hub.mode'] == 'subscribe' &&
   req.query['hub.verify_token'] == token
 ) {
   res.send(req.query['hub.challenge']);
 } else {
   res.sendStatus(400);
 }
})
module.exports.handler = serverless(app);
```

The endpoint is very simple: It returns the hub.challenge parameter, which the verification system sends as a request parameter.

Next, you need to configure your endpoint in the Serverless YAML file. This YAML file defines the functions, endpoints, and any resources that should be created when the project is deployed to AWS.

This helps make the deployment process simpler and removes the need for any manual configuration. It bundles together any code and additional infrastructure configurations, such as resource creation or permission definitions.
Replace the boilerplate code in serverless.yml with the following code:

```
service: whatsapp-webhooks
frameworkVersion: '2'

provider:
 name: aws
 runtime: nodejs14.x
 lambdaHashingVersion: 20201221
 environment:
   TOKEN: ${env:APP_TOKEN}

plugins:
 - serverless-offline

functions:
 app:
   handler: handler.handler
   events:
     - http: ANY /
     - http: 'ANY {proxy+}'
```

The plugins section includes Serverless Offline, which emulates AWS Lambda and API Gateway and lets you test your endpoint locally before deploying it to AWS.

The functions section defines the location for your endpoint handler and defines which HTTP events can trigger it. For the sake of simplicity, set this handler to respond to any event.

The provider section contains the TOKEN environment variable. This secret token is required when sending the verification message from Meta for Developers.

To define the token, export an environment variable with the name “APP_TOKEN” in your terminal. For example, use the following command:

`export APP_TOKEN=testtoken`

When the service is deployed, the TOKEN variable will take the value of your local APP_TOKEN variable and make it available to the Lambda function in AWS.

Test Your App
Now that your project is configured, you should test that the function works locally.

Launch the project in offline mode by running the following command:

`serverless offline`

Once your app is running, run the following command in another window as the app will have control of the current one. Make sure you replace the token value with the value for the token you defined earlier:

`curl -v "http://localhost:3000/dev/webhooks?hub.mode=subscribe&hub.verify_token=testtoken"`

The output and 204 status responses should look similar to this:

```
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET /dev/webhooks?hub.mode=subscribe&hub.verify_token=testtoken HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.64.1
> Accept: */*
>
< HTTP/1.1 204 No Content
< x-powered-by: Express
< content-type: application/json; charset=utf-8
< cache-control: no-cache
< Date: Thu, 21 Apr 2022 16:28:24 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
* Connection #0 to host localhost left intact
* Closing connection 0
```

Next, deploy your application to AWS by running the following command:

`serverless deploy`

AWS will then output your endpoint to the terminal once your app has finished deploying.

**Configure the Webhook**

Next, begin the verification process by creating a Facebook app.

On the left navigation panel on the App Dashboard, select PRODUCTS. Then select Webhooks from the options. In the dropdown menu, select Whatsapp Business Account.

Next, enter the callback URL with the endpoint provided by AWS. The token should be the same token you used in the severless.yml file.

Once your app is verified, you can see all of the different object fields your webhook can subscribe to. Each provides an option to test and subscribe.

The field of interest is the messages field, which sends messages to your endpoint when they are received. Each of the webhooks sends a POST request to the same callback URL you provided when verifying the application.

Next, you need to write the code to retrieve the POST requests and store the data in DynamoDB.

Add the following code to the handler.js file:

```
const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.post('/webhooks',  (req, res) => {
const body = JSON.parse(req.body)
if(body.field !== 'messages'){
// not from the messages webhook so dont process
return res.sendStatus(400)
}
const reviews = body.value.messages.map((message)=>{
const reviewInfo = {
TableName: process.env.REVIEW_TABLE,
Item: {
phonenumber: message.from,
review: message.text.body
}
}
return dynamoDb.put(reviewInfo).promise()
})
// return 200 code once all reviews have been written to dynamoDB
return Promise.all(reviews).then((data) => res.sendStatus(200));
})
```

This code first installs the AWS SDK npm package so you can use the DynamoDB document client. The function then checks that the request was sent via the messages webhook. If it was, the function creates a review item consisting of the review and the customer’s phone number (which is provided by the webhook). The webhook sends each message as an array in the messages field, so it can send multiple at a time. The function loops over the messages, creating an array of DynamoDB PUT promises that can be executed later to store the data.

**Configure DynamoDB**

This simple example takes the data and stores it as-is as a DynamoDB record. At this point, you can add functionality to parse the message as required to implement additional business logic.

For this to work, you need to provide some configuration details for DynamoDB in your Serverless configuration. The complete serverless.yml file should now look like this:

```
service: whatsapp-webhooks
frameworkVersion: '2'

provider:
 name: aws
 runtime: nodejs14.x
 lambdaHashingVersion: 20201221
 region: eu-west-1
 iamRoleStatements:
   - Effect: "Allow"
     Action:
     - dynamodb:Query
     - dynamodb:Scan
     - dynamodb:GetItem
     - dynamodb:PutItem
     - dynamodb:UpdateItem
     - dynamodb:DeleteItem
     Resource: arn:aws:dynamodb:us-east-1:111111111111:table/${self:provider.environment.REVIEW_TABLE}
 environment:
   TOKEN: ${env:APP_TOKEN}
   REVIEW_TABLE: reviews

plugins:
 - serverless-offline

functions:
 app:
   handler: handler.handler
   events:
     - http: ANY /
     - http: 'ANY {proxy+}'

resources:
 Resources:
   ReviewsTable:
     Type: 'AWS::DynamoDB::Table'
     Properties:
       TableName: ${self:provider.environment.REVIEW_TABLE}
       AttributeDefinitions:
         - AttributeName: phonenumber
           AttributeType: S
       KeySchema:
         - AttributeName: phonenumber
           KeyType: HASH
       ProvisionedThroughput:
         ReadCapacityUnits: 1
         WriteCapacityUnits: 1
```

The file now has additional permission management statements in the provider section that allows your Lambda function to retrieve and write data to your DynamoDB table. The file also contains a resources section that configures the DynamoDB table, the table’s key, and the provisioned throughput. While testing, the allowance for capacity units is set to a low value for testing. But this can be configured in production to scale depending on demand.

**Test Your Application**

Now, when you deploy your Serverless application, the DynamoDB table will be automatically created and configured and your Lambda function will have all the permissions it needs to be able to write data to the table. This again emphasizes the power of using the Serverless framework, as all of our infrastructure requirements are dealt with in a simple configuration.

Once you’ve deployed, return to Meta for Developers and select the Test button in the messages field row. It opens a new Field Sample window that looks like this:

This displays the format of the payload sent every time a message is sent to the account. Select Send to My Server, and then navigate to DynamoDB within the AWS console to see the new record with a review containing the test text:

**Conclusion**

This was a simple test application showing the ease and simplicity of setting up a webhook listener using the Serverless Framework. By using serverless technologies like AWS Lambda and DynamoDB this application can be scaled up from a simple prototype to a production-ready service capable of handling a large throughput volume.

You can use webhooks on the WhatsApp Business Platform to help automate customer account management and interaction. The official WhatsApp webhooks documentation provides more complete information on subscribing to webhooks for a production system. Note that the webhooks documentation omits the [messages] field. Use the Webhooks Reference for a complete list of fields available for subscription.

When building listeners for these webhooks, it’s important to think about cost and scalability. The solution needs to be able to deal with spikes in demand caused by a large volume of customers contacting you via WhatsApp at the same time. At other times, your demand may drop when customers aren’t contacting you — for example, overnight — so you want your solution to scale down to reduce costs. The solution should also scale up in general as your customer base grows.

Choosing the appropriate tools is critical. The Serverless Framework, AWS Lambda, and DynamoDB were appropriate for this webhook listener, but you should consider your business’ specific needs. The solution in this article meets variable scaling demands, adjusts to keep costs low during periods of low usage, and removes the requirement to manage infrastructure. This helps make it easy for developers to deploy and manage.

Refer to the official WhatsApp webhooks setup guide for more detailed information on using webhooks in your application.