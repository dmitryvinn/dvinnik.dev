---
category: 'article'
cover: './cover.jpg'
title: 'Visual Regression Testing: A Critical Part of a Mobile Testing Strategy'
description: 'Despite our best efforts to replicate customers' behavior in our test automation suites, teams often forget about nonfunctional requirements. Visual regression testing can fill a significant gap in user experience expectations.'
date: '2019-04-15'
tags: ['ui','testing']
published: true
canonicalUrl: 'https://www.techwell.com/techwell-insights/2019/04/visual-regression-testing-critical-part-mobile-testing-strategy'
---

![cover](./cover.jpg)

*By Dmitry Vinnik*

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

*Dmitry Vinnik is presenting the session [Visual Regression Testing: A Critical Part of a Mobile Testing Strategy](https://stareast.techwell.com/program/concurrent-sessions/visual-regression-testing-critical-part-mobile-testing-strategy-stareast-2019) at the [STAREAST](https://stareast.techwell.com/) 2019 conference, April 28--May 3 in Orlando, Florida.*