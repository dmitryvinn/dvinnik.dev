---
category: 'article'
cover: './cover.jpg'
title: 'ELI5: Infer - Finding Bugs Before You Ship'
description: 'In this post, we take a closer look at Infer, a static analysis tool for programming languages like Java and C.'
date: '2021-04-15'
tags: ['open source', 'eli5']
published: true
canonicalUrl: 'https://developers.facebook.com/blog/post/2021/04/15/eli5-infer-finding-bugs-before-you-ship'
---

![cover](./cover.jpg)

*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/04/15/eli5-infer-finding-bugs-before-you-ship).*

In this post, we take a closer look at [Infer](https://l.facebook.com/l.php?u=https%3A%2F%2Ffbinfer.com%2F&h=AT1Pu6f9_1TliMyqqq0tPvYND7HrP-3w__Ni5KgWKPAwuvVwfarFnoSLm4SMGpkekw8BdCbhVjqDK7K9XkAY6WA03_fEiUes-RaLyatt91tOivas-a2WId_-74gs1m42vjPuDrDq4PiYkf4--MmhHwVrgnCPmBdCUB5jAtefrEI), a [static analysis tool](https://l.facebook.com/l.php?u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FStatic_program_analysis&h=AT2pebJmQh0hs5WWsCBzdUkQha5r-A0bXpAHprUaOg7aERyhrrxhv5yxtpmXKWL93aTZqDlRtHC2ZxlH7QsDUr7ZyvmebY7Ib7ZdbaWriJWYFRxdf9rzJ-BMXGuSXT9zF2bfdApMUBqRaJZCOcrbFqaqK9xnd0oVpwhawIclgKY) for programming languages like Java and C. This post is a part of our [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT0kiEBoOGrJhfpjKGpG2RyZpDmKsAr8oYxlPWjX_j8Hw3nQ6fKQPI0xh7ugOZUflfrtcuZkyxZGDGbTKaJuYEZA7ldtEoTnVlBHnUnw8MCbrJj0XDPmcEyDYRyUfltpsynwx5IATEyWgZj2OsNOgxZD-G2MPl5UdwXHdACCAZw) series of short posts explaining complex projects in the simplest way possible. If you would like to watch a [video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FswrmPTJAGqQ&h=AT18HtxIBoPGIFqADrHZMhEBlrjQoLDkxo8sdHktiVCb8sqLjjmofv4d1CJAE-xOI0U8pJajgW2MLW8b1_ixHQa-bC_wnZg4Y0tNk3S4C9WvbRlpm3Ml4bSrw2wYUV1osJ9IFcaliRgKp4CEDUQmP5YI-22pnNl6nejD5N7sShE) about Infer, visit our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCCQY962PmHabTjaHv2wJzfQ&h=AT1hmnC2FzrXmzlU36bA4W4yhqmSYWR7964-xDVLd6umu0v6_PUNNfvwQnmEHuwoZiQj9-vnPHKJj2ZfpoIoTJEJ1rPFH_pxGkxZECHoJzq2Gx499vFbeqaUkSGa1-LbAsGnCblC_tfbmH5hSh7drnn0g0H1rE2afgRfeJ0KEII).

**Why Infer?**

Catching software bugs in production is expensive. You need to determine the exact steps to reproduce the issue, fix it, test it and then redeploy. This workflow is challenging enough on the web, where your users rely on your servers to serve them the app. Mobile app developers have the added hurdle of fixing bugs installed on their users' devices. The conclusion is clear - bugs cost developers time and money. Hence, tools that help prevent these defects from being released are extremely valuable. One such tool is Infer.

</br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/swrmPTJAGqQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT0DlrtlpcnobBTwJmJq-yfq5dxWiUQ4d1Sj0gOHetE2afZrocMxKcpJRfM33AnkyzYbTGpCPcv_aJioBdx2JTJgz3Ug9Y5Rqb-9B2YT6BWuo14E6_Bammqx9-b68mG1vBzPvuGIsVpYxhdic9AJa1rLsNSmaoUytBDy0hLWJjQ).