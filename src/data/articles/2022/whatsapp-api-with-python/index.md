---
category: 'article'
cover: './cover.jpg'
title: 'Sending Messages with WhatsApp in Your Python Applications'
description: 'This article describes how you can integrate the Cloud API, hosted by Meta, Meta’s integration of the WhatsApp Business Platform, into a Python application to enable sending and managing WhatsApp messages.'
date: '2022-10-24'
tags: ['business-messaging']
published: true
canonicalUrl: 'https://developers.facebook.com/blog/post/2022/10/24/sending-messages-with-whatsapp-in-your-python-applications/'
---

![cover](./cover.jpg)

*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2022/10/24/sending-messages-with-whatsapp-in-your-python-applications/).*

WhatsApp Business Platform enables businesses to communicate more closely with their audiences, offering tools that allow you to automate the sending, receiving, and handling of incoming messages. For example, automated messaging allows you to welcome new customers or notify them when they contact you outside business hours.

This article describes how you can integrate the [Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/), hosted by Meta, Meta's integration of the WhatsApp Business Platform, into a Python application to enable sending and managing WhatsApp messages.

Let's dive in and explore how to create a Python web app powered with WhatsApp messaging from scratch. If you'd like a preview of where we'll end up, you can [download the complete application code](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fwhatsapp-api-examples%2Ftree%2Fmain%2Fsend-messages-flight-app-python&h=AT0wUzEpdb2gTpl-r_hjQ9f_rICHwmoNhiIMTZYTAsEQW_5BSaf3d8VQp7chtXSOmRLGfQvF50Yb3eFYKpOVGhWZ_J54JKcQgB7BLIM6GG56rfdaRMxirOoJvZs5Z0KXEerit-keJqt861rvxgk7hVzD2SKk8Z1utX-yCB55QWI).

**Requirements**

To send and receive messages using a test phone number, follow the [Set up Developer Assets and Platform Access](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started#set-up-developer-assets) tutorial, ensuring that you complete the steps below:

Register for a free developer account at [Meta for Developers](https://developers.facebook.com/docs/development/register/).

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312329265_513446693692464_6113045937350384836_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=Urp0fjhBVf8AX-DLGue&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfBk7f6BM7BqVgeLZiR_JkzI6tOpO85ELJlNJpfdhk5-tw&oe=636960B6)

Enable two-factor authentication for your account:

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312539058_634382518350033_3288662865543697900_n.png?_nc_cat=106&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=r8akMXNRsZYAX8XLpap&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfC89ThMtNZMeltt34iJUYqq2GHYyhdjFc1f7djip43gLg&oe=63698507)

[Create a Meta App](https://developers.facebook.com/apps/). The App Id and the App Secret will be used later in this article.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312621137_638529411138324_7626923204876657210_n.png?_nc_cat=110&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=JafmxPzHGeUAX8FAQvF&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfD2GxVd1jsSDdBlLqLHeJUg1KLZbOSav_RPO53oX0s3pQ&oe=636999E3)

Connect your Meta App with the WhatsApp product.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312449284_651885606337574_1970093564759688957_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=SFzJ6U-X5OIAX8zDwc7&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDPsoPzYuV32dfIElbzfmEg7qa88uNsSN6DeG5VGSvKNA&oe=636AA9D6)

Associate your app with a Business Manager.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312616143_1149456239334132_3210807206494574045_n.png?_nc_cat=104&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=W79Y7RqBFrsAX_mKdx8&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfBKfkVVWxEfFfn6Ao-wASxYKnwm1k7FWI-K8HjpdZ5bHg&oe=6369993C)

On the App Dashboard, open the WhatsApp > Get Started menu and configure a recipient phone number. Your app will need it as a recipient for the WhatsApp messages. This number will be used later in this article.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312528982_517380066526773_3333995588675862215_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=b7ojZaU22GQAX86E51C&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfAuQ5dPtMdjZEobIXUm0lWQV2PeHwT36s8UYi3n-aCDMg&oe=636A7BC2)

