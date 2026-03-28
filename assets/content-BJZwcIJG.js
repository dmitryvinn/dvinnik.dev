const l=[{title:"Lightning Fast Testing for Salesforce with Applitools and TestZeus",description:"This post looks at how TestZeus, a test automation library for Salesforce apps, and Applitools Visual AI can provide us with an optimized way to automate our customer scenarios by writing less code.",date:"2023-02-23",tags:["testing"],slug:"/articles/2023/lightning-fast-testing-for-salesforce-with-applitools-and-testzeus/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2023_lightning-fast-testing-for-salesforce-with-applitools-and-testzeus_67f2f8ae.jpg",canonicalUrl:"https://applitools.com/blog/lightning-fast-testing-for-salesforce-with-applitools-and-testzeus/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://applitools.com/blog/lightning-fast-testing-for-salesforce-with-applitools-and-testzeus/).*

Salesforce is not just one of the most popular CRM platforms; it’s an ecosystem that combines almost anything that a business needs under one roof. Gone are the days when entrepreneurs were willing to use hundreds of different tools through separate services. Nowadays, companies want everything they need in one product, under one domain – think messenger, documentation, product site, analytics, and more. That’s what Salesforce provides to its customers – a single place where businesses can conduct their work.

Since its founding in 1999, Salesforce has undergone many changes. While it’s natural for a product to evolve to meet its customers’ demands, in 2018, Salesforce introduced its Lightning Platform, which was a complete overhaul of the entire user experience at Salesforce.

With a highly dynamic platform like Salesforce, developers who create apps and integrations on Salesforce need a reliable way to test their applications. Test automation and, more specifically, visual testing ensures a scalable way of validating core functionality that your customers rely on.

**Why Testing Matters**

As with any product, we want to be confident that our application doesn’t break overnight. We need to ensure that the behavior that our customers are used to stays the same unless we intentionally want to introduce a change. This reason is why end-to-end testing is vital since it covers the core user workflows like logging in, creating an account, buying an item, and many other use cases.

While other levels of testing, like unit or integration tests, are fantastic for ensuring a short feedback loop for our developers, end-to-end tests give us the highest level of confidence that the overall product continues to work well for our customers.

Suppose we are working within the Salesforce ecosystem. In that case, we need a reliable way to test our Salesforce product to ensure that our Salesforce integration or a custom app is fully functional. 

This post looks at how TestZeus, a test automation library for Salesforce apps, and Applitools Visual AI can provide us with an optimized, efficient, and deterministic way to automate our customer scenarios by writing less code yet increasing test coverage.

**Introducing TestZeus for More Effective Test Automation for Salesforce**

TestZeus is an open-source UI automation framework that provides an efficient way to find elements on Salesforce apps. It relies on what’s called AutoLocators strategy that uses the Salesforce Developer API to find UI elements on the webpage. 

In order for us to properly demonstrate how TestZeus works, we first need to set up our Salesforce environment.

**Setting up Salesforce Environment**

Salesforce is an entire ecosystem created around its Customer Relationship Management (CRM) system. And as fun as testing in production could be, we should make a development environment with Salesforce.

Luckily, Salesforce has a highly engaging community of developers and many learning resources. One of the community members has covered in great detail how to setup what’s called a Salesforce Developer Edition instance. In this article, we will only focus on the core parts of the process (for more information, you can read the community forum).

After you navigate to the signup page, you will need to fill out some basic information about your account.

Immediately after you sign up, you will receive a confirmation email that will look something like this.

Apart from pressing “Verify Account” button, you will need to make sure to capture your instance’s URL (HOME_URL as we will call it in the test properties) and username (USERNAME in the test properties):

When you first attempt to log into the Salesforce instance, it will prompt you to create a password which we will later use as the PASSWORD property in the tests.

**Using Salesforce Developer API**

TestZeus requires us to use the Salesforce Developers API. For this article, we will need a security token for your account and a consumer key/secret combination.

Without diving into too many details, a security token is another way to authenticate the Salesforce Developer API. At the same time, a consumer key/secret combination lets Salesforce control the scope of your API calls.

**Getting a security token**

The security token is one of the components required for API authentication. To get it for the first time, you need to “Reset Security Token” through the Salesforce UI. This video goes through details on how to do it step-by-step. Ultimately, you will receive an email containing a security token that we will use as SECURITY_TOKEN properties in our tests.

**Acquiring a consumer key/secret combination**

The last piece of information we need to authenticate your tests successfully is what’s called a Consumer Key and Secret. We will need to create a Connected app that will, in turn, provide the authentication details. You can think of this step as a way to control the permission scope of the API usage.
This video walks through the steps to create the Connected app and retrieve its authentication details. In short, we need first need to create a New Connected App.

Then fill in all the required fields, enable OAuth settings and choose the necessary scope (as shown in the video):
Following the app’s creation, you must click “Manage Consumer Details” to retrieve the authentication information:
This new window will show us the exact data we need: a Consumer Key and a Consumer Secret

In our test, we will later use this information as CONSUMER_KEY and CONSUMER_SECRET properties.

**Functional Testing with TestZeus**

Now with all the necessary information and demo environment set up, we can proceed with writing our tests. For this article, we put together a small project that you can see here. We will first walk through this code to show how to use a TestZeus framework for testing a Salesforce application and, later, add a visual testing component using Applitools.

**Preparing Test Scenario**

For our article, we will do a primary case of validating UI for a test account we create beforehand.

In your Salesforce instance, navigate to Accounts and click “New account”.

Then we will create an Account named “Test Account,” and our test scenario is ready to be used.

**Setting Up TestZeus**

First, we need to clone our demo project:

\`git clone git@github.com:dmitryvinn/applitools-testzeus-demo.git\`

Our demo project uses Java programming language and Maven as its build system. Hence, we encourage you to use an IDE like Intellij IDEA to simplify the development experience.

After you open the project with your IDE of choice, you must use Maven to build the project and download all necessary dependencies. One of the critical dependencies we are relying on for this part of the article is TestZeus dependency:

\`\`\`
<dependency>
            <groupId>com.testzeus</groupId>
            <artifactId>Test_Zeus</artifactId>
            <version>1.0.2</version>
</dependency>
\`\`\`
The next step is to fill out all the required properties we will use in our tests in the config.properties file. So far, we have covered all but the APPLITOOL_KEY property, which we will discuss later.

Writing Our First TestZeus Test
In this article, we explore a simple use case of validating an account we created beforehand.

For brevity purposes, we will skip going into the general Selenium Webdriver code and focus only on specific details around TestZeus.

First, we need to authenticate our test, so we can use the Salesforce Developer API to work with data objects, retrieve specific selectors, and more.

In BaseTest.java, we have the following method we invoke in our setup() to handle authentication:

\`\`\`
private void authenticateUser() {
    HTTPClientWrapper.SFLogin_API(HOME_URL, TOKEN_GRANT_URL, CONSUMER_KEY, CONSUMER_SECRET, USERNAME, PASSWORD + SECURITY_TOKEN);
}
\`\`\`

Then, we need to create a new test named AccountsTest.java where we will have our #findTestAccount() test case.

We will begin our test scenario by Arranging it, or in other words, by setting up our test case.

We will first initiate an SFPageBase with the current webdriver instance and then navigate to the home URL:

\`\`\`
final SFPageBase salesforcePage = new SFPageBase(driver);

salesforcePage.openHomepage(HOME_URL);
salesforcePage.maximize();
\`\`\`

Now, we will proceed to log into our demo environment:

\`\`\`
driver.findElement(By.id("username")).sendKeys(USERNAME);
driver.findElement(By.id("password")).sendKeys(PASSWORD);

final WebElement loginButton = driver.findElement(By.id("Login"));
salesforcePage.safeClick(loginButton);
\`\`\`

In the next step, we will transition into the Act portion of the test case, starting with test-specific actions.

We will use TestZeus’ SFBasePage to navigate to the Accounts tab and open our “Test Account”:

\`\`\`
salesforcePage.appLauncher("Account");

final WebElement testAccountItem = driver.findElement(By.xpath(String.format("//a[@title='%s']", TEST_ACCOUNT_NAME)));
 salesforcePage.safeClick(testAccountItem);
\`\`\`
Lastly, in the Assert stage of the test case, we will validate one of the fields shown on the UI:

\`driver.findElement(By.xpath("//p[text()='Account Owner']"));\`

As we can see, TestZeus helps simplify waiting for UI elements, navigation, and working with Salesforce Objects.

Now with this highly efficient way of locating UI elements using TestZeus, we can take our test automation to the next level with Applitools and visual testing.

Taking Next Steps: Functional Testing for Salesforce apps with Applitools and TestZeus
Functional testing is a type of testing that focuses on the core functionalities of an application while following predetermined steps. In other words, it’s a way to evaluate a scenario with two potential outcomes, failure or success, using the same input.

While there are many functional testing levels like unit or integration testing, end-to-end tests give us the highest confidence level in customer use cases. It’s also one of the most expensive types of testing since it takes a lot of effort to write assertions for every single element of the app and then keep maintaining this workflow. But not with Applitools and Visual AI analysis.

With the Visual AI in Applitools Eyes, rather than writing assertions focused on just one object, Applitools lets us capture the entire web page or mobile app screen, then send it to the Applitools Visual AI for analysis.

**Simplifying Functional Testing with Applitools**

This visual testing allows us to see our app from our customers’ points of view. And that’s where the Applitools Visual AI comes in! This AI-based visual testing tool can enhance the existing end-to-end test coverage to ensure our app’s user experience conforms to the expected design.

Using AI algorithms, Applitools allows developers, testers, and product/business teams to effectively compare visual elements, with corresponding baselines, across various screens to find visible defects in your test environments. This way, you can prevent functional and visual defects from escaping to production and affecting your customers negatively.

Applitools has integrations with numerous testing platforms like Cypress, WebdriverIO, Selenium, and many others. This article will showcase Applitools with TestZeus to add visual test coverage to our Salesforce app.

**Setting up Applitools**

Applitools has fantastic documentation on how to get started with the project. For this article, we will first need to register with Applitools and retrieve an APPLITOOLS_API_KEY for our config.properties.

We will also add the following dependency to our Maven build:

\`\`\`
      <dependency>
            <groupId>com.applitools</groupId>
            <artifactId>eyes-selenium-java5</artifactId>
            <version>5.39.0</version>
        </dependency>
\`\`\`
Now, we are all set to write our test cases with Applitools.

Visual Testing with Applitools and TestZeus
By using this great starter project, we can quickly enhance our existing test suite with visual test automation using Applitools.

First, we will create a new test class named AccountsApplitoolsTest.java. Then, we will need to add some additional setup code to enable Applitools and its Ultrafast Grid, so we can scale our tests in the future.

\`\`\`
    @BeforeAll
    public static void setUpConfigAndRunner() {
        runner = new VisualGridRunner(new RunnerOptions().testConcurrency(1));

        config = new Configuration();
        config.setApiKey(APPLITOOLS_API_KEY);

        final BatchInfo batch = new BatchInfo("Salesforce Accounts Page Tests with TestZeus");
        config.setBatch(batch);

        config.addBrowser(1024, 768, BrowserType.CHROME);
    }
\`\`\`

In the above code snippet, we set our tests to be run one at a time (the limit for free Applitools accounts), specified the Applitools API Key, and chose Chrome as our test browser.

The next step is to “open the eyes” which is an API terminology for starting visual testing for our test suite:

\`\`\`
    @BeforeEach
    public void openBrowserAndEyes(TestInfo testInfo) {
        eyes = new Eyes(runner);
        eyes.setConfiguration(config);

        eyes.open(
                driver,
                "TestZeus Demo",
                testInfo.getDisplayName());
    }
\`\`\`

Now, similarly to the previous example with TestZeus, we will have a new test named findTestAccount(). One of the best things about using Applitools is that we don’t have to make any additional changes to our test scenario! So everything from Arrange to Act steps will remain the same:

\`\`\`
    @Test
    public void findTestAccount() throws Exception {

        // Arrange
        final SFPageBase salesforcePage = new SFPageBase(driver);

        salesforcePage.openHomepage(HOME_URL);
        salesforcePage.maximize();

        driver.findElement(By.id("username")).sendKeys(USERNAME);
        driver.findElement(By.id("password")).sendKeys(PASSWORD);

        final WebElement loginButton = driver.findElement(By.id("Login"));
        salesforcePage.safeClick(loginButton);

        // Act
        salesforcePage.appLauncher("Account");

        final WebElement testAccountItem = driver.findElement(By.xpath(String.format("//a[@title='%s']", TEST_ACCOUNT_NAME)));
        salesforcePage.safeClick(testAccountItem);
\`\`\`
The only change we will need to make is in the Assert part of the test case. Here, we will have code to validate that the page loaded correctly and that its layout matches between test runs. We could also validate a snapshot of the entire page with Applitools, but Salesforce apps are known to have varying load times. So the layout match level helps to avoid false positives:

\`eyes.check(Target.window().fully().withName("Test Account").layout());\`

We are almost done! To make sure that our Applitools tests are closed correctly after their run, we will need to add this @AfterEach method:

\`\`\`
public void cleanUpTest() {
        eyes.closeAsync();
}
\`\`\`

With this, our first test with Applitools and TestZeus for the Salesforce app is complete. Let’s visit our Applitools Dashboard to review the results:

**Wrapping Up**

Salesforce is an ever changing ecosystem of apps and products under one platform. That’s why tools like TestZeus are beneficial in simplifying both the creation and, more critically, maintenance of our tests.

Combined with testing automation platforms like Applitools, we can take our testing infrastructure to the next level by focusing on scale, cross-platform support, and a short feedback loop.`},{title:"Meta Open Source: 2022 Year in Review",description:"This post explores highlights from Meta Open Source and how Meta helped to build open source community in 2022.",date:"2023-01-17",tags:["open-source"],slug:"/articles/2023/open-source-year-in-review-2022/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2023_open-source-year-in-review-2022_304b4d25.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2023/01/17/open-source-2022-year-in-review/",body:`*Originally posted [here](https://developers.facebook.com/blog/post/2023/01/17/open-source-2022-year-in-review/).*

This past year was one of renewed human connection and community for many people around the world. This theme carried over to open source work at Meta, as contributors, users and organizations congregated to further the impact of open source.

Projects made public by Meta address developer needs and challenges—from powering next-generation AI to building innovative, user-friendly web apps and experiences—while the open source community provides a conduit for sharing technologies and building on them collaboratively.

This post explores highlights from Meta Open Source and how Meta helped to build open source community in 2022. It also covers updates on tools and code that Meta and its engineers have shared, including major developments for PyTorch, the release of React 18, the introduction of Sapling’s source control client and more.

**Moving to foundations: Expanding openness, collaboration and reach**

Diverse perspectives and contributions strengthen open source, and Meta actively seeks opportunities where working with existing foundations can achieve shared goals. A number of projects from Meta have moved to a foundation this past year, in order to further democratize the open source resources they offer and expand their governance.

In September, the PyTorch framework for AI joined the Linux Foundation, through the formation of the new PyTorch Foundation. The board, which includes industry leaders, intends to expand over time and will serve as stewards for outreach efforts as well as business and product marketing of the technology.

The graphic shows Meta has 1,034 active non-archived open source projects as of 2022.
Jest began moving to the OpenJS Foundation this past year. The open source project is one of the most widely used JavaScript testing frameworks. Goals for the foundation include making the project more accessible to new users and developing new features.

Meta is committed to further driving innovation in open source projects it donates to foundations. In 2022, Meta deepened its collaboration with the Presto Foundation, upgrading to the foundation’s highest-tier membership level. Meta also sponsored PrestoCon Day and PrestoCon, the foundation’s first in-person conference.

**Driving impact through open source outreach**

Members of the Meta Open Source team gathered at the All Things Open conference for a team photo in October 2022.
Caption: The Meta Developer Advocates and additional members of the Meta Open Source team at All Things Open this past October.

Meta Developer Advocates and Engineers sought out impactful opportunities for outreach throughout the year, and they learned from experts and organizations across the community while sharing knowledge of open source projects launched at Meta.

Developer Advocates and members of the Open Source team at Meta attended the 10th anniversary of All Things Open to represent Meta Open Source. Prior to the event, Engineering Director Killian Murphy shared thoughts on how Meta is working to break down barriers for open source contributors and striving to make open source available to all. Meta is committed to setting a high standard for welcoming all who wish to use and contribute to the technologies it has open-sourced.

The graphic reads "At a time when the open source community is larger than ever, Meta is optimistic about the potential for open source to become more inclusive and, in turn, more empowering." Killian Murphy, Engineering Director
The Meta Open Source team also crewed a booth at All Things Open to broaden awareness of projects from Meta and meet developers who use those technologies across research and industry. Developer Advocates and Engineers also spoke at the event.

Blog posts from the Meta Linux Kernel team highlighted their ongoing research and development. The posts included how to join the Linux community. 11 members of the broader Meta Kernel team presented talks at the 2022 Linux Plumbers Conference. You can find the complete list of talks on the event website. The team also launched a Meet the Developers series featuring several Meta Engineers who presented at the conference, which covered topics such as an overview of the BPF networking hooks and user experience in Meta, kernel live patching at scale and many others.

The graphic shows there were 252 new open source projects and repositories published by Meta in 2022.
The Meta Linux Kernel team supports the kernel's direction in ways that improve its use at Meta and increase the health of the broader community. The team works closely with the upstream Linux kernel community and ensures projects are designed for inclusion upstream and land upstream kernel-first.

On the Meta Open Source blog, the Hasher-Matcher-Actioner Contributor’s Story highlighted the work of MLH Fellowship Recipients Franklin Phan and Samyak Mehta, and Meta continued its support of the fellowship in partnership with GitHub and Major League Hacking.

The Meta Contributor’s Story series shared successes and challenges of contributing to open source along with best practices for getting involved in the community.

**Building momentum in the open source community for VR/AR**

The metaverse aspires to be a place where people can gather and interact with one another in new, innovative ways. To create a metaverse that is successful for all, it needs to be built upon a foundation of strong community while incorporating diverse ideas.

Open source communities, with their inherent “build together” mentality, are a natural starting point to help steer important conversations that will shape the metaverse, and Developer Advocates from Meta shared in the conversation. Navyata Bawa continued the “Fostering Inclusivity in VR” series at the Global Women in Tech Network Conference in June, and she explored how VR applications can be built with accessibility and inclusivity as work in VR/AR continues to grow.

In the Stack Overflow Podcast episode, “Here’s what it’s like to develop VR at Meta,” Developer Advocate Manager Cami Williams shared how Reality Labs can learn from—and build a bridge to—the React community, along with some of the tools and resources to get started developing for VR.

Graphic reads "Build diversity from within. Not just in the users and playtesters, but also among the developers. Only then will we be able to design applications that accurately represent and accommodate for a large audience, by learning from these diverse lived experiences." Navyata Bawa, Developer Advocate, Reality Labs
As part of Meta’s commitment to expand community presence and provide tools for creating within the VR ecosystem, Quest showcase samples were released on GitHub. To help evangelize these tools, Bawa created the “Building Your Multiplayer VR Experience” series for the Oculus Platform SDK and Unity SharedSpaces sample, as well as the tutorial “Building Intuitive Interactions for VR” for the Interaction SDK andFirst Hand samples.

The “Summer of Open Source: Moving Virtual Reality Forward” blog post featured some of the latest innovations in the space from Meta and highlighted an interview with Software Engineer Eric Le Saux on The Diff episode 14. Check out the AR & VR playlist for more recent conversations with Meta developers, tutorials and resources in this space.

**Advances in AI/ML**

2022 was a big year for PyTorch and new models from Meta AI designed to empower everyone from researchers to creators. Here are some of the ways Meta advanced the training, optimization and deploying of AI models.

**PyTorch updates**

After moving to the PyTorch Foundation (under the Linux Foundation), PyTorch 2.0 was introduced at the PyTorch Conference, held in New Orleans in December. Numbers shared at the conference show how much growth PyTorch and its community saw in 2022 : 63 percent of AI research implementations chose to use PyTorch, while according to GitHub data, the number of GitHub repositories using PyTorch increased by 45 percent from the previous year.

PyTorch 2.0 brings years of research together to improve its compiler performance while upholding the PyTorch experience that users already know and love. Updates include one-line speedups with torch.compile, 100 percent backward compatibility, and an all-Python compiler.

**Meta AI models hit new milestones**

Model training and optimization frameworks help create AI models that can take on real-world tasks in complementary ways to people’s skills. This reciprocity is evidenced in language translation, where AI models can learn hundreds of languages, even those spoken by only a few people. In 2022, Meta AI introduced the No Language Left Behind AI model that translates 200 different languages with state-of-the-art results, along with an evaluation dataset and respective open source code. These open source efforts can help improve models to translate critical documents and preserve low-resource languages.

The image shows that there were 186,210 commits made to public Meta repositories in 2022. 159,723 were internal, while 26,487 were external.
Meta open-sourced CICERO, the first AI agent to achieve human-level performance in the complex natural language strategy game Diplomacy.* The integration of a language model with planning and reinforcement learning algorithms gives CICERO the ability to reason and strategize with regard to players’ motivations, then use language to reach agreements to achieve shared objectives, form alliances, and coordinate plans. There were many other moments in AI and open source that are not covered here, and more AI-related stories can be found on the Meta AI Blog.

**React 18 and other updates in web/mobile**

Beyond the news of Jest beginning its move to the OpenJS Foundation, Jest 29 was released in August. The project surpassed 40,000 stars on GitHub in the second half of this year. Another key moment in web and mobile was the launch of React 18, with support from the public React 18 Working Group. This included updates for concurrency rendering, with additional features and supporting APIs. Check out the efforts to update the React Docs Beta alongside the release, including Effects documentation and Quick Start.

In September, Meta’s React Technologies teams joined core contributors and library maintainers for the React Native Core Contributor Summit. Discussions at the summit explored the current and future ecosystems of React Native and Metro, and attendees established active initiatives to improve the React Native ecosystem.

The image shows that there were 7,353 total contributors to Meta open source projects in 2022. There were 3,727 internal and 3,626 external contributors.
Among other projects Meta open-sourced for web and mobile, Js-flipper is an NPM package that exposes a Flipper client to JavaScript apps and allows developers to easily create new Flipper plugins or reuse existing ones. Another project, MemLab, provides JavaScript memory testing that automates memory leak detection.

Finally, Meta developers shared insights into how they build with, and build for, open source web and mobile technologies. One blog post investigated a Hermes bug report—and how the report led the responding team to program an exploit that ran the 1993 version of Doom within Hermes. Another featured a new Chromium-based WebView, which provides a better experience for users of the Facebook in-app browser for Android.

**Developer tools: Source control, documentation tools and other advances**

Developers at Meta use open source tools built at the company to support its infrastructure. These tools are often tested and improved in day-to-day work at Meta, resulting in open source projects that meet unique challenges of scale and speed.

In 2022, the Sapling team introduced a new Git-compatible source control client. With usability and scale in mind, Sapling is a source control system that aims to share what developers at Meta have refined for over ten years, in order to inspire further work in this area and show developers a potential future for source control systems. August brought the release of Docusaurus 2.0, a performant static site generator, extending its use of React and its support of websites beyond documentation.

Graphic reads "In 2022, Meta Open Source gained additional 133,854 stars on GitHub, bringing the total number to 1,563,562 stargazers."
Additional updates to projects included a new deadlock detector for Android, added lazy imports in Cinder and a preview of the next-generation OpenStreetMap editor RapiD 2.0. Another project, Hermit, introduced a practical deterministic operating system that allows developers to solve problems like flaky tests and control for implicit inputs such as thread scheduling, random number generation and more.

One of the broader posts published shared how Meta developer tools work together as part of a developer's workflow, many of which are open source. This included projects like the Buck build system, SuperConsole, EdenFS (a file system closely integrated with Sapling), the Jest testing framework and other tools.

Discover additional articles and releases covering developer tools in 2022.

**Data: Updates on Velox, Presto, and RocksDB**

The open source C++ library, Velox, was announced in August 2022. Velox is an evolution in energy reduction and performance gains for data engines. The library uses native execution and is being integrated with many tools at Meta as a unified execution engine layer.

Velox is designed to greatly reduce code maintenance and has performance increases from 2x to 10x in various use cases. Learn about Velox’s growing community and its innovative refactoring of how big data engines and databases execute data queries in the paper “Velox: Meta’s Unified Execution Engine,” published at VLDB 2022.

In the last year alone, the Presto open source project on GitHub had 21 releases, gained just under 2,000 new stars, had 600 new forks and 152 new contributors. The Presto Foundation hosted its first in-person event, PrestoCon, at the Computer History Museum in Mountain View, CA, where Tim Meehan gave a keynote as the TSC Chair, and Philip Bell announced the direction of Presto for the coming year.

In December, the RocksDB team resumed their annual in-person meetup at Meta’s Headquarters in Menlo Park, bringing together Meta Engineers and external collaborators to discuss use cases, new innovations and aspirations for the project.

**Security and hardware**

Security and hardware play an important role in supporting the work of developers. From debugging tools to networking hardware, open source at Meta can help make sure that systems and code are robust, secure and reliable.

Earlier in the year, a contributor’s story shared work on Pysa, a Python static analysis tool under the Pyre-check project. The story highlighted how building healthy open source communities can directly impact the success of projects like Pysa, in this case resulting in increased security of code.

In hardware, Precision Time Protocol was deployed across Meta’s networks and data centers. The technology provides new levels of accuracy and precision for clock synchronization in distributed systems. In conjunction with the Open Compute Project, both the hardware and software designed to support the protocol were open-sourced to support industry adoption.

In 2022, Meta continued open sourcing work within products like WhatsApp and Messenger. Code Verify, open-sourced in March, is a browser extension that lets developers protect the integrity of code in WhatsApp Web and Messenger by visualizing if the code on a web page may have been tampered with or altered.

**Thank you to the open source community**

This post has covered just a few of over 1,000 Meta open source projects and their updates in 2022. To explore more of these open source projects, visit the Meta Open Source website and follow us on Facebook, Instagram, Twitter and LinkedIn. Special thanks goes out to the community of contributors, users, organizations and partners who collaborate with Meta on open source projects.

At Meta, we believe open source accelerates the pace of innovation in the world. By sharing our code, our stack and even our hardware designs, we're aiming to move the industry forward while giving other companies and individuals a chance to use our solutions to scale more quickly and build great products.

*This post was written in collaboration with Meta Developer Advocates Dmitry Vinnik, Suraj Subramanian and Cami Williams.*`},{title:"Adding WhatsApp to Your Java Projects",description:"This article describes how you can integrate the Cloud API, hosted by Meta, Meta’s integration of the WhatsApp Business Platform, into a Java application to enable sending and managing WhatsApp messages.",date:"2022-11-07",tags:["business-messaging"],slug:"/articles/2022/whatsapp-api-with-java/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2022_whatsapp-api-with-java_a8cdd198.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2022/11/07/adding-whatsapp-to-your-java-projects/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2022/11/07/adding-whatsapp-to-your-java-projects/).*

WhatsApp Business Platform is a messaging solution that supports businesses at scale. It provides you with tools to help automate responses to customer messages or showcase a catalog of available products.

With the [Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/), hosted by Meta, Meta's integration of the WhatsApp Business Platform, your apps can use WhatsApp to send and receive messages to create an engaging experience for your customers. The Cloud API also scales easily to meet temporary demand spikes as business volume expands.

This article demonstrates how to build a Java app to send a simple text-based message and then dives into using message templates for more detailed messages. The full project code is available on [GitHub](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fwhatsapp-api-examples%2Ftree%2Fmain%2Fsend-messages-ecommerce-app-java&h=AT2ZmvH94606BQyU9HwnFONESRvVf6mcvHUZ_zYmGq_-yMRsGijws4fMzkbUykVCJsZ7PRFXzgMvNgnOgzPAfsssFhQf3CaLyS5dussZsVgCTqRPDRJgDn0b0odvxE-4WiDspQpLBniV1S3N2W4MEwoEiRoAeKfUWge7ytY68bk).

**Getting Started**

The first step in this tutorial is to create a brand-new Java project in Visual Studio Code (VS Code) and add functionality to send messages via the API.

Make sure you do the following before you get started:

-   [Install VS Code](https://l.facebook.com/l.php?u=https%3A%2F%2Fcode.visualstudio.com%2F&h=AT1UgoudUX58eWdyqnPvG2aAxSFS-brGjNJrInARFCHOes7Kt1kfcEjO4-wIxQO6OsqLx_g2yIwjPO9nX8chw0KL1BDClgOyAp85ugDHjGahGj4qwiFLGTQclY15P18vHTrQWmsEMSF2THhzD8GxKCLFUDha2cL-ZM6JPbcNBGEAV9klRC5TPtIZ).

-   Install the [Java Coding Pack](https://l.facebook.com/l.php?u=https%3A%2F%2Fcode.visualstudio.com%2Fdocs%2Fjava%2Fjava-tutorial&h=AT34kl5_YLIOe2kFwlyEGvdWktwC4rUjrK7wHHsMpLTHC-IrMYw2EBt8KciEaBni4v6e13yIUwRVhR2wtrrPypKp34oUxFyUGzl5sw8lYB03lKoEfq-LT5eXm2V8a1Mc0Y3dfQ7b7x5lNClADq5K_k-JvXmMkh1jD6EwmxVKces) for VS Code.

-   Ensure you have [Java version 11](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.oracle.com%2Fjava%2Ftechnologies%2Fdownloads&h=AT0HwWiKagbkU6C32zkASHn36KvfkR1JK4OFQIU-KM7XEYA9MhlFMN78pViwSubumxD6UB7uCY7cA--Z60sbIbeuXbddKD1RcIMQQ0TaPwcliQCt_pnrL7Sml5Flbj1XvmBAZZws_hKrojjalnape1iunyPZTPchKK4NIzmUq4w) or greater installed.

-   Register as a developer at [Meta for Developers](https://developers.facebook.com/).

-   [Enable two-factor authentication](https://www.facebook.com/business/help/280940009201586) on your account.

-   Ensure your Meta account is linked to a [Meta Business account](https://www.facebook.com/business/learn/how-business-manager-works/guide).

Once complete, create an app on Meta for Developers. Start by visiting [Meta for Developers](https://developers.facebook.com/) and clicking My Apps. Then, click Create App and select Business as the app type.

Provide the requested details, including the app name and contact email address, and select your business account from the dropdown. Once the app is created, scroll down and click Set up from the WhatsApp card, as shown below:

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313402656_668561641287664_1648746768096124062_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=Yxy9sBIZi1QAX8Lzijs&_nc_oc=AQnHLvFV9sa7jH9IaG-8oY3mz8z6LQlBPRo963czGvOfFHTrlYV0UL1BqVjg8x3a8jAcO3c_AVjmOxQ3F2oxiTx1&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfAZ8vDkkF6yhsGpXlfUam_fH03l0TQdXPrfVOyCK2L_fg&oe=637622B8)

This will take you to the Getting started page, which contains all of the information you need for your Java app to start sending WhatsApp messages. Additionally --- and most importantly --- this page provides a temporary access token and the pre-populated cURL command that's necessary for sending your first test message.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313426201_825706398556138_7079902985241481480_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=eH_TFFd91uUAX9M63Dt&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfA9hnWtgLRkZut3NxjnIbUBYMqRqQkFwyu1wFrP6WnABA&oe=6376D264)

Now that your app is created in the Meta for Developers console, open VS Code and create your new Java application.

In VSCode, create a new Java project by opening the command palette (Cmd+P/Ctrl+Shift+P) and typing "Create Java Project."

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/314351207_526830615959850_838277651216113463_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=ay0A1Ia0eXMAX-Ywjwy&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfD9JkGw9O_t8O-Fj_VY1HHftMKoyctrz6mzUyDtJqqvFA&oe=63779EE3)

You have the option to choose your favorite build tools or select none. You won't need any for this tutorial, so you don't need to select any tools.

Then, follow the instructions to choose a location for the project and provide it with a name. This generates some boilerplate Java code with a main function that prints "Hello World!"

Now that you're set up and have all the necessary information, you're ready to modify the boilerplate Java code and send your first message.

**Sending an Example Message**

On the Getting started page in the Meta for Developers console, there's an example cURL request that provides details about which URL you need to call, the headers you should provide, and an example payload to include as the body.

You can translate this to Java code by using the built-in java.net packages that provide the functionality to create an HTTP client.

Next, build and send a request, then you can parse the response.

Let's break this down. Note that some parts of this code need to be replaced with your own details. These are marked with chevrons, like <YOUR PHONE NUMBER ID>. Make sure the number you're sending a message to [includes the country code and is formatted correctly](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/phone-numbers#formatting).

First, you're creating an HTTP request using a builder. You're supplying the builder with the URI and the two header properties.

Then, you're using the POST function, so the builder knows it's a POST request. This is also where you set the payload body. Here, you can copy and paste the body provided on the Getting started page --- just remember to escape the double quotation marks.

Next, you're creating a new HTTP client to send your request. The \`HttpResponse<String>\` object captures the response and provides functions to access things like the response status code and body.

You can run the Java app by right-clicking on the project in VS Code under the JAVA PROJECTS heading and clicking Run.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313440497_1729836650720925_5621719295650719430_n.png?_nc_cat=106&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=2hXMY0C6j8sAX_tplHw&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfD5fBT8ao-gDF5IC423SgApjMpuXncsR9_yqy0eqQxZYg&oe=637788A8)

If everything is configured correctly, a WhatsApp message similar to the one below should have been sent to the target phone number. Note that Meta's provided example template sets the message's content.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313443023_662059892246561_8632701818956486089_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=1huxWGRdhkoAX98DW4R&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDkodP0Nf1jUFG7plRYB11qXVo-fvxreCZ1B0xBXKYI5w&oe=63773A49)

Now that your example message works, you can send a simple text message without using a message template.

For this to work, you need to reply to the initial message that was sent using this template. The contents of the reply don't matter. Once that's finished, you can modify your POST request to provide a simple text message payload.

As you can see, the type property has now been changed to text. You also replace the template object with a text object specifying the desired message.

Now, rerun the application. You'll see a second WhatsApp text message arrive:

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313435932_796428735047373_3228724126827474603_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=Y5w63MHV-ZUAX9G9U1Y&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDktNDWP4m8EOSB9sI_TcqDpeRLHfLcy0IJ1n96m-pHbw&oe=6376BFDC)

You can now successfully send a simple text message using the API!

**Creating Your Own Message Template and Sending a Message**

Next, you'll create your own message template for sending more rich and personalized messages, containing an image and a call to action.

From the Getting started page in the Meta for Developers console, step two features a link to create your own message template. Click this and then click Create Message Template. First, select Transactional as the message category, and then provide a name and a language.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312983963_1171539260124843_5930136989088153905_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=Kh6YAQnawFEAX9tZG-f&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDZIno_i-QiZQiO_hscdabvlmec5EkHvNqGGS8WhM-TFQ&oe=6375F384)

Start building the template by choosing an Image as the Header, filling in the Body, and [dynamically using parameters](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages) to change the message's content.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313432772_1173565063262767_4106066021207428412_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=83K0104cJzIAX-Pze04&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfCOqlNLzLxM9z0E8196ZcU0z_xup42DfRNgnXa2PgRB6w&oe=63767AEE)

Finally, add a Footer and a Call To Action. For this tutorial, use the Visit Website call to action, which allows you to provide a URL. This adds the call to action to the bottom of the message, as shown in the preview in the image above.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313327974_642908974229161_5457606916653807620_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=EF886uDKyZ4AX-FVr6C&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfAx6dR12ZRObyUPfW1621QyLtb42HbUJt1ix3zYEuTNjA&oe=63775C46)

To ensure your template is accepted, make sure it follows the [proposed guidelines](https://developers.facebook.com/docs/whatsapp/message-templates/guidelines/) and that you've provided sample data. You can provide data using the Add Sample button at the top of the page.

The approval process can take a bit of time, so while you're waiting, modify the code in preparation to use this new template.

Again, you only need to make changes to the POST section of your HTTP request builder and modify the request body to use the new template --- similar to the very first example. The difference with your new template is that it uses two components: a header and a body.

Within the components array, start by specifying your header component and declaring your image parameters. This enables you to provide an image URL for each message, which is useful if you have different images for different user segments.

The body component contains the text that should replace the parameter placeholder ({{1}}) you added while building the template. Now that it's set up, check that the message template has been approved in the console. If so, run the code again. You'll see a new message should match the template, similar to what's shown below:

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313417398_702553954129677_8976788652428163948_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=xa0UhYT7sGQAX-8R95Y&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDEWgcQPNf56SP3SmqBVJYqx5WOc5GD9QVgLFlAuIgr2Q&oe=63779E91)

**Best Practices**

This post took you through the basics of getting started with the Cloud API to send simple text and template-based messages. When adding this to a production application, there are some best practices to follow.

First, message templates must be used to start business-initiated conversations. You saw this when sending a simple text message, as before it could work, you had to send the example message template and respond to it. Then, this opened the conversation to further messages.

Second, as your app will be calling an external service, it's important to make use of the asynchronous calls the HTTP client provides. Using\` client.sendAsync\` will prevent the main thread from being blocked, so the application can continue doing other things while waiting for the message to be sent.

You should also consider how you're going to authenticate with the API. You can create a permanent access token or [request an access token](https://developers.facebook.com/docs/whatsapp/on-premises/reference/users/login) from the API. In either scenario, you should ensure that you [secure sensitive details](https://developers.facebook.com/docs/facebook-login/access-tokens/security) and refrain from hardcoding them in your application.

Finally, it's important to add error handling to your application. Several factors could prevent a message from being sent, and your application should know how to deal with them. Meta provides a list of [error codes](https://developers.facebook.com/docs/whatsapp/cloud-api/support/error-codes) and their meanings so you can gracefully handle errors. You may want to code specifically for some common or predictable errors and provide default functionality for dealing with any others that occur. It's recommended to log these errors for later analysis.

**Next Steps**

This tutorial demonstrated how to build a Java application that can send messages via the Cloud API. You've sent simple text-based messages and more complex messages containing images and call-to-actions using bespoke message templates.

The API is a simple-to-use REST API, making it effortless to integrate into a Java application utilizing Java 11's built-in HTTP libraries to build and send HTTP requests. With the addition of [webhooks](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/set-up-webhooks), you have the ability to build an application that can send automated messages in near real time, creating even more ways to interact with your users.`},{title:"Fixing broken windows: How to deal with legacy systems",description:"Working with old code? Here’s everything you need to know about managing and improving legacy systems.",date:"2022-11-05",tags:["leadership","legacy-systems"],slug:"/articles/2022/fixing-legacy-systems/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2022_fixing-legacy-systems_a218954e.jpg",canonicalUrl:"https://leaddev.com/legacy-technical-debt-migrations/fixing-broken-windows-how-deal-legacy-systems",body:`*By Dmitry Vinnik*

*Originally posted [here](https://leaddev.com/legacy-technical-debt-migrations/fixing-broken-windows-how-deal-legacy-systems).*

What is software? First and foremost, it's code, but we can also think of it as a living, ever-evolving thing, because it's written by people. In the same way that every one of us has our past experiences and memories, software is built over many years, and what might have been there before -- its "past selves" -- become known as legacy code.

Legacy code is in almost every software project. And in its worst state, it can stifle innovation, prolong a development lifecycle, and affect engineering morale.

In this article, we will dive into what goes into building software and how legacy code plays a role on every level: the code, the individual, and the team. We will look at the psychology behind what makes software so challenging to work on, and how to improve it for everyone involved, developers and customers alike.

**The core elements of building software**

There are three building blocks when it comes to software development: individuals, teams, and code.

When we think about software, we usually envision a computer program an individual has made. Even in programs that rely on artificial intelligence, a person has written the code for these applications to "write themselves." Lastly, we have to think about scale. Most high-impact applications are created by a group rather than single individuals. People are particularly successful when they come together as a team.

As with any system that has more than one moving piece, each element adds complexity in how it interacts with other parts.

![A diagram showing the three elements of building software: individual, code, and team](https://leaddev.com/sites/default/files/inline-images/Screenshot%202022-10-31%20at%2011.36.18.png)

**The psychology behind broken software**

Nothing is forever in life, including software. It's not "if" but "when" the system will break. It could be regressions, bugs, performance issues, or many other things. While it's easy to disregard or deprioritize small breaks, this approach can lead to even more significant failures. The reason why it can be detrimental to overlook minor issues goes back to the human element of building software and its psychology.

One of the most interesting parallels between making software and sociology is the [broken windows theory](https://en.wikipedia.org/wiki/Broken_windows_theory). This theory states that visible signs of disorder create an environment that encourages even more chaos. For example, if a window is smashed in a neighborhood building and is left without fixing, then reasonably soon, other windows will be broken, walls defaced, and the entire area might become unsafe.

We can apply the same theory to how we treat our software. If we let these small breaks, these "window cracks," into an application, the app will soon be completely broken. Since we discuss software as a combination of three core elements, we can apply this theory to each of them and see where "broken windows" can start appearing.

This article will only talk about a coding element of software building, but it doesn't mean that individuals and teams are any less critical to our application's success. It's actually the opposite: people are the most complex component of any system. But here we'll start with the most basic part of what goes into making software: our code.

**The risks of making changes to software**

Before we dive further into the code behind our software, we need to step back and ask ourselves whether we should even care about software and its code in the first place. The answer is simple: we shouldn't care about the software. Instead, we should care about getting our users exactly what they need.

Our customers don't want specific features, they want the behaviors behind them. For example, a user doesn't need yet another button on their web app; what they really want is to be able to export a report with their weekly analytics.

"Behavior over features" is the main principle to uphold when developing software. This motto is why the infamous phrase, "it's not a bug, it's a feature", is a valid approach. Our customers get used to a particular email format or a navigation menu position, so even if we discover that the way a feature works is not optimal or relies on an underlying bug, we have to be extremely careful when making changes to the code.

Whenever we are making changes to the existing code, we're doing what we call "refactoring." We might want to refactor the code because we are working on a new feature, for example adding account information to the navigation bar. It might be a bug fix that requires changing the code, which could cause unexpected behavior. Sometimes refactoring can be a part of a significant rewrite of an application, for example if we want to change its architecture.

The list of possible reasons for refactoring is very long and project-specific. What's important is that we understand that changing the existing code can unexpectedly alter the behavior that our customers are used to and that it is usually something we want to avoid. We could also cause breakages to seemingly unrelated areas of our app. For example, adding a few pixels to the profile image can push some other fields of the screen entirely.

These unexpected breakages are called "regressions." We use tests to ensure the current behavior of our code is preserved and is "correct."

All of these nuances and potential dangers of working with existing code are where legacy code comes into play. Now we've established the importance and risks of working with software, let's dive into this fundamental aspect of working with legacy systems.

**Understanding legacy code and how to deal with it**

Legacy code is a reasonably broad term, and some people go as far as to call any software legacy code as soon as it's written. However, we will go with something more concrete and rely on a definition by Michael Feathers, author of a fantastic book called, *Working Effectively with Legacy Code*. He defines legacy code as any code without tests.

With this definition in mind, let's say we wanted to change our legacy code. Right away, we are faced with a [catch-22](https://en.wikipedia.org/wiki/Catch-22_(logic)). Usually, production code has to be written in a certain way to make it testable. Since legacy code is inherently code without tests, we often need to refactor it. But as we established before, refactoring code without tests could change our software's existing behavior, causing regressions.

Since we established that adding tests and refactoring legacy code carries certain risks for our software, we should continually evaluate whether it's worth changing this code. Sometimes, leaving the legacy code alone and unchanged is the correct decision.

We should always consider what the cost of making the change is. We need to calculate the Return on Investment ([ROI](https://en.wikipedia.org/wiki/Return_on_investment)) of refactoring our code and adding more tests. Changing legacy code simply for the sake of doing it is meaningless for our customers, and as we remember, it's the end users we ultimately care about. This is why we should use factual data when proposing changes to legacy code. Should we do it if it takes one engineer two weeks to rewrite a particular legacy code that will result in 10x load time improvement? If the answer is yes for your organization, then it's an easy decision to make towards refactoring legacy code and adding more tests.

The critical takeaway is that legacy code is not something inherently wrong, but we need to spend time understanding. Sometimes, legacy code works as our users expect, and if the cost of changing it outweighs the long-term benefits for our users, it might be justified to keep the code unchanged.`},{title:"Sending Messages via WhatsApp in Your Node.js Application",description:"This article describes how you can integrate the Cloud API, hosted by Meta, into a Node.js application to enable sending and managing WhatsApp messages.",date:"2022-10-31",tags:["business-messaging"],slug:"/articles/2022/whatsapp-api-with-nodejs/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2022_whatsapp-api-with-nodejs_b4857e3b.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2022/10/31/sending-messages-with-whatsapp-in-your-nodejs-application/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2022/10/31/sending-messages-with-whatsapp-in-your-nodejs-application/).*

WhatsApp is one of the world's most popular mobile messenger apps, with nearly [two billion monthly active users](https://blog.whatsapp.com/two-billion-users-connecting-the-world-privately). Businesses can leverage the WhatsApp Business Platform to communicate closely with their audiences, help boost sales, and transform the customer experience.

This article describes how the Cloud API, hosted by Meta, Meta's integration of the WhatsApp Business Platform, can be used in a Node.js application to provide the capability to send and manage WhatsApp messages sent and received via the Cloud API.

Let's dive in and explore how to create a Node.js web app powered with WhatsApp messaging from scratch to send a simple text-based message and then using message templates for more detailed messages. If you'd like a preview of where you'll end up, you can [download the complete application code](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fwhatsapp-api-examples%2Ftree%2Fmain%2Fsend-messages-movie-ticket-app-js&h=AT181v5Ex6Pb7URXyBi8HD8owSANgJCy0xysktsDkDkR3UXo6tOSkq90O-AEx2Sv_iLiDSRK92i98nkGLYhayrY_d1xpeUuHTxfoS6gBOugXH_EPQpa8dZwYXp9KAmU1a9MK28Ns9EcqMVb1Z8arhqsgKXE).

**Prerequisites**

To send and receive messages using a test phone number, follow the [Set up Developer Assets and Platform Access](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started#set-up-developer-assets) tutorial, making sure you complete the steps below.

First, you'll need to [download and install Node.js and npm](https://l.facebook.com/l.php?u=https%3A%2F%2Fdocs.npmjs.com%2Fdownloading-and-installing-node-js-and-npm&h=AT38TwG1fm6BXvQKGBj078Nj3CWjiBH1w6cfO1yC78cDcmhAhg8kWY9X6V1vA_mLIbezb72LBOLLSGwMpx_-gVgiYE7qDyG8SePSNGZ_rRfXA_gkvJoxbR_XVEdG2c0S1Eoch-5FS6gkDnmioEWM571wBHo) on your machine, if you don't have it installed already.

Next, Register for a free account as a [developer with Meta for Developers](https://developers.facebook.com/docs/development/register/).

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313103856_485810083590768_6248049366835476432_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=yztDs0mOVm4AX_87NZj&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDgSPksRYrPKShpXrjqCBJ2hfx45j82q9GfyUGkgt9BZg&oe=636A38AA)

Enable two-factor authentication for your account.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313258975_2765048266962047_3705777515423576638_n.png?_nc_cat=107&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=sNvFHxdztWAAX-d1deQ&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfAmbnVtNAgC4TmVlN9WigtKHYbQRdLBeDubd0eewEs8Cw&oe=6369D2B5)

[Create a Meta App](https://developers.facebook.com/apps/). The App ID and the App Secret will be used later in this tutorial.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312971274_898942361084718_8403123992590817766_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=qMMPp_poIPQAX9--ams&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfAfvst8VtRW79fw5L2RA_qVB55i3atV9splGv7Pnj1xFQ&oe=636A288B)

Connect your Meta App with the WhatsApp product.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313284998_1277230656367997_8073479242831090557_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=KCZvQT0I_VsAX8hT1sw&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfCERVV__FBPGCTQtJhu8eGFCbgIyD_ckrv3M1_syxQ9Eg&oe=636B51A6)

Then, associate your app with a [Business Manager](https://developers.facebook.com/docs/instant-articles/guides/businessmanagersetup) account.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/311571934_1261629017741844_1289135794677970981_n.png?_nc_cat=100&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=80f7VK2Kc9IAX-Kz73I&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfBCkeN5-Ml-2H-A1hBMUuCARoeFE7wjFNsaKin68AJcxQ&oe=636AEBAA)

On the App Dashboard, open the WhatsApp > Get Started menu and configure a recipient phone number. Your app will need it as a recipient for the WhatsApp messages. This number will be used later on.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313218832_5488916497861310_1648615290633185030_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=VDzm0Uj4rIgAX-kU-K4&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfAXK1HpGfe19-PFcIyf2y_WTsyVUogGuKDopqOABAwjgQ&oe=636A7D04)

Create a [system user](https://business.facebook.com/settings/system-users/) for your Business Account. For a more detailed walkthrough, see our [Business Manager documentation](https://developers.facebook.com/docs/instant-articles/guides/businessmanagersetup#biz-mgr).

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312976685_2062241773966077_2186365997394028535_n.png?_nc_cat=100&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=Cum1KwHek54AX-PGiQ-&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfArILZzLqLB2nZEF2OZ5T1Yi0YnHMtmgc_YZ-pjdLEnPQ&oe=636A1FAA)

On the System Users page, generate a new token for your new system user. Assign your app all the available permissions. This token will be used later in this article.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313187915_1197711044117328_5355104232436865130_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=qu9bnpeaV1wAX_Mi-qy&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfC7xZLiRZ3RXHB-OpJA0q58OrGZSus56jZ3iCLuzhiw2A&oe=636B4C81)

On the System Users page, configure the assets to your System User, assigning your app with full control. Don't forget to click the Save Changes button.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313184851_643861123903159_1840612832985898680_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=h9XFXXOwu0wAX-1zbO1&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDjfyOioAcuNJ8wavy9qpwrolGQEhR7FgdVt6soHVUvMQ&oe=6369FBD2)

**The App We're Building**

This small sample application will work as an online movie ticket purchase and booking service. The application will use the API to provide the user with an engaging and more personalized experience than email communication. When the users log in, they're greeted by a WhatsApp message. Then, when they buy a movie ticket, they receive a message confirming the purchase.

**Creating a Minimal App with Node.js and Express**

To get started, you need to get a new Node.js project up and running. We'll use [EJS](https://l.facebook.com/l.php?u=https%3A%2F%2Fejs.co%2F&h=AT30eVZ3US4Ka0H0a0--ohff7SJ2zZqExoLQFHDCKWLM7Hr6Mq3Pqf5zbeiaiYNjBf6fnIp52ntiabch16p1ovoU0BuXopUUjJaYfUmsCYY4Vaa1UknEfpVYNqqFqRkUh6wu1uBqo9BkihZusCGAKSdRpbQ) as a lightweight JavaScript templating engine and [Express](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fexpress&h=AT0tj6PjkqE3fmyhLZfkvASR_3QVpfmxOi8-5xLETrm3XEoj9OE44b10-Z2EUaM2OKGdJEUV3x831qw9S61eAJycW2sAqFW9u93nl6ZzmBH3Q1uHvOB-CEVTRRubJgmZ-mSJvB-ZxY6rxgE9g-GvxX86-og), the minimalist web framework for Node.js.

Open terminal/command prompt and create a folder for your project to live in. Then execute the npm init command from the root of your project folder to initialize your project to use npm packages:

\`npm init\`

Create a starter application using express-generator:

\`npx express-generator -v ejs\`

Next, run the following command to install the packages and resolve their dependencies:

\`npm install\`

Finally, execute the following command to start the server and host your app locally:

\`npm start\`

Now visit [http://localhost:3000](https://l.facebook.com/l.php?u=http%3A%2F%2Flocalhost%3A3000%2F&h=AT3heRvqI1QtG6RikS-TBHYyWnRF9LbpkRtuoRH_On8lJRwOhms5xnT8fAyZ9fQ0NxQEkxRcabFVmLLvYR_XXcvLJssrvUS3a-Kq-Ywgz0BJPSexBZ0SRzv-sn6Zr2Lznl1yGcLSDAS4qttwQWPTjfblzFc), and you'll see the homepage of your Node + Express starter application:

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313248035_818935862865263_9151782645116484694_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=c6pU41i-qX8AX_h7K4k&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDrvdgpS6WYIu8JJZoCm8OKpnXlwqgO0FYvu6dP8k4PzQ&oe=6369E0DB)

**Creating the Sample Login Page**

To start your movie ticket application, you'll create a sample login form that will work as your homepage. You'll need to call the render function of the [Response object](https://l.facebook.com/l.php?u=https%3A%2F%2Fexpressjs.com%2Fen%2Fapi.html%23res.render&h=AT1CXloIirAsoxJgO94LIqccrrneAid2WRZLgN9-rZTe1SfvKo_Yw2mGOjugcqIWswaXhoycrTr5Ox9Dl7UCRPaaSMiqfRRSBqVOP1XL8GDCyPIstAG3tFecXkIj1W-MvSYp9nIBIqruJ1-RiKyA4uXoMt0) to render a view from a separate HTML file.

Open the [routes\\index.js](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fwhatsapp-api-examples%2Ftree%2Fmain%2Fsend-messages-movie-ticket-app-js%2Froutes%2Findex.js&h=AT1P1I7r8GbSQKBmbOyoVBIPihdLGKF3SxhMQoxva8yu6fcfIjS-mdDvoN6LyA8Dt2EZFtR1PhKJiohsi6r6tUU48LbwTfDhFQbezSrbDbMbh4RYVPHK5kBMuKA0jn95ZW1jSXd9po1N4bt3ZCulODU0oag) file and replace its code with the following contents:

var express = require('express');  var router = express.Router();  /* GET home page. */ router.get('/',  function(req, res, next)  { res.render('index',  { title:  'Login'  });  }); module.exports = router;

Next, open the [views\\index.ejs](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fwhatsapp-api-examples%2Ftree%2Fmain%2Fsend-messages-movie-ticket-app-js%2Fviews%2Findex.ejs&h=AT0Dcd4kspDVMfLbXholy2XSE2gp1xYvhwROvCrmVrKRbbHd-3oCtLszNaJbM84k6KPGA-sROKaCnhlPqh_Pgb8ooV6w16Dp1FmWFpcRwIDpehKmPgKBUvCwEBlOhYBg0zMz4pU3YITyOCYX8aZdZWw6gLI) file and add the HTML content below. Here, you're creating a sample form login that comes with a stand-in login and password, so that you don't need to provide those to use the application.

For your web app front end, use [Bootstrap](https://l.facebook.com/l.php?u=https%3A%2F%2Fgetbootstrap.com%2F&h=AT36qOkF3yMaEkeXo3b3oDm8WHr8lhzKdHhJmqFHZju-lPNaNvI0ypCmY-m6F8vpq8SSkcjFacefFP5mPxnDzq7r1DzIs9CMNZVJJt31EI54RI0390qA6Q3iTzTQbZxnj-IXKMfm-fEg1gB5lINJxOqif7o). This popular library will help you build a consistent, lightweight UI that comes with responsive styling, allowing you to easily run your app across devices with simplified CSS rules.

Then, restart the app again to see the new login page, by using CTRL+C and the command:

\`npm start\`

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312939017_1050399588990874_6776251750459829455_n.png?_nc_cat=110&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=gRC1_43tShQAX_Nfa9V&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfABJiqDUqj0GrvO_xIj5gMQEtBMidRjyxWAKuOOf8Xxig&oe=636AE744)

**Sending Text Messages with Node.js and WhatsApp Business**

Your Node.js application will need to use specific data from your Meta developer account created in the beginning of this article. For the convenience of having all of your configuration in one place, and not scattered throughout code during development, place it in a file.

Create a .env file at the project root with the following configurations:

APP_ID=<<YOUR-WHATSAPP-BUSINESS-APP_ID>>
APP_SECRET=<<YOUR-WHATSAPP-BUSINESS-APP_SECRET>>
RECIPIENT_WAID=<<YOUR-RECIPIENT-TEST-PHONE-NUMBER>>
VERSION=v13.0
PHONE_NUMBER_ID=<<YOUR-WHATSAPP-BUSINESS-PHONE-NUMBER-ID>>
ACCESS_TOKEN=<<YOUR-SYSTEM-USER-ACCESS-TOKEN>>

Note: Replace each of the above settings with data from your WhatsApp Business account Dashboard.

Your login form action tells the app to POST to the /welcome route. So, you'll need a new router to:

-   Handle the "welcome" HTTP POST request.
-   Obtain the configuration needed for the welcome message.
-   Send a welcome message via the API.
-   Redirect the app to the homepage once the message is sent

Next, create a new [routes\\welcome.js](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fwhatsapp-api-examples%2Ftree%2Fmain%2Fsend-messages-movie-ticket-app-js%2Froutes%2Fwelcome.js&h=AT0K2dMkGuWUFuLSSzZ6NHirSGjCbmAG6MSr0MmMY1-2v5tfs4HMz7bKn81UG-VAR49PBtznjPikyO8x-XUO6QS6lrG2U4Q1PZrvw6fmVnU_77hbSW6DoilKiJSlkOtFTPRqDKG1D3i2VV0YGhMKr8EgmwY) file with the following code:

var express = require('express');  var router = express.Router();  var bodyParser = require('body-parser'); require('dotenv').config()  const  { sendMessage, getTextMessageInput }  = require("../messageHelper"); router.use(bodyParser.json()); router.post('/',  function(req, res, next)  {  var data = getTextMessageInput(process.env.RECIPIENT_WAID,  'Welcome to the Movie Ticket Demo App for Node.js!'); sendMessage(data)  .then(function  (response)  { res.redirect('/); res.sendStatus(200);  return;  })  .catch(function  (error)  { console.log(error); console.log(error.response.data); res.sendStatus(500);  return;  });  }); module.exports = router;

Next, you'll need the function to encapsulate the code that sends basic text messages via the API. Create a new [messageHelper.js](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fwhatsapp-api-examples%2Fblob%2Fmain%2Fsend-messages-movie-ticket-app-js%2FmessageHelper.js&h=AT3mZiIizdJCxJagF6bv1GIyjfIdEBWwnwGy1owOatp8GaucLA4ssfB8M96Ubr8sPvzaqviWqGJ7Ji-SrPouOvnxJvKXZ-8NSmM_yttL2hkToZT-fpgDfQOMU-Yj2HG7khl2pNu2dpYRnZ4oNHupzc-SAhY) file at the project root with the following code:

var axios = require('axios');  function sendMessage(data)  {  var config =  { method:  'post', url:  \`https://graph.facebook.com/\${process.env.VERSION}/\${process.env.PHONE_NUMBER_ID}/messages\`, headers:  {  'Authorization':  \`Bearer \${process.env.ACCESS_TOKEN}\`,  'Content-Type':  'application/json'  }, data: data };  return axios(config)  }  function getTextMessageInput(recipient, text)  {  return JSON.stringify({  "messaging_product":  "whatsapp",  "preview_url":  false,  "recipient_type":  "individual",  "to": recipient,  "type":  "text",  "text":  {  "body": text }  });  } module.exports =  { sendMessage: sendMessage, getTextMessageInput: getTextMessageInput };

The code above makes an HTTP POST request to the /messages endpoint on the Meta [Graph API](https://developers.facebook.com/docs/graph-api/) at graph.facebook.com, passing:

-   The Cloud API version you're working with
-   The test phone number that will receive the message (you've already configured that)
-   The access token you generated for your System User

Also, note that the getTextMessageInput function returns a specific data structure required for sending basic text messages.

Moving on, open the app.js file and create a router variable for the /welcome route:

\`var welcomeRouter = require('./routes/welcome');\`

Then enable the app to use the new welcomeRouter variable:

\`app.use('/welcome', welcomeRouter);\`

Finally, restart the app again to see the new login page, by using CTRL+C and the command:

\`> npm start\`

When the login screen loads, click the Login button. You'll see the WhatsApp notification popping up on your screen:

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312988720_530633165060720_2171509363774940439_n.png?_nc_cat=106&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=0R9bEaY77_sAX89xjv8&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfCj472Lx57E3ceJTScT4f1JixR2hxDMSRkOsDQQHGaTCA&oe=6369B6DB)

Click the notification that appears to open WhatsApp and view the basic text message sent by the Node.js application:

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313119341_1145585806391189_5946601611799369865_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=OWQH2I0BX0IAX9aLGQY&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDiu915y_gFS9u3clo7bIzOi6Dbhn_nXPNoc6n0-U9THg&oe=636A28F4)

So far, you've sent simple messages using WhatsApp. Next, you'll send more complex messages using templates.

**Creating the Movie Ticket Catalog Page**

The next step is to create a catalog of available movies and their details so that online customers can buy tickets. This data will be stored in a separate file.

You now need a new route for users to access the movie catalog page.

Create a new file at [\\routes\\catalog.js](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fwhatsapp-api-examples%2Ftree%2Fmain%2Fsend-messages-movie-ticket-app-js%2Froutes%2Fcatalog.js&h=AT1F0LveVUh6JVZ-pSUs5hM-mz4CDKJWPRefIKaxOJqqfyWWM2td4YqVWM3NX0jDHK0blhUHc3qgA_kf8to5D1QVMZhWveT1gvA2uOIbTNEiot3ZlRJ7y2uV8a4kD5IFpMJu51rDrF68__t0vPKAk4f2h50) with the following content to render the catalog page with the movies data:

var express = require('express');  const  { movies }  = require("../public/javascripts/movies");  var router = express.Router();  /* GET home page. */ router.post('/',  function(req, res, next)  { res.render('catalog',  { title:  'Movie Ticket Demo for Node.js', movies: movies });  }); router.get('/',  function(req, res, next)  { res.render('catalog',  { title:  'Movie Ticket Demo for Node.js', movies: movies });  }); module.exports = router;

Now create a new file at [\\views\\catalog.ejs](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fwhatsapp-api-examples%2Fblob%2Fmain%2Fsend-messages-movie-ticket-app-js%2Fviews%2Fcatalog.ejs&h=AT34Mt5cbut0lXCq4MMEnoXScgtUvQNZzLzPngtRg2vY4ionG9HyYd-fhhWdqL6f10jFZ-lGq8bn52Gv2YjUXDGPB1vmimQI7qBu67Fd4xt0y2keT_Rpdg8LFXywkv1OLC6oeDi8m-owHwIZHXC19Tu7vmQ) with the following content, which renders the movie data using the EJS template syntax.

Now you have to make the welcome endpoint redirect to the catalog page once the welcome message is sent to the user. Open the [routes\\welcome.js](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fwhatsapp-api-examples%2Ftree%2Fmain%2Fsend-messages-movie-ticket-app-js%2Froutes%2Fcatalog.js&h=AT0zPrwScTFOc9IDtFeYtA37WkTBtELFyjzcol6RXaomH-aLTwxZsuE_MCLQLEvU48QfaFKIL9eIl0P1vnkxGySFcVQNuNiddLTYpR700TkjDHL2xzUqYa5MsCpEB9F5bkMIOi_iGQSWmdL5J2cs8PXgsRw) file and modify the redirect to the /catalog route :

   sendMessage(data)
    .then(function (response) {
      res.redirect('/catalog');

Next, open the app.js file and create a router variable for the \\catalog route:

\`var catalogRouter = require('./routes/catalog');\`

Then enable the app to use the new catalogRouter variable:

\`app.use('/catalog', catalogRouter);\`

Finally, restart the app again to see the new login page, by using CTRL+C and the command:

\`> npm start\`

Now click the Login button. This will send your WhatsApp number a welcome message and redirect you to the catalog view:

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312858981_1563782440741501_4408793281728206605_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=_PxtwLjLXx8AX81iwW1&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfD-GC2OsROU4a74mZnD5QQ04ZpU3tvYKJ-s-RBPa449fQ&oe=636B0D77)

Note that there's a button to buy the ticket for each movie displayed on the screen above. Next, you need to configure the application to process the ticket purchase.

**Sending Templated Messages with Node.js and WhatsApp Business**

A message template is required to start a [business-initiated conversation](https://developers.facebook.com/docs/whatsapp/conversation-types). These conversations can be customer care messages or appointment reminders, payment or shipping updates, alerts, and more.

Create new router code at [routes\\buyTicket.js](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fwhatsapp-api-examples%2Ftree%2Fmain%2Fsend-messages-movie-ticket-app-js%2Froutes%2FbuyTicket.js&h=AT1gHxZ02EjAU8z9b8pok5eVn3uh2-qiH1QkNYxp-sI2h0UEWL3lp-k8GT2dkS_odrdLQnC9AZa91LWVMXOadcL7q2pkQXDNSa0LMU2H30MgWFy3C-rVbqn2MWNGiNsADL6l4Avm-fwi5Xr41kCOB_9GiIM):

var express = require('express');  var router = express.Router();  var bodyParser = require('body-parser'); require('dotenv').config()  var  { movies }  = require('../public/javascripts/movies');  const  { sendMessage, getTemplatedMessageInput }  = require("../messageHelper"); router.use(bodyParser.json()); router.post('/',  function(req, res, next)  {  var movie = movies.filter((v,i)  => v.id == req.body.id)[0];  var data = getTemplatedMessageInput(process.env.RECIPIENT_WAID, movie, req.body.seats); sendMessage(data)  .then(function  (response)  { res.redirect('/catalog'); res.sendStatus(200);  return;  })  .catch(function  (error)  { console.log(error); res.sendStatus(500);  return;  });  }); module.exports = router;

The following code to send the ticket purchase message is similar to what you did for the welcome message. Open the [messageHelper.js](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fwhatsapp-api-examples%2Ftree%2Fmain%2Fsend-messages-movie-ticket-app-js%2FmessageHelper.js&h=AT2yqJPTXnFNPKvHomOGZ9V1iLV62W7odLuq1W2ureZRT3WgQjtc0k6sQG0k4UUe78nJ-YZ6g9ZVhywF_trWG2uawl47MgID-HkJBM3yjTDK-WTY7E2xPpD18ShTiEuN9tEHQhLiw8XfOU7Oqxm3-NjVKnM) file and add the getTemplatedMessageInput function.

Note that we are using the sample_movie_ticket_confirmation template above, where you provided the movie thumbnail, the movie title, the date/time, the location, and the number of the seats. You can experiment with other available templates or create new ones, by visiting the [Message Templates](https://www.facebook.com/business/help/722393685250070) page.

Now open the [app.js](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fwhatsapp-api-examples%2Ftree%2Fmain%2Fsend-messages-movie-ticket-app-js%2Fapp.js&h=AT2XAecTts5Np-Kawi-QuDrVGqBOd8HeKSfjIwr0Jlpvgd1v3s6mm8dVdtxT4kqnQWSunIEr0VOmiJWNENUzgek1yKmpfEHTqAHqGsZL4t8R6NZ90ivci5dbrmHsZid2TUhj4fPETos8td8B2X1PNUA6ra0) file and create a router variable for the buyTicket route:

\`var buyTicketRouter = require('./routes/buyTicket);\`

Then make the app use the new welcomeRouter:

\`app.use('/buyTicket', buyTicketRouter');\`

Finally, restart the app again to see the new login page, by using CTRL+C and the command:

\`> npm start\`

From the ticket screen, select three seats under a movie card:

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312996464_2326217867766776_2004507487111222633_n.png?_nc_cat=107&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=EzobL-9da4EAX-blDOU&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfAWAKtoi3dHXsT8Q0NN7KnEab49yWMAkVZ2vpbuArrh5Q&oe=6369EB09)

Then click the Buy button. This will cause your app to send a template message to your test phone number via

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312887066_499618112091926_7898993708419353656_n.png?_nc_cat=106&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=7PifQVPRW3kAX_o0zw9&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfBljwReTbt8FUkSz_Dg8PUy5F_r0DntQNt5BkaSlOMhiw&oe=636A6AE9)

WhatsApp:

Now, open WhatsApp to see the template message.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/313257133_649719943226901_7479598778394774497_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=CYIxDxrXWyMAX9cHhPI&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfAdWGN5HyAiQFLS9Wsolv8ofn1-67s6SRzjGre8BkQOzQ&oe=636A7117)

That's it!

As you can see, sending messages from Node.js code is straightforward. However, here are some tips and best practices for integrating WhatsApp into applications:

-   Even if you're automating your app messages, make sure that communication with customers doesn't feel robotic. People expect a more personal experience, so try sending personalized messages.
-   Explore a more relaxed and informal tone.
-   Keep your text messages clear and to the point.
-   When using templates, provide rich context information by using links to documents, videos, or images such as those above, where we depicted the movies related to the tickets.

**Conclusion**

This article demonstrated how to add messaging capability to a Node.js app by integrating it with a WhatsApp Business account.

First, you created a simple Node.js application from scratch. Then, you added a sample login page and configured the application to send basic welcome messages to users via the API. Finally, you added a catalog page and configured it to send template messages with movie ticket details to customers.

But this is only the tip of the iceberg. You can explore our [documentation](https://developers.facebook.com/docs/whatsapp/cloud-api) to see how you can get the most out of the Cloud API.`},{title:"Sending Messages with WhatsApp in Your Python Applications",description:"This article describes how you can integrate the Cloud API, hosted by Meta, Meta’s integration of the WhatsApp Business Platform, into a Python application to enable sending and managing WhatsApp messages.",date:"2022-10-24",tags:["business-messaging"],slug:"/articles/2022/whatsapp-api-with-python/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2022_whatsapp-api-with-python_5bbd4031.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2022/10/24/sending-messages-with-whatsapp-in-your-python-applications/",body:`*By Dmitry Vinnik*

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

\`python3 -m venv venv\`

This command will create a virtual environment for your Python project.

Then, execute the following:

   $ mkdir myproject 
   $ cd myproject
   $ python3 -m venv venv

Next, activate the virtual environment.

\`$ . venv/bin/activate\`

Now, install Flask:

\`pip install flask[async]\`

Create an app.py file at the project root with this content:

    from flask import Flask

    app = Flask(__name__)

    @app.route("/")
    def hello_world():
    return "<p>Hello, World!</p>"

Run the app:

\`$ flask run\`

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

\`from flask import  Flask, render_template\`

Then replace the hello_world with the index function as follows:

    def index():
    return render_template('index.html', name=__name__)

Create a new folder named templates and create a new file named index.html:

    \\templates
            |--- index.html

Next, open the index.html file and add the HTML content below. Here, you're creating an example login that comes with a placeholder login and password. This way, you don't need to provide those to use the application.

For our web app front-end, we're using [Bootstrap](https://l.facebook.com/l.php?u=https%3A%2F%2Fgetbootstrap.com%2F&h=AT1z2SUAgey-HLxmcBZC1qXJIfKY1D348r0fayYD409gztr32Zw2GHeqOHD7KNGn9XL413ExVVfeES90Wdo4QM82a5wcBAIRxKK4IB035K-zFQgtxe2YRA4CVqdnPhoTgqQFyrPiVx65Pzi1lUWZ3E-KCwk3BsMJzp8jXPts9-0). This popular library will help build a consistent, lightweight UI that comes with responsive styling, allowing us to easily run our app across devices without worrying about CSS rules.
Then, run the app again to see the new login page:

\`> flask run\`

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

\`pip install aiohttp[speedups]\`

The above code makes an HTTP POST request to the /messages endpoint on the Meta Graph API at graph.facebook.com, passing:

* The Cloud API version you're working with
* The test phone number that will receive the message (you have already configured this)
* The access token you generated for your System User

Also, note that the get_text_message_input function returns a specific data structure required for sending basic text messages.

Finally, run the app again:

\`> flask run\`

Then click the Login button. You'll see the WhatsApp notification popping up on your screen:

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312518669_2458920370916340_7004578034220547741_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=LhCweacGUwwAX8MYK6Z&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDPytaPfYIf7CvYQqV1k65I7HcuECzkalQAGqfXKujIhA&oe=636A9064)

Click that notification to open the WhatsApp app and see the basic text message sent by your Python application:

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/312559356_844133369945441_6313326797548818294_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=Jpvyd2SnbgwAX93YFHi&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDEIwC-rZjk2UOfhukS34thAejhyzYQ6zew0vFtoH9dOA&oe=636A2DD7)

So far, you've been able to send simple messages using WhatsApp. Next, you will use templates to send more complex messages.

**Creating the Flight Catalog Page**

First, you'll create a catalog of available flights and their details so that online customers can buy tickets. This data will be stored in a separate file. Create a new \\flights.py file.

You now need a new route for users to access the flights catalog page. Open the app.py file and import the get_flight function:

\`from flights import get_flights\`

Modify the welcome function to redirect to the catalog page instead of the index page:

\`return flask.redirect(flask.url_for('catalog'))\`

Run the app again and click the Login button. This will send your WhatsApp number a welcome message. Plus, it will redirect you to the /catalog view:

\`> flask run\`

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

Note that we are using the \`sample_flight_confirmation\` template above, where we provided the flight document PDF file, the flight origin, destination, and the date/time. You can experiment with other available templates or create new ones by visiting the [Message Templates](https://www.facebook.com/business/help/722393685250070) page.

Finally, run the app again and click one of the Buy buttons. This will cause your app to send a template message to your test phone number via WhatsApp:

\`> flask run\`

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

And this is only the tip of the iceberg. Want to learn how to configure [WebHooks](https://developers.facebook.com/docs/whatsapp/webhooks) in your application and configure notifications about sending and receiving customer messages and business account information? Check out [WhatsApp Business Platform documentation](https://developers.facebook.com/docs/whatsapp/cloud-api) to discover this and much more.`},{title:"The 10,000 Steps of Open Source Project Health: Dmitry Vinnik [Testμ 2022]",description:"The session starts with Dmitry explaining what open-source is. It is a process of making technology available for other folks to use and improve.",date:"2022-09-01",tags:["open source"],slug:"/articles/2022/steps-of-open-source-project-health/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2022_steps-of-open-source-project-health_12767b3c.jpg",canonicalUrl:"https://www.lambdatest.com/blog/steps-of-open-source-project-health/",body:`*Originally posted [here](https://www.lambdatest.com/blog/steps-of-open-source-project-health/).*

Welcome to another intriguing session of the Testμ conference!

Dmitry Vinnik is a lead open-source developer advocate at Meta, focusing on business messaging and open-source projects. He aims to increase developer productivity and empower diverse communities with open-source knowledge. Being a developer-first, Dmitry likes to explore open-source projects, create new educational content and deliver various talks with the same enthusiasm.

We thank Dmitry for enlightening us at this conference and talking about measuring open-source project health and how to improve it.

Before exploring further, let’s look at the key takeaways of this session.

* Learn how Meta‘s open-source team measures the current state of Meta’s open-source projects.
* How to use these metrics to prioritize and direct our efforts.
* Based on the information about your open-source communities, how to focus on the quality of the projects rather than the quantity of public repositories.
* Let’s begin with the major highlights of the talk!

**What is Open-source?**

The session starts with Dmitry explaining what open-source is. It is a process of making technology available for other folks to use and improve. The last two words – “use” and “improve,” are the most important ones. It means we are looking for the two primary personas at least – open-source users and contributors who help us improve the project and contribute back to it.

But why do people and organizations contribute to open-source projects?

First, it’s the community behind the project. Next is leadership, so if you are creating an open-source project and leading it or participating as the core contributor, you have an essential role in that industry, whether it’s AI or mobile web, and that’s why again, corporations often contribute to open source.

Then comes productivity; you have people from different backgrounds and highly diverse communities, in some cases, that help improve your project. You might not think about some accessibility issues, for instance, because your team hasn’t had experience with that, and people in open source will do it for you. It’s just an example of how productive you can get with open source.

Also, one of the crucial things to keep in mind is branding. Some enterprises and organizations entirely built an open source, and that’s where branding comes into play. It can help you with recruitment and elevate your brand.

**What are we trying to achieve?**

Dmitry then deep dives into what we are trying to achieve or what our goal is.

He listed some of the following objectives.

* Define gaps in open-source project health.
* Provide guidelines for open-source project health.
* Show communication as a priority.
* Are there any metrics that can define open-source project health? – he added.

The short answer is NO!

However, the long answer is – it depends. There are some metrics that you can use. For example, potential health metrics like repo numbers, whether it’s watchers, stars, or forks on the GitHub or GitLab repository. Forums like Reddit, Stack Overflow, or other Q/A chats. Twitter and YouTube are other areas where people can interact with each other.

There is also an Orbit model that helps people find metrics and grow their communities.

But instead of looking at numbers and particular metrics, we need to look for a more conceptual approach.

Dmitry lists down four types of open-source work you can think of. They are as follows.

**Types of Open-source work**

1. Planning: Why do we want to open-source a project in the first place? Open-sourcing projects for the sake of open sourcing is not reasoning. You must know exactly why you’re open-sourcing something and how you will wind it down eventually. Will you have world domination, or will you sunset or archive it down the line? Think of that; maybe you’re going to move it to a foundation or do something with it. In the first stage of open sourcing, you must keep that in mind.

At the launch, you need to have a plan behind your actions. The achievable goal that one can have is recruiting. Try to recruit people to your organization or your project through that open-source work you’re sharing. You can also look for people to contribute and improve the project that you will use internally or as an enterprise supporter of the project.

Branding is crucial to positioning yourself as an open-source organization. And adoption, you try to dominate the market or maybe become a significant player in the market, and that’s where you know another UI framework might come into play, and it would be a good example. Always think for the long term, but the important thing is that you need to have your team’s commitment. Whoever is behind the project, you need to know that they are doing it with their passion and dedication.

2. Branding: When it comes to branding, it’s not just about marketing; instead, it’s about showing commitment to your project. When you think about branding a bit more, you can think of it as a name. For example, when you try to google Pandora, you see it’s a jewelry store or a familiar brand that people have. Search engine optimization will downgrade your project way down the line, so you have to think about the proper name.

Even if you are not trying to pay some expensive designer to create a logo for you, something that you or your team can quickly draw, you can get the community involved and throw a logo for your project.

You need a narrative about how you will position your project, what it is for, and what problem it’s solving. Having documented this in the ReadMe shows your commitment. With social media, your project is shared with the community where your community resides.

3. Documentation: It is one of the cornerstones of open source projects. If you look at the top projects. They have great documentation. People spend hours, days, months, and years ensuring it’s as good as possible. Documentation is excellent for contributions, especially for first-time contributions. It makes it searchable. People can find it on Google or elsewhere.

Creating the website helps people to find you and your project. Some quick guidance and frequently asked questions set the project apart from many others. Consider using alex.js to find non-welcome words that you might be using in your documentation.

4. Codebase: You want to make sure that your community has a code of conduct established like kind of guides, how the community behaves, how you deal with bad actors, how you navigate some conflicts, and what you establish as the environment in your project and there are lots of great examples of where to grab the code of conduct from.

ReadMe is what people first see on GitHub or GitLab, so make sure that one is well defined, like what you’re looking for and why it’s there. If you are looking for contributions, you should have a contributors guide so they know how to get started, build your project on their local machine, have it in development mode, and make the pull requests.

With GitHub, you have a great way to establish what you’re looking for. When someone files pull requests or an issue, you don’t want to have a back and forth with whoever filed one of these items. If there is a test failure, then make sure to define the reproduction steps, what did you expect to happen, and what happened.

**Last but not least – Community work**

Dmitry then mentions the role of community.

Community work is vital on every level of open-source work, and it’s team driven. Often it’s focused on contact, so make sure that your community knows and your team knows where they contribute, how to contribute, and learn projects things like tutorials, videos, and podcasts.

Again the content driven by the community is always the best. You can have a community space for people to connect and ask questions by creating a Slack or Discord channel.

Communication is the key. If you don’t tell your project contributors to users what to expect, they might abandon the project, and this lack of communication usually leads to disaster.

**Q&A session!**

*What are some of the open-source projects that Meta has as of now?*

Dmitry: We have over 700 projects. You can Google Meta year in review, blog posts, Meta open source year in review blog posts that we’ve been publishing for quite some time, and so those posts we usually start with excellent infographics outlining quantity or the brief metrics on how many people contribute, how many projects there are, how many commits we’ve seen from the external and internal contributors.

*In my opinion, in future, most of the current commercial products too will enter into open source. What’s your thought on this?*

Dmitry: I don’t know whether more companies will be open-sourcing their stuff because not all organizations would want that. If the company is trying to establish itself as one of the big players in the space, working toward a leadership and credibility position, then the open source would make sense. Still, they might not be looking for contributions as much. If these three main points: community productivity and leadership, aligns with the company’s goal, they will open source a lot more.

*Can there be a commercial version of open-source software?*

Dmitry: Of course! If you look at projects with operating systems like Linux and Unix, they make it open-source and free to use. Still, they will provide consulting services for installation, maintenance support, and many similar projects. There are quite a few examples, like YouTube.

*How to contribute open-source as a tester?*

Dmitry: As a tester, you can contribute to test coverage – that’s one way. You would have been surprised how essential open-source software is for the entire world and how few tests it might have. You can find many pretty popular projects with very little test coverage. Therefore, your expertise as a full-on tester would be greatly appreciated there as you don’t need to sell tests anymore; people understand the value of it. They just don’t know how to write them.

*Which are the underrated open-source projects cooking up nowadays, in your opinion?*

Dmitry: One of the great projects I’ve seen is Alex.js. It’s a linter and easy to use that you can run on your docs. It will help you identify biased language that you might have overlooked.`},{title:"Sending WhatsApp Media Messages From An App",description:"We’ll use this basic skeleton Node.js and Express.js server along with the necessary dependencies and skeleton functions already created.",date:"2022-06-28",tags:["business-messaging"],slug:"/articles/2022/media-messages-via-whatsapp/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2022_media-messages-via-whatsapp_c4effb74.jpg",canonicalUrl:"https://business.whatsapp.com/blog/media-messages-via-app",body:`*By Dmitry Vinnik*

*Originally posted [here](https://business.whatsapp.com/blog/media-messages-via-app).*

**Prerequisites**

To follow and understand the tutorial, you should have a basic knowledge of Node.js and Express.js applications. Additionally, ensure you’ve completed the basic steps in our guide to getting started in the WhatsApp documentation. If you’re a business solutions provider (BSP), follow our BSP guide and ensure your application passes the review process.

**Make sure you have three items ready:**

* A WhatsApp Business ID.
* A phone number ID or test phone ID.
* Your system user token with required permissions below:

If you’re eager to see the final application, you can check out the final project code.

**Creating a Basic Application**

For this demonstration, you’ll use this basic skeleton Node.js and Express.js server along with the necessary dependencies and skeleton functions already created.

The tutorial also includes a request package to carry out HTTP requests as your application communicates with an API. There are two variables in the application’s .env file:

\`META_AUTH_TOKEN and MESSAGING_PRODUCT\`

After setting up the server, you can jump right into API creation.

Before you can send any media-based messages using WhatsApp, you must upload media for WhatsApp to access later. Media files uploaded to WhatsApp persist for 30 days unless you delete them.

You need to create a new POST route inside the routes/media.js file that you can use to manage your media. According to the documentation, you need to pass four items:

* Phone number ID, which you pass as a parameter.
* The file you want to upload, which you pass as form data.
* Upload file type, which you generate using the helper function.
* Messaging product, which you get from the .env file.
* When you create an API call, though, you only need a phone number ID and file. The remaining fields you generate using the helper functions.

You use the npm package formidable to process the form data. Note that the WhatsApp Business API has some limitations on specific types and sizes, which you can find in the Supported Media Types section at the bottom of the Media documentation. There are two helper functions inside the helper/validations.js file in the skeleton project to cope with that.

To upload an image, you need to initialize a new formidable form. Using the form object, parse the file and perform some validations using the helper functions. Next, perform a POST request with form data and a valid authentication token using the request.

\`\`\`
exports.uploadMedia = async (req, res) => {
let form = new formidable.IncomingForm();
form.keepExtensions = true;
form.parse(req, async (err, fields, files) => {
if (err) {
return res.status(400).json({
error: "Media could not be uploaded",
});
}
if (!files.file) {
return res.status(400).json({
error: "Media File is required",
});
}
let isFileValidSize = validateMediaSize(files.file.size, files.file.type);
if (!isFileValidSize) {
return res.status(400).json({
error: \`Media File size should be less than \${mediaLimits(
files.file.type
)}\`,
});
}
request.post(
{
url: \`https://graph.facebook.com/v13.0/\${req.params.id}/media\`,
formData: {
file: {
value: fs.createReadStream(files.file.path),
options: {
filename: files.file.name,
contentType: files.file.type,
},
},
type: files.file.type,
messaging_product: process.env.MESSAGING_PRODUCT,
},
headers: {
Authorization: \`Bearer \${process.env.META_AUTH_TOKEN}\`,
"content-type": "multipart/form-data",
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
});
};
\`\`\`

After adding this function, you can test this route using Postman. This is how the final object should look in Postman’s interface:

Once you click Send, you get the upload media ID as a response from the API.

Make note of the upload media ID as we’ll use it later in this tutorial. If you’re building an application with a data layer, you can store this ID in your database for later use. Or, your front-end application can store the ID temporarily in the variables or state.

**Sending a Media Message**

Now, use the media ID you retrieved in the previous step to send a media message to the customer. According to the API reference, you must send five items to the API to successfully send the media message to the customer:

* Phone number ID passed as parameters
* Customer phone number sent in the request body
* Type of media sent in the request body
* Media ID sent in the request body
* Recipient Type an individual in this case

The function looks like this:

\`\`\`
exports.sendMediaMessage = async (req, res) => {
const { id, to, type } = req.body;
if (!id || !to || !type) {
return res.status(400).json({
error: "Required Fields: to, type and id",
});
}
request.post(
{
url: \`https://graph.facebook.com/v13.0/\${req.params.id}/messages\`,
headers: {
Authorization: \`Bearer \${process.env.META_AUTH_TOKEN}\`,
"content-type": "application/json",
},
body: \`{
"messaging_product": "whatsapp",
"recipient_type": "individual",
"to": "\${to}",
"type": "\${type}",
"\${type}": {
"id": "\${id}",
},
}\`,
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
\`\`\`

If you run this endpoint in Postman, with the necessary details and arguments, this is how it looks.

After sending, you see the following output in Postman, which includes the message ID as well.

**Viewing Media Items**

Retrieving the media URL can be done easily with the GET operation and the fetched or stored media ID.

\`\`\`
exports.getMediaUrl = async (req, res) => {
request.get(
{
url: \`https://graph.facebook.com/v13.0/\${req.params.id}\`,
headers: {
Authorization: \`Bearer \${process.env.META_AUTH_TOKEN}\`,
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
\`\`\`

This is how the Postman request and response looks after successfully fetching the media item.

**Deleting Media**

To delete media, you’ll use the same WhatsApp API endpoint for media requests with the DELETE operation.

\`\`\`
exports.deleteMedia = async (req, res) => {
request.delete(
{
url: \`https://graph.facebook.com/v13.0/\${req.params.id}\`,
headers: {
Authorization: \`Bearer \${process.env.META_AUTH_TOKEN}\`,
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
\`\`\`

After the successful media deletion, the API sends the following response:

**Learn More About the WhatsApp Business Platform**

This tutorial is just one example of what you can do with the WhatsApp Business Platform. As you plan your next project, check out the WhatsApp Business Platform documentation for a full understanding of its media functionality and limitations.

The WhatsApp Business Platform can provide opportunities to engage your customers using rich media messaging. Building an API-based application allows you to collect and build a media library that your users can leverage to send messages consistently and efficiently, reducing repetitive work.

Check out the WhatsApp developer portal and start building your application today to see what else is available.`},{title:"Meet the Developers: Mobile Edition (Vadims Savjolovs)",description:"For today`s interview, we have Vadims Savjolovs, a software engineer on the WhatsApp Commerce Team at Meta",date:"2022-06-13",tags:["open source","meet-the-developers"],slug:"/articles/2022/meet-the-developers-mobile-edition-with-vadims/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2022_meet-the-developers-mobile-edition-with-vadims_022f72a8.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2022/06/13/meet-the-developers-vadims-savjolovs/",body:`*By Dmitry Vinnik, Vadims Savjolovs and Jesslyn Tannady*

*Originally posted [here](https://developers.facebook.com/blog/post/2022/06/13/meet-the-developers-vadims-savjolovs/).*

For today's interview, we have [Vadims Savjolovs](https://www.linkedin.com/in/savjolovs/), a software engineer on the WhatsApp Commerce Team at Meta. His team works on building a business API that helps companies connect with their consumers.

</br>

* * * * *

</br>

**What was your journey into mobile development?**

My journey as a mobile developer began a long time ago. After finishing my degree, I started my career as a Java developer. A year later, Apple announced the opening of the App Store for third-party developers. This news immediately piqued my interest, but I quickly gave up on the idea of becoming an iOS developer after I failed to install macOS on my Asus laptop. After a while, I discovered that I could create apps for Android in Java and joined a small startup as an Android developer. Since then, I have worked mainly in the mobile space.

Gladly, I found working at Meta to be one of the best ways to continue improving and growing as a developer. When I first joined, I went through a 6-week intensive engineering [Bootcamp](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.businessinsider.com%2Finside-facebook-engineer-bootcamp-2016-3&h=AT0RSXT5eT9f_Rbb9AKZ1Pli2fcmwmcQhD2OiWqigTMVh_mRbGRdnlYX5CAWIfVHXfAs3vtvmyU2A9sHeNwTNHGQBgOtUI5xVISXixMAau5ZSEGcFNUxMrwMu6vW6gXZvmHF7q8t3Pp_Lvx0fd4M5hFLep6ytb6fmFapWOj_LLM). During the Bootcamp, I had a chance to learn about the company and expand my technical knowledge beyond the mobile space. I got to work with a wide variety of technologies developed in Meta, including several open-sourced frameworks such as [GraphQL](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Fgraphql%2Fgraphql-spec&h=AT2SUv-ITHIJW2GDSeT_QyOhKnQxpCKibgPFBlcPVuPFCai71i95stZk61fYrVky7pnIUDhV2shr9cSFOP-XuG-t0gXHduw3PKBDrACKgKQf6jJ9jDnLaHCtUbWgqVGNobqmVXm2VKOTcG0HTSg7KJAPWcHxxLihqWnBsGwZBB0), [React Native](https://l.facebook.com/l.php?u=https%3A%2F%2Freactnative.dev%2F&h=AT2IEc6MPL85uqgbH6Cv130OwHJ1wqsE8nvMqzzyZ496DwlusgqOdM7NvtUrrb8dFIdOY4XN6In40SvxLEBIa-Uq759VD33ofhTGKc6vOETsSRrtRZtdse2AuluYRghHo1bpEqV-MbIe6hXS2uwpdVFXyrN9vk7z_dGmOJSuxDg) and [Flipper](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbflipper.com%2F&h=AT3nTLx2xvl9ZpSD4MP7G_7EDD3OGmNp0mgyud2MFdgGJwUe05My1ghyX_yE3kTbHvl83LP3XaYLYBQpid8qNCzU0sUcJ6G56ArTn5WHGTd2bBFI9cXwS_5c2W3CJpAspV_46opCq6t29gTsqwHU6iJK6Ak6HvlAH6z0dTKX2XUqmyTHatwsdyAe). Since then, I've been using projects like Flipper daily. If you'd like to learn more about these technologies, here are some videos that explain [GraphQL](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DRDYYVGAKqqQ&h=AT2dGpa4SvNujiJY9GMFMYI2mHAR8b6ZY78fRpB4TcGpagPiuFIhrrhjNki8QYyyjWUPocibJJ1s52jptkNlAD_CoHYa4eS9wCze_At19tGOKUHK69u6vwIV4kkMwf2fOBesSobPXRjurAmG9nQ7-u4lASjoFHHqb3OAKh6sC10) and [Flipper](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FtvqZQVI7gKw&h=AT3ZGSM2BhwSRNau7-hnnV8OztXJUweuIulcEA3kQx36E4JeAi9z3mjoQbMZT2jBZHaqXv4a3AhXtYLdce63s78fqdBqwz--wziFfw1uXcs1ItcbFcVnud7N454vIQE5eWLaccoZDmUyr40HJw6v64ipo0QRyOvZ9qdlZ_YG3oQ) in beginner-friendly terms.

**As a mobile developer at Meta, what does your typical day look like?**

One of my favorite things at Meta is that there is no typical day, and every day is a mix of activities. Sometimes, I primarily focus on new feature development. Other days, I might spend my time interviewing candidates, mentoring engineers, writing docs, reviewing code and organizing technical talks.

While we believe that development work is essential, growing our team and making it a welcoming environment is our priority. As a result, here at Meta, we take interviewing very seriously. We're responsible for making sure that we hire the right people, and we're also committed to making sure that candidates have a good experience. Many of Meta's apps, like WhatsApp, are used globally by many people. Hiring great engineers that represent [our users](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.facebookcareers.com%2Flife%2Fin-conversation-with-kojo-boakye-a-passion-for-connecting-africa&h=AT03BNeWWwFSux4x-_paF40CNPSNtm4_0UQlKqv98T-T779cDne-_djXskUMw49RYvTtaUVKn1jY3ZwNN9OMRN3Yw-qzvgiBSsx04hMPx79CDvb7ycrT0_gexiaHYQXjMxdQw6IQ2-4q9shHcxgvPAIqV-7UhCuFWc0T4OZD1w8) helps strengthen the quality of our apps.

And once we hire these great engineers, we need to make sure that we get them up to speed with the codebase and engineering practices at Meta. We have a ton of internal wiki-style resources so that anyone can build on the knowledge accumulated by thousands of Meta engineers over the many years Meta has been around. I get a lot of questions about best code practices, so I contributed to a resource for this to easily share this knowledge.

Within the WhatsApp organization, we also organize a tech talk series. It's an opportunity for all people working on WhatsApp to share the work they are proud of and share the insights they've learned. It helps the hundreds of people working on the product feel closer to each other's work.

**Can you share what you're currently working on?**

My main focus is launching a feature that allows users to rate messages sent by businesses in WhatsApp. This feature is one of the steps towards improving interactions between customers and business owners on WhatsApp. It's exciting to work on bringing people closer together and creating this [feedback loop](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFeedback&h=AT3Xon7tzcSAJ024Xt9OURsBkVXw7X7Dr9Lcv1bYCHZvGR7EHyjFVVBK9Sby2Z0E_HNLVqxrSELbuTgriC7uCwG2yC7IIjZUWoUnBjRets-4AY4rs8duzlSeXajomhmvUymCC5SbCMoM-Fq6oNsvVKoCXME4gefmpn6fVTbqJwc) to help companies improve.

Additionally, I also have my hands on several other engineering projects. I'm helping an internal infrastructure team migrate to a new [dependency injection](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FDependency_injection&h=AT3h2ZETWVeZn4tPznGbYnRn5b-gl3LcVHIdrrign-EdzTrT7_C8EfhUMHj5wI1PMZqxKhJoXmp8wG1taWJQpc5qu90Skgt2AUG7WaW5877X1PWX4ttA3BDB95aTIdK9HeN24od5Dq1U6y7MvovmwYlRky-2LX2JeprKY4qW8a8) library. With the scale of Meta, any significant migrations like this become a challenging problem, but that makes it a fantastic learning opportunity.

My team is also very involved in the Kotlin adoption and modularisation of the WhatsApp Android business app. In the past several years, I've come to appreciate how concise and readable [Kotlin](https://l.facebook.com/l.php?u=https%3A%2F%2Fkotlinlang.org%2F&h=AT0d0jScUDiB5YB64j2yHmSYjoN_M7PtjCWWscOaSmaJ9wndvlUR-9gbI2b27wBGk0KpdIzwshyTXvsH4-2zp4ApyAa1Jbc-OlEF10BHNps5om9Kj2ldSwBKZTGTn1LJS8sg1ziKVpV860A37DCFayzhoe-0FJ4W0Q23F5_1_bg) is. Being at the frontlines of using Kotlin across the board at Meta has been amazing, and I am glad to see how smooth this transition has been going.

**Could you give us a behind the scenes look at what's new on the WhatsApp team?**

As I mentioned, I'm excited about the rate of [Kotlin](https://l.facebook.com/l.php?u=https%3A%2F%2Fkotlinlang.org%2F&h=AT3o2Zk4bNBXfgLb5bwst1E4ljwVn-OHHmCcC_ev2M5jJVoR8Svs9XBH619rLqHScSJ5zyV05EBaeer23P-FSZBbgVmTAaCxfSFvoaa5VNoru4YxG1m5HltrodujWKK2YM80sZ-GohTZPCsC5NNWVo0KhWZs_mbjJwscI3F8nPY) adoption on the WhatsApp team. Adopting a new programming language is never easy. It's especially challenging when you consider WhatsApp's scale and the codebase's size.

For context, WhatsApp joined the Meta family through an [acquisition in 2014](https://l.facebook.com/l.php?u=https%3A%2F%2Finvestor.fb.com%2Finvestor-news%2Fpress-release-details%2F2014%2FFacebook-to-Acquire-WhatsApp%2Fdefault.aspx&h=AT2vY45tZovv_yOS7Q1dr1FiGR37P_AFf4sNdsp77JwBlwuXHuaNW3dwjf1QaPVlgrYMGCNyEAK1XOcRD5wTFrlq3L1MMmjSm-jaFJjoOafV9H77IOyRTgl5-HgG3NsVw2bi-hppseqijErtYiTH7WS2sexGV993Vm_cvW9VmDQ) and has always had a culture of keeping our code light. This culture means that we try to avoid large third-party frameworks and libraries. This approach has allowed us to optimize every app metric like [APK size](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FApk_%28file_format%29&h=AT2gOT34on8ZrNvp2QFss3nrafiQdRqE3H2TYpQBrYgTV8cHDfOOHD8B2rJ9yWihR6kJqpSs2OGz2vuD9Z7dlmeVhWmOd7E_4kzd-GHZ-HlEtgrfKALfB6qzCwcip23nkkJycI3vDhp2KNF-2E4qc1sULc5xjtGnN5Xahp6W1OA), performance, battery usage and more to ensure that even users with low-end devices have a good experience using WhatsApp.

Mobile engineers at WhatsApp put a lot of effort into evaluating how adding Kotlin support would affect our users to improve these crucial performance metrics. Above all other benefits, one of the best advantages of Kotlin has been increased developer velocity and code quality.

All the Android engineers in WhatsApp I spoke to are looking forward to developing new features in Kotlin as it provides many benefits and improvements to the development process. I like Kotlin because it has null safety, extension functions, sealed classes that might help handle state changes and excellent collections support. I have recently written [a blog post](https://l.facebook.com/l.php?u=https%3A%2F%2Fproandroiddev.com%2Fsolving-coding-problems-with-kotlin-collection-functions-3d2b1ef7fe2c&h=AT3fwx0SK4nn2xJJxacLl1PlkGU_rHyeVE2sHKg52xwUaAuOFYZc-OBcJUPNndTWb_qDlkssEKv_5_BiVzT1dBB87c1LsTIjndg8Bb4mVDrocVzUPTBeavPRS9sUhlxrSqRDfUVwNe0BuudXT3U4619f_igUnbGphJ8ce4WwF4Y) about how Kotlin collection functions might help you solve coding problems.

**As someone who has been a mobile developer for many years, what kind of trends are you noticing in the mobile space?**

I like to see how the mobile space grows, evolves and gets more advanced every year. Developers get better tooling, programming languages, frameworks and guidelines. It's a dynamic space, and there's so much going on---[Kotlin](https://l.facebook.com/l.php?u=https%3A%2F%2Fkotlinlang.org%2F&h=AT0ApVdUIBC0Ij1BX0KjbhyYx2f0l1dE7EuyOg5SMGtPGW-oEpgSOvMwe_V8eUKNuN2tmVr-ZC8MXUXtB6H52eekA8en9IoHKsX-12w9MiaAUStXSfvDyzgfQLitcMSmALNMhU8TfdwMDpQZpJUEE2VKP1kfil7XegobGZDJTjE), [coroutines](https://l.facebook.com/l.php?u=https%3A%2F%2Fkotlinlang.org%2Fdocs%2Fcoroutines-overview.html&h=AT1ObGwNKW8C76zrlLe9KQGHg2N3T8JPMSn8wh7mRY2asGrm9-Lbrbe2Lh60s-6V4mScYY2h8NLjTK4r8pNSwhz2BpqVYIINGltReBNLBBj0I9967fLKPO7g6AoCltSLZjdN416wluSMhd9I8FfVw34tAcbOkMBPGKO5xASjjNQ), [Hilt](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.android.com%2Fcodelabs%2Fandroid-hilt%230&h=AT39KSAKvsKyngKapTF8K_G86JYkzzCQOwsfW8DNCl3q4SJhI1qksgbLg5cgnXHUGad6p3gJp0jjl2kg4_m6ccxSbzC071CGWCH3Sv6v6A6WYW6BC_glQokn1dYqIlDz4h55VcbbcmE3a-U_1BRxQmgX70ijhUCWNmoZbVx6308), [Room](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.android.com%2Ftraining%2Fdata-storage%2Froom&h=AT1nvUps0n2LIicWJZmAku-i40yuLaO8rOc8RKTIRetokHxfnteXDT8W2YoPY1KzTTNUjeQZRR31q7H16g7VIVAIrkJ9VcGLjRx90VSl__ti2mDHiNbty9r22H18P34zC-agUpk36Bu9lY7S1uN2vBg7vzLFLMJxlGJCBxZBqtM), [WorkManager](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.android.com%2Ftopic%2Flibraries%2Farchitecture%2Fworkmanager&h=AT1Hm1nBz_UpmSviliBx9CO3DQuYkvZlSUWm2UXYTpLoi2mQG5qA4PlGXvVZi1n2tuFxTc6csyhzE692UFm-yUavK4eecs0yVmlHNEH_A8Ue5NMxUllz3xl7dLdv4o49ol8WkzdVreFLNUlBascQyhixDa4cX1Fv4B0oF_RjgXk), and many other projects. Sometimes I even struggle to find the time to read through all the updates and release notes.

It's incredible how many great tutorials, courses, blogs and codelabs are available today to help people learn. It's very different from what was available eight years ago when I started my mobile development journey. This culture of sharing knowledge opens up a lot more opportunities for all.

Today, my favorite resource is the official Android documentation, where people can go through the tutorials and guides at [developer.android.com](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.android.com%2F&h=AT1EJyJtD_huniEWKJaMBm6F42GmzGA3d-J9PGziGy1_u2uo2ZRxF2TFRDZ98-SRg_oPgKIUDSte-gAwHq0Gf04JvhFf8aQmIpPn4uCipzqMjiCnHn0AC0Xs6K565zwbAd5hwBzd3NGWT4QbgPCRD0YEXjIbf-9-wHFMAmePXkM). There are also a few good free courses on [Udacity by Google](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.udacity.com%2Fcourse%2Fdeveloping-android-apps-with-kotlin--ud9012&h=AT0vUUi4DoDNbzq6dqgffIQie_SUNg7n50e2eZm1acss0RwPcJz4CdEhlUAFS1wH205G9-BjZLZciZXelNIgkF9k6JtsvA89cjKd0b-MDruVzg7o6vNTzNAaFV3IZo0nhNXheMlD9o00s3-xTls5u--DHneK2KG5YRJqWDfP3vM). And if you're still looking for more, there are [codelabs](https://l.facebook.com/l.php?u=https%3A%2F%2Fcodelabs.developers.google.com%2F&h=AT0JmK29KdJF6OXo4ykhb-RXCIXKlQpbMV7OuXFV6uIF5tSBQmky22Wv-mtQ3aCV-gxfynjWjeaWHhM79NQJD1xkgwsxKIjzKQvOylRC9WBKQMCuu7PUfLEfjMx6r5IJPAGrlcqR17fBq4P65_vYPY-ZQJraEBD5frXWAQr1hvI) to deep dive on specific topics and the [Android Developers Blog](https://l.facebook.com/l.php?u=https%3A%2F%2Fandroid-developers.googleblog.com%2F&h=AT1iIJyFk3mNsNUbp0OVqnThHP7Vhr7V-DZO5h72Z40GV-QMlJUexCqZznPggROT4V7pw_kUBphV5U-NVyWF-JA-hczWfBYq62GjRp94qigiOm8sIhpiJ1crwOVfLzqhH5A3n8leMF5R3E7HaxClFyUaiy94eebtlSYlqlICDPM) to keep up to date with the news.

There are also many beginner-friendly resources for Android developer tools that Meta has open-sourced. Off the top of my head, we have [Fresco](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffresco&h=AT0uOVTBqcUa_lM7ioSIsd9FpI07kwBOPflQJ_aIVxORkE4dFTd09uVuA4T6kFjrMCOeRf7RRHwsNGWqVhRQPIiWdcuU1KRJwBdqvjiquIWttyL-pohTt5Mv1AcSStOe-xYP8B44coAKMbK5llg5NGb6pAVP6Dwt-MsuuiAO21s), an Android library for managing images, and [Litho](https://l.facebook.com/l.php?u=https%3A%2F%2Ffblitho.com%2F&h=AT1c7c0v1AhQhwcwuG-dbsmumWDzBLDMCjPXH79_MSihdraLpAKIjbz9cLe59fybiECOjA6mAUufmU8gFvEE-HbBy3zvbpQpXYR1vAIFW6XeesxBjFhMYjYVbdy-BWFUPlInm92FU9AcmY0nI3U7KKSlS_TWS1gDELVV-rbqMns), a declarative framework for building efficient UIs on Android. The Meta Open Source team even has videos that explain [Fresco](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DXLwlGoxrg4M%26t%3D1s&h=AT0eCItfZQWpXHOJ8sOEcEMwXOnibHyW8S9lCRLpdUUrbeIv50VLEX14NMHnWHl6JtpofWr0crTHKXIcYpUps-a-dl3YL4D-iWBnLAEyWyarGDn5kq9MG0_EZbjQfO88YdakLJUV4RkDnC8aj_09ph0MUNKeSClQWiVtC85rjdQ) and [Litho](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DRFI-fuiMRK4&h=AT2215fLB0LvBAySupBqDOuNTcXeW2rFzoruHe5091kKF74_Zln_qy2e5cSPMcGI6JfuwxNuMubHHJLxocQSqGXzCyh9sTNJ2CRmH9ZuETJQ1hS0Z53DDQMSBVcrEknLA-5A5oKszg0GeMFTg_DFH5Ld-YQgHJHszVJxdoJRTjg) in beginner-friendly terms.

</br>

* * * * *

</br>

To learn more about Meta Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT0sRzJeAffsnRHNOLQhe85WLQnSgw4_pCsxlbBl9YO7FrLW4rykENhw2lK90MC3ZfR0olaESdV1ZiEJPp9eED-d9xFUQtsJ5pHTJMUDnf5ISQjI3S-1fEFrnKrhz9uEvVsbil1vv1kMi0Ta0F2JKUrxElHtOiqjSd0F6BVSd2I), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FmetaOpenSource&h=AT3pZWZABnNaOPY9U4Ffa36Ev3Qt-qXQmz9gLwBGO-jJmkCB29KQkJQL_iDn0Bc7LvU_mGsJb3em6xlUtP2V2-SBeKL6fysGy-euLrJAPT6QHpWCo5FWJ-_HBSLRau98OJ_VBIw2qKfMFDh6PZoZ_iS9RgwIKkh7rjJgvOoXKC8), [Facebook](https://www.facebook.com/MetaOpenSource) and [LinkedIn](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fshowcase%2Fmeta-open-source&h=AT35Cu3qJzZsLDLxI0eUCMve67YiGQOjvGOpJC9A_o03VHWx4fNaf7VxBbRleS3wNSm1oZTLEWEIt_fsBaWb28znDEiF_tFS93_tCdSgkIHxtJELqFpisnRiWdqUM0R9r8KzMU3D2YfQtwaFhLFR10PW9uEdAcTjlK-Ufk0gVks).`},{title:"Managing Message Templates with the WhatsApp Business Platform",description:"This hands-on tutorial will walk you through the processes of template management — including creation, deletion, and customization.",date:"2022-06-07",tags:["business-messaging"],slug:"/articles/2022/manage-message-templates-whatsapp-business-api/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2022_manage-message-templates-whatsapp-business-api_30e644fa.jpg",canonicalUrl:"https://business.whatsapp.com/blog/manage-message-templates-whatsapp-business-api",body:`*By Dmitry Vinnik*

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

\`\`\`
category of type ENUM
components of a type JSON array
language
name
\`\`\`

The components parameter defines the body of the message template. It accepts the following sub-parameters:

\`\`\`
type — of the type ENUM of HEADER, BODY, FOOTER, and BUTTONS
format — of the type ENUM of TEXT, IMAGE, DOCUMENT, VIDEO, LOCATION
text — of the type string
buttons — of the type JSON array
\`\`\`

Now, you have a text-based message template to greet customers and a media-based message template to send a PDF — and as per our example, these would be perfect for sending travel tickets or itinerary confirmations.

**Creating a Text-based Message Template**

First, you need to create a new router in routes/messageTemplates.js:

\`router.post("/messageTemplate", createMessageTemplate);\`

Then, use the createMessageTemplate controller method, which we’ll make inside controllers/messageTemplate.js:

\`\`\`
exports.createMessageTemplate = async (req, res) => {exports.createMessageTemplate = async (req, res) => {
  const { name, language, category, components } = req.body;
  if (!name || !language || !category || !components) {
    return res.status(400).json({
      error: "Required Fields: name, language, category, and components",
    });
  }
  request.post(
    {
      url: \`https://graph.facebook.com/v13.0/\${process.env.META_BUSINESS_ID}/message_templates\`,
      headers: {
        Authorization: \`Bearer \${process.env.META_AUTH_TOKEN}\`,
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
\`\`\`

Below is a sample request object that you can pass to create the message template. {{1}} is used to pass variables. Note that {{X}} is used to define the message template variables not Postman variables.

\`\`\`
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
\`\`\`

The successful API response returns the id value, representing the template ID.

**Creating a Media-Based Message Template**

After you finish the text-based template, you can create media-based templates just as easily. These are flexible and efficient means of sending documents that a customer can access immediately.

The template below will feature a HEADER that will include the attached document, a BODY component, and a FOOTER component:

\`\`\`
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
\`\`\`

Note: Before you can use the message templates to communicate with customers, the templates must be approved and adhere to the Message Template Guidelines.

**Retrieving a List of Existing Message Templates**

Now that you have created the message templates, you can retrieve them. To do this, make a GET call to:

\`https://graph.facebook.com/v13.0/whatsapp-business-account-ID/message_templates\`

Note: The API version can change. Ensure that your URL is updated accordingly.

Next, create a new route in \`routes/messageTemplates.js\`:

\`router.get("/messageTemplates", getMessageTemplates);\`

The above getMessageTemplates is a controller method that you can create in controllers/messageTemplate.js. See below:

\`\`\`
exports.getMessageTemplates = async (req, res) => {
  request.get(
    {
      url: \`https://graph.facebook.com/v13.0/\${process.env.META_BUSINESS_ID}/message_templates\`,
      headers: {
        Authorization: \`Bearer \${process.env.META_AUTH_TOKEN}\`,
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
\`\`\`

A successful response includes the templates you created and WhatsApp’s sample template.

**Deleting a Message Template**

Similar to your GET route, you can also create a DELETE route in routes/messageTemplates.js:

\`router.delete("/messageTemplate", deleteMessageTemplate);\`

Now, create the supporting controller method in controllers/messageTemplates.js:

\`\`\`
exports.deleteMessageTemplate = async (req, res) => {
  request.delete(
    {
      url: \`https://graph.facebook.com/v13.0/\${process.env.META_BUSINESS_ID}/message_templates\`,
      headers: {
        Authorization: \`Bearer \${process.env.META_AUTH_TOKEN}\`,
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
\`\`\`

To delete a template, you must pass the template name as a JSON body.

For example, the below screenshots show a successful Postman request and response for deleting a template named demo_template_user:

**Sending a Message Using the Template**

Now, let’s use a message template to send messages.

First, make a router and its supporting controller. Inside routes/messageTemplates.js, add:

\`router.post("/sendMessage/:id", sendMessage);\`

In the above code, the :id parameter is used to pass the phone number ID. Here’s how the controller looks in controllers/messageTemplate.js.

\`\`\`
exports.sendMessage = async (req, res) => {
  const { id, to, type,template } = req.body;
  if (!id || !to || !type || !template) {
    return res.status(400).json({
      error: "Required Fields: to, type, template and id",
    });
  }
  request.post(
    {
      url: \`https://graph.facebook.com/v13.0/\${req.params.id}/messages\`,
      headers: {
        Authorization: \`Bearer \${process.env.META_AUTH_TOKEN}\`,
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
\`\`\`

You can now create a request object in Postman. Remember that you will pass one parameter — {{1}} — in the Header.

The Postman request body demonstrates the text-based template we created.

Note this code snippet from the above screenshot:
\`\`\`
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
\`\`\`

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
With this tutorial, you have just started to explore the capabilities of the WhatsApp Business API for creating simple but powerful message templates. The ease and flexibility of the WhatsApp Business API can help any business improve their communication systems to help turn a customer into long-term business clients. Time to take advantage of the opportunity.`},{title:"Meet the Developers: Mobile Edition (Pritesh Nandgaonkar)",description:"For today’s interview, we have Pritesh Nandgaonkar, who works on the WhatsApp Apple Companion Team",date:"2022-05-23",tags:["open source","meet-the-developers"],slug:"/articles/2022/meet-the-developers-mobile-edition-with-pritesh/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2022_meet-the-developers-mobile-edition-with-pritesh_c1b02acb.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2022/05/23/meet-the-developers-pritesh-nandgaonkar/",body:`*By Dmitry Vinnik, Pritesh Nandgaonkar and Jesslyn Tannady*

*Originally posted [here](https://developers.facebook.com/blog/post/2022/05/23/meet-the-developers-pritesh-nandgaonkar/).*

For today's interview, we have Pritesh Nandgaonkar, who works on the WhatsApp Apple Companion Team.

Before joining the WhatsApp Apple Companion Team, he was on the Mobile Dev Velocity team. He worked on open source projects like [Flipper](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fflipper&h=AT1atRRwOLKZgKQfU1wC82PK9XC6ek-W_UuHQzkwtXWYecuHpQJKryBNhpS489mirxwwjFkh0fHG71T0hv8JK8ZytBNwqbSLRSTgUrVtsdMAjmWlzgbxbNtuLZQ-9O73Veq4M-Kkd-PjKSYjPYq29ztl8Oltzo7xkvPtLdZuf0w) and [Yoga](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fyoga&h=AT0x7DfkwYs5BKdVRn4nyF6Os8vYFm7pQGiUMukzKWlLyYd1fzBr7_nPUEOcpvwej-VoKLRJaluJV2hQxF8bE2-dTSnqZhxBnGJiIsS6LZZ7reBJbDf51RIRPGI06bUhOl4VXM-KBD_Ao9O9SPptnNMO9ysYQWjHEITIYR6DPPo). Although he is an iOS developer at Meta, he had opportunities to work with different programming languages like JavaScript, Rust, C++ and Java.

You can learn more about Pritesh on his [GitHub](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Fpriteshrnandgaonkar&h=AT3QO6RMmfOlMlhGL12rJBERs9X99r8NE4bsYxab-cqKb4T2xCJj6Tc3M2ZLaNqmbG6IWUvLGwExu65eJM89zYGTEBsaXybuo3vZiUsGPHvpca4iM3z2rMoUCKpnajyy7ILdWjcizsSbQV97MOehyZ2-2B82V5YfngH-Xf2ELm8), [LinkedIn](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fpriteshnandgaonkar%2F&h=AT0SJtN3WorKWrZC6srEwSxfJ5FGqxy1gpIASTqr7oODLx9ywAtOANkttey85MDo_TAI0-n_e4CcCVR7GqSM20iSE8icbdPHQ7a1j7Kflo5T5Z13IAkWcl3v8FuocndybHESvKlDWCeUPr6jUtds7Idw4-gC1Gk-h7r3Q7Vt3gI) and [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2Fprit91&h=AT15VhvjYCJI9Al787MLZFvgIwk7WT-gRYJc9nuLknxmRnPM7i9IkeyG-X_3xi9KnCTy58ZQWDYgpe7CiDgsC2y23hgUF8eQywllNPZCKynO_Ac1q3uItdkgiVip1e_PgvC_JMpPmQTAlwl00jZYr9Hf2u4dwlFIKOKT6ceSRHY). If you want to follow his non-work activities, he also has an [Instagram](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fprit_nandgaonkar%2F&h=AT0Rn-8hjkJ0DaGbba55m5FkCnvMoojYNwj2DmIGr9mGN_6O7hcmcvp3YSi4JjMrTZ-QPGraTT4KBtapv0wUbJnCUhusYpgMC1UTklaTqCS-Fc5XZERpC09d8tPGb4raiRV5W350kf7riGKyz4kK0Lw3YVSTZlY8GQ43fvfeawI40qujMDnQAgah).

</br>

* * * * *

</br>

**Could you start us off by talking about your open source work before joining the WhatsApp Apple Companion team?**

I was a core contributor to [Flipper](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fflipper&h=AT2rGEnd16dMcU68q_W-kiFcqqcxetoinkgybavhAwvYrtINWzBTM-BnhA4FdwQrd7GlT3W3Zo5HwMGems9ggNmydqtb_IdzPEH02gWuM85yNtnEPA4q9c2IRGfGM5VHm8wBT1HXOggqDOEnZBLqvnz-X99FqF3PvnVDAbfgMNo), an open-source, extensible mobile debugger. Ever since Meta first created Flipper, the project has been used heavily. When we decided to open source it [back in 2018](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2018%2F06%2F11%2Fandroid%2Fflipper%2F&h=AT1jlNTMAeEUtKp3XfLv5gIBITs2Voc6dl3_DtlFWGftToEo6S_cuFhs0rWuSYQZ-eiy89ic7i2filAAJruHiPhQ4uaVVmhAO0x7zOalqE9xXB0HMxC6yDsm16IBAfF35-KMNbHZfNOvDp6rOj_yXcBydQqIm3MrsiS7_9-c9Ss), I worked on the iOS parts of the project. This work was challenging because Meta has standardized infrastructure and engineering requirements. In contrast, the open source community could easily have thousands of different configurations in use. By open-sourcing the iOS part of Flipper, I needed to make many changes across the project codebase. For example, I had to ensure that Flipper was still compatible with internal Meta tooling like our build system, Buck, and industry-standard tools like [xcodebuild](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.apple.com%2Flibrary%2Farchive%2Ftechnotes%2Ftn2339%2F_index.html&h=AT2mz_ZKnD9IzLUdDaelpLSg2fDN0K_mKyRVhny30H3DRUTvVEqMqNEQjpsJJFTIT16Uz1gD-klsG8YJxraT06lOf5UWqDZjuueHjjz2-LVmmYvNAocj9C5lpX5NeuzXJJuWyEsp_NryNkqG5QUbX5f0aoEbt3NRWUatphXjGUw) and [cocoapods](https://l.facebook.com/l.php?u=https%3A%2F%2Fcocoapods.org%2F&h=AT1d0wXeyWYRVOgQFCquDWVgZppu2M9Hk0f9k_UE0XuYeZJa2QYwNMiWZe7HWpBo77nd24MQq-NO6jzFNBd9OmJNl_Co2CiwpHOwN5bIkJu5nxDT3l2Gg2LzH6nUfQfkX-zhsRXpZ51wxIrW74u7LHl7GyTYxMXGh5vOs9u0FcM).

In addition to working on the iOS support for Flipper, I also contributed to several core Flipper plugins like [Layout](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbflipper.com%2Fdocs%2Fsetup%2Fplugins%2Finspector%2F&h=AT23i3QO2txhqggfqZls17Hsf4I0XrLyJThv3KLzI-6PkSxnL1AaztB81S87g812m5JtaPRItc9BYgPTdFHJGHfbu6cbZl__1ld2qNI8BefCd-AD-tiKrXEwndLnjlZ2PqIJNYc8NEWkMkxjHIlJTHpNIs8TdgttE4R8a2tZ094), [Network](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbflipper.com%2Fdocs%2Fsetup%2Fplugins%2Fnetwork%2F&h=AT1LB48w_KNXQGWiOdCy1BJdWoFfMwQbH0BsOLypENOqTaEG_A_MU2hpPZMTH8pJp-anTzrS-9E3j9S4xY174vN9hA6EwmqKtHjTdks9FiCnf14rqQvHXiYjuFV7T7d2km_3y2PLyHHd--w0XbS3bFWyYcFnEPwqfd-0kK46K-U) and [Crash Reporter](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbflipper.com%2Fdocs%2Fsetup%2Fplugins%2Fcrash-reporter%2F&h=AT3bmajVL8-gL80r1GOBNxxLXfuQgCldmLPbVdrMnKoG_XelIg_DqwUdOztYRNWbwDyUU28ptzeyResi4_-MS0sLXohmApmWyuO2Ztg4B920EfD9mQNDIfh5LP8O7OYO7o3JGOXfjPb3YGdJmLvCt6g1u2I2BRujkd3IwBVniHU). These plugins facilitate the most complex and yet the most common activity all developers participate in:debugging. With features like Crash Reporter and Network analyzer, engineers can observe how a particular bug occurs, identify the core problem and ultimately fix it. If you're interested in learning more about Flipper, here's a [great video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FtvqZQVI7gKw&h=AT3q_GTMRPoFL52hJebrsRsKyLOSqM2_zaS3fgX1CnRRcZQ1XrpYc5__cwA_UywCI228YPyzRqYXUVorT-wPANZs6y0a3ltawxMriRlBalbExuzyvSmYIEZ_xunPKbh4x4_A-i1RCwooM2K12B1ycS71qZimLQkcfypvbco4mJY) that explains the project in beginner-friendly terms.

**Is there a feature in Flipper that you're particularly proud to have worked on and can talk more about?**

One of the most exciting parts of working on an open source project like Flipper is that I had an opportunity to step out of my comfort zone. There were many instances where I deviated from conventional iOS developer work while working on Flipper, which was a great challenge.

One such challenge was to work on the platform-agnostic sides of the project. Since Flipper is a mobile debugging tool, I implemented many mobile-related plugins, such as the [Layout](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbflipper.com%2Fdocs%2Fsetup%2Fplugins%2Finspector%2F&h=AT2wvkbJ0EGwRqjubvR6O_-3v46obDHG2ModEeI4FcdxAL3v2_1bpdl-Dm08FkmzpjO8ar0mEmk6oay3ivU9GstEXqF0RIdfWPkpEsxlB7UDZK7LxQXBqyLBcdW3YaahOW8q-ssfNh2yBv_2fFwcjBo7Pp_LuRMmMenOp3I6nsQ) plugin. We designed this plugin to display the entire layout hierarchy alongside its UI and Custom attributes.

After sharing this Layout plugin, it has gained wide popularity internally and externally. One of our goals was to ensure a great developer experience. So we designed the plugin where a mobile developer only has to do two things to set it up: first, initialize the plugin, then set up the [UIApplication](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.apple.com%2Fdocumentation%2Fuikit%2Fuiapplication&h=AT30QeqKuBqCaNr68-X6vZ3q_7iHuXjCIfQQSoPKca_Rgf-a1cyzj4SvLXGCo8ZEyh3C7_hnXm-d6Nvb62o5U7ECS8bcL27xirvwOBU0Z306TJU1emVqkR4jSzOqxD_qLYEKNPZwLpynAyLHn-KDGfSsRbHQKgM0_weccCrAo9A) and [LayoutDescriptorMapper](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbflipper.com%2Fdocs%2Fsetup%2Fplugins%2Finspector%2F&h=AT0nF63D9bxUt8WDhjb1WJwSMmIRrrzNdfsGI3y4ldqxcSKeDFH8BHnjJKX4r4QC0NyMeWNCA6NPC4tCpBZE1XbPFvhOIbHc40APctOs4v0N267vXGMPfZEkuiq4FG49Tk0YxutVpXVa3ZvTOUowZhZt0GIX8am78G2rZv4gDPk).

Although we originally designed this plugin for iOS, the plugin's architecture allows developers to make its functionality work for Mac apps. Developers only need to create a mapper for a different node type, and it's ready to go!

**Was all your open source work at Meta dedicated to Flipper?**

I also worked on [Yoga](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fyoga&h=AT3Av8LsbUDelFy5RYhNsw2l86hssZAtEpnsFp3GuExzRLzYjzDIwM4GW2IeTjgf1sY2gfTOYSiExI7XAhL0NmQO3iYc7VCCrUmQAhQqKUVqObOUFB1qOCNLnoDfKLakELaaZPx_H8veqoRbL97E0Xmc6mHsbXLXwWjma1PoJHQ),a layout engine for rendering flexbox layouts for Android and iOS, several integrations on [ComponentKit](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fcomponentkit&h=AT0jt1op_F989gF9FastZ8PKZkv79I_PyC4wUMlmDD5vrAXe2ggRQy60HeT5aElncjOde4deuHMnlMTb7uwQHlst62Kt6GuV0A-z87yv9vAUxVNXG5fftcOe-4wS3OfaL8c16xku1culVJzFGSTbWnN6w2KNg0_Se20U-4Ul1vc) and a layout plugin for [React Native](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact-native&h=AT3towzoPp9W3btlCLtTaebqVL67P7m3PLeFfjuCW9h-j_I5hDhaR4sHcunMhvUwmWk76g1KLiHGDFi2lhKocG3HShndjcHsUo97GcX5WpqfS3AiGWvaCSPY3fahRVYjt31W2rTYQFx4-krkbsJ1i7BAs-FJIslu7WqeWs6CLVU).

I love how my job at Meta allows me to contribute to open source. I spend my work hours working on public code that benefits developers everywhere. There's something special about seeing developers build their projects on top of the open-sourced efforts I've worked on. It feels great to know that I played a small role in making their projects possible.

**What has the transition into being a full-time mobile developer been like?**

When I was working on the Mobile Dev Velocity team, I primarily focused on the tools to improve the developer experience of mobile engineers at Meta. While it was thrilling to work on plugins and help address my fellow developers' pain points, I wasn't working on anything external user-facing.

Now that I'm on the WhatsApp Apple Companion Team, I'm working on an application used by billions of people worldwide. It's so satisfying to work on new WhatsApp features and then roll them out in an application that I use daily to connect with my friends and family.

My team has been improving the WhatsApp syncing feature between multiple devices. We noticed that this could be a frustrating experience for users who want to access their WhatsApp account from various platforms.

We are working to build better ways to securely sync accounts across multiple devices. Still, it is a challenging problem to solve. While we focus on syncing things like messages, read receipts, media files and status broadcasts, our overarching theme is to ensure our users' security on WhatsApp. This effort involves syncing privacy settings and blocklists while securely handling personal data across devices.

**What does a typical workday look like for you?**

My mobile dev work typically falls into feature development and bug fixing. Fortunately, I get to work with many other teams and stakeholders like project managers or designers when dealing with new features for products like the WhatsApp Mac app. My role often requires a cross-collaborative effort that involves other teams, and it's one of the things that I love the most about my job. There is always a feeling of close partnership towards building something meaningful.

Apart from working on new functionalities, I often fix bugs and other defects. These issues are often caught by other members of my team or the Quality Assurance (QA) Team. The QA Team is essential in ensuring that the WhatsApp iOS/Mac apps meet our high standard of user experience.

Here at Meta, we care about growing great teams. In addition to my dev work, I spend a significant amount of time interviewing and mentoring new engineers at Meta.

**Can you tell us more about your work recruiting and training talent?**

We're always recruiting mobile developers at Meta. An organization is only as good as the people who make it up. I want to make sure that we hire great engineers and excellent collaborators to help work on some of the world's biggest mobile apps.

Once engineers get hired at Meta, they go through the [Bootcamp's onboarding program](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.businessinsider.com%2Finside-facebook-engineer-bootcamp-2016-3&h=AT3HWr4Hm6tcdsQyed7R55a5OdTtX2mJWvd1XFzGMqLhbJfkd3i7_p0l6upAp6LxWKohxAY9-ZxLSK0xZd_q-W8G49T3PjriMm-uNAniJj3CdEvMImcUnLkvdR1AH5J8uWf2wF5hJ9p5tvNISGCri-thwJ4qh8X_X-c35A7X72I). Bootcamp is designed to immerse new engineers into Meta's codebase and give them the flexibility to decide which projects they'd like to work on.

As part of the Bootcamp program, I host office hours for new engineers interested in learning iOS development. These sessions aim to help answer any questions from the iOS experts and those curious about mobile development.

**What's a misconception people often have about mobile development?**

I sometimes hear that mobile UI development can be repetitive and mundane. This criticism usually involves saying that mobile UI mainly involves permutations of tableview layouts and UI controls.

I completely disagree with this. Mobile UI development is so much more than that. It involves many components like architecting the app, thinking about data flow, handling data storage, designing UI and more.

For example, one of the most challenging issues that mobile developers have to solve is testing. Testing is an essential part of feature development. It ensures that the app is scalable and extensible for feature development. Nonetheless, it sometimes forces developers to refactor the entire codebase to test new code. When refactoring code, I often have to make changes in data handling and the architectural aspects of the surrounding code.

**Can you talk about what you're working on right now?**

Nowadays, I am working on setting up tests for WhatsApp across different platforms and making it work with our Meta internal continuous integration (CI) systems.

There are thousands of developers contributing to Meta's codebase every day. At the scale Meta operates at, it wouldn't be feasible to verify that all the code meets specific standards manually. To tackle this high demand, we use a CI system to help us ship good code quickly and help us derisk errors in production.

For context, WhatsApp joined the Meta family through an acquisition in 2014, so the code wasn't written or tested with Meta's custom CI system. Since WhatsApp became a part of Meta, we have been working on integrating the Meta CI system with the WhatsApp codebase. However, this integration introduced a set of challenges like making sure that it avoids false positives.

My main focus has been on collaborating with the team that manages the internal CI system, removing any blockers and making CI run tests correctly across all WhatsApp platforms.

**Is there something especially exciting to you about being a mobile dev here?**

Being at Meta has been instrumental to my growth as an engineer. By working here, I am exposed to many different stacks across various projects. By stepping out of my comfort zone and exploring development outside of my area of expertise (i.e., mobile), I continue to improve as a developer.

During my time at Meta, I had the opportunity to explore non-mobile work by designing endpoints and UIs in JavaScript for desktops. And when I wanted to try my hand at mobile work, I switched teams and now work as an iOS developer on a user-facing product. My manager was supportive of my choice, and I'm glad that Meta had all these processes in place to enable this kind of internal team mobility.

**In addition to the opportunities to try different workflows, is there anything else that has stood out to you about being a mobile developer at Meta?**

What I've always been interested in is solving complex problems. There are a lot of unique challenges that a mobile developer at Meta gets to try their hand at.

One of the great things about working with Meta is the enormous scale where I can apply my mobile skills. I encounter challenges here that I've never experienced before at other companies, and I get to work with some of the brightest engineers in the world. It's inspiring to be surrounded by people redefining paradigms in the mobile space.

For example, I had an opportunity to work with a team behind [React Native](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact-native&h=AT26yVMD19WHPYnlkjpH7fbD542nlm4OnB9w84lF_wGirDMmmgAYcsfXdjuVlBts3BVrttB-IA3yauu4XIoqXXsYpD__4FMIoiEBJpMCDSUuxfWHU6fnLx6MKCpuJxqPsMaBECO0pbj48cGFqn0_uasWFFGgPBXUwKMdqWFXZ-E). It is an open source framework for building native applications using React, which was initially developed at Meta. Thanks to our community, the project has grown to where engineers specialize entirely in React Native and make their careers out of it.

**What's been energizing you about working in the general mobile space today?**

It's exciting how crucial mobile devices become to our everyday lives. For example, we now use our phones to scan QR codes when we want to look at the menu in a restaurant. We use our phones to navigate and understand the world, and we use our phones to feel more connected to our loved ones.

We went from a world where you only used your phone to call people. Now, most of the world's population has a supercomputer in their pocket that they can use to access any information. As mobile developers, we have a significant role in making people's lives easier with better apps and features. I can't wait to see the kind of mobile experiences that will become commonplace in the future.

I believe that the [metaverse](https://about.facebook.com/meta/) will play a big part in the future of us connecting to one another. It will revolutionize how we communicate with our friends and family. I'm looking forward to how the mobile space will evolve alongside the metaverse and the types of mobile integration possibilities between semi-virtual and virtual worlds. It will surely open up avenues for different ideas and innovations in the mobile space.

**With that in mind, can you recommend any resources for people getting started in mobile development?**

If you're interested in iOS development, I recommend reading the basic [Apple documentation](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.apple.com%2Fdocumentation%2F&h=AT2SlJQ_9E5iUR6tEImRnqAnK1YvdkCYgoR7wjcRS5Aj_0nooHi2aA3nvEVvujcM10tZ2xa0zddNqM_5lmNCKMck0v2X7Mz3rjnFb8aJy8gBaw6DWvZhARNX2czo_lqOFXwUWJOZt07XUheFhH36odKTtsC7ObsDvs3SsHVzg_8). I began learning by reading the book "Programming in Objective C by Stephen Kochan." If you're interested in learning Swift, the [Swift documentation](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.swift.org%2Fdocumentation%2F&h=AT0kjlYpgdIsxTx9ANeqQ7dv39NZfTrJC76r_e63TsNMP6YpbIu0JRjO9VwVTEgxdfNSnU5l1J2UMzi8vXrUV93YfHuGphDxpWEXcLlBr1RdBFaQbpKl65tL99unZ2U3T6DgagYZ6ueOWaOMyUGEwiSgRD1Wzxf7cz8WI_jlxKg) should be your first stop. There are also a lot of great videos out there for getting started with mobile development.

</br>

* * * * *

</br>

To learn more about Meta Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT2lAByNziPRCz93ZlxgPOYm4_KU15P8E1hNv4pujmPcS_o2L_-7kiGAStjGXljNKH69ciqB7tAbbgl9Apya4YzIpOSab3gCfXYOyx7oaWaHnb2mQXpyskBduooT5SyZB5EoexkXNSH1_6y436V0RvFhW5hG61UtDBeElj4eUq4), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FmetaOpenSource&h=AT2-EelEYkAiaTbzj2zhZfG1gOT_ZBo1e76D9by06u2rQ1X6PqUxQlVkieDd4TYiwr3oKys_6Ca1BhAfhPBhATsIshznAByFzN5syCTVcP8eFlEoIpY98ghkruKgI-zOhcV9W6tgIPKH9I09QFlg5utDnp0NUIYCQeCiwpg4TY4), [Facebook](https://www.facebook.com/MetaOpenSource) and [LinkedIn](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fshowcase%2Fmeta-open-source&h=AT07R10UGR4ol8--5SdrE3D7Kl8lHe7ENkpVW-zq6_MBf87wsPrGc7zIILRLMbYJAOEe_UjYNA2Vs35ZvNnt3GNkrIyOJAr-0pHUFDQ-4QlD8yh7vA-wi08gSwfr51hSEPfaqyy-p5cr6lzLjrfs2tqWqR4e5R6D7bOXGdgHXgY).`},{title:"Implementing Webhooks From The WhatsApp Business Platform",description:"In this article, we’ll walk through a tutorial that demonstrates how to set up an application that receives messages and stores them in a database.",date:"2022-05-19",tags:["business-messaging"],slug:"/articles/2022/implementing-webhooks-for-whatsapp/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2022_implementing-webhooks-for-whatsapp_9ac415e6.jpg",canonicalUrl:"https://business.whatsapp.com/blog/how-to-use-webhooks-from-whatsapp-business-api",body:`*By Dmitry Vinnik*

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

\`\`\`
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
\`\`\`

The endpoint is very simple: It returns the hub.challenge parameter, which the verification system sends as a request parameter.

Next, you need to configure your endpoint in the Serverless YAML file. This YAML file defines the functions, endpoints, and any resources that should be created when the project is deployed to AWS.

This helps make the deployment process simpler and removes the need for any manual configuration. It bundles together any code and additional infrastructure configurations, such as resource creation or permission definitions.
Replace the boilerplate code in serverless.yml with the following code:

\`\`\`
service: whatsapp-webhooks
frameworkVersion: '2'

provider:
 name: aws
 runtime: nodejs14.x
 lambdaHashingVersion: 20201221
 environment:
   TOKEN: \${env:APP_TOKEN}

plugins:
 - serverless-offline

functions:
 app:
   handler: handler.handler
   events:
     - http: ANY /
     - http: 'ANY {proxy+}'
\`\`\`

The plugins section includes Serverless Offline, which emulates AWS Lambda and API Gateway and lets you test your endpoint locally before deploying it to AWS.

The functions section defines the location for your endpoint handler and defines which HTTP events can trigger it. For the sake of simplicity, set this handler to respond to any event.

The provider section contains the TOKEN environment variable. This secret token is required when sending the verification message from Meta for Developers.

To define the token, export an environment variable with the name “APP_TOKEN” in your terminal. For example, use the following command:

\`export APP_TOKEN=testtoken\`

When the service is deployed, the TOKEN variable will take the value of your local APP_TOKEN variable and make it available to the Lambda function in AWS.

Test Your App
Now that your project is configured, you should test that the function works locally.

Launch the project in offline mode by running the following command:

\`serverless offline\`

Once your app is running, run the following command in another window as the app will have control of the current one. Make sure you replace the token value with the value for the token you defined earlier:

\`curl -v "http://localhost:3000/dev/webhooks?hub.mode=subscribe&hub.verify_token=testtoken"\`

The output and 204 status responses should look similar to this:

\`\`\`
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
\`\`\`

Next, deploy your application to AWS by running the following command:

\`serverless deploy\`

AWS will then output your endpoint to the terminal once your app has finished deploying.

**Configure the Webhook**

Next, begin the verification process by creating a Facebook app.

On the left navigation panel on the App Dashboard, select PRODUCTS. Then select Webhooks from the options. In the dropdown menu, select Whatsapp Business Account.

Next, enter the callback URL with the endpoint provided by AWS. The token should be the same token you used in the severless.yml file.

Once your app is verified, you can see all of the different object fields your webhook can subscribe to. Each provides an option to test and subscribe.

The field of interest is the messages field, which sends messages to your endpoint when they are received. Each of the webhooks sends a POST request to the same callback URL you provided when verifying the application.

Next, you need to write the code to retrieve the POST requests and store the data in DynamoDB.

Add the following code to the handler.js file:

\`\`\`
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
\`\`\`

This code first installs the AWS SDK npm package so you can use the DynamoDB document client. The function then checks that the request was sent via the messages webhook. If it was, the function creates a review item consisting of the review and the customer’s phone number (which is provided by the webhook). The webhook sends each message as an array in the messages field, so it can send multiple at a time. The function loops over the messages, creating an array of DynamoDB PUT promises that can be executed later to store the data.

**Configure DynamoDB**

This simple example takes the data and stores it as-is as a DynamoDB record. At this point, you can add functionality to parse the message as required to implement additional business logic.

For this to work, you need to provide some configuration details for DynamoDB in your Serverless configuration. The complete serverless.yml file should now look like this:

\`\`\`
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
     Resource: arn:aws:dynamodb:us-east-1:111111111111:table/\${self:provider.environment.REVIEW_TABLE}
 environment:
   TOKEN: \${env:APP_TOKEN}
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
       TableName: \${self:provider.environment.REVIEW_TABLE}
       AttributeDefinitions:
         - AttributeName: phonenumber
           AttributeType: S
       KeySchema:
         - AttributeName: phonenumber
           KeyType: HASH
       ProvisionedThroughput:
         ReadCapacityUnits: 1
         WriteCapacityUnits: 1
\`\`\`

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

Refer to the official WhatsApp webhooks setup guide for more detailed information on using webhooks in your application.`},{title:"Meet the Developers: Mobile Edition (Derick Zhang)",description:"For today`s interview, we have Derick Zhang, a software engineer at Meta, working on the Remote Presence Co-Experience Team.",date:"2022-05-10",tags:["open source","meet-the-developers"],slug:"/articles/2022/meet-the-developers-mobile-edition-with-derick/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2022_meet-the-developers-mobile-edition-with-derick_3062365a.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2022/05/10/meet-the-developers-derick-zhang/",body:`*By Dmitry Vinnik, Derick Zhang and Jesslyn Tannady*

*Originally posted [here](https://developers.facebook.com/blog/post/2022/05/10/meet-the-developers-derick-zhang/).*

For today's interview, we have Derick Zhang, a software engineer at Meta, working on the Remote Presence Co-Experience Team. His team works on collaborative experiences for Messenger and Instagram to foster spaces for users to feel more connected. He works on several different projects spanning the Facebook, Messenger and Instagram apps for the Android platform.

He is a self-described social media influencer who enjoys eating different delicious food, shopping around nice malls and going sightseeing in new places in his free time. You can follow his adventures through his Instagram [here](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fzmagic100%2F&h=AT38NW3Az0zEIip6sTQuAUTZxGIKyS6lcwz0k8TuthqR-cMccQvOBIzoWgBCY2QY7zrZU3Mxxh2gx6AOOqzhzg3CeVq8FU98Rf36T1KE3QU_Frt2gOxuJ78roilnfR3GjuHPCpwPDXRIN6gEiy3e6cay9DhxdDBgPDZjKWoncUg).

</br>

* * * * *

</br>

**As a mobile developer at Meta, what does your typical day look like?**

My primary role is to develop new features and test them to ensure that they meet a very high-quality standard.

Because of our scale, I have to context-switch a lot for my job, which can sometimes be overwhelming. That's why I start my week off by planning out what I'd like to accomplish during the week because I interact with many moving pieces every day. Fortunately, we have many internal tools that help to keep me on track and organize my work.

One such tool is a task tool that's essentially my to-do list broken down into action items. This task tool has a built-in tagging system so that I can assign tasks to different products (e.g., "IG" or "Android Messenger"), and categorize action items into different types like "bug" or "feature request." This tagging system helps me prioritize my work and stay focused.

Over the years, this task tool has gotten even more advanced, making it ideal for cross-collaboration. I can add labels to share my progress so that my colleagues can see what I'm actively working on. I can also tag stakeholders to get an up-to-date view of project milestones.

Apart from my day-to-day engineering work, I host office hours for new hires interested in Android development through the [Bootcamp program](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.businessinsider.com%2Finside-facebook-engineer-bootcamp-2016-3&h=AT0kBHWAydbW3mZKZzsBXvOBiqP63lt5edDeEcaG7ywXqNRdJIkMUMnW8gn81glhb_A0vJZ_T_ggFI0uOUzrQUE0pnIiAJOI45imkO4iYaSQ-SW0eCRGNb0KS_pn7I9oA9K51koyR8Oy2fqXlqc8a6fHNXJUeubNopKu153mPRc).

**Can you tell us more about what onboarding looks like for new Meta engineers?**

Every time a new engineer joins Meta, they go through this intensive onboarding program called "[Bootcamp](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.businessinsider.com%2Finside-facebook-engineer-bootcamp-2016-3&h=AT1PzCW_OtZObwMzCWYcCI3vrObFzUsvB4aAezQ1yt9EWZh7od8bNq-Arq65Mz3hZPuNzDV_g9Ekx2_t8s7cieNZ5y0n_8iUeK9cmDXyxzi1QOs9eU2FekZKl4e16nGe9O_uwZoBsRbom7z89BbIVIXmLoGedjvbTjQzP6sFc9s)." Bootcamp helps new engineers get up to speed with the Meta codebase and Meta-internal tools. It also teaches them about engineering habits that help us scale. As an Android developer, I host Android-specific office hours for new engineers who are interested in learning about Android development.

A cool thing about these office hours is that I sometimes get engineers who are interested in mobile development, but do not have much mobile experience under their belt. They might be curious about what mobile development looks like and may be interested in joining a team that works on one of Meta's mobile applications. These office hours are a good place for these engineers to ask questions and figure out if mobile development is right for them.

**Can you share what you're currently working on?**

I'm currently working on Instagram Live features, like enhancing the client infrastructure to improve the quality and stability. I am also adding new features that make it easier for Instagram Live broadcasters to express themselves.

I am proud to say that my current work involves Meta Open Source. I use [Yoga](https://l.facebook.com/l.php?u=https%3A%2F%2Fyogalayout.com%2F&h=AT3lslt512PLnYiTR8Xvr5oCMOnsk7LhgkPT7OHdnOOkC2acJhQHt0_4P89rXlIN7xy-F_fUMZbuRgMg3sjphuciPyt-34wgW_Afvg3_5QtsOJH0h2XEdt73xuBiakHwNCQtI4OIueoaq-R4OYXoq6UZrgtPc7KV2w4gY5Yrhkg) in my [Litho](https://l.facebook.com/l.php?u=https%3A%2F%2Ffblitho.com%2F&h=AT1reAcjBd1DJVsbpDZX9bw3wvdQSmySraZIF4fDRjJdtJSWhll_1J8KLs_-sxtqJG5vaAyTXiF59QEGO_wqLe0rR1AE423jbxk8t0Wj4nP7j4A0d74oWoJlrrBsLmb60a-fJ4GlUDHKPPWl_4wbxAXpKwiKgOsc3xQeb5LCkmc) components when designing user interfaces for my features. Yoga is a tool that helps me build flexible layouts, and Litho is a UI framework for Android. I like Litho because it lets me create UI in terms of components instead of interacting directly with traditional [Android Views](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.android.com%2Fguide%2Ftopics%2Fui%2Fdeclaring-layout&h=AT2z5_GRvpew21NYJSsQvTGXDmoFemdMKwtn9iiI4vr9eGiCVP9pLfSIe2bFBpEBNrxDs6yScxKKT9hJRmWg_kpR095dqGqFIInlQKQtQiSdI6lNzc1acWHxBrNFvGtwWnGBagYEAe77DgiCtQgsllxRo8nsE3wakLPon-5VE_0).

You can see examples of Litho all over the apps that I work on. The UI that lets you choose filters for your Instagram Story was built using Litho. We also made many messaging features in the Facebook app with Litho. Thanks to Litho, our users can use stickers in apps like Messenger. And the cool thing is that both Yoga and Litho are open-sourced and free for anyone to use. You can learn more about these projects by going to the [Meta Open Source website](https://l.facebook.com/l.php?u=https%3A%2F%2Fopensource.fb.com%2F&h=AT3tkRFCmswY66y7uasc8cITNt78liOtob942aRT7LdW38cBkaTmpwp_qP5KSYPkuoMgPLOSWdNz0IyUcbzRtfv_Bg2FTcFWDYCkduLolItV8vHxe-ozNLO_-JO-fOhW2CKQ9SunIy_7PeMQnOa79AsBVBuz4f-9Cq2kzHl4cLI).

**Are there any big misconceptions about working as a mobile developer?**

Sometimes I hear this narrative that we're past the heyday of mobile phone technology and that all future changes will only be minor improvements.

Contrary to this opinion, I believe that mobile is still a dynamic and thriving space---you only have to look at all the investment poured into the updates that constantly come out on Android and iOS.

I imagine a future where mobile plays a crucial role in emerging technologies. I would like to see more explorations between augmented reality tech and the mobile space, such as rethinking map apps and navigation via a mobile phone. Pokemon Go is an excellent example of the unique experiences we can unlock at the intersection of AR and mobile camera technology. Another good example is how [Google Pixel's Magic Eraser](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DWA6TrAwHQug&h=AT2TqXlXSpbY0KgIPEWor_WXV8UjxH7_TzqimRbI3N-EsGPlGStuE_YFU1K-cUiT7hp0V_A8MjIiuvyXokOxAYsclITZ58fblSpRLDXulF2Ypz5g8CBDw-noYZnDjcsAUGSflrXM7w-Ru9CKHDLHI5JNydyCXQPS3R_4OYln18A) uses AI to quickly remove unwanted elements from images.

These innovations show how many novel experiences we can add when integrating mobile technology with other up-and-coming technologies.

**It sounds like you are at the right place since Meta is a prime place to explore the intersection of augmented reality and mobile development. What do you like most about working here?**

Being a mobile developer at Meta has been a fantastic opportunity. Unique problems come up every day, so I'm always learning and growing as an engineer. With so many public-facing products, I can put myself in the shoes of the people who use my app and help build a better user experience. In many companies, this practice of using your product is often called "[dogfooding](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FEating_your_own_dog_food&h=AT1lWb5ywRmZ800M0WfbzKdg5qPOlc1RiqVHxGQyA-_B7T9QwL1JHxEwhRoAE3cQDCb3huLCnYSNnaa5BZhVbgudwykp_2QnIWSKfCw5rOd3AoRlijlE5EXpVbpUi5lV8Ak65hzyepTO62OT9YmD0q5wXH5qXRzU2mZsKDIVkHw)," and here at Meta, we take it to the next level. With our products, I get to try the apps while working on them and on my personal time because I genuinely enjoy using them.

While prioritizing user experience, I always need to consider the size of our audience. Fairly soon after joining the company, it hits you that the scale at which we operate at Meta is quite unfathomable. It's fascinating to see how the efforts of a handful of people affect so many communities worldwide. Thinking about how the things I work on at Meta impact folks and their everyday experiences humbles me. Even the slightest change I make can help people communicate globally and bring them closer together.

**If someone wanted to follow in your footsteps, what resources would you recommend?**

As an Android developer, I'm a huge fan of [Android for Developers](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.android.com%2F&h=AT0AxClKpLsvBL7ny7v4lsHj6n-Lzo8EF31kNNn6vUbFUvFdwXODUK4x8fPiydyFB27yffnm2izwBWPzDdLA5zhoFOV2m5e1M88PYJ68g4paETjdDdsRDykK_TE1odz8md7S40ZFfoeC685GBskW9N2XqPU5QNHauBf6aC3sfVc). This website has API references, documentation and many ways to get started. When working with Android, I mainly use [Android Studio](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.android.com%2Fstudio%2F&h=AT3OTKliNlWzh8lq0u7huIxTkM2kVUQ4PuSBYwungW-5y36ZuuLXpb2tJIPztqkg7LMrwHGmfT9ouhfLRz3A2wUWfjDB9BndTQAZkyOBwhUTgnZn2AI5VLozT6i6yYYMf5qHEy25A_HGGmhQnFMY5rEXXmdjj-gCOnqYJxxSR7s) as my Integrated Development Environment or IDE. I prefer Android Studio because [JetBrains](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.jetbrains.com%2F&h=AT2Remwai1_8phK9auAKMOktpXzaCdwUFo7BfRHl68wXAWs65f6T02bhs2SmHUpP1JUbvpZXdDai_rFbRlCispVFF6gEwzJ9Ydvd2e3D3jEKor6dWErbnoQE9b51cw5x-i02UK65hs6aKhM_370GieJ7It_eKLZbAg9u83V5-wI) designed it in collaboration with Google to accelerate Android mobile app development. It's incredible how much my workflow has improved after using this IDE.

When it comes to building Android apps, [Kotlin](https://l.facebook.com/l.php?u=https%3A%2F%2Fkotlinlang.org%2F&h=AT3P_5kn7_PA-71-FcZx5YpGv0FjxXG_PkPDwPOUL_jeF-W5HGtfMNGq5FlK1TF4proy8tT_C0-idcCLe8FstfJ5ZUBJP_zKwps3RytQdzwdlR-dNS7EnJORuOhpIFSPXId18XEKTDp3UuyvYMkgMF7Sj4x_m1ycEiTekqEj3Wg) has also become one of my favorite programming languages. I find it more concise because it reduces the boilerplate code that I had to write with other languages. I also genuinely enjoy not worrying about my app crashing due to [NullPointerExceptions](https://l.facebook.com/l.php?u=https%3A%2F%2Fdocs.oracle.com%2Fjavase%2F7%2Fdocs%2Fapi%2Fjava%2Flang%2FNullPointerException.html&h=AT3UjfvQJkALvk-QDISQw8E5S7yRe8KXhRlBvsKAfTe-mJSukG-Oad8hrPy7ncV845RKE40TNJteVPbh2GKq-EQK46bsoLkO9kMNFEGquvOakyHbzqXTacMjQi2DUsjXH2_KFYdVVR08ze8Jq78WqwUGg-TC_n1eQgyA-P7ta2I) since Kotlin gives me a great type system that catches these exceptions early. Kotlin is also open source, so anyone can contribute to it and add new features to accelerate development for Android developers worldwide.

**Do you have any final thoughts or words of wisdom for the people who aspire to do what you do?**

Mobile technology is and has been evolving rapidly. Looking back just ten years ago, I was using a [Motorola Razr](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMotorola_Razr&h=AT2bCzzjeHOkZnD1KXBwbuajGtwvBLIUwKUr78bzkp2Jx5riRhX6OR4GkollJT3EfhiY89fJr5fjMAdq1GtqyH1cziGjrbF39gkBBIlA-qYiPDIUKiEt18cRr-JO2OgE3s7AfEP1me_hYyQQMjKSRyUabKcmnKBRMYDdRUEuYM0) and didn't think much of the concept of a smartphone. Here we are today, and technology has made our lives more convenient and instantaneous. This technology is such a big part of our everyday lives today. I hope to continue to build things that spark joy in people's daily lives.

</br>

* * * * *

</br>

To learn more about Meta Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT3SKZHzXUqF5o7UJ6d5Z5Pnzhu3QV84aPFMWUygJ9vg0hVVVzsjRgDHjcABdeJr7FtknajwAY7UchvVMEYzjqUu-JveBr3yL8U6T-3rE2Yll9frcs7c6uu9KcEEeZnEwcB6I2gCRIvRVZbs_xJW_LGtM8xvwc00i-kcSJb44TI), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FmetaOpenSource&h=AT2isXuP-WECv0tv7CklgLjP-wZaHEXrbe5zrZO3YvRBEZVfkj13V0YZjCjyieemn4YZi21_YP4J8-nwDfQnpuRN7yXKTsFOdAwshixlVUIslCVBwz1-HYOOAkaO3BbDBz0shbwiFKvB-jxqfAxDcF7dV9x_Cim_xsGrigXMlm0), [Facebook](https://www.facebook.com/MetaOpenSource) and [LinkedIn](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fshowcase%2Fmeta-open-source&h=AT3miYmzBJKiERqi94VMIn5tRNhP8ILIUUgYdlkWxI0_WbsRcXj6DyvhrCAYZbE5daQJiP6OUhRsM13EIvjHQ0kq5gxGPJkbY2TDLyNn--zikfP3yqwXudcSr3V6UovsfynOEYOix0kl7EGdK7cqjQ0cdsrVDEE46TQxlkz6uio).`},{title:"Meet the Developers: Mobile Edition (Aleksandr Sergeev)",description:"For today`s interview, we have Aleksandr Sergeev, a software engineer on the Facebook iOS Reliability Team",date:"2022-04-21",tags:["open source","meet-the-developers"],slug:"/articles/2022/meet-the-developers-mobile-edition-with-aleksandr/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2022_meet-the-developers-mobile-edition-with-aleksandr_8ddf625a.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2022/04/21/meet-the-developers-aleksandr-sergeev/",body:`*By Dmitry Vinnik, Aleksandr Sergeev and Jesslyn Tannady*

*Originally posted [here](https://developers.facebook.com/blog/post/2022/04/21/meet-the-developers-aleksandr-sergeev/).*

*This article was written in collaboration with Aleksandr Sergeev, a Software Engineer at Meta, and Jesslyn Tannady, a Developer Advocate at Meta.*

For today's interview, we have Aleksandr Sergeev, a software engineer on the Facebook iOS Reliability Team. The Facebook iOS Reliability Team focuses on ensuring that the Facebook mobile app on iOS works reliably and predictably. You can find his LinkedIn [here](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fin%2Falxsrg%2F&h=AT2QSr5Lp1A3-7gAc8Jo-chyoeWuuR47ux-gYMO1SYeAdQNV6XebEwpQ609OxExyeM4mzzRrWZsZ-LoyQndjwgalcLrKFr78esP9sUD1_UhCk_SF_vCB21RnNDasYwNt0kuGllwscGg3_6cLCdXkuIS9TT21ab_2txyJN5-zDqs).

</br>

* * * * *

</br>

**As a mobile developer at Meta, what does your typical day look like?**

My days tend to fall into two categories: low-urgency days and high-urgency days.

On my low-urgency days, I do work that must be done but do not necessarily need immediate attention. This type of work makes up about 90% of my days. It may be working on systems to prevent bugs from getting into production or creating tools that help fix bugs already in production. Additionally, Meta has systems to monitor crashes and notify a person responsible for fixing the crash. Nonetheless, when the app crashes in a novel way, the system may not know who to notify. Reports like this come to Reliability Engineers like me. It is my job to triage an issue to the person who owns the affected module so that they get fixed; if the owners have a hard time fixing the problem, it is my job to help them. Even though it is not very fun to work in crisis mode, the reward of seeing something important fixed right there and then is more imminent.

On my high-urgency days, I am putting out fires, such as an outage on the Facebook iOS app. I untangle crash logs, read code, and debug on those days. I then either switch unfruitful tests off, write code to fix the issue or report what I learned about the issue to other investigators. Most of the code I work on to optimize app performance lives behind experiments.

**What kind of performance tests do you run?**

Often when we're writing code and rolling out new features, we hypothesize how this will affect our users' experience, but we can never be sure. We generally [A/B test](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FA%2FB_testing&h=AT2RJee4avRdXKgrhVgQTpOidPQtuVgwkJ0omTZEO-toeOv45tAI8w7Y6TvbEv2Qq6CeuYSdvVSp6-gn1MyjA37FHZOPFIwDzhSKEBr3XOe4PcDrbEW7faxzTba4wX1GJ0muZv5W752Hul7f2KIdghxLK-nr95T9vMK9w1wAAXM) feature rollouts to gather metrics like performance and bandwidth usage. We test new functionalities with a small group of users in our experiment sandboxes, and we then roll it out to our broader user base if the result is favorable. Running small-scale tests allows us to rapidly alter application behavior without recompiling it.

Meta is a very metrics-driven company. We're constantly trying to innovate, but we need to ensure that code changes that affect our products result in positive outcomes. As a mobile developer at Meta, the code I write often touches large-scale projects, and I can easily see the ways my work impacts real users.

**Speaking of your work, what languages and tools do you use on your job?**

When working with the Facebook iOS codebase, I primarily work with Objective-C, C++ and a mix of them (Objective-C++). I use [XCode](https://l.facebook.com/l.php?u=https%3A%2F%2Fapps.apple.com%2Fus%2Fapp%2Fxcode%2Fid497799835%3Fmt%3D12&h=AT1OWtdLqecQkXcEKVmmsnJkVtBlW_FFdZ55iX3sehuNpHXvVrJEe4h7LU4hKfRipJv9OjL7eo8QRekw8fTabXNjDFroLogsK3A1SsPD6T69X-H0M8T5GqlgwhrT0PLPZMO5e1Qb11dgErVoBb6LLrSgzEkGC7IYawNlwLrG7HA) as a dev environment, [LLDB](https://l.facebook.com/l.php?u=https%3A%2F%2Flldb.llvm.org%2F&h=AT0lwpXwrOCy5ZlHnLonqodPLXY_Y20OAOO5iDFWeB-WBn5DcujVPQZDn6UnrB1hY6WQ7wRTn9uFb9m6NHnNQZVd46SaTnz6LaQzmrFmoWU7a218dncN2BwFa_MFqRub_rLQLHNXtKDrdOX7kBROPDIK_ClTnzv4MP6IScgZh64) as a debugger and Meta's internal tools for data analysis, analyzing error logs and A/B testing.

Even though Swift is now the recommended language for developing iOS apps, many libraries for building iOS apps were designed with older languages like Objective-C and C++ in mind. XCode is an excellent dev environment when you're building iOS apps. Apple made it, and it's generally easier to develop within an ecosystem. I like that LLDB, XCode's default debugger, comes with excellent support for debugging on the desktop, iOS devices and simulator.

If you're interested in learning more about Objective-C++ for mobile development, I recommend checking out [ComponentKit](https://l.facebook.com/l.php?u=https%3A%2F%2Fcomponentkit.org%2F&h=AT1g85QcCq48JdpquEDaZbNt91I1kMvVspIsR2LMq0uhC-dC0EYvgRu7m69hcjyPH9loVGzUZdicQtH0v-jKkaIcNx-aNRI7Cuj_Gk5DYsv2DXg-EhhwZxUhcVvf6z5j0H-RPydTjKivsCR2gw3Lz1YfbARiooTAfNWDYtQ64xo), a declarative UI framework for iOS. They have a great [Getting Started](https://l.facebook.com/l.php?u=https%3A%2F%2Fcomponentkit.org%2Fdocs%2Fgetting-started&h=AT2iYLFZ2SpTtwChF_Xz5GGZ2rkPfVBycMSX0IivGcfSDDc3jvm5Or1TPxz7iDhvPGqStk2yq9QG9tJmtHKfsf3JiDOHfF_sH5QSsgUN9_ZyRycLtMhf32KQFNUBiR_fidNg8lcLedPPBdBQwxCkf-mh3jSw_GT-zqKubg3-Kto) guide, and since ComponentKit is open-sourced, you can check out the source code at their [GitHub repo](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fcomponentkit&h=AT0h0tRpZH3UVxsoWNAZQGsDKpcQ5u0Ca-bjVjpyjuak54mVH2pbyMaKriaSfdyKZTBlegjI6xHO4tkhJoN0tiajA_F19ma7M_B1h31b3H2qPDrtPqMP_teCrgMuKV_I0BDoUk-nu2KjdCIqL33_0iviOSNk1gtkPbcOXJ6xwtFh7R_ipAWAY7Oq).

**What's an example of a work problem you've recently solved that you're proud of?**

I recently fixed a problem with UICollectionView's delegate that was known to cause issues. But first, let me start by explaining [UICollectionView](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.apple.com%2Fdocumentation%2Fuikit%2Fuicollectionview%3Flanguage%3Dobjc&h=AT1d8eVRjm3Wl2_LQOVvWGCdBMJcSI0HdulWmdLlXX7LzjKXgcwy6gZsuVQkw2UqxVX9TFc6VvmIjHxYetnGLxX7Uf5izO2jdll2fUsNUV2QpHmArfwZvgD_2IYU1Bz7mTQKno79RN_1uiplykh5uVn7cCjw4HvvT2DYhwzfZ8Q) and delegate objects.

[UICollectionView](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.apple.com%2Fdocumentation%2Fuikit%2Fuicollectionview%3Flanguage%3Dobjc&h=AT3ETRHwPE4ixFUhaDOw8aZo-U4lS81N8Ao0iCJndBjgrmyAfch90UzH3EgZzUF1bMV1ZlID_CQP_VSa2qxqaQYfBGYpN9pvSWsabn-kVV4_h0icwnAwRSiSVhUU8i55BhGff_Tin3zvZx3lW_jB4G3bGRDJrC7c0dldyFdLMzg) is a class in Apple's UIKit framework that manages data items and presents them using customizable layouts. We use UICollectionView in the Facebook iOS app (e.g., to display items in Newsfeed).

Each collection view may have one and only one [delegate object](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.apple.com%2Fdocumentation%2Fuikit%2Fuicollectionviewdelegate&h=AT21IS1Nxu-oFVxnJ5Y2qa7ISsLgcpPnoxw1PEpMpvgA_Pw4lqSrcBOk4K1FJ8S81JfTrA5p2juHTJ18xcXebdoaR2szDuHvQ7ZokWeD5rs6Xit2kL8rgmEKr_XZ4_iQ8HvWTRDsNyeJ2FS2zJiDvF26vt_s0FGo-bQd12G5u6k) associated with it. However, we sometimes need more than one delegate to clean the code. For example, we might need one object to collapse the navigation bar when a user scrolls through Newsfeed and another one to handle taps on items in Newsfeed.

Each delegate has a contract (an [Objective-C protocol](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.apple.com%2Flibrary%2Farchive%2Fdocumentation%2FGeneral%2FConceptual%2FDevPedia-CocoaCore%2FProtocol.html&h=AT0k5Gtjdjin04y3ua_MIuyGbFjq3MxIfp8CRwc_WlsfZ-5zdQrvtJdQi1QCi-AxjmZoYxNz9OM6LxSwjv5wIZz3Qmsy0_Cq8VF8WzPUM1_X9iY-UZxqrBK6DzWaQouTp8wPV-v1YoO9ZEIet3w1XXPpMV-jz2wOwSq4kmLwwDk)) that they need to conform to. However, this contract is pretty relaxed---all the delegate's methods are "optional," so technically, a developer does not have to implement these delegates.

UICollectionView can figure out which methods have been implemented, but this process is time-consuming; therefore, UICollectionView keeps a cache of methods that the delegate implements.

**How did this delegate property affect the code you were working on?**

Here's where things get complicated. Any delegate in a chain of delegates can disappear at any point, i.e., be nullified unexpectedly. Delegates may get nullified because weak references store delegates, and it's common to use weak references to avoid retaining cycles and memory leaks. In some cases, when a second delegate gets nullified, the code wouldn't correctly handle these unexpected delegates' nullifications.

This problem was a rare occasion before but popped up more and more recently. Something changed in our second delegate lifecycle. Our new Facebook iOS release started behaving unpredictably and throwing somewhat obscure errors. UICollectionView was trying to send a message to its delegate. Still, the chain of delegates was broken as the second delegate was nullified, and we were unable to process the message.

**How did you address this issue?**

The person who wrote this code back in 2017 was no longer at Meta, so I had to do a lot of research into what happened and how to fix it. In the end, the fix was to attach a guarding object to our delegates. Such a guarding object would notify us when a delegate in a chain is about to be nullified to update UICollectionView on our ability to handle messages. UICollectionView will then update its internal cache of methods that delegate implements.

Usually, we can mitigate problems by switching off the experiments that guard the problematic code. However, we had to submit a [hotfix](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FHotfix&h=AT32635mbMY_eV97W87eJ7g8f4o7H11n9e1JnLQuoFg9Jw3aMgUuDiEzlRtuaQfpVHl4rv8IADGEoaEmhQs5bZOydulQ8V-B6NK59zUeAvQNO_SEAAjgXkAau_MBnfX2cS_KzZ5x85NX8aW6k0sSo6fajDfUQ3TErthRNB1Sn_U) to the App Store in this case.

We are still trying to figure out what caused the decrease in lifespan of this specific delegate, and we hope to get to the bottom of this problem soon.

**Are there parts of your job that are more proactive than reactive?**

Absolutely, for example, we launched an experiment to improve video performance on the Facebook iOS app. We hypothesized that enabling buffered disk writes for video cache would reduce disk writes and crashes, and we also hypothesized that this change might slightly increase cache misses.

So we ran the experiment and were pleased to see massive improvements with disk management. However, we discovered that this came at memory and network usage costs. Ultimately, we decided to cut the experiment short to evaluate how we could reduce our code's memory and network regressions. We hope to rerun this experiment soon after improving our code.

**Do you ever work on open source mobile projects?**

Yes, I do from time to time. For example, I found a bug in the Clang compiler in 2020. I discovered this bug when I saw an obscure log message that read something close to "\`__weak variable at 0x7ffeefbff410 holds 0x7ffeefbff430 instead of 0x1006b2750. This is probably an incorrect use of objc_storeWeak() and objc_loadWeak(). Break on objc_weak_error to debug.\`"

I looked at the code and kept stripping lines until I isolated 20 lines that were causing the issue. Even though I still didn't understand the problem, I successfully identified where the issue was stemming from. I shared my findings with the [LLVM](https://l.facebook.com/l.php?u=https%3A%2F%2Fllvm.org%2F&h=AT0TdeBDEAqt27wYwUFyk3GlaN7oxs_puhq929tLY5rUDLzmdHEGpYUHrbJ5HeR9s7cskZ5Qd6vjPtDHNEgiCMvHpjhnPDESWtYk5_DHvBMMupWo1b0wH34FMQ-bsj_2t-eB5TILDEXaU0YbaNXyh_K-LEKw36TtLB2wCjB5Jak) support group. LLVM is the organization that Clang stemmed out of. Other devs in the support group confirmed a compiler problem there.

It's incredible that just identifying the source of a problem is a value add. I didn't have to be a Clang expert or know how to fix the problem to be helpful. Discovering bugs like this doesn't happen every day, however, it was exciting that I was able to contribute to the changes in Clang.

**Are there any big misconceptions about working as a mobile dev?**

Yes, there are some big misconceptions. For example, I often hear people talk about how mobile development is as simple as parsing JSON files generated by a server and displaying that data on a screen. Modern mobile development is more diverse than that! One can work on a product, infrastructure or application reliability, and all of these are very different and essential jobs.

Mobile developers who work on products focus on features close to the end-user (e.g., Facebook Newsfeed). They typically follow strict feature launch deadlines, so they need tools to make sure they can meet these deadlines.

Mobile developers who work on infrastructure, work on tools that accelerate feature development. For example, the engineers who work on tools like [ComponentKit](https://l.facebook.com/l.php?u=https%3A%2F%2Fcomponentkit.org%2F&h=AT0aYfipBbfb88MJdpH-WwQox_gASPKMYjlrlZybFaQMrE9pGqydJUfFk6ZSWjoTokL6sstVHpt7ShD28Tc-oknZalEHmyuWJ-Pek9SX6nF0oDtfTfgQNZI6zB4wFu-hcx5uDg7Q6Z5yqQWIk0mYpFqi493e0H_t97t3Ba9UwrI) help iOS developers at Meta build UIs faster. ComponentKit is a React-inspired view framework for iOS that was initially created at Meta and later open-sourced so that anyone can use it.

And finally, mobile developers that work on application reliability like me make sure that we have scalable and highly reliable software systems. Once features get launched, we need to ensure that the product works reliably. If an app kept crashing, all of the hard work from the developers on product and infrastructure would go to waste.

**With that in mind, what's energizing to you about working in the mobile space today, and what are you excited to see next?**

The most exciting part about working in the mobile space today is investigating and resolving very complex problems, and collaborating with brilliant people worldwide. I am looking forward to seeing new interfaces for interacting with mobile devices in the future. It seems like there's a lot of exciting work being done at Meta around [wrist-based neural interfaces](https://l.facebook.com/l.php?u=https%3A%2F%2Ftech.fb.com%2Finside-facebook-reality-labs-wrist-based-interaction-for-the-next-computing-platform%2F&h=AT3gwQAsECovbSSoyxc9njeXkoYGvWS-8xin3gFmdcuUAFyyDKi4jOBZYtlLUxVOIKZThIXIu1vqRBXMKI5wYFU5-tyrhH7GdjqM0hCRnSFiNvp6jdq8-cmAi9tVp-5jMZuaEAjkGLMFa_bQp14Xb0JowTTGLvqGd1TEV1m3Lbw), [hand-tracking on mobile devices](https://l.facebook.com/l.php?u=https%3A%2F%2Ftech.fb.com%2Fmaking-technology-feel-natural%2F&h=AT0XMVOoAm8PRFp7Eppy84J9fQyGeilK6nCmwnw7-xAqKrKdAR95GfB85mzFiK2phbBLOU3IwEXEVU9J3shsduHBU0RH-Ohw_6GChBD7vGOa8d-ouRi19GUYEhH4LVu-7QrBPvq01vfD60mmgFUiMAq_A-4TpS3JMzEW376PusQ) and [haptic experiences](https://l.facebook.com/l.php?u=https%3A%2F%2Ftech.fb.com%2Fmeasuring-the-perception-of-latency-with-a-haptic-glove%2F&h=AT3Z51XQwnqLDnhLeCFxbHO1JG78QaZJp9sFd8a5Ph_y2WIA-TV9o83LhZKCe6QId3MEMWOQeT-M-aTy9aOnuNSSFUUX18GSVrs0jx6zyQTb79-cEDwrAxE0tbjhJjb_91uL5KbnTadptPouRz-0RFYLtk_U2yh7YNZLit_JcMk). It's fantastic to see all the next-gen inventions developing natural, intuitive ways to interact with computing platforms. I'm eager to see how this translates to pushing frontiers in human-mobile computer interaction.

**If someone wanted to get started in mobile development, what are some resources you'd recommend?**

I am a big fan of [Apple's documentation](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.apple.com%2Fdocumentation%2F&h=AT1REk8RwWyCOIcvMVjKzYYNFUbQTZGenzWXH9rAlIw0Nfzvl7VcISIU562Dx2y6ksXKB-1XiDJ4E-okDP0G8afQc1JQfIlONDxEpygvYaMs4RHUrZMJG4bYBvEVoHvftJ6Q2EZKH7H1u5Ue9CEJT_hzzmwdX5ehxCHTPAuYlqg), and they go over many low-level details of mobile development that tend to get overlooked but are very important. I think that I neither would have uncovered that LLVM bug, nor would I have understood what was wrong with the UICollectionView delegate if I had not read the Apple documentation on memory management. And it's all thanks to my first mentor for recommending I read these docs many years ago.

Having an expert with a lot of experience tackling the types of problems you're trying to tackle is a game-changer. It's helpful to have someone to answer my questions and point me at resources relevant to what I am trying to learn that helped me focus my growth as a mobile developer. It would have taken me much longer to stumble upon the resources that my mentor pointed me to!

</br>

* * * * *

</br>

To learn more about Meta Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT0ZjB9kZb30OovTqChtmJhgBQXvri_f9mj6jhTkunHSthbaC4ZTW7os91FHL5sLr3uc4h6DiY7X70YivwSi0GNhmYn6xqQ1bD7wChm9k0clpN_pq8pbHeJ8S5tajP1jHBqh4jwKne9fyQiNWEhYbsVVAft121ISv_EwRMJqmvE), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FMetaOpenSource&h=AT3EMF-URwemgJt3XFLdL9Nq0hOYneLRcuofIyGc8k3JGTlKylAYMQGiY7eSYiwAh4mY4c7yd97VuHj2Rb9UcMdNlaHzP4FrwH00j9JJTxiwxraovSA8EgNJFHIh9MIHdWjvRnPoa5WVA_mtdSkJENzKXeNpDPEahTyVtHHzKQA) and [Facebook](https://www.facebook.com/MetaOpenSource) and [LinkedIn](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fshowcase%2Fmeta-open-source&h=AT0srYvhSqQpFOtjJEvn9Y1uXVJZAYrN8oUpdeNOWJe0e3DeRyHpHmlm8eZ5VM625pBC7rGiG2VM8LamNMVaOZpTyixXldNA7tYm44LwibTcIyqHIagi-Y8TF_5Wbah4QHt6Bnbh-OoTgTu0MsEySKkbm5cWVjykz8glSnB79Sw).`},{title:"How to Visually Test a Remix App with Applitools and Cypress",description:"In this blog post, we answer a single question: how to best visually test a Remix-based app? We walk through Remix and build a demo app to best showcase the framework.",date:"2022-03-22",tags:["ui","testing"],slug:"/articles/2022/remix-app-testing-with-applitools/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2022_remix-app-testing-with-applitools_19300140.jpg",canonicalUrl:"https://applitools.com/blog/how-to-visually-test-remix-app-applitools-cypress/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://applitools.com/blog/how-to-visually-test-remix-app-applitools-cypress/).*

In this blog post, we answer a single question: how to best visually test a [Remix](https://remix.run/)-based app? 

We walk through Remix and build a demo app to best showcase the framework. Then, we take a deep dive into visual testing with [Applitools](https://applitools.com/) and [Cypress](https://www.cypress.io/). We close on scaling our test coverage with the [Ultrafast Test Cloud](https://applitools.com/product-ultrafast-test-cloud/) to perform cross-browser validation of the app.

So let our exciting journey begin in pursuit of learning how to visually test the Remix-based app.

**What is Remix?**

![](https://ewig5qf9cgn.exactdn.com/wp-content/uploads/2022/03/Remix-Thumbnail.jpg?strip=all&lossy=1&resize=1160%2C606&ssl=1)

*Remix Logo*

Web development is an ever-growing space with almost as many ways to build web apps as there are stars in the sky. And it ultimately translates into just how many different User Interface (UI) frameworks and libraries there are. One such library is [React](https://reactjs.org/), which most people in the web app space have heard about, or even used to build a website or two. 

For those unfamiliar with React, it's a declarative, component-based library that developers can use to build web apps across different platforms. While React is a great way to develop robust and responsive UIs, many moving pieces still happen behind the scenes. Things like data loading, routing, and more complex work like [Server-Side Rendering](https://en.wikipedia.org/wiki/Server-side_scripting#Server-side_rendering) are what a new framework called [Remix](https://remix.run/) can handle for React apps.

Remix is a full-stack web framework that optimizes data loading and routing, making pages load faster and improving overall User Experience (UX). The days are long past when our customers would wait minutes while a website reloads, while moving from one page to another, or expecting an update on their feed. Features like Server-Side Rendering, effective routing, and data loading have become the must for getting our users the experience they want and *need*. The Remix framework is an excellent open-source solution for delivering these features to our audience and improving their UX.

**What Does Remix Mean For UI Testing?**

![](https://ewig5qf9cgn.exactdn.com/wp-content/uploads/2022/03/RemixCypressApplitools.jpg?strip=all&lossy=1&resize=1160%2C523&ssl=1)
*Testing Remix with Cypress and Applitools*

Our end-users shouldn't care what framework we used to build a website. What matters to our users is that the app works and lets them achieve their goals as fast as possible. In the same way, the testing principles always remain the same, so UI testing shouldn't be impacted by the frameworks used to create an app. The basics of how we test stay the same although some testing aspects could change. For example, in the case of an [Angular app](https://angular.io/), we might need to adjust how we wait for the site to fully load by using a specialized test framework like [Protractor](https://www.protractortest.org/#/).

Most tests follow a straightforward pattern of [Arrange, Act, and Assert](https://testautomationu.applitools.com/capybara-ruby/chapter2.1.html). Whether you are writing a [unit test](https://en.wikipedia.org/wiki/Unit_testing), an [integration test](https://en.wikipedia.org/wiki/Integration_testing), or an [end-to-end test](https://applitools.com/blog/simplify-end-to-etest-maintenance/), everything follows this cycle of setting up the data, running through a set of actions and validating the end state.

When writing these end-to-end tests, we need to put ourselves in the shoes of our users. What matters most in this type of testing is replicating a set of core use-cases that our end-users go through. It could be logging into an app, writing a new post, or navigating to a new page. That's why UI test automation frameworks like [Applitools](https://applitools.com/) and [Cypress](https://www.cypress.io/) are fantastic for testing -- they are largely agnostic of the platform they are testing. With these tools in hand, we can quickly check Remix-based apps the same way we would test any other web application.

**What about Remix and Visual Testing?**

The main goal of testing is to confirm the app's behavior that our users see and go through. This reason is why simply loading UI elements and validating inner text or styling is not enough. Our customers are not interested in HTML or CSS. What they care about is what they can see and interact with on our site, not the code behind it. It's not enough for a robust coverage of the complex UI that modern web apps have. We can close this gap with visual testing. 

![Contrasting what our tests see (with an image of code) with what our customers see (with an image of a website's UI).](https://ewig5qf9cgn.exactdn.com/wp-content/uploads/2022/03/Functional-vs-Visual.jpg?strip=all&lossy=1&resize=1160%2C829&ssl=1)
*Functional vs Visual Testing Perspective*

[Visual testing](https://applitools.com/blog/visual-testing/) allows us to see our app from our customers' point of view. And that's where the [Applitools Eyes SDK](https://applitools.com/products-eyes/) comes in! This visual testing tool can enhance the existing end-to-end test coverage to ensure our app is pixel-perfect.

To simplify, what Applitools does for us is that it allows developers to effectively compare visual elements across various screens to find visible defects. Applitools can record our UI elements in their platform and then monitor any visual regressions that our customers might encounter. More specifically, this testing framework exposes the visible differences between [baseline snapshots](https://help.applitools.com/hc/en-us/articles/360007188691-What-is-a-baseline-and-how-is-a-baseline-created-) and future snapshots.

Applitools has integrations with numerous testing platforms like [Cypress](https://www.cypress.io/), [WebdriverIO](https://webdriver.io/), [Selenium](https://www.selenium.dev/), and many others. For this article, we will showcase Applitools with Cypress to add visual test coverage to our Remix app.

**Introducing Remix Demo App**

We can't talk about a framework like Remix without seeing it in practice. That's why we put together a demo app to best showcase Remix and later test it with Applitools and Cypress.

![A screenshot of a Remix demo app](https://ewig5qf9cgn.exactdn.com/wp-content/uploads/2022/03/Remix-Demo-App.png?strip=all&lossy=1&resize=1160%2C847&ssl=1)
*Remix Demo App*

We based this app on the [Remix Developer Blog app](https://remix.run/docs/en/v1/tutorials/blog) that highlights the core functionalities of Remix: data loading, actions, redirects, and more. We shared this demo app and all the tests we cover in this article in [this repository](https://github.com/dmitryvinn/remix-demo-app-applitools) so that our readers can follow along.

**Running Demo App**

Before diving into writing tests, we must ensure that our Remix demo application is running.

To start, we need to clone a project from [this repository](https://github.com/dmitryvinn/remix-demo-app-applitools):

\`git clone https://github.com/dmitryvinn/remix-demo-app-applitools\`

Then, we navigate into the project's root directory and install all [dependencies](https://nodejs.dev/learn/npm-dependencies-and-devdependencies):

\`cd remix-demo-app-applitools\`
\`npm install\`

After we install the necessary dependencies, our app is ready to start:

\`npm run dev\`

After we launch the app, it should be available at \`http://localhost:3000/\`, unless the port is already taken. With our Remix demo app fully functional, we can transition into testing Remix with Applitools and Cypress.

**Visual Testing of Remix App with Applitools and Cypress**

There is this great quote from a famous American economist, [Richard Thaler](https://en.wikipedia.org/wiki/Richard_Thaler): "If you want people to do something, make it easy." That's what Applitools and Cypress did by making testing easy for developers, so people don't see it as a chore anymore.

To run our visual test automation using Applitools, we first need to set up Cypress, which will play the role of test runner. We can think about Cypress as a car's body, whereas Applitools is an engine that powers the vehicle and ultimately gets us to our destination: a well-tested Remix web app.

**Setting up Cypress**

Cypress is an open-source JavaScript end-to-end testing framework developers can use to write fast, reliable, and maintainable tests. But rather than reinventing the wheel and talking about the basics of Cypress, we invite our readers to learn more about using this automation framework on the [official site](https://docs.cypress.io/guides/overview/why-cypress), or from [this course](https://testautomationu.applitools.com/cypress-tutorial/) at [Test Automation University](https://testautomationu.applitools.com/).

To install Cypress, we only need to run a single command:

\`npm install cypress\`

Then, we need to initialize the \`cypress\` folder to write our tests. The easiest way to do it is by running the following:

\`npx cypress open\`

This command will open Cypress Studio, which we will cover later in the article, but for now we can safely close it. We also recommend deleting sample test suites that Cypress created for us under \`cypress/integration\`.

Note: If \`npx\` is missing on the local machine, follow [these steps](https://nodejs.dev/learn/the-npx-nodejs-package-runner) on how to update the Node package manager, or run \`./node_modules/.bin/cypress open\` instead.

**Setting up Applitools**

Installing the [Applitools Eyes SDK](https://www.npmjs.com/package/@applitools/eyes-cypress) with Cypress is a very smooth process. In our case, because we already had Cypress installed, we only need to run the following:

\`npm install @applitools/eyes-cypress --save-dev\`

To run Applitools tests, we need to get the Applitools API key, so our test automation can use the Eyes platform, including recording the UI elements, validating any changes on the screen, and more. [This page](https://applitools.com/docs/topics/overview/obtain-api-key.html) outlines how to get this \`APPLITOOLS_API_KEY\` from the platform.

After getting the API key, we have [two options](https://applitools.com/tutorials/cypress.html#running-tests-with-applitools) on how to add the key to our tests suite: using a CLI or an Applitools configuration file. Later in this post, we explore how to scale Applitools tests, and the configuration file will play a significant role in that effort. Hence, we continue by creating \`applitools.config.js\` in our root directory.

Our configuration file will begin with the most basic setup of running a single test thread (\`testConcurrency\`) for one browser (\`browser\` field). We also need to add our \`APPLITOOLS_API_KEY\` under the \`apiKey' field that will look something like this:

</br>

\`\`\`
    module.exports = {
        testConcurrency: 1,
        apiKey: "DONT_SHARE_OUR_APPLITOOLS_API_KEY",
        browser: [
            // Add browsers with different viewports
            { width: 800, height: 600, name: "chrome" },
        ],
        // set batch name to the configuration
        batchName: "Remix Demo App",
    };
\`\`\`
</br>

Now, we are ready to move onto the next stage of writing our visual tests with Applitools and Cypress.

**Writing Tests with Applitools and Cypress**

One of the best things about Applitools is that it nicely integrates with our existing tests with straightforward API.

For this example, we visually test a simple form on the Actions page of our Remix app.

![An Action form in the demo remix app, showing a question: "What is more useful when it is broken?" with an answer field and an answer button.](https://ewig5qf9cgn.exactdn.com/wp-content/uploads/2022/03/Cypress-Test-Actions-Form.png?strip=all&lossy=1&resize=1160%2C847&ssl=1)

*Action Form in Remix App*

To begin writing our tests, we need to create a new file named \`actions-page.spec.js\` in the \`cypress/integration\` folder:

![](https://ewig5qf9cgn.exactdn.com/wp-content/uploads/2022/03/actions-tests-location.jpg?strip=all&lossy=1&resize=1036%2C782&ssl=1)

Basic Applitools Test File

Since we rely on Cypress as our test runner, we will continue using its API for writing the tests. For the basic Actions page tests where we validate that the page renders visually correctly, we start with this code snippet:

</br>

\`\`\`
    describe("Actions page form", () => {
        it("Visually confirms action form renders", () => {
            // Arrange
            // ...

            // Act
            // ..

            // Assert
            // ..

            // Cleanup
            // ..
        });
    });

\`\`\`

</br>

We continue following the same pattern of Arrange-Act-Assert, but now we also want to ensure that we close all the resources we used while performing the visual testing. To begin our test case, we need to visit the Action page:

</br>

\`\`\`
    describe("Actions page form", () => {
        it("Visually confirms action form renders", () => {
            // Arrange
            cy.visit("http://localhost:3000/demos/actions");

            // Act
            // ..

            // Assert
            // ..

            // Cleanup
            // ..
        });
});

\`\`\`

</br>

Now, we can begin the visual validation by using the [Applitools Eyes framework](https://applitools.com/products-eyes/). We need to "open our eyes," so-to-speak by calling \`cy.eyesOpen()\`. It initializes our test runner for Applitools to capture critical visual elements just like we would with our own eyes:

</br>

\`\`\`
    describe("Actions page form", () => {
        it("Visually confirms action form renders", () => {
            // Arrange
            cy.visit("http://localhost:3000/demos/actions");

            // Act
            cy.eyesOpen({
            appName: "Remix Demo App",
            testName: "Validate Action Form",
            });

            // Assert
            // ..

            // Cleanup
            // ..
        });
    });

\`\`\`

</br>

Note: Technically speaking, \`cy.eyesOpen()\` should be a part of the Arrange step of writing the test, but for educational purposes, we are moving it under the Act portion of the test case.

Now, to move to the validation phase, we need Applitools to take a screenshot and match it against the existing version of the same UI elements. These screenshots are saved on our Applitools account, and unless we are running the test case for the first time, the Applitools framework will match these UI elements against the version that we previously saved:

</br>

\`\`\`
    describe("Actions page form", () => {
        it("Visually confirms action form renders", () => {
            // Arrange
            cy.visit("http://localhost:3000/demos/actions");

            // Act
            cy.eyesOpen({
            appName: "Remi Demo App",
            testName: "Validate Action Form",
            });

            // Assert
            cy.eyesCheckWindow("Action Page");

            // Cleanup
            // ..
        });
    });

\`\`\`

</br>

Lastly, we need to close our test runner for Applitools by calling \`cy.closeEyes()\`. With this step, we now have a complete Applitools test case for our Actions page:

</br>

\`\`\`
    describe("Actions page form", () => {
        it("Visually confirms action form renders", () => {
            // Arrange
            cy.visit("http://localhost:3000/demos/actions");

            // Act
            cy.eyesOpen({
            appName: "Remi Demo App",
            testName: "Validate Action Form",
            });

            // Assert
            cy.eyesCheckWindow("Action Page");

            // Cleanup
            cy.eyesClose();
        });
    });

\`\`\`

</br>

Note: Although we added a cleanup-stage with \`cy.eyesClose()\` in the test case itself, we highly recommend moving this method outside of the \`it()\` function into the \`afterEach()\` that will run for every test, avoiding code duplication.

**Running Applitools Tests**

After the hard work of planning and then writing our test suite, we can finally start running our tests. And it couldn't be easier than with Applitools and Cypress! 

We have two options of either executing our tests by using [Cypress CLI](https://docs.cypress.io/guides/guides/command-line) or [Cypress Studio](https://applitools.com/blog/getting-started-cypress-studio/).

Cypress Studio is a great option when we first write our tests because we can walk through every case, stop the process at any point, or replay any failures. These reasons are why we should use Cypress Studio to demonstrate best how these tests function.

We begin running our cases by invoking the following from the project's root directory:

\`npm run cypress-open\`

This operation opens Cypress Studio, where we can select what test suite to run:

![The Cypress Studio dashboard, where we can select actions-page-spec.js](https://ewig5qf9cgn.exactdn.com/wp-content/uploads/2022/03/Cypress-Studio-Actions-Tests.png?strip=all&lossy=1&resize=1160%2C842&ssl=1)

*Actions Tests in Cypress Studio*

To validate the result, we need to visit our [Applitools dashboard](https://eyes.applitools.com/app/test-results/):

![The Applitools dashboard, displaying the Remix Demo App test with the Action Page.](https://ewig5qf9cgn.exactdn.com/wp-content/uploads/2022/03/Applitools-Dashboard-First-Test.png?strip=all&lossy=1&resize=1160%2C915&ssl=1)

*Basic Visual Test in the Applitools Dashboard*

To make it interesting, we can cause this test to fail by changing the text on the Actions page. We could change the heading to say "Failed Actions!" instead of the original "Actions!" and re-run our test. 

This change will cause our original test case to fail because it will catch a difference in the UI (in our case, it's because of the intentional renaming of the heading). This error message is what we will see in the Cypress Studio:

![Cypress Studio showing a red error message that reads, in part: "Eyes-Cypress detected diffs or errors during execution of visual tests."](https://ewig5qf9cgn.exactdn.com/wp-content/uploads/2022/03/Failed-Visual-Test-Cypress-Studio.png?strip=all&lossy=1&resize=1160%2C809&ssl=1)

*Failed Visual Test in Cypress Studio*

To further deal with this failure, we need to visit the Applitools dashboard:

![Applitools dashboard showing the latest test results as "Unresolved."](https://ewig5qf9cgn.exactdn.com/wp-content/uploads/2022/03/Applitools-dashboard-failed-test.png?strip=all&lossy=1&resize=1160%2C915&ssl=1)

*Failed Visual Test in Applitools Dashboard*

As we can see, the latest test run is shown as *Unresolved*, and we might need to resolve the failure. To see what the difference in the newest test run is, we only need to click on the image in question:

![A closer look at the Applitools visual test results, highlighting the areas where the text changed in magenta.](https://ewig5qf9cgn.exactdn.com/wp-content/uploads/2022/03/Applitools-Closer-look-at-failed-test.png?strip=all&lossy=1&resize=1160%2C915&ssl=1)

*Closer Look at the Failed Test in Applitools Dashboard*

A great thing about Applitools is that their visual AI algorithm is so advanced that it can test our application on different levels to detect content changes as well as layout or color updates. What's especially important is that Applitools' algorithm prevents false positives with built-in functionalities like ignoring content changes for apps with dynamic content. 

In our case, the test correctly shows that the heading changed, and it's now up to us to either accept the new UI or reject it and call this failure a legitimate bug. Applitools makes it easy to choose the correct course of action as we only need to press thumbs up to accept the test result or thumbs down to decline it.

![](https://lh6.googleusercontent.com/lNjIYT6COAep1C8JlIycMOGgP658Ao4V411CMYK2tSvOACcB8g5rx8tuYCtcMDMEDarMfG2yp4TyhEaCDhRBnAApqtFvIS5zDw9DrMIGIsB6Tadi27EMtMAHB7uJxSSeQgXxqcHb)

*Accepting or Rejecting Test Run in Applitools Dashboard*

In our case, the test case failed due to a visual bug that we introduced by "unintentionally" updating the heading. 

After finishing our work in the Applitools Dashboard, we can bring the test results back to the developers and file a bug on whoever made the UI change.

But are we done? What about testing our web app on different browsers and devices? Fortunately, Applitools has a solution to quickly scale the tests automation and add cross-browser coverage.

**Scaling Visual Tests Across Browsers**

Testing an application against one browser is great, but what about all others? We have checked our Remix app on Chrome, but we didn't see how the app performs on Firefox, Microsoft Edge, and so on. We haven't even started looking into mobile platforms and our web app on Android or iOS. Introducing this additional test coverage can get out of hand quickly, but not with Applitools and their [Ultrafast Test Cloud](https://applitools.com/product-ultrafast-test-cloud/). It's just one configuration change away!

With [this cloud solution](https://applitools.com/blog/cross-browser-tests-cypress-all-browsers/) from Applitools, we can test our app across different browsers without any additional code. We only have to update our Applitools configuration file, \`applitools.config.js\`.

Below is an example of how to add coverage for desktop browsers like Chrome, Firefox, Safari and E11, plus two extra test cases for different models of mobile phones:

</br>

\`\`\`
    module.exports = {
        testConcurrency: 1,
        apiKey: "DONT_SHARE_YOUR_APPLITOOLS_API_KEY",
        browser: [
            // Add browsers with different viewports
            { width: 800, height: 600, name: "chrome" },
            { width: 700, height: 500, name: "firefox" },
            { width: 1600, height: 1200, name: "ie11" },
            { width: 800, height: 600, name: "safari" },
            // Add mobile emulation devices in Portrait or Landscape mode
            { deviceName: "iPhone X", screenOrientation: "landscape" },
            { deviceName: "Pixel 2", screenOrientation: "portrait" },
        ],
        // set batch name to the configuration
        batchName: "Remix Demo App",
    };

\`\`\`

</br>

It's important to note that when specifying the configuration for different browsers, we need to define their \`width\` and \`height\`, with an additional property for \`screenOrientation\` to cover non-desktop devices. These settings are critical for testing [responsive apps](https://applitools.com/blog/webinar-recording-advanced-techniques-for/) because many modern websites visually differ depending on the devices our customers use.

After updating the configuration file, we need to re-run our test suite with \`npm test\`. Fortunately, with the Applitools Ultrafast Test Cloud, it only takes a few seconds to finish running our tests on all browsers, so we can visit our Applitools Dashboard to view the results right away:

![The Applitools dashboard, showing passed tests for our desired suite of browsers.](https://ewig5qf9cgn.exactdn.com/wp-content/uploads/2022/03/Cross-Browser-coverage-for-Applitools.png?strip=all&lossy=1&resize=1160%2C915&ssl=1)

*Cross-browser Coverage with Applitools*

![The Applitools dashboard, showing a visual checkpoint with a Pixel 2 mobile phone in portrait orientation.](https://ewig5qf9cgn.exactdn.com/wp-content/uploads/2022/03/Mobile-Results-for-Applitools.png?strip=all&lossy=1&resize=1160%2C915&ssl=1)

*Mobile Coverage with Applitools*

As we can see, with only a few lines in the configuration file, we scaled our visual tests across multiple devices and browsers. We save ourselves time and money whenever we can get extra test coverage without explicitly writing new cases. Maintaining test automation that we write is one of the most resource-consuming steps of the [Software Development Life Cycle](https://en.wikipedia.org/wiki/Systems_development_life_cycle). With solutions like Applitools Ultrafast Test Cloud, we can write fewer tests while increasing our test coverage for the entire app.

**Verdict: Can Remix Apps be Visually Tested with Applitools and Cypress?**

Hopefully, this article showed that the answer is yes; we can successfully visually test Remix-based apps with Applitools and Cypress! 

Remix is a fantastic framework to take User Experience to the next level, and we invite you to learn more about it during the webinar by [Kent C. Dodds "Building Excellent User Experiences with Remix"](https://applitools.com/excellent-ux-with-remix-webinar/).

For more information about Applitools, visit [their website](https://applitools.com/), [blog](https://applitools.com/blog/) and [YouTube channel](https://www.youtube.com/c/Applitools). They also provide free courses through [Test Automation University](https://testautomationu.applitools.com/) that can help take anyone's testing skills to the next level.`},{title:"ELI5: Spectrum - Towards Better Mobile Image Production",description:"In this blog post, we explore a popular open source project called Spectrum, a cross-platform image processing library.",date:"2021-11-29",tags:["open source","eli5"],slug:"/articles/2021/eli5-spectrum/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_eli5-spectrum_a406ec88.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/11/29/eli5-spectrum-towards-better-mobile-image-production/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/11/29/eli5-spectrum-towards-better-mobile-image-production/).*

In this blog post, we explore a popular open source project called Spectrum, a cross-platform image processing library. We cover this open source project using the [ELI5](https://www.dictionary.com/e/slang/eli5/) style of explaining things in simple terms in the shortest amount of time.

If you prefer to learn by watching, we also have an accompanying [video about Spectrum](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FkEHZJ4CvyeI&h=AT0FAVeQbGjIg494mPM6Ij2gDf9Yslyd-hjQlXDcQgTdewuyocCcDq-W476voQTy198gL4FNO5ItBfgo1hELdQHWK36J5MHtUTPP3ROitYHYshqmUgIg6XgGA4aJRhGz-B_6j-5yrD71ONvofh1aZ1HiJXwx2GVRt4KOyB4vxB8) on our [Meta Open Source YouTube channel](https://www.youtube.com/c/FacebookOpenSource).

**Why Spectrum?**

Spectrum is a client-side image transcoding library. It means developers can easily integrate Spectrum into an Android or iOS project to perform common image operations efficiently.

</br>

</br>

[Watch the video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FkEHZJ4CvyeI&h=AT3KPrBHgycXhvtja843-jPMUpxFPK8ZleUyPP_DEOgGL_6DdSybwpgIy0Fz7LWbzPdIF-WhCzIePqlIUJBrnhd-1vMacWDAl95GPCH7AdtrkRhs_J9s5gpkSxkT8MKiCzXOqR-kgRDtjUviHv44bl2V6e96f6VwXssI7hfRh04)

This library allows developers to upload high-quality images while reducing their size. Smaller image size means lower data consumption and improved upload reliability for you and your users.

While it might sound complex at first, Spectrum focuses on developer experience to make the learning curve less steep. Spectrum's API is declarative, so you only need to define the image's output characteristics, and Spectrum does the complicated orchestration for you!

**Where is it used?**

Spectrum was first open sourced in [early 2019](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2019%2F01%2F17%2Fdeveloper-tools%2Fspectrum%2F&h=AT3cg-r6fImTwK96643kvs8i1H9ty7G57SM7-wUEAODuHQnRtB1Ufakvp5flJAhke7c5hc7UqjsQkaLOm6Dnmtu1kW7ISGX-FSK1g24a9b1XdbvH9gjthXvmIv4Qvn-Ckth9PbC2WspSGjcV-sxxWdgvViJNWaI7L0Ty-AKGJKo). Since Meta first implemented the project, Spectrum has significantly improved the reliability and quality of image uploads that our apps handle on a large scale.

**Where can I learn more?**

To learn more about Spectrum, visit [their website](https://l.facebook.com/l.php?u=https%3A%2F%2Flibspectrum.io%2F&h=AT042IbSiHT-XzcV-dyre1B3ssf3Cymah01uS5Ok1jO5xBRQ_yUpW5O-CHa9GjwSsIJx8YJVOMuN3syBAN4aziFtXmycSyr0mKYxogcfGX8ISBKF_dAv5ElrRCich1wUGq7CN6XLMBrY8M-mkVbAeFgxK7d9uakJEUjA65yvo_E). It has a [getting started guide](https://l.facebook.com/l.php?u=https%3A%2F%2Flibspectrum.io%2Fdocs%2Fgetting_started_android&h=AT2BS9TSNXtVN1tOhAaJjzytNxELhhPk3lHSDeGhVPx_Wxh3nBZKbnDD_4HqSD2l9cv04xTbKP7HaQQ8w_YLzMCD0X8bimjQOp0XuXCCNcw96DaHo49UWfMe0j3b_ZBXI05t4dC7c7Zi461NYKBuJy1TnhMBtXwyfANzD15lNLBQQYxKxkfprUP_), [sample apps](https://l.facebook.com/l.php?u=https%3A%2F%2Flibspectrum.io%2Fdocs%2Fsample_apps&h=AT3_sW6_53EceYVQ4K9RbN13Y-E8hYi_39oM7oGHJGPfz3c0xiwd4pFj4zW9C9z-HpcK8A7OVOi0xmRpj2VNfQBKS-s6cAKKrOFJMKIf3jaH6fut3Zs2PIwt6IqM0Vt3wo5zslfDUFkQEiTlWD89blthLmKG01EywEdJ7arK7SM) and [documentation on contributing back](https://l.facebook.com/l.php?u=https%3A%2F%2Flibspectrum.io%2Fdocs%2Fproject_structure&h=AT33SaNhChtcbN5pWcQM3lSGtvf0mIw84MEh1nzZ-2BkTUbovVdN6nYi9c4Ay-lOhFK7GeNmBtu4YBeXDU9E_SxdavNCc3AudPhLcdLrcQEayokj0_kzMe1o1eN_Dp5zX1Btuiwfa7p-p9xq3n-ma5Q-SprWpDxARottHsEKNw4) to the project. For troubleshooting, feel free to ask a question on the [project's GitHub page](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebookincubator%2Fspectrum&h=AT3_-CZa4tbTQy4-bsDlibU4LFyPS2ipRscW5aVxOkXA7V_JlRhQ8pfcPjq_HSOtLJfJjKJyHhvF66HFGE2RABYnU5eq7rbPJvK_B1oQULSAzCPYOxEJsHXmEmFd6_JdSUgtPCq2jRfAwCS_9PzoHoiAVrbLzvhh9D2svvHBLqM).

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Meta Open Source team explains a Meta open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our YouTube channel.

To learn more about Meta Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT2VJeTZrKYB0zUZuHWYdgL5OFxeARp9WcPeH5QDABMzgKNUujOuOC9Dmad9D7Y7yumPHehYZa4nwJthJY8wZPphRqzvIC1blTxz5tNJOzKrKtThHz19CdKWdoOZ1t7q50m8-NlV-p03RSmoIimayOYqHVym_Y1AzK1i57waKrg), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FmetaOpenSource&h=AT3YrT-fr7o7oqAY9CwYiLOGqwYurtfaglOqMPjpdTCeLTGClykQmNmth_0zuA5hqttc9vnBiTrCLBmYPcVQIaNd9kC9c3SIuhTeG-EXyhNXYOh39AQNzz5dg2qwEV_c4BRePc_3Tztvp6z6wxbijsfIMfJhRp0nkEGsdICb0m8) and [Facebook](https://www.facebook.com/fbOpenSource/?ref=aymt_homepage_panel&eid=ARDXvVAPwnpPxsaQUtdpdrWV6jhb5mz67ET63dJme3yZIeS0ACffMtUeMkdUFwe3UjT61YNDIy_rXwdD).

Interested in working with open source at Meta? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT0lrsy26WpmW1Hxfg3tpLkLfwLNnEGBgSvcftzTRfvuUDZpuFPwGV4rovNf-7f1OlBnMXfUrtNvJ3HQfZ0cfHI1BecL8It4j5GTLCsMkNtzh_ZSrrjm0wHqlFx0wxo6CH5hSWKnN9c7L22vZ_iAdc40LdYcKB8YE4vRtV_Ax9I).`},{title:"ELI5: Open Source",description:"In this blog post, we give a brief overview of what open source is, and why companies engage in it.",date:"2021-11-15",tags:["open source","eli5"],slug:"/articles/2021/eli5-open-source/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_eli5-open-source_22613de1.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/11/15/eli5-open-source/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/11/15/eli5-open-source/).*

In this blog post, we give a brief overview of what open source is, why companies engage in it, and how you can become a part of this amazing community. We cover this massive topic using the [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT24lMzIG45iR6emSl-03oC4Etn68cuMtIgnGQisScBWGb-5XaVQUZNGZBrDeJRUAHLyIdnl-YERFthm3qVCSOaM4s1SXgKDgXWOYOLydF5GlK2hsxDe07D6zf7gSVgtJESc3eFN7v1jOBEPzZry03j8UI2JTIob2TqNfoaoEuI) style of explaining things in simple terms in the shortest amount of time.

If you prefer to learn by watching, we also have an accompanying [video about Open Source](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FOxtpvy7TwIw&h=AT2k_slWbTqkdWyDW3eCKxuq7ByulHybyiSD17cOcwgrCqYcHw95z0HITbXrE6EkOve-xDUDfM7MPbBlwPHPh3ZvTcu1ugxNK8twhlfToADKtNAO9qR_pi_7qh-GkeE_Isjn_DqCYoL_etylYiYNj8GwdGmMMh5I3rAIjy0jK4s) on our [Meta Open Source YouTube channel](https://www.youtube.com/c/FacebookOpenSource).

**What is Open Source?**

[![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/254115763_1608713776149684_8499421405954140753_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=OeHVViHNPiUAX_1tTfM&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDokUqBeEioe4-9_USby0yL572OktuHmp6R6LpQjE_ugQ&oe=63764A79)](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FOxtpvy7TwIw&h=AT0mDVzjz5PxyiyipKPgM5y3BksKJHdNcfQSJi993us5a1ASmsCddyg4sh5epF4nZ8cTOt3K_5i4pWQ10moYWNcEmNVlNakAdRIyOzWGvWBFqvA0tUYfYlvg0fM7lwAHOpTedvgJJCqflV82f9ZjZHPX2-wTPNwsu8bD-DvU6VM)

[Watch the video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FOxtpvy7TwIw&h=AT3dOBi8v6J6Ilm62_SdMcHPrmiaDQ06Ugnnp2ZwErAu-oSX9u_uaWbSBQROd4b2vTKCzD38CwOE0JD4GtVd0EqxSNNu_jHMkJWflOxCzk2N8Ju0vRc2f3UFOtPVTnIxWPoT1sRweCa0u5KPCgqQ5HL0BmV0Zzpj5V5ciDS5O80)

Open source is an enormous topic that has become an integral part of the entire technology industry. More broadly, open source refers to the process of making technology available for others to use and improve. But at its core, it's about the community where all the open source contributions are equally important, whether they are source code, documentation, translations, or tests.

**Why Engage in Open Source?**

Nowadays, nearly all large companies use open source software, either directly or indirectly. As more organizations become involved with open source, they realize the importance of giving back to the community. When it comes to explaining why companies contribute to open source projects, there are generally three main reasons: Leadership, Community, and Productivity.

In terms of leadership, open source brings together developers of varying expertise to give back to a project and each other. Their unique perspectives help to evolve open source and to make it better. By being a part of this effort, companies can be leaders in setting up a direction for the technology, including establishing standards, providing support, and driving further collaboration.

When it comes to community, people are the very foundation of open source. Developers, writers, translators, testers - all their work is what makes open source complete. These people bring their diverse backgrounds, insights and perspectives to a project, making it unique and exciting. This culture of openness and passion for contributing is what defines open source.

Lastly, open source leads to increased productivity as collaborations happen in public at a much faster pace. This shortened [feedback loop](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFeedback&h=AT1XVpmnhEQT2zbZ6QUnyk_Z6YHH0wpYWxForH7NcOiYdzTlaQwKh3XvR5X1vBfwkz-toyETVVlGSxc_J0rDQzzyIXc3Af868LDvJWPWiKHGzFUuKs7gj4tcYyETrO2WGbDaTHoiw-Jrdj-7WPgM4jY_J0fSdQ_jARZEXIXB7-0) helps teams iterate more quickly, making their project better and more responsive to changes.

Here at Meta, we believe in empowering diverse communities through open source technology. Striving for a welcoming and safe space is our goal in open source.

**How to Get Started in Open Source?**

After learning about open source, it might seem overwhelming at first. Where do you start, how can you contribute, and is it even possible to become a part of the open source community? The main thing to remember is that your perspective and expertise matter. Whether it's a code change or a documentation update, the community wouldn't be here without all this work.

To learn more about starting to contribute to open source, watch another video on this channel by Cami Williams on "[Contributing to Open Source for the first time](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2Fc6b6B9oN4Vg&h=AT2P-jT6COqRma8zFDrTDkrgW_5ZYe1zCAUzxfCDYFNHPKeE3P_w9RJlwfA7O1sJObC5byBaCuVx0n_Lg1N0T3AfbJEBwr6E7kT2KKDRQqVDQOF_hY_vlvENEkzppPx-5zwx0mtRSLe7c7XgqX_DYGiYxM-rkS_kmXFIuvLzVJM)."

**Where can I learn more?**

If you want to learn more about open source, visit the [Meta Open Source website](https://l.facebook.com/l.php?u=https%3A%2F%2Fopensource.fb.com%2F&h=AT3fEktCVLPS-DwsTQg3c9UHTQzPusrOI1Rh2lw3oa0Rf0dHDGrSAZrlrZMIEKMyISQhpbHRMVLl7JKxjO9X01y4qfdQlh_qr8K6Gq5Nj64AWEviwlq4uPWTBRT2kRhP7pd-6d91H9aEwQ2slaW9zHayzx-bCT4qyCyo1f94owE). Our site has links to videos and blog posts about our amazing community and the OSS work that our contributors do. You can also subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT0ZTXshFVKPwduwMA1FU0heGzSP4BC2N0NvcZ_2K2H70wyWV9RmbIrhxtqBMnEO1El8gssw3O8rk06dUjSjcTBgiSivs6yTGnM2YxvQZsuNBfP85nZyRUTmEbBsDlr3C8Dppj5cIn_7KCrgqeiuenXA0ynADIfu3SuKFQJ3Dnk), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FmetaOpenSource&h=AT2CSOjw4NLyP9ChFii7j9jThvPCZIvSoWS5weQop1x0sIqTa-VAEb-UGJnTMuziNSnFoHjftAUW3PpVJoFO6uo88F99AgMQoKPVltVa6_jjSNyDxVpLNURwJxWG7LsAImFApLoAHT4kQ9vBHvRwsiaJ8Gjt6bk4erfxFY5aieM) and [Facebook](https://www.facebook.com/fbOpenSource/?ref=aymt_homepage_panel&eid=ARDXvVAPwnpPxsaQUtdpdrWV6jhb5mz67ET63dJme3yZIeS0ACffMtUeMkdUFwe3UjT61YNDIy_rXwdD) to get the latest news in Meta Open Source.

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Meta Open Source team explains a Meta open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT3dcXmbuZqMVa4t6ek9Zb7PDHCE6pt9_kPwPxuHh7SdbwCOIoJ1wiyQhzEKKnmuZMUiof-6hExIiotoltc0-jPW-ud8Bzet9IYVR-ToSy1iWC6vGrtFs2vZw0VKOKTttAylI-XaFDssMEzz4JogeWRVYwODzN_BkEaN0jtsHdk).

Interested in working with open source at Meta? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT2sWOasJSCjCA_UUuuRAPQQdE3gW64htaVJBM_4KdKPu6HqAyJM79gnhpm5OOzbb3gX-VKT5CjHoRAILdHBNsFf8CL-GF3Gk4KVCzoSBceb8RrFg5FsyhsK9FBO6nI-lqFz3EJuhMln5lIZUJK7FbIt1N2P96qsALaULEJHzWs).`},{title:"ELI5: Metro - JavaScript Bundler for React Native",description:"This blog post explores an open source project called Metro that acts as the JavaScript bundler for React Native.",date:"2021-11-01",tags:["open source","eli5"],slug:"/articles/2021/eli5-metro/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_eli5-metro_11752f28.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/11/01/eli5-metro-javascript-bundler-react-native/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/11/01/eli5-metro-javascript-bundler-react-native/).*

This blog post explores an open source project called Metro that acts as the JavaScript bundler for React Native. We aim to keep this post brief, following the [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT30Lj7KDFX0XM9pFbpWzLhVJqFqTyDsc5tdxAvl65V9o3Hjc5aihLZSiY6PKCS8as0NajHhjocUevhowAgWnlBgLfIFbT5KOBUQkoo8WMtPIDFFUkzaK5-g2TGdxyvVA7qFbhSRWFbLEWZLB6M9ocroCyHHnGROELxNG1zU228) style of explaining things in simple terms in the shortest amount of time.

If you prefer to watch an accompanying [video about Metro](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FE13sgMCODDk&h=AT2PyxbalyFYuf3283DAVeD1nkcnX218bGkoSic12O9nlqM7_gYABQXJZF-DCWN_FXwYJJwiHNpp9GBIF9Jk7bkLBf_hyi77FJ_7S1kVizE3RA7LOpM5l5siBr1z4Tl_cZTCby_zJMeFggeqfl85Dc4k9WEeRaYMRVSf2DWaS5I), visit our [Meta Open Source YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT0AuEaAO7_o_3ARLQGqft_FrmjYEGeoaLFJA9P58Q6fLRcFUjW0dKKIpkOqYLCaK0dYEz1kzBMUH2bO-DbDH-6XYeaSgbJCvdlN90vWg9U59sHJ2fEUlrBsY029LhFrktS6CLpodZqkMEeCYFmXEG-3_vfq5LsQg9lrqTNPd7g).

**Why Metro?**

Metro is a development platform for React Native. This project acts as a JavaScript bundler; it manages assets, caches builds and performs hot module reloading.

</br>

</br>

[Watch the video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FE13sgMCODDk&h=AT2AnjbjLRN8edu55wdwV2HKgrJn0PF9PJD5qjwsrAEdmC_nU5vtLYoA9lrOpO5YiZ1CdHmdiEj9flopVZ1bO5m3myWQr4yVhXd-njrtbYiEqD9weQBWRx3NwcdkVDomKqIX3Hx8vdBG5zq4swu4YOJNyeE0UyOPugv8IPIqVvQ)

Metro focuses on improving the developer experience for the React Native community. As developers work on their code, nothing is more frustrating than seeing your app taking forever to reload after you make a change. That's why Metro emphasizes speed and aims for sub-second reload cycles, fast startup and quick bundling.

Because Metro has been used here at Meta ever since its launch, scalability and reliability are battle-tested on our massive codebase. Metro can efficiently work with thousands of modules in a single application.

One of the best quotes that describe a great developer experience says, "if you want people to do something, make it easy." Staying true to this statement, Metro by design supports every React Native project out of the box. In other words, you don't have to do any heavy lifting to make Metro work - it's integrated from the start!

**Where is it used?**

Metro was made open source in [2017](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact-native%2Fissues%2F13976&h=AT0FZzw-FLexGHHimGhs3StcJVkSyLqaTTVN604Bgvh4-DqLzQelNCBlJWNoa-knATL14sfuBoKwASHuN9syEM3H1WI_c7fDVZnUdg0OvJJ6-BhkWW8gR_TGupWN8G8abg09DuKZFR4GRzMGIqSOw1Zk5RDnjK-k2QcR5kdpjr0) by Meta. It was initially a part of React Native itself, but it was later separated from the project, making it easier for the open source community to use, report issues and contribute to Metro.

**Where can I learn more?**

If you would like to learn more about Metro, visit [their website](https://facebook.github.io/metro/). Metro has excellent documentation that includes [getting started](https://l.facebook.com/l.php?u=https%3A%2F%2Ffacebook.github.io%2Fmetro%2Fdocs%2Fgetting-started%2F&h=AT3oG2cgAA8ZNhgyKMylUaxJwfPgL3EH1DQfIoX1ErI27Op_YZ-KXmbDdQdJa5_07XnQMWdIgR0ThZ2bE3rvcZkTRBBtIIpmgjL9NBlP53POsuqv-pqtCSRky19ps7RbtdWcxKNS8BBTe78VCEXYqQbuR_ukkNGr84hhkSjXWByePmfZUeJMRQof), [troubleshooting](https://facebook.github.io/metro/docs/troubleshooting), and [configuration guides](https://l.facebook.com/l.php?u=https%3A%2F%2Ffacebook.github.io%2Fmetro%2Fdocs%2Fconfiguration&h=AT1T_vAuDi4UH1mel0zQ5l68DXYO7K9PEd8QtQggMxA8hU6KmDySB7Z9MluOXoitdsVbiA0RtXJ29F97A3wnUPyrj6CSPYNSOuwC47-B8rP0MI-2BJqX-k10_OeDt24AjxmIrseogoOwivSapUqlTJh3j7D3S_rldTDu1EtESmk) for the project. If you would like to ask a question or meet the community behind the project, join [#metro](https://l.facebook.com/l.php?u=https%3A%2F%2Fdiscordapp.com%2Fchannels%2F102860784329052160%2F103622435865104384&h=AT1ewgRsZnAG92Gn10E3sw3zZ46jMkUENbPsDTPLEWCK2XiZdbVHlC2tZW0SdVuM9TJaSYAlmGaixvH44A7Sc4wwxc9kJrjv_HeuOLkUKT5ZSt6IH4fpTa2dnYzGuMBw6ffIOaakvqXfcWO_Svnfe5wH53Lc5seYMkmIrnIBBJI) channel on [their discord community](https://l.facebook.com/l.php?u=http%3A%2F%2Fwww.reactiflux.com%2F&h=AT3l0-SVqL4XMxaCpceOYK0MXgBr1QLMTpHmJHH0qv_V2SeI6o2SGwhlp0T4ha7UN_IIgXO-SM7XRTufhV3mgbKh0SpAyB6N1FDFCLPjLa-dBL_F5r_ViePTG3rtQ-Yt69Q3p_ttPsWn_Htxwb9faC2AfcUOIkYMwg5VqEvCXBY).

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Meta Open Source team explains a Meta open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT1ZJLiokm1LfcEvEzRLRL_G726mpezg86RFVfXHzdY6TpjYtN9gfJd_7kSBz_vmmVZwo7w6gBht7s6xmKJzwJhFfVrOIDcgBpNZ3VzWdhUJ08y8zeYC5XVpQ4dmlYs6mxqBwxXqfuTUwfEk2fH0LZSnMo6AMuOwhOw2-Emdn6w).

To learn more about Meta Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT3qorV2j7K12AGY0J65xgKBcIjAz_Xu3XRD3xphP7KWLA1uJjDy3wgxgYz6HSRzKx21mna_REylxPZqE6Pmm-Hwz8NmsroSyXYl1I02hu3agJg0yErqHK71i7jjIqmoZsFC16A2UcJIM_YsswLOhd3vBdR4B6_gCan_H57r-kc), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT0lYFJLl72RvlrK0gwQLW4c3Ygd5P9clF0wO-m2Oy0q4TU0r0qGG2Rx6IgYYNmiunoV9GJgtXsixhbxn1djnVjxQTULR6YBgC7KjtGhYTEV7mvL_FAMGjP_kIIxdrBeeVAu3nu7dSkV9zG0Owq1rU435ZmrmmOeC6acdHy6nFg) and [Facebook](https://www.facebook.com/fbOpenSource/?ref=aymt_homepage_panel&eid=ARDXvVAPwnpPxsaQUtdpdrWV6jhb5mz67ET63dJme3yZIeS0ACffMtUeMkdUFwe3UjT61YNDIy_rXwdD).

Interested in working with open source at Meta? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT2rSUckMTG3PqkAOFX5pw7vaXGTanFL_MaDfxa0oHvHPClC1u6rMBNO0eYemcpqDOh5LVOVL3EgvU3gesjR2lbuH5nSnEvxXkWQlK47hMu2S972P4VcKcZEA_GfzKstit-tk3P8jVnHwt7nQxaAItTFWtolDoseIEiP8l45Edo).`},{title:"ELI5: IGListKit - Building Flexible Collection Views for iOS",description:"This blog post covers a popular open source project called IGListKit, a data-driven UICollectionView framework for building fast and flexible lists in iOS.",date:"2021-10-18",tags:["open source","eli5"],slug:"/articles/2021/eli5-iglistkit/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_eli5-iglistkit_4e471403.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/10/18/eli5-iglistkit-building-flexible-collection-views-for-ios/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/04/15/eli5-infer-finding-bugs-before-you-ship).*

This blog post covers a popular open source project called IGListKit, a data-driven UICollectionView framework for building fast and flexible lists in iOS. We explore this open source project using the [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT3Fy1zR3qftmN-nc7BNGi0TPBxCqeh6qmwsAihKVA-eyw-nm7AT763Bq3CD0qJlMospB2COL-haRPpT1FiMbllmvxaRCURetNOksNwpp5AC_Gr8zNu-DiQIxlKURcWWGuvK0T06YesiLq9scGpiFdUySeXtveBY_xpwZXgX_k8) style of explaining things in simple terms in the shortest amount of time.

If you prefer to learn by watching, we also have an accompanying [video about IGListKit](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2F3-WwZaiuJ3g&h=AT1WeXoLYvD6iNc5U_Jh8nwX2M6EzESDzNzCLq8GDcwdwQMuB_4VhzLRujKa7aJDFlJ0KGFKLwyp1fo-LIiJt82lfeBxiv0VgAK_CcgPkdu9_9IyrwY7HpANcuQYP73WcpAekN64LwlamBwBVU1U02bnGz4wQw4NaYJCiDHTu-g) on our [Facebook Open Source YouTube channel](https://www.youtube.com/c/FacebookOpenSource).

**Why IGListKit?**

Today, most large apps rely heavily on scrollable data feeds for their users. At Facebook, we've been dealing with large scale data processing for quite some time, so building a robust framework for displaying the data was a tremendous help, and we wanted to share it with the world. This work resulted in us open-sourcing IGListKit.

IGListKit is an iOS framework for building fast and flexible data-driven lists, or in more technical terms, UICollectionViews.

</br>

</br>

[Watch the video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2F3-WwZaiuJ3g&h=AT3so-3CDV5jwYFz3XoD46Ge4yeEb7UAjYHwNIEUsfO8bjpJe6WS6BFNtqAV7ghE2zA6KdjnKHS2L7wX3mMiMCVqfBdWFIeIgIBlWR8sE0lU8ndhqciZxBVEb7kPCSobZDAhJCR32T4BDXBjcYgNUZWVbfgk4pIw3NEvLbqjISI)

One of IGListKit's goals is to simplify the development process. The way this framework works is that it first accesses an array of objects to display in UICollectionView. Then, IGListKit's adapter creates section controllers that handle creating individual cells in the list for each object type.

Another great feature of IGListKit is that it keeps your data up-to-date. It means that this framework monitors your objects, and if anything changes, IGListKit performs batch updates on the UICollectionView. With these updates automatically handled, you never have to deal with this error-prone operation ever again!

**Where is it used?**

IGListKit was open-sourced in late [2016](https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram-engineering.com%2Fopen-sourcing-iglistkit-3d66f1e4e9aa&h=AT1M7nkMEkHnnm2j0mFb4aINLuRQwleemj9QLgSUNT20iHJ30EFSpCqdHm_7QuK9Ygcnl1mtgrVdYg7PFrdg_HjHFVQdAvBfU0Hi927yL50oeKyT6xLC6XLn0FLntjTkdpjoq9hjMDK2hBht-UUNHYLVMIOCK33P4sr_kXfCnNo) by Instagram Engineering. Since then, the project has gotten over 12 thousand stars on GitHub, and its community continues to grow.

**Where can I learn more?**

To learn more about IGListKit, visit their [website](https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram.github.io%2FIGListKit%2F&h=AT3YsortlG9etMOWrdxAR6ncFFZ3ebctnJFN6GC-a_Hg1u3dV1YHxiaII1OOgJxxIGIPwEf-OxFBuihkYigaaYMHl0cbPmB8tptU6FMm4-Tf1_OLFTTBVlIq5dVrEbuFCx0aKUgOSDi2Op08uHxhR1GZEBR050X4-5SZFvUrADw). It has several [getting started guides](https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram.github.io%2FIGListKit%2Fgetting-started.html&h=AT2ERf4nfMne1yFfjE2_Ox1tABqPuq-NF9Nt_bTFJbcix4vh_pIFbD_rsjZ0Yoy6uqIV-QXXobj10n8lPKRYW9gpTbxoX8l8phF8mz0a_8LnGUVjRnFxeqWvuZbwZ7di0xXKUrO-sOUtrK2xDN5086TkKDM3isN-fdp4T6KEIEg), [examples](https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram.github.io%2FIGListKit%2Fbest-practices-and-faq.html&h=AT2CkUETI_ZedqZYhrPdfQ8A9rPjMxAVBWhHeQKiME8a_cm2QVVDHCru4lDubahfm2jCjCVy3aFs-Qivrotuadv1K8FwpOQPiQaVi7Fir9DcVIAy_ghBS7aM70P0wDMPczq3oFN9QkhaWWaa-SVA3yYWSNiMgqSCyZIDD_LpTi0) and [API docs](https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram.github.io%2FIGListKit%2FClasses%2FIGListAdapter.html&h=AT33WBU2iRhDbZl64lu-41GdyU6vAyhgPsO8i7B4hea-i5oxIB93LvIJ3PsLryCcMBZIoB59GTMl5bYxmhnPtDObkyHh_x6ahmg84PO-yGgqD1T6qs-vmj3ZSfLgNXSc8YqtqzdUFoyfPyCUIu7nFzJxoczgXRdwGFg_YQujHNo). For troubleshooting and the latest updates on the project, feel free to ask a question on the [project's GitHub page](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2FInstagram%2FIGListKit&h=AT0nPuNyo9__m2Gyc-8RfOHBj_q4FtH2BqgURVfpGEc3YLZsQqPxZdZxXw98M-W-oQNeop2Uux-weeN5A2uFcjF63AvEb4CCt-yJq6HZ7jDMBiJKC-mjo2fqeM381pNf06rx0FGyyUmNtoTlWTRokLB2TiQKiZ_AHZMmR3haShs).

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Facebook Open Source team explains a Facebook open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://www.youtube.com/channel/UCCQY962PmHabTjaHv2wJzfQ).

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by taking [this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT2sOFm2ezirOwcurbPxeRTDaOpgbxbnsnrwMju2Jgk9F3zAAU9_BGOKpx-5hkHCvi8LihlhIflX-DQJoWR68FC2AKg9SsgZi2GWEYmH6hDNxfE_7J0kxDhvyga_76agamKhsQPJbh4b_he4qVfcVlNDpSyDZVM9oZj8ZyUQDic).`},{title:"CacheLib, Facebook`s open source caching engine for web-scale services",description:"CacheLib is a pluggable in-process caching engine to build and scale high-performance services collaboratively.",date:"2021-09-02",tags:["open source","data"],slug:"/articles/2021/cachelib/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_cachelib_0b7618be.jpg",canonicalUrl:"https://engineering.fb.com/2021/09/02/open-source/cachelib/",body:`*By [Sathya Gunasekar](https://engineering.fb.com/author/sathya-gunasekar/ "Posts by Sathya Gunasekar"), [Snehal Khandkar](https://engineering.fb.com/author/snehal-khandkar/ "Posts by Snehal Khandkar"), [Dmitry Vinnik](https://engineering.fb.com/author/dmitry-vinnik/ "Posts by Dmitry Vinnik"), [Michael Cheng](https://engineering.fb.com/author/michael-cheng/ "Posts by Michael Cheng")*

*Originally posted [here](https://engineering.fb.com/2021/09/02/open-source/cachelib/).*

Caching plays an important role in helping people access their information efficiently. For example, when an email app loads, it temporarily caches some messages, so the user can refresh the page without the app retrieving the same messages. However, large-scale caching has long been a complex engineering challenge. Companies must balance the fast experience people have come to expect from caching with keeping systems highly performant and cost-effective. Traditionally, each cache implementation is created and maintained independently by different engineering teams. This approach isn't efficient, since it ignores different caching systems' shared challenges, from deployment to maintenance. 

As traditional dynamic random-access memory (DRAM) caches become more expensive and require more power to scale, companies like Facebook are exploring hardware choices such as non-volatile memory (NVM) drives to augment their caching systems. This DRAM and NVM hybrid model is a step forward, but innovative caching designs are needed to harness the full potential of the hybrid cache. This includes new caching heuristics research that must push the boundaries of traditional systems by identifying the relevant content to cache for the right duration. We have consolidated these innovations and taken them a step further through collaborations and open source work. 

Today, we're announcing the release of [CacheLib](https://github.com/facebookincubator/CacheLib), a pluggable in-process caching engine to [build and scale high-performance services](https://www.usenix.org/conference/osdi20/presentation/berg) collaboratively. CacheLib's C++ library enables developers to build and customize scalable and concurrent caches through its simple API. We are also open-sourcing [CacheBench](https://cachelib.org/docs/Cache_Library_User_Guides/Cachebench_Overview/), a benchmarking tool for evaluating caching performance on diverse production workloads.

![CacheLib's C++ library enables developers to build and customize scalable and concurrent caches through its simple API.](https://engineering.fb.com/wp-content/uploads/2021/08/CacheLib_chart-copy.jpg)

CacheLib is leveraged as an in-process cache in more than 70 large-scale systems at Facebook, including the social graph, content delivery network, storage, and [look-aside key-value caches](https://research.fb.com/publications/scaling-memcache-at-facebook/). This existing scale and the potential for open source adoption make CacheLib an aggregation point for optimizations and CacheBench an effective benchmarking tool for evaluating new ideas across diverse caching applications.

**Enabling innovation through partnerships**

As an open source platform, CacheLib and CacheBench have the potential to become an industry standard for caching innovations and benchmarking. To date, our collaborations with research universities, hardware manufacturers, and software companies have yielded substantial results that show the value of this toolkit.  

Over the past two years, we have partnered with many well-known organizations to push the boundaries of caching innovation. Today, we are working with Twitter on integrating CacheLib into [Pelikan.io](https://github.com/twitter/pelikan) to enable SSDs for caching objects within the Twitter infrastructure. Pinterest is evaluating the adoption of CacheLib within its machine learning infrastructure systems to improve prediction performance and system stability.

In academia, researchers at Carnegie Mellon University, Princeton University, and Yale University are using CacheLib and CacheBench to [prototype research ideas](https://www.pdl.cmu.edu/PDL-FTP/NVM/McAllister-SOSP21.shtml). By evaluating their prototypes against industry caching workloads, these researchers can iterate on their projects much more quickly and accurately than before.

We have also collaborated with hardware industry partners like Intel, KIOXIA, Samsung, and Western Digital to standardize and enhance SSD technologies which enable improved caching solutions. This work is now part of the [Open Compute Project (OCP) NVMe Cloud SSD Specification](https://www.opencompute.org/documents/nvme-cloud-ssd-specification-v1-0-3-pdf), which we discussed in [this webinar](https://www.opencompute.org/events/past-events/webinar-data-center-nvme-ssd-and-edsff-presented-by-facebook-sk-hynix-kioxia-intel-snia). This specification, along with CacheLib, will help adapt future NVM technologies for caching workloads across the industry.  

CacheLib and CacheBench have enormous potential to shape the future of caching, thanks to its developer-friendly API, access to many benchmark workloads across the industry, and the collaborative nature of open source. We are thankful for our partners' support and contributions in using the platform to drive innovation in such an important and complex area. We are open-sourcing this work in an effort to make building the future of caching a more collaborative and open space for sharing across the entire industry. [Read more about the project at ](http://www.cachelib.org/)Cachelib.org.

**Press Mentions**

- [Phoronix](https://www.phoronix.com/news/Facebook-Open-Source-CacheLib)`},{title:"ELI5: Flipper - Cross-Platform Debugger",description:"In this blog post, we briefly look at a popular open source project called Flipper, an extensible mobile app debugger for iOS, Android and React Native.",date:"2021-06-08",tags:["open source","eli5"],slug:"/articles/2021/eli5-flipper/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_eli5-flipper_43b5c205.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/06/08/eli5-flipper-cross-platform-debugger/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/06/08/eli5-flipper-cross-platform-debugger/).*

In this blog post, we briefly look at a popular open source project called Flipper, an extensible mobile app debugger for iOS, Android and React Native. We discuss this open source project using the [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT2ZimAw4iw3SD180iZx6-Fb0B88RstyssKfoufSLs6897ZyThgaqvu8mk4O_cNpfX3wkzpaDkd-fAT7uwZV8NvX72QMMZSdQqeEchseNjA4c1IhyaOxyjqRAuNPvPTJRBU0v4KDGIHK2wkioLUgQbhZXmyvvL1CwJWt8ifDkog) style of explaining things in simple terms and in the shortest amount of time.

If you prefer to learn by watching, we also have an accompanying [video about Flipper](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FtvqZQVI7gKw&h=AT3rFdiJNor2dmusj2Vnd9EPvXhe5UZ4cnahkcZvJezAntMUEDyTd0njfVDDK8hwGyuRZBJ4skWTFYYBgvcnLeHDeArTaylrCeaTiLHjSqdv2lEW6Gf9pPHQxaRFHl5sPgpkSFN9PQEtHBCM06cb_TTEzArCoz7Iz4QkF-wA__I) on our [Facebook Open Source YouTube channel](https://www.youtube.com/c/FacebookOpenSource).

**Why Flipper?**

Mobile developers know that [debugging](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FDebugging&h=AT0Uzf69e8mDmTJfbuTMtwjex_z3BYfvauhsWdqTFJ87MyV1FOlzM8rH_riCtWtFXaxZt3of8qE2zJJCqrAVZ2LVf9m4_c34vfexiwM3Rk00t_wcGFFwq3Q1XbUtX-KMmEAmYv_VHPk78bDtBi9KsLfMA_pXn4b4y-ZfLTcsmzE) is one of the most challenging and lengthy tasks they have to perform each day. Finding and resolving bugs in cross-platform environments like Android or iOS become even more difficult since each platform has its own unique setup, workflow, [emulators](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FEmulator&h=AT2WgLY0OG9XBbjzLosHm90-SbQbu10Tq8EIfFmMvlUSAcLcpeLJw5Ao0oStlOLN1aYeAqMJwyS0QEENvaYEJAzUsQqzbD4A87GKBoAKh7lSNOzGnHh7VPHxu8XoF8AZTwwAdjW5cJImuw_P69gSyXEC7aa1djbl5i2ZDLHWPn2_a1FTCKovifmF), and more.

These challenges of dealing with multiple mobile ecosystems are why Facebook created Flipper.

[![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/198679661_189930163042689_7947393380829628555_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=jKqwK6JkxgEAX_JLbcb&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfAuL4FUkUs7UwxBwwHttZFkuSMBXxWUe-Yr_7zC_1EXqw&oe=6375D3A5)](https://youtu.be/tvqZQVI7gKw)

[Watch the video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FtvqZQVI7gKw&h=AT0WM1vz2eHFBWZTwPvKedUSO5rP_11CalgNNctq2U3S_OFijPT9_zNwb9zIuq8Cb1vNwQzExbrZO8pZQZn2YkZ7Uw9LmRmvhB_1gKEMUdIPTSisGjTjFmeGtlMhLawv21mOwIMUXu0ytOYPgu1tYZuLReIP3xdU2JjgDBbOIWQ)

[Flipper](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbflipper.com%2F&h=AT0fj6hABQD7iIHRcO_Pu5UqTQDr7bA-oqDGMPbie9re8nvAKvbJYeUczZQv_qyeLktWCsfjY7QPeu6H00B3n9EcpOITW-NLZf8fE450o15fDxPO7Nmk6OPt--kEguRJMIadxga7nmtogYD85wAiwmPAgv0agjhFtmKpOUpxrKs) is an open source platform for debugging iOS, Android, and React Native apps. This debugger lets you visualize, inspect, and control your apps from a desktop interface.

Flipper acts as a toolkit for any mobile developer who needs to debug an application. This debugging platform has tools like a log viewer, an interactive layout inspector, and a network inspector.

Another great feature of Flipper is its extensibility. This project was built as a platform because we wanted our community to extend the project's existing functionalities and create new ones through a [plugin API](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbflipper.com%2Fdocs%2Ftutorial%2Fintro%2F&h=AT2D0f-fkvE4B0Mz44DTT4zYn-AFX3YYOHlcnxa0cgSdrN-pxWZ9Wm6Lx-xU2rQ3dRBYhF86wF6c4Nhb41QPrNn82HtbdC5Ps4OZb24ShwD2L5nXl3SESqRASYT_cZMQTZZmlI8aKVAHFQ2Y2e6gbXeT-jSEvF4joyLmz0JB9F0).

**Where is it used?**

Flipper was open sourced in [early 2018](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2018%2F06%2F11%2Fandroid%2Fflipper%2F&h=AT3WoZtoxmAmc-9LpFckJSj9T0ns-QY_6ZKvEo8jZEIpw-OIQL6_WjLOoFNpzF--I3G7fczipL46YtYsUaSoeZ--rwapsOmBWeLnXyciQPSarLzdHaNm5VDO5pOhUZdbvdTXxoOrfSDq5n3ZS2TkEq1oeI5KEEUCFpVzsVIoors). Here at Facebook, we use Flipper extensively with many plugins developed for use cases like setting up mobile builds or collecting crash analytics.

While frameworks like [React Native](https://l.facebook.com/l.php?u=https%3A%2F%2Freactnative.dev%2F&h=AT1aWdbPMvpicHeG_VAXt7S_8EX-qpZe2tquJJIiePGghDKLP8zhDnhVPIU-aq96XXLWCldFlbzAamMfVjJIj8hzlNwLgv0717zcc_kygWbrPMIMxxb1tSrfQAvDoFeP6-y6hBWyZnDbpQqJTpwWF3CsfJqwJp7sH-bAvcG3h78) are shipped with first-class support for Flipper, numerous popular open source projects created Flipper plugins like [Redux](https://l.facebook.com/l.php?u=https%3A%2F%2Fredux.js.org%2F&h=AT26IhPdfStjEp8sYymxdtsjAdnaop8jx95oOSnbmCu8id56wdH07LNzHaFa_DNFGAiDB51icidPhXyHeiKmiE42c1cqUihhd8LMs9e2o7CS9KtdDWZxOKn6OXyZr0UWjAsrGRmmpPpA3Af9gOWF8T95snod9LrE83SqfNTZj0I) or [Litho](https://l.facebook.com/l.php?u=https%3A%2F%2Ffblitho.com%2F&h=AT3r4fGEKm-ZKB-hjG0dRH--jziloBBLylVha5QMpaO0evGCXfxUCzr3_TwIl9p9o7vJlEuaNXxA8GmFNiXWpBqsdEfADoJa9nd5HPU5h-ki8GEuf3TTIbg_Lh2jfq4fYTgIZfkj0jZTWlpb6OqU_HpS0XvPly7-0HCdBmBBggk).

**Where can I learn more?**

If you would like to learn more about Flipper, visit their [website](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbflipper.com%2F&h=AT2MnPOwOU5LqC8Kv2Amc6p1DQNR2YwKzWKJIEdMDgTq3GI4_LUu10sLrOa0-b6pHFrFG7rJTX06U4PZcXkwB4Lo6766fW8NhSWCKLACv8MPJCJqwDpLKo5mdQtIDMbTjm5oshmEjDzK3-J-oB3rJTdBmWbVWFYrHGdSyg-JAjI). It has [extensive documentation](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbflipper.com%2Fdocs%2Fgetting-started%2Findex&h=AT2wkS5xoWQQNJvrFJOHyNJJJgytuobz6KTZBz9ml0rd8M8aVOGyTX3yhJ-SYSC69JlDxbOHpFdx7XqdHqWsaKeCVacMQnWoODtm221KJigNZsla4jtBvNrJCUGD2bAym58UBoTl3RHtYTLIDXzxPAct2ejJeI7H9HMrjtRqa9E) and [tutorials](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbflipper.com%2Fdocs%2Ftutorial%2Fintro%2F&h=AT2KwHcEwMP60oPun7RP6he8m8mzK8vhrW0WRWlCApwEGLOdksPxrSIhXBmDYCgrN5j_LGkM66iQkYcS6kYl3IfJ5HuqN3TgXD9diMRJW5zW7e8syBDRKyRfqa3TQIm28pAi0tKQHHIcRC4aWOPXuGqQ_4m6i190itqDdt35WDE) to get you started with the project. If you want to engage with the Flipper community, we invite you to follow their [Twitter account](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2Fflipper_fb%3Flang%3Den&h=AT0fZisPCSfZxAsdSeZ6KPYRvnaVXOy3CEFUgCs27VmAcFSDpq9GkBGjcr3MIg1dqJMrtW5Txp3aFgSFanrJzyTEivReysAp_3Og6f7Rs0TLJ6Mh1nsFxRRvRPEobjWCyRPGft79_UN2LRJAUWYbgtbgj_fYNq6eH7drnYVqvoo).

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Facebook Open Source team explains a Facebook open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT3WgaSKrYRHzGhi7Ygu2P8bL39ISq0HW-h6_TyGONm5y3lITFHrQZKk9GI132A4osk4yMXuspmTOaFfQLvYGlvOAFjVqyCfhgWJoLeh-1dV2A64vy41yB9KpHzpWAhvbF2wn_tVjGlL8_fSJjFkr1j6iYv5AteXX4ivIkkwBj8).

To learn more about Facebook Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT1Xf3DoPxdLTUXm_bYOybvrvGAZ4ATJ7kz7i_saVeQYtABK6rAinc_aAK5UDeUD_MfV-7THEVJFvNHRo8FiXGe0bVs_2Ms2UQKDTScbNNUnLu0GnhO-IxEkFNLT76I6BMFs8bsdUoCfVjjNn6F7qnzj0zXoEzyqnnBvXqnrm3Y), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT0jiggG8fQSQOh1xsNDJMwWAsgChkUe8DV6BzAyHVTCvqytN3Z9A2C3OgnCFVmM8hdywVNEcv-jvXIueN0ThuLFjRAAplR9Z-j0QSy1PG5X46qXU73FFstUWzp5e5OsTJHs_fBtj-tUkkkGQ1gNm6KEqlwNFjDZHhbx0zylWF8) and [Facebook](https://www.facebook.com/fbOpenSource/?ref=aymt_homepage_panel&eid=ARDXvVAPwnpPxsaQUtdpdrWV6jhb5mz67ET63dJme3yZIeS0ACffMtUeMkdUFwe3UjT61YNDIy_rXwdD).

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT35_-00naCt10goqs_vmF97Gi3AnKokft810wPaeOKvIFwmYO_1WU2aQsxN2Mqu_AL-sgOBYjxyRR-suf0n84P4PBMwxe9lLOb_TEVrNVaBJKNoqUUSYKCFihXbas-VPZITBk7TlrNizJa52HPqKzsCr229cbYfuvsqqR0H28g).`},{title:"ELI5: Folly - Battle-Tested C++ Library",description:"In this blog post, we explore a popular open source project called Folly, a C++ library that provides core components used extensively at Meta.",date:"2021-05-24",tags:["open source","eli5"],slug:"/articles/2021/eli5-folly/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_eli5-folly_729c2902.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/05/24/eli5-folly-battle-tested-c-plus-plus-library/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/05/24/eli5-folly-battle-tested-c-plus-plus-library/).*

In this blog post, we explore a popular open source project called Folly, a C++ library that provides core components used extensively at Meta. We cover this open source project using the [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT3wBm10bvEy4EvretqtyIxLo6BN4wBiD1ch2udnyxSaQ2tsa96onz_7IFZAKfg4n3I1sm2g-Ubd3xjw0yM_pqGjsIawV3X_ho_bRhZYD_R5CSpCDE6jThrlllJgy8OR1NzDf-_nkJ4gZSYKHhsmDFdl38Vr6xLYiliAd3XZ0yo) style of explaining things in simple terms in the shortest amount of time.

If you prefer to learn by watching, we also have an accompanying [video about Folly](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FWr_IfOICYSs&h=AT0pA9-VQa-BLIdUiB3YBJZepZnTT0rY7xykXG3S0jMHmsh7eEKNj5jBhBPI9vZywUfWJjbfm2EtLUk1jA4xISRIKzk_BYL1qC2O6klS0GoLp_wFt33ie6FUqkkB-yn8qeqBPVmo5djqKLL-yHwQHSEPP8OFvmIx9ZzIGvOhwNk) on our [Facebook Open Source YouTube channel](https://www.youtube.com/c/FacebookOpenSource).

**Why Folly?**

Here at Facebook, we use, contribute and release a number of open source projects. Unfortunately, when it came to C++, we couldn't share any of our code with the community because we had several internal, unreleased dependencies. Folly was created to fix this gap and share our open source in C++ with the world.

[![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/188171842_1169880193460431_7813489552800707208_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=toO8mJU64i8AX-OlYAp&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfBaVCpLwKzPtZSs4bQnLXIrGr3hQLAe5TsAPUDuofvEbQ&oe=637641DA)](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FWr_IfOICYSs&h=AT1OhkGMkJ_Dh_usFF-H3EiJ8IVdFhkPzm1629k_8PhEfTiWPZGJuFDF741uB690Rch2auf1VTmig2gvDitlEl_7eYdP_vQ1W0i283jWRb0JcQp-D6MgcskqPu5raHwGWXVkvhCZWRh6cavnkFK_B8ckKwKcv3fLQkVa39MDcm8)

[Watch the video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FWr_IfOICYSs&h=AT0WeyQoxveTj2JcJJEW7PzPPBSxUZxGf1PLxjqcGh0ZXk2UbKnPCBHbDbAA8B8rYCP8B8uxtvQpdmbdTqJbgcbzzgmAp0Zt7MVczbLbWWg10qBC7yGYYub8Juj_RcE6YwCgr7cX3de4Cgq2LhbMUgTs2mFEtYrD_dWJYtxiiHs)

Folly (acronymed loosely after Facebook Open Source Library) is a library of C++14 [components](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffolly%2Fblob%2Fmaster%2Ffolly%2Fdocs%2FOverview.md&h=AT2gdWBbIzgBmxuSK6hxThTmG1grrmtIzgTI_qyM_6vFexgRTnCVGu-GtuKGkjlavQn8Cq9UbyPQvpUKhHzMfm8G8N1SRNVRGrkIBFXwI0ZhdwXC3FPe4iI6vfxh-e3Yvh3uAwD9nsZzqSaJosc6Q6l6Idg9qTb6qJl6O2h8190) designed with practicality and efficiency in mind, including drop-in, optimized replacements for parts of the C++ STL.

With Folly, we emphasize speed as well as stability. As Facebook heavily relies on utilities in Folly, this library's performance and scale have been of utmost importance. It has features like in-memory JSON manipulation or string-formatting.

Despite the disparate number of components, Folly aims to make them easy and safe to use. The project relies on modern C++ and provides plenty of tools like string utilities that operate fewer CPU cycles and make code more concise.

**Where is it used?**

Folly was open sourced by Facebook in [2012](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2012%2F06%2F02%2Fdeveloper-tools%2Ffolly-the-facebook-open-source-library%2F&h=AT03w5a9SFnJDwaYXTP2fQzByFwCifO4FHbjz2O-_sMELeQY7UNTdIiJ92XI0jgz6NE8JnjDt93ya7rWQz9E8iOMUtYvG2SCw8Ptsu0qlOMaUE2K5DAeZmA8_r8B9s0nV_HDCzLPhCK2ifrZKCabV6PUTfW1YUb68vXPeThsK_E). Since its launch, the project has been widely used worldwide, with 16 thousand followers and almost 4 thousand forks on its GitHub page.

**Where can I learn more?**

Would you like to learn more about Folly? The project has [thorough documentation](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffolly%2Fblob%2Fmaster%2Ffolly%2Fdocs%2FOverview.md&h=AT0tb06oD8X3n-sqb_-_1GTSK81Qg1BOWWEcPro2ArWx5LQT1R2TSGRdvBugYN9p8LhArDz1TfojBqsWhzSVPr2si1MNqiZBLAnaRhoszykJ6n1gD7KJLE-W82mCOrCwA_0pZS_Ba300kOgqYHYkxRtgKokCVEd788ziE6uifbI) on [its GitHub repository](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffolly&h=AT0OGNFmyoe_0zdEuykAme5S6wb2-hGFP56npJ92TjMjhYJXASokJGyf4XBhKHgvvcIbK_80ybtzCUmCru5Nt9nXtM-6vZ4EeCPVo8WO_v37RAjyv4Te0GKUIJ4poL7TxXWaMd7fuObJIF06AJBCMJe-kB1Uf8sGVQPZ_bfdUig), and the Folly team has been sharing great overview posts like the [Folly Futures announcement](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2015%2F06%2F19%2Fdeveloper-tools%2Ffutures-for-c-11-at-facebook%2F&h=AT3gwMGl_AO0M2ERulD0tyz1KOzSHXXuQlKlNDVIGlieFIcmD5eQRIjpqz2lYLqr-rvcNY4rTNvx3QBa4JtGzq1PeOV_jNuiahiCRAwwrx-s99O8Fcv0SDFwW4pKe4SHHsvfdiVFKvjxltjwa3kbdi6rXCXt5IIOKTo-7Paq-bA). If you want to ask the Folly community a question, we invite you to join their [Google Group](https://l.facebook.com/l.php?u=https%3A%2F%2Fgroups.google.com%2Fforum%2F%3Ffromgroups%23%21forum%2Ffacebook-folly&h=AT1tPAeasYE2DmB1hUBhBDnik1Z5DZ4DKff8atillASkbli5ZyenB9R-WPsFVZgWA24vc-lgK28QFJKkHHKFHGwBphiWcQ5u9CikbvHzvdy7-TDu87pvGbwfshpVzOBC3FxUk_PUgjzAwPRoAmeV6a1I5D0IHWlDMF66AS4CY5I).

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Facebook Open Source team explains a Facebook open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://www.youtube.com/channel/UCCQY962PmHabTjaHv2wJzfQ).

To learn more about Facebook Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT1VD2pD4LjxtgWrBhkP22MpSMqTcdLLVyb6JsLp1Gdcry5Y5cWFtYJeB6XZR-dsSSOgtr1LrDvcGV-kHSI0chv4O5VtTWtSaCr9NbGH9mVr0p1WhlxeWxEPZaXiyInZa3y_voGGO1g9Tc-78rj6qyluAyrBpTa-vsntTM1MxOA), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT2AoP1y1hIJ0jkm7U0gNKsIVQ7Axn-3yBIOf3x6N8mk_EPU9JJhPYv2eTOfCKAS7vJGJB9nWzMzu8S3OZ5nYmhcDQ5yXRwIH1h6vduWp-QHhDak-u6OzCqE5JalPoFNLjVpxxUfgny4k45pxWqSXK89aD_GJKOQ4gPfB2R_qAw) and [Facebook](https://www.facebook.com/fbOpenSource/?ref=aymt_homepage_panel&eid=ARDXvVAPwnpPxsaQUtdpdrWV6jhb5mz67ET63dJme3yZIeS0ACffMtUeMkdUFwe3UjT61YNDIy_rXwdD).

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://www.surveymonkey.com/r/V76PRN3).`},{title:"ELI5: Ent - Schema as Code in Go",description:"In this post, we take a closer look at an open source project called Ent, an entity framework for Go",date:"2021-04-26",tags:["open source","eli5"],slug:"/articles/2021/eli5-ent/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_eli5-ent_297089f1.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/04/26/eli5-ent-schema-as-code-go",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/04/26/eli5-ent-schema-as-code-go).*

In this post, we take a closer look at an open source project called Ent, an entity framework for Go, in a way that is super simple to understand or as it's commonly known online, [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT3NrxfjK51SrTtIjUg1rrYGHTvXSfTpdWyvKBQ-aWekNO_6UozM-WOUNwxvtjXQUsjXpChPD1wzj8XGPbmDQDUPFX6q5I3v1G5SyjL0NL8RuxKYiIpDOt0hPh8yBUOFX_f59HfAVxJI9FhHdwJMJJhtknGCDn7EoDsFYhoIwnU). If you're interested in learning by watching or listening, check out a [video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FRCzeYg-_dbU&h=AT1cPz-NPWpiH-c5UCdxh9Y3h7gMABhYrvz0VPC5X7t8zd7Y6vk4Y6pW5HhIzD2D-CxMiFIkqXRihl35QKvf1J8IX_YeImdYAmxM3zM0UZXQak-U4l_LnlBRzDnWt1Y2V22XfR11SfXyTzjttOq5hlHtFVbeLT1siCRSSTTGrEg) about this open source project on our [Facebook Open Source YouTube channel](https://www.youtube.com/c/FacebookOpenSource).

**Ent**

What do most applications do these days? They interact with data in one way or another. As your app's scale increases, it becomes more challenging to manage databases, schemas, queries, and constraints. These challenges are why a technique called [Object-Relational Mapping](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FObject%25E2%2580%2593relational_mapping&h=AT2XEcxEEBWrLbnvgJQAsT5qylg-wU6xB9tzkaPvT-50nhg4wWS5Xlf9lGPRQbP2UQgSR8igX5cWekcABkxKCRCGA8i_dkcBrJ1BPQvOX80DOLeLFUs4UVouXyjjLOO4N98zkFgqnlxQkFKzly5OauAENkQ54vSq4yzmA0nO19U), or ORM, was created. It vastly simplifies your app's development by limiting how much you work with raw [SQL](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSQL&h=AT20MfR6yvvzQsc2YHnIGxhbs1osFie1RPrnZX0UlGtWwe2lYAxzMbSopefpt_Bn1ayTHLAlzXXahqj8u97k08gGJzYgQZ9HZoGBWGCUmtCfexHePHhg9NP_kMGFd9t5iWpEgTjlqHBsB4JAzwcBvUHk105-8KBjgwtZ3C_vkAE) and, therefore, keep your database more secure, your code less repetitive, and your app more robust.

At Facebook, we tend to think about data modeling in graph concepts like with [GraphQL](https://l.facebook.com/l.php?u=https%3A%2F%2Fgraphql.org%2F&h=AT3_hqzQPH3liwe8CRzNKYWQwKoVQ-r8y95dLfu-kx916FurjnSr3LQwt8YHKACzW6QSIzxgSzLFbz6xG1sW00De2wQiVkK6Ps_JR2pDfJXcqrgrf_7APrYX-Vrf6tB_CVQDP1BNq6hSRuG6SkfcjCl-F57RH_0ykCjb30kRfwE), a query language for API. As we were working with [Go-lang](https://l.facebook.com/l.php?u=https%3A%2F%2Fgolang.org%2F&h=AT0VgJ4sgA1KKSDEcn6bYT1jmifnSTEUmpqxg2LPsW72GEvv25qOX4m6lDSgs4bNwLdx2cLLUoQkM3G1wYDxdUyvckd2mr9kra138vpmWX5WDHYwmLjm0FFSwOsMt2bxjStHRNveGeU29JVunHltg4Pxcy4h5D1L54FcPw4SrQk), we had been looking for a way to get the benefits of ORM while interacting with [Graph-based data models](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGraph_database&h=AT2Dd_JU6Fn4Ck0AQraLfPp4QXJfqgVRAL4Yt0SrflfiPKr3ZkUu7nnUy0ydFbbCITSPha1QGwzJYSIyAXL9gCbPP6_ZSFy9RQL_per8fnaGV9m0wD8z1ZbAV9FrNkoS1qFur3pIVaxkQWaoezC1ZivJ2tHI9YGL6_JFpnAtGsA). This search led us to create a new open source project, Ent.

</br>

</br>

[Watch the video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FRCzeYg-_dbU&h=AT1l_dUBSkVsv3NBOdwT-KCBK4S15W0BfdplrxsiVtuMzrDsNQqbpP03S4kh1NXB7NPNhwCinLsvJ2oTolJ_4oz96kiVQiH7xVo0N8SH3asKHVCCrsQcl1ugHS2VYriQgNKf1Tqkutwxeo-mm15bpXa2QARY9Rx8RhYm3zPv_nU)

[Ent](https://l.facebook.com/l.php?u=https%3A%2F%2Fentgo.io%2F&h=AT3TdHKc8zuiHOO0xcEHw6fwBaWzdDZ0rTqpLzAUmIsA6kUyNwwJJEozbt7yopvB3SEOiCROOveDX6EcnBXNoT6WkCdjeFhYy3Yr7U_C8_Spau6I53UYgM_QcVV5omHgm3WI3igP3XkrNHflohPc-jKRJosZaOBXEMHJwY4OKtY) is an entity framework built for Go programming language. This framework provides developers with a Graph-based, Object Relational Mapping.

With Ent, data schemas, including types, relations and constraints, are treated as code. Ent lets developers avoid context switching and continue working with Go while using Go.

Ent's static types and explicit API make it very accessible for new developers. In return, this increased efficiency leads to more robust code.

Ent is very much declarative where operations like queries, aggregations and graph traversals are kept simple because there is no need to write raw SQL.

Lastly, Ent enforces a storage agnostic approach where its users are not bound to any particular technology. For example, during the development of Ent, the [Facebook Connectivity team](https://l.facebook.com/l.php?u=https%3A%2F%2Fconnectivity.fb.com%2F&h=AT0Hm1JpHqIkxZdbngSUcyDzG-LK_P1cyvq-EFJiooSmxBdTTmDDhDLc4kDvNbNHU87mPSWU5PH_Cg3AuV7AsGg2RbUSg8FI1nGbb8G3ZfF5GGjq91FWcCrwIXz3YHAtEDCQunXwB89w3_yfO85KagP4R7Sxh3bSGL9f3oFEC8E) was able to migrate from [AWS Neptune](https://l.facebook.com/l.php?u=https%3A%2F%2Faws.amazon.com%2Fneptune%2F&h=AT3DHyPxcKDjoO-kDLeViUkEPvwY4bjSybH4iyStPkL38mAjat-hYq9i8qqcdrV5tKJNJoiTS3dLBByEnM9Wj6hPFJcIl9RbJJ5jm89R6-oXZQAikZahgrtoKF87cL39qDEpVkd0QR98Pz1lrdkimKsFrAlMVVxDNQisMDozw_WN4Oc1F14SAFP-) to [MySQL](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.mysql.com%2F&h=AT1tOCwcMncjdqQuQoekJs8kgqoSQoAuUUK0M8CBIdKY6Dd0REh8WjNkTIp0jjBA6AxVzgJH6zMSXGoSy-A-u4NXNbt5fBnQKg9E1YZJwiNtCRNH4RvNx-q5zkWo-JMOsKD3kv85oAYsxZW1wvk1LHnRapvzvGfI0JK7h4caIEg) seamlessly.

**Where is it used?**

Ent was open source in [2019](https://l.facebook.com/l.php?u=https%3A%2F%2Fentgo.io%2Fblog%2F2019%2F10%2F03%2Fintroducing-ent&h=AT0ishekXsOpzJcXNFbjtvTrZbcyVg1KHs99apV45JuqsFXbWDqqSpDc7cKs8JJNSdLziBXXRylZIveHa2L1aDlEymGQUQnVZYEg08GEQEy3DZtUZqh23fi7-RD6FgXmhsr0a_YTV8uSg4EDwnU8PfHyBAn9hvcTV5zv0aEKlS03wqAd-mKjgwuK), and it has been actively used by the [Facebook Connectivity team](https://l.facebook.com/l.php?u=https%3A%2F%2Fconnectivity.fb.com%2F&h=AT2xAJxZhzhCwEwFYSsWCcUIjcCMKka7Ihux6xd6MYqb4poFsUUb06b8BXVD7BKlyWwW5vsDz5bEuA98uYOoeCjkPNOiAFvyErFpvAd_mhbe9nbCXIywL6nWWdjuF9oNSg3OFmLLGPNi-bGCU6fVyG7W3aD9uBYo3lscnaqjqFk) and [several external projects](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fent%2Fwiki%2Fent-users&h=AT1q4XJUOP0mgdEoIqowuFBsHoSwGnyQsaS7U1phc8FUhi2QK6YEQz-N25YwMx5paHWou8x289XemLqvm3bBJgAgADvPdR5xejbsmXAne5vanNQ3fdUN-upAJJ7Fcw5uYM_VFRjLlI72uAPFpNOD7BqiKexLZEkuRRW5MZBYOg4).

**Where can I learn more?**

Are you interested in learning more about Ent? The project has [excellent starter](https://l.facebook.com/l.php?u=https%3A%2F%2Fentgo.io%2Fdocs%2Fgetting-started%2F&h=AT3B0liWQ0Sn5WXYWDBtclPxwQi0HdzMa1ekKExBHoYxvgqMVUHdHGaYOyp68Ag1AiimWrmiEJa6HiNhmU0uK-K4i9thdr_DR-lEHyLlw1Owj0d048e1rsn0WTAT_9J6PNlLr6ww_PjRVw0y532E29H-p71QHuVNBRy7rIG96YM) and [advanced](https://l.facebook.com/l.php?u=https%3A%2F%2Fentgo.io%2Fdocs%2Fmigrate%2F&h=AT2VePmZl_TVVagE6bRminwH4_D0IhgnZQP0HxRNQ9fuUnYeBoF2knbiq1wxfwZtmrMHlhwyf4_lAn5TWzcqzlhXOost0UMalQcxEQ0vWr6xMonEDiJlIFMgeaVUzF7__45LRYz3m-SeB2E0_5kHDtaRFgpDUtEDAgFPMP_04RM) documentation and a growing following on [GitHub](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fent&h=AT3tM1qtM8gRqf7CUVn3Eh7PraxcGNVRRx4xArQFkZLDvOe82VPw-uH631p7vivNBOfRfDxmuF0gX75dU695qLCFTQ_AvU50G6xKM6TrZZnFaLQBf_If4XfaztFFm56L5r5ufQddNU3kCh0yyKY-tQucUOGlEqta6ooRaRwPscg). If you are keen on using Go, we invite you to look at [GoDoc](https://l.facebook.com/l.php?u=https%3A%2F%2Fpkg.go.dev%2Fgithub.com%2Ffacebook%2Fent&h=AT2KUwAR3A6irFkzaWRT8vP9bwf8Jj6bklcN1hQmy9DXl7bXSSGQ-SPvj-Hvtl8XZpF6MmVrHSw8uXlFQEhjrhCAeXGGv5SE_cUNbp8MxmC0oyYPd0JbPcHGYAmFiWPNLOY2xGSkDz8fHyQOn08Gge2KHNKEXM3tYnG2oLzTr9o).

If you have any thoughts or questions about [Ent](https://l.facebook.com/l.php?u=http%3A%2F%2Fentgo.io%2F&h=AT2WJOH2RvZRJbL6lEs88qQJPpl5kOwHFJxW1iJU36GUmMWnMZ4UNUWsL0MHk8HwTYw1fM4QmMpkndVG2v77hnILoZdFuCoF2qrVw1_z7xc9m0VIIleIUda40GGayjOGckIoCG6TIGGFJMOa64lAKKZdyJ09bjXghma10lnamfg), let us know on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT1C4U5jADSSN2EeafU5yD6j2yNqkd_n5S0bA4DhrsVtzwS2N5paqWM6Aajs64bALBkEj4P6hPrZY_4F2GbJrA6V59mU-M9l3vKxil4pap0RtlisJvjC0-9P-_IX9CS60xXP7koWt_-6wA16KthmJM3ftLJwYCB2feCsKEXyEZs), or [tweet at us](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT08SIJ4o7zRsVJa9UsNeGK-dSLscx6m-s56Debdd7qF5vF60AxAIIIkdQqW7-my7gpbLlx7Zd3Mvh3daoKjdXBb7ldGGn-lI_lMMFrO-15G3HKZrAhr_vSz_9hwhaF8nEoPReJJttcc755vS-oqd-pPy1k6ke2p2p57PN-ZT-g).

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Facebook Open Source team explains a Facebook open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT2Focg5qX_z_DJSMhYoao1MZYUfRrw4iL-OHIgH5a78rRg7OXkk7z_GyN7TLw4YtG4ouwUPGwLIalSeFmxv1emSFgcV0BACHrsRKDUwGs7B13z8iKURQ4GGH_CVQ5uiJd9W6ewvFqhQdVijknOVxpdOoZxxPjsx6lVRIs-737Y).

To learn more about Facebook Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT0DnCxEvk7sLIpXsrD1d7FLOHsYUq_oqLC2WHNyTcCb9k52Pkg9p9jonzgIvGBVTH2EpHdLqq6GM-6ss7uXDdFmWlc29ZML2tNoCjUHocjIngoWC1X_dP-NHMvqRZwgmwP9hON6l7VmIJWfASS_yUgRd-cH7OKBFx4lKipPhKI), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT2055AGy7-v_JkV22NULj7R_vPr5oe6aKDdEmRgDHcmqV2zrFIY0RqpmEgTZt6RaM3lJSJ1X2_3hHYV_VYIRULDL-TLnDomurEEJB-T9Jrna2kqbKzFSklqCftqKxZ5DCSAAzDRaK9mfAuyN_lYgha9Fzfz2XACQL4Szcegh_k) and [Facebook](https://www.facebook.com/fbOpenSource/?ref=aymt_homepage_panel&eid=ARDXvVAPwnpPxsaQUtdpdrWV6jhb5mz67ET63dJme3yZIeS0ACffMtUeMkdUFwe3UjT61YNDIy_rXwdD).

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT186PDYgJwT6yzmd0Wp3rEl58ppuuxVqFbz2wEDjnzJWMYeCDje8YWh9ZqS6MCnfBB0HbXMFdH4lv6hqYdb456_4Wo2FUOg6PAWaMXaQzj6Dw3GBII4B9UCtZ8mM3Ep-lf8nWUeSf_F1GAblak_swV8kSb_raObWN6vPUqcDLo).`},{title:"ELI5: Infer - Finding Bugs Before You Ship",description:"In this post, we take a closer look at Infer, a static analysis tool for programming languages like Java and C.",date:"2021-04-15",tags:["open source","eli5"],slug:"/articles/2021/eli5-infer/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_eli5-infer_a169be93.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/04/15/eli5-infer-finding-bugs-before-you-ship",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/04/15/eli5-infer-finding-bugs-before-you-ship).*

In this post, we take a closer look at [Infer](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbinfer.com%2F&h=AT1Pu6f9_1TliMyqqq0tPvYND7HrP-3w__Ni5KgWKPAwuvVwfarFnoSLm4SMGpkekw8BdCbhVjqDK7K9XkAY6WA03_fEiUes-RaLyatt91tOivas-a2WId_-74gs1m42vjPuDrDq4PiYkf4--MmhHwVrgnCPmBdCUB5jAtefrEI), a [static analysis tool](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FStatic_program_analysis&h=AT2pebJmQh0hs5WWsCBzdUkQha5r-A0bXpAHprUaOg7aERyhrrxhv5yxtpmXKWL93aTZqDlRtHC2ZxlH7QsDUr7ZyvmebY7Ib7ZdbaWriJWYFRxdf9rzJ-BMXGuSXT9zF2bfdApMUBqRaJZCOcrbFqaqK9xnd0oVpwhawIclgKY) for programming languages like Java and C. This post is a part of our [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT0kiEBoOGrJhfpjKGpG2RyZpDmKsAr8oYxlPWjX_j8Hw3nQ6fKQPI0xh7ugOZUflfrtcuZkyxZGDGbTKaJuYEZA7ldtEoTnVlBHnUnw8MCbrJj0XDPmcEyDYRyUfltpsynwx5IATEyWgZj2OsNOgxZD-G2MPl5UdwXHdACCAZw) series of short posts explaining complex projects in the simplest way possible. If you would like to watch a [video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FswrmPTJAGqQ&h=AT18HtxIBoPGIFqADrHZMhEBlrjQoLDkxo8sdHktiVCb8sqLjjmofv4d1CJAE-xOI0U8pJajgW2MLW8b1_ixHQa-bC_wnZg4Y0tNk3S4C9WvbRlpm3Ml4bSrw2wYUV1osJ9IFcaliRgKp4CEDUQmP5YI-22pnNl6nejD5N7sShE) about Infer, visit our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT1hmnC2FzrXmzlU36bA4W4yhqmSYWR7964-xDVLd6umu0v6_PUNNfvwQnmEHuwoZiQj9-vnPHKJj2ZfpoIoTJEJ1rPFH_pxGkxZECHoJzq2Gx499vFbeqaUkSGa1-LbAsGnCblC_tfbmH5hSh7drnn0g0H1rE2afgRfeJ0KEII).

**Why Infer?**

Catching software bugs in production is expensive. You need to determine the exact steps to reproduce the issue, fix it, test it and then redeploy. This workflow is challenging enough on the web, where your users rely on your servers to serve them the app. Mobile app developers have the added hurdle of fixing bugs installed on their users' devices. The conclusion is clear - bugs cost developers time and money. Hence, tools that help prevent these defects from being released are extremely valuable. One such tool is Infer.

</br>

</br>

[Watch the video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FswrmPTJAGqQ&h=AT3C93E8b4IYev3Hh21QMW5t4DzdehG2P-brJ3wizJHbDahiCnvPKwBsJ_31m9sSx5n7m42ylaQOGMhUUtAGH3DvrCpkwzvLPdsO8QrvfeJFlDgEn87sHdf2pAsgrKLfEpdgvFXCZCtEZQQxRRadzQz6Z_5gr06IbXCbQH28onw)

Infer is a static analysis tool used to detect bugs in programming languages like Java, C, Objective-C and [others](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbinfer.com%2Fdocs%2Fhello-world&h=AT164vyn8DYooM8McdRyuSX1380yBJyN33muQ3INf0JK8Bi_8z3qdZuD3DSbKGhlUq1sCIEIzNzGblJRuitqlpViD925wFRg91kRDts7iJ-E7nU0ZpmSSoTJqMer-RDLKo0RkIRwC7LlAV1A1F89ZTEraLFxoCpjobPgZYwFtYE). Infer catches Null Pointer exceptions, race conditions, memory leaks and other defects early in the project lifecycle. More importantly, by intercepting these critical bugs before they are shipped to the users, Infer prevents crashes or poor performance in production.

Built for large-scale codebases like those found at Facebook, Infer reports on new code modifications quickly so developers can see potential errors while working on their code. By integrating Infer into your workflow, you can catch bugs in real-time so that you can work more effectively as a developer.

### Where is it used?

Infer was first developed at Facebook and open sourced in [2015](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2015%2F06%2F11%2Fdeveloper-tools%2Fopen-sourcing-facebook-infer-identify-bugs-before-you-ship%2F&h=AT1IQp_QG5mVy1R_fzJok76hC9QPETfeHOazOlpbw_CGn5MXZciVem5MVTYRBBZgC-ay5oMefymBqgpnGZaox7eHs1nttF4e2zXpHqoGadSF_sAJgfvkKixHlrgMVIh9NPErb-_KVOZ7Yah8HrhjS-qDAVhFUmeker4-u0xL_sA). Since then, this project has grown in its adoption outside of Facebook with companies like Amazon, Mozilla and Spotify.

**Where can I learn more?**

Infer has [extensive documentation](https://fbinfer.com/docs/getting-started/), as well as a thriving community on [GitHub](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Finfer&h=AT0WGVLSUpvL4mTucljJtjeeVEof9h1koZXQbdcxrg6TDkZMHu-QbQT2kM3tPUJ0vKM0ejxOPYcKCfSgs-5Etm-hrbrF_kdJDKzguOvFU3ystadRv5ybOGQJMjRRqA2dTmJbRruzbRS1nwy3InTbrkIHGwfs2WZgQCpb0NbP_Y4), [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2Ffbinfer&h=AT1iVHuqOxDun6jHnog-n7fzPFTp4qGr-2sp8No6UNvSgifDL_OUFXdp3wsJx-WzQGRw57jfGObTz3G1e5zeMW2TRoiDLEbXd6K9F6Rpa64vQfn2QoZeLkhiDzumcItoCFLlnlLWCnHaQ1vrtC_pFekbOHUXO_cZZw9lM3q5Lys) and [Facebook](https://www.facebook.com/inferstaticanalyzer). If you have any thoughts or questions about [Infer](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbinfer.com%2F&h=AT3NR0l7xHn3n9rkXSAFXw89XOALiSpy-98Y5sJbFdlPC05e5EoIJdDFjUNAz9rbcFT58v--Oot6qoUVL1lilVxEDpVelzkwYUUzlgS5RrACy0gCeP0ppfiz-ixpywtu95uRlNdUC6fkouAL5OLfsXzwjI0OUfRuaTWvLNedEA4), let us know on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT3PPZZSbPBoxeVGsVICIPsZwnlP-sJECT5NzuQVmnacApgaHzFBbp64ydMbY5k7_CIFpdbJ8Luvn6i_ZfHP_i11SyYGRg6xMlNhZl90ftPL-o4TLv62JC5z40ubTRoJ2IElq4evKuydqnMSmfEEROvf9AY7GDRsm60x-tOGOo0), or [tweet at us](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT3mvDyLvM67gIx_RuaWHubt_eHE3nR4TFNHIgACti2q87diaxw1MY1pmGGYQoErIIvBlmZTVpYcH2e0J_QcPE1oRFfX_0uOioNaM6QLFShd7KxpwJ-l9BYCYkrVOmObK8bo3eWzyYuRBNSndXRubI_k9boowvOHbmZ6Nxb9b9g).

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Facebook Open Source team explains a Facebook open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT1mO50R4voM3rPEMe8nMsMeBnwB66vtY89zB7VyD9hc4YFTW8ahS_OADisiSW_LLEaHVqWoW7tBmbKn13PK2-4bFY79vTSKihJxNI5_4z6YccCg2fAwn0GhjONHZtF_QyTsGasmlgDO9l8_exT0hIOnYR22hIai3Svq0kl-HGs).

To learn more about Facebook Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT0GQ3Fu_KKSV25_eTjeka3zvMl5IZlLxlhswVvbBavWEMrFfGO6APaRu6BhJ68alllBh4quBRhDEdHoBzj-4WSaA-6GKEQbfVa2J1sgtQ0HKAPVtosmi-GN3fr8Kq2DXuuJdGf2t7rSunhpjXLq6e-36fOdXQXBIm6zcKpliEk), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT0uLTOaEAWU4u_Pdm5bOOM8jiTvwa25gZLuENfIWFa17sYW_LyMK7dnaDMzurlcK14lba5fLgAUyvuNys6rlQyPwFusfKl1o5eh7z_DvU5fgRVNbGTiB8juYh9K2VhtWYLado9VHcYamnMSHNYKYD5qoKpnKHt1jHu4wXArG_4) and [Facebook](https://www.facebook.com/fbOpenSource/?ref=aymt_homepage_panel&eid=ARDXvVAPwnpPxsaQUtdpdrWV6jhb5mz67ET63dJme3yZIeS0ACffMtUeMkdUFwe3UjT61YNDIy_rXwdD).

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT0DlrtlpcnobBTwJmJq-yfq5dxWiUQ4d1Sj0gOHetE2afZrocMxKcpJRfM33AnkyzYbTGpCPcv_aJioBdx2JTJgz3Ug9Y5Rqb-9B2YT6BWuo14E6_Bammqx9-b68mG1vBzPvuGIsVpYxhdic9AJa1rLsNSmaoUytBDy0hLWJjQ).`},{title:"ELI5: Buck - Modular Build System",description:"In this post, we explain Buck, a high-performance build tool, in a way that is super simple to understand (or as it`s commonly known online, ELI5).",date:"2021-03-29",tags:["open source","eli5"],slug:"/articles/2021/eli5-buck/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_eli5-buck_344a0594.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/03/29/eli5-buck-modular-build-system/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/03/29/eli5-buck-modular-build-system/).*

In this post, we explain [Buck](https://l.facebook.com/l.php?u=https%3A%2F%2Fbuck.build%2F&h=AT3akxLohm2Fpa5gJJmTTJRo7KRBOfSb5EQxcc1ehMRtbaI4PivQkNN-CIANn-b5K-qOEjZvQsRGv4sWlyJHDP_Fk1OdMQXT7LhQoHxb0FGUyyK-jykU2fcraEy7ZjAadLhTZcgteZT7dy72GR90AtQzfvXTJSB0QSGM0H05Wh69C8hnNjmvA8XQ), a high-performance build tool, in a way that is super simple to understand (or as it's commonly known online, [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT2fxNkRtjPXq8plYijW7R5gcJGu3Q9r_oE4oPY1tiayMGDlD4NU_gWGbIvQu5GAZeaR9AvajJTOHhzRqsXETjc0sib3-amE6W53tcYwlMKPo9LP5tB2LOjJcBppsNFAUV5OnGTACJzMCBaIfDVk8cSG51R3GKIwQMV5KZpYnEQ)). If you're interested in learning by watching or listening, check out a [video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FTX29-Edcnpg&h=AT0vgVR13dl0jwphDTwaAOYBm2ZbswRQlMv4Kw6biuXfBgQxJEi6NaC6fVO_TGDs9XH4Te0x_X1yKhVmORi26qr76oA0fYbP4LY6MyvWcH5ssIkfltVDD4BfL6aFXRxfBciN72OXDc98CnVjw8pz8Jy5S0fZtAlLhnUmtUtNT9Q) about this open source project on our [Facebook Open Source YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT0brHeNrWNA6bscOh1msH-FRUlip8EV4nt7f_ZfA_ShqYuxiYe_MP_cGFBk2CUeZeJeK4eDXS5QuewXtKkaMM9A-baz4Kzi0G1LS7pGmPjYwoIxI5GE8l7-9Me80wgTv2j-7qPY5X8W1kO51PGoBbm-9MHy6zkkkclZ7JGdphs).

**Why Buck?**

It's a well-known fact that managing [Android library projects](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.android.com%2Fstudio%2Fprojects%23LibraryProjects%29&h=AT0rP4-UowQCEfD5z0hevX5fauNsbKY41v_uVjTq3PkPLzMx5MwXeoIDFJLXiigEGNmBmej-gC_C_a-sIwS67U7OTsAJUFAP-chegw-ic8-lkJqywGvB2DmYcGreD_W60xOdyld5oN60cdkJv-h1BKad2KwJhX-AUkqhbfZkGT8) usually require a slew of duplicated manifest and build files. At Facebook's scale, maintaining these projects becomes an unmanageable feat. Imagine having to manually update every single line of code across tens or hundreds of files in your Android project. This redundancy opens up the potential for bugs and stale data. Plus, repetition makes development tedious and cumbersome, bringing developer productivity down. We created Buck to address these issues.

[![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/162939996_148699473813193_7058908760195110652_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=aBaXOqn_G84AX93cKhX&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfBK4d_OurKjiJwNkrFx3WhFuFVZooSuB0vhCSPT42lKSg&oe=6377540B)](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FTX29-Edcnpg&h=AT0UMhOmFnC0DfyP9GDOynscx8-o1TnOPZz3fu1fD1TgaoqB76ToQUpy5hpS0EKWSIE4e58Ir1ZN_hxJRi5cb-jU1xaBJuVymzaVd4yz2WUHzSpOG2rtjb9B7zMHVu1Xf2jfDr8uAZ4hTKx7qr3qExbIYVpkhiWu-08E_kz5jWQB0E8DaVXWTJRc)

[Watch the video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FTX29-Edcnpg&h=AT1ubcx4nPwTFadiZ6nxK3Euy7C5WB9oF11Dq6ktBkqRxTtTe1rjARhzzXHxWykHPPBYXE0kOLNRftBpiVUTY86n4b3MrjygMLu5SK98Wb1kF5j0GPtDBjOjXmPtQmx0o2UB67mXB6DHGKn_-BQ9hd5QS-pXfHP-KjP_CzaNl5o)

Buck is a build tool that supports multiple programming languages. Although Buck was originally created for the Android ecosystem, it now works across many platforms such as iOS, .NET and others. This tool was designed for fast iteration allowing developers to compile and run their changes quickly.

Buck is optimized for [incremental builds](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FIncremental_build_model&h=AT10_8nonefj9MUnfv0oLlNqmuWgDTeP5DZ5LDp7laqHKkm5OoeaipbqMWAKs-cV5CbLYF3dlOpw-QgzxbvF9hXfFNKozk_iQfD38YrRyG60gMbGJOl0u84R3dCjmA5AN_piKu3WSJ39oIx0ZhgQ3XYNrXcMo7s_3L4069Q6XVQ). This approach means that only files that were changed get recompiled while other artifacts remain intact. It vastly simplifies the build process as developers only need to rebuild what they are currently working on, which lets you work more productively and efficiently as a developer.

To further improve the developer experience, Buck allows for easy integration with [IDEs](https://l.facebook.com/l.php?u=https%3A%2F%2Fbuck.build%2Fsetup%2Fintellij_plugin_install.html&h=AT3zrL8ccZCeZyrZWIB9es-jVf7H4NHSjrhGm74Js9OduHZadFtHX6E11ihbsNMONqsaU0P-6uxZI_N-tjDEbFLyp3_sNVIzETWG0jfxow_v5ivAHiJXayyJsvU6ofoijdsFDkgGW6MmZ1BFlefgGus64XLKyOS5mAkGrC59tAc) of your choice, making you and your team more productive.

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Facebook Open Source team explains a Facebook open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT2Sep9Te7bD_32Dwg1ZRKiDa0BznNR4r_EBSL3uXmV4sscOetw_4PaZ4AZRqs1CL2hrHbZQBHKluq_mwK2AaaTlm2X1Dpuc0N3gp8x7AXCGfuXFU1iJ3QYs1qRZlg_uayD8dBD75-2MWigZznu82u0gHIn1OaXgwpKZlbtnNwY).

To learn more about Facebook Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT0cJeos0L5oSweXoA8c5I7xJnicEQGf2ayQlHEnYoknEdUemQ0DD3iDQXkeQpmpklRL-ZYEOncw-Cm6XkIkMQKAuJ-AcmpkKYyIFLyJCdzfG1XIe6EDvY-B8_x-ZutbiCmJ5vECHoy1bfaXJdqGtBxhhghS4SPLKA8Dh8nEexfz5b9qTXi7PZ9I), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT0XIVzqNh_mAXXIPMbACgtHPXXJ0cmUoY0V-70dTfePQEXm6QqRm3UtaEnxDXNkaUX9kveKAm2xY6UdN1y3Dkeqgzg64y5DLCuxoHiCulsFGhmyQxr33pGyHmjMtUOvhAUwcGM3_9B0Jzmdve2wVCXLZG4pYfSa40RU8BV9kk0) and [Facebook](https://www.facebook.com/fbOpenSource/?ref=aymt_homepage_panel&eid=ARDXvVAPwnpPxsaQUtdpdrWV6jhb5mz67ET63dJme3yZIeS0ACffMtUeMkdUFwe3UjT61YNDIy_rXwdD).

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://www.surveymonkey.com/r/V76PRN3).`},{title:"Announcing Season 2 of “Explain Like I’m 5” Series",description:"Since October 2020, the Facebook Open Source team has been publishing a series of short videos ELI5.",date:"2021-03-18",tags:["open source","eli5"],slug:"/articles/2021/eli5-season2/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_eli5-season2_4d7b0dc3.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/03/18/announcing-season-2-explain-like-im-5-series",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/03/18/announcing-season-2-explain-like-im-5-series).*

Since October 2020, the Facebook Open Source team has been publishing a series of short videos (~1 min in length) called Explain Like I'm 5, or ELI5.

In these beginner-friendly videos, one of the Facebook Open Source Developer Advocates explains a Facebook open source project or a topic in the open source ecosystem in a way that is easy to understand.

We publish these episodes on [our YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT3l8FrxztS3W8aXZ5kxndSFSnY0QY4I6uqPrHsq2hVe-UTQm6wBvlMjJz9rq1pZ27AApneXyXSp7SxvpkdERTbyjKA4elglO60FpQXEqSvOT76SBFgM-A0OiB_H94mVjYbeE6wmwZxPZncA4Zt_YCMRKu2KMg1XAWQf9eNQ) and you can find accompanying blog posts on the [Facebook Open Source blog](https://developers.facebook.com/blog/open_source/).

**Launching ELI5: Season 2**

Starting this month, we are launching the second season of ELI5. We will continue sharing overviews of popular Facebook Open Source projects like [Relay](https://l.facebook.com/l.php?u=https%3A%2F%2Frelay.dev%2F&h=AT0XNHYa8TUpjDrrtElYE1I2f-VI2pUrcN7hETjNVZxsBtwDw844iVhw7iH1AKDCAQEwZ3rRSBA3ZA0b4JJBzkUtHOCJNBc-Ht5GuPWPUa8EcfecnPsj1j4-2HQcWznIV7qTvicRRtFF9LdaUdKHesJwv7U), [Folly](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffolly&h=AT171gVkHwOG2ZHuC37JZ4CqS95iVj5LwKLd4AXhVM46B7OYZZuE6OXd5wNquFbGf5nSKBgGbVq3PYi6PytdH3HscanYHI2xBtPhgSZd2T4LbfCKLUEXaQmckseho6N60IJtgYwwZAms6JCfXei8ZtjqHaQ), and [React Native](https://l.facebook.com/l.php?u=https%3A%2F%2Freactnative.dev%2F&h=AT3h58FYgqb9Puhy8ZZmebvNUgEXTW5ue2aaYm8Z4epkCUxj8Whi24Ee_xYC_sotI9VMNb-wVkvArA1z6Mhv34yiVcheaCvhNDpMoKhqXVMzgCma9NoqZp0cpjofHi9m803Me6f2nfC1xDzdfP1VoL0-1k4). On [our YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT25q5e8Mxzpz0-MzHBLFMbycs9VMjyPzRJuy2-DPPeHlS-KgUde1aJS0JfzmFfs3N8obCJnBLFMFhqXFN3hegK93emmR_iR9nipBzgj9RGDSUR984034SyouxsmtxTYOEkGLmFHs5CLuxKrzMKCgLXhBtk), you can already find several new episodes of ELI5 on [Open Source](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FOxtpvy7TwIw&h=AT1Jx8sPjiLwfsyPP7g_6wPMoT44g4qardfLEiMsx5X8FcElSh8qEv_bHX3f4b911ad0IhZyAWdaG-Wl__4jpMr2ZD-HDriRcjoDceyh_LPO90pcZ38tbknwMyhwkxtk-RLMWHYxhyRCp4bMYwitcyk5Rno) and [Hydra](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FSlc3gRQpnBI&h=AT2ioJjnaAVgXCGxXWwy3IlqR0fa2Bn-7YBPjz1mUyUBX05fV8OiFcLoACNS24o8oqDps0Am4eGpLXiKSGL16KFNRM2LFfa8EY7r_rCEJS9KLxAtSIdXT3B78YEE_7acEsQUdunly-TSoyjoXLCxXdNOUuw), with more videos to come.

</br>

</br>

[Watch the video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2F-bA9IsyzAXk&h=AT3dbNXYWhlc_coxDVCPlZZ3jgsgD9iCHOesrTLIqpPZm4LBbuzWvsOpR59JNdjqm_mOGwQfcGDIgPFTQQiSR9KN7EhWuL_LITk2xtirkqSS_ZmmWlPpaYBmWMfk-JgH5rTuWziPlE0ZZ-QbI_ErncPz3D4)

In this new season, we will be diversifying the topics we cover in the "Explain Like I'm 5" series. This was the number one ask from our viewers, and we're excited to share videos that address topics about the breadth of our open source projects. We will be answering questions like "What is open source?" and "What kind of open source projects does Facebook support?".

**Where to go next?**

If you are interested in watching the first season of ELI5, check out [this ELI5, season 1 collection](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutube.com%2Fplaylist%3Flist%3DPLzIwronG0sE7cCot-0yCbnuR6sAe7PIYX&h=AT1ELt5qCBPJmlHgKLXMfI_Hh1AiP9qOSwPY3SgXbKlLwzjyD7ka_lUT4mofWHPeilmHjesiJeVDvdDR_Dzzg3HIR_gAZv9aT6htDnqM6t0OfycAgQJ9_Utgd0iU8qdrvqPH9QzfFJODzYcTpx9WXaz-EWk). For any new videos, you can go to our[ YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fplaylist%3Flist%3DPLzIwronG0sE7cCot-0yCbnuR6sAe7PIYX&h=AT24qN5vNEbsOWlSg2ty2tZDEm-i0zawrwDs6QhkNrxPi_wowKXUNtbbCxXB8e6a0LTRdgevx8vo6imFUNIcf3n_rLDrZDJF3-vFcwDrNMIl3LzjGn_ccQsgkGsAjN8gOxbSQbMGf57QFmZfcrvCkxuLKQg) or keep an eye on [our ELI5 season 2 playlist](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutube.com%2Fplaylist%3Flist%3DPLzIwronG0sE5ZVygDBFsV6EfdzyQ3u2m-&h=AT2BSI0fPRDPlRzQFInLyIOYBQPYYrNCtOw8V0JAVGPw9X0GSdocls8KPTbwRrHEzH0vRDR43Uud_SD1R7GWpFTnZUB4T4GDZBLuRF6qNfBdcuIar7_9HLnlK5sQtzz_cTgUoobdoaoZi0wneLXkqH83Co8).

To learn more about Facebook Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT1DISD5qRy3xLoQVYxKbn7e9rWJYcVv2XwhVOLCldVBCnupjKhEHqqWuSsTRrSyPQ1PoVtTQxiVz6y4WcJ-XWDzzf8eYee28OkulEOVLDvoHsbVlQXumi5CsLYjGzw9fxicTx0krCa22sb5R5-lutravTw) channel, or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT1xyWo1LuD2NfnR23JSevaS7SPUwj9yHe02unzWl2TIUX9gogh_FO4BEcpOb4w-mEj3oGycOrTpDxRg7z1yzVcKUH2gbY-dh7iySZybSOCWhWLGMrsIZHzX08NuAVRFTXbqejhrrggp5jzSugpa3J3ARDc) and [Facebook](https://www.facebook.com/fbOpenSource/?ref=aymt_homepage_panel&eid=ARDXvVAPwnpPxsaQUtdpdrWV6jhb5mz67ET63dJme3yZIeS0ACffMtUeMkdUFwe3UjT61YNDIy_rXwdD).

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT2NNw8OGxi7ZYB1BKTTlXP4r7iEKkb8CPuW87CqAD79boBFK-UllSc5aCnjfR-wMamHIDctI-SKuVH9i3QZ150mtmX3uJAZp61UfD1hAInxnmQxQxNLEGpL-6sZ4XQMBUntNnEylW0WzGkvK-p976da6Mk).`},{title:"ELI5: Watchman - Watching for Changes to Build Faster",description:"In this post, we talk about a project called Watchman, a file watching service with clients for a command line, NodeJS and more.",date:"2021-03-15",tags:["open source","eli5"],slug:"/articles/2021/eli5-watchman/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_eli5-watchman_00b780a9.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/03/15/eli5-watchman-watching-changes-build-faster/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/03/15/eli5-watchman-watching-changes-build-faster/).*

In this post, we talk about a project called [Watchman](https://l.facebook.com/l.php?u=https%3A%2F%2Ffacebook.github.io%2Fwatchman%2F&h=AT3kVd0rlBRkIx5WxlYXxd1EI56k2DFpxDof77U55W0MHWDJoYfZ4xkWNAZNK5WLR0pkF-MOUH2_FVTOwqZaBBytAHMHk1qpgI8QHf4NVqd-GbAk3nZO5EcxjXw_CCU3mQ2vlboFWWKAOEKw7nM_yUVavng08TOH9kD92lva7Kc), a file watching service. If you would like to watch a [video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FgEsTMR2erAM&h=AT1GeyloOwLDBSBxUqj5518sg5PZZbMFgGH_B3EddbdYmSNXSmROAbRWqP_wF3VwBYzhrXb3UmA3X1tPK6ERdbs-QsMZPIC9v659jfkbRmboDpmE1Rgbt-bejIb0Q2agS9RndZvITjo1skUX7m4eWTFk4qLLVkak80Esvkv8FgQ) about Watchman, go to the [Facebook Open Source YouTube channel](https://www.youtube.com/channel/UCCQY962PmHabTjaHv2wJzfQ).

**Why Watchman?**

Web development has changed dramatically in the past decade. Let's consider what goes into developing and deploying a web app today. After deploying your changes, your web app needs to rebuild itself. The build process usually involves mapping routes and file paths, traversing JavaScript and CSS sources, and handling hundreds, even sometimes thousands, of node packages. It would take a very long time for a large web app like Facebook to rebuild its site from scratch, especially over and over again. And besides, why would you want to rebuild the entire site if you only made changes to a handful of files? Watchman allows developers to focus on managing the files they worked on in the web app development process. This approach is also known as an [incremental build](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FIncremental_build_model&h=AT0npPZndWpwN26PfNWfUOaJfZNeRmH2l7Kq1uxiKCAfL-0T3vz_gY5QQ1F80_DtAud8gf_9XPF_18v6k9qGNYGFTvb1dSF0LKMSz1hD31YKzfyFcKQZR0dnk61a5jLTezD1TeVwxUHFKARnryabOU1rcau-NUi5KC3Nddz2vQY).

[![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/159564462_190563809167626_6792035610936537257_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=RyI5vl_ZWjQAX_XjEVx&_nc_oc=AQlyj175sbOg2fCiAcnuSavAmNRKM1k0bPTDrPe-vCfD6joZpm43A--wq5tyPx5pCPmdmobc2aYB2_iakDvCC8v1&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfC9uvX-9_jqJNDaIJHYbt-4k8CFS6YTwwYWTN1T0omAVw&oe=63771173)](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FgEsTMR2erAM&h=AT25_Q0unN4VDNQaAU6bju8-QoQPopMEYPclcrborNmPgKV5YmmXf08apUoK5Mx-6BnT9livUGHktumNndVf4cUh00klO9ZwX_zUjynrWVxIGJVSXSxO4k__44KdkAr2TjpvmQLoSFwgxoKsRtlUOpc-xA28qkDbfa4HQR5y_TAXnaEPUi9PbLqH)

[Watch the video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FgEsTMR2erAM&h=AT2Or5_MjwNL44sV3tgoZ6MRLrOMJ15M8SHv118woWiiadcm6pOIdWb0z5tDNRJBDfmr64viHnsb9pTw69ZSuqr833XugcZntXMgS_QpcNBP0tTXhgWT3WzXzLmd8t0mn1BsQhVM7lUFs176GaClKpwtKe3KM_yvi9egsBW44DU)

Watchman is a file watching service, with clients for a command line, NodeJS and [more](https://l.facebook.com/l.php?u=https%3A%2F%2Ffacebook.github.io%2Fwatchman%2Fdocs%2Fcli-options.html&h=AT3MS5EnP-GGsQdEgNQg36PIG1a23yQdSEnlM2vCI829h7qqUPaY_knVCER8JxZkjWANMW-Xi2x0wC_z7uOpuMKD3Tt5mKygtuebpQxMZT3Dgmmnjik8TIkFGoBAoD8cb61Nv5Tarz0y0z0XbIfRzcBXwnH8lu-0PoiDaXYB5bc). It records any changes and triggers assigned actions. In the example with the Facebook app, Watchman would have made sure that only files that are changed or affected by our developers get updated. We [previously shared](https://www.facebook.com/notes/facebook-engineering/watchman-faster-builds-with-large-source-trees/10151457195103920/) how this service reduced build time by 60% in some cases!

Beyond the build system, Watchman has been updated to support other use cases. It can log changes, trigger test suites, transform files and more. Watchman was also updated to support a wide range of operating systems, including Windows.

**Where is it used?**

Watchman was first open sourced by Facebook in [2013](https://www.facebook.com/notes/facebook-engineering/watchman-faster-builds-with-large-source-trees/10151457195103920). Ever since then, Watchman has been used daily by our developers at Facebook. It was also integrated with many other open source projects like [React Native](https://l.facebook.com/l.php?u=https%3A%2F%2Freactnative.dev%2F&h=AT0QeU_AXVah9NTHnkyVp9Cp3WGg5c5qd6v3uGJ6ceCToLdTXjh6PLYT33Q4DCH7GN0Xb0gYnOP2u9Ija0N49wkzv6bwTB3Tfb2yl1IdQgOaDfx58KIxq7ts7pbqUAevkLLyDjnGbEkj7fOItSziQEwSj2QC4ioYRzVS6Zbc9NE) and [Buck](https://l.facebook.com/l.php?u=https%3A%2F%2Fbuck.build%2F&h=AT0V7H48HlqjzhXNG19qyTMvbjW7J6ohsuqAM7wagdk7FIyyzxtB19elw-X2sPHBbLohTNR6HjawPhqO-N2CmByFZSCvk30fWK4i-92Yrv_IvTUetR_iPJrBV0QXzrkmIM2YaQGmE8LvpQG_TwAG791M2lIdItUWqsiEy8PCdyc).

**Where can I learn more?**

To learn more about Watchman, visit [their website](https://l.facebook.com/l.php?u=https%3A%2F%2Ffacebook.github.io%2Fwatchman%2F&h=AT2REINtESRWN4e9AQK99cRiGuhS2GtUfEYuCKU4UcAo45dP-_oUUSIXjDGYurgvbaG7zZkeougAjQDwbgkrJZbo0R7H5dgI7fy-cAMVZo9fAMP8Ghdjsy5CU3Jyd8f4iwSOp_oj3ew-FaV4_3QjlvdB7mFc38C2WGilU4HNiVk). The project has an excellent [starter](https://l.facebook.com/l.php?u=https%3A%2F%2Ffacebook.github.io%2Fwatchman%2Fdocs%2Finstall.html&h=AT2856hRkGYXxuZpcriUgXgpWk3u5uDlC84C6HFVunBOrLrjM3LR7zfExnnuiJ4sDMJrinDEAsxzD9mC7lbt4w4CI8sF9Lk312IiVJYMWIb2_N1rlNsrJUcinwimRVIiQ3yjRC_a0jnJ-g5SlRu61h42u_sICmpnDh5swpGklas) and [advanced](https://l.facebook.com/l.php?u=https%3A%2F%2Ffacebook.github.io%2Fwatchman%2Fdocs%2Fcli-options.html&h=AT2E_H4jfuFNP-URZsbTaptre8k8fxpAx-3u3WOu7CmOpiF0jHrqazBayjijwmqJ_R1dRKFPsxNyaKVoXeeAT6t3QZph9-SE1CxwKn6kNQeSSklexIyvkO-o2r6mqLdrdDodM-JHKq3HprnYdHTa6yr3dDeLzf1UBEs9PvHGr0w) documentation. The project has an active community chat on the [Freenode](https://l.facebook.com/l.php?u=https%3A%2F%2Ffacebook.github.io%2Fwatchman%2Fsupport.html&h=AT25IQISN0gw7iQODKxPkw9C8wfkwz_atPYbBzTfS_2xWv_jC23NaU8Vb-B1r8y3rMtPoQYS6oG2zooWFSqreXYZ3VUwUoS_kYQ2mcSCevF2nnH1pge_hbFYamGNhzIDQerdnval_hIsmPADrd9j3d9DUmZQ1HH8gk54wG6yzJc) and [StackOverflow](https://l.facebook.com/l.php?u=https%3A%2F%2Fstackoverflow.com%2Fquestions%2Ftagged%2Fwatchman%3Fsort%3Dnewest&h=AT0Zl0ftgySIH7ydnZYodhkquIZqDQAQnAcTytrXM1-RwnJN-HiKCQ-uPmzIrLWCBTLEauV9YjqYgWOfSd3ttDAZPaYNKR41BMYWg_RRW0bL4TBmpma_DUqj-eKSFCraFvy5QqwzHJlywTsv5mXse1XvSFqehLeLE3NPrOd0yyw). If you were to encounter an issue, there is also a [troubleshooting page](https://l.facebook.com/l.php?u=https%3A%2F%2Ffacebook.github.io%2Fwatchman%2Fdocs%2Ftroubleshooting.html&h=AT2CUbCQvXstxOlRmezfEhwTSGt6QJTHXbD74uEsH0lxk4LH3lCFMX2nnSlWHhHgCyx5JTuYG8Qu6c7RxQogdVIy5DbyMlS36wZr-gEYmZFNQbshJwrFI6hVxTMyj3d-rf5bMX7dny7c7L3RlLh2Uf31F9dpRSZ7qm8xVEXJU6g) available on the project's site.

If you have any thoughts or questions about [Watchman](https://l.facebook.com/l.php?u=https%3A%2F%2Ffacebook.github.io%2Fwatchman&h=AT0Zs3q_6wbP2IHUrgTUAPS8OWv3zfDYN_S7BTXXPAv5-_K9sgTwrcbTVxgK56Bafl2JweXnqUcsyTG6sn7nnxv208H6ulYfu1TNNwT1dMhqWeYEzq45drfjAVOh3FPYfnZlW_8ZudSDDDgxtINP4EVFU5NGuHdLkmKl62TgXB4), let us know on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT01q401D3Hr3R29ojqaNP78ogmColSggL8WZFZizEDjW6zi8n7c1Nd-t0NF5-ky-D5-rY-G3EPkEcDgh8bKGjBkRyzICQ1qKAHYsEYagDeA9CATg5rRuQJMRAGTq1e0Q94mN16ZXBg7RMPrfCaCIYWf4533lNLjml36I7YpTSo), or [tweet at us](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT378BtlY7I3dXx-M86WEB37ySPCQROzFNi2ldsk3S3zrVphuja8ZAmu0WkajGQVgaz2pHbaGNd0UMBmp98TVfaJH2vFMvJFR56-srcFge3wVAjF-ej7Rctl0u-EITGI2tEhlka0r6jg4TwBaCRnqbZmjcLtNTj-PxMjF1rmsO8).

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Facebook Open Source team explains a Facebook open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT3hP7pi_nfKbD2R-_MtWdKyRutpigYF_b1H-H5qHou38B0-o1QDkUMkD1wSGGg-4eq76P2qamzfLzIQtp8T6SvUyoZou_3VRNoOTzzgJLELegO_23Q7fm-KcFdaOPlwOCB9jQxAbJQRqNHR62kjwkPORe9nx0KT-Ywm6fohzV8).

To learn more about Facebook Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT3GWQReAW1X5CRNRHqCnsxOkWfVKt_9TWtpGPFr5ObzpRV2eCIXA-YQgLlnI-eLDxgocHdWdWEBWEjOllMaSvgDbNcYEYfG6anOaB83uK_rFfWSx2pjjHB-fWCu9EN-tmelPleTASo8lzs3QAZ3snjL1imud8S7QJcKixFEQQg), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT2e3KN7DqJBXXSsAJxdXTdazWyZOIEcsmJM6aIhEqKAYVZUxZCAoMl9Dy3ale3q1kjUKEAxvg8S9hlEcmbY8cHNqj4tnP5ef4wFzlYj_0cH451S2HT1X2YNrNy4V1WdSpV-6ebibfKYy05v-kp8IIpIC-guoQOcFSMkkbXMPqc) and [Facebook](https://www.facebook.com/fbOpenSource/?ref=aymt_homepage_panel&eid=ARDXvVAPwnpPxsaQUtdpdrWV6jhb5mz67ET63dJme3yZIeS0ACffMtUeMkdUFwe3UjT61YNDIy_rXwdD).`},{title:"ELI5: Litho - Simplifying User Interface for Android",description:"In this post, we discuss Litho, a framework for building efficient User Interfaces (UI) for Android.",date:"2021-03-01",tags:["open source","eli5"],slug:"/articles/2021/eli5-litho/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_eli5-litho_eaaae9ea.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/03/01/eli5-litho-simplifying-user-interface-android/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/03/01/eli5-litho-simplifying-user-interface-android/).*

In this post, we discuss [Litho](https://l.facebook.com/l.php?u=https%3A%2F%2Ffblitho.com%2F&h=AT25B44g0O3pjJqiabYLU-JIRzJrIJyV9gW_bgu00PTRr-OK4EDgaxu2kJIbsqLj3Pqf9npGuAjD1dXJETj-1i78lNc973TSxrsVwKwuJwkoHj3zxiE5Ud42OIVAqi69D504gdO4xasoBWDWpp90UrnUURLZZSgdIdxQK_dsfKM), a framework for building efficient User Interfaces (UI) for Android. If you're interested in watching a [video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FRFI-fuiMRK4&h=AT2br23P6j9KX4Ghdc3jWsil4gEorvzxStNKsYR-y1MKoCQfMf5DF10Un_dwh00AY-SnU490xKsjwnQGV_M_Smfhje-qnLppBvGrV0JZvPRKikFs7BeRol2SvGIEFXYv_4O4kAui9S3tSPeaVE2WR13NmCXqdAeTvJXRXPAYgZw) on this topic, check out an episode of ELI5 series about this open source project on our [Facebook Open Source YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT1feVMHMsndmgzWp8OH1QgwuomNXiCGLuzuT9DWT0t-mxriuk85wg8UnP8A3FXfrvSa_C8bBSdgigCfHush8pZpN5bcWXB3LyKypVE1bNia-X_8auYp_weK0ssJvyy7jn3t5vvj37tzAfcKhD-89MsnW_QY6A-wZIqJhTKT0tc).

**Why Litho?**

Most mobile applications today look pretty similar: endless scroll feeds of photos, videos and text. There are many moving pieces to make sure all the elements on your screen display correctly. Scrolling on mobile is a non-trivial problem with large apps. Think of the News Feed in the Facebook Android app - our developers put many engineering hours into making the scrolling a seamless experience, optimizing all possible states for the user. Fortunately, Litho can simplify solving this problem for you.

</br>

</br>

[Watch the video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FRFI-fuiMRK4&h=AT0GpqKVldBDRVxYhT6Cth04S9w3l2vRNfd7jVh7uZTitItCQGj8GGXn_oqGA1i9Ei3-KBXv4ONPXdPfz4LlifUsPUBB8oWvbaz327I6VCLz7FSDj4XX8gcrfeqhAv8vo8idsP07So7ycHeEyXoLjEy2lyO9AZwl18EXoVbbBUc)

Litho is a declarative UI framework for Android. The framework brings [UI components](https://l.facebook.com/l.php?u=https%3A%2F%2Ffblitho.com%2Fdocs%2Fintro&h=AT3iU3iUsdTW-FaHfZa3h9r63DQs_IUOT4JHqFG07BBPz6hbTllpQZ3BZworArcv2eaA-YH2jRSbUFQYoTqSvoiNwYMKwakYLAVeeh3SUBzA14zc7il7OvYaHXdLG67bF8QH1rNjSYNqWL5H6EYxtwEMKNDa3-6MdSWRzGjmgqk) over to native Android development. This approach lets developers split their user interface into independent pieces, making testing, reusing and building new ones [a lot easier](https://l.facebook.com/l.php?u=https%3A%2F%2Ffblitho.com%2Fdocs%2Fwriting-components&h=AT29neci-Tgg9YVbzLHK070JwbU8ipg84CAVYoJEk8FUKwFvD58PMCD_7u9HgoAbTQXCrKim_9JJFG0XE2DV72CLHCbq-tUMtcJ7VIq8m5iaMQc1W-a3Txuf-8c-2irdxCB7rA_likbiWwyhublMBI_oDMWHOMxhEnPYrqDAODI). Litho allows developers to focus on implementing their ideas rather than on how their UI is structured. With Litho, developers only need to outline the layout, and the framework takes care of the rest.

The core principles of Litho are performance and scalability. Its asynchronous layout functionality allows Android apps to measure and process the UI ahead of time without blocking the [UI thread](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.android.com%2Fguide%2Fcomponents%2Fprocesses-and-threads&h=AT01F8iKmugDfQRJKDYyLopJWeLa19pk5RvP463iOAHTwNEt9lWNZXphQV1sjZt5gADB1LAf6Kbobgg2WUIHTL5ZM_KhHlj-9hU4Vt291YCkpKkOEzHTmYkL9jRc4Gy_yiBUP66EvcAuArdEMG14Ymzs1Hw99sBJL6DQ93PGHD0), the main thread of the app execution.

Litho uses a Facebook open-source project, [Yoga](https://l.facebook.com/l.php?u=https%3A%2F%2Fyogalayout.com%2F&h=AT1vqG0QKWPjnQyl9vjfTY2ZHXHE1Ty_T1JxUgT3Vu7ixbawe97UBGGRVsHgC7ajZYVqaCv4yuSeD0gAzhTbqQLI0LEh_URG1SDELfTk8yOgDw6rBIto1im_NoAJHeJi1DxOKjg0cq83f3y6seObPb69hzZhSYL4TE3B_lGfjxI), which allows for a flat view hierarchy. This way, users of Litho get additional optimization in their scroll performance. If you want to learn more about Yoga, check out another [ELI5 blog post](https://developers.facebook.com/blog/post/2021/02/01/eli5-yoga-cross-platform-layout-engine/).

**Where is it used?**

Litho was first released to the public in [2017](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2017%2F04%2F18%2Fandroid%2Fopen-sourcing-litho-a-declarative-ui-framework-for-android%2F&h=AT2BVG8F3dFX_MpAMeUosYY_9oq_2s8dbzGvioV3h64BY6vxZu4XeyjKXAXAUSs_E4aeFtgSht-Ha6Gf8xeF2UEwNsxn62KPBtZR_a_q42afFbJZ3qnTUaahXxsdWMM8ZrC4Ew9Sq8uMZS83tncTK3ntVUa9mS0Aj88Tbc_13vM). It has been used in many of Facebook's Android apps like the Facebook App, Messenger, Facebook Lite and Workplace.

**Where can I learn more?**

To learn more about Litho, visit their [website](https://l.facebook.com/l.php?u=https%3A%2F%2Ffblitho.com%2F&h=AT30u15EOSBJ_gFZVgl-Fvt-l38fz_tgeHFvy4ANrgpZQYmgCkkw8w53SQTYmkwv9RDU_DwnIdHu2eAhcTI077ziXhCXXqXD7NyryQa6Rm1HKaK6u4HGUFgxXSJzevUMDrVjAEb364Cf08noxe5zjG061xD8Sk5v7MBHi1ZTlcw). It has [documentation](https://l.facebook.com/l.php?u=https%3A%2F%2Ffblitho.com%2Fdocs%2Fgetting-started.html&h=AT0H0geAa_Y3yy6tPoTMDe56o4xSQeyDl8FsumeZ4i3GOQqpH6nlCqSJqvINLvG7W8jE7wXwAERdEYCH5-AaMF-OAyptOM295bJSyH7RuqiQvP6Xktpn2_9KO5bzWt1Ji_evhg60iwRjqU5JZRCVyenmHr4Vh0MwATayAITy5fM) and [tutorials](https://l.facebook.com/l.php?u=https%3A%2F%2Ffblitho.com%2Fdocs%2Ftutorial&h=AT2tbO6oKKyntUS1Qxqhguk1szO_UMpzop7PXhiVVOTvb_MypnfLIjPgRuDq-PuWivGYPR-Y6xkBhPQKsCcEC1HfwfCGjBuqYEt6j3miF0Uk_tUjixGmZcFtExin_0MxxbVs8IJ6r9Z6Tn25tcbpjNRkzzSxUYvZ-jZOO1066tk) to get you started with the project. If you want to engage with the community, you can join the [Gitter channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fgitter.im%2Ffacebook%2Flitho&h=AT0O0D5rCCxqL05ALFPVDajIxXR8XhnWfIelrWW5l9hEUCaV6K03k1AkMq7pzOuwueS-1mICqcror6bFi3x8nnc8BJe8hRsr8GYrog3TuUn4188a50LyzJuP3yilKhRiq8-Roonpd3sDo9ow_95gQn9iHdupGTShSndV4WqhHV0) or contact the team on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2Ffblitho&h=AT3Ubsk35epkKmxdqTujSK5KFkD4bcoRLTq1yv-lruPKGtS6oR8sCPNSyeZ3wWnTfhkYkFG7R_K0JBW-kWRJQE3GBv8dPiCRVr7G_vl3T3ZaDvkQdb3rM-_6mujHH485c8U4NCnIa5LhKyS60AJEa-4fsRFf6zpXx-j7KwKRKG0).

If you would like to see more content about [Litho](https://l.facebook.com/l.php?u=https%3A%2F%2Ffblitho.com%2F&h=AT24JSadfVIVJ-p2e4ZEgiZjTiPjQkutvrsl5tavtE8KEmS5MMkdU74oipQRvGqL2w5gNg-fYFHqWUCI3BIEdpd5pd3kYCubOjJI8Z7Fp1JUYo9nR1AACvH9y7EsCywSoTVJc15c7fklX_mVjehDFkG9LciNKYFu5XsoIaq45QM), let us know on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT0u3sHPiwhUHUsMfKJ6p8ZxmP66res0Zj5vJVPg4BiBBi2-gwRYRS39xBiX-24tQSTc5vZ2dggMWCvHlh20zosuWjCEnBwLkCa0EBU1omVVlltw2LGCosVOcYC2FPPG_H6mTd2sofq_z08r-8bcK6u-Sbqj3ijW2XGWs197sZc), or [tweet at us](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT3EKD9LexzkToJ6tlV0GokUa14j7sM8nALcv1fN7maS5pCLxa0mmKLcpOjtrRVpYp6v6DCyGeq8l6HJ92YlJAymMIhpvEb1kLelAgQ34uECk7HZxcc73CSlFp8A9FufgqeT6yzQ0GYhvkQnGm76F7unDqsqMK5fCPQ0YnIO9P8).

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Facebook Open Source team explains a Facebook open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT2z40xnNrD5F_c6EcePxMLao0sKfK0a8nso5Pa5goLbb4ZkPm6UfxmOF913SdaIgWhJEpNI6BFq9Ua87opUU36Joxm70RbN348p43ZbUAugQJ4hpeuAHvILmC6HxSZGAPLN70t_tIVMGMqPE1auyN37RCTgEC81cTI149eZnIo).

To learn more about Facebook Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT3ZlwUNTjjf-4D5xggojIlyq07VQxzxVNTYN4xIrGrt3YkvdNv2wj7FBOuLF6EKzBkjyFrkPQQTPsuaLg6bO-bVCjkxro7RutDucnAmgC98coc83k97tKbvAZ2Wd1Y4Ry2q27YozkTFNFna_zzqpVZlfExFgt5w92MK7C0oiOA), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT1MBOAF1VaKvfr_VMVaTnvHeHtM-b4HimLi_UvtZFGdj3dcHnYc34577A93v2uklVYoH4ZuAbPPg_G36FBj4f30T8ek0_AlLcriUB7YqjeZ-RX4Nl-1EyG1XACPg833rDjtL74rE5Bayj1JfOpGgcuBK2pgdYOXBar0t1p2EYg) and [Facebook](https://www.facebook.com/fbOpenSource/?ref=aymt_homepage_panel&eid=ARDXvVAPwnpPxsaQUtdpdrWV6jhb5mz67ET63dJme3yZIeS0ACffMtUeMkdUFwe3UjT61YNDIy_rXwdD).

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://www.surveymonkey.com/r/V76PRN3).`},{title:"ELI5: Hack - Programming Productivity Without Breaking Things",description:"In this post, we explain Hack, a programming language focused on productivity and type safety, in a way that is super simple to understand.",date:"2021-02-16",tags:["open source","eli5"],slug:"/articles/2021/eli5-hack/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_eli5-hack_b4cf291a.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/02/16/eli5-hack-programming-productivity-without-breaking-things/",body:`*By Dmitry Vinnik and Joe Previte*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/02/16/eli5-hack-programming-productivity-without-breaking-things/).*

In this post, we explain [Hack](https://l.facebook.com/l.php?u=https%3A%2F%2Fhacklang.org%2F&h=AT1HCzZQX--Ibkm_dJ7aAhRl7w_IqF4IXV0yXVA1oC36oIfNtAQO1XVpt2VzBVYB11Drpjz2Ue4fzs5vi981Vh2DyzH70mQA71bQwFFPONCL5HVm0b0UNEOhaqg0Z9Cv6C34xJQ_kk8ff0NSqo4i_YUR86nQKT0DqT_hmZJIg_o), a programming language focused on productivity and type safety, in a way that is super simple to understand (or, as it's commonly known online, [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT09NUutfq585iGgdcrGodUuAlPi0hkoQTZbu6jernthzkaMdt2NkChzfKvbQjvimbF587lh5LYLRQYYsEaSuuGVA4pZyo-1thaRVuIbl0cUBeRPTbxFoxSMFSxKWn8ybAT0FsFdRWGtfdrDFu7j_eOyjGTiJZ742cflbp3TKSg)). If you're interested in learning by watching or listening, check out a [video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FXlWUUWS2UEE&h=AT0xviusE-wW2s5XAN5ODqHwOYpI5rv1qoRq6xCJKjkniyvYHanQLq4dq9SC_de36uTHz51KB39gV2wl0Qvc_-SU-vJsunhvxrcbslkSz8f7Kg9orAFDhUuqcJaLxwbkYoHPk07oxXh3_hPGb1rFMZGiGOK4w-E3T6mA0is30ps) about this open source project on our [Facebook Open Source Youtube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT2rKBch-rpC8zwY8CXNnLf_Lepvu6GmPCbRjltB88BZLlxorf9F_-70D4xlq1AQMy68GpaPY2OiNy9jsEkp6MtM8bVfojGtVqFQ6J9xdmr5O6VSG6mzeDWCH1ZX03C2luvdwUoSAMeTLePZFjRffQV9A_X1FJeW_jsk8Jb_Ank).

**Why Hack?**

Developers like to move quickly. We want the fast development cycle of dynamically typed languages. Sometimes, however, that means sacrificing safety features like static typing. What if you could have both? We challenged ourselves to see if we could build a programming language that answered that question.

At Facebook, we have thousands of engineers shipping code multiple times a day. We needed a programming language that could keep up with our fast pace. We built Hack, a programming language focused on increasing developer productivity while preventing them from breaking the codebase.

</br>

</br>

[Watch the video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FXlWUUWS2UEE&h=AT1gm2HbClk5Fl1ZCw2K4bGWYAIHZxTQdgfkWETyQYlMQq4GjSNC8Vyn8-gndiYboY98z0SyVi8S7bav2OAxCImxOtY2gd0OKHvXv_s4UekOrJ-APm2HsrkLOWRTNrPMfYHILnc671gka8hhuCzTqZwRTkxJ5edXaLTySJuJzes)

Hack provides engineers with quick feedback loops to develop faster while keeping safety in mind with static typing. The type checker can stay speedy by incrementally type-checking your files as you edit them. This functionality integrates into your workflow so seamlessly that you hardly notice. We built it specifically for [HHVM](https://l.facebook.com/l.php?u=https%3A%2F%2Fhhvm.com%2F&h=AT2UIMYcPQQjYdLfDPgC0ad8Ke7bTE_f9Vu-oA-oGZGQO_VwN4_U4YKnrLpOppE4ljXir_YW3aOBglrAfuBA4WQdAloNJjp9A7iTPFHIRHEq2BXHk9G4gq9nE9orIDaEY_olGoZPkDrgBCe_UgrygLZGWVvITPsX0MPynpFoXqA), which is a high-performance runtime for your Hack applications. It's also open source and [available on GitHub](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fhhvm&h=AT2lvOiTKw4aY-MitkyPbuv0GD5MDM7necEE5tJt4hhCDO1SL7RkLE_TznYDB1rr3F1Bnsu5Qwq_V5f-6F8OOYISrukg_LtaAPTTmHcIBbTWLe-rpoaGuquCfbFWLHQe7Y1SsrWDN0MJCC_fIF-TbXDa0aVLrWPuCl2D2dzERcM).

**Where is it used?**

Hack was open sourced in [March 2014](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2014%2F03%2F20%2Fdeveloper-tools%2Fhack-a-new-programming-language-for-hhvm%2F&h=AT3pzDTb1v1u19zcnp6h6ORSZ4DwsvxQWkSzSqJAqMpChAXhSzMLfuGI3JRCuYEu9Pwny714sq0Evi8p-j0JvcH-S4JpxaA_Pcs1_PdRVfL54GOi6yKSa2Xa-Rbr9lgmxM_qjQfpfFTdH5X7js3qMwMxnRq9-vxfnDxxsN8caho). Currently, it is heavily used at Facebook, and companies like Slack and Box also adopted Hack in their stack.

**Where can I learn more?**

To learn more about Hack, visit [the website](http://hacklang.org/). It has excellent documentation for developers who are just starting and developers who want to use more advanced features. If you would like to see Hack in action, you can install it locally by following the [Getting Started guide](https://docs.hhvm.com/hack/getting-started/getting-started). If you have any questions, you can go to [Hack's Facebook group](https://www.facebook.com/groups/hhvm.general/) or [Hack's Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2Fhacklang%3Flang%3Den&h=AT1LkMU_UhTvWP5aF4O8L4X4in9ceKmwgCqAJKzNH60WTb8Cmf_a46iTNtaoZy6Mt7wlBBP6RfYpuV6qKEvvF2y5CJO5M1aLknQfNfDPL7WngcB7A2KVOKxYQIZOcnedC9jYcLl6zyZQ_YomBfSSgNfoW-oY6EG20VdXPqz9Yqs).

If you have any further questions about [Hack](https://l.facebook.com/l.php?u=https%3A%2F%2Fhacklang.org%2F&h=AT2j42Ry8EVHcZzfv-rU_7oRH-piMRhfF8jF599MalwNHPG5BmlzS-3_0XP1DxBWpNJPJXzYWaFGiZTuFUM9Yx8p8F4K5np5qKVoNeS4V0ykHMqaL_--Qq7FKvJODytzPp9leNdVlAUZoXFoVJvfnrRJCe9GTracIpQc5gf57Bk), let us know on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT1xJMYTdFLAkL9DtaLhR_0HS04u3e7ioyQhziJkNvXjQR9Ec0Sp2ijVZ3yGkU9zkt2ZbPNcBQjbxzJqUY-U97D3cDd8xL-e4o00yXtyU7_D7glnpGrGg0kUX_o8_PbXBwq7bKx2-kC-tGkcY0yjnQCJqSYrDF9FvmMNnmqMc3E) or [tweet at us](https://twitter.com/fbOpenSource).

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Facebook Open Source team explains a Facebook open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT2rIJeqsmn7HuTyZF7rplND0oxF8KTUxATDC_7p0fufNonbniFyTax4b8JoLt9laIR1iLSywENnSERNNsLgTz87vInPbc2dtHoBAd_wkODPY8t1MvsxrefYMH1BfRFz3HNomDVQt85Hw94iwh11K8HnycsZzP0urgV4tm2nymM).

To learn more about Facebook Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT0cRKxaqbPQv0s36Zj_ePcrqODZBxcXPQq0QdLxbAUgcJngGP5CrB2JgBoZDZ24mp_BF579e9Mv0GIoosU5EzFb9-TvkTh3GTLdASnuD8MwpNNLgp7-qbXdFJdfTxYIB2eYyf4eWqlECgnxKUlyolxINmRbKq00S2tVJQlUzN8), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT24F0BCCGY_556rFsbhT3N1CYqIG6hGosubu52uS2Bn31kTKTiSQYNbn92D9zOA7E667kEzS-iu2BSyYoDuKFbV26prnbXDC8Dicp9ZxAoEbLEZdcnNPD2P2lK4C7EFkpUfIgVYQeiGU2ZNKCchW3JWtY9E5sW7PbRx6ud_UcCLY5B8IqdUTCFr) and [Facebook](https://www.facebook.com/fbOpenSource/?ref=aymt_homepage_panel&eid=ARDXvVAPwnpPxsaQUtdpdrWV6jhb5mz67ET63dJme3yZIeS0ACffMtUeMkdUFwe3UjT61YNDIy_rXwdD).

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT0hFwpTtaRgbaQjNcCGM5OCF5EmffinI2YHBYrmGx-l2sJINlnYdgSKWp2UzKd4n2M7PkgqxxYsPe9eHJo6tuMyv7to-Imj9qT-qPPXKopWsyzNQC0IHNbBgGbdFa4dqMC649-di1nInPSwL9eys-dzhpY0e2S9lgYP5My__Js).`},{title:"ELI5: Yoga - Cross-Platform Layout Engine",description:"In this post, we will discuss Yoga, an open source, cross-platform layout engine that manages user interfaces across platforms by reusing CSS layouts.",date:"2021-02-01",tags:["open source","eli5"],slug:"/articles/2021/eli5-yoga/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_eli5-yoga_780be85d.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/02/01/eli5-yoga-cross-platform-layout-engine/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/02/01/eli5-yoga-cross-platform-layout-engine/).*

In this post, we will discuss [Yoga](https://l.facebook.com/l.php?u=https%3A%2F%2Fyogalayout.com%2F&h=AT3JzTNzaJx49MBpZqt7LdjScp6Kf5Mr98XbP1ra6-teACrE0z5Xq3IQM-84R9MrCUafaQGXzMBUbxZbiuhkePHWMpcJX0rk0Kgc_sSTA0DjMjZC1drcQMQOYf8_6WSm5CCRH5ZIHvSyYvYVKPULrZZh5yn7PUbbEsWuwvqqZEw), an open source, cross-platform layout engine. If you are more of a visual learner, watch our [short video](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DtHgoA6zBib0&h=AT0oJ2WZiDcCOsqo2B3DCTmQV_1v9DFznQ9ny5TKBxRFQQRtMqKAzYyObWMURysyRvv9H2nGrJ6oXM4Bys3Gn6GoH9zLOrSJGvGCHE5vAhD0cBAh17qdHA_XwqKvm0reHG4V9t75yVWaYsP5ArVxtIqVyNBmJOb7DLdsfkpugwE) on this topic on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FtHgoA6zBib0&h=AT3tpzlRwIQ3E4Ub32CEKj103pkyHjKcCjR2id-JDbyeYtmLM56C0Phdc24zWwobmshXW5PXsNysZvwKuDlQ1g7u2pymhB6JwOveopftvToJ1hzVmfi4FsdUIPv38oquRuHK-nP7nFubFj3qbh-KTh2J0ZXhEcv4UqEYMJdy2XM).

**Why Yoga?**

People will often view the same website across a variety of devices, browsers and screen sizes. Since every platform has its way of displaying content, web developers have to design, maintain and change their website layout to accommodate every possible way users can view their website. That's a lot of work. If only there was an engine that allows web developers to write their code once and use it everywhere.

Presenting Yoga, an open source, cross-platform layout engine that manages user interfaces across platforms by reusing CSS layouts. This approach brings a single standard for all users, allowing developers to focus on other tasks at hand.

</br>

</br>

Yoga implements a commonly used tool called [CSS Flexbox](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-flexbox-1%2F&h=AT3VdLEdFq12YO-GRncSGuXHC5AJGXtLHLqYcqENBG7XVzKGYddsuqgYvyrZduDud01s_-13gHM9ahbEjsss9GYys4rSlnEKUxHGESo71PDsHU2MD48TmK7KLz7GxAK1P7rEIP6SUdePsXraQlJbr-Texa8UF9fYtMdVuytHplw). This project allows developers to build flexible layouts on any platform with a highly optimized layout engine designed with speed, size and ease of use in mind.

To compete with native platforms, Yoga emphasizes performance. Written in C and C++, Yoga lets its users have a low number of dependencies while providing a smooth user experience.

One of the goals of Yoga's developers was making it easy to learn this layout engine. They created an [interactive playground](https://l.facebook.com/l.php?u=https%3A%2F%2Fyogalayout.com%2Fplayground%2F&h=AT37IRC59sftKoDfJdZUJFJr3E-t0AwjpinBr1oPuEAdlZIEAiIj_EIZ_X5MlV42S6EIRQNo4J0jHq4t7KZTr2Ns2GJbeUtZb-o6xCzFUN18zNW2X0VKo0hljFeGQsUsoZPoVFQ99yDvq1NLCVNiokjtS6HYHNgd0YPGKZ_j2eY), so every feature of Yoga can be experimented with right in the browser and then brought into a platform of your choice.

**Where is it used?**

Yoga was first open sourced in [2016](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2016%2F12%2F07%2Fandroid%2Fyoga-a-cross-platform-layout-engine%2F&h=AT0i5m-BSGmz6Cpp4aNy-dZZ-c7K9jrFbJ24MhHPva1VwCQJBszNPV7FMzOZz55vBhaKVu-AuMX6sjXRGhkD_dHE1a5IZTZ4_imJ_t-6T4Ge-AmKOhTW0USu7jQZF-A1VGwlT6lltGA6Q6iwUGzJSwn_3wYN3nIPs9IT-QbBHw4). Since then, open source projects like [Litho](https://l.facebook.com/l.php?u=https%3A%2F%2Ffblitho.com%2F&h=AT2lBJNlHGhEK_bpVfNRJveXNWsBreTatgOHaLkxx3Nz5l17MPQuf_75yE8K6m0hkxqbiUaDMaVyEf_6gzfVUV-8H4OIBidDXZI23-jPxjKQL8NXtEWb5J4wwwfxHm484_KUnYjZAcLqAJNZadWqt5h3U5b6kqkkyfX2izAF7uM), [ComponentKit](https://l.facebook.com/l.php?u=https%3A%2F%2Fcomponentkit.org%2F&h=AT2j6-30F4UTTvMwuZQ528Tx-uYFIE-ZRmZwic3mXIP2cWHRqS_abPwNxmDRNJihRfUlN6U5RT4XkF8mAmD3myyKSaTb8XNQ7t-FYzUtQWTHlU1K4CGwcT_MAg_66q8kBNTNuYDg-l_SuGPj1kdHv4Zd060Vskby2SGYp_GDbt8), [React Native](https://l.facebook.com/l.php?u=https%3A%2F%2Freactnative.dev%2F&h=AT143DpPmXnlbXiRiTZ7EOC449-3UYDsiIOaw0iK5RVYb_MmvSi9L_9gwbzCdgBNHaFgIYB_SVkfEaQ040xteR91bpdsDcvGNozRjurnbfcZSwUWXPOVP_H2y49F1qtV7BK8fxmfdE1CGVuTtVyw3J2NvcXHUmjtvc6lSq1Wk74), or [React-PDF](https://l.facebook.com/l.php?u=https%3A%2F%2Freact-pdf.org%2F&h=AT3H8Sd3jATT57Hf_EjUOvUeB34FCXWJnAEH7-ZJSF9QigTxjwqigJjXaRr2rS9bl5yi_N_1huUa3ULP7ilm4gXDXO5dau4Nn89HDO4e1T1pPhv4wB4KuH8MSfHPY_xSwGXaaLv36t2Dx28nvSC5ESBwzpt__zB8FVM66ddqpJI) have been actively using Yoga.

**Where can I learn more?**

To learn more about Yoga, visit [their website](https://l.facebook.com/l.php?u=https%3A%2F%2Fyogalayout.com%2F&h=AT1yoyuAMf9Ch1ribVZ52PsjlDFv5tRwoBi0qkWGtOWJZlAu1RCoB303ME0I4N53omKq_ztqlIUnuka6DRTPHkkgYLCL_HcsKbZCCskvkkEOv5C0TBrfDwuQ_CLpoVxFtDGrRN3voP5HfDZ8v1eeVjisFD8Cum1g_2fmbSA7trE). Yoga has an [in-browser playground](https://l.facebook.com/l.php?u=https%3A%2F%2Fyogalayout.com%2Fplayground%2F&h=AT0r9Cfb3aFmx5ALwYVg6Ud-SxEhF2CXfaACjVChrJ5iU-pT3_jsv9EFuD9mrbjNmIbWyDN3_n7cETU-ShOs_TtXZYE1aguT_vpN3ifVAeaOij9-0uhbYM5ekPb4fdEwTjlBLs89dnTkVUfOCjggCESeUYCACoPbp9APTFeZR18), [getting-started guides](https://l.facebook.com/l.php?u=https%3A%2F%2Fyogalayout.com%2Fdocs%2F&h=AT1iHPROZsf3SwuDaucNMni0EKRBpNxn8sP5s121MQLsQqAxQTmmCsPeTbMIpaPiRgf4SBqzF1dZPr-nr1uIs99_xCWSAXjiegmKeayhko6TdEHAVXqjYzuCTnwVXx-_ZW4eoqrDvaDSUSgd4DUMWlpUodw5PBkgxCa829sRdIs) and more! If you would like to ask a community member a question, go to [Yoga's Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2Fyogalayout&h=AT03B6KV5MaHhnRK2onN9g7-4NmXKOMgdXY005VKv1LILG8fDIa7pI8mxsNT862kV7WQ8OJKWPxBrlAyUfHFuUewcg5TaLgFYksmZ69R31_W7eUnHmFR0X7t3_x9mvVJfd9a8Pi1jrwZiVOM898OYYiN-5XI1B_3TKbU1e58r20) or [GitHub page](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Fyoga&h=AT1Mqlh35eyvRXBAAObxDBfhMQhbWhsKZg_tbYN6oTqoQNBtOO88J_rjSexRMftF74TUfCFyWxHUziScHfvms6Z5_F0dEajuE18A_VFsURCcK43cH8SkMza2Juf6NrVhWsY7Q6EtFHPR65FR5jLkKt8b6j5ivA5MXs20NCG-8MU).

If you have any further questions about [Yoga](https://l.facebook.com/l.php?u=https%3A%2F%2Fyogalayout.com%2F&h=AT0cr7aPLO6apVC6oDgHH_enslv_HvrP6VwjOBiXQ6SMVThnzG4fCY75ObK2YljmIIEo_w3vSsK9qpP8hY0EeO3XW28sTue0zVb2wodsCRG2JZW_V3J5mBMaNwYDi7cAOrPCXVPZKtNZehea6NDVE1mb3fnTkawPeJ1aNyIOW8Q), let us know on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT1fXkZhhuC1YrqSUlECWfh3snCZXXeFpJZ4fMCALPN9XZH5exR3ZFY31XCbi3TPxo6od_7gQixpIjwFQv0zzrxss5rRi3hHzPkjUHOuoEJYaDXabv20uDq0mWnETSJ0A9QRWzMj-uOuL0b3Cz09RDJf_oKUEx51BtAXShf-Bs4) or [tweet at us](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT2A16JYFMldnkYGclkfEt8DL9TB7GR65DZMQlGHOELiLcWkMjiNmT75GEX5AnCNlgAah7xA1rr47Rf6IiQ8fpu0ETIObRsAxySfFVPE0ZP6q-cbHUJnGWX84D0_utKYmLvBwnPIioa2z9WVM8HcLsjlV7dZhGL1dnfTBfY1RFY).

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Facebook Open Source team explains a Facebook open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT3IHO-T_n--MPlT9dW1NKoP0GkEQNRBOQm2f17hi5_8x0UFrlz0uUFvZlq_SWJni-1wXQnx9Vax9Kr4YhEQ8ZrRSr-iHUsM5kyqIZ4jX1LpaoqD6tYGrLFnTqp2aGfxS_Gad7QNnyHVFPugQapy12X3d887zcdvyN1zFBZ416A).

To learn more about Facebook Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT21ytXABCV0vSmzNAXIMOkm0H2pTGjK0d1ob3EWc1ZwG5w4uIMTKpFpp7_ZKp9CyqKngZzhRv9VdVJwvgKgVlDdp0KgANYSzM-kstqmIZmlaHrxIGWQiXpcn2Wz035eU-qpvJgyeulGzM8wPuu5vBPpjW7kZm7VtefG0wOGD6M) channel, or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT0hqD2qsbt0k9LKWh2BHc0eqs6ZJkQQv6T5N7nwE4DqRAGpGJUdDxROUB0ILcZUAsk1PEBnmrl2Vktd1wcOOAs19nVLmcqEHYO2J-XLokSgC4hjWz_DjVGQWwXUO1ciuk17iY39B9uwlet2DAWX-IdQTfdSMV9bi6TSSBBR6qA) and [Facebook](https://www.facebook.com/fbOpenSource/).

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT2QkrodzI6RSuK-MAgoX7Yy_6YsF2o2Uj0_Iy5TfYErEcy2MRGYy1WgETYjaIqLds87HQenSN6kzHwwgv7KX9JH8b3lBa_brTiNUlkjQoBu0yufe7a1A5z-tu0GHVCVcxnzWUsHXLUu7wlWlopxmhFe0yIvD8gO9_-ICreLrb0).`},{title:"Open Source: 2020 Year in Review",description:"In this blog post, we want to share the appreciation we have for our community and highlight some of the work done in 2020.",date:"2021-01-28",tags:["open source"],slug:"/articles/2021/open-source-year-in-review-2020/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2021_open-source-year-in-review-2020_38b17fef.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2021/01/28/open-source-2020-year-review/",body:`*By Suraj Subramanian and Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/01/28/open-source-2020-year-review/).*

*This article was written in collaboration with Dmitry Vinnik, an Open Source Developer Advocate at Meta.*
There is no denying that 2020 was a challenging year for many of us in so many different ways. Despite these challenges, we saw more projects going live and more people contributing to the growth of open source worldwide.

In this blog post, we want to share the appreciation we have for our community and highlight some of the work done in 2020. After looking at our open source portfolio's core metrics, we take a look at our foundations and partnerships focus from last year. Then, we review our community engagement through the Facebook Open Source social media channels, including [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT0jrB5KbdQF87sS_mzc3rix3EMr3sVzTYG_S6Lx1wpTRbCW4z6CskWBsGyzwvkMkxZES2NaR122HYWrqrzRapcEylbHJso_peYL0PR6q6KG4GrKdTwz5_bqeDso2CYyc042LDRMhp4bod__ZUieoCqMIoWro3udGqgYd46Oiy4EECu3S61DHURF), [YouTube](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT3iOmN9HfJ_0cSWkjd_mpfSPKOuUMD_6F7npNQrphdQoX7A_cqPwJgypsBT5L31f87Ff8WNcTrilu56rm49W9Ddhv5t4DTMFawAUbdgh9Jo7EV4uo3zreQhfb8qvFad2xuvVkQxeBHLQ_BFxE5yZh4Ec-wvryoXWXeV_HuulJ4), and [blog](https://developers.facebook.com/blog/open_source/). Lastly, we deep dive into our open source portfolio in several categories: Developer Tools, Data, Mobile/Web, AI/ML, and Blockchain.

F**acebook Open Source by the Numbers**

In 2020, Facebook's open source portfolio grew to over 700 [active repositories](https://opensource.facebook.com/projects), with more than 200 projects made public this year alone.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/143326803_789981921931781_3625414714551932602_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=U_pEBQBKRx8AX8NaZkU&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfD5qqU3L8SX3V9pZBmafl49OYT8vOVgADQ3ObFu1hFieg&oe=636B2937)

Facebook engineers and developers across the world collaborated to make over 127,000 changes to the codebase.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/143272396_168278474745372_6971491882314882333_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=lntReFoSzYkAX_Vbl97&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDZIl7a1_FxtJbmRcNWuL6oWzHxNQI7xC1htfEa173bGQ&oe=636958A9)

We welcomed the 1.2 million people who starred our projects on Github to our communities, and we look forward to seeing you around in 2021 too.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/143384413_540210096940347_1225666321604919029_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=WcDnIsaLtuIAX-Zu_VE&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDOztalRERJC3C7jd478htYDddS_y03J-E9e-KXmJcLrA&oe=636B00BE)

**Foundations and Partnerships**

As part of our commitment to increasing open source usage and experiences for all developers, Facebook looks to be involved in appropriate foundations and partnerships to help achieve these goals.

Facebook continued its long-standing support of open source by joining the [Linux Foundation](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linuxfoundation.org%2Fblog%2Ffacebooks-long-history-of-open-source-investments-deepens-with-platinum-level-linux-foundation-membership%2F&h=AT2QpYl1IfwuH8LJrilxDPd-5exDtYfA6rubzsJ3If9tlS71-dAl3F6ONultr2047DBsbl3qz2Z3BfLcg-eaEDgde9nsgtGAbFfzQ-H0yw8QaIQRwvaTciVkI8D0Ew1XPBAM3kMwGA0-UlxHSsZpBOXS6CyMjk_G7Iy72YGgcUw) and the [Zephyr Project](https://l.facebook.com/l.php?u=https%3A%2F%2Fzephyrproject.org%2Fgoogle-and-facebook-select-zephyr-rtos-for-next-generation-products%2F&h=AT3ld1bF5OHWv4LFwtOIhWoBFiR91RUODQKOLJg-oEAql3SQ8LM1SWJHfqu4ZVS7RfNm-UVe6VyhusjysZwiyQWPPyIl3t4up72SSKIkZ0rPbKv0kMlWxYx__qikLYCbwCWfQyKYdlr9FKNigNIM3i17siXETfOp9PtbVoLu4z36YdiGqP37qO3k) at the Platinum level and becoming a founding contributor of the [Software Developer Diversity and Inclusion project](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linuxfoundation.org%2Fpress-release%2F2020%2F10%2Flinux-foundation-focuses-on-science-and-research-to-advance-diversity-and-inclusion-in-software-engineering%2F&h=AT3rFm_oE2LM7Qk-eb-wjRSEPcmCsrzWwIz8dySnvimX8UdSFUrdcEKrduopUhdYOwQBhfY_nlsEt3yR-aSdNzNT4vqLTaG1BO_qd7cFy0iljOL3GJdxYf2oEOOdi-iNAx2qEyTgDgnBsIhF76K6pXJO9lx5BNVgIMlQg9iXLS0).

We partnered with GitHub and Major League Hacking (MLH) to launch a remote [Summer 2020 Fellowship](https://l.facebook.com/l.php?u=https%3A%2F%2Fnews.mlh.io%2Fmlh-fellowship-the-future-of-tech-internships-05-04-2020&h=AT3oGSKk-xo3nGoCRycF2D5oW26oDqWxry8XmpHpddO5pBTm28Au3k5dwJZNOezf-e7LJkRWttPJz9IoiDEmPAMicZKG2rpyXVNUZ1afWsWhCuJmBKunQH9eX8WRgqZPkJ7h0KXKt3HLEM8IsxMxBguZWkh1Fa9Pw9Mkuwy_eEU) program, a [year-long fellowship](https://l.facebook.com/l.php?u=https%3A%2F%2Fnews.mlh.io%2Fwelcoming-facebook-back-as-a-sponsor-of-the-2020-2021-mlh-fellowship-08-12-2020&h=AT1_6L2BZICHH9qd_CuMn5QkL0xF7X_H9NzCPFJP0ppEqhtebFhTmxYswlnDqXLo2CvpVHOow2NgIz0wxFn8c2Dv1yfZqQLzqMNB343zAihoZlY-MJBKdXk_oEd8SdVByUxEJiPQleBlsFHPOPMBmKI2SQK_JhwLo2OwSPCXbEM) program through 2020-2021, and provide [Black developers scholarships](https://l.facebook.com/l.php?u=https%3A%2F%2Fnews.mlh.io%2Ffacebook-sponsors-major-league-hacking-scholarships-for-black-developers-08-26-2020&h=AT1dqr920xc9JDiRIGXpXDr5sd0-tiLsEuCZbUaSyqSSqb5MWU24Sh718LqN0NbORnOqrSFm0yUQuwGyu7ysN5ZfqEpIvE7Kbvz1bA-5S_bxOcqI_9__MqV7ZNvNrXiomwDXvYBV4gxhSQiwRMnJE6A8SjyoAHINe4w08xmqs_I) to participate in the Fall 2020 Fellowship.

[Spark AR's Blender](https://sparkar.facebook.com/blog/new-spark-ar-studio-integrations-arrive-in-blender/) Toolkit empowers artists to render immersive experiences from their Blender projects seamlessly. To further support creators continually pushing the envelope in AR/VR and AI, [FB joined the Blender Foundation Development Fund](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.blender.org%2Fpress%2Ffacebook-joins-the-blender-development-fund%2F&h=AT1rUW57hF5Kdz6fdkaO9dvdC1V_ZbC5fVMmIautNJZqVTFqIgbDuYCshZjzYBSgOzPbk5bJVpUuy0K-fKRh-Jl4lY2-o1EHawvbErK2f4_SGt7f73j8rYuq9miYy5GC-aUCnq_fvUkBGidkhrl-YsooULxQLYvi06OPeGiEYdA) as a patron member in November.

[Facebook partnered with Microsoft](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2020%2F12%2F14%2Fopen-source%2Finfer%2F&h=AT3HGll4-DYvOQHTAUbI1EW2_pBNQvEkwCJmkKnVj_00x0gUsHghlb0qZ0PR-twVcUWcCHVujEcLWyJDgb9iciYKjFZccnW2MwRxsA4IyDSm3X-w_UaIzzS3vbFYuivWcgrdmhJ_4MNUfjHowmSSHDtnh7LClndNopEXquGti1E) on extending a static analyzer, [Infer](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbinfer.com%2F&h=AT0--hhuN3ilpTt1ReF8RaSAaEOBwrTA6J2G9xoWsos-EgNEu1ybqs2bFdIglaOMtX_DYpTMiWUnO5wDnOgzh7NpfJdtQn1Ja-yoWAOeNNjS4v94RCLVTpTSnWbrAbfP1IGPOYZsEY0S_MTBTGBsIzr3XiNSApakE3QxvlsEnlQ), to [C# programming language](https://developers.facebook.com/blog/post/2021/01/28/open-source-2020-year-review/#). As a result of this collaboration, Microsoft published project [Infer#](https://l.facebook.com/l.php?u=http%3A%2F%2Fosoft.com%2Fen-us%2Fdotnet%2Fcsharp%2F&h=AT0npx5Y48RdvZXbN9OERwx9HBVPfwJxaZAQQuFArK8rUBTTKYDPNdmLRB1NuPH2Ze_KbGQk3SGTRw_VVR3ZuCoS6_rJ3-z_a8jMkmyID-h3sHbBZvi_BKbHJlInWC0My24sGXRhwayX0oCu7shkBSTD_X5XWXKuUFfrFMItRcg) to detect potential bugs like null-pointer dereference and resource leak or race conditions in the .NET ecosystem.

Facebook helped found MLCommons, an open engineering consortium for ML research and systems, as a founding member to tackle issues like dataset diversity and fairness, and performance benchmarking and reproducibility.

**Community**

Lockdown couldn't stop us from engaging our incredible community. On [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2Ffbopensource&h=AT2Exnq_OWSIc-4RNc_GrvXw-Ku4Uyyefx88E2oDxlw7Y9igM1k3PiH7JMyuh3QoCP3hrAqVQlNGaBt4VgjWaaoKpBNSrFAwJdWeuLWC8ty5Vf3cocUUhBPBxEYNlTMiNVjNPHOtFheqrvui4HPBAH_EQur6snUUouXcGG74ZGRmdSV_7-4DIonv), we wanted to take the time to thank members who have inspired and motivated us this year. Our [Community Spotlight series](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2Fsearch%3Fq%3Dcommunity%2520member%2520spotlight%2520%28from%253Afbopensource%29%26src%3Dtyped_query&h=AT3vcp_Fw_vXUGP3AYqTs59p7dh2utwxD9nx1O2URwNJTCyyIUGJQupvZUGfFKXNdrEv7AFPsBOxtsOchNTvLJ07-RzTB8akIX1ktFqVzWqruDbaDroNe4uaSFTIYu_p4A-AJdelw6lKRXp_n6hsC8RA2gXn8R5i9x5HfAn0LJE) featured work from our community that contributed to our open source ecosystem's development and growth.

We also wanted to engage more with the open source audience on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT2s6FDUoqwiYPmpGFGcO2N-B7Dx15_ueobKuU_DnSvz08uj2L7g_P0bTrF2tD_MhSpt3-pwgCoiZNLX6x9L9kBfVjChUHYwM467_Tcs4D0egwO6HX9Kk1UshYNHwTbLNqR7-v6nRFawy4WWNQn_uzVm_7FeZadQDyj7eTZIci4). We launched an [ELI5 (Explain Like I'm 5) series](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fplaylist%3Flist%3DPLzIwronG0sE7cCot-0yCbnuR6sAe7PIYX&h=AT2PqM4kUWoNPXtg_mN6ujGe0rch5QlWwh2DsUjhGno_GFN3TskJWnb4pY7XvWrQl5SnydhEf1t759LzPFZnE_KMhlP_N2i23u-wzoiozK3nF5QvfWMzUumZ0FDQsQrENuFDJL4e8mjBvuI6QRaPTmht-nNvvcjK_DGXM8G3-vo) to introduce Facebook's open source projects to you in 60 seconds. We also shared unique content like a [live-coded session](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D-eNu5hS94z4&h=AT1RVJElnpQpxgFyo9_MDZSVqEcYE7ynFboXcPU38qbGse-0OktfU_R33_yDqtgLZrh5lYAsJpQiSk0EV6yEqzhFYH_t25mX4anCcAA3dKgOlaMEM1F__hbWUZZbAJaUdBTZ6Tl7vc5FbyfvRYARZOAN3-QBT1be31AK32-nNfWqvMGngF42QmX0) on improving your web app with the power of machine learning through AWS Sagemaker and PyTorch.

On the [Facebook Open Source blog](https://developers.facebook.com/blog/open_source/), we shared plenty of interesting articles like hands-on lessons on using Rust while building a [Discord bot](https://developers.facebook.com/blog/post/2020/09/30/build-discord-bot-with-rust-and-serenity/) and a [smart bookmarking tool](https://developers.facebook.com/blog/post/2020/06/03/build-smart-bookmarking-tool-rust-rocket/).

**Developer Tools**

Developer productivity was the theme of the year. Our engineers open sourced [Retrie](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2020%2F07%2F06%2Fopen-source%2Fretrie%2F&h=AT0O9gR1xtmjZ6zu8PNlWdJalaHxsA6U25jxWR9b9oIOVrvj_hSx-Kbht9vrv3psyWV3Bt5nVwcIMYNhYMOu4LRqVm9uUpK-CgECH_FPMfOMpqni5ZsDVQ17gDyxmAyqKSNVuLlWuFrYZ6lUxrgeSbRrhDr5y_jfZG6fM2bDgNg) to make refactoring and codemodding Haskell faster, easier and safer. For those who work with the SQLite library, Facebook shared the [CG/SQL project](https://l.facebook.com/l.php?u=https%3A%2F%2Fcgsql.dev%2F&h=AT155I5W0U2JIZSP1ZZDa3sGsUwG_PzEjyvTgZPg3xhVFOy7VoGu2ToBr6X__wqyKhbhfvwisWLkR251gq-HXJhgztq4o9gkU_zJnMzqaqHnfL4VUb3xJt7QpoIaL3VHp45XNPBt2OwbwhO_2VBRVG9h4K4OaussUE36yddLDIc) that allows developers to write complex [stored procedures](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.w3schools.com%2Fsql%2Fsql_stored_procedures.asp&h=AT1xIL3E989d5KiVydDqlCSOo4cx_33HW71o2Zoi2ZyhEufLuOva9wDmUUNOIRfQ0vDf1Ggxr7EoIMchQCa37TdDMZyjT_x-lqATMpLWjLAmGUrHnO2iMZ1QpsfaKZ9yqtCYIXCvbXb7Jx8zgys95Hrx1W3yxoe_GMkcy6JqXMw) with extensive queries without the manual code checking that existing methods require.

Another highlight this year was our engineers' open source work for system-level developer tools. One of the projects, [resctl-demo](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2020%2F10%2F14%2Fdeveloper-tools%2Fintroducing-resctl-demo-better-resource-control-with-simulation%2F&h=AT1LsBBSUPesLd5AS8MjXLGPObQHC54CU_TzQuF9WKrmH0KGMHI581y8_5GABaf8ILnIpWcK3BYTnND4fyb4LVDiAifvpoRWxDP7fpKy0tQg5HhgX4ONu8kN-vGhfvEb7k99aCDf6nY_W55-taAGVM86vLuKDWzQCvnDKoJZGV8), simulates system resource conflicts to provide developers an intuitive understanding of their systems' resource control. Another project called [PCIcrawler](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2020%2F08%2F05%2Fopen-source%2Fpcicrawler%2F&h=AT0NJ8n7euM7ysZMkL04Oz3CvzJoNJeRdklXWjXDGSsF1NNgUr4M6e4tV-QYSJl2OsR02i1LtxZAC8Q8F_kV-XmKIF7CtTzje5BEC7t2qt_ZdYDeBeErr1Jo87YRWCmSfqbKMWJH47jUYNMtycz8Ydmvey4qV87cJ-Lnm4giNpw) displays information about PCI/PCIe buses, devices, and topology to diagnose and debug PCIe issues at scale.

Finally, [Docusaurus](https://l.facebook.com/l.php?u=https%3A%2F%2Fv2.docusaurus.io%2F&h=AT0ji9MLcko9WlbZfWEWpwNizsr4hgVYv0caTTS7T38plqCpgwEovsPfJ-SuuLPgcpGPpc7Qf3o-O-s99YxIvHQB-ouF8A0-HL0tRKtHFoDHON-1oyUf5t7lXu3_V3eljtpFx9HE9eorroVrMPbrVFaqKHShIooJfM7rnK4Enc4), Facebook Open Source's [website infrastructure project](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2FDocusaurus&h=AT3g6ggliAW3op54elGgQmwi3U7eZA75hbjxYFCzgQsikxHgaoQF44Dx3Q5xzFH_qS1ABe2AgQe-MjzX_yB7K01ui3zQQAZ_nfH6UP0s8AhfKL_ynzpnKAHlTMf0xYThaEEnIcqgPDd6eGpI_2dTOVJXqWwEirPIQjXOzOQ0u1Q), had amazing [usage and growth in 2020](https://l.facebook.com/l.php?u=https%3A%2F%2Fv2.docusaurus.io%2Fblog%2F2021%2F01%2F19%2Fdocusaurus-2020-recap%2F&h=AT14kbcBz7REMLzLMvGIfDhJXm8XfkAyT0oAANB_O0FvQ2GpnDrnFCcENGFnVToVCW2_Pq0Nd-Smeb2dTnh-mqEHtLhw34I5FVp8OBfOG3rfBxV2kEbHL83M7T561M_6xcKCIFu06tJ3fLocW2VGxccUyZYEdbSA2jRUFjVW-o4). From feature additions and community contributions to adoption and version 2 migration, Docusaurus had one of its [best years yet](https://l.facebook.com/l.php?u=https%3A%2F%2Fv2.docusaurus.io%2Fblog%2F2021%2F01%2F19%2Fdocusaurus-2020-recap%2F%23github-activity&h=AT0oXbMO1bvi8VRXtfsQ39SxGS_Fk3u-yneHGnR-M25jQj1wV807-EA5PVIPKf3MbSYLPj9S1iYVO8Oj_Wr1C494nJGY4iunsrtPzkw6_Zq0pMtmqZbZ9jieU9yemnAtWpowODzZpoXcL1AqCSS6h9JbuDZg2YQlr7luxnjivEw). And there is more [planned](https://l.facebook.com/l.php?u=https%3A%2F%2Fv2.docusaurus.io%2Fblog%2F2021%2F01%2F19%2Fdocusaurus-2020-recap%2F%23whats-next&h=AT2wn6x_5NjnDsh2WNTNblwdFIlvlecbWOCja9J74euWfHacgY_SvY7KTRQzyQglh3MCcnpLCnszwWAiHuVlp-Vk1Zng_Pi6FRTrJOf9G2DPUCVunmh1yXmDtJ0tIK07BR56E-e9on3nI5_OluFAIgkLOKTh4uk_7j5lIY9HGsQ) for 2021.

**Data**

It's been a big year for [Presto](https://l.facebook.com/l.php?u=https%3A%2F%2Fprestodb.io%2F&h=AT2tanOmQZ6uU5RmeebHOapEwN9Hd80SOCDjS_xBL300n2kAwXrj62pT9bh60uFTSjTp4AdCKW6wP1pUvqRQzzWJqyvznQYjkEIolZ3fIxYOWvWfQeNNhHYIkhatTeU5oil_pLVA3SIUw_V-FDwgXRMJ8_79NNZABYL6YA9kwOE), a distributed SQL query engine for Big Data. The [Presto Foundation](https://l.facebook.com/l.php?u=https%3A%2F%2Fprestodb.io%2Fjoin.html&h=AT3zAp_VvXTRhm0l7cM5-DSVNpIXvUHwcMj8px9y6_df4zrCN8l0MAAKtfFFVMNr8OYpvOlEuyzhaLiEf7AujSdDCvcr0-K-i1THrO_JchAhGN8guZCcF7qkYhcykkt25r6WsEclBD4TCZE6IHTMez-Y6QE-fC8owjdSyBLFpqo) grew to 8 members, with Alluxio, Ahana, UpSolver and Intel joining this year. We also hosted [PrestoCon 2020](https://l.facebook.com/l.php?u=https%3A%2F%2Fprestodb.io%2Fprestocon.html&h=AT3a1kYP6AwzUg_5--k5bFrYXcWaWXqHbF1_NA-oD_zqxB17J2BAbil0WPGLqKGTWCRQP1aF60mlkv2BzW4TYaLprR-hHcWCHIqC7dPdf2XF0fEzyVA_glOkOWConRPOb4YtHAWQcyyRi_jZSx7i8CdUoQNhRTGxuYveSgoDHkc), connecting nearly 600 data engineers and developers around the world. We encourage you to watch the recordings from the event on the [PrestoDB channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCwuYAEybmcgOfbPvG1SKiFg&h=AT1xqdUGw-1s_WhxNf9-Jgl1wi-jyNm44BjDto77GxJHTZw8fFLMdeIIa7LothV1-vw9OOqMOyuQugioZeL8DNNlcCukaJKSj3n1UXdZNB_Oc_zr9JpGdpRTjQOFkiDhgadkgIROZzycstpIJsYDxzrRToHKLer6dkPhf3WvAG0) and sign up for our [virtual meetup group](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.meetup.com%2Fprestodb%2F&h=AT0tBdJGrv2ja0ajm1Ta0DMzNqUYaF_GDQbxIUgVMLFC8Q9EK-F2b_3wZQ9pl7ZrRARp721naonzAC96NqU4FQ0jTvW5nhQD3JF4ba3Pv_4QPmSB8let7FJ_2vmfzmABl1hK99JoU-RDwP3Lnqx_CZGgAOyKJDXIgciJEQJ6RUg) to get the most up-to-date information about upcoming events.

**Mobile and Web**

In early 2020, Facebook open sourced a new React state management library named Recoil. This library emphasizes compatibility, simplicity and provides features like time-travel debugging. Although the project has only been live for less than a year, its community has been rapidly growing, with over 11 thousand followers on its [project page](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebookexperimental%2FRecoil&h=AT1veDuUvjepUU7JwjUESgTDyrEKG8vCAfmai5rov10KaBSNrj2kzLEHnGKp45GNUWiPT62OJMo8HBYPu6Lrge5WivelZfi78w7DN7jbyTDepO9uySH22y_uLpmV0gYWBE6z-T9I_NKTHhB7mwmhUr3FNkUA8BBbTUSVc15Ej0o).

React added support for the new [JSX transform](https://l.facebook.com/l.php?u=https%3A%2F%2Freactjs.org%2Fblog%2F2020%2F09%2F22%2Fintroducing-the-new-jsx-transform.html&h=AT3YRy16Am6x32SyNOoycTdSSBVgxIg0aOZr3Js-pg7mWb9vyaNQw7-m0eLEr8KxpM1DuaUKoGW5Gu3niW3OMrbvh6gilHDsgsoIX0ia8p4xg_SZD4JA5Rp8KgVFkrK7ACL5heCvvWSkTUEn4Qo2fEBvdTqiJw8wpbsWgjS7Nts). The latest React release sets up the ability to perform [gradual React upgrades](https://l.facebook.com/l.php?u=https%3A%2F%2Freactjs.org%2Fblog%2F2020%2F10%2F20%2Freact-v17.html&h=AT3cK1VzrZWNY40qTASJOaJLTY2eJXUIbmq5soEwVnvkF2bywD15KI8SgyeA7oRfVxXaN6ERn7xfH5--Sm3vaj49Ww_NBaF3nRaBYDUcZNQGok5WwchV3Ph4VEFLZ2nn-iexcVYR2mG0g9L9eejMNFV8-qq4ecuojgJbN4UCS2w), allowing you to use more than one version of React in your app.

With React Native last year, we had significant updates to improve the developer experience and flatten the learning curve. After extensive community feedback, [the website](https://l.facebook.com/l.php?u=https%3A%2F%2Freactnative.dev%2F&h=AT1UC5U3JxEi-JoMcG9_NveOy6ZrxRb0ckF-Q3QFY5TJ5cQDhge4am2isKARHxoxY_3CkVEbMJhmLJ-EYsa1B-RTw5gvDxp1iMUnb0BFn6GPFn_qgK0K2ok8WtJt4qkReYE4_n96ufFfcDW2YHojBBdINqjiECkNxkJ2eWSPRUY) went through a [refresh](https://l.facebook.com/l.php?u=https%3A%2F%2Freactnative.dev%2Fblog%2F2020%2F07%2F23%2Fdocs-update&h=AT02BUL-yRD6a4Dh-gTc6u-Zu0ZNFP0cTK4Qk0_nmbjTl_dd1u0aibtMulzjgGYzMNTbY1IQg5ziZVSvCKxqZy14PWNmU_bDDyeFlhYFCvhd-f5JJnOV32jflpH0MmttYYDX355Tm4NR_vYRLVTQ4Ghyr0MMQEwos3b6qbB23VY) with brand new getting started, testing, security, and reference guides. Developers who work with React Native now can use debugging functionalities like [LogBox](https://l.facebook.com/l.php?u=https%3A%2F%2Freactnative.dev%2Fblog%2F2020%2F07%2F06%2Fversion-0.63%23logbox&h=AT0j76whqRmuSuCfuoVGeIlADZvlttoHxAUbyiPvseRF30N3g_wSjrpjKTU1ijeFgVjxs3lz1kZEh9NTzEKNfIZEN-Jyx-VY71men-KcsWXuGnfLioEzvHApjNjvasMli8NOF9sciHA3eHG9nV1H91hVTto3G9vazKNPT0VCHOs) and [Flipper](https://l.facebook.com/l.php?u=https%3A%2F%2Freactnative.dev%2Fblog%2F2020%2F03%2F26%2Fversion-0.62&h=AT3DFjJQpSvhEZTCqgv8wJh7MzLquIwGF3OZkvi3WORnAI2CDQDFN5_F5Z_kLQ6yiaX7s_dkkPDO0nu7WF2YC8e0-mwk63MzC9kyxyZlQgXA0I9Tn5wm4Ya-77COrSJPurDxSse5yymREjWwV75hDTPZtSI3iwkoHOFLmTOVM5s) out-of-the-box as they are shipped with the project by default.

For native mobile developers, Litho, a declarative framework for building efficient UIs on Android, has released an [Android Studio plugin](https://l.facebook.com/l.php?u=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F14468-litho&h=AT3lpLuXwoCU-3ValdM914Q4_OEVW0L77j5LObZ2jfscUQaLAFH7ff5nlAEkPIxpc-EMn7YBA1Iw8aO8YIpf97a9T0De_CUibfm7CV-kHOv6-BdzcNJrhbJuH-4-aUU6aMALaqUXv6ZkP07CJ22dZufp1sZY1mJO1o3VRK4hDqI). This plugin significantly speeds up the development of Components and Specs with smart navigation, autocompletion and templates.

**AI/ML**

**Facebook Research**

Researchers open sourced their implementation of a [multilingual translation model](https://ai.facebook.com/blog/introducing-many-to-many-multilingual-machine-translation/) that works for any pair of 100 languages without an English intermediary. With projects like [ReBeL](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebookresearch%2Frebel%3Ffbclid%3DIwAR2Rpx9x3OC-f_t0CFmq1u7_xRteDqMDpxTwKAvPgFjML6iaAPTD3nqcCYw&h=AT0YT8b_c6DzqNaQJf1BW6NdO5079F7EGKZqEqfjpV4fdhnyNmz5lmgGfmmep2W_VK7byRvQWe42lvI1cFkUtCjNu9q5Tk6n-R4NDr-yVlcymNVbhJKNQCZ0gSvzp6u8jVAaIF00oH10YfgNGyv9ir0b_X8rDDwqNob8EQj3qDfFxbsHaUZM363U), an implementation of a [deception-games playing algorithm](https://ai.facebook.com/blog/rebel-a-general-game-playing-ai-bot-that-excels-at-poker-and-more/), our researchers are making a big step towards general AI.

To continue moving AI forward, Facebook AI and NYU Langone Health continue collaborating on a project called [FastMRI](https://l.facebook.com/l.php?u=https%3A%2F%2Ffastmri.org%2F&h=AT1kjicb5vbkzfzc8faQL9P79AuYJjyF64lfQYdhO4_HHoyZ2yLE3EQFUVWDQbqucMKvTuYjIlFxM578Yh7lAXnNycpnLfPzJ6EcjBxEgt_oSAHiKi_ajZ12pYMNvdprr2eVUK9lzwD0ClV10XUWHFbF7PTZV_gBwvUP_02EBBM). In September 2020, the team [launched its second community challenge](https://l.facebook.com/l.php?u=https%3A%2F%2Ffastmri.org%2Fleaderboards%2F&h=AT2kRYsn2Izpp-GZHi4sbunvH2HHbuDKg7So3ZATTQlqcMTZdsmEJdd0tXckoFwDBeu_VSuA5sbZDVkdYsGydIQuxBWp6UNfYE6Lt15G9Hw049TVVw4ULK7cKFWs6EA3mZ9tKzErOJzvWuu491Z6XkSysBAq7KnTMLC0P5gTWOM) to reconstruct neuroimaging data. We also open source the [data and models](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebookresearch%2FfastMRI%2F&h=AT1gP8Aj_wdzCK7tDhogDT1XXgSzLPfmgytdWZ0thF3YEYqZrKp02r-W1Fypzw2B58hiFTzqLy8p2jkNDW_vSkXgWcZZ3V_Jl0SwbRGjQNYdLo9Loif_H9Uj0JCYHi4QDbxNBkK2NOVZEmoVwO9rdtx8Wq4rcM4nfP6B07jaKOk) to further engage in medical research and AI communities.

To accelerate the development of better and faster probabilistic programming languages (PPL), engineers at [Facebook AI open sourced PPL Bench](https://ai.facebook.com/blog/ppl-bench-creating-a-standard-for-benchmarking-probabilistic-programming-languages/), an evaluation framework that standardizes PPL benchmarking, and made [differentiable programming a first-class feature of Kotlin](https://ai.facebook.com/blog/paving-the-way-for-software-20-with-kotlin/). If you are interested to learn more about Facebook AI's research, we invite you to visit these curated posts: [NeurIPS 2020](https://ai.facebook.com/blog/facebook-research-at-neurips-2020/), [ECCV 2020](https://ai.facebook.com/blog/facebook-research-at-eccv-2020/), [ICML 2020](https://ai.facebook.com/blog/facebook-research-at-icml-2020/), [ACL 2020](https://ai.facebook.com/blog/facebook-research-at-acl-2020/), [ICASSP 2020](https://ai.facebook.com/blog/facebook-research-at-icassp-2020/).

**PyTorch**

Year after year, PyTorch continues its growth all thanks to its strong community, and 2020 was no exception. The community developed open source projects on top of PyTorch across computer vision, distributed training, reinforcement learning, and many more. The curated list of tools and libraries can be found on this [PyTorch Ecosystem](https://l.facebook.com/l.php?u=https%3A%2F%2Fpytorch.org%2Fecosystem%2F&h=AT2aAGjk1tNE4yqFyPwn2K5YhjzC6v7AHnbqwhNh_ELI8z2qJVRICtPS0UVk0Rw06S-KHe-W1mt50CAyvpyzswMba8d_4eToSX2lNAZ-uZv9S2xYwVVwtpWupr4yCcmNYlfadEyxenaTuyHIu4VLu3W8uMRwhGNFo0fJBcpcaNIkWgnD34guV8AR) page. In November 2020, the PyTorch team hosted [PyTorch Developer Day](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DjaPVoObpdO0&h=AT2n-TtmNFjjV2Z38WrZTr1qxKRtZ_XrNAI-BAvf5NZsN5tGPeYA-DreOquP1xTsCBABHa7JFxt4859xXxwMSryMXVNMDu-yqXpubyDdVDyVfEjvF-sa9xTg32WH4BWRGpg7hbB2RYiSJdhNUk9XrumPTWl-vDqM-PLJJ8D9xUM), with keynotes from the core developer team, researchers and ML engineers working in AI.

Over 2,500 people across 114 countries participated in the [PyTorch Summer Hackathon 2020](https://l.facebook.com/l.php?u=https%3A%2F%2Fpytorch.org%2Fblog%2Fannouncing-the-winners-of-the-2020-global-pytorch-summer-hackathon%2F&h=AT133F83sO0zbGuIokNukofrtsnO1Plb3BtlEqf5FPexQb_bbZLF3jdvCw2WhtzI_k9SPjiBJgYq5_unyALxoDt5ing8eSHcY84bfa5ArbolkZbmVHBXWJEQ1FaWL4Y929BDsUWhDTQ6vvAXUqCJTe4F8w4FeFmCg7UZzYNP_BE). This hackathon had many categories where developers could apply themselves like PyTorch Developer Tools, Web/Mobile Applications, and Responsible AI Developer Tools.

The PyTorch team also launched a project called [Opacus](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Fpytorch%2Fopacus&h=AT0ReZCgr77Q2SsNct9AuSI7pzVLHzb8Q19OOeWewbGsYoSXJcfwuIG1qoGmeKKQZjPrlH4bV8CohtSGSE5Ykwure5ztcatyP7mPtL5ZNw5Csl7eC5UjGe5ZHOfiWyMSYWe0Vo8d_YndmYm9gGnMZk4CGMIIaa-_-3z5f8c0FP8), a high-speed, scalable library for training PyTorch models with [differential privacy](https://l.facebook.com/l.php?u=https%3A%2F%2Fmedium.com%2Fpytorch%2Fdifferential-privacy-series-part-1-dp-sgd-algorithm-explained-12512c3959a3&h=AT12Q4C_A45-2Zvl2ulqnkHT8WtJHKpgebr7l_9N59mhegpASFbFz1lwWRyOpYN46TiRP71NF5ripkvIjhJdhrDdsggUb3OnKefaw0wdFGb3GYTzwvqP2O4EBOG3EYA0qC9ACmtu7s8Un5wM0vd7fvOjCMNy-X6UqCNAZQuWAfU), and partnered with OpenMined to develop free [courses in privacy-preserving AI](https://l.facebook.com/l.php?u=https%3A%2F%2Fcourses.openmined.org%2F&h=AT1BNVffMWPVMjB8uCofye2qYO8N5bgTcfk45M2hV2AdSGqgkIhaFF_MljGOShRG7B_iMuYjSeGLZ4IY46rTn-y05YfitAL-TtwfDLnKR5TvR561M8rDZTI7CwXM1nQ88g0FDzmSay5_ATLw9WpMoph1DkJ0Ihe8PIg2MjGv7Pk). Along with Google, the team announced general availability of the PyTorch / XLA package that lets PyTorch run on Google Cloud TPU accelerators.

**Blockchain**

We remain committed to an inclusive payment technology that is also open source. We refreshed the developer experience for the [Diem blockchain](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.diem.com%2Fen-us%2F&h=AT3oQCPrDeafjAJMeovYo8Rw_Q3dLdx6dZVeE4apH35WT6s_gp8m6EP5wGRIx6Q2JnclQDH22vmnT2k_3peS_EjNKyEZ6VH1tyxRwfEP1Lfk5dQnS-UxoL28C3VobmYVKoX1Bpbhkbnn844Nc393L0ivB5d2Kiy6xwA5AUXRcbo) (formerly Libra) with new [documentation](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.diem.com%2Fdocs%2Fcore%2Foverview%2F&h=AT1gbeNOXbsLHtrN4n-kYTmFtilj9xI9mn552Y6h7Ex6ucDMwu-25NIhFH0O6w0OoeJtBJ1iHtz6i2v-YEazQy3Apitt7AC7NCoEMjNZMBhxpMLNnV9QezC_h-5gMKSFNBLTgtFQnSzsiZ2im7ZGcYk2qkLNfqDVW_lp3ny-YYE) and follow-along [tutorials](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.diem.com%2Fdocs%2Ftutorials%2Foverview%2F&h=AT0NShQ9gZ4kTchkDqj44-OGp1XwLVZi7TR3WaqdYUSBTcZnWjFgPkd6jWjFBHdRHnikJcc4i578KMtWgmCK-6vw6m8CMf58dmWTjELodySzdXXq5cTLgYd1pIGjYR_9RLjtK14lzS6DBFv08BHqPTnRnGddrAEoqfa6ODGeRI0). The docs start from ground-zero, walking you through fundamental concepts powering the Diem blockchain, all the way to building your clients in Python, Java, or Go with our [official SDKs](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.diem.com%2Fdocs%2Fsdks%2Foverview%2F&h=AT0MM7sfnKrLood39BMPcEWn1tfA641Yy5Epst20nWl0b9hHVPlDaj8lZfF2uzmXtUeF5gKu0KdFRBG8G0rF-V6QeXVioWXrP3VcTGOxbCmcuuTB96zsIuDT9io65fZTslJaEy7TU7txgCGGooxPULj8qwEw0sKM4gygSGKo7kw). We encourage you to build a [demo wallet](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.diem.com%2Fdocs%2Fwallet-app%2Fpublic-demo-wallet%2F&h=AT2tkRuSaToE0LI33KdmKew8MiN6xIGdDvYzJOlCSOoejLYtW1Gq7MrbT28POu4MYaT95lcVH296_vw3N_x0gOTgUXG-YIVXKxkldqikNncTJXHZ25gT-CnIS41GqENeU6MQRXq-PrUmMCCLIjGy5Kr7qpnpTxmiHDfEkeDRrR8) to understand everyday use cases for custodial wallets, and simulate the experience of running a store on Diem using the [public demo merchant service](https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopers.diem.com%2Fdocs%2Fmerchant%2Ftry-demo-merchant%2F&h=AT1KO8dPfBE8cGPKzFTAx2nAAfFm3spC4LvIr26HVocNhkMD0sp6AC-r4t-XGrs8M5c1mbiTKL62bU4xL4VRS5aIUbvugLIyp34LZl9VJrO4-ElkO2YeQmgG_JaPCv6Blwt3G8SFYady2gJOSNtyudQwcNOj1rKKPrBOI1yrA2Y).

Our communities across the world faced challenges and hurdles through every month of this year. And yet, they banded together to contribute their effort and time in building and growing codebases that anyone can freely use. We are deeply grateful to all our contributors, and we look forward to continuing this collaboration through 2021.

To learn more about Facebook Open Source, visit [our open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT365Uwf4pJ8j3zpQXaAyGdrJGhUQxPEbIchlF-tlKQ15Kg5SFiDGiJds4XNAV_E2gTUXmEDtLp_T88tCJ-ywAhgwrPM6afdR7Gst0OtEZsiFX2RizA2TYqO4v6v1T16AbS9T88O2w1FB8dL-aqe_aZlt34KT5EmXBNQH4Gm1GA), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT04_BNQ9QdS3k-6OduZci64pKVvbu6o9zDpBFcs6PkdgHKT9dtGyqiKygg-Reelx7caxBnfXGfacFECugq09sujgoO61jhKEum6o3CjSkyasZ0D_B4UbrMp0PKFYLe44cegNUDg9WC_Yx2g9tQF3n8GKDk8NJNoxKx3u6YaHUQ).

**Press Mentions**

- [ZDNet](https://www.zdnet.com/article/open-source-at-facebook-700-repositories-and-1-3-million-followers/)`},{title:"ELI5: Flow - Static Type Checker for JavaScript",description:"In this post, we explain Flow, a static type checker for JavaScript. Flow provides real-time feedback right in your editor and lets you write JavaScript your way.",date:"2020-12-14",tags:["open source","eli5"],slug:"/articles/2020/eli5-flow/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2020_eli5-flow_e52a7186.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2020/12/14/eli5-flow-static-type-checker-javascript",body:`*By Dmitry Vinnik and Joe Previte*

*Originally posted [here](https://developers.facebook.com/blog/post/2020/12/14/eli5-flow-static-type-checker-javascript).*

In this post, we explain [Flow](https://flow.org/), a static type checker for JavaScript, in a way that is super simple to understand (or as it's commonly known online, [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT2cdG_waA0U-CcPWcIN3w1uU-VUfAUv2e6ZBjgYuG-8JTgNqs09NzI5OZDs4eLjZ3YThKhp0Q_pUz04ZCokGqslErQbwmCwRJZDa8mJPPRjxvAmBuACboiQgHlYanI9Jj2Yu9ef8DTCEnq2oAFETqQItGHwx-dUiGhJ34ScWxU)). If you're interested in learning by watching or listening, check out a [video](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dr_6cW_Mxy5U&h=AT0pgQBc-kBIgjDwStFaVMHH0Z3TRD8kYwxf7iwGYd_6T__SgjtXPEly1eVHs7lipaOJYHfQfwjTmrf9D28Mjd95wqG9G04VDGWk3-TALEkKUy6CpcWRqvJFdzSvVY0eD5Jr7lkIkauhNy-HrinQWFbnreFvaAxDiKiHqK8sIhc) about this open source project on our [Facebook Open Source YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT360NMza3KaY7X9l4RkRlNW2l55zFlvwIa9n0RuMwn4YiNTZ6SYXo3KoRgIjcTtJiJFiUm-WFc6RJhGGqNFfoI2vsi3gQRt3JImCAuOrLQwyh1vzM86Yz6YEqmiBycNou14AJqZiL2qY3jyQRf48oHqYfFnJ7VXoDCb3JbrR3c).

**Why Flow?**

When writing code for a program, you want to ensure that you catch errors before your users do. Unfortunately, JavaScript by itself won't protect you from making and releasing those errors. JavaScript was built to help developers write code quickly, with type safety left to be managed manually.

At Facebook, we wanted to help our developers stay productive and enable them to ship high-quality code quickly. So we built Flow, a static type checker for JavaScript. Through intelligent program analysis, Flow checks your program in the background while you concentrate on writing quality code and reports errors back to you. It extracts information from your program to figure out precisely what you're doing. If it doesn't understand, it tells you. You then annotate your code to clarify to both other developers and Flow what your intentions are.

</br>

</br>

Flow provides real-time feedback right in your editor and lets you write JavaScript your way. It seamlessly integrates with many tools, which makes it easy to add to your existing workflow. As a result, you ship fewer bugs to production and work more productively and efficiently as a developer.

**Where is it used?**

Flow was open sourced in [November 2014](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2014%2F11%2F18%2Fweb%2Fflow-a-new-static-type-checker-for-javascript%2F&h=AT2UdCsgyHMN9sKzrFa_LyWANAll-z-ZPjG3s3oLmP6XI4cCGeuxJTEKwYXxaKVk-Pqa20vVRKhNTOTdnzSalMmLoi6z3-xaesS2X-XV-Yo57h4uam-gUrl06scQJQ5B9Sha9XDGVAh236af_r-RcP0Etaytt6SR88w_rjHIGls). Currently, it is used at Facebook throughout our codebase wherever we write JavaScript.

**Where can I learn more?**

To learn more about Flow, visit [the website](https://l.facebook.com/l.php?u=https%3A%2F%2Fflow.org%2F&h=AT1f3B-zOyULkjEfWMugqUH1TBiF1Qo-_5eIMFzrXkH77vPtVTTui9ReCg4vEM_i2YRdDSAG6O1xZ9BNjECMEDOZTaF9tMbOykrXifblKVyo5I5k5z8pGbUd0o3jyyv1ihH6wLyqAiL3RKeE5hJVM9eB2cDKZri5gpHajJJEpTg). It has excellent documentation for developers who are just starting, and developers want to use more advanced features. If you would like to see Flow in action, you can try it online using the [Flow playground](https://l.facebook.com/l.php?u=https%3A%2F%2Fflow.org%2Ftry%2F&h=AT0_cTYuU6wjYp0bfcqcP1BOqCAFtAwSi3ovc_bl3vRzzSHFn3IwQHvWZO2ZHa1zqnAoJ3koFgm4mojmghYalrbLucBTS2pAwRCR8SIuOGX6J_nM7O-e-MbeeSmHq8SLxB17B8SRuq8lAhFLVN2Xacy08VRzlqqR6Twh5K77tDc). If you have any questions, you can go to the [Flow's Discord](https://l.facebook.com/l.php?u=https%3A%2F%2Fdiscord.com%2Finvite%2F8ezwRUK&h=AT0FtKXCeiTf4yMzJqls5p8Kc_wvU3lVYut3B_6xweiCGm24ATstLA7ATzvisi1bFbLjK56aX3wPi1O-QkSUJBz-RfQNb3DTy1nEo-f8O-provV4veNWPfU5hUCl61jslnNtvogQLEaEC2RZ_4957qJfDLDBA_45PFk13i0GZwg), [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2Fflowtype&h=AT0_QPwS_uSwVpQ6A9cK-tbsSG_qP1GAmL0TMnNdbGTkToAXeJwzQaixsPfQoETMRtL_2txsiux3oVHdQESLzy9ezmX5phKzJLGeRSwqs7BxtENH5AQNB29MCPWPPxp8_ESTsdCFwuV4-n3EUAkD2C2xgUZDGp9nU4Q-VUreixA) or [StackOverflow](https://l.facebook.com/l.php?u=https%3A%2F%2Fstackoverflow.com%2Fquestions%2Ftagged%2Fflowtype&h=AT3QdnD8Q70znFaXBe5XtByKYvrlso-f8ZDzJ7HqMMh4zvn7vWbAR2Nf4jgZPXzHLSq0Qp_iG0p5UCUxvOmh5nqlvjWIRAdjBDJVtFu3X3AkSSmV99xSX_aoBSlu2s4vLa2aXYAdh1g6OWaH4FhevgTepRHAIdnh1N3aSNNfBZk).

If you want to see more content about [Flow](https://l.facebook.com/l.php?u=https%3A%2F%2Fflow.org%2F&h=AT0-9Jp8-Kl38SZrw2VtbDNZg6jinLuq_j80rqMY-wIvbiBjChrJ8LHCgaroWOxC78bR6hp8Epbs3EXmd0Wc8TW_xBJf0MtD2rfL31lCdUpslEuW1yazvT02tcSwPfea0xn5Bb_3wd30y148ePo08hvM3aCOicFWTcsG1N2GI0o), let us know on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT2RWMiyAEkVoybXOQjn3Htz0Jo3dxh_7sG5S04v1YXvN5IZhGH-qt1CnPrbpcGUfZw0WKMDoBq5DxOeFPjRJJgiuI-1SoR1eaVbhjBx_dol1g3w-66YTQDQn01IjrwGbXvNOwozcSkQZn4M4u7WhbF-GOdTbmCg_z6C6KfdHds), or by [tweeting at us](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT18_pdYMDEjOH3nbjkI0tMkmeCZtTviPwC5jjHExu7LkzZJyKTu1SQPwATEpkrkCf525yiBjjzMqRQgshQhahaR-LSPX3L_U_hGIJdy2uCwJ1dZc3ZN7PybYmmmOYTrVNl8ul0kP1dnVcgcpuEzIJmc8ffv6V_PeQnLkNXg_tY).

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Facebook Open Source team explains a Facebook open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT1dpuQZw22abFzViSDQNdxOCtBDsuxX0z4LnDFg1oVlP1iPgYSZoy-CPGnlbV0nolkD-AAIq-eAfKLjkkU4yLwQP6LElKJJhgBh2MbIIE9w1ju-WGecIUozICmV5CSlXsqKYwykCzXqmZEMn3v-UFAMPmu25FiT4hflLNLbiWo).

To learn more about Facebook Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT2xCo2WtZudJ6xboqQpOUu5Rt8ybgjQT2KF4ayI-Pj5s6lXNN7iYCXvp3dLVj7TWXBkykGOWILyjsklpLCmeCQRMYQhcdgLo556VG0Nfz6YtQe1N7QzYwrhnKNaMs9oQeHUg6tqRspdgpymxW2TsVgl_swb5OAEdKzrPxrttu4) channel, or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT2cJzZGPwQ2vZZmxsHx-pGS72ZFGroGB0FlG6Y9-xG95x9PjKQoM-oQo6qctGIOuyj5hc_kQ_NGu_P-E14qG7mL_U5OHo3RB-YsBob1fMCi-blDuA13Jy4v7wSCoH-oZa1QwloFkj4o98W5PmD-vcbQDT6AhT_2NwNI-licQPY) and [Facebook](https://www.facebook.com/fbOpenSource/).

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT0eKrsofClWOUVoKjSiebY-Jr7sXvr8l-_c3GtNl5bZ3ctjgNnsgOByx5i1o3mi9BoAKCbNtRxch5sASzJmOfl9wtLegsfZklL2SyJgRPu8TVDkJp6E04Ysyj9oBoJJ47n3uKqc4A6K9jgNDbxrKyRhuhY8OcRA3VipCBrh4ss).`},{title:"ELI5: Docusaurus - Making Documentation Easy",description:"In this post, we will briefly talk about Docusaurus, a website building tool that makes it easy to develop, maintain and deploy a documentation site.",date:"2020-11-30",tags:["open source","eli5"],slug:"/articles/2020/eli5-docusaurus/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2020_eli5-docusaurus_b10b54ad.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2020/11/30/eli5-docusaurus-making-documentation-easy",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2020/11/30/eli5-docusaurus-making-documentation-easy).*

In this post, we will briefly talk about [Docusaurus](https://l.facebook.com/l.php?u=https%3A%2F%2Fv2.docusaurus.io%2F&h=AT3X6nzDri3X9nvwmLEmCj1SfaNY9QXh-r6s_n04V3g-WTX8uSXR0gJiEfz33gWxnptSPR07rnVr7m5Fh_xprosZBEzYUdXVOfnEQ3Z4pLKbSCxnLrRPA7o_BWGYQP05MVyTKWIHtCJs3BOgypFKaAc2t7okEz_UUasYHawwD_w), a website building tool that makes it easy to develop, maintain and deploy a documentation site. If you prefer to learn about Docusaurus in a [short video](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D_An9EsKPhp0%26feature%3Dyoutu.be&h=AT3T6b0RAVu5PDaRxarX2ZRPoK9KveKX6VfjsR9y71ZPS5Yzq55fMk21Gb3C5nLTKoswhrKqGXzuKaJ43hVwgWUM3_jztATdRm2BonWOOGGyZluzWmQ1H0MNrXcA7fO5DSQtWwtFMNU0Z1JllLUs-MuO1whfXrh38FYS9RywSTM) rather than a blog post, go to the [Facebook Open Source YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT2tSr1EGZjNft_DI0F3Z03GFhfeOjzuB9Smg3TOY2B_75YbJCEY9-kJwsLpZx8NmPC8BhtmH7GONikNYGPvcRWFNiWyct-W_dDOqPx_9Z6DWKBT_PbeQf_C1_IGfiXJi1AhAWdOLo8h8HfB7J20vc_7NyjTJGWkfU2BMlzdw6M) to watch another episode of [ELI5](https://www.dictionary.com/e/slang/eli5/).

**Why Docusaurus?**

The top open source projects on GitHub have their own documentation sites that contain an overview of the project, short getting started guides, in-depth tutorials and project blogs. These resources are key to the success of any open source project, but building, managing and deploying them can be a lot of work. Unless you're using Docusaurus.

</br>

</br>

[Docusaurus](https://l.facebook.com/l.php?u=https%3A%2F%2Fv2.docusaurus.io%2F&h=AT2fRKmxk9zHJLTZXD4RtLM2p2-KJX9xi1wbJd86UylUCan8WcGajU5JTLY1OaA5iGnnmq4aO_QCL9MDCrtQM1wdi-6BDR4oGf4MfN_v06kgp0fwbgHQ0ACWnEEkDAdWD3tLpQZ-t1WyfK-81RErceSmoKT-xtPyhPb8z7q1YnM) is an open source project for building, deploying and maintaining websites. This project's main goal is to get you started with your website in a matter of seconds. Beyond creating the site, Docusaurus emphasizes speed of both developer and end users by following the [PRPL pattern](https://l.facebook.com/l.php?u=https%3A%2F%2Fweb.dev%2Fapply-instant-loading-with-prpl%2F&h=AT0qNhSIgZrOvnvMZ4FiDAYXXXxQVuO9C8iIWuNWMH6axubCQZQOHnj2KBszZ0gDQY1UDOTx0xHtH0qv_vQlLivu5lTV9Cyt2_bDXb5Kpn51s1F46ri1yWK9vDqyPtu33w2WEuTd61oZH8LoUi5C6t8lchZ1vRYJ0j2k7EDi3Og) and by relying on an incremental build for content changes.

Docusaurus allows developers to use tools they already know like [Markdown](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMarkdown&h=AT1ZdiEQ_2XHzvxVpqKNJJFrIau1ZjaxTiZY7AHsqerYUY6-bwm9v9WvDK4wSt0IEiOTdKa2a9Wo8aWbX1Xw_jI2__9T-QO07FpBGKEDZum2pILOgnyNRlnFvo6g10wyI-J-8RCvlWoIBE00K7qlYwn3GNsTlgD7f0SO4rzty10) or [MDX](https://l.facebook.com/l.php?u=https%3A%2F%2Fmdxjs.com%2F&h=AT1P9ZTLvq3N01sH_g1_ovohlsBP4kCyR9R7aiDWAY_WCO7o2irYjceLeGshE1enT8Lp8lNxHwScGNvmgggTDDg460tG5tf4EykO2rENnOfWWk5t3w1lbHC8RzZUsV442jVdHmfRwaiDYLfvwGFW64cioEEGgD80pwcCLlLQeEk) to write documentation or blogs. With [React](https://l.facebook.com/l.php?u=https%3A%2F%2Freactjs.org%2F&h=AT2fPLScvTnqfSKGZpwpapzWyz-D-A7vgu0dxjsIdrLS1vru4sAXTrOgY8EWlA_cOEtSNqJE18RXgCOEx6CjTGrKfxk7Sgqarn51_jHjp035HgNqU66q-5ZYMH269WvpvmvSdnJLLWyFLhDb4-YMl2v3eQqQPN0OEgUy1-wD0vU) as the backbone of Docusaurus, developers can customize their website to fit their use case.

This website building tool also comes with search and localization features. Projects built with Docusaurus leverage [Algolia](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.algolia.com%2F&h=AT2DNt9sZl-WEWArpwuh2CmBBAI08ABIFqn4lB9FzODo76YuTrnWeoMfCIjfK_yHZ8qEDYPfFEZtz1btwrSH7H1wn0YxSueq1e0WJF0giCu0bY3y1n-JAehdVRlmZsXVznzrNob724BjLZB7DLywFCM6bnDNLa1k2-5-PT5WTKg) for a built in search engine and [Crowdin](https://l.facebook.com/l.php?u=https%3A%2F%2Fcrowdin.com%2F&h=AT1nScY6Eq-wTfsjFI_U0Dg3N2TKFTIWYEDjnryQxLS6oHCOm9qGP037oA-tGrIHKsd78yD8-FUKOwWnrYSo2o2v5BkjZc3fg3cGnz_PA34tBjPMdMzrSHmdLN9JIHafmK_TsaLanlk-nkAFEBqUaBfjqX-HI541y-NxSqY00xI) for language support.

The cherry on top is that you don't have to manually update your documentation every time you update your code. Docusaurus automatically syncs docs to project releases so that you can spend more of your time working on the things you care about.

**Where is it used?**

Docusaurus was first released to the public by the Facebook Open Source team in [2017](https://docusaurus.io/blog/2017/12/14/introducing-docusaurus). Since then, this project has been used by a large number of the [Facebook open source projects](https://l.facebook.com/l.php?u=https%3A%2F%2Fdocusaurus.io%2Fen%2Fusers&h=AT1QbJFVna9KdhA8U2maFRBaBIOhcpHg4D2PNq_nfArXSoTP1U23nYaoEEJ-B3YwPiT70Ph25o_nsOe0kxHlwlnz9OgtNdPwNV6ZGfrNT3EOEEpyeh7b7rlo7IvQoW0Q91ScMAvNXOhxtjpeDMknA6iec2m-33752Q6dc6bOPWQ) and by over 100 external projects.

**Where can I learn more?**

Want to learn more about Docusaurus? You can find [extensive documentation](https://l.facebook.com/l.php?u=https%3A%2F%2Fv2.docusaurus.io%2Fdocs%2F&h=AT1nb0ifeUyxcDuUcB26XvJAo7s0--rbcZJQzdRDURj-kItOjL7-5GTlZA3X4corqOoRGb_meMxf1-yaNz-SjoSaXdCFnDgzR8lfyq1ohaVfczXd4ZySlEYCU-VGg280cCIL-GT7WVFPJYZgS4OvvoZEcv9kS7Tnp3ZO6X60rg4) and [tutorials](https://l.facebook.com/l.php?u=https%3A%2F%2Fv2.docusaurus.io%2Fdocs%2Fcreating-pages%2F&h=AT2ssB55wVwaDX0ckCvjr5jiCemoN-nAeNwyAPeop2rkK5VT_SLqCcviHpEdCtaNmqfVHtr9t-7D_XhvR5esTXCvKmtg7XUcBWfy7tVAAHEDKMzALc_khRO4gMuFxEaRUMCGufn95zzhmSNen7qohT9UT8EBvpwD0GZ5mflaAmk) covering a wide range of topics on building and customizing your site. If you want to engage with the community, feel free to join the [Discord channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fdiscord.com%2Finvite%2Fdocusaurus&h=AT1OZtWs2K7im24VWIpu8twcJl6BmdTJnUbjvUMhWuERJ3lUBG5fJfJuddJHqdcf4jOIIkVYMyEnGY548gbG2oYSad8U-W_AN5fwNrKdhn1CXSqC737i5ipuInr_L7eWDC1EzWZ5iqhYn6jLeR-va6b7TIpyXcDu7aDO6LuEss8) or talk to the team on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2Fdocusaurus&h=AT0tW3S6B4-dh6oip2h-EWun9jkFUOuA5jZskZzftyFhytF3u3hT1IGJbfq8EYPdTcVHa2c5MyYMF4I2OhRDN9WxgV3WjHCM0L-QA7BFro49PWfeb3Is7iHn68fNNe4qMXWsKhnqvpln5QTIBFro5mcEy1AT33R8Iz3jzyAyBZM).

If you want to see more content about [Docusaurus](https://l.facebook.com/l.php?u=https%3A%2F%2Fv2.docusaurus.io%2F&h=AT26Z3NuJuF3pop8AdChaxNxOKK1TJoVumahV0gnAQYSgG5Gjg_enWvLyq4h6gcuK256Q_OdFpDN-tL53AEK4dtTUXHESI43IH2ztmLrfu3h7ysBBfQgjYfhBOodyempvK_FKd7UlRvaZraZGYI4vDiMK8LoqpXN2zUvmnZ7hbU), let us know on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT2s-I0b9k1EjzFCoXAtKZUTQs45LhZZVBQL5UXR-PCM4aL0LUsDoxO63mH9iABUA45tX1X1zujfElSv3a3aWDrIscj1WKVYlzXk3uLLsWB7Trikwr1OPNgVMMmLQNXGr6H7rWUM5psVVJP8yO14ViMkdsFhgdP41L12l8yWcYY), or by [tweeting at us](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT0ByDHnDtiB713Um6ikFrJ2oBhL2W-R1lLV1q1afNqoFsa87RKT2Rkk8lBd5vVbl3Maiqi-26UZlARmdVTDXViOi32sdsBVL0GvEiaCOw_1aAJP2tKO7KLwYv22-MMAw7K69gqQSxmSDSsoVZ72j05vQtooDcLCdvJJP4eWz68).

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Facebook Open Source team explains a Facebook open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT02V3b7CMOiX7GnRnKTEKW6WIAspuTqHa1wccMq7xwkmIOplQGRiYYYH7mDrrZiNWgPBk-jd7nhkpAGmfe23NlDJLpxVe_AFxiSWpBTryJlDebk5LRRPTCBP85Rj3e7r3Upq5Yu6GOR3UtigVXHzz0YxLI6LbkTRo5F-wmD-iE).

To learn more about Facebook Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT1BHdWkyX8mjeI1nqij72ihhusD7dHIxw7EARSgdhI7hLb_gRtByaxFHE8crVUnqwOutGAhozTX3xNQ1MH9A9EdmsIeZCAAu4X3twsH9BKa-9ExDu40RCIeNABZcxP6JfNQ0dYbor_GPV14KhJRRuURh8hIwYNg0tcxika3rG0), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT3DoypdZye7DI3ZBfRlvAHjRxchVDIK9Y4we2URlbKaOC61NEgphitqqjI2l5BC2Slc5h1TlNvNoWQ9ufBLkUQRPf8y_sS6Kxw2PGZ761HFC86cCXRJvGZrbPSCMlojzcfeu2pWfMAE7nNikXzpHY73WKsdzeiGJXSPm4Lwbls) and [Facebook](https://www.facebook.com/fbOpenSource/?ref=aymt_homepage_panel&eid=ARDXvVAPwnpPxsaQUtdpdrWV6jhb5mz67ET63dJme3yZIeS0ACffMtUeMkdUFwe3UjT61YNDIy_rXwdD).

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT35mi1rO96LV1thARDZxGSSe36xpMc9ZCbt4HuceNmqUSUuGKO6pQAFgcKMMfXR-XWF9k0u-q4ssvdSaTvDzzeR3gByi4Z_qLk95pe2uDmrZQFRqj0yORYfsGcYt2eUq47UlruOlngnXgVvzALLL1ZGa7MGMsE4lwSOo3JJbNE).`},{title:"ELI5: Fresco - Image Management Library for Android",description:"In this post, we explain Fresco, a powerful system for displaying images in Android applications, in a way that is super simple to understand (or as it’s commonly known online, ELI5).",date:"2020-11-16",tags:["open source","eli5"],slug:"/articles/2020/eli5-fresco/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2020_eli5-fresco_c7ad7f11.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2020/11/16/eli5-fresco-image-management-library-android/",body:`*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2020/11/16/eli5-fresco-image-management-library-android/).*

In this post, we explain [Fresco](https://l.facebook.com/l.php?u=https%3A%2F%2Ffrescolib.org%2F&h=AT3uvhWTGzZcqWA62jEUOsJd65hPauwHHmRRhW98sLXNA0vSvI27mJAYu0uNf4bti7dZtIS-bqdnOe98p-iUIWWvVRAcyMZGSTJLNrJRNtd5KouHHSW2i7J9BytxolxFofY2epTtF75SRfFsmKAc6IV7dIOoV7mv8cSjzWevmtc), a powerful system for displaying images in Android applications, in a way that is super simple to understand (or as it's commonly known online, [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT3-jo2oULxrlZopCUsr3ZGWZoStq2ItCgFZABsUJjZw3PFiLOPa34U4S24v5zhlBesQ5gIdtTl3F0N04AefXz77WV0dalLW_GqcLLSLNaW9-gt0JEKexTZs7MQLCMTqzcTPdGtroGfUjlWHV5v8xQXazYj-sfxfutLO4Z1hl8M)). If you're interested in learning by watching or listening, check out a [video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FXLwlGoxrg4M&h=AT2Gy2Pu0-Vrywmj6ltM0yOdLTJSrWsDR5wMI0UWP3XLJ34Q-QFWQy1n-45m43cPxG5DAYKqCa2N2RHZ5Se79nFqcq6RuMTVdJMlnAkaaif3Y8izMGwd4zgJXxYLN9d2H9H0SJw6NQlWuajwijacQgEH6fkQddt_TqHZGV6ZUok) about this open source project on our [Facebook Open Source Youtube channel](https://www.youtube.com/c/FacebookOpenSource).

**Why Fresco?**

Many of us are accustomed to browsing the Internet using reliable in-home wireless or a high-speed LTE connection on our mobile device. However, many users all over the world don't have access to reliable internet access or the newest phone. With these limitations, users are unable to effectively use photos, gifs, and other forms of media. These non-text based communication devices help people to come across more genuine, and, without them, people's conversations stay more formal and often lack genuine personality.

[![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/125255200_372597110682432_4062542026134627166_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=Pd11tu2sEQQAX_GcByF&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfA2AwyFkQt9g6CwuslFChvu6EFNqg4oKGibyStZqqB0cw&oe=636B3D01)](https://youtu.be/XLwlGoxrg4M)

Fortunately, we get to help these people with projects like [Fresco](https://l.facebook.com/l.php?u=https%3A%2F%2Ffrescolib.org%2F&h=AT3XiXN0Xou2sc2V6LBScRn7-vIDSEjeDI9vl1xG02Yx1lFpZISnB6lFfZ4f0qMv3JiMsQSO3EODSN_XG2mi4AJWHNIJLSq9_1yQO7QC0W6nlXhIM2ARWauvwW1ihpKuLOHGpAqttzFAob7NTHCnaf8H8JM7jyouGFQ-PtGRJ4I). This resources management library ensures that images, animations, and other visual assets can be used on a wide range of devices, even with an unreliable Internet connection. Fresco makes this happen by keeping resources' memory footprint as small as possible. This functionality lets people use visuals while adjusting the image quality to what the device and the network can handle.

Here's how it works. Fresco introduces progressive image loading where a low-resolution scan of the image is shown first, and then the quality is gradually improved as more of the image gets downloaded. This functionality is especially useful for devices relying on slow networks.

One use case to consider is how we use Fresco at Facebook. As a company, we aim to make online communication more personal. For this purpose, the Facebook app has animated stickers and gifs where people can authentically express themselves. However, from a technical point of view, these animated stickers and gifs are difficult to support as they need to be decoded, stored and displayed. But with Fresco, these challenges are handled for you, so animation becomes what it should be - a lot of fun!

**Where is it used?**

Fresco was first open sourced in [early 2015](https://engineering.fb.com/android/introducing-fresco-a-new-image-library-for-android/). Apart from Facebook, companies like Wikipedia, Twitter and Redfin use this library for their Android apps.

**Where can I learn more?**

To learn more about Fresco, visit [their website](https://l.facebook.com/l.php?u=https%3A%2F%2Ffrescolib.org%2F&h=AT0uFPe0iR0BdQPt9CBS-4AT8YQhFeHJZjbKUNEoKtv9TlwH55X-tAmqRgcf8gZjh9nWEIM4RkLf9J3ETvNFez1XLOFxnyYzlvlq0iIYcVMTsJ815TxcyxO7zQUUJn7iecOsynNgqAZbL3WtJEwtVYRR8pId02TL9mc81hiFhQI). It has great documentation for those who are just starting or want to use more advanced features. In case you would like to see Fresco in action, the project's site has multiple [sample apps](https://l.facebook.com/l.php?u=https%3A%2F%2Ffrescolib.org%2Fdocs%2Fsample-code.html&h=AT25paMua_sjHkDWH6-uTUwBoU3YjqHYRu9RBM2TiyG25f13AK3WvkEiHDzAsu_IJA45fNEoQGxw5chHCQjXlV1Fl93WSOxS00LYxIPiOtb5rhcH2vwDDXJCvM9XLMFn-AaEYGVajsIL3RyL6WCdqNi9Ldm7KZLZtHwcR52Efnk) for you to try. If you have any questions, you can go to [Fresco's GitHub page](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffresco&h=AT2IkpctC3w1ZXIhCznpPGFcTXlB57lCW31vws_RxJEizYOpW5MuEnCz4etaH-uJe6rtZwq4hY4U5ztZL9iqGswoEEFR8TzD8hsPIC9mTAN2JeAwj0iYr0cIVyZta34qHGTTlYXviADOuM3uziB7bn5g7xaDXlKIqLFX09W4o90) or [StackOverflow](https://l.facebook.com/l.php?u=https%3A%2F%2Fstackoverflow.com%2Fquestions%2Ftagged%2Ffresco&h=AT1AgG_ZzPy0BHR7vRvzz95erSwkuOQBmzPcZSDjJfQ6s6LMdD2rdWclt01Ko21dh4XyaPVhTjnsAQucW0XLvQxmbNCw93uzMGY1AZiaV8ENf_DUozRD-3Bze1GBjYVg7rc3JGCzCTNheit_myCFBc47WOMqLMR_NHHjnhdht6M).

If you have any further questions about [Fresco](https://l.facebook.com/l.php?u=https%3A%2F%2Ffrescolib.org%2F&h=AT0dxnDrmQQ4M1rMJ-t2MD28bTz2uJExrJyuFtpYUfwJzQ5KSWbaUrgTYdIeJMtL_DWRZ32NWmIpqKwbtSil0jnSsysIJWB0ZWDLoNDR4NUYlosE-BuxmaGG0GkN59GIPa2jO-_mKKrSYSuiAEiuYpk3wDjdtHp1gUs4wJU5N6E), let us know on our [Youtube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT0ziVqs3mJfCdwsFNobkVCv8hFLAaLm_pZVt4ZytDAe27tyFbG5W5DkTIibZ3_5ShMYZ0p-JaoCAhmWMsnZFgujpcCojPMSxnOzzbM-Q67OFmGoF1chNejxusPtmE1ORRlcVGvXdP6M6SgCK94dXPlrQ7pBG3oP244Pj0ObQoU), or by [tweeting at us](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT03Jm4HXytsaRcmMqEiRySc-fGBBsMQQ3nXoPmhYdHMYf-yjAOaYPreyTdpavTG-EXkEWtWq-fF9erL0GbKSoJId62C7NLP3O39z8jrC0nT5r2LljHLHxrtm8F-DZzNWRBE0DPVZX1cqANXlTTLH8fs8XmUKW0z4cyovxJm3e4). We always want to hear from you and hope you will find this open source project and the new ELI5 series useful.

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Facebook Open Source team explains a Facebook open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [Youtube channel](https://www.youtube.com/channel/UCCQY962PmHabTjaHv2wJzfQ).

To learn more about Facebook Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [Youtube](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT2ZkB--NxGl7D2YISZRF7RKclUEBkE2K-mR602YtsPxUxijlCgQXJ9c4YuecMWMKZLn57lBboWs7I-MXoY-qxmkjmwGYICj5JaJ2MvyKsWcHzM14XBNr-pWS-J6FgrXh_iTPTo-9TLhwMrSgC5oS8h56d6EkypIBMtkwcmcC5k) channel, or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FfbOpenSource&h=AT1lDIx7G-H9Aj1veizw3w7M1efLpzLZ_WhTpDXfSllklZtbtqOwGBxNCPlgRzPGpPiHAmN9nbwVmQKoISOTZiYrV3v6fbDk-iFxFUlwQlKQgjzPn_KHCblJZh2RotzSiyzFQ1K9CkbYsG-x1m7pBv5Ggmh2DRU1p5DFFG-Od1U) and [Facebook](https://www.facebook.com/fbOpenSource/?ref=aymt_homepage_panel&eid=ARDXvVAPwnpPxsaQUtdpdrWV6jhb5mz67ET63dJme3yZIeS0ACffMtUeMkdUFwe3UjT61YNDIy_rXwdD).

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT2CuciOCDL56CfwwfiUGeddYU9pP6ENxjdlv-I_I22gn9FTl83b0X0AVlOsBNm0y4zxjqpYYlK_qj02YM21PlJOE1yJMuxXYuimfRSl54MV50AscbD6KYmwmedgaaJN-mKK96aQh_6IRWsCuPrtvm5wsjXPoHNIXD_3gjiO3b0).`},{title:"Open Source Year in Review: 2019",description:"A look back at some of our biggest open source releases and projects from 2019, bringing our portfolio to a total of 579 active repositories.",date:"2020-01-13",tags:["open source"],slug:"/articles/2020/open-source-year-in-review-2019/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2020_open-source-year-in-review-2019_1becc3b0.jpg",canonicalUrl:"https://engineering.fb.com/2020/01/13/open-source/open-source-2019/",body:`*By [Dmitry Vinnik](https://engineering.fb.com/author/dmitry-vinnik/ "Posts by Dmitry Vinnik")*

*Originally posted [here](https://engineering.fb.com/2020/01/13/open-source/open-source-2019/).*

Last year was a busy one for our [open source](https://opensource.facebook.com/) engineers. In 2019 we released 170 new open source projects, bringing our portfolio to a total of 579 [active repositories](https://opensource.facebook.com/). While it’s important for our internal engineers to contribute to these projects (and they certainly do — with more than 82,000 commits this year), we are also incredibly grateful for the massive support from external contributors. Approximately 2,500 external contributors committed more than 32,000 changes. In addition to these contributions, nearly 93,000 new people starred our projects this year, growing the most important component of any open source project — the community! Facebook Open Source would not be here without your contributions, so we want to thank you for your participation in 2019.  

![](https://engineering.fb.com/wp-content/uploads/2020/01/OpenSource_yr_in_rvw_final-02.jpg)

![](https://engineering.fb.com/wp-content/uploads/2020/01/OpenSource_yr_in_rvw_final-03.jpg)

![](https://engineering.fb.com/wp-content/uploads/2020/01/OpenSource_yr_in_rvw_final-04.jpg)  

**Foundations and partnerships**

We also continued to work toward our goal of collaboration and support of open source projects. One of the ways we worked to achieve this goal in 2019 was through foundations and partnerships with organizations that are passionate about their respective communities.

In 2018 we collaborated with the [Linux Foundation](https://www.linuxfoundation.org/) to announce our [intent to form a foundation to support GraphQL](https://www.linuxfoundation.org/press-release/2018/11/intent_to_form_graphql/). A year later, the [GraphQL Foundation](https://foundation.graphql.org/) is thriving and the community is expanding with new members. The foundation is holding true to the initial promise of expanding its audience and recently launched a [free course on building web APIs with GraphQL](https://graphql.dev/news/2019/10/31/linux-foundation-training-announces-a-free-online-course-exploring-graphql-a-query-language-for-apis/).

[Presto](https://prestodb.io/), another Facebook open source project, also [became a foundation hosted under the Linux Foundation](https://www.linuxfoundation.org/press-release/2019/09/facebook-uber-twitter-and-alibaba-form-presto-foundation-to-tackle-distributed-data-processing-at-scale/). In the newly established Presto Foundation, the community carries on the task of distributed data processing at scale while keeping a neutral governance model to better enable collaboration and diversity in the community.

**PyTorch**

[PyTorch](https://pytorch.org/), an open source deep learning platform developed at Facebook, experienced [rapid adoption](https://ai.facebook.com/blog/pytorch-adds-new-dev-tools-as-it-hits-production-scale/) and an expansion of its [ecosystem](https://pytorch.org/ecosystem/) in 2019. During our annual [PyTorch Developer Conference](https://developers.facebook.com/videos/2018/pytorch-developer-conference/), we announced major updates to the platform, such as the launch of [PyTorch Mobile](https://pytorch.org/mobile/home/). This new platform allows for an end-to-end workflow for PyTorch models to be deployed on mobile devices while keeping performance and optimization concerns in mind.

In addition to the platform itself the PyTorch ecosystem has gotten many new projects under its belt this year. The main idea behind these additions to the PyTorch toolkit is to allow users to focus on the task at hand while abstracting complex operations like handling security or privacy. One such project is [CrypTen](https://ai.facebook.com/blog/crypten-a-new-research-tool-for-secure-machine-learning-with-pytorch/), a framework for privacy-preserving ML. While using this framework, ML researchers can use the familiar PyTorch API to perform complex cryptography operations. Another addition this year is [Captum](https://ai.facebook.com/blog/open-sourcing-captum-a-model-interpretability-library-for-pytorch/), a model interpretability and understanding library. With this project researchers have access to more information about why their models work the way they do and are better able to explain the results of their models to others.

While the goal of the ecosystem is to provide all the tools necessary for a researcher’s success, we also understand the importance of a seamless experience when navigating the platform. This is why we added support for [Google Colaboratory](https://colab.research.google.com/), a free Jupyter notebook environment, to our [PyTorch tutorials](https://pytorch.org/tutorials/). The ability to test a script right in your browser makes our platform even more welcoming for beginners who want to try things out and for advanced practitioners looking for a particular trick to solve their problem.

**Mobile and web**

[React](https://reactjs.org/) and [React Native](https://facebook.github.io/react-native/) remain very active and continue to lead our web and mobile open source offerings. Both were showcased in our [technical](https://www.facebook.com/watch/?v=1752210688215238)  [talks](https://www.facebook.com/FacebookforDevelopers/videos/440768533157155/) at F8, in [classroom sessions](https://www.facebook.com/FacebookforDevelopers/videos/564758133932771/), and through [our podcast, The Diff.](https://thediffpodcast.com/docs/episode-7)

As mobile applications grow more sophisticated we are increasingly focused on improving the developer experience for portable devices. In mid-2019, we released [Hermes](https://engineering.fb.com/android/hermes/), an open source JavaScript engine optimized for mobile apps. With this project in the hands of our users, particularly React Native developers, we were able to significantly improve app performance even with constraints like low memory and slow storage.

Our efforts to improve mobile development go beyond the development itself — they also cover connectivity and mobile networks. Earlier in the year, we open-sourced [Magma](https://engineering.fb.com/open-source/magma/), a platform that helps operators deploy mobile networks in a timely fashion. This project provides the necessary tools for automating mobile network management, such as element configuration and software updates.

**Hydra**

In late 2019, we released [Hydra](https://engineering.fb.com/open-source/hydra/), a framework that simplifies the development of Python applications by allowing developers to compose and override configs. With [Hydra](https://hydra.cc/), developers can change how their product behaves by changing configuration files instead of making code changes to accommodate new use cases.

**Blockchain**

We were especially excited last year about our work on the blockchain front with [Libra Association](https://libra.org/) through our subsidiary [Calibra](https://www.calibra.com/). [We first announced](https://www.facebook.com/notes/david-marcus/libra-2-weeks-in/10158616513819148/) Calibra as part of the Libra Association in June 2019. The association is tackling the extremely complex challenge of launching a high-quality medium of exchange for cryptocurrency. It will be exciting work to observe in the coming years.

Overall, it has been an excellent year for open source, with many new projects being released and existing communities growing more rapidly than we expected. We want to end this post the same way we started it — by thanking all our internal and external contributors, those who use our open source tools and frameworks, and those who give back to the community. We appreciate you and look forward to working with everyone in the years to come!

To learn more about Facebook Open Source, visit our [open source site](https://opensource.fb.com/) or follow us on [Twitter](https://twitter.com/fbOpenSource).

**Press Mentions**

- [AdWeek](https://www.adweek.com/performance-marketing/facebook-shares-its-2019-year-in-review-for-open-source/)`},{title:"Open Source Year in Review: 2021",description:"A look back at some of our biggest open source releases and projects from 2021, with 837 active public projects and 231 new launches.",date:"2022-01-24",tags:["open source"],slug:"/articles/2022/open-source-year-in-review-2021/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2022_open-source-year-in-review-2021_67025598.jpg",canonicalUrl:"https://developers.facebook.com/blog/post/2022/01/24/open-source-2021-year-in-review/",body:`*By Navyata Bawa and Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2022/01/24/open-source-2021-year-in-review/).*

*This article was written in collaboration with Dmitry Vinnik, an Open Source Developer Advocate at Meta.*

This past year has been full of challenges and opportunities. We pursued our mission of empowering diverse communities through open source technology with conviction. We launched many exciting projects and received contributions from developers worldwide, growing the open source ecosystem. In this post, we would like to appreciate and highlight some of the achievements and contributions from 2021 that could not have been possible without the support of the open source community.

We will summarize key metrics and detail our foundations and partnerships' focus over the last year. We will review our community engagement through the Meta Open Source social media channels like [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FMetaOpenSource&h=AT3ebHJSx7w5L9D-I_ztpwp1Ggmtg6T5jICrg6nU--5PfIR1JjefStxtLu5mvtRb3kVa55ONCU1Wy6DsFAMGQWJIwBwRQ8hZZpNjepp0gRp3-G1OzlxNPF0422eppWu3i-6NuSHII38ZoI1Kn4Z3oFakXvHteF36jTS9MUz_5uU),[ YouTube](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT3NVQ3Ai0iJTYGqpH_JcPH0z6Zb-R1drMgcxVjcegzNuVacKSIX23HtontOLnB3ybo6gOCr2B11ZNmbFy55fgrfOb2ldCcGuNQ3Cp_yWMvdph-ndsvP-o3PT5lJAV5te1W5eRfUAn8EpBOqmiA5yRwjlOFpTQRNSdYAN7_K3Zs), [the Diff podcast](https://l.facebook.com/l.php?u=https%3A%2F%2Fthediffpodcast.com%2F&h=AT0T4W7R0PNS0pxtAHCCc-6QrRXf4G3WcKgdb9BAWisGS94iXFH067zYVzgnGw2J1Vfp-QHa5iTCH070BTwMDXITDEcQkVGsqVWecDapaJfI5LdX9HGcvjqNJZmhc6js-vCxQnWBS7r2NymuJRCSLfvqpRbMjU1oR3NKRwdd3lg) and [our blog](https://developers.facebook.com/blog/open_source/). And lastly, we will categorize our open source portfolio by technology domain such as Developer Tools and Programming Languages, Data and Infrastructure, Mobile, Web and AI/ML so that we can share a snapshot view of how our portfolio is evolving.

**Meta Open Source by the Numbers**

At the end of 2021, we had 837 active public projects. After discounting inactive projects that were archived, or projects that were gifted to foundations, that represents 231 new projects launched this year.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/272129897_1082638979178803_3893722077780645691_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=o_4HNkBYd0oAX9gAAWg&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfDh5ZycXW9kdU3rhXPMZrv8ezhvvAo8KLOP0Xi0zsWEmg&oe=6369684B)

Over the past year, we also saw 165,163 commits to our public projects. This number is nearly 20% larger than in 2020. Of those commits, 23,938 were made by community members not employed at Meta. Meta employees made the remaining 141,225.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/271884093_258523036418534_3279611971079865616_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=MNFC93m7GCQAX9HMKOY&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfBPnqdg_QqCdRmB_UaUb_Sq26l157j-l0Bl2W95t2100g&oe=636A133B)

Our projects on GitHub accumulated an additional 133,854 stars, bringing the total to a staggering over 1.4 million. The community shows accelerating interest and excitement for Meta Open Source projects.

![](https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/272128739_600965027646379_7217982683205876975_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=wJ31hLHVQVcAX9Gcm2L&_nc_ht=scontent.fyvr1-1.fna&oh=00_AfD7Dos6fcLx1Hu2MkSXq-weFxggvvQGgupnhAJ0gYYNRg&oe=63696C09)

Meta Open Source projects are made possible because of contributions by developers like you. Pull requests, conference talks, feedback on documentation, Facebook posts and anything and everything in between---make our projects better and strengthen the connection in our communities. Thank you for making 2021 another stellar year for open source.

**Foundations and Partnerships**

We believe that open source allows developers to work together uniquely and ambitiously, allowing us to achieve common goals. Our mission is to empower diverse communities through open source technology, and we always look for opportunities to be involved in the appropriate foundations and partnerships that advance this mission.

In early 2021, we announced [our support of the Rust Foundation](https://developers.facebook.com/blog/post/2021/04/29/facebook-joins-rust-foundation/), at its highest member tier, to sustain and grow the Rust open source ecosystem and community. As a part of the foundation, we've worked with the other members to [announce cloud compute resources](https://l.facebook.com/l.php?u=https%3A%2F%2Ffoundation.rust-lang.org%2Fnews%2F2021-11-16-news-announcing-cloud-compute-initiative%2F&h=AT2qY8GWK31ub-lT1avj_uanH4_hbo8KNl4UQuRvdGX8fkm-PKpktWA11IIdVfz0ImfADsc5bu6Cx5OEZU0b_om7LftkhQW0XCKS99G-noDLT-IXdqtsTcDOj4Sz6V1DApIQUzW4DDmN1MbFz8nOT79QqFB3YSNzJb3EfnglRTU) for Rust language development. Our support allows the project to evolve while reducing the time spent building and testing language changes and updates.

We also lead funded [Open Web Docs](https://l.facebook.com/l.php?u=https%3A%2F%2Fopencollective.com%2Fopen-web-docs&h=AT3jZcTFVGlIsUAJ9jqktbaV9EWwrOPrNcTelTLW89DTUjl7MrJJZvyOn8dg9t4mw-6k1t3rwFCzj3DGV8m6nb6P3lwYjMJQYKzJCf2H_9N-dHqs-FlOZO1sogt2ZrIQtzdeOfe7XS6CNa9lpbh-I9O0_oN5PshuzJWbd2IVFEk). We joined their [Governing and Steering Committees](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Fopenwebdocs%2Fproject%23governance&h=AT2qDZB7uypzrSTFhpFZ94sGuDTXoF7ryTrCSl9crwY2mZnqiM4Y2Yb-MZHW1myw9ksDxMEVRMon2wuopD4oAiQwwd_LPnnVGuNKpGkxSdaEj_Vls9tMyZB2J1BzGdScUtKoIgT7yYbKnY8o0Ey24i5wc0aw-vcwm7r7xS2kdRs) to shape the project and deliver social and economic benefits through well-maintained web documentation. Our sponsorship [contributed](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Fopenwebdocs%2Fproject%2Fblob%2Fmain%2FOWD%2520Impact%2520and%2520Transparency%2520Report%25202021%2520-%2520Final%2520Draft.pdf&h=AT0GDazDewkVEACryPtvfLywzS0MhrOwRsELFcdLHxZ6umQqLtduMjq_xB7wUUouvYb77i5SjvfVSV8klMr_-FQ4P3uk5RYHJXs-ZJ9X1C3YnFazQn9krflgUFFq3peZyKs1egglhI6bjqfC8xumRkgUtXNeM_WQNRH-CcQW5yw) to the hiring of full-time Open Web Docs technical writing staff, and to the future of web platform documentation, adding [131 new pages on WebXR](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebXR_Device_API%23webxr_reference_docs&h=AT1voiiJuliJ3Rv_eXeHslwnUzdacgmV8F0erVJtJCm_JcOx_E5YIfFcraGBmqzx-8MkUtFvsD_NUJFlgFfqSugL-D6uqxsaHiG5Wnq9WYB7WoUcVsPQIr16bYQAjY1owinRuuzIJJCHc6ExO9YJ6UWvqPCqUSL4oTZPVexHI6I).

In addition to these new partnerships, we continued to collaborate and participate with existing foundations from last year. As a member of the [Presto Foundation](https://l.facebook.com/l.php?u=https%3A%2F%2Fprestodb.io%2F&h=AT216bCil7nIvIw8lYizA-UCiOewNBc3YP6i-YeudH58ZXr2Qc8pgUV9IcEziCzskaIxOaZa0O6WHxrKWymSq-87pcXkS8Qpf-t8vBwdvd_bhWmnI2QQPZgvmxpAopo8dzb0q2YkZ5YwcXX7cPTlLw8y2Eq9xio-KUtiuI2VYLU) - a project we gifted to the Linux Foundation - we helped organize [PrestoCon Day](https://l.facebook.com/l.php?u=https%3A%2F%2Fevents.linuxfoundation.org%2Fprestocon-day%2F&h=AT2DTknncCAD94JOYIlLOjG0zciyWIPqScyu_pSDne2IPizjgNXN-80ou7tIeXGPg1hBKIrg7yIq6HmZzz5KQ3bp5cfDsE9n_MQa5EZpCHDTlPjORUgJrdgHNQYhXmT2ZRAF4jYVnP6qJ9-bhU3UQGvUZnmlHD096ZeSnOeAsBYckTIntmQVSKha), which was a great success in bringing the Presto community together. The foundation shared recordings of the talks on [their YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutube.com%2Fplaylist%3Flist%3DPLJVeO1NMmyqUDkrabo6CRGQ7zNTOMvu2L&h=AT3TxEjr5E-DbMnscPueafxLt9H0Gh7lfxiTLnqeMKDhnVFCoLjYyrYEiMYyBoTQAxKTriww-Dm4UpZEovMGGuKiqcThLQMbGCIugZjSdR8oyQi8gPWjxEKAd18zWm56GNW_54hfbNl16iiamA9L5yiMCxQ4G88wOeCTzVBlW_A) following the event.

As an active member of the Linux Foundation, our involvement goes well beyond Presto. In 2021, Meta was the largest contributor to the kernel directory, with [17.6% of all changes](https://l.facebook.com/l.php?u=https%3A%2F%2Flwn.net%2FArticles%2F845831%2F&h=AT2rlXmzvhhoHhkSZ9nPzuCIEnHYf7ISY-AvaTLqcnRP2llu8jWYn6tZmdpjC0K7Lb2lEjyjsmhqhOxSoRpUJLus1eJXNWBV0CIan0f_emYGeXlTFdOg9jKAXfY3WovMUG9F9plrwFHR7Tg2zmFyEleMUmMeR7fnLFjmYeMIPBk) by developers at Meta. We also moved one of our open source projects called [Ent](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Fent%2Fent&h=AT0Kq3vG2_xgnUhlvExU-GOZzDhooEKkyQw0aGK3PuURXK2mMV04-NaoHFTWhkYRoP_WgeISu6DymwFPFlw2lwL5ha2kwVcYiZmXeOdGfRFZ4zriuDOMtrso8M0ybDzBzVlykcMlEJRGYU1B4ZL_7bef_e6ls5cgr5nO1Xis7pU), an entity framework for Go, [under the Linux Foundation](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linuxfoundation.org%2Fblog%2Fent-joins-the-linux-foundation%2F&h=AT20oKjbyvh_49gMdgFKKzI3xn6BiK28gItTfEr7iaHkY_WHCZA3vpdHgGbRnsXwncXaZX11hEe1kqrWBcfS30AU1WXyYsQhCeFlZSh-SDv1G6BQFRsf_pv9uZg5rL1i67ZipA1JT3PVV3N3Bm42XnprBgF6DOGw8wCMO9Y17HA) to aid in its development and foster the community of developers and companies using it.

In early 2021, we also worked with the Linux Foundation to establish an industry collaboration for Magma, a platform for building scalable carrier-grade networks, to help accelerate the deployment of wireless networks and deliver innovative, next-generation services and launched [Magma Core Foundation](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.prnewswire.com%2Fnews-releases%2Fmagma-project-accelerates-with-establishment-of-magma-core-foundation-and-new-members-under-open-governance-301274040.html%3F__cf_chl_managed_tk__%3DXQaRpvDS1gUXHEaDMcuyxBWxJ.XGTN0khdBMkb1jXAM-1641798871-0-gaNycGzNCz0&h=AT100JBzk7C0xajWmz0COca1I-ImW83NXUzG9yrdwplP7tFQfXynyVUJOxa7fOHUfvCNCvCsWg-Qtdvf01qqhznsvAuJ5hflBOKW8UPEe3Ve8NWdTKCtmITR31QRzmMJ11wAyrcrAHeDJ6P3wpktD14OPp9QydABd10Np8KZRE4) with over 20+ members. Later in the year, we partnered with several companies to launch the [eBPF Foundation](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linuxfoundation.org%2Fpress-release%2Ffacebook-google-isovalent-microsoft-and-netflix-launch-ebpf-foundation-as-part-of-the-linux-foundation%2F&h=AT1HRhg040UTIb0ALp1BDF_ka4Ych6aWATJ5AVnRXWGitNTxLxiDSniAU8bVV0S1O6dh9nch9lV98-sN94eWRlbVZRAhxWKk3wbUYOta2pJs-rpfm8MG0wyP6koVE2Az2rQs6JObpXX6OSqJx29z4qzvS_nWt9zs1IGR7cSw12Y) to help to redefine networking, security, tracing and observability.

**Community**

Community is what defines open source. We want each of our projects to grow their communities while making it a welcoming space for everyone. We shared our developer programs in more ways than ever before.

In 2021, we continued our partnership with Major League Hacking on the [MLH Fellowship program](https://l.facebook.com/l.php?u=https%3A%2F%2Ffellowship.mlh.io%2F&h=AT1P2MVPVpubaKogAvIlnE9vOvY-t0KQpipKT46doKoiFTZnypFpDHmk6jBjfmcxPnPs_xE3oL6Z43YjXrdvinZ0Oopy2h_jhFBt09HorC6bYyS4wmZQqVqOHPyvxxjSVXOHHda3M8-_ie5PQc1XxC6j7cLRivg92x-RrwjkLqw), designed to host, mentor and support developers hacking on open source projects. We believe that investing in open source is a way to empower developers and make the community more diverse. To spotlight and share the success stories of the MLH fellows, we published a [Contributor Story blog series](https://developers.facebook.com/blog/?q=A+Contributor%27s+Story). We will continue sharing other posts with similar content on our [open source blog](https://developers.facebook.com/blog/open_source/), and we hope this will encourage people to contribute to open source and become a part of our growing community.

Although most conferences and events in 2021 took place virtually, we didn't want to miss the opportunity to build a dialog with our community. We delivered several talks that encouraged everyone to use and contribute to open source and work together to make it easier to build great products for everyone. We presented sessions like [The Tale of Five Projects: A Reflection on the Motivations Behind Open Source at Facebook](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FCWVQUgCis6o&h=AT1wrKqMR1gW00_YstaJHT256RWBA9vIntDTEgmtp3up2bav5PKo3eOO1heLJ-BcdFjjY1aJBIn1EZRIUWG8QJXLRmhYqHOi_tgn7WypIgerQD2I4uqvGlHa6p9_7qnY5ynKTIYfmF6ZNzPvJ-9xKHMfiaDfS_wlzKLmccV0Weo), [Hands-on React Native: From Zero to Hero](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2F9tXktXR9iJk&h=AT1-XVOUCMabGYuCXomNbWuUQy5SNuZVhzVVlNsi-D_8bYMwF-uh9-40AYLttxoL94oFI-Dr4Gn2n0GS5cVnU6iMfdIsLlSiANk4OgHL5ZGYZdJ1r32RlTRNJNltK8r7aBLPEYqARE5Y3I5KSMkUSB2GMnZzYevPhpN_OwDg41Y) and many more.

As we wrapped up the year, we re-launched our podcast, [the Diff](https://l.facebook.com/l.php?u=https%3A%2F%2Fthediffpodcast.com%2F&h=AT1Rg3INuiJwwhUc6bwpVqvZtjWjzNGfoAQ6YsevyiYssgZvYapqAEwlmhKP-Nsj_av9_PhFgIsnljjtMT7JHZWX_7GA5q2SbEwyEuu9zAOBf-pHqbS03eLjRc2acQAv9LZEXAsnT_e4iP26UOR6RWtosYp-n0JCp921YsHeCdM), adding a video component to reach an even larger audience. In [the latest episode](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DQR84BJt4fw0&h=AT2FbT39vqrDjax40bzRnh3kJlpirRlt2UxXkvu7tTPcJSEJsnuHd-1S50TNAf2tOF7U-0ki06XkeYAlMXN9s2AiBo5D6UZCB2AP_NadZkA75xBSjqj4KPoeDfYLZDjL6iPDSR8Uazp0lam-L0lj9kzXbqDTYl-IBrGGt4Gh2Lg), we interviewed Paul O'Shannessy, Meta Open Source Program Engineering Manager and talked about starting and managing open source projects at scale.

We also participated in Q&A sessions with the [Major League Hacking (MLH) fellows](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dd1XwRIKz15Q&h=AT2eCWK2GFN6ru2m78jDzmDVd3ssyBGoKRxI-nlQB4QWtkxYqBNSNVZHxoOsNh3cbGLCq19WInVt12OX7_z0dtsfIY0Tcko9oFmh4SK6es1sNv_zGvnKISumjdK3MJxFnQn9U86djLJ1j5wqH00e9B1FcOOhCH144D-C_V-Dj6o) and the [F8 Refresh Hackathon](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DIrQLig3knWU&h=AT06Wx_vtR8VTCd0qaGCucMvdYBV2wW9QpC7s7bcm_iCZsvFIJaZXFuMbPAeGlJMIePVjsoxDQLQrtv7rV6UD0Gulp_g9uhQ46QizI4x5g0CBij6eliRBzgSFlpNlfd9shPPQmYe_t8h3xhXvEI74dcIuuPZJSkXwOmvelGcSxtKx5HHfsuEW5up). We shared best practices and discussed other nuances specific to getting started with open source. We also continued our [ELI5 (Explain Like I'm 5) series](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutube.com%2Fplaylist%3Flist%3DPLzIwronG0sE49zLk608yB5GKKT8WbEhnZ&h=AT0eQ_eAzhMEk4E6S5j3CbeXCQCLuRk7HV1o40GEUvROo0SLZwk1ju-34IiY0IaXUWPy7aqCbkNKtscce065c0gVU4NPS-VEH1i7D8ejQR7aRzD4VW6E7FSAlRUF469sXSreLm0O9-UVGNex1twbBqrMGsAa-WySDMPmBrVf6IA) to give the community access to a comprehensive range of topics in a way that is easy to understand and use.

To ensure that we continue modernizing how we inform and share projects with our community, we launched a [new website](https://l.facebook.com/l.php?u=https%3A%2F%2Fopensource.fb.com%2F&h=AT1l5NoZnmhTaDK2jkDIJtQiQZerOHkQZ7SItBcEhahlNxJeVktZ76DgPXdHVlCGh7UlJhGXBl-q2G9tLzbGe6KlR-DeK1QrgqrfIO5o4LKgpBtCv7Qo5LdlEPWhjxgoDXLzf83kkG80Zle3qqNneXTDVQW2ZgwHmeeuIegko6z-AeXW7xOUDDB4) built with Meta Open Source projects like [Docusaurus](https://l.facebook.com/l.php?u=https%3A%2F%2Fdocusaurus.io%2F&h=AT0PGDHfvbgEhmO8P1rBXDOn8GT9uGqK35pdHIK2puhU6Twf0Y7w_jamgr4ybY8vH-YpDTVQGn7Y-oY4xYP-4DiIdKbxPZjisSZnqr6k2gVAAS5nhFYjW7f61aj3PYCLRVnkMB_nfdfBmpbrDgdDdj8EFKnszc_pRVIwelkIJ7Q), [React](https://l.facebook.com/l.php?u=https%3A%2F%2Freactjs.org%2F&h=AT0LnAu_2pYmRHpXZ-a1CXGfS2dTNhwkHTr5oOkC7k7JtlZAHnkBSvrBAd9CIWOI-FkYdABE7KzX5v3Tq3yfaMvHoX1vGLFKshggkNO5fMcK-BcmfMdwKJ7J3BjBP6bUfMq584uYfS9049naBIVa8lEh-2rpQ6Alw_rsAB8DKrU) and [Jest](https://l.facebook.com/l.php?u=https%3A%2F%2Fjestjs.io%2F&h=AT3Ec0OteBkpYgaW3KfYjwppwXOxILmqofEIkqh6hWaMzoxVm52YVGixH77uumB88xUq8JV-foy2dzWkcZ5HG15alF97W2Mg1gfHydiGWNmYVXbsH-DlsOLF7jvQAWpv43fROE31tfkKpuuZ0ezl8CM6O5L6C-TY6fP9E3iY204) in June 2021.

We hope this will guide current and future community members on their exciting journey.

**Meta Open Source Portfolio at a Glance**

After covering some metrics around Meta Open Source, our external collaborations and community engagement, we want to highlight the components of our open source portfolio. This section will look at our open source contributions in different areas like Developer Tools, Programming Languages, Data/Infrastructure, AR/VR, Mobile/Web and AI/ML.

**Developer Tools**

Here at Meta, we want to empower engineers to be more efficient and productive. One way to do that is through developer productivity tools, which we are happy to share with developers publicly.

Recently, we described the [future](https://developers.facebook.com/blog/post/2021/07/01/future-of-buck/) of our flagship build product, Buck, an open source system used to build in 15+ languages targeting different platforms ranging from mobile devices to web services to VR headsets. The next version of Buck is being re-architected from the ground up, using Rust throughout its technology stack to deliver very high performance and embrace extensibility. Various components of the next version of Buck have been open-sourced, including [Rust-Starlark](https://developers.facebook.com/blog/post/2021/04/08/rust-starlark-library/) and [Gazebo](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebookincubator%2Fgazebo&h=AT3TqcjxBDRTVhFS7eNoeNOQF2MM5NgIbhlyMKJ-MF-6qSJpMx1PX8OnKAfnBYgb3pE665DmTAfdMOvfMwMBfJ5WLA43t9iUsLFliRAMYmit0IxzgPKTdKFLr9zi1jNVfUSh1ko-pD_FrWV9mAxdhVtJ2AMjUUo3_bIE8twA2cI), and we expect more to be open-sourced in 2022.

We released the next version of the open source documentation infrastructure tool, [Docusaurus 2](https://l.facebook.com/l.php?u=https%3A%2F%2Fdocusaurus.io%2F&h=AT2DuFJ81IekUYSjDSzAYHzmGTA0ec2KqTwFXdgtcth8V3ihtKOvJa5h5bOE6DQguyQibCj1Nf4G76mNKT4VE_V8QOYY_nKNPXf7aOAG5eMUIX9ODLGwDo_mV8bKcxPvPZQYtb9SYFrdGT-7Bk2xVxYl4SJCJB2BMlqllSxVouk), which went into [official beta](https://l.facebook.com/l.php?u=https%3A%2F%2Fdocusaurus.io%2Fblog%2F2021%2F05%2F12%2Fannouncing-docusaurus-two-beta&h=AT0V_xwgqd7Vus08cy7DltUSt_Q-nILtxEyixDUgAATLQJ7cQ5c5N-Bg8rwVpG1e7-9mOSVjDAYejc5AGyw5A-x46EA8tOo_Wu3Qou5h1KPeUzVm8bKMbRgklITOz1-WxERPs61xdhGWXxDWifix6nZEKcIyxiIkKrOleBqHvto) in 2021 and is nearing full release.

The developer tools space is broad and far-reaching. In 2021, we released a project, [Winterfell](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2021%2F08%2F04%2Fopen-source%2Fwinterfell%2F&h=AT1CH1H_D1q0_RxG4r5PK8q5DZ-KwDS5i41Gx2ZR0gmH4CfvVxmWwlhl4cRLcyjcsel76DaK--W3DOlxeFiboGjz_v3PfWiXx3L_l-pQUiKyJfEJVXWLJoTU0OvdogDOSC2RFfjgE6rIGQRDp-Bema9kd_fwVE3wztrymtWvOXI), which delivers to all developers proofs of cryptographic computational correctness that would otherwise require specialized knowledge and skill to produce. Soon after that, we open-sourced a tool called [Below](https://developers.facebook.com/blog/post/2021/09/21/below-time-travelling-resource-monitoring-tool/) that "travels" through time, helping teams to view and record historical Linux system data.

We believe that the best way to battle test an open source project is to use it in production. This reason is why our static analysis tool, [Infer](https://developers.facebook.com/blog/post/2021/10/22/finding-modifications-to-immutable-data-structures-via-infer/), was used to help with rearchitecting Facebook Lite by catching race conditions and other performance glitches at compile time.

**Programming Languages**

There is no one default programming language at Meta. From third-party languages such as [Swift](https://l.facebook.com/l.php?u=https%3A%2F%2Fdeveloper.apple.com%2Fswift%2F&h=AT1NFTbxIyqJyHHPooQdc-RKNvuarT6vBCY7kWqm1KveZ8LOGHeCdoWfUu5_eeK9zVlduyV2cwRqMMOS45bseoAXVbbrhfUPBnbtBuTXJ8iuZ6hFRtrdklhsVd2ojCn3CN_hIhQyhIa6f44hxpEkLq6zllkCIe3G8IX_OV_IoIQ) and [Java](https://l.facebook.com/l.php?u=https%3A%2F%2Fdev.java%2F&h=AT3IXyB5B8LA5WboSxDfsATzveqiEqHuKyOS4Xano9nd42wpCrlxXbeqZ-UmJxbK0yeAohciwBdKKe_zKjVhVOn4FDnwn8p69FbNS6-0hAZH-GxS8Fbs0yOoQNUHuSGFa29dITQC4uxg7RXr_MXGkvC02wZBG8GzIsOxTcQqJgI), to homegrown developed languages [Hack](https://l.facebook.com/l.php?u=https%3A%2F%2Fhacklang.org%2F&h=AT0Sy0N54HFej2yZK3ghVifpUlG-J43WI__C_0d4db9PjSwg26403_8BofeR1Av8pZckPVQJWokk3MwLgvcRQBBHXkGIQQWGvOf2pUk9WSPpVedIKfQeGEkWOxSr7ZljNw4uS-BzvA-L0Wv4zMR7C58QXGO6WNAEruWd3BaObpE) and [Flow](https://l.facebook.com/l.php?u=https%3A%2F%2Fflow.org%2F&h=AT1DOCXuCjmbUJ6kb-dX_KM6FPTLBluRR-hJtm41DJ3fgDbZ3gP24LIg8n8qSO9APEDyG3ZELGwCyAaz3o3f6tPiMhbIb1u7s_L6_9WGcj0FUE_vtcdSlbJ6pNdtzg5FaoURXbFPHN5NTx-pyXb7gvE0G1lOm4ZKRUXHApbIG-Q), our engineers use the best language for the job. For example, we published [Hsthrift](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2021%2F02%2F05%2Fopen-source%2Fhsthrift%2F&h=AT1BJc4ROeYNGf_CRlml5HBZZ6CAzcytGd9kX74tHP5TmmsgINg8mGyughCQ0Mzvt8CL-qIixwOUrYZE6BK7LNv1WvqfpSkSqXyPvBeOo-PWtpH-FE4OVQL4cxTCxCBTJLb8xu1WAxoonkQGbbKB9tTPVfumyJFKPHEIURLC644), bringing the benefits of Thrift's simple, language-agnostic protocol for communicating with structured data, to [Haskell](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.haskell.org%2F&h=AT1X6EWw7lcmAVsoNE2nMJyc1jN8_H7xxjCeUHKro62x3YTB822YXC-z7Rch_XODCEsDb1HtA7IcKA6yAcIT1tIhfdM3A6dRAXXDtheiDbtJfusXY8d_WHEn7BGAz_uZ0becX1Zq6I2hXpTRvYByAnWlvKWDB9g_aPzYoqyjJr8). We also published an [entire series](https://developers.facebook.com/blog/post/2021/09/16/async-stack-traces-folly-Introduction/) on async stack traces in the C++ developed library [Folly](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebook%2Ffolly&h=AT1xNhRTViwyB8h_JKUhqwGpLul-fTzePVJwKQIjSokyTq1L8l51G7VHqPqLB11zoLr4toTEJmEVtLnhCrKYXvo4_FyZ4q9eRBuWVXP4nHC8DDkTuH8DnD5cc0r6dyuZRqrAlwXupVaaJpFxC7CMjZ8xqzoj6yRlLQ-GnZy6KKg), and helped to make [Python](https://l.facebook.com/l.php?u=https%3A%2F%2Fpython.org%2F&h=AT0fWZS-DMMcRXfe-M1DdmvUGhwZWBoRePqzOsF7wS-rzJMJpwq3Zadgav9KOautV8kPsDdcRUkTRptv9WbVwZBt-5trrfDcsFWIxHKQPjKWIBY4W9wSh1Z4hk8EZKGQE9NuQwj4S-glVK-Upeja_qJOI4pHsk6uYFwLSAmhC3E) a more efficient and high-performance language with [Cinder](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffacebookincubator%2Fcinder&h=AT1ethyCNXqiUdtqArtGaPjYTj8b_n4xLMDn3sy1dO8gJXFMs9VUJhV-3FFH8_1d_0z97W2XFIz0_XVYy8d--mBlQ1ET-0n3agfLW99pEj_czlkwsdPF7hY5VsGDA_WtdJrkWIzumT3aSSv5Pma0y1Rle90a2oDwOHfboVJE-2c), Instagram's internal performance-oriented production version of CPython 3.8.

In 2021, the Open Source team focused much of their efforts on one particular language: [Rust](https://l.facebook.com/l.php?u=https%3A%2F%2Frust-lang.org%2F&h=AT1kSqNMaDhWgmaIQlk8XpQXVuQynP98bKB6fnAB8zE1DwT9erZtdTS6PV34pOVMjvXG09qLob-rISzstY3kpirp4v1OMxFavBuXlqYsFsK5O7VHKsWBpKstoVkFGHLMlnsJAKoa5J3rh_qhbgGpUXZACBiTrbmLcw13lueF0nE). Rust is fast becoming a [favorite at Meta](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2021%2F04%2F29%2Fdeveloper-tools%2Frust%2F&h=AT3twZvFqoPVNFjULqvMJ0gpis9k2qg9hjggr0n28AXNnx1zNH90IL5q8z2_mc6hX8aPM2d8HRYN31uyeRJiwMzrK_nULwSATG9OSE9Vf1d3-zJh0RNxnsP92gcOIdDyG3wVUsjULkxeJz9CHQW3OkkQZV3kngwPs1WJMFrIboE) and in the [developer community](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.zdnet.com%2Farticle%2Ftop-programming-languages-most-popular-and-fastest-growing-choices-for-developers%2F&h=AT05nr0hDit8NdnW8v-9aBVJw-17k0DjVC4bW4nA3ikhr8KvCao_Bn4QS2OEceRnkMGMoAnR7_GVDrsP_o727uZJiufv2Ycc3y-kH14-rAfPIcm5o4QX02UsQjUIBHpetDgdNvKnWxMZzh1NeSIe7IA1suMJWZFC-Ubr1i_k2bk) at large. We even formed a dedicated Rust team to grow Rust development inside Meta, encourage open source contributions to Rust and Rust-based projects, and improve engagement with the Rust community. We launched two series showcasing the use of Rust within Meta: [Meet the Rustaceans](https://developers.facebook.com/blog/?q=Meet+the+Rustaceans) shares stories about our developers who use Rust in their day-to-day work, and [Rust Nibbles](https://developers.facebook.com/blog/?q=Rust+Nibbles), which dives into a specific topic or project in "bite" size pieces. An [exploration of Gazebo](https://developers.facebook.com/blog/post/2021/08/10/rust-nibbles-gazebo-rest-of-tent/) was the first in the Rust Nibbles series.

**Data and Infrastructure**

With such a breadth of services and a massive user base, scale is one of the biggest challenges we address. And true to our mission, we love to share our innovations in data processing and infrastructure with the open source community.

In early September 2021, we open-sourced a caching engine for web-scale services called [CacheLib](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2021%2F09%2F02%2Fopen-source%2Fcachelib%2F&h=AT3tYn0roafBWuJSjFo8ATiuuvGG5MvJdsHToTV81R2q_WubRCNvQKA-oU6lUc32diCSETDqfhqA1_eRW4DaIxP4uVJXgyKw0ifj5tfXi5H3HskVNLd1i9kgPP427KDyM3TgRSfWyKguUuxi0ZGenFm5A6iafi-0rju0aZjTr8U). This project that we created in close collaboration with partners like Twitter, Carnegie Mellon University, Intel and many others, aims to help engineering teams build and scale high-performance services across numerous use cases. We also published a new benchmark called [CacheBench](https://l.facebook.com/l.php?u=https%3A%2F%2Fcachelib.org%2Fdocs%2FCache_Library_User_Guides%2FCachebench_Overview%2F&h=AT1-Z-ACt8Po4wVhY0JET0PVgUXMycszNJagfI2kPgoj4r658fEVYbUJZEadS9BfTGrIBzcqz3RFkkPi4ZKO_9t5ZczOpVLuXKE3bJ0pHBlRRNdDkG4le9o4vaGbwSHh7qS7SAv5ml7y1BTY7Owjw6pHhVfGJnDFfyMcKYi65NQ) to let teams objectively evaluate caching performance on diverse production workloads.

At Meta, we are trying to solve some of the same problems that many other contemporary organizations are working on, including those related to time and data. We built and made public an [Open Compute Time Appliance](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2021%2F08%2F11%2Fopen-source%2Ftime-appliance%2F&h=AT0MvfPKoazVjJf0mwHtaUnD9DhHKEvNiaoBPnmTf8sZ7hNsJxWOCt1nvNPcjMG4RUHvbGbhnohuWrpZfI_HscNs_5mCYdqlw3GZq9_5N-DEjwywLYLAdaotQE2BmPBPl0IVL07C1rqoDnDRyhtZNpVA_dZ_5VYVdiUHtLIQVv8) that plays a significant role in modern timing infrastructure, making it more secure and affordable. In addition to this hardware project, we open-sourced a new library called [Kats](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2021%2F06%2F21%2Fopen-source%2Fkats%2F&h=AT06WFczfrfxYCW3wYGWNaof2lM_s7uZ5W-S9FQCj-VXu8OlNg42eafw3Q8SyJSHGrv4vi_TTs02zruGxhxkHbUH1T_IBRSCOm6farWGj_cprFRclT_KsygfNt0SpmN9hwaQ1yv2aYcZheZ_B1y5ZrwxFFbwJ3Ne30VtOOfMncg) for analyzing time-series data. This project is a first-of-its-kind, comprehensive Python library that lets its users explore time series with both classical and advanced techniques. This type of data is vital in anomaly detection, feature extraction and analysis, which are fundamental parts of many industries like e-commerce, medicine and supply chain management.

**AR/VR**

We expanded our community presence regarding AR/VR efforts at Meta. As a part of this initiative, we recently launched [Shared Spaces](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Foculus-samples&h=AT2D8bbIpNJV0BM6jz3Bivg5XoXZPW2zUiq1or3M1arp3J22j0gCvV-7w6K2ulj9LiS1TZVjoA91fVN-B0e_4QJM70wf9wMcwwQHhPOpWLu4P7p6yCk0FURF_l4dl5yi-Fp3INKSEgeJwjutv8Nfh5_nCTk39fm2lKevIiXVyLY), the Oculus multiplayer showcase samples, demonstrating basic multiplayer functionality in Unreal and Unity. These include Oculus Social APIs, Oculus Platform authentication, Photon Realtime, Photon Voice with Oculus Spatializer and much more. [This Connect session](https://www.facebook.com/watch/?v=422431035983250&ref=sharing) from 2021 explains how to use these samples to build and grow multiplayer apps for Quest.

At the [GlobalXR Conference 2021](https://l.facebook.com/l.php?u=https%3A%2F%2Fglobalxrconference.com%2F&h=AT2UR5FYTrM-dwppXUsyBXQAOSZtHs5VWINNHtsNpBCJHf_WHRNpGu2ScxMjP_oZNpSoM24lAOuSeRidjo4UVVecBsRYgTB9mFWwyly8TQqeYutnvc_4s6WygP1lA7IlukMJMUyLCDLGJM66Y-9IDbiBw-KWMmFI-mdyjrOAxF0), Developer Advocate [Navyata Bawa](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FNavyataBawa&h=AT27HR0hzY7BTAiTXtaWQxDI-lwN6gvkdglpBprZh_N_O45ZvstIgYOZc2yUByWp9GHjbmmkSCX4iUh99t5V1GSm8Px0aS11vinpA-CGF9sUwJEaCoZsAgPld46JekgdaNO5b8tduqOVsQrO5NfABx-FWcoMAOY56ly-22ag9_g) spoke on behalf of Meta on ["Fostering Inclusivity in VR"](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dk_OK4P2cUHU&h=AT3dIJO3EY9bJo8slvk27bxt6frIvd6YNbWZ-xd9oouUl3S1NTRmxxCV0liTUvlHz5cf5TY3gSBTCS7p8gHTae594KNHStn_Rgrp2I9KM2JXSBSu71aIkTDHY-Kz-u-NG2-GwfgXpJV5dIgowBX4Nv8gbt7L6XIztvUQzFbCc-M) for the event's closing keynote, covering various topics, including developing open and inclusive communities, Universal Design, Oculus Virtual Reality Checks and more.

**Mobile and Web**

Our family of apps like Instagram, Facebook App, Oculus and more, have led to advances in front-end technologies that we are excited to share with the open source community.

We open-sourced [Mariana Trench](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2021%2F09%2F29%2Fsecurity%2Fmariana-trench%2F&h=AT2wabbf0hVq5SZ2qAXL_ZZWiB2C_rWCBFC5Rx0LLwAWyy1Ro3G07D1XM6l7sF9rFsR0hq0BK1RL-Zkg2iYRlCRCyCxciihF6wnbob5l4dZFV0efGENzO3YFG2kN4aQ5P608AGsQfT_RrztJOmaHLLFaLpeRULCa6Kb21aD5Lz8), a tool that lets users analyze Android and Java app security in depth. Considering the millions of lines of code that our developers at Meta are working on, we need to take considerable advantage of automation to scale our security testing. We build sophisticated systems that allow our security engineers to automatically review code and detect potential issues, shifting away from purely manual code reviews. We are excited to see that the open source community found Mariana Trench valuable, which helped some of our engineers win the [2021 IEEE Computer Society Cybersecurity Award](https://l.facebook.com/l.php?u=https%3A%2F%2Fengineering.fb.com%2F2021%2F10%2F20%2Fsecurity%2Fstatic-analysis-award%2F&h=AT3reCAK7MI1fs-FOqKsQndlKJwNAcSz6Y68E8Yc8iN3HYCEGFP7w4k9w7j9J3_yXufl7Oj_UJ9n9H3xxbInzrdDO02ZzxqV9SJ-4KarcRkRcVi_bITJ_wfADhzQSv-aiRySLFnvHD-oOvqe_zkwRq884I1WTCiNStwUc_ISWKU).

React Native has continued raising the bar for mobile development, both at Meta and elsewhere in the industry. In late August, we published [React Native's Many Platform Vision](https://l.facebook.com/l.php?u=https%3A%2F%2Freactnative.dev%2Fblog%2F2021%2F08%2F26%2Fmany-platform-vision&h=AT0aqPtk7MUpF_afLBZuxi1FKUCIGgqe4wqagU4JgRSJs5CHnDKhG91BpaJ3XPfXrrYlRutLI39tIoVZT08UZfRg30JyiT_9SWpRTTLBseN83KGY0wnJXV4U0NKk3hHNzoQXndlUhiuXpth6v8thY4BiEIPzsRP_domnecqFVRM) to bring the framework to desktop and virtual reality platforms. The team shared its plans to expand to new platforms with apps like Messenger for Desktop, now available on Windows and macOS. React Native also announced a closer partnership with Reality Labs, to help bring the framework over to VR.

Continuing to share our updates in the React ecosystem, the community has been vital in developing and adopting a new version of React. Earlier in 2021, we created a [public workgroup](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Freactwg%2Freact-18%2Fdiscussions%2F4&h=AT2k4ucMJot9TPHsJ5FTxeLs_STV9reTJPRKdh5lxgiPizBTmDDKPgcMYkK_rjqOdFkXhtvFntsVTYj9zRgeWhICjSJVpUm2VDhlauaYWkBwNGbESG4939d_i1BSbRCUcJMZpToouplnqM_XSvB3oCwKcoYgW1iUB8nRhlwYg3U) to help develop React 18 with features like Concurrency support, automatic batching for fewer renders, Server-Side Rendering for Suspense and many more. We also engaged with the community further and had a blast sharing some of the fantastic work that the community has done at [ReactConf 2021](https://l.facebook.com/l.php?u=https%3A%2F%2Fconf.reactjs.org%2F&h=AT28ketFNjs9Ax425iYAf0DuTpjXaizh8thBG8ae-S9ltvX9BOsY_vsagv_jTmQ9y3kPfOSzCtCHc7lYvTc40IRj9aqfm-gtF5ZVjbXqAkV3LQfEA1w8xswkOrKHyulRpEJt1msd_G0LSuRFf3Tl8eHSb_w89I9Sbo2TizXy1gE). We launched a new [React Docs website](https://l.facebook.com/l.php?u=https%3A%2F%2Fbeta.reactjs.org%2F&h=AT2MZqcrLSpVgNmbHCV7NdHXLfrdz2hvTaqRP-dDvlA-pKOgBAcDXED_cnDRSEpcRPAgAwcg9_hqmEwm-SxHZTlxGpV9ujr8ykIvQzvboRuEHsrFkqyc0InTDRdWi26iwl69YLCKqrIh4_FyiwcCTN63qieGsZhjlQO2r1_Ku6c), designed around the learning experience, to help folks learn React more efficiently.

We also launched a new [React Labs video series](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DrVpMhn5CafM&h=AT3oapHWA302mB9fM8ex1n-UFMlUnAAHjHrgZKCRXaUX_NQHlVqH1NkgHt84QJ8GxYEXGtPIdeiSavqBALLAcavf9vdTVGQs8uvacO_ddYQbiqLVfaMM2YI0RHFleUuHTQ889aK_j8hRkXjXoyh9uRzPYdieAUqqWgD7E4mlCQc) to share ongoing research and development done by the React team. As part of this series, we did several Q/A sessions about the [React Server Components](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FjK0Vg8XbIXk&h=AT2uR3CSLhf1Q9DO_xGBjEnepUQMEoUi7ke_IgTVUjghebJv6AdaWOMvNr7kldE2bkLL1L6cGvvpocfrvGzvEz0B1mVlKOVBN1T8mFMl8u6jlytn_GfMF1_fovUaAmXXvMn0vUb27NBdIgVY4Dr07FGlDCRjNjRxbfI17OnhTu0) and [updates for React 18](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FF4YjkMqTgao&h=AT39lZygzSIliylfbAodgRr9hJxDnsxV8g74bTryHZoWm-12Tvb9uFLu3k-l7Xk92Qgoco4IYuvlwJG2G1tyZkcF72QXuLOcwrpxHJTyL5kOPCXM6tfefnUAv5zGoC3Sq0SlIxSxawf5BSMjCmuCF1lmUK1zV9mKwoTPidEPam8).

To further evolve the web tooling space, we made significant improvements to Relay, a JavaScript framework for fetching and managing GraphQL data in React applications. In March 2021, we [introduced Relay Hooks](https://developers.facebook.com/blog/post/2021/03/09/introducing-relay-hooks-improved-react-apis-relay/), a new, more developer-friendly Relay API built using [React Hooks](https://l.facebook.com/l.php?u=https%3A%2F%2Freactjs.org%2Fdocs%2Fhooks-intro.html&h=AT1xr6772J78WXVoHvVF1GjpK9uDIcNrDyoGz4vfyd_t47qK3rc1fPN0E6GD0mB8CvojJ15HkxVZH1XmsUqYOdY9g3he4HQTaKfhXsquQ1cRrhMzyKv0F5QCkOQfF86uNls4sudZzrc3FXwk1ymoUPp8du_4gmjC1yjALhzJDfC4YLCQxLKezffR). This latest iteration of Relay aims to improve developer experience significantly, have better type-safety with greater coverage and avoid error-prone tasks like re-fetch queries.

**AI/ML**

Open datasets and benchmarks have been key drivers of recent advances across AI. To promote open and collaborative research for more languages worldwide, Meta AI released datasets for [multilingual speech research](https://ai.facebook.com/blog/a-new-open-data-set-for-multilingual-speech-research/), two datasets for semantic parsing in [conversational AI](https://ai.facebook.com/blog/democratizing-conversational-ai-systems-through-new-data-sets-and-research/) and the most extensive [multilingual speech corpus](https://ai.facebook.com/blog/voxpopuli-the-largest-open-multilingual-speech-corpus-for-ai-translation-and-more/) for AI translation.

Last year, Meta AI researchers went beyond text by training [NLP models directly on raw](https://ai.facebook.com/blog/textless-nlp-generating-expressive-speech-from-raw-audio/), [unannotated audio signals](https://ai.facebook.com/blog/textless-nlp-generating-expressive-speech-from-raw-audio/), making AI more inclusive and able to model a wider variety of languages. Meta AI also has open-sourced [Blender Bot 2.0](https://ai.facebook.com/blog/blender-bot-2-an-open-source-chatbot-that-builds-long-term-memory-and-searches-the-internet/) that can remember conversations over weeks and months, and generate contextual internet search queries while responding to people's questions and comments.

We also shared new research on how we teach AI to perceive the [world through our eyes](https://ai.facebook.com/blog/teaching-ai-to-perceive-the-world-through-your-eyes/) (and perspectives) instead of from the sidelines, to help [robots understand touch](https://ai.facebook.com/blog/teaching-robots-to-perceive-understand-and-interact-through-touch/), and a simulator to train [home assistant robots](https://ai.facebook.com/blog/habitat-20-training-home-assistant-robots-with-faster-simulation-and-new-benchmarks/).

It's truly exciting that all of this cutting-edge research is powered by PyTorch, a popular open source machine learning library. As the biggest contributor to PyTorch, Meta continues to evolve the project with almost 400 contributors who pushed out two new PyTorch releases ([1.8](https://l.facebook.com/l.php?u=https%3A%2F%2Fpytorch.org%2Fblog%2Fpytorch-1.8-released%2F&h=AT3LHzlsdYWAxubVG8mOlMfV25bo02DcUOY6_uv0hB-D1MYecP1xcmAbDECB0urLInQTqtwcHr1RqYKTHUismhQ-IMdusJ54mRyVb4e7PV8pykkH35hdxqxxOWEzDdMIJwnkGOlvFSdMjbzu0p30bVKeI8PEiNVmO90F-gw19-c), [1.9](https://l.facebook.com/l.php?u=https%3A%2F%2Fpytorch.org%2Fblog%2Fpytorch-1.9-released%2F&h=AT3zkOhvlg4pClbCk7RvtCkv3rxK2pj8xm1r7_rbYT_6era0iSvYS_DwU6CwBFZMioixKADF7SLWtCQfJcUvfVMoSuPt3nqb8Su0h6vy2t8vA1U64jK5zEQKJt1cFGAMMfUYzYE9yJ7JrLcQ6XFBUg6uSFdyI400fgpELyw6fAA-OFpEhtXlN_EL) and [1.10](https://l.facebook.com/l.php?u=https%3A%2F%2Fpytorch.org%2Fblog%2Fpytorch-1.10-released%2F&h=AT1DOLyNBtWmqKDimG1UKNaWcOGoT2xcVCvJBS9q7Aju1U-SoLgo6Jyr_BysCIy9la9QpjAGvdygt-ToCUluOWQqJjOt-Dlc6iLtxWPdcA0wpVN6BSdIVEf3pFhVavZ5YGVi_HZ6WIeUl_o273LD0HtssKuDXte88y_bSrqHQHo)) last year, improving support for distributed training, scientific computing, edge computing and inference performance. To engage with the open source audience, the PyTorch team hosted [Ecosystem Day](https://l.facebook.com/l.php?u=https%3A%2F%2Fpytorch.org%2Fblog%2Fecosystem-day-2021-recap%2F&h=AT3p_LGUYjRNIw7ALaKsHauC0hw6lWwBYDFaOsvrRw6R0KeWzvNUIqsXzYtfu1viUHfhdTZRoVywP_UlDucwgPp3f3I0LM4yIIMgMk9hkFVc8z4JzWakcg3DodkCYghPwOgQhL5flYlTicjfnY3tXFRZuDbmtoU5xbNjyQwpOLc) and [Developer Day](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DvXbbaEZbrOI&h=AT0S5k3rxTuZBajUi1iuF4p436urJg9JtthuAQih_6MJD5Uok_w5UrAa6dt-5tWyYfQ-Dy1gqdr_F_ieVNjOsdHAX38Wb3W6Bc3q7YSlphUuu5P3ZqLVwvd_DogIdD5nxr1dM2d1cJHggs4ygm3KcQLTnfELUk5djnTp8QPQgFg), where community members met online, engaging in technical talks at the cutting edge of Machine Learning, deep dives into ML projects and discussing the latest and greatest of PyTorch. The PyTorch Developer Advocate team led by Suraj Subramanian also launched [PyTorch Community Voices](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fplaylist%3Flist%3DPL_lsbAsL_o2D9gCMeAK89MD02E6sBeHMi&h=AT0xpezjIth4gl4r1B-cmsVRPZjzCNtex1V436X-e5dYP0Cb6tTLgvEmyVYGi8OrgZdj0wnerIl6vTb1TXmpNoCa48A5D3jLhrK1iHIrx7NVljT3aetksM01sYrgQXiOpwTVMCUouiu3uQnsTGeBkhgzFJre9qVwukZKLmVovZg), a weekly live chat show on YouTube. This new series highlighted external contributors who presented their PyTorch-based projects and shared their use of AI to tackle diverse problems ranging from healthcare imaging, deep learning for time series and libraries that improve developer productivity.

</br>

* * * * *

</br>

We at Meta Open Source believe that open source accelerates the pace of innovation in the world. By sharing our research, code and designs with others, we're moving the industry forward while helping other companies and individuals scale more quickly and build great products.

We are very thankful to our worldwide community, who came together to contribute their efforts and time creating and growing open source technologies that anyone can freely use and contribute to. We look forward to working with everyone in the years to come.

To learn more about Meta Open Source, visit our [website](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT2nJHnDVVR-_G8-5erwNOi2kBWPWNZGdRk-nXwjOB-Y04T3oz7KiMm9zKAbBzNZdZCeNCOZejRQ1QSQK6cgOuZj3_kBj-koZohWKOeM-wtQKvr4oeibKmN3acfVc_rU5f0yV0Fz6frtfkNOqefSDOkQjw_dRB67hEaGTy4Z3I4), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FmetaOpenSource&h=AT0eRHPSUK_ml-jnZWA0pNUO5iTjgWSbSPlTlJhJUn2RkoDYhCrPZuHmZWYvikuFnkaJGRzz3Dig0M-JqB2dKCn403koKYZy8LWnWBRErVz_iTR6Hox0ZstNWiZQ5bjW7_6e0oIvdLCGKp6Tb_shc6AOit1fRtse-9SjJvY2A7c) and [Facebook](https://www.facebook.com/MetaOpenSource).`},{title:"Visual Regression Testing: A Critical Part of a Mobile Testing Strategy",description:"Despite our best efforts to replicate customers` behavior in our test automation suites, teams often forget about nonfunctional requirements.",date:"2019-04-15",tags:["ui","testing"],slug:"/articles/2019/visual-regression-testing/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/articles_2019_visual-regression-testing_2d513a77.jpg",canonicalUrl:"https://www.techwell.com/techwell-insights/2019/04/visual-regression-testing-critical-part-mobile-testing-strategy",body:`*By Dmitry Vinnik*

*Originally posted [here](https://www.techwell.com/techwell-insights/2019/04/visual-regression-testing-critical-part-mobile-testing-strategy).*

As a child, did you ever play spot the difference---spending hours trying to find how two pictures differ from one another?

Now imagine doing this with thousands of mobile devices, looking for visual disparities in your app. At some point this game becomes impossible to play, especially at the scale of the modern mobile market.

In the QA community, functional testing has become a must-have activity. Every major software project has a test automation suite to validate the most common scenarios customers might perform in the production.

Unfortunately, despite our best efforts to replicate customers' behavior in these automation suites, teams often forget about nonfunctional requirements. An important one is visual perception---how users see and feel each application they use.

Let's say we have a mobile app where to access user settings, a customer needs to click on the Settings icon in the top right corner. To replicate this scenario, we have a functional test to find that Settings icon by selectors, press on the icon, and validate that the expected window pops up.

What do you think was the most nuanced phrase in the above scenario? "Find that icon by selectors." Your customers do not use selectors when pressing a button, typing text, or dismissing a popup. If your users don't see a button, they can't push on it, right?

This situation is especially widespread in the mobile industry for a variety of reasons, including screen dimension differences among devices. If you had only ever tested your application on an iPhone X, but your customer tried to use an iPhone 3 with a much smaller screen, there is a chance that the user settings icon got pushed away from the screen so that nobody could press it.

This scenario demonstrates the importance of visual testing in filling a significant gap in user experience expectations. With more operating systems, form factors, and mobile devices available on the market, customers expect their favorite app to work on both mobile and web, with no difference in how the application looks or feels.

If---or, better, when---you're interested in visual testing, there are a few easy ways to get started.

Every team can begin by building on top of their functional test suite. For example, if you have Selenium WebDriver automation, your team can enhance existing validation by targeting individual CSS values. To take it to the next level, Selenium can be used to control the width of the browser to account for different platforms like mobile, desktop, or table.

After making the first step with CSS validation, you can move on to screenshot testing. There are tools that let users start with visual testing in a matter of minutes while offering a scalable solution to store and manage test artifacts, whether in a configuration-driven setup or by building on top of existing test infrastructure.

It will not take long for you and your team to notice a difference in how many visual regressions you catch internally versus what comes from your users. Whatever way you choose to get started with visual testing, it is all a matter of taking the first step.

*Dmitry Vinnik is presenting the session [Visual Regression Testing: A Critical Part of a Mobile Testing Strategy](https://stareast.techwell.com/program/concurrent-sessions/visual-regression-testing-critical-part-mobile-testing-strategy-stareast-2019) at the [STAREAST](https://stareast.techwell.com/) 2019 conference, April 28--May 3 in Orlando, Florida.*`}],c=[{title:"Explain Like I’m 5: MMF",description:"In this video, Meta Open Source Developer Advocate Dmitry explains MMF, Meta AI’s go-to deep learning framework for vision and language multimodal research.",date:"2022-11-17",tags:["open source","AI-ML","eli5"],slug:"/videos/2022/eli5-mmf/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2022_eli5-mmf_6fd730d5.jpg",youtubeUrl:"https://www.youtube.com/watch?v=mHeWYQqafjY",body:`**Title**

Explain Like I’m 5: MMF

**Recording**

**Video Information**

In this video, Meta Open Source Developer Advocate Dmitry explains MMF, Meta AI’s go-to deep learning framework for vision and language multimodal research.

MMF (Multimodal Framework) is an open source modular framework for vision and language multimodal research. It provides reusable components for building multimodal models and supports tasks like visual question answering, image captioning, and visual dialog.

`},{title:"Building End-to-End Experiences with the WhatsApp Business Platform",description:"In this webinar you’ll learn to see how quickly you can get started with the WhatsApp Business Platform Cloud API.",date:"2022-10-19",tags:["business messaging"],slug:"/videos/2022/building-e2e-experiences-with-whatsapp/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2022_building-e2e-experiences-with-whatsapp_439764d0.jpg",youtubeUrl:"https://www.youtube.com/watch?v=KP6_BUw3i0U",body:`**Title**

Building End-to-End Experiences with the WhatsApp Business Platform

**Recording**

**Video Information**

In this webinar you’ll learn to see how quickly you can get started with the WhatsApp Business Platform Cloud API. In this session, Developer Advocate Dmitry Vinnik covers building an end-to-end messaging experience. He details both sending and receiving messages with customers. 

If you're looking for ways to connect with your customers using the messaging apps they’re already using with their friends and family – watch today.

00:00 Introduction
03:06 Getting Started with WhatsApp Business Platform and Cloud API
11:05 Creating an App with WhatsApp Business API
21:04 Facilitating Customer Interactions with Webhooks
32:27 Q&A`},{title:"Explain Like I’m 5: Haxl",description:"In this video, Meta Open Source Developer Advocate Dmitry explains Haxl, a Haskell library for efficient data access ranging from databases to web-based services.",date:"2022-10-12",tags:["open source","infra","eli5"],slug:"/videos/2022/eli5-cachelib/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2022_eli5-cachelib_d6f9add5.jpg",youtubeUrl:"https://www.youtube.com/watch?v=91QljrFmAgk",body:`**Title**

Explain Like I’m 5: Haxl

**Recording**

**Video Information**

In this video, Meta Open Source Developer Advocate Dmitry explains Haxl, a Haskell library for efficient data access ranging from databases to web-based services.

CacheLib is an open source caching engine built and used at Meta to power key services, handling trillions of cache lookups per day. It provides a C++ library for building and scaling high-performance caches with support for both DRAM and flash-based caching.

`},{title:"Explain Like I’m 5: CacheLib",description:"In this video, Meta Open Source Developer Advocate Dmitry Vinnik explains CacheLib, an open source, pluggable in-process caching engine.",date:"2022-10-04",tags:["open source","infra","eli5"],slug:"/videos/2022/eli5-haxl/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2022_eli5-haxl_bba66630.jpg",youtubeUrl:"https://www.youtube.com/watch?v=91QljrFmAgk",body:`**Title**

Explain Like I’m 5: CacheLib

**Recording**

**Video Information**

In this video, Meta Open Source Developer Dmitry Vinnik explains CacheLib, an open source, pluggable in-process caching engine that Meta has used in over 70 large-scale systems to build and scale high-performance services collaboratively. CacheLib can help you balance the fast experience people have come to expect from caching while keeping systems highly performant and cost-effective.`},{title:"Explain Like I’m 5: PPL Bench",description:"In this video, Meta Open Source Developer Advocate Dmitry explains PPL Bench, an evaluation framework for probabilistic programming languages.",date:"2022-03-23",tags:["open source","AI-ML","eli5"],slug:"/videos/2022/eli5-pplbench/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2022_eli5-pplbench_4511076f.jpg",youtubeUrl:"https://www.youtube.com/watch?v=AEYJ1bvcd1Q",body:`**Title**

Explain Like I’m 5: PPL Bench

**Recording**

**Video Information**

In this video, Meta Open Source Developer Advocate Dmitry explains PPL Bench, an evaluation framework for probabilistic programming languages.

PPL Bench is an open source benchmark framework for evaluating probabilistic programming languages (PPLs). It helps researchers and developers compare the performance and accuracy of different PPL implementations across a variety of statistical models.

`},{title:"Explain Like I’m 5: Create React App",description:"In this video, Meta Open Source Developer Advocate Dmitry Vinnik explains Create React App, an open source project that lets you set up a React web app by running just one command.",date:"2022-03-16",tags:["open source","web","eli5"],slug:"/videos/2022/eli5-create-react-app/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2022_eli5-create-react-app_9471fc27.jpg",youtubeUrl:"https://www.youtube.com/watch?v=rPpubq2c49M",body:`**Title**

Explain Like I’m 5: Create React App

**Recording**

**Video Information**

In this video, Meta Open Source Developer Advocate Dmitry Vinnik explains Create React App, an open source project that lets you set up a React web app by running just one command.

Create React App is an officially supported way to create single-page React applications with zero build configuration. It sets up a modern web development environment with Webpack, Babel, ESLint, and other tools so developers can focus on writing code.

`},{title:"Explain Like I’m 5: Glean",description:"In this video, Meta Open Source Developer Advocate Dmitry Vinnik explains Glean, an open source system for collecting, deriving and querying facts about source code.",date:"2022-03-09",tags:["open source","infra","eli5"],slug:"/videos/2022/eli5-glean/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2022_eli5-glean_94851ae5.jpg",youtubeUrl:"https://www.youtube.com/watch?v=pF60pOCkHoE",body:`**Title**

Explain Like I’m 5: Glean

**Recording**

**Video Information**

In this video, Meta Open Source Developer Advocate Dmitry explains Glean, an open source system for collecting, deriving and querying facts about source code.

Glean is an open source system for collecting, storing, and accessing structured data about code. Built at Meta, it enables code search, navigation, and analysis at scale across massive codebases.

`},{title:"Explain Like I’m 5: Bean Machine",description:"In this video, Meta Open Source Developer Advocate Dmitry Vinnik explains Bean Machine, a universal probabilistic programming language that enables fast and accurate Bayesian analysis.",date:"2022-02-23",tags:["open source","AI-ML","eli5"],slug:"/videos/2022/eli5-bean-machine/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2022_eli5-bean-machine_4343ba43.jpg",youtubeUrl:"https://www.youtube.com/watch?v=XvrtH8xVXU0",body:`**Title**

Explain Like I’m 5: Bean Machine

**Recording**

**Video Information**

In this video, Meta Open Source Developer Advocate Dmitry Vinnik explains Bean Machine, a universal probabilistic programming language that enables fast and accurate Bayesian analysis.

Bean Machine is an open source probabilistic programming language built on top of PyTorch. It makes it easy to represent and perform inference over generative probabilistic models, enabling Bayesian analysis for complex real-world problems.

`},{title:"Explain Like I’m 5: ComponentKit for UI Code Generation on iOS",description:"In this video, Meta Open Source Developer Advocate Dmitry Vinnik explains ComponentKit, a declarative UI framework for iOS.",date:"2022-02-16",tags:["open source","mobile","eli5"],slug:"/videos/2022/eli5-componentkit/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2022_eli5-componentkit_491f53c2.jpg",youtubeUrl:"https://www.youtube.com/watch?v=6-epJDXcbLE",body:`**Title**

Explain Like I’m 5: ComponentKit for UI Code Generation on iOS

**Recording**

**Video Information**

In this video, Meta Open Source Developer Advocate Dmitry Vinnik explains ComponentKit, a declarative UI framework for iOS.

ComponentKit is a declarative, data-driven UI framework for iOS built by Meta. It uses a functional approach to building UI components, making it easier to build and maintain complex, high-performance interfaces on iOS.

`},{title:"Explain Like I`m 5: React DevTools",description:"In this video, Meta Open Source Developer Advocate Dmitry Vinnik explains React DevTools, browser extensions for Meta’s open source JavaScript library for UI.",date:"2022-02-09",tags:["open source","web","eli5"],slug:"/videos/2022/eli5-react-devtools/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2022_eli5-react-devtools_e8ae5f98.jpg",youtubeUrl:"https://www.youtube.com/watch?v=ToG0BMM6HTI",body:`**Title**

Explain Like I\`m 5: React DevTools

**Recording**

**Video Information**

In this video, Meta Open Source Developer Advocate Dmitry Vinnik explains React DevTools, browser extensions for Meta’s open source JavaScript library for UI.

React DevTools is a browser extension and standalone tool for inspecting and debugging React component hierarchies. It lets developers examine props, state, hooks, and the component tree to diagnose issues and optimize performance.

`},{title:"Explain Like I`m 5: Stetho",description:"In this video, Meta Open Source Developer Advocate Dmitry Vinnik explains Stetho, a debug bridge for Android applications.",date:"2022-02-02",tags:["open source","mobile","eli5"],slug:"/videos/2022/eli5-stetho/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2022_eli5-stetho_649060fd.jpg",youtubeUrl:"https://www.youtube.com/watch?v=QfDjhakiRho",body:`**Title**

Explain Like I\`m 5: Stetho

**Recording**

**Video Information**

In this video, Meta Open Source Developer Advocate Dmitry Vinnik explains Stetho, a debug bridge for Android applications.

Stetho is an open source debug bridge for Android applications, developed by Meta. It gives developers access to Chrome DevTools features natively for their Android apps, including network inspection, database inspection, and view hierarchy exploration.

`},{title:"Explain Like I`m 5: Recoil",description:"In this video, Meta Open Source Developer Advocate Dmitry Vinnik explains Recoil, an experimental state management library for React apps.",date:"2022-01-26",tags:["open source","web","eli5"],slug:"/videos/2022/eli5-recoil/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2022_eli5-recoil_e1063f6c.jpg",youtubeUrl:"https://www.youtube.com/watch?v=U9XStcquQyY",body:`**Title**

Explain Like I\`m 5: Recoil

**Recording**

**Video Information**

In this video, Meta Open Source Developer Advocate Dmitry Vinnik explains Recoil, an experimental state management library for React apps.

Recoil is an experimental state management library for React applications. It provides a minimal and flexible API for managing shared state with features like derived data, asynchronous queries, and fine-grained re-rendering.

`},{title:"Explain Like I`m 5: Relay",description:"In this video, Meta Open Source Developer Advocate Dimitri Vinnik, explains Relay, Meta’s GraphQL client built to scale.",date:"2021-12-08",tags:["open source","web","eli5"],slug:"/videos/2021/eli5-relay/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-relay_20dc06e7.jpg",youtubeUrl:"https://www.youtube.com/watch?v=A4POd93GI_I",body:`**Title**

Explain Like I\`m 5: Relay

**Recording**

**Video Information**

In this video, Meta Open Source Developer Advocate Dmitry Vinnik, explains Relay, Meta’s GraphQL client built to scale.

Relay is a JavaScript framework for building data-driven React applications, powered by GraphQL. It handles fetching, caching, and updating data with optimized performance and automatic consistency across the UI.

[Relevant Article Link]()`},{title:"Explain Like I`m 5: React",description:"In this video, Facebook Open Source Developer Advocate Dmitry explains React, Facebook’s open-source JavaScript library used for building interactive user interfaces on websites or apps.",date:"2021-10-13",tags:["open source","web","eli5"],slug:"/videos/2021/eli5-react/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-react_138f8fd1.jpg",youtubeUrl:"https://www.youtube.com/watch?v=cCJryKPNqyY",body:`**Title**

Explain Like I\`m 5: React

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry explains React, Facebook’s open-source JavaScript library used for building interactive user interfaces on websites or apps. 

React is an open source JavaScript library for building user interfaces, created at Meta. It uses a component-based architecture and a virtual DOM to efficiently render dynamic UIs, and is one of the most widely adopted frontend frameworks in the world.

[Relevant Article Link]()`},{title:'"Explain Like I`m 5" Series: Season 3 Launch',description:"In this video, Facebook Open Source Developer Advocate Dmitry announces the third season of our short-format video series, Explain Like I’m 5 (ELI5).",date:"2021-09-28",tags:["open source","eli5"],slug:"/videos/2021/eli5-season3/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-season3_0a6cc53d.jpg",youtubeUrl:"https://www.youtube.com/watch?v=w0weu2Y8I_A",body:`**Title**

"Explain Like I\`m 5" Series: Season 3 Launch

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry Vinnik announces the third season of our short-format video series, Explain Like I’m 5 (ELI5). 

The ELI5 (Explain Like I'm 5) video series features short, accessible explainers about open source projects. Season 3 continues the tradition of breaking down complex technologies into easy-to-understand, one-minute videos.

[Relevant Article Link]()`},{title:'"Explain Like I`m 5" Series: Season 2 Wrap-up',description:"In this video, Facebook Open Source Developer Advocate Dmitry Vinnik announces ending of the second season of our short-format video series, Explain Like I’m 5 (ELI5).",date:"2021-08-25",tags:["open source","eli5"],slug:"/videos/2021/eli5-season2-end/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-season2-end_38800cd0.jpg",youtubeUrl:"https://www.youtube.com/watch?v=NpB1TjxxdTo",body:`**Title**

"Explain Like I\`m 5" Series: Season 2 Wrap-up

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry Vinnik announces ending of the second season of our short-format video series, Explain Like I’m 5 (ELI5).

The ELI5 (Explain Like I'm 5) video series features short, accessible explainers about open source projects. This wrap-up recaps the highlights and projects covered throughout Season 2.

`},{title:"Explain Like I`m 5: Magma",description:"In this video, Facebook Open Source Developer Advocate Dmitry explains the open source Magma",date:"2021-08-18",tags:["open source","infra","eli5"],slug:"/videos/2021/eli5-magma/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-magma_044f05b7.jpg",youtubeUrl:"https://www.youtube.com/watch?v=Iv6t8mUMg8I",body:`**Title**

Explain Like I'm 5: Magma

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry explains the open source project Magma in a little over a minute.

Magma is an open source platform for building and deploying mobile networks. It provides automation tools for network management, making it easier for operators to deploy cellular networks quickly and cost-effectively, especially in underserved areas.

`},{title:"Explain Like I`m 5: Spectrum",description:"In this video, Facebook Open Source Developer Advocate Dmitry explains the open source project Spectrum.",date:"2021-07-28",tags:["open source","mobile","eli5"],slug:"/videos/2021/eli5-spectrum/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-spectrum_5f81e040.jpg",youtubeUrl:"https://www.youtube.com/watch?v=kEHZJ4CvyeI",body:`**Title**

Explain Like I'm 5: Spectrum

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry explains the open source project Spectrum in a little over a minute.

Spectrum is an open source image processing library for mobile platforms, built at Meta. It provides a simple API for transcoding, resizing, and transforming images efficiently on Android and iOS devices.

[Relevant Article Link]()`},{title:"Explain Like I`m 5: IGListKit",description:"In this video, Facebook Open Source Developer Advocate Dmitry explains the open source project IGListKit.",date:"2021-07-21",tags:["open source","mobile","eli5"],slug:"/videos/2021/eli5-iglistkit/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-iglistkit_f249e7cf.jpg",youtubeUrl:"https://www.youtube.com/watch?v=3-WwZaiuJ3g",body:`**Title**

Explain Like I'm 5: IGListKit

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry explains the open source project IGListKit in a little over a minute.

IGListKit is an open source data-driven UICollectionView framework for building fast and flexible lists on iOS. Built by Instagram, it provides a diffing algorithm that calculates minimal updates for smooth, performant list rendering.

[Relevant Article Link]()`},{title:"Explain Like I`m 5: Metro",description:"In this video, Facebook Open Source Developer Advocate Dmitry explains the open source project Metro in a little over a minute.",date:"2021-07-14",tags:["open source","web","eli5"],slug:"/videos/2021/eli5-metro/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-metro_a174a7de.jpg",youtubeUrl:"https://www.youtube.com/watch?v=E13sgMCODDk",body:`**Title**

Explain Like I'm 5: Metro

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry explains the open source project Metro in a little over a minute.

Metro is the JavaScript bundler used by React Native. It compiles and bundles JavaScript code and assets for mobile applications, providing fast incremental builds and support for the React Native module system.

[Relevant Article Link]()`},{title:"Explain Like I`m 5: Folly",description:"In this short video, Facebook Open Source Developer Advocate Dmitry Vinnik explains the open source project Folly, an open-source C++ library developed and used at Facebook.",date:"2021-04-14",tags:["open source","infra","eli5"],slug:"/videos/2021/eli5-folly/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-folly_9fefa2dc.jpg",youtubeUrl:"https://www.youtube.com/watch?v=Wr_IfOICYSs",body:`**Title**

Explain Like I'm 5: Folly

**Recording**

**Video Information**

In this short video, Facebook Open Source Developer Advocate Dmitry Vinnik explains the open source project Folly, an open-source C++ library developed and used at Facebook. 

Folly (Facebook Open Source Library) is an open source C++ library developed and used at Meta. It provides high-performance components and utilities that complement the C++ standard library, including data structures, string utilities, and concurrency primitives.

[Relevant Article Link]()`},{title:"MLH Fellowship x Facebook Open Source Q&A",description:"In this video, Open Source and Developer Advocate experts answer the questions of fellows from the MLH Fellowship Spring 2021 season of the program.",date:"2021-03-30",tags:["open source"],slug:"/videos/2021/mlh-fellowship-qa/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_mlh-fellowship-qa_d35d3db7.jpg",youtubeUrl:"https://www.youtube.com/watch?v=d1XwRIKz15Q",body:`**Title**

MLH Fellowship x Facebook Open Source Q&A

**Recording**

**Video Information**

In this video, Open Source and Developer Advocate experts answer the questions of fellows from the MLH Fellowship Spring 2021 season of the program.

The Facebook Open Source team has partnered with Major League Hacking (MLH) for the MLH Fellowship program: a 12-week remote fellowship designed to host, mentor, and support developers to hack on Facebook and external open source projects.`},{title:"Explain Like I`m 5: Open Source",description:"In this video, Facebook Open Source Developer Advocate Dmitry Open Source in a way that is easy to understand.",date:"2021-03-17",tags:["open source","eli5"],slug:"/videos/2021/eli5-open-source/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-open-source_921980ac.jpg",youtubeUrl:"https://www.youtube.com/watch?v=Oxtpvy7TwIw",body:`**Title**

Explain Like I'm 5: Open Source

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry Vinnik explains Open Source in a way that is easy to understand. 

Open source software is code that is publicly available for anyone to view, modify, and distribute. Meta is one of the largest contributors to open source, maintaining hundreds of projects used by millions of developers worldwide.

[Relevant Article Link]()`},{title:'"Explain Like I`m 5" Series: Season 2 Launch',description:"In this video, Facebook Open Source Developer Advocate Dmitry announces the second season of our short-format video series, Explain Like I’m 5 (ELI5).",date:"2021-03-09",tags:["open source","eli5"],slug:"/videos/2021/eli5-season2/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-season2_8225e0e9.jpg",youtubeUrl:"https://www.youtube.com/watch?v=-bA9IsyzAXk",body:`**Title**

"Explain Like I\`m 5" Series: Season 2 Launch

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry Vinnik announces the second season of our short-format video series, Explain Like I’m 5 (ELI5). 

The ELI5 (Explain Like I'm 5) video series features short, accessible explainers about open source projects. Season 2 expands the series with new projects and continues making complex technologies approachable for everyone.

[Relevant Article Link]()`},{title:"Explain Like I`m 5: Ent",description:"In this video, Facebook Open Source Developer Advocate Dmitry explains Ent, an entity framework for Go.",date:"2021-03-03",tags:["open source","golang","eli5"],slug:"/videos/2021/eli5-ent/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-ent_b5c2caa5.jpg",youtubeUrl:"https://www.youtube.com/watch?v=RCzeYg-_dbU",body:`**Title**

Explain Like I'm 5: Ent

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry explains Ent, an entity framework for Go, in 60 seconds.

Ent is an open source entity framework for Go, developed at Meta. It provides a simple API for modeling, querying, and manipulating graph-structured data with type-safe code generation and built-in support for graph traversals.

[Relevant Article Link]()`},{title:"Explain Like I`m 5: Watchman",description:"In this video, Facebook Open Source Developer Advocate Dmitry explains Watchman, a file watching service.",date:"2021-03-03",tags:["open source","infra","eli5"],slug:"/videos/2021/eli5-watchman/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-watchman_33adf9f4.jpg",youtubeUrl:"https://www.youtube.com/watch?v=gEsTMR2erAM",body:`**Title**

Explain Like I'm 5: Watchman

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry explains Watchman, a file watching service, in 60 seconds.

Watchman is an open source file watching service developed at Meta. It monitors file changes in real time and triggers actions when files are modified, making it essential for build systems and development workflows.

[Relevant Article Link]()`},{title:"Explain Like I`m 5: Buck",description:"In this video, Facebook Open Source Developer Advocate Dmitry explains  Buck, a build system.",date:"2021-02-17",tags:["open source","infra","eli5"],slug:"/videos/2021/eli5-buck/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-buck_d7976c39.jpg",youtubeUrl:"https://www.youtube.com/watch?v=TX29-Edcnpg",body:`**Title**

Explain Like I'm 5: Buck

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry explains Buck, a build system, in 60 seconds.

Buck is an open source build system developed at Meta. It encourages the creation of small, reusable modules and supports multiple languages and platforms, providing fast parallel builds with intelligent caching.

[Relevant Article Link]()`},{title:"Explain Like I`m 5: Infer",description:"In this video, Facebook Open Source Developer Advocate Dmitry explains Infer, a static analysis tool.",date:"2021-02-03",tags:["open source","infra","eli5"],slug:"/videos/2021/eli5-infer/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-infer_21980159.jpg",youtubeUrl:"https://www.youtube.com/watch?v=swrmPTJAGqQ",body:`**Title**

Explain Like I'm 5: Infer

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry explains Infer, a static analysis tool, in 60 seconds.

Infer is an open source static analysis tool developed at Meta. It detects bugs in Java, C, C++, and Objective-C code before it ships, catching issues like null pointer exceptions, resource leaks, and thread safety violations.

[Relevant Article Link]()`},{title:"Explain Like I`m 5: Litho",description:"In this video, Facebook Open Source Developer Advocate Dmitry explains Litho, a declarative UI framework for Android.",date:"2021-01-20",tags:["open source","mobile","eli5"],slug:"/videos/2021/eli5-litho/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2021_eli5-litho_09ae37b9.jpg",youtubeUrl:"https://www.youtube.com/watch?v=RFI-fuiMRK4",body:`**Title**

Explain Like I'm 5: Litho

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry explains Litho, a declarative UI framework for Android, in 60 seconds.

Litho is an open source declarative UI framework for Android, built at Meta. It uses a component-based approach with asynchronous layout to build efficient, scrollable UIs with flat view hierarchies and optimized memory usage.

[Relevant Article Link]()`},{title:"Explain Like I`m 5: Yoga",description:"In this video, Facebook Open Source Developer Advocate Dmitry explains Yoga, a cross-platform layout engine.",date:"2020-12-16",tags:["open source","mobile","eli5"],slug:"/videos/2020/eli5-yoga/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2020_eli5-yoga_0ae957d7.jpg",youtubeUrl:"https://www.youtube.com/watch?v=tHgoA6zBib0",body:`**Title**

Explain Like I'm 5: Yoga

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry explains Yoga, a cross-platform layout engine, in 60 seconds.

Yoga is an open source cross-platform layout engine developed at Meta. It implements Flexbox, enabling consistent layouts across different platforms including Android, iOS, and the web with a unified API.

[Relevant Article Link]()`},{title:"Explain Like I`m 5: Docusaurus",description:"In this video, Facebook Open Source Developer Advocate Dmitry explains Docusaurus, a website building tool",date:"2020-11-25",tags:["open source","productivity","eli5"],slug:"/videos/2020/eli5-docusaurus/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2020_eli5-docusaurus_44352baa.jpg",youtubeUrl:"https://www.youtube.com/watch?v=_An9EsKPhp0",body:`**Title**

Explain Like I'm 5: Docusaurus

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry explains Docusaurus, a website building tool, in 60 seconds.

Docusaurus is an open source static site generator built by Meta, optimized for creating documentation websites. It provides features like versioning, i18n, search, and Markdown support out of the box, making it easy to maintain project documentation.

[Relevant Article Link]()`},{title:"Explain Like I`m 5: Fresco",description:"In this video, Facebook Open Source Developer Advocate Dmitry explains Fresco, an Android image library",date:"2020-10-28",tags:["open source","mobile","eli5"],slug:"/videos/2020/eli5-fresco/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2020_eli5-fresco_50334081.jpg",youtubeUrl:"https://www.youtube.com/watch?v=XLwlGoxrg4M",body:`**Title**

Explain Like I'm 5: Fresco

**Recording**

**Video Information**

In this video, Facebook Open Source Developer Advocate Dmitry explains Fresco, an Android image library, in 60 seconds.

Fresco is an open source Android library for displaying and managing images, built at Meta. It handles image loading, caching, and display with support for animated GIFs and WebP, while efficiently managing memory on Android devices.

[Relevant Article Link]()`},{title:"Testing at Scale at Meta and Salesforce",description:"In this video, we discuss how the most basic testing skills and tools we use daily that are transferable to any company.",date:"2020-10-27",tags:["testing"],slug:"/videos/2020/testing-at-scale/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2020_testing-at-scale_2e682da6.jpg",body:`**Title**

Testing at Scale at Meta and Salesforce

**Recording**

[Link to the external site](https://applitools.com/event/testing-at-scale-at-meta-and-salesforce/)

**Video Information**

Do you ever worry that your testing skills are too limited for your company? Are you concerned that other organizations, especially the ones with a massive scale, require a completely different set of skills? Worry no more! 

This talk will look at how testing is done at companies with the scale of the likes of Salesforce and Meta. 
We will discuss how the most basic testing skills and tools we use daily that are transferable to any company.

[Link to the talk]()`},{title:"Introducing ELI5: Explain Like I`m 5 @FB Open Source",description:"In this video, Dmitry Vinnik, Developer Advocate for Facebook Open Source, introduces a new series of short videos about Facebook open source projects.",date:"2020-10-21",tags:["open source","eli5"],slug:"/videos/2020/introducing-eli5-series/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2020_introducing-eli5-series_8d00fe22.jpg",youtubeUrl:"https://www.youtube.com/watch?v=d9eyN4QpS6o",body:`**Title**

Introducing ELI5: Explain Like I'm 5 @FB Open Source

**Recording**

**Video Information**

In this video, Dmitry Vinnik, Developer Advocate for Facebook Open Source, introduces a new series of short videos about Facebook open source projects. A style in which this series is done is commonly known as ELI5: Explain Like I'm 5, but we apply it to the Facebook OSS.`},{title:"From Engineering to Developer Advocacy",description:"Sharing their stories and giving advice on how one can make the transition from engineering to devrel.",date:"2020-05-19",tags:["devrel"],slug:"/videos/2020/from-engineering-to-devrel/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2020_from-engineering-to-devrel_29c04e88.jpg",youtubeUrl:"https://www.youtube.com/watch?v=9c5j0fCh81c",body:`**Title**

From Engineering to Developer Advocacy

**Recording**

**Video Information**

From software engineers to developer advocates, Dmitry Vinnik and Joe Previte share their stories and give advice on how one can make the transition.`},{title:'"Ask me Anything" with Dmitry Vinnik',description:"In his premiere video, Dmitry Vinnik answers your questions in this AMA about his journey to Developer Advocacy, tips on work-life balance, and more!",date:"2020-04-28",tags:["devrel"],slug:"/videos/2020/ask-me-anything/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2020_ask-me-anything_ffaa7e19.jpg",youtubeUrl:"https://www.youtube.com/watch?v=uJUP2e1zZko",body:`**Title**

"Ask me Anything" with Dmitry Vinnik

**Recording**

**Video Information**

In his premiere video, Dmitry Vinnik answers your questions in this AMA about his journey to Developer Advocacy, tips on work-life balance, and more!

Subscribe and stay tuned for more AMAs from some of the other DAs at Facebook Open Source!`},{title:"Mobile Visual Testing: Uphill Battle of Mobile Visual Regression",description:"In this webinar, the audience will learn about major visual testing frameworks targeting both responsive web applications and native mobile applications.",date:"2018-07-11",tags:["mobile"],slug:"/videos/2018/mobile-visual-testing/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/videos_2018_mobile-visual-testing_b8c66fae.jpg",youtubeUrl:"https://www.youtube.com/watch?v=8YEDtyXQMAw",body:`**Title**

Mobile Visual Testing: Uphill Battle of Mobile Visual Regression

**Recording**

**Video Information**

There are many types of testing companies need to perform in order to have confidence in their product: security testing, integration testing, system testing, performance testing, and more. Often, mobile developers focus on ensuring that main end-to-end flows of their applications work by relying on frameworks like Appium or Robotium. 

However, in the mobile domain, visual testing is essential as mobile devices differ drastically in capabilities, display dimensions, and even operating systems. Visual regression testing targets specific areas of visual concepts like layouts, responsive design, graphics, and CSS. 

Because modern mobile applications are built as hybrid and native applications, there is no way to scale this sort of testing using manual resources; hence, visual test automation should be a crucial piece of the testing stack. 

In this talk, the audience will learn about major visual testing frameworks targeting both responsive web applications and native mobile applications.

[Original Talk Link]()

**Press Mentions/Articles**

- [Software Test Pro: Mobile Visual Testing: Uphill Battle of Mobile Visual Regression](https://www.softwaretestpro.com/mobile-visual-testing-uphill-battle-of-mobile-visual-regression/)`}],p=[{title:"The 10,000 Steps of Open Source Project Health",description:"In this talk, we will look at the approach that the Meta Open Source team takes to measure the current state of Meta open source projects.",date:"2021-05-01",tags:["open source"],slug:"/presentations/2021/10000-steps-of-open-source-project-health/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2021_10000-steps-of-open-source-project-health_90a209f3.jpg",youtubeUrl:"https://www.youtube.com/watch?v=ltIy6OwBB5o",body:`**Elevator Pitch (~300 words)**

In this talk, we will look at the approach that the Meta Open Source team takes to measure the current state of Meta open source projects, and how we use these metrics to prioritize and to direct our DevRel focus.

**Presented at**

- [Python Web Conf: 2022](https://dvinnik.dev/events/2022/python-web-conf)
- [Testμ: 2022](https://dvinnik.dev/events/2022/testu-conference)
- [Open Source Summit - North America: 2022](https://dvinnik.dev/events/2022/open-source-summit-na)
- [Open Source Festival: 2022](https://dvinnik.dev/events/2022/open-source-festival)
- [GDG DevFest UK & Ireland: 2022](https://dvinnik.dev/events/2022/gdg-devfest-uk-ireland)
- [All Things Open: 2022](https://dvinnik.dev/events/2022/allthingsopen)
- [JavaScript and Friends: 2021](https://dvinnik.dev/events/2021/javascript-and-friends)
- [Upstream: 2021](https://dvinnik.dev/events/2021/upstream)

**Abstract**
 
Human health is complex - it's not something we can buy; it's something we have to earn! This exact approach goes for open source projects and their communities. A truly dedicated and loyal fanbase cannot be bought; it has to be nurtured. But what do we mean when we call a community and the open source project "healthy"? This question is what we are trying to answer at Meta!

In this talk, we will look at the approach that the Meta Open Source team takes to measure the current state of Meta open source projects, and how we use these metrics to prioritize and to direct our DevRel focus. Ultimately, we aim to show how by looking at information about your open source communities, your team can concentrate on the quality of the projects instead of only the quantity of repositories that you make public. 

**Recordings**

*[Python Web Conf: 2022](https://dvinnik.dev/events/2022/python-web-conf)*

*[Testμ: 2022](https://dvinnik.dev/events/2022/testu-conference)*

*[Open Source Festival: 2022](https://dvinnik.dev/events/2022/open-source-festival)*

*[JavaScript and Friends: 2021](https://dvinnik.dev/events/2021/javascript-and-friends)*

*[Upstream: 2021](https://dvinnik.dev/events/2021/upstream)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/the-10000-steps-of-open-source-project-health" title="The 10,000 Steps of Open Source Project Health" target="_blank">The 10,000 Steps of Open Source Project Health</a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>

- **Press Mentions/Articles**

- [The Recursive: DevTalks 2022](https://therecursive.com/devtalks-2022-the-largest-it-conference-in-romania-to-focus-on-ai/)

- [The Hipo: DevTalks 2022](https://www.hipo.ro/locuri-de-munca/vizualizareArticol/3351/DevTalks-revine-%C3%AEn-perioada-8-10-iunie%3A-Acum-te-po%C8%9Bi-pre%C3%AEnregistra-gratuit-pentru-a-avea-acces-la-conferin%C8%9Bele-online)

- [The 10,000 Steps of Open Source Project Health: Dmitry Vinnik [Testμ 2022]](https://www.lambdatest.com/blog/steps-of-open-source-project-health/)

- [Join upstream maintainers in this new free online event](https://opensource.com/article/21/5/upstream-2021)

- [Open Source Maintainers Take Center Stage, Joined by Leaders from GitHub, Red Hat, Google, and JFrog at Tidelift Upstream Event](https://www.prnewswire.com/news-releases/open-source-maintainers-take-center-stage-joined-by-leaders-from-github-red-hat-google-and-jfrog-at-tidelift-upstream-event-301293468.html)`},{title:"Ent: Making Data Easy in Go",description:"In this talk, we will learn how to use Ent when dealing with data schemas, including types, relations and constraints.",date:"2021-01-08",tags:["golang"],slug:"/presentations/2021/ent_making-data-easy-in-go/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2021_ent_making-data-easy-in-go_176ce912.jpg",youtubeUrl:"https://www.youtube.com/watch?v=dOE_UEwzgMw",body:`**Elevator Pitch (~300 words)**

In this talk, we will learn how to use Ent when dealing with data schemas, including types, relations and constraints. It’s a hands-on talk, so get ready to follow along!

**Presented at**

- [Conf42 - Golang: 2021](https://dvinnik.dev/events/2021/conf42-golang)
- [Go West: 2021](https://dvinnik.dev/events/2021/go-west)

**Abstract**
 
What do most applications do these days? They interact with data in one way or another. As your app’s scale increases, it becomes more challenging to manage databases, schemas, queries, and constraints. These challenges are why a technique called Object-Relational Mapping, or ORM, was created.

At Meta, we tend to think about data modeling in graph concepts and as we were working with Go, it led us to create a new open source project, Ent.

Ent is an entity framework built for Go programming language. This framework provides developers with a Graph-based, Object Relational Mapping.

In this talk, we will learn how to use Ent when dealing with data schemas, including types, relations and constraints. It’s a hands-on talk, so get ready to follow along!

**Recording**

*[Conf42 - Golang: 2021](https://dvinnik.dev/events/2021/conf42-golang)*

*[Go West: 2021](https://dvinnik.dev/events/2021/go-west)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/ent-making-data-easy-in-go" title="Ent: Making Data Easy in Go" target="_blank">Ent: Making Data Easy in Go</a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Cross-Platform CSS (Yes, it's Possible!) with Yoga",description:"In this talk, we learn about Yoga's main concepts and use-cases. Then, we will build a demo app for React Native and Android to showcase the reusability of Yoga.",date:"2021-01-01",tags:["cross-platform","mobile","web"],slug:"/presentations/2021/cross-platform-css-with-yoga/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2021_cross-platform-css-with-yoga_aee05f70.jpg",body:`**Elevator Pitch (~300 words)**

In this talk, we learn about Yoga's main concepts and use-cases. Then, we will build a demo app for React Native and Android to showcase the reusability of Yoga.

**Abstract**
 
It's no secret that people view the same website across many devices, browsers, and screen sizes. To make the same app work on all these platforms, developers have to spend a significant amount of time. If only there were an engine that allows web developers to write their code once and use it everywhere.

Presenting Yoga, an open source, cross-platform layout engine that uses CSS layouts to manage user interfaces across platforms. 

In this talk, we learn about Yoga's main concepts and use-cases. Then, we will build a demo app for React Native and Android to showcase the reusability of Yoga.

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/crossplatform-css-yes-its-possible-with-yoga" title="Cross-Platform CSS (Yes, it&#39;s Possible!) with Yoga" target="_blank">Cross-Platform CSS (Yes, it&#39;s Possible!) with Yoga</a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Hands-on React Native: From Zero to Hero",description:"In this session, we explore React Native and its main concepts. Then, we build a demo app from scratch for Android and iOS to show the power of cross-platform that the framework brings to the table!",date:"2021-01-01",tags:["cross-platform","mobile","react-native"],slug:"/presentations/2021/hands-on-react-native/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2021_hands-on-react-native_59aecf4d.jpg",youtubeUrl:"https://www.youtube.com/watch?v=9tXktXR9iJk",body:`**Elevator Pitch (~300 words)**

In this session, we explore React Native and its main concepts. Then, we build a demo app from scratch for Android and iOS to show the power of cross-platform that the framework brings to the table!

**Presented at**

- [All Things Open: 2021](https://dvinnik.dev/events/2021/allthingsopen)
- [TechBash: 2021](https://dvinnik.dev/events/2021/techbash)
- [WeAreDevelopers - Mobile Day: 2021](https://dvinnik.dev/events/2021/wearedevelopers-mobile-day)
- [Porto Tech Hub: 2021](https://dvinnik.dev/events/2021/porto-tech-hub)

**Abstract**
 
So many platforms, so little time. How do we write an app for the web, Android, iOS, and other OS without spending all our time and money? Cross-platform can be your answer!

You probably heard about React Native before, a framework that allows you to create native Android and iOS apps using React. But how do you get started with the framework? Whether you are an advanced iOS developer or a beginner React dev, this talk will help you get started with React Native.

In this session, we explore React Native and its main concepts. Then, we will build a demo app from scratch for Android and iOS to show the power of cross-platform that the framework brings to the table!

**Recording**

*[All Things Open: 2021](https://dvinnik.dev/events/2021/allthingsopen)*

*[Porto Tech Hub: 2021](https://dvinnik.dev/events/2021/porto-tech-hub)*

<p><a href="https://vimeo.com/639870487">WeAreDevelopers Live - Mobile Day</a> from <a href="https://vimeo.com/wearedevelopers">WeAreDevelopers</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

*Starting from 4:59:00*

*[WeAreDevelopers - Mobile Day: 2021](https://dvinnik.dev/events/2021/wearedevelopers-mobile-day)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/hands-on-react-native-from-zero-to-hero" title="Hands on React Native: From Zero to Hero" target="_blank">Hands on React Native: From Zero to Hero</a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>

**Press Mentions**

- [Business Insider: Why companies like Microsoft and Shopify are making big bets on the React Native app development framework, paying specialists an average of $117,000 a year](https://www.businessinsider.com/react-native-developers-facebook-microsoft-app-development-2021-9)`},{title:"Streamline Your iOS Testing with idb",description:"In this session, we talk about the challenges in testing that iOS developers encounter and how to simplify the workflow with the idb.",date:"2021-01-01",tags:["testing","ios","mobile"],slug:"/presentations/2021/ios-testing-with-idb/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2021_ios-testing-with-idb_0844d251.jpg",body:`**Elevator Pitch (~300 words)**

In this session, we talk about the iOS native ecosystem, the challenges in testing that iOS developers encounter, and how to simplify the workflow with the idb.

**Abstract**
 
Testing in the iOS space is tough! An extensive set of devices and models and a somewhat closed ecosystem make running tests an enormous challenge. 

Fortunately, open source projects like the [iOS development bridge (idb)](https://fbidb.io/) help us scale QA efforts. This command-line interface was designed to automate iOS simulators and devices, allowing developers to work between a fleet of machines so that automation on iOS can be distributed amongst these machines. 

In this session, we talk about the iOS native ecosystem, the challenges in testing that iOS developers encounter, and how to simplify the workflow with the idb.`},{title:"Mobile Debugging Made Easy with Flipper",description:"In this talk, we learn how to debug Android, iOS, and React Native apps with Flipper. Then, we will build a new plugin for Flipper to show how flexible the platform is.",date:"2021-01-01",tags:["cross-platform","mobile","debugging"],slug:"/presentations/2021/mobile-debugging-with-flipper/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2021_mobile-debugging-with-flipper_ca7adcda.jpg",body:`**Elevator Pitch (~300 words)**

In this talk, we learn how to debug Android, iOS, and React Native apps with Flipper. Then, we will build a new plugin for Flipper to show how flexible the platform is.

**Abstract**
 
As a developer, where do you think you spend most of your time doing? In most cases, the answer would be debugging. 

Whenever something breaks, getting to the root cause can only be done by debugging through logs, reporting systems, and other tools.

But what if it wasn't that complex and unpleasant? Flipper, an extensible mobile app debugger, aims to make the developer experience a lot better! Flipper inspects, visualizes, and controls your apps from a simple desktop interface. 

In this talk, we learn how to debug Android, iOS, and React Native apps with Flipper. Then, we will build a new plugin for Flipper to show how flexible the platform is.`},{title:"Scalable Image Management with Fresco on Android",description:"In this talk, we learn how to use Fresco and build a demo app to show how images can be progressively shown on the device.",date:"2021-01-01",tags:["android","mobile"],slug:"/presentations/2021/scalable-image-management-with-fresco/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2021_scalable-image-management-with-fresco_e69def02.jpg",body:`**Elevator Pitch (~300 words)**

In this talk, we learn how to use Fresco and build a demo app to show how images can be progressively shown on the device.

**Abstract**
 
Scale matters! The amount of data people go through the day on their phones is astounding, especially when it involves images and videos. With most of us being on the go, the network becomes a big concern as the connection is not the same worldwide.

Here is where Fresco comes in! This powerful system for displaying images in Android applications adjusts image quality to the device and the network. 

In this talk, we learn how to use Fresco and build a demo app to show how images can be progressively shown on the device.`},{title:"Testing React with Jest: Validate Your Components Quickly!",description:"In this talk, we look at how React apps are tested E2E and why Jest stands out compared to other test frameworks.",date:"2021-01-01",tags:["testing","web","ui"],slug:"/presentations/2021/testing-react-with-jest/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2021_testing-react-with-jest_1f2b3f89.jpg",youtubeUrl:"https://www.youtube.com/watch?v=zYUsQQV3Jpk",body:`**Elevator Pitch (~300 words)**

In this talk, we look at how React apps are tested E2E and why Jest stands out compared to other test frameworks. We do a live demo while implementing several main test scenarios using Jest, React Testing Library and Puppeteer

**Presented at**

- [CodeFest: 2021](https://dvinnik.dev/events/2021/codefest)

**Abstract**
 
How confident are you in your React app? Does your UI render after you add a new item to the nav menu? What about style changes - do you know how a font change affects the rest of your app?

If you want to have confidence in your React app, you need to have tests. Unfortunately, most testing frameworks are hard to set up, and it takes too long to run them. But this is not the case with Jest!

Jest allows React developers to get a quick test result for any change on the app. And setting up Jest on React has never been easier than today! 

In this talk, we look at how React apps are tested E2E and why Jest stands out compared to other test frameworks. We do a live demo while implementing several main test scenarios using Jest - get ready to code along!

**Takeaways**

1. Test Pyramid for React Testing
2. Basics of Jest with React Testing Library and Puppeteer
3. Tips and tricks for prioritizing integration testing in React

**Recording**

*[CodeFest: 2021](https://dvinnik.dev/events/2021/codefest)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/testing-react-with-jest-validate-your-components-quickly" title="Testing React with Jest: Validate Your Components Quickly!" target="_blank">Testing React with Jest: Validate Your Components Quickly!</a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Testing Svelte with Jest: Validate Your Components Quickly!",description:"In this talk, we look at how Svelte apps are tested E2E and why Jest stands out compared to other test frameworks.",date:"2021-01-01",tags:["testing","web","ui"],slug:"/presentations/2021/testing-svelte-with-jest/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2021_testing-svelte-with-jest_c5d22dad.jpg",youtubeUrl:"https://www.youtube.com/watch?v=fnr9XWvjJHw",body:`**Elevator Pitch (~300 words)**

In this talk, we look at how React apps are tested E2E and why Jest stands out compared to other test frameworks. We do a live demo while implementing several main test scenarios using Jest, React Testing Library and Puppeteer

**Presented at**

- [Svelte Summit Spring: 2021](https://dvinnik.dev/events/2021/svelte-summit-spring)

**Abstract**
 
How confident are you in your Svelte app? Does your UI render after you add a new item to the nav menu? What about style changes - do you know how a font change affects the rest of your app?

If you want to have confidence in your Svelte app, you need to have tests. Unfortunately, most testing frameworks are hard to set up, and it takes too long to run them. But this is not the case with Jest!

Jest allows Svelte developers to get a quick test result for any change on the app. And setting up Jest on Svelte has never been easier than today!

In this talk, we will look at how Svelte apps are tested E2E and why Jest stands out compared to other test frameworks. We will do a live demo while implementing several main test scenarios using Jest - get ready to code along!

**Recording**

*[Svelte Summit Spring: 2021](https://dvinnik.dev/events/2021/svelte-summit-spring)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/testing-svelte-with-jest-validate-your-components-quickly" title="Testing Svelte with Jest: Validate Your Components Quickly!" target="_blank">Testing Svelte with Jest: Validate Your Components Quickly!</a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Documentation Made Easy with Docusaurus",description:"In this session, we will walk through getting started with Docusaurus, its architecture and MDX support.",date:"2020-06-15",tags:["open source","productivity"],slug:"/presentations/2020/documentation-made-easy-with-docusaurus/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2020_documentation-made-easy-with-docusaurus_894bf4fa.jpg",youtubeUrl:"https://www.youtube.com/watch?v=Hl_4Le_0LOc",body:`**Elevator Pitch (~300 words)**

In this session, we will walk through getting started with Docusaurus, its architecture and MDX support

**Abstract**
 
Do you know how to get someone to do something difficult? Make it easy! Documentation is one of those things: everyone understands it's important, but few want to write it. And if the docs platform is difficult to use or extend, doc writing becomes a punishment. Docusaurus is here to help!

In this session, we will walk through getting started with Docusaurus, its architecture and MDX support. We will explore built-in themes with plugins, and even create one during the talk. So, let's learn how to make doc writing enjoyable, together!

**Presented at**

- [Algolia Community Party: 2020](https://dvinnik.dev/events/2020/algolia-community-party)

**Recording**

*[Algolia Community Party: 2020](https://dvinnik.dev/events/2020/algolia-community-party)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/documentation-made-easy-with-docusaurus" title="Documentation Made Easy with Docusaurus" target="_blank">Documentation Made Easy with Docusaurus</a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Testing at Scale at Meta and Salesforce",description:"In this session, we will discuss how the most basic testing skills and tools we use daily are transferable to any company.",date:"2020-05-15",tags:["testing"],slug:"/presentations/2020/testing-at-scale-at-meta-and-sfdc/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2020_testing-at-scale-at-meta-and-sfdc_07c3bf56.jpg",youtubeUrl:"https://www.youtube.com/watch?v=Hl_4Le_0LOc",body:`**Elevator Pitch (~300 words)**

In this session, we will discuss how the most basic testing skills and tools we use daily are transferable to any company.

**Abstract**
 
Do you ever worry that your testing skills are too limited for your company? Are you concerned that other organizations, especially the ones with a massive scale, require a completely different set of skills? 

Worry no more! This talk will look at how testing is done at companies with the scale of the likes of Salesforce and Meta. We will discuss how the most basic testing skills and tools we use daily are transferable to any company.

**Presented at**

- [Future of Testing Webinar: 2022](https://dvinnik.dev/videos/2020/testing-at-scale)
- [Future of Testing Forum: 2022](https://dvinnik.dev/events/2022/future-of-testing-forum)

**Recording**

*[Future of Testing Webinar: 2022](https://dvinnik.dev/videos/2020/testing-at-scale)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/testing-at-scale-at-meta-and-salesforce" title="Testing at Scale at Meta and Salesforce" target="_blank">Testing at Scale at Meta and Salesforce</a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Kindness Engineering: Focusing on What Matters",description:"In this talk, we discuss how to bring kindness to the enterprise and open-source while ensuring that these “kind practices” are successfully adopted by the teams of any size.",date:"2019-06-06",tags:["wellness","devrel"],slug:"/presentations/2019/kindness-engineering/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2019_kindness-engineering_6046add1.jpg",youtubeUrl:"https://www.youtube.com/watch?v=B2eeOUkTv7A",slideshareUrl:"https://www.slideshare.net/DmitryVinnik1",body:`**Elevator Pitch (~300 words)**

With continuous changes in how people communicate, we often face anger, irritation, and selfishness. In this talk, we discuss how to bring kindness to the enterprise and open-source while ensuring that these “kind practices” are successfully adopted by the teams of any size.

**Presented at**

- [DevRelCon - San Francisco: 2019](https://dvinnik.dev/events/2019/devrelcon-sf)

**Abstract**
 
It is a known saying that if you want to ruin your day, post something publicly and read comments later. While it is an unfortunate truth of modern society to have generally toxic comments sections, you do not usually expect to see something so unkind in the open source section of Software Development. The most prominent examples that come to mind are Linus Torvald's infamous email habits or less known conversations around event-stream libraries and what the maintainers of open source libraries owe to the community that uses these libraries.

In this talk, we will discuss how each person in any enterprise or open-source community can bring clarity to the development process, establish kindness as the critical value in the team, and retain focus on a team’s proactive success. The audience will be able to avoid a reactive approach to any incident resolution and instead highlight how the team can move forward as a cohesive unit rather than a ball of irritation and suppressed anger.

**Takeaways**

1. Early signs of toxicity in Open Source or Enterprise Projects
2. Lesson on bringing Empathy to the development process
3. Ways to introduce Kindness as a critical value in the teamwork

**Recording**

*[DevRelCon - San Francisco: 2019](https://dvinnik.dev/events/2019/devrelcon-sf)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/kindness-engineering-focusing-on-what-matters" title="Kindness Engineering: Focusing on What Matters" target="_blank">Kindness Engineering: Focusing on What Matters</a> </strong> from <strong><a href="https://www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Better Start: Enforcing Best Engineering Practices with Kotlin",description:"In this talk, we will look at Kotlin as a way to enforce best Software Engineering practices on the language-level.",date:"2019-05-22",tags:["java"],slug:"/presentations/2019/enforcing-best-practices-with-kotlin/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2019_enforcing-best-practices-with-kotlin_5940ea40.jpg",body:`**Elevator Pitch (~300 words)**

We will see how Kotlin by limiting verbosity, by using private data classes, extension functions and many other functionalities, allow for more flexible and maintainable codebase. The main goal of this talk is to convince you that Kotlin is a great way to bring years of experience of using best practices to a first-year university student, or to a long-time Java veteran.

**Presented at**

- [TechBash: 2021](https://dvinnik.dev/events/2021/techbash)
- [DevFest Live: 2021](https://dvinnik.dev/events/2021/devfest-live)
  

**Abstract**
 
As Developers, we are getting lazy! With amazing IDEs and plugins we use on a daily basis, we let these tools do the most important job for a Software Project – ensure maintainability of the codebase. These tools with static analysis, formatters and styleguides keep our code clean and readable while we can focus on making the application to work.

Despite this abstraction of styling and duplication detection, we, as Software Engineers, are still responsible to keep in mind best practices like DRY, KISS, YAGNI, and many more. While IDEs are great at detecting basic mistakes, we still need to choose the best possible solution among variety of solutions.
In this talk, we will look at Kotlin as a way to enforce best Software Engineering practices on the language-level. 

We will see how Kotlin by limiting verbosity, by using private data classes, extension functions and many other functionalities, allow for more flexible and maintainable codebase. The main goal of this talk is to convince you that Kotlin is a great way to bring years of experience of using best practices to a first-year university student, or to a long-time Java veteran.

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/better-start-enforcing-best-engineering-practices-with-kotlin" title="Better Start: Enforcing Best Engineering Practices with Kotlin" target="_blank">Better Start: Enforcing Best Engineering Practices with Kotlin</a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Gauge + Taiko: BDD for Web Revived",description:"In this talk, we discuss making Behavior Driven Development successful in your team with Gauge and Taiko.",date:"2019-01-01",tags:["testing","ui","web","bdd"],slug:"/presentations/2019/gauge+taiko_bdd-for-web-revived/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2019_gauge%2Btaiko_bdd-for-web-revived_fc42be9f.jpg",youtubeUrl:"https://www.youtube.com/watch?v=eTUSYiJYL1s",slideshareUrl:"https://www.slideshare.net/DmitryVinnik1",body:`**Elevator Pitch (~300 words)**

In this talk, we discuss making Behavior Driven Development successful in your team with Gauge and Taiko. We dive deep into these two tools to have an adequate web testing infrastructure and a communication channel within the organization.

**Presented at**

- [Devoxx Poland: 2019](https://dvinnik.dev/events/2019/devoxx-poland)
- [Nordic Testing Days: 2019](https://dvinnik.dev/events/2019/nordic-testing-days)
- [Agile Testing Days - USA: 2019](https://dvinnik.dev/events/2019/agile-testing-days-usa)

**Abstract**
 
Does Behavior Driven Development work? Unfortunately, it often does not. While many people try to pitch BDD to bridge the gap between stakeholders, many teams fail to communicate their test scenarios with everyone involved. 

It does not help that many of the BDD tools like Cucumber can be challenging to implement and maintain. More often than not, these difficulties of BDD frameworks outweigh the benefits.

Fortunately, the tech industry has seen a new wave of behavior-driven development adoption, thanks to Gauge and Taiko frameworks. With these two tools, teams get an effective combination of a testing tool and a communication channel.

In this talk, we discuss BDD principles and how Gauge+Taiko can take your team to the next level of testing collaboration. We take a deep dive into these tools and their application to web development. To ensure your success, we look at common mistakes made during the initial implementation of BDD on organizational and team levels.

**Takeaways**

1. Guide into Behavior Driven Development
2. Common mistakes of BDD on organizational and team levels
3. Deep dive into Gauge and Taiko
   

**Recording**

*[Devoxx Poland: 2019](https://dvinnik.dev/events/2019/devoxx-poland)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/gauge-taiko-bdd-for-web-revived" title="Gauge + Taiko, BDD for Web Revived" target="_blank">Gauge + Taiko, BDD for Web Revived</a> </strong> from <strong><a href="https://www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Impostor Syndrome: How to Overcome Your Inner Roadblock",description:"In this talk, we discuss how to identify and overcome these self-imposed roadblocks to allow you to appreciate yourself and your voice.",date:"2019-01-01",tags:["wellness","work-life balance","devrel"],slug:"/presentations/2019/impostor-syndrome/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2019_impostor-syndrome_5fb64c8e.jpg",youtubeUrl:"https://www.youtube.com/watch?v=IN3F3vfNgOM",body:`**Elevator Pitch (~300 words)**

Do you ever wonder if you are good enough? Wonder whether you are an expert every time you ask a question? If so, then you probably suffer from Impostor Syndrome. In this talk, we discuss how to identify and overcome these self-imposed roadblocks to allow you to appreciate yourself and your voice.

**Presented at**

- [HackConf: 2019](https://dvinnik.dev/events/2019/hackconf)

**Abstract**
 
Do you ever doubt yourself? Wonder if you are smart enough to voice your opinion or try something new? If so, you probably have Impostor Syndrome.
   
Impostor Syndrome is a condition where we constantly question our achievements and expertise. This condition prevents us from getting out there and sharing our ideas and our knowledge. With the continuous growth of social media depicting “perfect lives,” worldwide experts, and all-powerful CEOs, it is no wonder we doubt our strength.

In this talk, we discuss the ups and downs of world-renowned experts to see what helped them break from the Impostor Syndrome. We learn ways to overcome our self-imposed roadblocks and share our ideas freely with no fear of failure.

**Takeaways**

1. Signs of Impostor Syndrome and its examples in the industry
2. Tips and tricks to deal with Impostor Syndrome 
3. Ways to share your experience and your knowledge

**Recording**

*[HackConf: 2019](https://dvinnik.dev/events/2019/hackconf)*`},{title:"Remote Work: Gateway to Freedom",description:"In this talk, we explore how to become a remote employee successfully, how to manage a remote team, and what mistakes to avoid in the process.",date:"2019-01-01",tags:["testing"],slug:"/presentations/2019/remote-work_gateway-to-freedom/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2019_remote-work_gateway-to-freedom_37c2ebc8.jpg",youtubeUrl:"https://www.youtube.com/watch?v=INs_FyL-F8M",body:`**Elevator Pitch (~300 words)**

Distributed teams are the future of the IT workforce. Many companies have adopted remote work as a part of their business, and more organizations (small and large) are moving towards this new way of conducting their work.

In this talk, we explore how to become a remote employee successfully, how to manage a remote team, and what mistakes to avoid in the process.

**Presented at**

- [VoxxedDays Banff: 2019](https://dvinnik.dev/events/2019/voxxeddays-banff)

**Abstract**
 
Open office tables, water cooler chats, long commutes - does it sound familiar? If so, you are a member of the overwhelming majority of in-office developer workforce. While being in the same location as your colleagues have its benefits, the reality is constant interruptions, “Dead Time” of the commute, and poor work-life balance.
 
In this talk, we discuss how you can use remote work as the way to free yourself from the world of unnecessary distractions, and how to slowly and successfully introduce telecommuting into your team. We dive into a social aspect of Software Development, what mistakes to avoid during the transition and how to build a proper work-life balance.

**Takeaways**

1. Reasons for remote work and remote teams
2. Ways to get started with telecommuting
3. Tips and trick for a successful transition into a remote worker

**Recording**

*[VoxxedDays Banff: 2019](httsp://dvinnik.dev/events/2019/voxxeddays-banff)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/remote-work-gateway-to-freedom" title="Remote Work: Gateway to Freedom" target="_blank">Remote Work: Gateway to Freedom</a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Design Pixel-Perfect User Experiences with Community Cloud",description:"In this talk, we walk through how theme packaging help you create engaging digital experiences with Community Cloud.",date:"2018-11-09",tags:["business"],slug:"/presentations/2018/design-pixel-perfect-community-cloud/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2018_design-pixel-perfect-community-cloud_76e88d17.jpg",youtubeUrl:"https://www.youtube.com/watch?v=4tEwBSetNUM",body:`**Elevator Pitch (~300 words)**

In this session we'll walk through how external design systems, pre-built themes, and theme packaging help you create engaging digital experiences with Community Cloud.

**Presented at**

- [Dreamforce: 2018](https://dvinnik.dev/events/2018/dreamforce/)

**Abstract**
 
In this session we'll walk through how external design systems, pre-built themes, and theme packaging help you create engaging digital experiences with Community Cloud. Take advantage of the rich suite of tools in the Lightning Community Builder to create incredible UX for your Communities, Portals, and Sites.

**Recording**

*[Dreamforce: 2018](https://dvinnik.dev/events/2018/dreamforce/)*`},{title:"From Robotium to Appium: Choose Your Journey",description:"In this talk, we take the audience on a journey of UI testing starting with introduction of Robotium and its main principals.",date:"2018-06-20",tags:["testing"],slug:"/presentations/2018/from-robotium-to-appium/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2018_from-robotium-to-appium_2e810945.jpg",youtubeUrl:"https://www.youtube.com/watch?v=LAsQ3Pu-UbY",body:`**Elevator Pitch (~300 words)**

In this talk, the speaker will attempt to take his audience on a journey of UI testing starting with introduction of Robotium and its main principals, and later moving on to Appium while highlighting why one would choose Robotium over Appium and vice versa. 

**Presented at**

- [All Things Open: 2019](https://dvinnik.dev/events/2019/allthingsopen)
- [Quest Conference: 2019](https://dvinnik.dev/events/2019/quest)
- [Nordic Tesing Days: 2018](https://dvinnik.dev/events/2018/nordic-testing-days)

**Abstract**

Mobile Testing is hard! You have to test not only Native Mobile but also Web-based applications. This multi-platform focus makes the testing effort to be at least twice as complicated as when a simple web application is targeted.

With the growing market around smartphones, developers needed more ways to ensure software quality of their product. This need is why many mobile UI test frameworks have been introduced. With the most significant share of the mobile market being taken by Android OS, development and testing efforts have been especially crucial in this ecosystem.

Among the variety of Mobile UI automation tools, two frameworks have been especially notable: Robotium and Appium. However, with more organizations moving towards multi-platform solutions, those of us, who used Robotium, are slowly moving towards Appium. This journey from Robotium to Appium is where the main focus of this presentation lies.

In this session, we deep dive into both Robotium and Appium. We discuss why and how to transition from Robotium to Appium in the Android ecosystem. Lastly, we look at common mistakes made during this transition, and how to avoid them.

**Takeaways**

- Main functionalities of Appium and Robotium in practice (using Java)
- What’s and How’s of both frameworks
- Scaling Appium with TestObject and Robotium with Firebase
- Differences and use cases for both test frameworks: Appium and Robotium
- When to use and when not to use either of frameworks

**Recording**

*[Nordic Testing Days: 2018](https://dvinnik.dev/events/2018/nordic-testing-days)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/from-robotium-to-appium-choose-your-journey" title="From Robotium to Appium: Choose your Journey " target="_blank">From Robotium to Appium: Choose your Journey </a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Back to the CompletableFuture: Concurrency in Action",description:"In this talk, we explore concurrency programming and how developer-friendly it has become with the latest advantages of the Java language.",date:"2018-01-01",tags:["java"],slug:"/presentations/2018/back-to-the-completable-future/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2018_back-to-the-completable-future_39ab3f8d.jpg",youtubeUrl:"https://www.youtube.com/watch?v=it0Zo5QhlQk",slideshareUrl:"https://www.slideshare.net/DmitryVinnik1",body:`**Elevator Pitch (~300 words)**

Concurrency is hard! It is especially true for those who have only ever used Threads and Runnables. Fortunately, the Java community has been working hard on improving developer experience around multithreading programming. The declarative model has become an essential part of the concurrency development along with resource management features of JDK5, and post-JDK8 structures like CompletableFutures. 

In this talk, we explore concurrency programming and how developer-friendly it has become with the latest advantages of the Java language.

**Presented at**

- [YavaConf: 2021](https://dvinnik.dev/events/2021/yavaconf)
- [JCon: 2021](https://dvinnik.dev/events/2021/jcon)
- [Conf42 - Enterprise Software: 2021](https://dvinnik.dev/events/2021/conf42-enterprise)
- [Kansas City Developer Conference: 2019](https://dvinnik.dev/events/2019/kcdc)
- [Javaland: 2019](https://dvinnik.dev/events/2019/javaland)
- [JVMCon: 2018](https://dvinnik.dev/events/2018/jvmcon)
- [VoxxedDays Vienna: 2018](https://dvinnik.dev/events/2018/voxxeddays-vienna)
- [Devoxx Poland: 2018](https://dvinnik.dev/events/2018/devoxx-poland)
- [JDK.io: 2018](https://dvinnik.dev/events/2018/jdkio)
- [JCon: 2018](https://dvinnik.dev/events/2018/jcon)
- [MakeIT: 2018](https://dvinnik.dev/events/2018/makeit)

**Abstract**
 
Callback hell is a known way to give any JavaScript developer nightmares. However, Java developers are not much better off since anything concurrency and multithreading related give us cold sweats.

With Threads and Runnables being the first (and often last) things we used in Java, these classes gave many of us an impression of and appreciation for the complexities of concurrency. As a result, many developers abandoned the idea of ever touching thread management in Java and focused on a single-threaded development.
  
Fear no more! The world of concurrency in Java has changed since JDK8 and continues to get better. This talk discusses improvements around the Concurrency API of JDK5 and the power of asynchronous programming of CompletableFutures post-JDK8. Our goal is to break out of the fear of concurrency in Java and learn about a new, declarative way of thread programming.

**Takeaways**

1. Basics of Concurrency and Its Forms in Java
2. Concurrency API and Declarative Model in JDK5
3. Asynchronous development with CompletableFuture post-JDK8

   

**Recording**

*[Conf42 - Enterprise Software: 2021](https://dvinnik.dev/events/2021/conf42-enterprise)*

*[JCon: 2021](https://dvinnik.dev/events/2021/jcon)*

*[VoxxedDays Vienna: 2018](https://dvinnik.dev/events/2018/voxxeddays-vienna)*

*[JDK.io: 2018](https://dvinnik.dev/events/2018/jdkio)

*[Devoxx Poland: 2018](https://dvinnik.dev/events/2018/devoxx-poland)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/back-to-the-completablefuture-concurrency-in-action-128736890" title="Back to the CompletableFuture: Concurrency in Action" target="_blank">Back to the CompletableFuture: Concurrency in Action</a> </strong> from <strong><a href="https://www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Fixing Broken Windows: Dealing with Legacy Systems, Poor Quality and Gaps",description:"In this talk, we discuss how to break away from standard bad development practices and how to address major gaps in your legacy and current codebases.",date:"2018-01-01",tags:["architecture"],slug:"/presentations/2018/dealing-with-legacy-systems/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2018_dealing-with-legacy-systems_3fefc4e6.jpg",youtubeUrl:"https://www.youtube.com/watch?v=tCT-LSbF-uU",body:`**Elevator Pitch (~300 words)**

In this talk, we discuss how to break away from standard bad development practices and how to address major gaps in your legacy and current codebases. We look at ways to change your development focus towards higher quality practices on both team and organizational levels.

**Presented at**

- [Conf42 SRE: 2021](https://dvinnik.dev/events/2021/conf42-sre)
- [Booster Conf: 2019](https://dvinnik.dev/events/2019/booster-conf)
- [STPCon: 2018](https://dvinnik.dev/events/2018/stpcon)

**Abstract**
 
We all encountered a “Broken Window” theory in practice. The original idea was that if someone breaks a window in a neighborhood and this window is not repaired right away, the entire area will start getting messier at an accelerated rate.

The same theory is also true for Software Development. How many times have you looked at a legacy system with no code coverage, and decided not to write any tests because "this is how we do things here"? These bad practices behave just like those "Broken Windows." They cause our code to degrade and become unusable.

In this talk, we discuss how to break away from bad development practices and how to address significant gaps in your legacy and current systems. We look at ways to lead by example successfully and introduce refactoring culture into your team and organization. We cover tips and tricks that help improve the development culture and emphasize the codebase's general health.

**Takeaways**

1. Common Anti-Patterns of Development Teams
2. Ways to address Legacy Systems' Gaps
3. Tips and Trick on emphasizing High Quality of the codebase

**Recording**

*[Conf42 SRE: 2021](https://dvinnik.dev/events/2021/conf42-sre)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/fixing-broken-windows-dealing-with-legacy-systems-poor-quality-and-gaps" title="Fixing Broken Windows: Dealing with Legacy Systems, Poor Quality and Gaps" target="_blank">Fixing Broken Windows: Dealing with Legacy Systems, Poor Quality and Gaps</a> </strong> de <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>

**Press Mentions/Articles**

- [LeadDev: Fixing broken windows: How to deal with legacy systems](https://dvinnik.dev/articles/2022/fixing-legacy-systems/)`},{title:"Domain Driven Testing: Know What You’re Doing",description:"In this talk, we discuss how to use Domain knowledge around your product to help improve your Software Quality.",date:"2018-01-01",tags:["testing"],slug:"/presentations/2018/domain-driven-testing/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2018_domain-driven-testing_7133b16b.jpg",youtubeUrl:"https://www.youtube.com/watch?v=82bVGCLZQCo",slideshareUrl:"https://www.slideshare.net/DmitryVinnik1",body:`**Elevator Pitch (~300 words)**

In this talk, we discuss how to use Domain knowledge around your product to help improve your Software Quality. We use Domain Driven Testing tools to ensure we validate what your customers work with rather than what you think they might use.

**Presented at**

- [JavaDay Istanbul: 2018](https://dvinnik.dev/events/2018/javaday-istanbul)
- [Target Quality: 2018](https://dvinnik.dev/events/2018/target-quality)
- [Quest for Quality: 2018](http:s//dvinnik.dev/events/2018/quest-for-quality)
- [ConTEST NYC: 2018](https://dvinnik.dev/events/2018/contest-nyc)
- [VoxxedDays Ticino: 2018](https://dvinnik.dev/events/2018/voxxeddays-ticino)
- [Selenium Meetup - Belfast: 2018](https://dvinnik.dev/events/2018/selenium-meetup-belfast)

**Abstract**
 
"I tested it how you told me to," "Requirements say it's expected," "I assumed it's fine" – these are the common phrases you hear when customer cases come up. Unfortunately, it is nothing unusual in our industry to be detached from customers' actual needs. As a result, teams regularly fail when they prioritize requirements over actual behavior that the customers expect.

This problem of misaligned teams' focus is where Domain Driven Testing (DDT) comes into play. DDT helps developers to put themselves into the customers' shoes and see the product for what it is. This prioritization of the actual behavior over the mere following of the requirements is what defines Domain Driven Testing.

In this talk, we discuss how knowledge of your company's domain (aka, the focus of your business) can improve your testing practices. We talk about Domain Driven Design techniques, Exploratory Testing, and other methods that emphasize software quality through customer success. We touch bases on tools you can integrate into your system using Domain Driven Test Pyramid, and what common mistakes you should avoid when implementing Domain Driven Testing.

**Takeaways**

1. Core principles behind Domain Driven Design 
2. How-to's of Domain Driven Test Pyramid
3. Tips and Trick on Behavior Validation using DDT techniques

   

**Recording**

*[VoxxedDays Ticino: 2018](https://dvinnik.dev/events/2018/voxxeddays-ticino)*

*[JavaDay Istanbul: 2018](https://dvinnik.dev/events/2018/javaday-istanbul)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/domain-driven-testing-know-what-youre-doing" title="Domain Driven Testing: Know What You’re Doing" target="_blank">Domain Driven Testing: Know What You’re Doing</a> </strong> from <strong><a href="https://www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Engineer in Test: Bridging the Gap",description:"In this talk, we discuss situations when the quantity of our tests takes over their quality. We answer how this tendency of writing many unnecessary tests creates more significant issues like wasted cycles on fixing test-only failures. ",date:"2018-01-01",tags:["testing","leadership"],slug:"/presentations/2018/engineer-in-test_bridging-the-gap/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2018_engineer-in-test_bridging-the-gap_3fd71c64.jpg",slideshareUrl:"https://www.slideshare.net/DmitryVinnik1",body:`**Elevator Pitch (~300 words)**

In this talk, we discuss situations when the quantity of our tests takes over their quality. We answer how this tendency of writing many unnecessary tests creates more significant issues like wasted cycles on fixing test-only failures. 

**Abstract**
 
Quantity or quality is a common dilemma we all face when buying groceries, going to the restaurant, or shopping online. Unsurprisingly, when it comes to testing software, the same question of quality over quantity comes up.

“How many tests?”, “How well to write them?”, “How much testing expertise do you need?” - all these questions aimed towards the same dilemma of quantity vs. quality. 

In this talk, we discuss situations when the quantity of our tests takes over their quality. We answer how this tendency of writing many unnecessary tests creates more significant issues like wasted cycles on fixing test-only failures, maintaining the existing test suite, and making every new test from scratch. 

**Takeaways**

1. Guidelines to the user-centric mindset for testers
2. Best practices for developing scalable test suites
3. Path to the Hybrid Engineering for testers and developers
   

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/engineer-in-test-bridging-the-gap" title="Engineer in Test: Bridging the Gap" target="_blank">Engineer in Test: Bridging the Gap</a> </strong> from <strong><a href="https://www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Hybrid Model Teams: Failure and Success",description:"In this talk, we look at successful and failed examples of companies transitioning into using the Hybrid Model.",date:"2018-01-01",tags:["testing"],slug:"/presentations/2018/hybrid-model-success-failure/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2018_hybrid-model-success-failure_4678dc98.jpg",body:`**Elevator Pitch (~300 words)**

In this talk, we look at successful and failed examples of companies transitioning into using the Hybrid Model. We discuss main pain points and tips and tricks on how to tackle the challenges of Hybrid Engineering.

**Abstract**
 
As a Tester, have you ever looked at the developers as if they were your enemies? As a Developer, have you ever thought of testing to be much easier than feature work? If any of these thoughts went through your head at one point, this talk is for you!

Nowadays, the fine line between testers and developers is challenged daily, and more companies are moving towards the so-called Hybrid Model. With everyone in the company becoming a Software Engineer, it might be scary to face it unprepared.  As Hybrid Model is gaining more popularity, it is essential to get ready for this transition whether you are a developer or a tester.

In this talk, we look at successful and failed examples of companies transitioning into using the Hybrid Model. We discuss main pain points and tips and tricks on how to tackle the challenges of Hybrid Engineering. 

**Takeaways**

1. Core principles of the Hybrid Engineering Model
2. Lessons learned from failed transitions to the Hybrid Model
3. Path to a successful implementation of the Hybrid Model`},{title:"Lead by Example Towards Productivity: Science of Lost Time",description:"In this talk, we discuss how, as a leader, you should lead by example towards a more productive workflow.",date:"2018-01-01",tags:["leadership"],slug:"/presentations/2018/leadership-by-example/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2018_leadership-by-example_2b8a2193.jpg",body:`**Elevator Pitch (~300 words)**

In this talk, we discuss how, as a leader, you should lead by example towards a more productive workflow. The audience will learn tips and tricks of making an open office plan work, or if all fails, on how to move to a remote model without getting burned by it.

**Abstract**
 
Where did my day go? What have I done today? If you have asked yourself any of these questions, you are not alone. And even if you don't question your time, your team does. 

With the constant interruption of Instant Messaging, email checking, non-stop meetings, and watercooler conversations, your team is losing valuable time, resulting in overtime. The timelines begin to slip while the team’s mental and physical health is put under constant stress. Ultimately, with this "lost time", your team becomes unsatisfied with the work they do and get unhealthy work-life disbalance.

In this talk, we discuss how, as a leader, you should lead by example towards a more productive, focused, and healthy workflow. The audience will learn tips and tricks of making an open office plan work, or if all fails, on how to move to a remote model without getting burned by it. Ultimately, the talk’s takeaways will be guidelines on retrieving "lost time" and bringing productivity back into your work routine.

**Takeaways**

1. Leadership by example in a nutshell 
2. Techniques for identifying productivity gaps and helping to resolve them
3. Guidelines to ensure a healthy combination of efficiency and work-life balance`},{title:"Modern Web Testing: Going Beyond Selenium",description:"In this talk, we dive into platform-specific Selenium solutions, and non-Selenium based testing products",date:"2018-01-01",tags:["testing"],slug:"/presentations/2018/modern-web-testing_going-beyond-selenium/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2018_modern-web-testing_going-beyond-selenium_7adf3c31.jpg",youtubeUrl:"https://www.youtube.com/watch?v=lVYO1_IEpxI",slideshareUrl:"https://www.slideshare.net/DmitryVinnik1",body:`**Elevator Pitch (~300 words)**

In this talk, we dive into platform-specific Selenium solutions like Protractor, and discuss non-Selenium frameworks like TestCafe and Cypress.io.

**Presented at**

- [Conf42 - JavaScript: 2021](https://dvinnik.dev/events/2021/conf42-javascript)
- [Oracle Code One: 2019](https://dvinnik.dev/events/2019/code-one)
- [IndyPy Python Web Conf: 2019](https://dvinnik.dev/events/2019/indypy)
- [VoxxedDays Bucharest: 2019](https://dvinnik.dev/events/2019/voxxeddays-bucharest)
- [GeeCon - Poland: 2019](https://dvinnik.dev/events/2019/geecon-poland)
- [NDC Minnesota: 2019](https://dvinnik.dev/events/2019/ndc-minnesota)
- [DevFestMN: 2019](https://dvinnik.dev/events/2019/devfest-mn)
- [c\`twebdev: 2019](https://dvinnik.dev/events/2019/ctwebdev)
- [MIXIT: 2019](https://dvinnik.dev/events/2019/mixit)
- [VoxxedDays - Luxembourg: 2019](https://dvinnik.dev/events/2019/voxxeddays-luxembourg)
- [QUEST Software Testing Conference: 2018](https://dvinnik.dev/events/2018/quest)
- [TestCon - Vilnius: 2018](https://dvinnik.dev/events/2018/testcon-vilnius)

**Abstract**
 
It is safe to say that Selenium WebDriver is the number one testing tool for many software engineers across the globe. However, as the tech world has been growing rapidly, so has the testing industry. More and more UI testing frameworks besides Selenium are gaining popularity. 

These new test frameworks are especially appealing to their users because of the promise to solve speed, maintenance, development and other concerns of WebDriver implementations. These new, non-Selenium frameworks emphasize Rapid Test Development practices, and it has been resonating with the development community. 

In this talk, we dive into test solutions evolved from Selenium like Protractor, and talk about non-Selenium frameworks like TestCafe and Cypress.io. We discuss why these new tools are gaining popularity and continue to disrupt the traditional testing standards of Selenium WebDriver. More importantly, we address how to get started and what mistakes to avoid when first implementing TestCafe or Cypress.io in your team.

**Takeaways**

1. Importance of Selenium WebDriver for Test Industry
2. Platform-specific Selenium Solutions: WebdriverJs and Protractor
3. Non-Selenium frameworks: TestCafe and Cypress.io

   

**Recording**

*[Conf42 - JavaScript: 2021](https://dvinnik.dev/events/2021/conf42-javascript)*

*[NDC Minnesota: 2019](https://dvinnik.dev/events/2019/ndc-minnesota)*

*[GeeCon - Poland: 2019](https://dvinnik.dev/events/2019/geecon-poland)*

<p><a href="https://vimeo.com/339718328">Modern Web Testing: Going Beyond Selenium - Dmitry Vinnik - MiXiT 2019</a> from <a href="https://vimeo.com/mixitconf">MiXiT</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

*[MIXIT: 2019](https://dvinnik.dev/events/2019/mixit)*

*[VoxxedDays - Luxembourg: 2019](https://dvinnik.dev/events/2019/voxxeddays-luxembourg)*

*[IndyPy Python Web Conf: 2019](https://dvinnik.dev/events/2019/indypy)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/modern-web-testing-going-beyond-selenium" title="Modern Web Testing: Going Beyond Selenium " target="_blank">Modern Web Testing: Going Beyond Selenium </a> </strong> from <strong><a href="https://www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>

**Press Mentions**

- [Software Testing Magazine](https://www.softwaretestingmagazine.com/videos/modern-web-testing-going-beyond-selenium/)`},{title:"Stress Driven Development, and How to Avoid It",description:"In this talk, we discuss how to manage your day and avoid the daily stressors of any engineering team.",date:"2018-01-01",tags:["wellness"],slug:"/presentations/2018/stress-driven-development/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2018_stress-driven-development_5272fc5e.jpg",youtubeUrl:"https://www.youtube.com/watch?v=ShF8mEzlsEI",slideshareUrl:"https://www.slideshare.net/DmitryVinnik1",body:`**Elevator Pitch (~300 words)**

In this talk, we discuss how to manage your day and avoid the daily stressors of any engineering team. The main takeaways of this presentation are how to prevent stress from being accumulated at work and how to organize the work itself in a productive way.

**Presented at**

- [Craft Conference: 2021](https://dvinnik.dev/events/2021/craft-conference)
- [iSAQB Software Architecture Gathering: 2021](https://dvinnik.dev/events/2021/isaqb)
- [Azure Community Conference: 2021](https://dvinnik.dev/events/2021/azure-community)
- [AgentConf: 2019](https://dvinnik.dev/events/2019/agentconf)
- [Devoxx Poland: 2019](https://dvinnik.dev/events/2019/devoxx-poland)
- [Target Quality: 2019](https://dvinnik.dev/events/2019/target-quality)
- [GeeCon Prague: 2018](https://dvinnik.dev/events/2018/geecon-prague)

**Abstract**
 
When was the last time you took a day off? How many times this week have you worked overtime? These questions are related to one thing we all experience daily - stress.  Employees trapped by their routine to "deliver business value at all cost" often forget to take care of themselves. Unfortunately, this work-related stress affects our loved ones too, because work-life balance that we all hear about, usually means work-life stress.

What if I were to say that it does not have to be this way? In this talk, we discuss ways how to relax and avoid "Stress Driven Development." We deep dive into everyday stressors, and draft a comprehensive guide to removing stress at work and in our personal lives. 

**Takeaways**

1. Outline of everyday work and life stressors
2. Guidelines on how to deal with stress 
3. Tips and Tricks to retain anti-stress practices

**Recording**

*[Craft Conference: 2021](https://dvinnik.dev/events/2021/craft-conference)*

*[GeeCon Prague: 2018](https://dvinnik.dev/events/2018/geecon-prague)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/stress-driven-development-and-how-to-avoid-it" title="Stress Driven Development, and How to Avoid It" target="_blank">Stress Driven Development, and How to Avoid It</a> </strong> from <strong><a href="https://www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Uphill Battle of Mobile Visual Regression",description:"In this talk, we discuss how to get started and be successful with visual testing on mobile devices with native mobile and hybrid web applications.",date:"2018-01-01",tags:["testing","ui"],slug:"/presentations/2018/uphill-battle-of-mobile-testing/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2018_uphill-battle-of-mobile-testing_d4f809b0.jpg",youtubeUrl:"https://www.youtube.com/watch?v=m-ahvlutEVk",slideshareUrl:"https://www.slideshare.net/DmitryVinnik1",body:`**Elevator Pitch (~300 words)**

Have you had a customer complaining that your app looks different on a new phone? This feel-and-look area is where visual testing comes into play. 
In this talk, we discuss how to get started and be successful with visual testing on mobile devices with native mobile and hybrid web applications. 

**Presented at**

- [Oracle Code One: 2019](https://dvinnik.dev/events/2019/code-one)
- [FullStack London: 2019](https://dvinnik.dev/events/2019/fullstack-london)
- [Quest Conference: 2019](https://dvinnik.dev/events/2019/quest)
- [StarEast: 2019](https://dvinnik.dev/events/2019/stareast)
- [SauceCon: 2018](https://dvinnik.dev/events/2018/saucecon)
- [SeleniumConf India: 2018](https://dvinnik.dev/events/2018/seleniumconf-india)
- [All Things Open: 2018](https://dvinnik.dev/events/2018/allthingsopen)

**Abstract**
 
Do you remember those games where you had to find differences between two almost identical images? If you've ever made changes in production, you sure played this game of searching for any visual changes you might have caused.

The problem of catching visual regressions gave rise to a new way of testing - visual testing. While developers focus on automating their end-to-end flows with tools like Selenium, many are at a loss when it comes to end-to-end visual testing. It is even more apparent in the world of mobile development, where devices differ in their capabilities, display dimensions, and even operating systems. Hence, visual testing is a must-have in the mobile market!

This session discusses how to implement visual testing on mobile devices covering both native mobile (Android, iOS) and hybrid web development (React, React Native). We cover major visual concepts like layouts, responsive design, and graphics, giving the audience a clear picture of how to get started and be successful with visual testing.

**Takeaways**

1. Basics of Visual Testing for Mobile and Web apps
2. Using the Visual Test Pyramid for a balanced test coverage
3. Tips and tricks for Visual Testing on Mobile and Web apps
   

**Recording**

*[SauceCon: 2018](https://dvinnik.dev/events/2018/saucecon)*

*[SeleniumConf India: 2018](https://dvinnik.dev/events/2018/seleniumconf-india)*

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/uphill-battle-of-mobile-visual-regression-128737140" title="Uphill Battle of Mobile Visual Regression" target="_blank">Uphill Battle of Mobile Visual Regression</a> </strong> from <strong><a href="https://www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Do you even Function? Guiding Through Functional Interfaces",description:"In this talk, default Functional Interfaces will be explained along with how they can be customized.",date:"2017-12-04",tags:["java"],slug:"/presentations/2017/guiding-through-functional-interfaces/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2017_guiding-through-functional-interfaces_4052f3d9.jpg",body:`**Elevator Pitch (~300 words)**

While Streams and Optional interactions have been well discussed for the past few years, many people forget what drives all these new Functional capabilities – Functional Interfaces.
In this talk, default Functional Interfaces will be explained along with how they can be customized, covering some of the most promising new open-source libraries which expand Functional programming in Java beyond its current limits.

**Presented at**

- [ConFoo: 2017](https://dvinnik.dev/events/2017/confoo/)

**Abstract**
 
Since Java 8 was introduced with its support for Lambda, Optional and Functional Interfaces, Java developers got their hands onto an amazing ground of Functional Programming. While it has been widely supported in other OOP languages, only starting from JDK8, Java community got a new way to develop their code.

While Streams and Optional interactions have been well discussed for the past few years, many people forget what drives all these new Functional capabilities – Functional Interfaces.

In this talk, default Functional Interfaces will be explained along with how they can be customised, covering some of the most promising new open-source libraries which expand Functional programming in Java beyond its current limits.

By exploring what Functional Interfaces actually are, and when they can be use, Java developers should be able to see that any code can be encapsulated down to passing methods as an argument of another method, bringing DRY (Don't Repeat Yourself) principle to its extremes.

As a result, this talk will cover what developers should beware when using Functional Interfaces, as with this new power, there are even more responsibilities. For example, an engineer can keep encapsulating each piece of logic into Functional Interface, making code absolutely unreadable.

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/do-you-even-function-guiding-through-functional-interfaces" title="Do you even Function? Guiding Through Functional Interfaces" target="_blank">Do you even Function? Guiding Through Functional Interfaces</a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Tips and Tricks for Developing Components for Communities",description:"In this talk, we will explore tips and tricks for developing Lightning Components for communities.",date:"2017-11-09",tags:["business"],slug:"/presentations/2017/tips-for-salesforce-communities/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2017_tips-for-salesforce-communities_b539f14d.jpg",youtubeUrl:"https://www.youtube.com/watch?v=rjz-vKGb7DA",body:`**Elevator Pitch (~300 words)**

In this talk, we will explore tips and tricks for developing Lightning Components for communities.

**Presented at**

- [Dreamforce: 2017](https://dvinnik.dev/events/2017/dreamforce/)

**Abstract**
 
Discover tips and tricks for developing Lightning Components for communities. We'll cover customizing Self-Service templates, including overriding the default header with a custom theme, allowing community administrators to control the look and feel of your custom components with design tokens, and best practices, such as utilizing Lightning Component inheritance.

**Recording**

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/developing-lightning-components-for-communitiespptx" title="Developing Lightning Components for Communities.pptx" target="_blank">Developing Lightning Components for Communities.pptx</a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Companies Which Need DevOps But Don`t Know About It",description:"In this talk, we will explore that everyone can find a way to apply their DevOps skills at their company.",date:"2017-03-31",tags:["devops"],slug:"/presentations/2017/companies-need-devops/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2017_companies-need-devops_4250ef1b.jpg",youtubeUrl:"https://www.youtube.com/watch?v=0rqwn4oXRMw",body:`**Elevator Pitch (~300 words)**

In this talk, we will explore that everyone can find something to apply their DevOps skills at, and improve a process in their company.

**Presented at**

- [DevOpsDays YVR: 2017](https://dvinnik.dev/events/2017/devopsdays-vancouver/)

**Abstract**
 
While many people heard of a word DevOps, very few of them know what this discipline actually means. However, majority of companies find themselves in constant fights with inability to track metrics, to support or to know a status of their own services/products. Some companies buy third-party software, some hire semi-technical staff to manually monitor environments, and in the worst case “let the service run itself”. 

In this talk, we will explore that everyone can find something to apply their DevOps skills at, and improve a process in their company. The talk is mostly based on the speaker’s experience which involves him implementing a variety of automations, and metrics systems to increase productivity and efficiency across different departments in his organization. The main takeaway from this talk is that DevOps is not a title but a mindset, and that every company might use some of this DevOps magic.

**Recording**

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/companies-which-need-devops-but-dont-know-about-it" title="Companies Which Need DevOps But Don&#39;t Know About It" target="_blank">Companies Which Need DevOps But Don&#39;t Know About It</a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Building Tests to Build Websites",description:"In this talk, we will explore how multi-frame platform can be directly mapped to POM for Selenium Webdriver, and how client side code is developed to support this pattern.",date:"2017-02-25",tags:["testing"],slug:"/presentations/2017/building-tests-to-build-websites/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2017_building-tests-to-build-websites_ebee656c.jpg",youtubeUrl:"https://www.youtube.com/watch?v=6opoooLdonI",body:`**Elevator Pitch (~300 words)**

In this talk, we will explore how multi-frame platform can be directly mapped to POM for Selenium Webdriver, and how client side code is developed to support this pattern.

**Presented at**

- [CAST: 2017](https://dvinnik.dev/events/2017/cast/)
- [DevOpsDays YVR: 2017](https://dvinnik.dev/events/2017/devopsdays-vancouver/)

**Abstract**
 
Technologies like Squarespace, Salesforce, WordPress, or WIX are extremely popular for those who want to create a working website without necessary developer knowledge. In this talk, I would explore how Salesforce uses Page Object Model patterns to test its Communities platform which is used to develop websites for Salesforce users.

Throughout the talk, we will explore how multi-frame platform can be directly mapped to POM for Selenium Webdriver, and how client side code is developed to support this pattern.

The importance and complexity of these test framework is that it needs to be applicable for both platform and produced websites.

**Recording**

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/build-tests-to-build-websites" title="Build Tests to Build Websites" target="_blank">Build Tests to Build Websites</a> </strong> from <strong><a href="//www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`},{title:"Aspect Oriented Programming: Hidden Toolkit That You Already Have",description:"In this talk, we show a real power of AOP with focus on how it is already used in the industry.",date:"2017-02-01",tags:["java"],slug:"/presentations/2017/aspect-oriented-programming/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/presentations_2017_aspect-oriented-programming_78acb8ae.jpg",youtubeUrl:"https://www.youtube.com/watch?v=XmuwLYdYDAk",slideshareUrl:"https://www.slideshare.net/DmitryVinnik1",body:`**Elevator Pitch (~300 words)**

This talk’s main goal is to show a real power of AOP with focus on how it is already used in the industry, and how any engineer can write their own AOP application, or Java Agent. As a part of this talk, the speaker will cover common Open Source Java Agents such as JaCoCo and JMH, and touch based on paid-base Java Agents such as JRebel or AppDynamics.

**Presented at**

- [JEEConf: 2017](https://dvinnik.dev/events/2017/jeeconf/)

**Abstract**
 
Any developer that worked on a software projects, considered at one point few things like how fast his/her function is, how much test coverage do they have, or if there is a better way to recompile their code without a need to restart JVM. All of these questions can be answered by Aspect Oriented Programming.

Aspect Oriented Programming (AOP) is a cross-cutting concern of writing code across modules to bring a common feature to variety of methods, classes and packages. To illustrate, AOP allows developers to see which parts of actual code was triggered by a test, or to see performance metrics of a certain function. These examples can also be extended to how JVM sees source code and goes beyond Hot Swap in recompiling in runtime using Aspect Oriented Programming.

This talk’s main goal is to show a real power of AOP with focus on how it is already used in the industry, and how any engineer can write their own AOP application, or Java Agent. As a part of this talk, the speaker will cover common Open Source Java Agents such as JaCoCo and JMH, and touch based on paid-base Java Agents such as JRebel or AppDynamics.

**Recording**

**Slide Deck**

 <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/DmitryVinnik1/back-to-the-completablefuture-concurrency-in-action-128736890" title="Back to the CompletableFuture: Concurrency in Action" target="_blank">Back to the CompletableFuture: Concurrency in Action</a> </strong> from <strong><a href="https://www.slideshare.net/DmitryVinnik1" target="_blank">Dmitry Vinnik</a></strong> </div>`}],h=[{title:"GitHub Universe",description:"Conference about cloud, AI, software security, and the open source developer community run by GitHub.",date:"2022-11-10",tags:["testing"],slug:"/events/2022/github-universe/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2022_github-universe_d3f9c51a.jpg",links:["https://dvinnik.dev/conversations/2022/open-source-at-meta","https://githubuniverse.com/events/detail/speakers/fdb56a77-056e-4b54-8636-81a6a10ace8c"],body:`**Presence**

[Fireside Chat: Open Source at Meta](https://dvinnik.dev/conversations/2022/open-source-at-meta)

**Location**

San Francisco, CA, USA

**Event Information**

Fifteen years ago, the first line of code was committed to build GitHub. Since then, our purpose has been to equip developers with everything they need to be their best. This mission has remained the same through every iteration of the GitHub platform. But as software continues to advance in all aspects of our work and life, running, maintaining, and building software for a global population creates immense complexity for developers.

[Original Talk Link](https://githubuniverse.com/events/detail/speakers/fdb56a77-056e-4b54-8636-81a6a10ace8c)`},{title:"All Things Open 2022",description:"Polyglot technology conference focusing on the tools, processes and people making open source possible.",date:"2022-11-01",tags:["open source"],slug:"/events/2022/allthingsopen/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2022_allthingsopen_f076202b.jpg",links:["https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health","https://2022.allthingsopen.org/speakers/dmitry-vinnik/","https://www.youtube.com/embed/ogVkyYdgigA"],body:`**Presence**

[The 10,000 Steps of Open Source Project Health](https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health)

**Location**

Raleigh, NC, USA

**Event Information**

For more than 8 years we’ve followed these beliefs and created events and platforms that have hosted tens of thousands from all over the world.  Just a few include All Things Open, the largest open-source event on the U.S. east coast, the Open Source 101 series, the Open Source Research Triangle Park (RTP) meetup, the Open Source South Carolina meetup, OpenSourceJobs.com, OpenSourceScore. com, and many more.

And throughout it all, our focus on access, diversity, and inclusion and a commitment to helping others have remained steadfast.  We strongly believe you can do business differently and still be successful, which is why we worked hard to earn a Certified B Corp certification in 2018.

[Original Talk Link](https://2022.allthingsopen.org/speakers/dmitry-vinnik/)

**Recording**`},{title:"Future of Testing Forum",description:"Local meetup dedicated to testing and software quality with focus on test automation, leadership and more.",date:"2022-09-15",tags:["testing"],slug:"/events/2022/future-of-testing-forum/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2022_future-of-testing-forum_ab6a7ce3.jpg",links:["https://dvinnik.dev/presentations/2020/testing-at-scale-at-meta-and-sfdc","https://applitools.com/future-of-testing-forum-seattle/"],body:`**Presence**

[Testing at Scale at Meta and Salesforce](https://dvinnik.dev/presentations/2020/testing-at-scale-at-meta-and-sfdc)

**Location**

Seattle, WA, USA

**Event Information**

Ready for the return of in-person networking? Recapture the energy of in-person networking with local professionals in this fun, happy hour event featuring food, drinks, a sweet swag bag, and engaging conversations. Swap stories and tidbits you’ve picked up on your software quality engineering or testing journey. Join software engineers, digital technologists, and industry thought leaders including Developer Advocate Andrew Knight, Meta Lead Developer Advocate, Dmitry Vinnik and skilled engineer, James Whittaker.

[Original Talk Link](https://applitools.com/future-of-testing-forum-seattle/)`},{title:"Testμ Conference",description:"Conference brings together software testers, developers, influencers, and community builders.",date:"2022-08-23",tags:["oss"],slug:"/events/2022/testu-conference/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2022_testu-conference_41872390.jpg",links:["https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health","https://www.youtube.com/embed/-vXXQgAJnOk","https://www.lambdatest.com/blog/steps-of-open-source-project-health/"],body:`**Presence**

[The 10,000 Steps of Open Source Project Health](https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health)

**Location**

Virtual

**Event Information**

The Testμ (TestMu, pronounced as 'TestU') Conference brings together software testers, developers, influencers, and community builders to talk about the future of testing and the people behind it.

Attendees can expect everything from test orchestration to orchestrating the team culture under one (online) roof.

**Recording**

**Press Mentions/Articles**

- [The 10,000 Steps of Open Source Project Health: Dmitry Vinnik [Testμ 2022]](https://www.lambdatest.com/blog/steps-of-open-source-project-health/)`},{title:"Open Source Summit - North America",description:"Premier event for open source developers, technologists, and community leaders to collaborate, share information, solve problems, and gain knowledge.",date:"2022-06-21",tags:["oss"],slug:"/events/2022/open-source-summit-na/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2022_open-source-summit-na_c477602d.jpg",links:["https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health","https://ossna2022.sched.com/speaker/dvinnik"],body:`**Presence**

[The 10,000 Steps of Open Source Project Health](https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health)

**Location**

Virtual

**Event Information**

The Open Source Summit is the premier event for open source developers, technologists, and community leaders to collaborate, share information, solve problems, and gain knowledge, furthering open source innovation and ensuring a sustainable open source ecosystem.

[Original Talk Link](https://ossna2022.sched.com/speaker/dvinnik)`},{title:"DevTalks",description:"The largest expo conference for software developers and IT professionals in Romania, gathering over 8000 participants from all over the world.",date:"2022-06-08",tags:["oss"],slug:"/events/2022/devtalks/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2022_devtalks_3ef999fa.jpg",links:["https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health/","https://www.devtalks.ro/speakers/15-dmitry-vinnik","https://www.youtube.com/embed/it0Zo5QhlQk","https://therecursive.com/devtalks-2022-the-largest-it-conference-in-romania-to-focus-on-ai/","https://www.hipo.ro/locuri-de-munca/vizualizareArticol/3351/DevTalks-revine-%C3%AEn-perioada-8-10-iunie%3A-Acum-te-po%C8%9Bi-pre%C3%AEnregistra-gratuit-pentru-a-avea-acces-la-conferin%C8%9Bele-online"],body:`**Presence**

[The 10,000 Steps of Open Source Project Health](https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health/)

**Location**

Virtual

**Event Information**

The largest expo conference for software developers and IT professionals in Romania, gathering over 8000 participants from all over the world. Every year, key leaders and tech enthusiasts talk about the latest & most exciting aspects of the industry.

[Original Talk Link](https://www.devtalks.ro/speakers/15-dmitry-vinnik)

**Recording**

**Press Mentions**

- [The Recursive](https://therecursive.com/devtalks-2022-the-largest-it-conference-in-romania-to-focus-on-ai/)

- [The Hipo](https://www.hipo.ro/locuri-de-munca/vizualizareArticol/3351/DevTalks-revine-%C3%AEn-perioada-8-10-iunie%3A-Acum-te-po%C8%9Bi-pre%C3%AEnregistra-gratuit-pentru-a-avea-acces-la-conferin%C8%9Bele-online)`},{title:"GitHub InFocus",description:"Event focused on accelerating, securing, and operationally improving the way your software development teams work—for good.",date:"2022-04-29",tags:["oss"],slug:"/events/2022/in-focus-github/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2022_in-focus-github_bc5b537d.jpg",links:["https://dvinnik.dev/conversations/2022/innovating-through-innersource","https://infocus.github.com/sessions/innovating-through-automation-innersource-and-cultural-shifts-with-meta-dxc-technology-and-3m/","https://www.youtube.com/embed/Y8c7U4quV8g"],body:`**Presence**

[Speaking Panel: Innovating Through Automation, Innersource and Cultural Shifts](https://dvinnik.dev/conversations/2022/innovating-through-innersource)

**Location**

Virtual

**Event Information**

*Build fast, build effectively, build securely*

Grow your business alongside industry experts during GitHub InFocus. Enjoy curated sessions on the most top-of-mind business questions for enterprises, along with a special broadcast featuring GitHub CEO, Thomas Dohmke. Join us as we focus on accelerating, securing, and operationally improving the way your software development teams work—for good.

[Original Talk Link](https://infocus.github.com/sessions/innovating-through-automation-innersource-and-cultural-shifts-with-meta-dxc-technology-and-3m/)

**Recording**`},{title:"Open Source Festival",description:"Open source conference with a community aimed at creating and supporting the open source movement within Africa",date:"2022-03-25",tags:["oss"],slug:"/events/2022/open-source-festival/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2022_open-source-festival_0d8ad9a4.jpg",links:["https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health","https://festival.oscafrica.org/schedule/","https://www.youtube.com/embed/m8Ufvyo1tJM"],body:`**Presence**

[The 10,000 Steps of Open Source Project Health](https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health)

**Location**

Virtual

**Event Information**

Open Source Community Africa is a community aimed at creating and supporting the open source movement within Africa. As a community, we intend to help integrate the act of open source contribution to African developers whilst strongly advocating the movement of free and open source software.

Open Source Festival is a high profile event that would attract student delegates, developers, designers and corporate organizations on a large scale with series of talks, workshops, and awareness of open-sourced developer tools. The second edition is going to be a forum for networking, discussions and ideas proration around latest happenings in technology as well as the growth of open source in Africa.

Through this festival, we intend to open the eyes of Africans so they can be aware that FUTURE IS OPEN.

[Original Talk Link](https://festival.oscafrica.org/schedule/)

**Recording**`},{title:"Python Web Conf",description:"The most in-depth Python conference for web developers designed to promote best practices for hard web production problems",date:"2022-03-21",tags:["oss"],slug:"/events/2022/python-web-conf/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2022_python-web-conf_d8c8d8e1.jpg",links:["https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health","https://2022.pythonwebconf.com/speakers/dmitry-vinnik","https://www.youtube.com/embed/ltIy6OwBB5o"],body:`**Presence**

[The 10,000 Steps of Open Source Project Health](https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health)

**Location**

Virtual

**Event Information**

The 4th annual Python Web Conf is a virtual event designed to promote best practices for hard web production problems. It features international experts presenting on 85 topics such as Django, CI/CD, Containers, Serverless, REST APIs, web security, microservices and more!

The highly engaging format features 90 speakers, 6 tracks (including 80 talks and 4 tutorials) and numerous opportunities to mingle and connect via virtual cocktails, online gaming, and interactive tech talks to name a few. Access to presentations and post-event recordings will be available exclusively to registered attendees.

[Original Talk Link](https://2022.pythonwebconf.com/speakers/dmitry-vinnik)

**Recording**`},{title:"Developer Week",description:"One of the largest developer conference & event series focused on developer technology, from blockchain and artificial intelligence to big data and quantum computing.",date:"2022-02-07",tags:["oss"],slug:"/events/2022/developer-week/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2022_developer-week_0a46ac35.jpg",links:["https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health","https://emamo.com/event/developerweek-2022/r/speaker/dmitry-vinnik","https://www.youtube.com/embed/it0Zo5QhlQk"],body:`**Presence**

[The 10,000 Steps of Open Source Project Health](https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health)

**Location**

Virtual

**Event Information**

DeveloperWeek puts the spotlight on new technologies. Companies that participated in past DeveloperWeek events include Google, Facebook, Yelp, Rackspace, IBM, Cloudera, Red Hat, Optimizely, SendGrid, Blackberry, Microsoft, Neo Technology, Eventbrite, Klout, Built.io, Ripple, GNIP, Tagged, HackReactor, and 30+ more here!

When it comes to technology, there’s incremental change, and then there’s fundamental innovation. Developer technology, from blockchain and artificial intelligence to big data and quantum computing represents fundamental innovation that people can build on for years. We are in the DevTech Age, where developer technologies and tools are now the most disruptive and fundamental technology innovation in the marketplace. When you build tools for developers, you are not just implementing a small incremental use case, you are building platforms, frameworks, and APIs that will enable entirely new web, mobile, and IoT innovation.

[Original Talk Link](https://emamo.com/event/developerweek-2022/r/speaker/dmitry-vinnik)

**Recording**`},{title:"GDG DevFest UK & Ireland",description:"DevFest is one of the larger scale community-driven tech conferences in the UK & Ireland, carefully crafted for you by the Google Developer Group (GDG) community.",date:"2022-01-29",tags:["oss"],slug:"/events/2022/gdg-devfest-uk-ireland/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2022_gdg-devfest-uk-ireland_b6afc8ee.jpg",links:["https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health","https://www.devfest-uki.com/","https://www.youtube.com/embed/it0Zo5QhlQk"],body:`**Presence**

[The 10,000 Steps of Open Source Project Health](https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health)

**Location**

Virtual

**Event Information**

DevFest is one of the larger scale community-driven tech conferences in the UK & Ireland, carefully crafted for you by the Google Developer Group (GDG) community!  GDG is a group of developers passionate about Google technologies with a strong focus on knowledge exchange and networking.

This year's DevFest UK & Ireland will be a hybrid one (in-person and virtual), with the in-person part being held at etc Venues St Paul's.

Learn about Mobile, Web, Cloud, AI, Machine Learning, Hot Tech and more from world experts.  We also have a track dedicated solely on Diversity, Equity & Inclusion.

[Original Talk Link](https://www.devfest-uki.com/)

**Recording**`},{title:"GeekCamp Singapore",description:"A one-stop event to get acquainted and grow your tech network in Singapore: a hybrid online + in-person GeekcampSG.",date:"2021-11-06",tags:["oss"],slug:"/events/2021/geekcamp-singapore/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_geekcamp-singapore_f0af9ba9.jpg",links:["https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health","https://www.youtube.com/embed/fRw49EbP2vs?start=657"],body:`**Presence**

[The 10,000 Steps of Open Source Project Health](https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health)

**Location**

Virtual

**Event Information**

A one-stop event to get acquainted and grow your tech network in Singapore: a hybrid online + in-person GeekcampSG. The end goal: to reignite vibrant and inspiring meetups in the tech community.

**Recording**`},{title:"Azure Community Conference",description:"The conference is aimed at Cloud and Web Developers working with open source and cloud native technologies on the Microsoft Stack.",date:"2021-10-29",tags:["wellness"],slug:"/events/2021/azure-community/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_azure-community_70032285.jpg",links:["https://dvinnik.dev/presentations/2018/stress-driven-development"],body:`**Presence**

[Stress Driven Development, and How to Avoid It](https://dvinnik.dev/presentations/2018/stress-driven-development)

**Location**

Virtual

**Event Information**

Azure Community Conference will be a 3 day multi-track virtual conference between 29 - 31, October 2021. The conference is aimed at Cloud and Web Developers working with open source and cloud native technologies on the Microsoft Stack.

We host technology experts around the globe to educate, network, and share their expertise with our global attendees.`},{title:"Conf42 - JavaScript",description:"Polyglot Technology Conference run by a team passionate about technology and use the cutting edge to deliver better events across the globe.",date:"2021-10-26",tags:["testing"],slug:"/events/2021/conf42-javascript/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_conf42-javascript_81989279.jpg",links:["https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium","https://www.conf42.com/JavaScript_2021_Dmitry_Vinnik_Web_Testing_Selenium","https://www.youtube.com/embed/lVYO1_IEpxI"],body:`**Presence**

[Modern Web Testing: Going Beyond Selenium](https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium)

**Location**

Virtual

**Event Information**

We are passionate about technology and use the cutting edge to deliver better events across the globe. We're lean, agile and will go the extra mile to help you grow your business.

[Original Talk Link](https://www.conf42.com/JavaScript_2021_Dmitry_Vinnik_Web_Testing_Selenium)

**Recording**`},{title:"WeAreDevelopers Live: JavaScript Congress",description:"Virtual event series with tech talks, coding sessions and workshops about building great software.",date:"2021-10-25",tags:["oss"],slug:"/events/2021/wearedevelopers-javascript-congress/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_wearedevelopers-javascript-congress_c12215ba.jpg",links:["https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health","https://www.wearedevelopers.com/en/videos/measuring-project-health-in-open-source"],body:`**Presence**

[The 10,000 Steps of Open Source Project Health](https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health)

**Location**

Virtual

**Event Information**

WeAreDevelopers Live is a free virtual event series with tech talks, coding sessions and workshops about building great software - delivered by proven experts and developers from the community.

**Recording**

[Link](https://www.wearedevelopers.com/en/videos/measuring-project-health-in-open-source)`},{title:"DjangoCon US",description:"Virtual event focused on building mobile and web applications covering rom tutorials on building mobile applications and rapid prototyping to talks about data visualization and accessibility.",date:"2021-10-23",tags:["testing"],slug:"/events/2021/djangocon-us/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_djangocon-us_7075659d.jpg",links:["https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium","https://2021.djangocon.us/talks/modern-web-testing-going-beyond-selenium/","https://www.youtube.com/embed/uDCQMdLJlWg"],body:`**Presence**

[Modern Web Testing: Going Beyond Selenium](https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium)

**Location**

Virtual

**Event Information**

From tutorials on building mobile applications and rapid prototyping to talks about data visualization and accessibility, 2021 was DjangoCon US's best year ever!

This was an innovative year for DjangoCon US! Every year, DjangoCon US works hard to make our program better and more accessible, and this year we're super proud of the features we were able to add:

Bilingual talks: for the first time, all talks were available with both Spaniish and English subtitles.
Chat: We had a virtual conference hall in SpatialChat where people could congregate, listen to a live session from our awesome DJ Rana Ransom, and more.

[Original Talk Link](https://2021.djangocon.us/talks/modern-web-testing-going-beyond-selenium/)

**Recording**`},{title:"Go West",description:"Hybrid conference the for Rocky Mountain West communities (Arizona, Utah, Colorado, Idaho) with a goal to highlight the local talent and expertise in engineering with the Go programming language",date:"2021-10-22",tags:["golang"],slug:"/events/2021/go-west/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_go-west_544771dd.jpg",links:["https://dvinnik.dev/presentations/2021/ent_making-data-easy-in-go","https://hopin.com/events/gowest-conference-2021#speakers","https://www.youtube.com/embed/NvjvzYacgQg"],body:`**Presence**

[Ent: Making Data Easy in Go](https://dvinnik.dev/presentations/2021/ent_making-data-easy-in-go)

**Location**

Virtual

**Event Information**

The GoWest conference is a hybrid conference the for Rocky Mountain West communities (Arizona, Utah, Colorado, Idaho).
It has two main goals:

To highlight the local talent and expertise in engineering with the Go programming language

​To bring world-renowned Go speakers to the area.

We love having international participation. Everyone is welcome to attend and join in celebrating the communities that make Go great.

[Original Talk Link](https://hopin.com/events/gowest-conference-2021#speakers)

**Recording**`},{title:"All Things Open 2021",description:"Polyglot technology conference focusing on the tools, processes and people making open source possible.",date:"2021-10-21",tags:["mobile"],slug:"/events/2021/allthingsopen/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_allthingsopen_8002db4a.jpg",links:["https://dvinnik.dev/presentations/2021/hands-on-react-native","https://2021.allthingsopen.org/speakers/dmitry-vinnik/","https://www.youtube.com/embed/9tXktXR9iJk"],body:`**Presence**

[Hands-on React Native: From Zero to Hero](https://dvinnik.dev/presentations/2021/hands-on-react-native)

**Location**

Raleigh, NC, USA

**Event Information**

For more than 8 years we’ve followed these beliefs and created events and platforms that have hosted tens of thousands from all over the world.  Just a few include All Things Open, the largest open-source event on the U.S. east coast, the Open Source 101 series, the Open Source Research Triangle Park (RTP) meetup, the Open Source South Carolina meetup, OpenSourceJobs.com, OpenSourceScore. com, and many more.

And throughout it all, our focus on access, diversity, and inclusion and a commitment to helping others have remained steadfast.  We strongly believe you can do business differently and still be successful, which is why we worked hard to earn a Certified B Corp certification in 2018.

[Original Talk Link](https://2021.allthingsopen.org/speakers/dmitry-vinnik/)

**Recording**`},{title:"TechBash",description:"Event focused on Web, Cloud, DevOps, Architecture, Best Practices, Soft Skills, and much more in a span of three full days of keynotes and breakout sessions.",date:"2021-10-19",tags:["java","mobile"],slug:"/events/2021/techbash/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_techbash_c5eb4b39.jpg",links:["https://dvinnik.dev/presentations/2019/enforcing-best-practices-with-kotlin","https://dvinnik.dev/presentations/2021/hands-on-react-native"],body:`**Presence**

- [Better Start: Enforcing Best Engineering Practices with Kotlin](https://dvinnik.dev/presentations/2019/enforcing-best-practices-with-kotlin)
- [Hands-on React Native: From Zero to Hero](https://dvinnik.dev/presentations/2021/hands-on-react-native)

**Location**

Virtual

**Event Information**

At TechBash, attendees will take their skills to the next level, learning from experts who share their knowledge in a fun, collaborative, and inclusive environment. TechBash is focused on Web, Cloud, DevOps, Architecture, Best Practices, Soft Skills, and much more. We provide three full days of keynotes and breakout sessions plus an optional fourth day of deep-dive workshops. And so you don't get burned out, we also have social events, a family day, and yes, we are hosted at the largest indoor waterpark on the East Coast. TechBash is a non-profit, community run event, led by developers for developers. After TechBash, attendees are inspired to build remarkable things.`},{title:"Porto Tech Hub",description:"The conference featured speakers from different areas & sectors with theme that was all about tech and bringing professionals together for knowledge sharing and an amazing networking experience",date:"2021-10-18",tags:["web","mobile"],slug:"/events/2021/porto-tech-hub/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_porto-tech-hub_24dabbca.jpg",links:["https://dvinnik.dev/presentations/2021/hands-on-react-native","https://www.youtube.com/embed/3J4hlbpczY8"],body:`**Presence**

[Hands-on React Native: From Zero to Hero](https://dvinnik.dev/presentations/2021/hands-on-react-native)

**Location**

Virtual

**Event Information**

Porto Tech Hub Conference 2021 occurred on November 18th and 19th, online and free. The conference featured speakers from different areas & sectors. The conference theme was all about tech and bringing professionals together for knowledge sharing and an amazing networking experience.

**Recording**`},{title:"iSAQB Software Architecture Gathering",description:"International conference highlight for all those working on solution structures in IT projects: primarily software architects, developers and professionals in quality assurance.",date:"2021-10-14",tags:["wellness"],slug:"/events/2021/isaqb/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_isaqb_180a077a.jpg",links:["https://dvinnik.dev/presentations/2018/stress-driven-development","https://conferences.isaqb.org/software-architecture-gathering/program-2021/"],body:`**Presence**

[Stress Driven Development, and How to Avoid It](https://dvinnik.dev/presentations/2018/stress-driven-development)

**Location**

Virtual

**Event Information**

The Software Architecture Gathering — Digital 2022 is the international conference highlight for all those working on solution structures in IT projects: primarily software architects, developers and professionals in quality assurance, but also system analysts who want to communicate better with their developers. A selection of the best-known international experts will share their practical knowledge on the most important topics in state-of-the-art software architecture.

[Original Talk Link](https://conferences.isaqb.org/software-architecture-gathering/program-2021/)`},{title:"JCon 2021",description:"International Java community conference organized by the Java User Group Oberpfalz in cooperation with JAVAPRO Magazine",date:"2021-10-05",tags:["java"],slug:"/events/2021/jcon/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_jcon_8ffea2a4.jpg",links:["https://dvinnik.dev/presentations/2018/back-to-the-completable-future","https://jcon.sched.com/speaker/dmitryvinn?iframe=no&w=100%&sidebar=yes&bg=no","https://www.youtube.com/embed/JR0STPMcD5U"],body:`**Presence**

[Back to the CompletableFuture: Concurrency in Action](https://dvinnik.dev/presentations/2018/back-to-the-completable-future)

**Location**

Virtual

**Event Information**

JCON-ONLINE 2022 is the big international Java community conference organized by the Java User Group Oberpfalz in cooperation with JAVAPRO Magazine. Java is our profession and JCON is our passion and a lot of fun. We love to provide Java developers with a spectacular 100% live conference that is open to the entire Java- User-Group communities world-wide.

Last year, more than 2,500 participants from 77 countries and six continents had joined the JCON-ONLINE 2021.

The 6th JCON edition is presented as an online live conference for the thrid time. All sessions will be streamed live and recorded.

[Original Talk Link](https://jcon.sched.com/speaker/dmitryvinn?iframe=no&w=100%&sidebar=yes&bg=no)

**Recording**`},{title:"WeAreDevelopers Live: Mobile Day",description:"Virtual event series with tech talks, coding sessions and workshops about building great software.",date:"2021-10-03",tags:["web","mobile"],slug:"/events/2021/wearedevelopers-mobile-day/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_wearedevelopers-mobile-day_3e146cb1.jpg",links:["https://dvinnik.dev/presentations/2021/hands-on-react-native","https://player.vimeo.com/video/639870487?h=ff1b58e6e7&title=0&byline=0&portrait=0","https://vimeo.com/639870487","https://vimeo.com/wearedevelopers","https://vimeo.com"],body:`**Presence**

[Hands-on React Native: From Zero to Hero](https://dvinnik.dev/presentations/2021/hands-on-react-native)

**Location**

Virtual

**Event Information**

WeAreDevelopers Live is a free virtual event series with tech talks, coding sessions and workshops about building great software - delivered by proven experts and developers from the community.

**Recording**

<p><a href="https://vimeo.com/639870487">WeAreDevelopers Live - Mobile Day</a> from <a href="https://vimeo.com/wearedevelopers">WeAreDevelopers</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

*Starting from 4:59:00*`},{title:"Conf42 - Site Reliability Engineering",description:"Polyglot Technology Conference run by a team passionate about technology and use the cutting edge to deliver better events across the globe.",date:"2021-09-30",tags:["architecture"],slug:"/events/2021/conf42-sre/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_conf42-sre_3a2bf5f5.jpg",links:["https://dvinnik.dev/presentations/2018/dealing-with-legacy-systems","https://www.conf42.com/Site_Reliability_Engineering_2021_Dmitry_Vinnik_broken_windows_legacy_systems__poor_quality_gaps","https://www.youtube.com/embed/tCT-LSbF-uU"],body:`**Presence**

[Fixing Broken Windows: Dealing with Legacy Systems, Poor Quality and Gaps](https://dvinnik.dev/presentations/2018/dealing-with-legacy-systems)

**Location**

Virtual

**Event Information**

We are passionate about technology and use the cutting edge to deliver better events across the globe. We're lean, agile and will go the extra mile to help you grow your business.

[Original Talk Link](https://www.conf42.com/Site_Reliability_Engineering_2021_Dmitry_Vinnik_broken_windows_legacy_systems__poor_quality_gaps)

**Recording**`},{title:"JavaScript and Friends",description:"Web Conference based in Columbus with a mission to bring a diverse group of around 200 JavaScript developers and friends to learn new skills and concepts and to network and develop new relationships.",date:"2021-08-19",tags:["oss"],slug:"/events/2021/javascript-and-friends/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_javascript-and-friends_a8d7514d.jpg",links:["https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health","https://www.youtube.com/embed/4phw1GjfCjQ?start=13980"],body:`**Presence**

[The 10,000 Steps of Open Source Project Health](https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health)

**Location**

Virtual

**Event Information**

Our mission is to bring a diverse group of around 200 JavaScript developers and friends to learn new skills and concepts and to network and develop new relationships.

**Recording**`},{title:"Upstream",description:"A one-day celebration of open source, the developers who use it, and the maintainers who make it",date:"2021-08-19",tags:["oss"],slug:"/events/2021/upstream/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_upstream_5cc7b643.jpg",links:["https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health","https://upstream.live/speaker-2021/dmitry-vinnik","https://www.youtube.com/embed/5KixD9LVymo","https://opensource.com/article/21/5/upstream-2021","https://www.prnewswire.com/news-releases/open-source-maintainers-take-center-stage-joined-by-leaders-from-github-red-hat-google-and-jfrog-at-tidelift-upstream-event-301293468.html"],body:`**Presence**

[The 10,000 Steps of Open Source Project Health](https://dvinnik.dev/presentations/2021/10000-steps-of-open-source-project-health)

**Location**

Virtual

**Event Information**

A one-day celebration of open source, the developers who use it, and the maintainers who make it.

[Original Talk Link](https://upstream.live/speaker-2021/dmitry-vinnik)

**Recording**

**Press Mentions**

- [Join upstream maintainers in this new free online event](https://opensource.com/article/21/5/upstream-2021)
- [Open Source Maintainers Take Center Stage, Joined by Leaders from GitHub, Red Hat, Google, and JFrog at Tidelift Upstream Event](https://www.prnewswire.com/news-releases/open-source-maintainers-take-center-stage-joined-by-leaders-from-github-red-hat-google-and-jfrog-at-tidelift-upstream-event-301293468.html)`},{title:"Conf42 - Golang",description:"Polyglot Technology Conference run by a team passionate about technology and use the cutting edge to deliver better events across the globe.",date:"2021-06-24",tags:["golang"],slug:"/events/2021/conf42-golang/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_conf42-golang_484b19ea.jpg",links:["https://dvinnik.dev/presentations/2021/ent_making-data-easy-in-go","https://www.conf42.com/Golang_2021_Dmitry_Vinnik_ent_making_data_easy","https://www.youtube.com/embed/dOE_UEwzgMw"],body:`**Presence**

[Ent: Making Data Easy in Go](https://dvinnik.dev/presentations/2021/ent_making-data-easy-in-go)

**Location**

Virtual

**Event Information**

We are passionate about technology and use the cutting edge to deliver better events across the globe. We're lean, agile and will go the extra mile to help you grow your business.

[Original Talk Link](https://www.conf42.com/Golang_2021_Dmitry_Vinnik_ent_making_data_easy)

**Recording**`},{title:"YavaConf",description:"The event is distinguished by a strong emphasis on IT Security topics, profiled for developers.",date:"2021-06-24",tags:["java"],slug:"/events/2021/yavaconf/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_yavaconf_0b4fb5df.jpg",links:["https://dvinnik.dev/presentations/2018/back-to-the-completable-future","https://yavaconf.com/index-en.html"],body:`**Presence**

[Back to the CompletableFuture: Concurrency in Action](https://dvinnik.dev/presentations/2018/back-to-the-completable-future)

**Location**

Virtual

**Event Information**

We would like to present you a new conference on Javy technology stack. The event is distinguished by a strong emphasis on IT Security topics, profiled for developers.
The project is organized by the Academic Partners Foundation, whose team, in cooperation with IT communities, is responsible for organizing a number of leading Polish IT / data science conferences.

[Original Talk Link](https://yavaconf.com/index-en.html)`},{title:"Craft Conference",description:"An event that serves as a compass on new technologies and trends provided by top-notch experts from all over the world",date:"2021-06-02",tags:["oss"],slug:"/events/2021/craft-conference/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_craft-conference_b1f2aa63.jpg",links:["https://dvinnik.dev/presentations/2018/stress-driven-development","https://craft-conf.com/2021/speaker/DmitryVinnik","https://www.youtube.com/embed/ShF8mEzlsEI"],body:`**Presence**

[Stress Driven Development, and How to Avoid It](https://dvinnik.dev/presentations/2018/stress-driven-development)

**Location**

Virtual

**Event Information**

Craft Conference is an international festival-like event about software craft. It combines talk sessions, workshops and a hackathon where attendees can learn about the latest tools, methods and practices of software craft. An event that serves as a compass on new technologies and trends provided by top-notch experts from all over the world.

[Original Talk Link](https://craft-conf.com/2021/speaker/DmitryVinnik)

**Recording**`},{title:"Codefest",description:"One of the largest software conferences which gathers 1,500 attendees from all over the Russia.",date:"2021-05-29",tags:["testing"],slug:"/events/2021/codefest/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_codefest_882b08f2.jpg",links:["https://dvinnik.dev/presentations/2021/testing-react-with-jest","https://www.youtube.com/embed/zYUsQQV3Jpk"],body:`**Presence**

[Testing React with Jest: Validate Your Components Quickly!](https://dvinnik.dev/presentations/2021/testing-react-with-jest)

**Location**

Virtual

**Event Information**

CodeFest gathers 1,500 attendees from all over the Russia. We have talks about backend and frontend development, mobile development, QA, project and product management, UI/UX, and web design.

The conference is known for its friendly atmosphere, chill out zones, whiskey end, and afterparty at the end of the first conference day. We do our best to help our guests feel comfortable and meet new people.

**Recording**`},{title:"DevFest - Live",description:"Annual decentralized tech conference hosted by the Google Developer Groups (GDG) community",date:"2021-05-22",tags:["java"],slug:"/events/2021/devfest-live/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_devfest-live_906a07d3.jpg",links:["https://dvinnik.dev/presentations/2019/enforcing-best-practices-with-kotlin"],body:`**Presence**

[Better Start: Enforcing Best Engineering Practices with Kotlin](https://dvinnik.dev/presentations/2019/enforcing-best-practices-with-kotlin)

**Location**

Virtual

**Event Information**

DevFest is an annual decentralized tech conference hosted by the Google Developer Groups (GDG) community. GDGs host these events around the globe. DevFest 2022 marks the 11th year of DevFest and represents the beginning of the second decade of the GDG community.`},{title:"QA Global Summit",description:"Community based event for the professional growth of QAs and Testers from all around the world",date:"2021-04-07",tags:["testing"],slug:"/events/2021/qa-global-summit/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_qa-global-summit_747746bf.jpg",links:["https://dvinnik.dev/conversations/2019/career-path-and-dev-in-testing","https://www.youtube.com/embed/ySRc-juTbrc?start=23955"],body:`**Presence**

[Career Path and Development in Testing](https://dvinnik.dev/conversations/2019/career-path-and-dev-in-testing)

**Location**

Virtual

**Event Information**

Geekle started doing online events when offline events were stopped completely. We never stop and we are running the online QA Global Summit'23. Our speakers are leading experts from all over the world who are ready to share what challenges QA experts face in their work.

Geekle has the unique experience to gather huge tech summits with 5'000+ attendees in different tech domains. Now we hope to make something the world has never seen before for the QA Community.

**Recording**`},{title:"Conf42 - Enterprise Software",description:"Polyglot Technology Conference run by a team passionate about technology and use the cutting edge to deliver better events across the globe.",date:"2021-03-25",tags:["java"],slug:"/events/2021/conf42-enterprise/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_conf42-enterprise_d95c2be6.jpg",links:["https://dvinnik.dev/presentations/2018/back-to-the-completable-future","https://www.conf42.com/Enterprise_Software_2021_Dmitry_Vinnik_concurrency","https://www.youtube.com/embed/it0Zo5QhlQk"],body:`**Presence**

[Back to the CompletableFuture: Concurrency in Action](https://dvinnik.dev/presentations/2018/back-to-the-completable-future)

**Location**

Virtual

**Event Information**

We are passionate about technology and use the cutting edge to deliver better events across the globe. We're lean, agile and will go the extra mile to help you grow your business.

[Original Talk Link](https://www.conf42.com/Enterprise_Software_2021_Dmitry_Vinnik_concurrency)

**Recording**`},{title:"Algolia Community Party",description:"Event series aimed at our developer and product audience, to meet and greet the community during live events.",date:"2020-06-15",tags:["oss"],slug:"/events/2020/algolia-community-party/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2020_algolia-community-party_7bd1f88f.jpg",links:["https://dvinnik.dev/presentations/2020/documentation-made-easy-with-docusaurus","https://www.youtube.com/embed/Yhyx7otSksg","https://www.youtube.com/watch?v=Hl_4Le_0LOc"],body:`**Presence**

[Documentation Made Easy with Docusaurus](https://dvinnik.dev/presentations/2020/documentation-made-easy-with-docusaurus)

**Location**

Virtual

**Event Information**

 The Community Party is an event series aimed at our developer and product audience, to meet and greet the community during live events.

**Recording**

[Original Version](https://www.youtube.com/watch?v=Hl_4Le_0LOc)`},{title:"All Things Open 2019",description:"Polyglot technology conference focusing on the tools, processes and people making open source possible.",date:"2019-10-15",tags:["testing"],slug:"/events/2019/allthingsopen/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_allthingsopen_f9768401.jpg",links:["https://dvinnik.dev/presentations/2018/from-robotium-to-appium","https://2019.allthingsopen.org/talk/from-robotium-to-appium-choose-your-journey/"],body:`**Presence**

[From Robotium to Appium: Choose Your Journey](https://dvinnik.dev/presentations/2018/from-robotium-to-appium)

**Location**

Raleigh, NC, USA

**Event Information**

For more than 8 years we’ve followed these beliefs and created events and platforms that have hosted tens of thousands from all over the world.  Just a few include All Things Open, the largest open-source event on the U.S. east coast, the Open Source 101 series, the Open Source Research Triangle Park (RTP) meetup, the Open Source South Carolina meetup, OpenSourceJobs.com, OpenSourceScore. com, and many more.

And throughout it all, our focus on access, diversity, and inclusion and a commitment to helping others have remained steadfast.  We strongly believe you can do business differently and still be successful, which is why we worked hard to earn a Certified B Corp certification in 2018.

[Original Talk Link](https://2019.allthingsopen.org/talk/from-robotium-to-appium-choose-your-journey/)`},{title:"HackConf",description:"A software development conference for developers, by developers, Bulgaria`s premier software development conference, happening in Sofia.",date:"2019-10-11",tags:["leadership","wellness"],slug:"/events/2019/hackconf/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_hackconf_5fa45336.jpg",links:["https://dvinnik.dev/presentations/2019/remote-work_gateway-to-freedom","https://www.youtube.com/embed/IN3F3vfNgOM"],body:`**Presence**

[Remote Work: Gateway to Freedom](https://dvinnik.dev/presentations/2019/remote-work_gateway-to-freedom)

**Location**

VirtualHackConf is Bulgaria's premier software development conference, happening in Sofia.

Organized “by developers, for developers”, it covers a wide range of software development topics, regardless of the tech stack.

HackConf 2019 will include a full day of workshops on 11th of October, and two parallel tracks of talks during both conference days - 12th and 13th of October.

**Recording**`},{title:"Target Quality 2019",description:"Testing conference based in Canada run by an organization dedicated to the professional development of software testing and quality assurance practices",date:"2019-09-24",tags:["wellness"],slug:"/events/2019/target-quality/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_target-quality_4cc6d20c.jpg",links:["https://dvinnik.dev/presentations/2018/stress-driven-development","https://kwsqa.org/past-conferences/tq2019/schedule/"],body:`**Presence**

[Stress Driven Development, and How to Avoid It](https://dvinnik.dev/presentations/2018/stress-driven-development) 

**Location**

Virtual

**Event Information**

Founded late in the 20th century (1997), the Kitchener Waterloo Software Quality Association is a volunteer-run, not-for-profit, independent organization of software professionals who have an interest in quality and testing.

We offer events that enable professional networking, skills development, and learning related to software quality, software testing, technical leadership, and agile development practices.

[Original Talk Link](https://kwsqa.org/past-conferences/tq2019/schedule/)`},{title:"VoxxedDays Banff 2019",description:"Voxxed Days is a series of tech events organised by local community groups and supported by the Voxxed team",date:"2019-09-21",tags:["wellness"],slug:"/events/2019/voxxeddays-banff/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_voxxeddays-banff_448ce0c3.jpg",links:["https://dvinnik.dev/presentations/2019/remote-work_gateway-to-freedom/","https://www.youtube.com/embed/INs_FyL-F8M"],body:`**Presence**

[Remote Work: Gateway to Freedom](https://dvinnik.dev/presentations/2019/remote-work_gateway-to-freedom/) 

**Location**

Banff, AB, Canada

**Event Information**

Welcome to Voxxed Days Banff a conference for software developers by software developers. This two day community driven event will take place on September 20th and 21st at the inspiring Banff Centre located in the Canadian Rocky Mountains in the town of Banff, Alberta, Canada.

**Recording**`},{title:"Oracle Code One",description:"Developer event covering a variety of open technologies and programming languages developers have come to love over the years",date:"2019-09-16",tags:["java","testing"],slug:"/events/2019/code-one/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_code-one_d39ee50b.jpg",links:["https://dvinnik.dev/presentations/2018/uphill-battle-of-mobile-testing","https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium"],body:`**Presence**

- [Uphill Battle of Mobile Visual Regression](https://dvinnik.dev/presentations/2018/uphill-battle-of-mobile-testing) 
- [Modern Web Testing: Going Beyond Selenium](https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium)

**Location**

San Francisco, CA, US

**Event Information**

Oracle Code One is a developer event covering a variety of open technologies and programming languages developers have come to love over the years. Talks will revolve around Go, Rust, Python, JavaScript, and R and SQL along with more of the latest Java technical content.`},{title:"IndyPy Python Web Conf",description:"Virtual event that features international tech experts presenting on 24 topics such as microservices, identity management, machine learning and CI/CD.",date:"2019-08-23",tags:["testing"],slug:"/events/2019/indypy/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_indypy_5a1d9a2e.jpg",links:["https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium","https://2019.indypy.org/webconf/talks/modern-web-testing-going-beyond-selenium/","https://www.youtube.com/embed/2thHXWjhQko"],body:`**Presence**

[Modern Web Testing: Going Beyond Selenium](https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium)

**Location**

Virtual

**Event Information**

The Python Web Conf is a virtual event that features international tech experts presenting on 24 topics such as microservices, identity management, machine learning and CI/CD. The talks are split into 3 exciting tracks: “App Dev”, “Cloud Native” and “Automate & Deploy”.

[Original Talk Link](https://2019.indypy.org/webconf/talks/modern-web-testing-going-beyond-selenium/)

**Recording**`},{title:"Kansas City Developer Conference",description:"Large conference with a focus on new and experienced Developers, Architects, UI/UX Designers based in Kansas City.",date:"2019-07-18",tags:["java"],slug:"/events/2019/kcdc/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_kcdc_80ffd568.jpg",links:["https://dvinnik.dev/presentations/2018/back-to-the-completable-future","https://kcdc2019.myconf.app/session/ses-85724"],body:`**Presence**

[Back to the CompletableFuture: Concurrency in Action](https://dvinnik.dev/presentations/2018/back-to-the-completable-future)

**Location**

Kansas City, MO, USA

**Event Information**

The Kansas City Developer Conference is excited to announce our 14th annual event! Our 2023 conference will be held June 21-23, 2023, with a pre-conference workshop day and two full conference days. Once again, the event will be held at the Kansas City Convention Center in downtown Kansas City. Each year, we draw a large audience of new and experienced Developers, Architects, UI/UX Designers, QA Professionals, PMs, and Technology Managers from Missouri, Kansas, Illinois, Nebraska, Iowa, Minnesota, Oklahoma, the Dakotas, and around the United States and the world. We hope you will join us!

[Original Talk Link](https://kcdc2019.myconf.app/session/ses-85724)`},{title:"FullStack London",description:"Conference on the go-to JavaScript, Node, Angular and IoT conference in London along with other topics like Web-Animation, ES6, CSS3, Machine Learning, Functional Programming.",date:"2019-07-10",tags:["testing"],slug:"/events/2019/fullstack-london/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_fullstack-london_7f288c56.jpg",links:["https://dvinnik.dev/presentations/2018/uphill-battle-of-mobile-testing","https://skillsmatter.com/skillscasts/13905-workshop-uphill-battle-of-mobile-visual-regression"],body:`**Presence**

[Uphill Battle of Mobile Visual Regression](https://dvinnik.dev/presentations/2018/uphill-battle-of-mobile-testing)

**Location**

London, UK

**Event Information**

FullStack is the go-to JavaScript, Node, Angular and IoT conference in London. Other topics explored will include Web-Animation, ES6, CSS3, Machine Learning, Functional Programming, Software Craftsmanship, Testing and various frameworks including D3js, React, Angular, Node, Babylon, Ember and more!

[Original Talk Link](https://skillsmatter.com/skillscasts/13905-workshop-uphill-battle-of-mobile-visual-regression)`},{title:"Devoxx Poland 2019",description:"Devoxx is the biggest Java conference in Poland and is a great way to learn about new things that are being developed in the Java world.",date:"2019-06-26",tags:["testing","wellness"],slug:"/events/2019/devoxx-poland/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_devoxx-poland_bc6f5d70.jpg",links:["https://dvinnik.dev/presentations/2019/gauge+taiko_bdd-for-web-revived","https://dvinnik.dev/presentations/2018/stress-driven-development","http://cfp.2019.devoxx.pl/speaker/dmitry_vinnik.html","https://www.youtube.com/embed/eTUSYiJYL1s","https://dvinnik.dev/presentations/2019/gauge+taiko_bdd-for-web-revived"],body:`**Presence**

- [Gauge + Taiko: BDD for Web Revived](https://dvinnik.dev/presentations/2019/gauge+taiko_bdd-for-web-revived) 
- [Stress Driven Development, and How to Avoid It](https://dvinnik.dev/presentations/2018/stress-driven-development)

**Location**

Kraków, Poland

**Event Information**

Devoxx is the biggest Java conference in Poland and is a great way to learn about new things that are being developed in the Java world.
 
[Original Talk Link](http://cfp.2019.devoxx.pl/speaker/dmitry_vinnik.html)

**Recording**

<

*[Gauge + Taiko: BDD for Web Revived](https://dvinnik.dev/presentations/2019/gauge+taiko_bdd-for-web-revived) *

*[Stress Driven Development, and How to Avoid It](https://dvinnik.dev/presentations/2018/stress-driven-development)*`},{title:"Agile Testing Days - USA",description:"Vest known for its rich 6-track program and open minded atmosphere, featuring track sessions and workshops, keynotes, full-day tutorials",date:"2019-06-23",tags:["testing"],slug:"/events/2019/agile-testing-days-usa/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_agile-testing-days-usa_56f9e09d.jpg",links:["https://dvinnik.dev/presentations/2019/gauge+taiko_bdd-for-web-revived"],body:`**Presence**

[Gauge + Taiko: BDD for Web Revived](https://dvinnik.dev/presentations/2019/gauge+taiko_bdd-for-web-revived) 

**Location**

Chicago, IL, USA

**Event Information**

The five day conference is best known for its rich 6-track program and open minded atmosphere, featuring track sessions and workshops, keynotes, full-day tutorials and training classes, and exceptional bonus sessions. What makes AgileTDUSA stand out is the great variety of social events and networking opportunities along with the mindset and topics it promotes. Ranging from emerging technical needs in agile testing to accessibilty, mentoring, and mental health, ATD USA widens the scope for tech-based businesses. 

In recent years speakers, attendees and organizers have built one of the most diverse, collaborative, and energetic communities in the world—a safe place to share ideas and evolve professional and personal skills. In other words, for us it's all about you.`},{title:"VoxxedDays Luxembourg",description:"Voxxed Days is a series of tech events organised by local community groups and supported by the Voxxed team",date:"2019-06-21",tags:["testing"],slug:"/events/2019/voxxeddays-luxembourg/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_voxxeddays-luxembourg_dc5d79dd.jpg",links:["https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium","https://romania.voxxeddays.com/2019/04/14/modern-web-testing-going-beyond-selenium-2/","https://www.youtube.com/embed/05ZprOn7s4w"],body:`**Presence**

- [Modern Web Testing: Going Beyond Selenium](https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium) 

**Location**

Luxembourg, Luxembourg

**Event Information**

This year we are excited to announce a three rooms BIG return to the Palazzo dei Congressi in Lugano in hybrid version! You will have the chance to share knowledge and learn about some fascinating new ideas from some of the best local and global speakers of the development world.

[Original Talk Link](https://romania.voxxeddays.com/2019/04/14/modern-web-testing-going-beyond-selenium-2/)

**Recording**`},{title:"DevRelCon - San Francisco",description:"DevRelCon San Francisco: developer experience, developer relations and developer marketing, coming together with expert practitioners from across the world to join the conversation about developer experience.",date:"2019-06-06",tags:["devrel"],slug:"/events/2019/devrelcon-sf/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_devrelcon-sf_74529bf1.jpg",links:["https://dvinnik.dev/presentations/2019/kindness-engineering","https://sf2019.devrel.net/dmitry-vinnik/","https://www.youtube.com/embed/B2eeOUkTv7A"],body:`**Presence**

[Kindness Engineering: Focusing on What Matters](https://dvinnik.dev/presentations/2019/kindness-engineering) 

**Location**

San Francisco, CA, USA

**Event Information**

DevRelCon San Francisco: developer experience, developer relations and developer marketing.

This year we're focusing on how to serve the diversity of needs represented in the developer community, as well as the usual themes of developer relations, developer experience, developer marketing and more.

Come together with expert practitioners from across the world to join the conversation about developer experience, developer relations, developer marketing and community.
 
[Original Talk Link](https://sf2019.devrel.net/dmitry-vinnik/)

**Recording**`},{title:"Nordic Testing Days 2019",description:"Nordic Testing Days is an annual conference primarily aimed at software testers and also welcome others ranging from programmers to UX specialists, project managers to designers.",date:"2019-05-30",tags:["testing"],slug:"/events/2019/nordic-testing-days/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_nordic-testing-days_8e33186c.jpg",links:["https://dvinnik.dev/presentations/2019/gauge+taiko_bdd-for-web-revived"],body:`**Presence**

[Gauge + Taiko: BDD for Web Revived](https://dvinnik.dev/presentations/2019/gauge+taiko_bdd-for-web-revived) 

**Location**

Tallinn, Estonia

**Event Information**

Nordic Testing Days is an annual conference primarily aimed at software testers. However, during the recent years we have branched out and also welcome others ranging from programmers to UX specialists, project managers to designers etc. In other words, everyone who is interested in dipping their toes into testing and contributing to smoother software development cycle and quality. We believe this will help diversify learning across the board.

Nordic Testing Days conference is put together by volunteers, who are mostly testing professionals, committed to strengthening the community and providing software quality related education.`},{title:"MIXIT",description:"The conference for ethics and diversity in tech with crêpes and love The conference for ethics and diversity in tech with crêpes and love",date:"2019-05-23",tags:["testing"],slug:"/events/2019/mixit/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_mixit_904567b9.jpg",links:["https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium","https://mixitconf.org/en/2019/modern-web-testing-going-beyond-selenium","https://player.vimeo.com/video/339718328?h=e2d03b77dc&title=0&byline=0&portrait=0","https://vimeo.com/339718328","https://vimeo.com/mixitconf"],body:`**Presence**

[Modern Web Testing: Going Beyond Selenium](https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium) 

**Location**

Lyon, France

**Event Information**

MiXiT comes back for a 2022 edition in person at the Manufacture des Tabacs in Lyon on May 24 & 25, 2022 🥳 We might have to adapt to the sanitary restrictions, but we'll apply the traditional recipe of MiXiT: crêpes, "alien" speakers, and a lot of ❤️. And that will be the occasion for us to celebrate our 10th edition in person, so you can expect some surprises! (we don't forget the 2021 online edition and its handful of selected speakers, but the team is not ready to endure the vagaries of connections and streaming tools again).

[Original Talk Link](https://mixitconf.org/en/2019/modern-web-testing-going-beyond-selenium)

**Recording**

<p><a href="https://vimeo.com/339718328">Modern Web Testing: Going Beyond Selenium - Dmitry Vinnik - MiXiT 2019</a> from <a href="https://vimeo.com/mixitconf">MiXiT</a> on <a href="https://vimeo.com">Vimeo</a>.</p>`},{title:"VoxxedDays Bucharest",description:"Voxxed Days is a series of tech events organised by local community groups and supported by the Voxxed team",date:"2019-05-21",tags:["testing"],slug:"/events/2019/voxxeddays-bucharest/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_voxxeddays-bucharest_bf511f7c.jpg",links:["https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium","https://romania.voxxeddays.com/2019/04/14/modern-web-testing-going-beyond-selenium-2/","https://www.youtube.com/embed/kiNjG9-qbAY"],body:`**Presence**

- [Modern Web Testing: Going Beyond Selenium](https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium) 
- Speaking Panel: Frontend Frameworks in 2019

**Location**

Bucharest, Romania

**Event Information**

This year we are excited to announce a three rooms BIG return to the Palazzo dei Congressi in Lugano in hybrid version! You will have the chance to share knowledge and learn about some fascinating new ideas from some of the best local and global speakers of the development world.

[Original Talk Link](https://romania.voxxeddays.com/2019/04/14/modern-web-testing-going-beyond-selenium-2/)

**Recording**`},{title:"GeeCon - Poland",description:"Largest Java Conference in Czech Republic focused on Java and JVM based technologies, dynamic languages, enterprise architectures, patterns, distributed computing, software craftsmanship, mobile and much more.",date:"2019-05-15",tags:["testing"],slug:"/events/2019/geecon-poland/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_geecon-poland_f56f0867.jpg",links:["https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium","https://2019.geecon.org/speakers/info.html?id=496","https://www.youtube.com/embed/1m2AcmiEdpI","https://www.softwaretestingmagazine.com/videos/modern-web-testing-going-beyond-selenium/"],body:`**Presence**

[Modern Web Testing: Going Beyond Selenium](https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium) 

**Location**

Kraków, Poland

**Event Information**

Java and JVM based technologies, dynamic languages, enterprise architectures, patterns, distributed computing, software craftsmanship, mobile and much more.
 
[Original Talk Link](https://2019.geecon.org/speakers/info.html?id=496)

**Recording**

**Press Mentions**

- [Software Testing Magazine](https://www.softwaretestingmagazine.com/videos/modern-web-testing-going-beyond-selenium/)`},{title:"Quest Conference",description:"Best source for new technologies and proven methods for Quality Engineered Software and Testing. Thought leaders, evangelists, innovative practitioners.",date:"2019-05-13",tags:["testing"],slug:"/events/2019/quest/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_quest_4c1f5bea.jpg",links:["https://dvinnik.dev/presentations/2018/uphill-battle-of-mobile-testing","https://dvinnik.dev/presentations/2018/from-robotium-to-appium"],body:`**Presence**

- [Uphill Battle of Mobile Visual Regression](https://dvinnik.dev/presentations/2018/uphill-battle-of-mobile-testing) 
- [From Robotium to Appium: Choose Your Journey](https://dvinnik.dev/presentations/2018/from-robotium-to-appium)

**Location**

Chicago, IL, USA

**Event Information**

QUEST 2019 Conference is the best source for new technologies and proven methods for Quality Engineered Software and Testing. Thought leaders, evangelists, innovative practitioners, and IT professionals from across North America gather together for a week packed with classes, tutorials, educational sessions, hand-on workshops, discussions groups, EXPO, and networking events. Let your quest to build, test, and deliver quality software begin with QUEST 2019!`},{title:"NDC Minnesota",description:"Conference for Software Developers focusing on hands-on workshops, inspirational keynotes and evening events.",date:"2019-05-07",tags:["testing"],slug:"/events/2019/ndc-minnesota/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_ndc-minnesota_d7182afc.jpg",links:["https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium","https://www.youtube.com/embed/c0LcuPRBFvo"],body:`**Presence**

[Modern Web Testing: Going Beyond Selenium](https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium) 

**Location**

St Paul, MN, USA

**Event Information**

NDC Minnesota 2022 is a 4-day event focusing on hands-on workshops, inspirational keynotes and evening events. Every day starts off with a keynote in the plenary room before attendees break out into workshops for the rest of the day.

**Recording**`},{title:"StarEast",description:"TechWell conference that delivers training, support, research, and publications to software managers, developers, test professionals, and quality engineers worldwide.",date:"2019-04-28",tags:["testing"],slug:"/events/2019/StarEast/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_StarEast_fad38037.jpg",links:["https://dvinnik.dev/presentations/2018/uphill-battle-of-mobile-testing","https://dvinnik.dev/conversations/2019/overcoming-challenges-of-remote-work","https://stareast.techwell.com/program/concurrent-sessions/visual-regression-testing-critical-part-mobile-testing-strategy-stareast-2019"],body:`**Presence**

- [Uphill Battle of Mobile Visual Regression](https://dvinnik.dev/presentations/2018/uphill-battle-of-mobile-testing) 
- [Interview: Overcoming the Challenges Facing Remote Employees: An Interview with Dmitry Vinnik](https://dvinnik.dev/conversations/2019/overcoming-challenges-of-remote-work)

**Location**

Orlando, FL, USA

**Event Information**

TechWell delivers training, support, research, and publications to software managers, developers, test professionals, and quality engineers worldwide. Since 1986, we have been at the forefront of software quality improvement technology and were instrumental in setting the stage for the software industry to view testing as a distinct discipline. Today, TechWell produces several of the most respected conferences in the software testing and development industry including the STAR, Agile + DevOps, and EPIC Experience conference series. TechWell hosts international gatherings of software professionals and experts focused on building better software. Our events feature real-world techniques and strategies from leading software organizations, practical insight from industry experts, as well as the knowledge and support gained through peer-based networking.

[Original Talk Link](https://stareast.techwell.com/program/concurrent-sessions/visual-regression-testing-critical-part-mobile-testing-strategy-stareast-2019)`},{title:"Svelte Summit Spring",description:"Event dedicated to Svelte and everything that is happening in the community covering testing, hot trends, and more.",date:"2019-04-25",tags:["testing"],slug:"/events/2021/svelte-summit-spring/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2021_svelte-summit-spring_c2363d3b.jpg",links:["https://dvinnik.dev/presentations/2021/testing-svelte-with-jest","https://www.youtube.com/embed/fnr9XWvjJHw?start=4194"],body:`**Presence**

[Testing Svelte with Jest: Validate Your Components Quickly!](https://dvinnik.dev/presentations/2021/testing-svelte-with-jest)

**Location**

Virtual

**Event Information**

Svelte Summit is an event dedicated to Svelte and everything that is happening in the community. The event will be a day of (exclusive) talks streamed online, syndicated on various platforms including YouTube. Specific discussions about the talks and water-cooler chit-chat will happen live in the Svelte Discord server. The fall event this year will take place on Nov 20th.

Get more information on the Svelte Fall Summit 2021 website and signup to the mailing list!

**Recording**`},{title:"Javaland",description:"Two eventful days packed with presentations, community activities, an accompanying exhibition, workshops, exchange and networking with a unique amusement park flair.",date:"2019-03-18",tags:["java"],slug:"/events/2019/javaland/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_javaland_24ab48c9.jpg",links:["https://dvinnik.dev/presentations/2018/back-to-the-completable-future"],body:`**Presence**

[Back to the CompletableFuture: Concurrency in Action](https://dvinnik.dev/presentations/2018/back-to-the-completable-future)

**Location**

Brühl, Germany

**Event Information**

Two eventful days packed with presentations, community activities, an accompanying exhibition, workshops, exchange and networking with a unique amusement park flair.

For the sixth year in a row, JavaLand took place in Phantasialand in Brühl. We were very happy to welcome so many old friends, but also new faces. We hope you had a lot of fun and look forward to seeing you again next year! Jatumba!`},{title:"Booster Conf",description:"Software Conference for the whole team with a focus on developers, project managers, architects, UX professionals, testers or security professionals.",date:"2019-03-12",tags:["testing"],slug:"/events/2019/booster-conf/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_booster-conf_b380a7df.jpg",links:["https://dvinnik.dev/presentations/2018/dealing-with-legacy-systems","https://2019.boosterconf.no/talks/1296"],body:`**Presence**

[Fixing Broken Windows: Dealing with Legacy Systems, Poor Quality and Gaps](https://dvinnik.dev/presentations/2018/dealing-with-legacy-systems) 

**Location**

Bergen, Norway

**Event Information**

*THE SOFTWARE CONFERENCE FOR THE WHOLE TEAM*

Booster is a software conference for the entire team. That means if you’re a developer, project manager, architect, UX professional, tester or security professional, we have something for you!

Our goal is that you come back from the conference with real knowledge you can use. That’s why interactive, hands-on workshops fill up most of the hours of the conference. We also have lightning talks, a few short talks, a couple of keynotes and open spaces.

[Original Talk Link](https://2019.boosterconf.no/talks/1296)`},{title:"AgentConf",description:"One of the largest Web conferences in Germany where participants talked a lot with each other and especially with the speakers during the breaks",date:"2019-02-21",tags:["wellness"],slug:"/events/2019/agentconf/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_agentconf_ba09ecca.jpg",links:["https://dvinnik.dev/presentations/2018/stress-driven-development","https://www.youtube.com/embed/IVHI5uSgLFc"],body:`**Presence**

[Stress Driven Development, and How to Avoid It](https://dvinnik.dev/presentations/2018/stress-driven-development) 

**Location**

Dornbirn, Austria

**Event Information**

The event started with two days of quality talks followed by two days of winter activities in Lech.

In Dornbirn we had very high level talks about current and future technologies. Participants talked a lot with each other and especially with the speakers during the breaks. It was so warm that many people enjoyed the sun outside between the talks.

**Recording**`},{title:"c`twebdev",description:"One of the largest Web conferences in Germany that offers a good opportunity for the frontend community to meet, exchange ideas and above all to get insights into software technology.",date:"2019-02-05",tags:["testing"],slug:"/events/2019/ctwebdev/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_ctwebdev_286e3dca.jpg",links:["https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium"],body:`**Presence**

[Modern Web Testing: Going Beyond Selenium](https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium)

**Location**

Köln, Germany

**Event Information**

The conference offers a good opportunity for the frontend community to meet, exchange ideas and above all to get insights into software technology, best practices and technology trends with many great talks.`},{title:"DevFestMN",description:"Web conference organized by the Google Developer Group: Twin Cities. Each DevFest event is crafted by its local organizers to fit the needs and interests of its local developer community.",date:"2019-02-02",tags:["testing"],slug:"/events/2019/devfest-mn/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2019_devfest-mn_b55e74eb.jpg",links:["https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium/cover.jpg"],body:`**Presence**

[Modern Web Testing: Going Beyond Selenium](https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium/cover.jpg)

**Location**

Minneapolis, MN, USA

**Event Information**

DevFests are local tech conferences hosted by Google Developer Groups (GDG) around the world. Each DevFest event is crafted by its local organizers to fit the needs and interests of its local developer community. Whether it be through hands-on learning experiences, technical talks delivered in local languages by experts, or by simply meeting fellow local developers, DevFest attendees learn how to build together and innovate on Google's developer tools.`},{title:"Dreamforce 2018",description:"Annual event that brings together the global Salesforce community for learning, fun, community building, and philanthropy.",date:"2018-11-09",tags:["business"],slug:"/events/2018/dreamforce/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_dreamforce_4279f6cc.jpg",links:["https://dvinnik.dev/presentations/2018/design-pixel-perfect-community-cloud","https://www.youtube.com/embed/4tEwBSetNUM"],body:`**Presence**

[Design Pixel-Perfect User Experiences with Community Cloud](https://dvinnik.dev/presentations/2018/design-pixel-perfect-community-cloud)

**Location**

San Francisco, CA, USA

**Event Information**

Dreamforce is an annual event that brings together the global Salesforce community for learning, fun, community building, and philanthropy. Trailblazers from all over the world gather to share their insights, successes, and learn the latest in industry innovations. 

Started in 2003, Dreamforce has grown into far more than just a conference — it’s a can’t-miss, immersive experience. From inspiring keynotes and sessions, to visionary thinking and the future of technology, to learning how business can be the greatest platform for change, attendees will be empowered to grow their organization and careers. 

**Recording**`},{title:"All Things Open 2018",description:"Polyglot technology conference focusing on the tools, processes and people making open source possible.",date:"2018-10-30",tags:["testing"],slug:"/events/2018/allthingsopen/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_allthingsopen_ee8ec686.jpg",links:["https://dvinnik.dev/presentations/2018/uphill-battle-of-mobile-testing"],body:`**Presence**

[Uphill Battle Of Mobile Visual Regression](https://dvinnik.dev/presentations/2018/uphill-battle-of-mobile-testing)

**Location**

Raleigh, NC, USA

**Event Information**

For more than 8 years we’ve followed these beliefs and created events and platforms that have hosted tens of thousands from all over the world.  Just a few include All Things Open, the largest open-source event on the U.S. east coast, the Open Source 101 series, the Open Source Research Triangle Park (RTP) meetup, the Open Source South Carolina meetup, OpenSourceJobs.com, OpenSourceScore. com, and many more.

And throughout it all, our focus on access, diversity, and inclusion and a commitment to helping others have remained steadfast.  We strongly believe you can do business differently and still be successful, which is why we worked hard to earn a Certified B Corp certification in 2018.`},{title:"VoxxedDays Banff 2018",description:"Voxxed Days is a series of tech events organised by local community groups and supported by the Voxxed team",date:"2018-10-27",tags:["testing"],slug:"/events/2018/voxxeddays-banff/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_voxxeddays-banff_34877bc2.jpg",links:["https://dvinnik.dev/presentations/2018/domain-driven-testing","https://www.youtube.com/embed/82bVGCLZQCo"],body:`**Presence**

[Domain Driven Testing: Know What You're Doing](https://dvinnik.dev/presentations/2018/domain-driven-testing) 

**Location**

Banff, AB, Canada

**Event Information**

This year we are excited to announce a three rooms BIG return to the Palazzo dei Congressi in Lugano in hybrid version! You will have the chance to share knowledge and learn about some fascinating new ideas from some of the best local and global speakers of the development world.

**Recording**`},{title:"VoxxedDays Ticino",description:"Voxxed Days is a series of tech events organised by local community groups and supported by the Voxxed team",date:"2018-10-27",tags:["testing"],slug:"/events/2018/voxxeddays-ticino/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_voxxeddays-ticino_6341eec4.jpg",links:["https://dvinnik.dev/presentations/2018/domain-driven-testing","https://www.youtube.com/embed/82bVGCLZQCo"],body:`**Presence**

[Domain Driven Testing: Know What You're Doing](https://dvinnik.dev/presentations/2018/domain-driven-testing) 

**Location**

Lugano, Switzerland

**Event Information**

This year we are excited to announce a three rooms BIG return to the Palazzo dei Congressi in Lugano in hybrid version! You will have the chance to share knowledge and learn about some fascinating new ideas from some of the best local and global speakers of the development world.

**Recording**`},{title:"STPCon",description:"Leading event where test leadership, management, and strategy converge. The hottest topics in the industry are covered including agile testing, performance testing, and test automation.",date:"2018-10-25",tags:["testing"],slug:"/events/2018/stpcon/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_stpcon_272b0303.jpg",links:["https://dvinnik.dev/presentations/2018/dealing-with-legacy-systems"],body:`**Presence**

[Fixing Broken Windows: Dealing with Legacy Systems, Poor Quality and Gaps](https://dvinnik.dev/presentations/2018/dealing-with-legacy-systems)

**Location**

Arlignton, VA, USA

**Event Information**

The Software Test Professionals Conference is the leading event where test leadership, management, and strategy converge. The hottest topics in the industry are covered including agile testing, performance testing, test automation, AI, machine learning, mobile application testing, and test team leadership and management. Attending this conference will help you meet your professional career goals and give you the opportunity to improve your software testing techniques; find the latest tools; discover emerging trends; develop new or improve existing processes; network and gather with other high-level professionals, and gain industry insight you won’t find anywhere else.`},{title:"TestMasters Online",description:"Virtual event for testers focused on the whole team quality, leadership, test automation trends and hybrid engineering.",date:"2018-10-22",tags:["testing"],slug:"/events/2018/testmasters-online/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_testmasters-online_27ae71a6.jpg",links:["https://dvinnik.dev/conversations/2018/whole-team-quality","https://www.youtube.com/embed/GKu2WHsOarc?start=218"],body:`**Presence**

[Speaking Panel: Whole Team Quality](https://dvinnik.dev/conversations/2018/whole-team-quality)

**Location**

Virtual

**Event Information**

Online event focused on building quality standards at scale.

**Recording**`},{title:"GeeCon - Prague",description:"Largest Java Conference in Czech Republic with a focus on Java and JVM based technologies, dynamic languages, enterprise architectures, and patterns.",date:"2018-10-18",tags:["wellness"],slug:"/events/2018/geecon-prague/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_geecon-prague_0cf02077.jpg",links:["https://dvinnik.dev/presentations/2018/stress-driven-development","https://2018.geecon.cz/speakers/#bio","https://www.youtube.com/embed/nRisoHAnhnA"],body:`**Presence**

[Stress Driven Development, and How to Avoid It](https://dvinnik.dev/presentations/2018/stress-driven-development) 

**Location**

Prague, Czech Republic

**Event Information**

Java and JVM based technologies, dynamic languages, enterprise architectures, patterns, distributed computing, software craftsmanship, mobile and much more.
 
[Original Talk Link](https://2018.geecon.cz/speakers/#bio)

**Recording**`},{title:"TestCon - Vilnius",description:"Leading conference for everyone willing to learn testing trends and make their contribution to the smoother software development cycle and quality.",date:"2018-10-17",tags:["testing"],slug:"/events/2018/testcon-vilnius/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_testcon-vilnius_dddca742.jpg",links:["https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium","https://www.testcon.lt/2018/Dmitry-Vinnik/index.html","https://www.youtube.com/embed/wy4Jdb9zo-k"],body:`**Presence**

[Modern Web Testing: Going Beyond Selenium](https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium) 

**Location**

Vilnius, Lithuania

**Event Information**

TestCon Vilnius is the leading conference for everyone willing to learn testing trends, best practices and make their contribution to the smoother software development cycle and quality.

The event provides an excellent platform to keep up-to-date with the latest industry trends, exchange experiences, discuss and deliberate ideas and benefit from networking opportunities.

The event features the hottest topics in industry covering: Test Management, Testing Techniques and Methodologies, Test Automation, Performance Testing, Testing the Internet of Things (IoT), Testing Metrics, Agile Testing, Test Team Leadership and Soft Skills.

[Original Talk Link](https://www.testcon.lt/2018/Dmitry-Vinnik/index.html)

**Recording**`},{title:"MakeIT",description:"Largest Java/Oracle conference in Slovenia focused on database, java, Big Data, cloud, containers, business analytics and more.",date:"2018-10-15",tags:["java"],slug:"/events/2018/makeit/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_makeit_436f59ec.jpg",links:["https://dvinnik.dev/presentations/2018/back-to-the-completable-future"],body:`**Presence**

[Back to the CompletableFuture: Concurrency in Action](https://dvinnik.dev/presentations/2018/back-to-the-completable-future) 

**Location**

Portorož, Slovenia

**Event Information**

The conference sessions will be held in Portorož on 15th and 16th of October in four tracks. The tracks are:  
- Database
- Java
- Methodologies
- Database Development
- Big Data & AI,
- Cloud, Containers, Platform and Infrastructure
- Business Analytics`},{title:"JCon 2018",description:"In-person Java community conference in Germany organized by the Java User Group Oberpfalz in cooperation with JAVAPRO Magazine.",date:"2018-10-09",tags:["java"],slug:"/events/2018/jcon/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_jcon_b198ff92.jpg",links:["https://dvinnik.dev/presentations/2018/back-to-the-completable-future"],body:`**Presence**

[Back to the CompletableFuture: Concurrency in Action](https://dvinnik.dev/presentations/2018/back-to-the-completable-future) 

**Location**

Duesseldorf, Germany

**Event Information**

JCon is the in-person Java community conference in Germany organized by the Java User Group Oberpfalz in cooperation with JAVAPRO Magazine. Java is our profession and JCON is our passion and a lot of fun. We love to provide Java developers with a spectacular 100% live conference open to the entire Java-User-Group communities.`},{title:"Selenium Meetup - Belfast",description:"Belfast Selenium group focuses on a wide variety of testing topics ran by the Belfast Selenium group - all things testing and anything related!",date:"2018-10-08",tags:["testing"],slug:"/events/2018/selenium-meetup-belfast/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_selenium-meetup-belfast_b8b80cda.jpg",links:["https://dvinnik.dev/presentations/2018/domain-driven-testing","https://www.meetup.com/belfast-automation-software-testing/events/254846805/"],body:`**Presence**

[Domain Driven Testing: Know What You Doing](https://dvinnik.dev/presentations/2018/domain-driven-testing)

**Location**

Belfast, Northern Ireland

**Event Information**

This group has evolved from the Belfast Selenium group to better reflect the interests and wide variety of testing topics that we can cover as a meetup - all things testing and anything related!

[Original Talk Link](https://www.meetup.com/belfast-automation-software-testing/events/254846805/)`},{title:"Quest for Quality",description:"Cutting-edge software testing conference that will focus on the challenges that Quality Assurance in the IT industry faces within the digital transformation",date:"2018-10-04",tags:["testing"],slug:"/events/2018/quest-for-quality/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_quest-for-quality_cbb0ffaf.jpg",links:["https://dvinnik.dev/presentations/2018/domain-driven-testing","http://questforquality.eu/"],body:`**Presence**

[Domain Driven Testing: Know What You Are Doing](https://dvinnik.dev/presentations/2018/domain-driven-testing) 

**Location**

Dublin, Ireland

**Event Information**

This is a cutting-edge software testing conference that will focus on the challenges that Quality
Assurance in the IT industry faces within the digital transformation. The Conference will be hosted by
Comtrade Digital Services in association with our conference partner Advantage PCO. Further details
on the event are available at the following website: http://questforquality.eu/`},{title:"Target Quality 2018",description:"Software Quality conference based in Canada run by an organization dedicated to the professional development of software testing and quality assurance practices",date:"2018-09-25",tags:["testing"],slug:"/events/2018/target-quality/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_target-quality_e8aa0415.jpg",links:["https://dvinnik.dev/presentations/2018/domain-driven-testing","https://kwsqa.org/past-conferences/tq2018/schedule-tq2018/"],body:`**Presence**

[Domain Driven Testing: Know What You Are Doing](https://dvinnik.dev/presentations/2018/domain-driven-testing) 

**Location**

Cambridge, ON, Canada

**Event Information**

We are the Kitchener-Waterloo Software Quality Association. An organization dedicated to the professional development of software testing and quality assurance practices. Peer run, non-profit, we are dedicated to the community of software quality professionals in and near the Waterloo Region.

[Original Talk Link](https://kwsqa.org/past-conferences/tq2018/schedule-tq2018/)`},{title:"ConTEST NYC",description:"Conference that explores the role of software quality and testing in the context of the modern world in 3 days.",date:"2018-09-14",tags:["testing"],slug:"/events/2018/contest-nyc/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_contest-nyc_0bd8ed9e.jpg",links:["https://dvinnik.dev/presentations/2018/engineer-in-test_bridging-the-gap","https://dvinnik.dev/presentations/2018/domain-driven-testing"],body:`**Presence**

[Engineer in Test: What is Missing and How to Find It](https://dvinnik.dev/presentations/2018/engineer-in-test_bridging-the-gap)
[Domain Driven Testing: Know What You Doing](https://dvinnik.dev/presentations/2018/domain-driven-testing)

**Location**

New York, NY, USA

**Event Information**

ConTEST NYC is the conference that explores the role of software quality and testing in the context of the modern world. We invite YOU to discover emergent trends and practices in software testing and quality engineering, lay your hands and eyes on latest technologies and immerse yourself in the thought leadership of others in 3 unforgettable days at ConTEST NYC.`},{title:"JDK.io",description:"Software Development Conference in Denmark focused on All Things Groovy and Java, with DevOps, Microservices and Frontend Technologies sprinkled in.",date:"2018-08-27",tags:["java"],slug:"/events/2018/jdkio/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_jdkio_e07d88e7.jpg",links:["https://dvinnik.dev/presentations/2018/back-to-the-completable-future","https://www.youtube.com/embed/XK0QL6qSkFM"],body:`**Presence**

[Back to the CompletableFuture: Concurrency in Action](https://dvinnik.dev/presentations/2018/back-to-the-completable-future) 

**Location**

Copenhagen, Denmark

**Event Information**

In a galaxy far far away… in 2009, Søren invited Guillaume to speak about the Groovy programming language at a conference in Denmark. Discussing together, they started brainstorming about a short event to cover the various aspects of the language, the project and its ecosystem. This idea sparkle quickly overflowed into a more solid plant to create a dedicated conference fully dedicated to this ecosystem, as it was clear that there was way too much to cover than during a simple day workshop. This is how this idea of talking about “great” technologies, based off the Apache Groovy programming language turned into a full-blown conference named GR8Conf.

For the past 11 years (not taking into account two years of corona lockdown), GR8Conf has provided a high-quality conference experience for the tight-knit Apache Groovy programming language community. This year, we are joining forces with JDK.io - an annual conference run by the Danish Java user group covering technologies relevant to the entire JVM. The combined conference will be known as GR8Conf & JDK.io and will focus on All Things Groovy and Java, with DevOps, Microservices and Frontend Technologies sprinkled in.

**Recording**`},{title:"SeleniumConf India",description:"A conference that brings together Selenium developers & enthusiasts from around the world to share ideas, socialize.",date:"2018-07-25",tags:["testing"],slug:"/events/2018/seleniumconf-india/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_seleniumconf-india_896861af.jpg",links:["https://dvinnik.dev/presentations/2018/uphill-battle-of-mobile-testing","https://confengine.com/user/dmitry-vinnik","https://www.youtube.com/embed/HRkGNtt_bbM"],body:`**Presence**

[Uphill Battle Of Mobile Visual Regression](https://dvinnik.dev/presentations/2018/uphill-battle-of-mobile-testing) 

**Location**

Bangalore, India

**Event Information**

The Selenium Conference is a non-profit, volunteer-run event presented by members of the Selenium Community. The goal of the conference is to bring together Selenium developers & enthusiasts from around the world to share ideas, socialize, and work together on advancing the present and future success of the project.

This year the conference will be held in Bangalore, India beginning with all-day paid workshops on Thursday, June 28th, followed by two-days of presentations by Selenium Experts and Practitioners from around the world. The conference will include keynotes and parallel tracks on both Friday and Saturday. There will also be pair-coding sessions throughout the day, as well as opportunities to get Selenium advice and tutorials from experts.

[Original Talk Link](https://confengine.com/user/dmitry-vinnik)

**Recording**`},{title:"Devoxx Poland 2018",description:"Devoxx is the biggest Java conference in Poland and is a great way to learn about new things that are being developed in the Java world.",date:"2018-06-22",tags:["java"],slug:"/events/2018/devoxx-poland/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_devoxx-poland_6a39dabb.jpg",links:["https://dvinnik.dev/presentations/2018/back-to-the-completable-future","https://www.youtube.com/embed/tM11P8dkcHk"],body:`**Presence**

[Back to the CompletableFuture: Concurrency in Action](https://dvinnik.dev/presentations/2018/back-to-the-completable-future) 

**Location**

Kraków, Poland

**Event Information**

Devoxx is the biggest Java conference in Poland and is a great way to learn about new things that are being developed in the Java world.
 
**Recording**`},{title:"Nordic Testing Days 2018",description:"Nordic Testing Days is an annual conference primarily aimed at software testers and also welcome others ranging from programmers to UX specialists, project managers to designers.",date:"2018-06-21",tags:["testing"],slug:"/events/2018/nordic-testing-days/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_nordic-testing-days_14c2fd64.jpg",links:["https://dvinnik.dev/presentations/2018/from-robotium-to-appium","https://www.youtube.com/embed/LAsQ3Pu-UbY"],body:`**Presence**

[From Robotium to Appium: Choose Your Journey](https://dvinnik.dev/presentations/2018/from-robotium-to-appium) 

**Location**

Tallinn, Estonia

**Event Information**

Nordic Testing Days is an annual conference primarily aimed at software testers. However, during the recent years we have branched out and also welcome others ranging from programmers to UX specialists, project managers to designers etc. In other words, everyone who is interested in dipping their toes into testing and contributing to smoother software development cycle and quality. We believe this will help diversify learning across the board.

Nordic Testing Days conference is put together by volunteers, who are mostly testing professionals, committed to strengthening the community and providing software quality related education.

**Recording**`},{title:"QUEST  Software Testing Conference",description:"North America Quality Engineered Software and Testing Conferences (QUEST), a premier IT conference",date:"2018-05-23",tags:["testing"],slug:"/events/2018/quest/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_quest_3042f107.jpg",links:["https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium"],body:`**Presence**

[Modern Web Testing: Protractor and Selenium WebDriver](https://dvinnik.dev/presentations/2018/modern-web-testing_going-beyond-selenium) 

**Location**

San Antonio, TX, USA

**Event Information**

The QAI Global Institute is proud to present the North America Quality Engineered Software and Testing Conferences (QUEST), a premier IT conference, EXPO, and classroom training experience designed by software professionals seeking proven methods and new technologies for quality software.`},{title:"JavaDay Istanbul",description:"One of the most effective international community driven software conference of Turkey supported by Istanbul Java User Group.",date:"2018-05-22",tags:["java"],slug:"/events/2018/javaday-istanbul/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_javaday-istanbul_ac0fedf8.jpg",links:["https://dvinnik.dev/presentations/2018/domain-driven-testing","https://www.youtube.com/embed/UIycEOBxMpA"],body:`**Presence**

[Domain Driven Testing: Know What You’re Doing](https://dvinnik.dev/presentations/2018/domain-driven-testing) 

**Location**

Istanbul, Turkey

**Event Information**

Java Day Istanbul is one of the most effective international community driven software conference of Turkey supported by Istanbul Java User Group. The conference helps developers to learn the newest technologies about Java, Web, Mobile, Big DATA, Cloud, DevOps, Agile and Future. Java Day Istanbul also helps developers, tech companies, and startups to establish a good network among them.

**Recording**`},{title:"JavaCro",description:"Largest Java Conference in Croatia with a focus on trends and future of Java, business technologies and case studies.",date:"2018-05-09",tags:["java"],slug:"/events/2018/javacro/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_javacro_03b61dbc.jpg",links:["https://dvinnik.dev/presentations/2018/back-to-the-completable-future","https://2018.javacro.hr/Program/Back-to-the-CompletableFuture-Concurrency-in-Action"],body:`**Presence**

[Back to the CompletableFuture: Concurrency in Action](https://dvinnik.dev/presentations/2018/back-to-the-completable-future) 

**Location**

Rovinj, Croatia

**Event Information**

These were the main topic categories at JavaCro conference:

- Trends & the Future of Java
- Business Technologies & Case Studies
- Java platforms, programming Frameworks and Servers
- Methodologies and Tools
- Web & Mobile
- Java community
 
[Original Talk Link](https://2018.javacro.hr/Program/Back-to-the-CompletableFuture-Concurrency-in-Action)`},{title:"VoxxedDays Vienna",description:"Voxxed Days is a series of tech events organised by local community groups and supported by the Voxxed team",date:"2018-03-12",tags:["java"],slug:"/events/2018/voxxeddays-vienna/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_voxxeddays-vienna_35f0bc4f.jpg",links:["https://dvinnik.dev/presentations/2018/back-to-the-completable-future","https://voxxeddaysvienna2018.sched.com/","https://www.youtube.com/embed/xm_ROh6X_Cg"],body:`**Presence**

[Back to the CompletableFuture Concurrency in Action](https://dvinnik.dev/presentations/2018/back-to-the-completable-future) 

**Location**

Vienna, Austria

**Event Information**

Voxxed Days is a series of tech events organised by local community groups and supported by the Voxxed team. Sharing the Devoxx philosophy that content comes first, these events see both internationally renowned and local speakers converge at a wide range of locations around the world.

[Original Talk Link](https://voxxeddaysvienna2018.sched.com/)

**Recording**`},{title:"SauceCon",description:"One of the largest user testing conferences in USA with test and development experts representing the largest names in business, media and technology.",date:"2018-02-10",tags:["testing"],slug:"/events/2018/saucecon/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_saucecon_34675c11.jpg",links:["https://dvinnik.dev/presentations/2018/uphill-battle-of-mobile-testing","https://www.youtube.com/embed/m-ahvlutEVk"],body:`**Presence**

[Uphill Battle Of Mobile Visual Regression](https://dvinnik.dev/presentations/2018/uphill-battle-of-mobile-testing) 

**Location**

San Francisco, CA, USA

**Event Information**

SauceCon will hear from test and development experts representing the largest names in business, media and technology.

**Recording**`},{title:"JVMCon",description:"The JVM (Java, Scala and all other JVM languages) conference where you create the program with a wide range of subjects, from language features to flying drones, project reports or anything else that involves a JVM.",date:"2018-01-30",tags:["java"],slug:"/events/2018/jvmcon/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2018_jvmcon_82e1261f.jpg",links:["https://dvinnik.dev/presentations/2018/back-to-the-completable-future"],body:`**Presence**

[Back to the CompletableFuture: Concurrency in Action](https://dvinnik.dev/presentations/2018/back-to-the-completable-future) 

**Location**

Ede, Netherlands

**Event Information**

*The JVM (Java, Scala and all other JVM languages) conference where you create the program!*

JVMCON will take place January 30th 2018 in Cinemec, Ede, The Netherlands. We hope to see a wide range of subjects, from language features to flying drones, project reports or anything else that involves a JVM.`},{title:"ConFoo",description:"Multi-technology conference for web developers based in Canada with locations in Vancouver and Montreal.",date:"2017-12-04",tags:["java"],slug:"/events/2017/confoo/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2017_confoo_d5457956.jpg",links:["https://dvinnik.dev/presentations/2017/guiding-through-functional-interfaces","https://confoo.ca/en/yvr2017/session/do-you-even-function-guiding-through-functional-interfaces"],body:`**Presence**

[Do you even Function? Guiding Through Functional Interfaces](https://dvinnik.dev/presentations/2017/guiding-through-functional-interfaces)

**Location**

Vancouver, BC, Canada

**Event Information**

*Multi-technology conference for web developers.*

[Original Talk Link](https://confoo.ca/en/yvr2017/session/do-you-even-function-guiding-through-functional-interfaces)`},{title:"Dreamforce 2017",description:"Dreamforce is an annual event that brings together the global Salesforce community for learning, fun, community building, and philanthropy.",date:"2017-11-09",tags:["business"],slug:"/events/2017/dreamforce/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2017_dreamforce_3557107f.jpg",links:["https://dvinnik.dev/presentations/2017/tips-for-salesforce-communities","https://www.youtube.com/embed/rjz-vKGb7DA"],body:`**Presence**

[Tips and Tricks for Developing Components for Communities](https://dvinnik.dev/presentations/2017/tips-for-salesforce-communities)

**Location**

San Francisco, CA, USA

**Event Information**

Dreamforce is an annual event that brings together the global Salesforce community for learning, fun, community building, and philanthropy. Trailblazers from all over the world gather to share their insights, successes, and learn the latest in industry innovations. 

Started in 2003, Dreamforce has grown into far more than just a conference — it’s a can’t-miss, immersive experience. From inspiring keynotes and sessions, to visionary thinking and the future of technology, to learning how business can be the greatest platform for change, attendees will be empowered to grow their organization and careers. 

**Recording**`},{title:"CAST: What the Heck Do Testers Really Do?",description:"CAST 2017 will focus on the tactical work testers do in a variety of contexts with different tools and techniques",date:"2017-08-16",tags:["testing"],slug:"/events/2017/cast/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2017_cast_28c6f42b.jpg",links:["https://dvinnik.dev/presentations/2017/building-tests-to-build-websites/","https://associationforsoftwaretesting.org/conference/cast-2017/"],body:`**Presence**

[Building Tests to Build Websites](https://dvinnik.dev/presentations/2017/building-tests-to-build-websites/)

**Location**

Nashville, TN, USA

**Event Information**

AST 2017 is taking a deep look at the practice of software testing. We want to help testers become so good they cannot be ignored. CAST 2017 focuses on the actual tactical work required to perform excellent, effective and influential testing.

Today, testers are challenged to identify important product risks in turbulent contexts. Business focus follows a fickle consumer market, harshly driven by demanding investors. Organizational frameworks are evolving and changing, often within a product’s lifetime. Solution technology frantically advances moving from tiered architectures to micro services among a hyper distributed internet of things.

Emerging practices sometimes shuffle testing activities earlier, or later in the life cycle. Some development approaches may even obscure testing. CAST 2017 will focus on the tactical work testers do in a variety of contexts with different tools and techniques.

[Original Talk Link](https://associationforsoftwaretesting.org/conference/cast-2017/)`},{title:"JEEConf",description:"Java Eastern Europe Conference in the heart of Ukraine that emphasis  practical experience and development of real projects.",date:"2017-05-26",tags:["java"],slug:"/events/2017/jeeconf/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2017_jeeconf_4459dc5e.jpg",links:["https://dvinnik.dev/presentations/2017/aspect-oriented-programming","https://jeeconf.com/program/aspect-oriented-programming-hidden-toolkit-that-you-already-have/","https://www.youtube.com/embed/XmuwLYdYDAk"],body:`**Presence**

[Aspect Oriented Programming: Hidden Toolkit That You Already Have](https://dvinnik.dev/presentations/2017/aspect-oriented-programming)

**Location**

Kyiv, Ukraine

**Event Information**

*Java — one language, endless possibilities*

We minimize the number of “dry” theoretical talks, and emphasis will be placed on practical experience and development of real projects. We plan to gather different speakers from different countries at the conference. We invite developers, architects, testers, managers and team leaders to participate in the conference. If your work is related to Java, you should join JEEConf!

[Original Talk Link](https://jeeconf.com/program/aspect-oriented-programming-hidden-toolkit-that-you-already-have/)

**Recording**`},{title:"DevOpsDays - Vancouver",description:"DevOpsDays is a worldwide series of technical conferences covering topics of software development.",date:"2017-03-31",tags:["devops","leadership"],slug:"/events/2017/devopsdays-vancouver/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2017_devopsdays-vancouver_2ce6cb18.jpg",links:["https://dvinnik.dev/presentations/2017/companies-need-devops","https://devopsdays.org/events/2017-vancouver/program","https://www.youtube.com/embed/0rqwn4oXRMw"],body:`**Presence**

[Companies Which Need DevOps But Don’t Know About It](https://dvinnik.dev/presentations/2017/companies-need-devops)

**Location**

Vancouver, BC, Canada

**Event Information**

DevOpsDays is a worldwide series of technical conferences covering topics of software development, IT infrastructure operations, and the intersection between them. Each event is run by volunteers from the local area.

[Original Talk Link](https://devopsdays.org/events/2017-vancouver/program)

**Recording**`},{title:"Selenium Camp",description:"Leading test automation conference in Eastern Europe with 2 days full of conference talks focused on Selenium/WebDriver.",date:"2017-02-10",tags:["testing"],slug:"/events/2017/selenium-camp/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/events_2017_selenium-camp_2b78127a.jpg",links:["https://dvinnik.dev/presentations/2017/building-tests-to-build-websites/","https://dvinnik.dev/conversations/2017/selenium-qa-panel","https://seleniumcamp.com/talk/building-tests-to-build-websites/","https://www.youtube.com/embed/6opoooLdonI"],body:`**Presence**

[Building tests to build websites](https://dvinnik.dev/presentations/2017/building-tests-to-build-websites/) 
[Selenium/WebDriver Q&A panel](https://dvinnik.dev/conversations/2017/selenium-qa-panel)

**Location**

Kyiv, Ukraine

**Event Information**

Selenium Camp has been founded in 2011 as the first international conference completely devoted to Selenium/WebDriver. Now it is leading test automation conference in Eastern Europe with 2 days full of conference talks and master-classes running in 3+ parallel tracks. In addition to web testing with Selenium/WebDriver wide spectrum of additional topics is covered every year: visual testing, test automation metrics and dashboards, reliable test infrastructure, scaling solutions and practices, testing of legacy systems, desktop and mobile applications, microservices, design patterns and best practices... Selenium Camp is equally interesting for beginners and professionals, because it is 2 days of pure knowledge, sharing experience and fun. Join us to move forward in your career!

[Original Talk Link](https://seleniumcamp.com/talk/building-tests-to-build-websites/)

**Recording**`}],d=[{title:"WhatsApp Business Platform for Developers",description:"This course will teach you to set up and configure the WhatsApp Business Platform and the WhatsApp Business Management API.",date:"2023-02-01",tags:["business-messaging"],slug:"/courses/2023/whatsapp-business-platform-for-developers/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/courses_2023_whatsapp-business-platform-for-developers_13c663b4.jpg",links:["https://www.coursera.org/learn/whatsapp-business-platform-for-developers"],body:`**Platform**

[Coursera](https://www.coursera.org/learn/whatsapp-business-platform-for-developers)

**Course Description**

Are you interested in learning how the WhatsApp Business Platform can help businesses achieve better audience engagement and customer support? Designed for developers and engineers responsible for the implementation of APIs, this course will teach you to set up and configure the WhatsApp Business Platform and the WhatsApp Business Management API.`},{title:"Implement the WhatsApp Business Management API",description:"Steps to implement the WhatsApp Business Management API, including proper setup, management, migration and more.",date:"2022-10-18",tags:["business-messaging"],slug:"/courses/2022/implement-whatsapp-management-api/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/courses_2022_implement-whatsapp-management-api_ac3fe009.jpg",links:["https://www.facebookblueprint.com/student/collection/409587/path/410259"],body:`**Platform**

[Meta Blueprint](https://www.facebookblueprint.com/student/collection/409587/path/410259)

**Course Description**

Learn how to implement the WhatsApp Business Management API, including proper setup, management, migration, and monitoring of key elements.`},{title:"Implement the WhatsApp Business Platform",description:"Steps to implement the WhatsApp Business Platform, including message templates, Cloud API and more.",date:"2022-07-14",tags:["business-messaging"],slug:"/courses/2022/implement-whatsapp-business-platform/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/courses_2022_implement-whatsapp-business-platform_1810cdf2.jpg",links:["https://www.facebookblueprint.com/student/collection/409587/path/360219"],body:`**Platform**

[Meta Blueprint](https://www.facebookblueprint.com/student/collection/409587/path/360219)

**Course Description**

Learn how to recognize different types of messages, create templates and use the Cloud API to send messages through WhatsApp.`},{title:"Set up the WhatsApp Business Platform",description:"Steps to set up the WhatsApp Business Platform including creation of an app on Meta for Developers, enabling the Cloud API and more.",date:"2022-07-14",tags:["business-messaging"],slug:"/courses/2022/setup-whatsapp-business-platform/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/courses_2022_setup-whatsapp-business-platform_5ec2a195.jpg",links:["https://www.facebookblueprint.com/student/collection/409587/path/360218"],body:`**Platform**

[Meta Blueprint](https://www.facebookblueprint.com/student/collection/409587/path/360218)

**Course Description**

Learn how to create an app on Meta for Developers, set up API access, send a test message, configure webhooks and set up a phone number.`},{title:"Troubleshoot the WhatsApp Business Platform",description:"Ways to troubleshoot and resolve issues that may arise during the setup process for the WhatsApp Business Platform and after its implementation.",date:"2022-07-14",tags:["business-messaging"],slug:"/courses/2022/troubleshoot-whatsapp-business-platform/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/courses_2022_troubleshoot-whatsapp-business-platform_97a205c6.jpg",links:["https://www.facebookblueprint.com/student/collection/409587/path/360217"],body:`**Platform**

[Meta Blueprint](https://www.facebookblueprint.com/student/collection/409587/path/360217)

**Course Description**

Learn how to troubleshoot and resolve issues that may arise during the setup process for the WhatsApp Business Platform and after its implementation.`},{title:"WhatsApp Business Platform Overview",description:"Overview of the benefits, purpose and use case of the WhatsApp Business Platform, as well as Cloud API hosted by Meta.",date:"2022-07-14",tags:["business-messaging"],slug:"/courses/2022/whatsapp-business-platform-overview/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/courses_2022_whatsapp-business-platform-overview_1603eb8a.jpg",links:["https://www.facebookblueprint.com/student/collection/409587/path/360217"],body:`**Platform**

[Meta Blueprint](https://www.facebookblueprint.com/student/collection/409587/path/360217)

**Course Description**

Learn about the purpose and use cases of the WhatsApp Business Platform, and the benefits of using the cloud-hosted version of the API.`}],u=[{title:"Introducing WhatsUp with WhatsApp, our new developer show!",description:"The first episode of WhatsUp with WhatsApp lays out all the tools you need to get started with the WhatsApp Business Platform, including developer resources and product news.",date:"2023-01-31",tags:["business messaging"],slug:"/conversations/2023/whatsup-with-whatsapp/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/conversations_2023_whatsup-with-whatsapp_7b21d01e.jpg",youtubeUrl:"https://www.youtube.com/watch?v=iwSRDKi3nQQ",links:["https://www.youtube.com/embed/iwSRDKi3nQQ"],body:`**Title**

Introducing WhatsUp with WhatsApp, our new developer show!

**Recording**

**Overview**

WhatsUp with WhatsApp: Episode 001

The first episode of WhatsUp with WhatsApp lays out all the tools you need to get started with the WhatsApp Business Platform. Here’s what you can expect:

- Learn where to find the latest developer resources.
- See details on our new course launch.
- Ask about the latest product news and roadmaps.

**Location**

Virtual`},{title:"Fireside Chat: Open Source at Meta",description:"In a conversation with GitHub, Meta’s Lead Developer Advocate, Dmitry, will share their learnings on open source at Meta.",date:"2022-11-10",tags:["leadership","oss"],slug:"/conversations/2022/open-source-at-meta/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/conversations_2022_open-source-at-meta_5f818bf4.jpg",youtubeUrl:"https://www.youtube.com/watch?v=pqj-0FvapKE",links:["https://www.youtube.com/embed/pqj-0FvapKE","https://githubuniverse.com/events/detail/virtual-schedule/956326c3-2f7b-44b7-a","https://dvinnik.dev/events/2022/github-universe"],body:`**Title**

Fireside Chat: Open Source at Meta

**Recording**

**Overview**

Meta is built on open source technology, and strives to empower communities through open source. In a conversation with GitHub, Meta’s Lead Developer Advocate, Dmitry, will share their learnings on open source at Meta.

[Link to the post](https://githubuniverse.com/events/detail/virtual-schedule/956326c3-2f7b-44b7-a).

**Location**

San Francisco, CA, USA

**About the Engagement**

Fifteen years ago, the first line of code was committed to build GitHub. Since then, our purpose has been to equip developers with everything they need to be their best. This mission has remained the same through every iteration of the GitHub platform. But as software continues to advance in all aspects of our work and life, running, maintaining, and building software for a global population creates immense complexity for developers.

Read more [here](https://dvinnik.dev/events/2022/github-universe).`},{title:"The Diff: From Linux to React Native with Nicola Corti",description:"Dmitry Vinnik, a Developer Advocate at Meta Open Source, chats Meta Software Developer Nicola Corti about his journey to mobile development.",date:"2022-06-20",tags:["oss"],slug:"/conversations/2022/the-diff-episode-13/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/conversations_2022_the-diff-episode-13_762b41b1.jpg",youtubeUrl:"https://www.youtube.com/watch?v=EG_FTirrK-c",links:["https://anchor.fm/thediff/embed/episodes/Episode-13-From-Linux-to-React-Native-with-Nicola-Corti-e1k4ng7/a-a84nbva","https://www.youtube.com/embed/EG_FTirrK-c","https://www.youtube.com/embed/zSSSsPsDzOY","https://www.youtube.com/embed/yZs88wRo9T0","https://www.youtube.com/embed/nVIHFbsDblw"],body:`**Title**

The Diff: From Linux to React Native with Nicola Corti

**Recording**

*Full Audio Version*

*10-mins Cut*

*Clip - The Diff: Valuing Community Work within Open Source*

*Clip - The Diff: Why React Native Is Important for Mobile Applications*

*Clip - The Diff: Nicola’s Journey in Mobile Development*

**Overview**

Dmitry Vinnik, a Developer Advocate at Meta Open Source, chats Meta Software Developer Nicola Corti about his journey to mobile development, his work with React Native and how podcasting helped Nicola stay connected with the community.

[Link to the podcast](https://thediffpodcast.com/docs/episode-13/).

**Location**

Virtual

**About the Engagement**

The Diff is a podcast from Meta Open Source where Dmitry Vinnik appears as a host and as a guest.`},{title:"Innovating Through Automation, Innersource and Cultural Shifts",description:"Speaking Panel at GitHub:InFocus where we discuss how to leverage innersource to encourage strong collaboration and deliver high-quality code.",date:"2022-04-29",tags:["leadership","oss"],slug:"/conversations/2022/innovating-through-innersource/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/conversations_2022_innovating-through-innersource_f1a1157c.jpg",youtubeUrl:"https://www.youtube.com/watch?v=Y8c7U4quV8g",links:["https://www.youtube.com/embed/Y8c7U4quV8g","https://infocus.github.com/sessions/innovating-through-automation-innersource-and-cultural-shifts-with-meta-dxc-technology-and-3m/","https://dvinnik.dev/events/2022/in-focus-github"],body:`**Title**

Innovating Through Automation, Innersource and Cultural Shifts

**Recording**

**Overview**

Improving organizational efficiency is not an easy feat. While automation and innersource are important, it also requires strong collaboration, goals, and clarity—in essence, a cultural shift.

Join Virginia Bryant, Director of Customer Marketing at GitHub, as she hears from Meta’s Developer Advocate, Dmitry Vinnik, DXC Technology’s Distinguished Engineer, DevOps Enablement, Tom Halpin, and 3M’s Operations and Quality Manager, Tina Beamer. We’re excited to discuss how they’re leveraging innersource to encourage strong collaboration and deliver high-quality code.

[Link to the post](https://infocus.github.com/sessions/innovating-through-automation-innersource-and-cultural-shifts-with-meta-dxc-technology-and-3m/).

**Location**

Virtual

**About the Engagement**

*Build fast, build effectively, build securely*

Grow your business alongside industry experts during GitHub InFocus. Enjoy curated sessions on the most top-of-mind business questions for enterprises, along with a special broadcast featuring GitHub CEO, Thomas Dohmke. Join us as we focus on accelerating, securing, and operationally improving the way your software development teams work—for good.

Read more [here](https://dvinnik.dev/events/2022/in-focus-github)`},{title:"The Diff: Talking about All Things React with Rachel Nabors",description:"Dmitry Vinnik, a Developer Advocate at Meta Open Source, chats with Meta Documentation Engineer Rachel Nabors about their journey to front-end development.",date:"2022-04-14",tags:["oss"],slug:"/conversations/2022/the-diff-episode-12/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/conversations_2022_the-diff-episode-12_f93abfc5.jpg",youtubeUrl:"https://www.youtube.com/watch?v=0eC1zfxELOQ",links:["https://anchor.fm/thediff/embed/episodes/Episode-12-Talking-about-All-Things-React-with-Rachel-Nabors-e1h5dq1/a-a7oi6ug","https://www.youtube.com/embed/0eC1zfxELOQ","https://www.youtube.com/embed/uxdbcWJYIFw","https://www.youtube.com/embed/gKbiddWhgsU","https://www.youtube.com/embed/0bM-BVi-gIg"],body:`**Title**

The Diff: Talking about All Things React with Rachel Nabors

**Recording**

*Full Audio Version*

*10-mins Cut*

*Clip - The Diff: How Impactful the Open Source Community Is*

*Clip - The Diff: Finding Your Passion + Getting Real about Open Source*

*Clip - The Diff: The Power of the Open Source Community*

**Overview**

Dmitry Vinnik, a Developer Advocate at Meta Open Source, chats with Meta Documentation Engineer Rachel Nabors about their journey to front-end development, their work on React and React Native documentation and how virtual conferences have opened the door for the open source community.

[Link to the podcast](https://thediffpodcast.com/docs/episode-12/).

**Location**

Virtual

**About the Engagement**

The Diff is a podcast from Meta Open Source where Dmitry Vinnik appears as a host and as a guest.`},{title:"The Diff: Talking Mobile Open Source with Pascal Hartig",description:"Dmitry Vinnik, a Developer Advocate at Meta Open Source, chats with Meta Software Engineer Pascal Hartig, about mobile open source projects like Litho and Flipper.",date:"2022-02-15",tags:["oss"],slug:"/conversations/2022/the-diff-episode-11/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/conversations_2022_the-diff-episode-11_66139658.jpg",youtubeUrl:"https://www.youtube.com/watch?v=S5ajSULISrA",links:["https://anchor.fm/thediff/embed/episodes/Episode-11-Talking-Mobile-Open-Source-with-Pascal-Hartig-e1ed34j/a-a7de9jt","https://www.youtube.com/embed/S5ajSULISrA","https://www.youtube.com/embed/TJo3I8SpTAk","https://www.youtube.com/embed/-Frt2s3qH9k","https://thediffpodcast.com/docs/episode-11/"],body:`**Title**

The Diff: Talking Mobile Open Source with Pascal Hartig

**Recording**

*Full Audio Version*

*10-mins Cut*

*Clip - The Diff: Litho and the Power of Open Source*

*Clip - The Diff: Navigating a Work-Life Balance*

**Overview**

Dmitry Vinnik, a Developer Advocate at Meta Open Source, chats with Meta Software Engineer Pascal Hartig, about mobile open source projects like Litho and Flipper, and the importance of building an open source community.

[Link to the podcast](https://thediffpodcast.com/docs/episode-11/).

**Location**

Virtual

**About the Engagement**

The Diff is a podcast from Meta Open Source where Dmitry Vinnik appears as a host and as a guest.`},{title:"How To Build A Thriving Developer Community",description:"Discussion between DevRel and OSS experts, answering Wwat makes a strong developer community? How can we create authentic experiences?",date:"2021-06-17",tags:["devrel","oss"],slug:"/conversations/2021/building-thriving-developer-community/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/conversations_2021_building-thriving-developer-community_67219cbe.jpg",links:["https://player.vimeo.com/video/564373209?h=d114aa26a7","https://vimeo.com/564373209","https://vimeo.com/bevyhq","https://vimeo.com","https://events.bevy.com/events/details/bevy-events-devrel-open-source-presents-how-to-build-a-thriving-developer-community/"],body:`**Title**

How To Build A Thriving Developer Community

**Recording**

<p><a href="https://vimeo.com/564373209">How To Build A Thriving Developer Community - Vol I</a> from <a href="https://vimeo.com/bevyhq">Bevy</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

**Overview**

What makes a strong developer community? How can we create authentic experiences? How can we unlock the insights of the developer community? How are leading DevRel professionals measuring the success of their programs? As the world shifts into hybrid and in-person experiences, what does the future of developer community events look like? Join us for an expert panel where we'll discuss these topics and share wins and challenges. Following the panel discussion, we'll jump into breakout rooms to connect with other DevRel leaders across the world.

[Link to the webinar](https://events.bevy.com/events/details/bevy-events-devrel-open-source-presents-how-to-build-a-thriving-developer-community/).

**Location**

Virtual

**About the Engagement**

Developer Relations professionals act as a liaison between their company and technical communities. They communicate feedback, advocate for the community’s needs, and make their experience with their product as smooth as possible.

As people seek new opportunities to meet and collaborate with like-minded developers locally and globally, community-led developer events are becoming more important than ever. The impact of today’s leading DevRel programs are driven by the grassroots, passionate community organizers.

What makes a strong developer community? How can we create authentic experiences? How can we unlock the insights of the developer community? How are leading DevRel professionals measuring the success of their programs? As the world shifts into hybrid and in-person experiences, what does the future of developer community events look like?

Watch this expert panel where we discussed these topics and more!

Featuring:

Jennifer Sable Lopez: Senior Director, Community & Advocacy at OutSystems

Tessa Mero: Senior Developer Advocate/MDE Program Lead at Cloudinary

Dmitry Vinnik: Developer Advocate at Facebook, Open Source Developer, ex-Tech Lead at Salesforce`},{title:"Open Source Developer Advocacy at Facebook with Dmitry Vinnik",description:"Dmitry Vinnik, an Open Source Developer Advocate at Facebook, talks about how he helps to enable developers around the world make use of the social media company`s hundreds of open source projects",date:"2021-05-12",tags:["leadership","oss"],slug:"/conversations/2021/open-source-developer-advocacy-at-facebook/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/conversations_2021_open-source-developer-advocacy-at-facebook_fa65e7df.jpg",links:["https://open.spotify.com/embed/episode/6CkzG0tDo8uJ0L7LGSHLTW?utm_source=generator&theme=0","https://www.talkabouttechpodcast.com/1712587/8506173"],body:`**Title**

Open Source Developer Advocacy at Facebook with Dmitry Vinnik

**Recording**

**Overview**

*Open source developer advocacy at Facebook: Dmitry Vinnik on supporting and growing Facebook's 700 open source projects*

Rich Gall (@richggall) and Jennifer Riggins (@jkriggins) talk to Dmitry Vinnik, an Open Source Developer Advocate at Facebook, about how he helps to enable developers around the world make use of the social media company's hundreds of open source projects. 

In the episode Dmitry discusses how Covid has impacted his work as a developer advocate, including what he misses about in-person events and what he prefers about remote conferences, and explains how he puts together content that's relevant to the needs of different audiences. He touches on his brilliant 'Explain Like I'm 5' series, in which members of the open source developer advocate team explain complex technologies in a simple and accessible way.

He also talks about how the team manages to provide support across hundreds of open source projects, and discusses the importance of building narratives to enable clarity and set priorities. 

Dmitry also explains why developer advocates need to be platform agnostic and meet communities where they exist (rather than forcing them into new platforms and tools), and tells us about the role that open source plays more generally in Facebook's work.

[Link to the podcast](https://www.talkabouttechpodcast.com/1712587/8506173).

**Location**

Virtual

**About the Engagement**

What We Talk About When We Talk About Tech is a podcast about tech storytelling. Jennifer Riggins and Rich Gall explore the way words and narratives shape the technology landscape with the people who define, explain, and sell it.`},{title:"Open source at Facebook with Dmitry Vinnik",description:"Listen to this episode of PodRocket to hear Dmitry Vinnick, a Developer Advocate at Facebook Open Source, talk about what it means to be open source at Facebook.",date:"2021-05-11",tags:["leadership","oss"],slug:"/conversations/2021/open-source-at-facebook/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/conversations_2021_open-source-at-facebook_558ac977.jpg",links:["https://player.fireside.fm/v2/XHXVzqW5+ItXfveto?theme=dark","https://podrocket.logrocket.com/facebook"],body:`**Title**

Open Source Developer Advocacy at Facebook with Dmitry Vinnik

**Recording**

**Overview**

Facebook Open Source now has over 600 publicly available projects in its portfolio including some well-known projects like React, React Native, PyTorch, Docusaurus, GraphQL, Jest, and more.

Listen to this episode of PodRocket to hear Dmitry Vinnick, a Developer Advocate at Facebook Open Source, talk about what it means to be open source at Facebook, how to manage such a large portfolio, and what it has been like to engage with a community remotely.

[Link to the podcast](https://podrocket.logrocket.com/facebook).

**Location**

Virtual

**About the Engagement**

Are you a frontend developer? We made a podcast for you. Every week, PodRocket gets you up to speed on everything happening in frontend web development through in-depth interviews with experienced engineers. We discuss the best, worst, and newest aspects of all your favorite libraries and frameworks. We also give you a fresh look at the most pressing tech industry issues through the eyes of your peers.`},{title:"Career Path and Development in Testing",description:"In this speaking panel, we discuss future of testing, shifting left approach and how to grow as a testing professional in tech.",date:"2021-04-07",tags:["testing"],slug:"/conversations/2019/career-path-and-dev-in-testing/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/conversations_2019_career-path-and-dev-in-testing_fd4fba0a.jpg",youtubeUrl:"https://www.youtube.com/watch?v=ySRc-juTbrc",links:["https://www.youtube.com/embed/ySRc-juTbrc?start=23955","https://dvinnik.dev/events/2021/qa-global-summit"],body:`**Title**

Career Path and Development in Testing

**Recording**

**Overview**

In this speaking panel, we discuss future of testing, shifting left approach and how to grow as a testing professional in tech.

**Location**

Virtual

**About the Engagement**

Geekle has the unique experience to gather huge tech summits with 5'000+ attendees in different tech domains. Now we hope to make something the world has never seen before for the QA Community.

Read more [here](https://dvinnik.dev/events/2021/qa-global-summit).`},{title:"Overcoming the Challenges Facing Remote Employees",description:"In this interview, Dmitry Vinnik, lead software engineer at Salesforce, discusses the value of attending conferences in person as opposed to just taking advantage of the online presentations.",date:"2019-04-28",tags:["leadership","remote"],slug:"/conversations/2019/overcoming-challenges-of-remote-work/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/conversations_2019_overcoming-challenges-of-remote-work_be8db18c.jpg",youtubeUrl:"https://www.youtube.com/watch?v=o_ZSiD5ZteI",links:["https://www.youtube.com/embed/o_ZSiD5ZteI","https://www.stickyminds.com/interview/overcoming-challenges-facing-remote-employees-interview-dmitry-vinnik","https://dvinnik.dev/events/2019/stareast/","https://www.youtube.com/embed/o_ZSiD5ZteI"],body:`**Title**

Overcoming the Challenges Facing Remote Employees

**Recording**

**Overview**

In this interview, Dmitry Vinnik, lead software engineer at Salesforce, discusses the value of attending conferences in person as opposed to just taking advantage of the online presentations. He also addresses the challenges of being a remote employee and methods of overcoming those challenges.

[Link to the post](https://www.stickyminds.com/interview/overcoming-challenges-facing-remote-employees-interview-dmitry-vinnik).

**Location**

Orlando, FL, USA

**About the Engagement**

TechWell Corporation is the leader in software conferences, training, and certification covering Agile, DevOps, Test/QA, Requirements, and more.

Read more [here](https://dvinnik.dev/events/2019/stareast/).

**Recording**`},{title:"TestMasters Online",description:"Speaking about leadership in quality assurance, most recent trends in test automation and how hybrid engineering has been adopted by Big Tech.",date:"2018-09-20",tags:["testing"],slug:"/conversations/2018/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/conversations_2018_c83598bb.jpg",youtubeUrl:"https://www.youtube.com/watch?v=GKu2WHsOarc",links:["https://www.youtube.com/embed/GKu2WHsOarc?start=218","https://dvinnik.dev/events/2018/testmasters-online"],body:`**Title**

Speaking Panel: Whole Team Quality

**Recording**

**Overview**

Speaking about leadership in quality assurance, most recent trends in test automation and how hybrid engineering has been adopted by Big Tech.

**Location**

Virtual

**About the Engagement**

Online event focused on building quality standards at scale.

Read more [here](https://dvinnik.dev/events/2018/testmasters-online).`},{title:"Selenium WebDriver Q&A panel",description:"In this speaking panel, we discuss Selenium WebDriver, its current state, and nearest future. We also discussed relevant tools, frameworks and more.",date:"2017-02-10",tags:["testing"],slug:"/conversations/2017/selenium-qa-panel/",coverImage:"https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/conversations_2017_selenium-qa-panel_24fb69d1.jpg",youtubeUrl:"https://www.youtube.com/watch?v=ReoGaTjE70c",links:["https://www.youtube.com/embed/ReoGaTjE70c","https://seleniumcamp.com/talk/seleniumwebdriver-qa-panel/","https://dvinnik.dev/events/2017/selenium-camp"],body:`**Title**

Selenium WebDriver Q&A panel

**Recording**

**Overview**

We invited experienced speakers to share their vision on WebDriver/Selenium and ecosystem around it. In addition following topics will be discusssed:

– WebDriver current state and nearest future;
– tools and frameworks built on top of WebDriver;
– approaches and techniques in test automation using WebDriver.

If you have questions to discuss with experienced professionals it is right place and time to do it.

[Original link](https://seleniumcamp.com/talk/seleniumwebdriver-qa-panel/)

**Location**

Kyiv, Ukraine

**About the Engagement**

Selenium Camp has been founded in 2011 as the first international conference completely devoted to Selenium/WebDriver. Now it is leading test automation conference in Eastern Europe with 2 days full of conference talks and master-classes running in 3+ parallel tracks. In addition to web testing with Selenium/WebDriver wide spectrum of additional topics is covered every year: visual testing, test automation metrics and dashboards, reliable test infrastructure, scaling solutions and practices, testing of legacy systems, desktop and mobile applications, microservices, design patterns and best practices... Selenium Camp is equally interesting for beginners and professionals, because it is 2 days of pure knowledge, sharing experience and fun. Join us to move forward in your career!

Read more [here](https://dvinnik.dev/events/2017/selenium-camp).`}],b={articles:37,videos:37,presentations:32,events:89,courses:6,conversations:13};function v(t,o){return{articles:l,videos:c,presentations:p,events:h,courses:d,conversations:u}[t]?.find(e=>e.slug===o)}function y(){const t={articles:l,videos:c,presentations:p,events:h,courses:d,conversations:u},o=new Set;for(const n of Object.values(t))for(const e of n)for(const a of e.tags)o.add(a);return Array.from(o).sort()}function k(t){const o={articles:l,videos:c,presentations:p,events:h,courses:d,conversations:u},n=[];for(const[e,a]of Object.entries(o))for(const s of a)s.tags.includes(t)&&n.push({item:s,category:e});return n.sort((e,a)=>a.item.date.localeCompare(e.item.date)),n}function F(t,o,n=4){const e={articles:l,videos:c,presentations:p,events:h,courses:d,conversations:u},a=new Set(t.tags),s=[];for(const[i,r]of Object.entries(e))for(const m of r){if(m.slug===t.slug)continue;const g=m.tags.filter(w=>a.has(w)).length;if(g===0)continue;const f=i===o?2:0;s.push({item:m,category:i,score:g+f})}return s.sort((i,r)=>r.score!==i.score?r.score-i.score:r.item.date.localeCompare(i.item.date)),s.slice(0,n)}export{l as articles,u as conversations,d as courses,h as events,v as findBySlug,y as getAllTags,k as getContentByTag,F as getRelatedContent,p as presentations,b as stats,c as videos};
