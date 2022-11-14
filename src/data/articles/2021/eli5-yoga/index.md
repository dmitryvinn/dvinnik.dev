---
category: 'article'
cover: './cover.jpg'
title: 'ELI5: Yoga - Cross-Platform Layout Engine'
description: 'In this post, we will discuss Yoga, an open source, cross-platform layout engine.'
date: '2021-02-01'
tags: ['open source', 'eli5']
published: true
canonicalUrl: 'https://developers.facebook.com/blog/post/2021/02/01/eli5-yoga-cross-platform-layout-engine/'
---

![cover](./cover.jpg)

*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/02/01/eli5-yoga-cross-platform-layout-engine/).*

In this post, we will discuss [Yoga](https://l.facebook.com/l.php?u=https%3A%2F%2Fyogalayout.com%2F&h=AT3JzTNzaJx49MBpZqt7LdjScp6Kf5Mr98XbP1ra6-teACrE0z5Xq3IQM-84R9MrCUafaQGXzMBUbxZbiuhkePHWMpcJX0rk0Kgc_sSTA0DjMjZC1drcQMQOYf8_6WSm5CCRH5ZIHvSyYvYVKPULrZZh5yn7PUbbEsWuwvqqZEw), an open source, cross-platform layout engine. If you are more of a visual learner, watch our [short video](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DtHgoA6zBib0&h=AT0oJ2WZiDcCOsqo2B3DCTmQV_1v9DFznQ9ny5TKBxRFQQRtMqKAzYyObWMURysyRvv9H2nGrJ6oXM4Bys3Gn6GoH9zLOrSJGvGCHE5vAhD0cBAh17qdHA_XwqKvm0reHG4V9t75yVWaYsP5ArVxtIqVyNBmJOb7DLdsfkpugwE) on this topic on our [YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FtHgoA6zBib0&h=AT3tpzlRwIQ3E4Ub32CEKj103pkyHjKcCjR2id-JDbyeYtmLM56C0Phdc24zWwobmshXW5PXsNysZvwKuDlQ1g7u2pymhB6JwOveopftvToJ1hzVmfi4FsdUIPv38oquRuHK-nP7nFubFj3qbh-KTh2J0ZXhEcv4UqEYMJdy2XM).

**Why Yoga?**

People will often view the same website across a variety of devices, browsers and screen sizes. Since every platform has its way of displaying content, web developers have to design, maintain and change their website layout to accommodate every possible way users can view their website. That's a lot of work. If only there was an engine that allows web developers to write their code once and use it everywhere.

Presenting Yoga, an open source, cross-platform layout engine that manages user interfaces across platforms by reusing CSS layouts. This approach brings a single standard for all users, allowing developers to focus on other tasks at hand.

</br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/tHgoA6zBib0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT2QkrodzI6RSuK-MAgoX7Yy_6YsF2o2Uj0_Iy5TfYErEcy2MRGYy1WgETYjaIqLds87HQenSN6kzHwwgv7KX9JH8b3lBa_brTiNUlkjQoBu0yufe7a1A5z-tu0GHVCVcxnzWUsHXLUu7wlWlopxmhFe0yIvD8gO9_-ICreLrb0).