Create a [system user](https://business.facebook.com/settings/system-users/) for your Business Account.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/309450927_1075430136332729_3657664152348764273_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=kL_xkCi6HRoAX-v3SDp&_nc_oc=AQnY3tNr4vCOdqOhUAaGYNfr16dI80I23RJO91AjCA-ks9mtDPHVXVzjhqWUwnNGbdKuIB3ikE1cJytl18DYsh-R&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfAckDJcogFtEutF3Enoh-A3q-iilcZtqcnVyD5s8fm7Sg&oe=636ABC89)

On the System Users page, generate a new token for your new system user, assigning your WhatsApp app and all the available permissions. This token will be used later in this article.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312614925_417836757174667_3266524168889475948_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=7fm5dFyr_s0AX_vMUV3&_nc_oc=AQmkYimNbpJbJkaVH8g6WNwLUjgZ4S2SlAOg57Dki4Hww0dHAZF9lABHAmB82k7meqFAUzczNeziYoQlyiChqKAp&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDpZ66b0wAzRkKg8paFxv1ES97mOhHyCA_n40z2AxhQWA&oe=636A2C40)

On the System Users page, configure the assets to your System User, assigning your WhatsApp app with full control. Don't forget to click the Save Changes button.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312636397_1777001352632939_4127137800539057105_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=7WDrkjmc55cAX-Xk4Cp&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfAaYWyZwFqhx4LSJXHr8AfJS2P72RYBQAbpE939Hjn_KQ&oe=6369F840)

Last but not least, [download and install Python](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.python.org%2Fdownloads%2F&h=AT1b828Wp2Z_pjNy7v_BFDDp47FCXBL5pAql-l2Y90MnBEVwsdzuNY6KGEW2Gj4Vhl8h7h2YUwmwqsC8izkidLCf12KHKKbB-4m4zxXd_fIYf8i0N-FwKxyYZteMzlVPKPjyMUXNX92EOujTyE-I1b-KD5TM_MSF5Adkbd_Dc4g) if you haven't already.

**The App We're Building**

Our small sample application will work as an online flight reservation service. The application will use the API to provide the user with an engaging and more personalized experience than what email communication offers. When the users log in, they're greeted by a WhatsApp message. Then, when they buy a flight ticket, they receive a message confirming the purchase.

**Creating a Minimal App with Python and Flask**

This section will help you get a new Python project up and running. We'll use Jinja, a lightweight template engine, and Flask, a micro web framework.

First, open a terminal and create a folder for your project. Then execute the following command:

`python3 -m venv venv`

This command will create a virtual environment for your Python project.

Then, execute the following:

   $ mkdir myproject 
   $ cd myproject
   $ python3 -m venv venv

Next, activate the virtual environment.

`$ . venv/bin/activate`

Now, install Flask:

`pip install flask[async]`

Create an app.py file at the project root with this content:

    from flask import Flask

    app = Flask(__name__)

    @app.route("/")
    def hello_world():
    return "<p>Hello, World!</p>"


Run the app:

`$ flask run`

Then, you'll see the app running locally at port 5000:


     * Serving Flask app 'app.py' (lazy loading)
     * Environment: production
       WARNING: This is a development server. Do not use it in a production deployment.
       Use a production WSGI server instead.
     * Debug mode: off
     * Running on http://127.0.0.1:5000 (Press CTRL+C to quit)

Now, visit [http://127.0.0.1:5000/](https://l.facebook.com/l.php?u=http%3A%2F%2F127.0.0.1%3A5000%2F&h=AT0WDu32MTAjrJA4gdDBTlzeNfBkJYEGin_DtKlp7_pLkTkT-1USWvIvKLzAi8kiuc9alO1sD7_x1TDxnNioYjt5l8illBsuw6wjL4F2pa2CmloaBkdPFlS2xli2OLICG-hIa_6pVslkkYai4tf9OT08WR6hXVsE2I3HSpgiFqE) and you will see the homepage of your Python + Flask starter application:

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312569619_1469480926868321_679102252135716540_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=Z5yYTdRH1IcAX-FeKIX&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfBHOVT4KCuEpqW3SsEHHX24FxRsfdStiLHhg27FuIjX-A&oe=6369A966)

**Creating the Sample Login Page**

To start your Flight Ticket application, you'll create a sample login form that will work as your homepage. You'll need to call the render_template function to render a view from a separate HTML file. Open the app.py file and modify it to import the render_template function:

`from flask import  Flask, render_template`

