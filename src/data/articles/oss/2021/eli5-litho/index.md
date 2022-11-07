---
category: 'article'
cover: './cover.jpg'
title: 'ELI5: Litho - Simplifying User Interface for Android'
description: 'In this post, we discuss Litho, a framework for building efficient User Interfaces (UI) for Android.'
date: '2021-03-01'
tags: ['open source','eli5']
published: true
canonicalUrl: 'https://developers.facebook.com/blog/post/2021/03/01/eli5-litho-simplifying-user-interface-android/'
---

![cover](./cover.jpg)

*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/03/01/eli5-litho-simplifying-user-interface-android/).*

In this post, we discuss [Litho](https://l.facebook.com/l.php?u=https%3A%2F%2Ffblitho.com%2F&h=AT25B44g0O3pjJqiabYLU-JIRzJrIJyV9gW_bgu00PTRr-OK4EDgaxu2kJIbsqLj3Pqf9npGuAjD1dXJETj-1i78lNc973TSxrsVwKwuJwkoHj3zxiE5Ud42OIVAqi69D504gdO4xasoBWDWpp90UrnUURLZZSgdIdxQK_dsfKM), a framework for building efficient User Interfaces (UI) for Android. If you're interested in watching a [video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FRFI-fuiMRK4&h=AT2br23P6j9KX4Ghdc3jWsil4gEorvzxStNKsYR-y1MKoCQfMf5DF10Un_dwh00AY-SnU490xKsjwnQGV_M_Smfhje-qnLppBvGrV0JZvPRKikFs7BeRol2SvGIEFXYv_4O4kAui9S3tSPeaVE2WR13NmCXqdAeTvJXRXPAYgZw) on this topic, check out an episode of ELI5 series about this open source project on our [Facebook Open Source YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT1feVMHMsndmgzWp8OH1QgwuomNXiCGLuzuT9DWT0t-mxriuk85wg8UnP8A3FXfrvSa_C8bBSdgigCfHush8pZpN5bcWXB3LyKypVE1bNia-X_8auYp_weK0ssJvyy7jn3t5vvj37tzAfcKhD-89MsnW_QY6A-wZIqJhTKT0tc).

**Why Litho?**

Most mobile applications today look pretty similar: endless scroll feeds of photos, videos and text. There are many moving pieces to make sure all the elements on your screen display correctly. Scrolling on mobile is a non-trivial problem with large apps. Think of the News Feed in the Facebook Android app - our developers put many engineering hours into making the scrolling a seamless experience, optimizing all possible states for the user. Fortunately, Litho can simplify solving this problem for you.

</br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/RFI-fuiMRK4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://www.surveymonkey.com/r/V76PRN3).