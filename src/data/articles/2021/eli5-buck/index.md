---
category: 'article'
cover: './cover.jpg'
title: 'ELI5: Buck - Modular Build System'
description: 'In this post, we explain Buck, a high-performance build tool, in a way that is super simple to understand (or as it's commonly known online, ELI5).'
date: '2021-03-29'
tags: ['open source','eli5']
published: true
canonicalUrl: 'https://developers.facebook.com/blog/post/2021/03/29/eli5-buck-modular-build-system/'
---

![cover](./cover.jpg)

*By Dmitry Vinnik*

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

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://www.surveymonkey.com/r/V76PRN3).