Then replace the hello_world with the index function as follows:

    def index():
    return render_template('index.html', name=__name__)

Create a new folder named templates and create a new file named index.html:


    \templates
            |--- index.html


Next, open the index.html file and add the HTML content below. Here, you're creating an example login that comes with a placeholder login and password. This way, you don't need to provide those to use the application.

For our web app front-end, we're using [Bootstrap](https://l.facebook.com/l.php?u=https%3A%2F%2Fgetbootstrap.com%2F&h=AT1z2SUAgey-HLxmcBZC1qXJIfKY1D348r0fayYD409gztr32Zw2GHeqOHD7KNGn9XL413ExVVfeES90Wdo4QM82a5wcBAIRxKK4IB035K-zFQgtxe2YRA4CVqdnPhoTgqQFyrPiVx65Pzi1lUWZ3E-KCwk3BsMJzp8jXPts9-0). This popular library will help build a consistent, lightweight UI that comes with responsive styling, allowing us to easily run our app across devices without worrying about CSS rules.
Then, run the app again to see the new login page:

`> flask run`

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312530709_454392320124792_2848377627871443773_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=kXpEKfiNEt8AX9PMeCt&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfA6Vfu9EU781Ssnlv4Ok_P45pyDo_CQEdAfpq-dwqhvvA&oe=63695E77)

**Sending Text Messages with Python and WhatsApp Business**

Your Python application will need to use specific data from your Meta developer account created in the beginning of this article. For the convenience of having all of your configuration in one place, and not scattered throughout code during development, place it in a file.

Create a config.json file at the project root with the following settings, replacing any placeholders with details from your WhatsApp Business account dashboard:

    {
	"APP_ID": "<<YOUR-WHATSAPP-BUSINESS-APP_ID>>",
	"APP_SECRET": "<<YOUR-WHATSAPP-BUSINESS-APP_SECRET>>",
	"RECIPIENT_WAID": "<<YOUR-RECIPIENT-TEST-PHONE-NUMBER>>",
	"VERSION": "v13.0",
	"PHONE_NUMBER_ID": "<<YOUR-WHATSAPP-BUSINESS-PHONE-NUMBER-ID>>",
	"ACCESS_TOKEN": "<<YOUR-SYSTEM-USER-ACCESS-TOKEN>>"
    }


Your login form action tells the app to POST to the /welcome route. So, you'll need a new router to:

* Handle the "welcome" HTTP POST request.
* Obtain the configuration needed for the welcome message.
* Send a welcome message via the API.
* Redirect the app to the homepage once the message is sent. request.


Now, install aiohttp to enable your app to perform asynchronous HTTP requests:

`pip install aiohttp[speedups]`


The above code makes an HTTP POST request to the /messages endpoint on the Meta Graph API at graph.facebook.com, passing:

* The Cloud API version you're working with
* The test phone number that will receive the message (you have already configured this)
* The access token you generated for your System User

Also, note that the get_text_message_input function returns a specific data structure required for sending basic text messages.

Finally, run the app again:

`> flask run`

Then click the Login button. You'll see the WhatsApp notification popping up on your screen:

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312518669_2458920370916340_7004578034220547741_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=LhCweacGUwwAX8MYK6Z&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDPytaPfYIf7CvYQqV1k65I7HcuECzkalQAGqfXKujIhA&oe=636A9064)

Click that notification to open the WhatsApp app and see the basic text message sent by your Python application:

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312559356_844133369945441_6313326797548818294_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=Jpvyd2SnbgwAX93YFHi&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDEIwC-rZjk2UOfhukS34thAejhyzYQ6zew0vFtoH9dOA&oe=636A2DD7)

So far, you've been able to send simple messages using WhatsApp. Next, you will use templates to send more complex messages.

**Creating the Flight Catalog Page**

First, you'll create a catalog of available flights and their details so that online customers can buy tickets. This data will be stored in a separate file. Create a new \flights.py file.

You now need a new route for users to access the flights catalog page. Open the app.py file and import the get_flight function:

`from flights import get_flights`

Modify the welcome function to redirect to the catalog page instead of the index page:

`return flask.redirect(flask.url_for('catalog'))`

Run the app again and click the Login button. This will send your WhatsApp number a welcome message. Plus, it will redirect you to the /catalog view:

