---
category: 'article'
cover: './cover.jpg'
title: 'ELI5: Flipper - Cross-Platform Debugger'
description: 'In this post, we explain Buck, a high-performance build tool.'
date: '2021-06-08'
tags: ['open source,'eli5']
published: true
canonicalUrl: 'https://developers.facebook.com/blog/post/2021/06/08/eli5-flipper-cross-platform-debugger/'
---

![cover](./cover.jpg)

*By Dmitry Vinnik*

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

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT35_-00naCt10goqs_vmF97Gi3AnKokft810wPaeOKvIFwmYO_1WU2aQsxN2Mqu_AL-sgOBYjxyRR-suf0n84P4PBMwxe9lLOb_TEVrNVaBJKNoqUUSYKCFihXbas-VPZITBk7TlrNizJa52HPqKzsCr229cbYfuvsqqR0H28g).