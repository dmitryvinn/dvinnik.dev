---
category: 'article'
cover: './cover.jpg'
title: 'Managing Message Templates with the WhatsApp Business Platform'
description: 'This hands-on tutorial will walk you through the processes of template management — including creation, deletion, and customization.'
date: '2022-06-07'
tags: ['business-messaging']
published: true
canonicalUrl: 'https://business.whatsapp.com/blog/manage-message-templates-whatsapp-business-api'
---

![cover](./cover.jpg)

*By Dmitry Vinnik*

*Originally posted [here](https://business.whatsapp.com/blog/manage-message-templates-whatsapp-business-api).*

WhatsApp message templates are a powerful way to send valuable information to customers. You can use them to deliver reminders, notifications, or customized updates.

WhatsApp allows you to initiate direct conversations with users who have opted in to receiving messages. Additionally, you can reply to any message that a user has initiated. These users can then receive WhatsApp’s template-based messages.

Using the WhatsApp Business Platform to generate these templates can streamline your communication with clients and greatly enhance user experience.

Let’s consider an example. A hypothetical travel business — Terrific Travel Ltd. — offers services for reserving transportation, hospitality, and recreational activities. The global ubiquity of WhatsApp makes it an ideal platform for this business to communicate with its clients. While email confirmations are excellent for record-keeping, the ability to engage with customers in two-way conversations is of tremendous value for travelers on the go — and not one that traditional SMS can avail.

Furthermore, WhatsApp message templates can enable Terrific Travel Ltd. to communicate with the optimal amount of personalized detail. In this case, a customized welcome message, timely notifications, and instantly accessible electronic tickets can go a long way to provide the customer peace of mind that their trip is managed — allowing them to relax and enjoy their vacation.

To experience how easy it is to get the most out of the WhatsApp Business API and message templates, this hands-on tutorial will walk you through the processes of template management — including creation, deletion, and customization.

**Managing Message Templates with the WhatsApp Business Platform**

*Prerequisites*

This tutorial assumes that you have a basic knowledge of Node.js and Express.js applications. Before moving forward, please complete the steps provided in the introductory section of the WhatsApp Business Platform documentation. If you’re a business solutions provider (BSP), follow Get Started for Business Solution Providers and ensure that your Meta app passes the review process.

Before proceeding with the tutorial, ensure that you have a WhatsApp Business ID and a phone number ID.

Additionally, BSPs require a system user token with the required permissions (whatsapp_business_management, whatsapp_business_messaging, and business_management).

If you don’t have Node.js and Express.js applications, you can use this application boilerplate built specifically for the tutorial.

Additionally, this tutorial will use several packages, including dotenv to store the token and requests to make HTTP requests with the API. We will also use Postman to test the API endpoints.

For further exploration, the complete code is available here.

Once you’ve set up the initial application and added the token with the proper permissions, you’re ready to start.

Creating a New Message Template
Let’s say Global Voyager wants to create several message templates for specific purposes. For example, they want to make one template for a customer greeting and another to send PDF copies of relevant documents.

Before you begin coding, take a moment to understand how the template creation process works and which types of parameters it accepts. Additionally, it is crucial to note that Meta reviews templates daily and can reject them if they do not adhere to the guidelines as specified.

The documentation states that you need to make a POST request to message_templates using your WhatsApp Business ID.

The following parameters are accepted:

```
category of type ENUM
components of a type JSON array
language
name
```

The components parameter defines the body of the message template. It accepts the following sub-parameters:

```
type — of the type ENUM of HEADER, BODY, FOOTER, and BUTTONS
format — of the type ENUM of TEXT, IMAGE, DOCUMENT, VIDEO, LOCATION
text — of the type string
buttons — of the type JSON array
```

Now, you have a text-based message template to greet customers and a media-based message template to send a PDF — and as per our example, these would be perfect for sending travel tickets or itinerary confirmations.

**Creating a Text-based Message Template**

First, you need to create a new router in routes/messageTemplates.js:

`router.post("/messageTemplate", createMessageTemplate);`

Then, use the createMessageTemplate controller method, which we’ll make inside controllers/messageTemplate.js:

```
exports.createMessageTemplate = async (req, res) => {exports.createMessageTemplate = async (req, res) => {
  const { name, language, category, components } = req.body;
  if (!name || !language || !category || !components) {
    return res.status(400).json({
      error: "Required Fields: name, language, category, and components",
    });
  }
  request.post(
    {
      url: `https://graph.facebook.com/v13.0/${process.env.META_BUSINESS_ID}/message_templates`,
      headers: {
        Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        language: language,
        category: category,
        components: components,
      }),
    },
    function (err, resp, body) {
      if (err) {
        console.log("Error!");
      } else {
        res.json(JSON.parse(body));
      }
    }
  );
};
```

Below is a sample request object that you can pass to create the message template. {{1}} is used to pass variables. Note that {{X}} is used to define the message template variables not Postman variables.

```
{
    "name": "welcome_greetings",
    "language": "en_US",
    "category": "ALERT_UPDATE",
    "components": [
        {
            "type": "HEADER",
            "format":"TEXT",
            "text": "Hi {{1}}! How are you?"
        },
        {
            "type": "BODY",
            "text": "Thank you for choosing Terrific Travel Ltd. as your vacation concierge! Please reach out to us if you have any questions or concerns."
        },
        {
            "type": "FOOTER",
            "text": "Terrific Travel Ltd."
        }
    ]
}
```

The successful API response returns the id value, representing the template ID.

**Creating a Media-Based Message Template**

After you finish the text-based template, you can create media-based templates just as easily. These are flexible and efficient means of sending documents that a customer can access immediately.

The template below will feature a HEADER that will include the attached document, a BODY component, and a FOOTER component:

```
{
    "name": "sample_ticket_confirmation",
    "language": "en_US",
    "category": "TICKET_UPDATE",
    "components": [
        {
            "type": "HEADER",
            "format": "DOCUMENT"
        },
        {
            "type": "BODY",
            "text": "This is your flight confirmation for {{1}}-{{2}} on {{3}}."
        },
        {
            "type": "FOOTER",
            "text": "This message is from an unverified business."
        }
    ]
}
```

Note: Before you can use the message templates to communicate with customers, the templates must be approved and adhere to the Message Template Guidelines.

**Retrieving a List of Existing Message Templates**

Now that you have created the message templates, you can retrieve them. To do this, make a GET call to:

`https://graph.facebook.com/v13.0/whatsapp-business-account-ID/message_templates`