`> flask run`

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312530996_422040903433290_1407476417702547907_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=ICEgLbSUMMUAX9ePIlA&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfCXbj6aG2Zh1mzoLsQD_p1t1Ej3F5s0CcIynHnQAWC_Cg&oe=636AC54B)

Note that there is a button to buy the ticket for each flight displayed on the screen above. Next, you will configure the application to process the ticket purchase.

**Sending Templated Messages with Python and WhatsApp Business**

A message template is required to start a [business-initiated conversation](https://developers.facebook.com/docs/whatsapp/conversation-types). These conversations can be customer care messages or appointment reminders, payment or shipping updates, alerts, and more.

Open the app.py file and add an import of the get_templated_message_input and request functions:

    from flask import Flask, render_template, request
    from message_helper import get_templated_message_input, get_text_message_input, send_message

Then, add a new function for the /buy-ticket route with the following contents:

    @app.route("/buy-ticket", methods=['POST'])
    async def buy_ticket():
        flight_id = int(request.form.get("id"))
        flights = get_flights()
        flight = next(filter(lambda f: f['flight_id'] == flight_id, flights), None)
        data = get_templated_message_input(app.config['RECIPIENT_WAID'], flight)
        await send_message(data)
        return flask.redirect(flask.url_for('catalog'))

Next, open the message_helper.py file and include the get_templated_message_input function:

    def get_templated_message_input(recipient, flight):
    return json.dumps({
    "messaging_product": "whatsapp",
    "to": recipient,
    "type": "template",
    "template": {
      "name": "sample_flight_confirmation",
      "language": {
        "code": "en_US"
      },
      "components": [
        {
          "type": "header",
          "parameters": [
            {
              "type": "document",
              "document": {
                "filename": "FlightConfirmation.pdf",
                "link": flight['document']
              }
            }
          ]
        },
        {
          "type": "body",
          "parameters": [
            {
              "type": "text",
              "text": flight['origin']
            },
            {
              "type": "text",
              "text": flight['destination']
            },
            {
              "type": "text",
              "text": flight['time']
            }
          ]
        }
      ]
    }
  })



Note that we are using the `sample_flight_confirmation` template above, where we provided the flight document PDF file, the flight origin, destination, and the date/time. You can experiment with other available templates or create new ones by visiting the [Message Templates](https://www.facebook.com/business/help/722393685250070) page.

Finally, run the app again and click one of the Buy buttons. This will cause your app to send a template message to your test phone number via WhatsApp:

`> flask run`

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312597172_502049921585452_2749606302138022783_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=-xhj1UG1xfAAX8sRJBn&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfCuIqMsxc3kjW5Cssm6xtBcm7fJycMIUoUj7pNJuMU2pQ&oe=636A5768)

Now, open your WhatsApp app to see the template message.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312503691_633432554970272_3159454219869186500_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=a8SJ-X6TCEIAX8gJk3n&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfCm-mBRQyjIM9NlicPfSTljWwLEv-w4UAr2gzkVX4yyrA&oe=636A543B)

That's it!

As you can see, sending messages with Python code can be straightforward. However, note the following tips and best practices for integrating WhatsApp into applications:

* Even if you're automating your app messages, make sure that communication with customers doesn't feel robotic. People expect a more personal experience, so ensure that you're sending more personalized messages.
* Explore a more relaxed and informal tone. However, avoid syntax or grammar mistakes.
*  Keep your text clear and to the point.
*  When using templates, provide rich context information by using links to documents, videos, or images like those used above to depict the flights related to the tickets.

**Conclusion**

In this article, you learned how to add messaging capability to a Python app by integrating it with a WhatsApp Business account.

After creating a simple Python application from scratch, you added a sample login page and configured the application to send basic welcome messages to users via the Cloud API. Finally, you added a catalog page and configured it to send template messages with flight confirmation details.

And this is only the tip of the iceberg. Want to learn how to configure [WebHooks](https://developers.facebook.com/docs/whatsapp/webhooks) in your application and configure notifications about sending and receiving customer messages and business account information? Check out [WhatsApp Business Platform documentation](https://developers.facebook.com/docs/whatsapp/cloud-api) to discover this and much more.
