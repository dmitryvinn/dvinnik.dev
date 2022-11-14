---
category: 'article'
cover: './cover.jpg'
title: 'Meet the Developers: Mobile Edition (Aleksandr Sergeev)'
description: 'For today`s interview, we have Aleksandr Sergeev, a software engineer on the Facebook iOS Reliability Team'
date: '2022-04-21'
tags: ['open source', 'meet-the-developers']
published: true
canonicalUrl: 'https://developers.facebook.com/blog/post/2022/04/21/meet-the-developers-aleksandr-sergeev/'
---

![cover](./cover.jpg)

*By Dmitry Vinnik, Aleksandr Sergeev and Jesslyn Tannady*

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

Yes, I do from time to time. For example, I found a bug in the Clang compiler in 2020. I discovered this bug when I saw an obscure log message that read something close to "`__weak variable at 0x7ffeefbff410 holds 0x7ffeefbff430 instead of 0x1006b2750. This is probably an incorrect use of objc_storeWeak() and objc_loadWeak(). Break on objc_weak_error to debug.`"

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

To learn more about Meta Open Source, visit our [open source site](https://opensource.facebook.com/), subscribe to our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT0ZjB9kZb30OovTqChtmJhgBQXvri_f9mj6jhTkunHSthbaC4ZTW7os91FHL5sLr3uc4h6DiY7X70YivwSi0GNhmYn6xqQ1bD7wChm9k0clpN_pq8pbHeJ8S5tajP1jHBqh4jwKne9fyQiNWEhYbsVVAft121ISv_EwRMJqmvE), or follow us on [Twitter](https://l.facebook.com/l.php?u=https%3A%2F%2Ftwitter.com%2FMetaOpenSource&h=AT3EMF-URwemgJt3XFLdL9Nq0hOYneLRcuofIyGc8k3JGTlKylAYMQGiY7eSYiwAh4mY4c7yd97VuHj2Rb9UcMdNlaHzP4FrwH00j9JJTxiwxraovSA8EgNJFHIh9MIHdWjvRnPoa5WVA_mtdSkJENzKXeNpDPEahTyVtHHzKQA) and [Facebook](https://www.facebook.com/MetaOpenSource) and [LinkedIn](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fshowcase%2Fmeta-open-source&h=AT0srYvhSqQpFOtjJEvn9Y1uXVJZAYrN8oUpdeNOWJe0e3DeRyHpHmlm8eZ5VM625pBC7rGiG2VM8LamNMVaOZpTyixXldNA7tYm44LwibTcIyqHIagi-Y8TF_5Wbah4QHt6Bnbh-OoTgTu0MsEySKkbm5cWVjykz8glSnB79Sw).