Note: The API version can change. Ensure that your URL is updated accordingly.

Next, create a new route in `routes/messageTemplates.js`:

`router.get("/messageTemplates", getMessageTemplates);`

The above getMessageTemplates is a controller method that you can create in controllers/messageTemplate.js. See below:

```
exports.getMessageTemplates = async (req, res) => {
  request.get(
    {
      url: `https://graph.facebook.com/v13.0/${process.env.META_BUSINESS_ID}/message_templates`,
      headers: {
        Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
      },
    },
    function (err, resp, body) {
      if (err) {
        console.log("Error!");
      } else {
        res.json(JSON.parse(body));
      }
    }
  );
};
```

A successful response includes the templates you created and WhatsApp’s sample template.

**Deleting a Message Template**

Similar to your GET route, you can also create a DELETE route in routes/messageTemplates.js:


`router.delete("/messageTemplate", deleteMessageTemplate);`

Now, create the supporting controller method in controllers/messageTemplates.js:

```
exports.deleteMessageTemplate = async (req, res) => {
  request.delete(
    {
      url: `https://graph.facebook.com/v13.0/${process.env.META_BUSINESS_ID}/message_templates`,
      headers: {
        Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: req.body.name,
      }),
    },
    function (err, resp, body) {
      if (err) {
        console.log("Error!");
      } else {
        res.json(JSON.parse(body));
      }
    }
  );
};
```

To delete a template, you must pass the template name as a JSON body.

For example, the below screenshots show a successful Postman request and response for deleting a template named demo_template_user:

**Sending a Message Using the Template**

Now, let’s use a message template to send messages.

First, make a router and its supporting controller. Inside routes/messageTemplates.js, add:

`router.post("/sendMessage/:id", sendMessage);`

In the above code, the :id parameter is used to pass the phone number ID. Here’s how the controller looks in controllers/messageTemplate.js.

```
exports.sendMessage = async (req, res) => {
  const { id, to, type,template } = req.body;
  if (!id || !to || !type || !template) {
    return res.status(400).json({
      error: "Required Fields: to, type, template and id",
    });
  }
  request.post(
    {
      url: `https://graph.facebook.com/v13.0/${req.params.id}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: process.env.MESSAGING_PRODUCT,
        to: to,
        type: type,
        template: template,
      }),
    },
    function (err, resp, body) {
      if (err) {
        console.log("Error!");
      } else {
        res.json(JSON.parse(body));
      }
    }
  );
};
```

You can now create a request object in Postman. Remember that you will pass one parameter — {{1}} — in the Header.


The Postman request body demonstrates the text-based template we created.


Note this code snippet from the above screenshot:
```
        "components": [
            {
                "type": "HEADER",
                "parameters": [
                    {
                        "type": "text",
                        "text": "Name"
                    }
                ]
            }
        ]
```

This snippet is used to pass the value to the parameter {{1}}. A successful response includes the message ID, as seen below.


Here’s what this message looks like to customers on WhatsApp:


Next, you will use a JSON request object for another template in which you need to pass a document in the HEADER as well as variables {{1}}, {{2}}, and {{3}} in the BODY.

First, look at the screenshot below:


Note that the below snippet passes the parameters for the HEADER:

                "parameters": [
                    {
                        "type": "DOCUMENT",
                        "document": {
                            "id":"984786545564592"
                        }
                    }
                ]
            },
            {
Then, the following code does the same for the BODY:
                "parameters": [
                    {
                        "type": "text",
                        "text": "Toronto"
                    },
                    {
                        "type": "text",
                        "text": "Dubai"
                    },
                    {
                        "type": "text",
                        "text": "2022-05-03"
                    }
                ]
            }
        ]
    }
}
The attached media could be a link or the uploaded media ID.


Finally, the image below shows how a successful output appears on WhatsApp.



Conclusion
With this tutorial, you have just started to explore the capabilities of the WhatsApp Business API for creating simple but powerful message templates. The ease and flexibility of the WhatsApp Business API can help any business improve their communication systems to help turn a customer into long-term business clients. Time to take advantage of the opportunity.