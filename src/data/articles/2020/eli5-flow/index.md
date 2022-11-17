---
category: 'article'
cover: './cover.jpg'
title: 'ELI5: Flow - Static Type Checker for JavaScript'
description: 'In this post, we explain Flow, a static type checker for JavaScript. Flow provides real-time feedback right in your editor and lets you write JavaScript your way.'
date: '2020-12-14'
tags: ['open source','eli5']
published: true
canonicalUrl: 'https://developers.facebook.com/blog/post/2020/12/14/eli5-flow-static-type-checker-javascript'
---

![cover](./cover.jpg)

*By Dmitry Vinnik and Joe Previte*

*Originally posted [here](https://developers.facebook.com/blog/post/2020/12/14/eli5-flow-static-type-checker-javascript).*

In this post, we explain [Flow](https://flow.org/), a static type checker for JavaScript, in a way that is super simple to understand (or as it's commonly known online, [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT2cdG_waA0U-CcPWcIN3w1uU-VUfAUv2e6ZBjgYuG-8JTgNqs09NzI5OZDs4eLjZ3YThKhp0Q_pUz04ZCokGqslErQbwmCwRJZDa8mJPPRjxvAmBuACboiQgHlYanI9Jj2Yu9ef8DTCEnq2oAFETqQItGHwx-dUiGhJ34ScWxU)). If you're interested in learning by watching or listening, check out a [video](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dr_6cW_Mxy5U&h=AT0pgQBc-kBIgjDwStFaVMHH0Z3TRD8kYwxf7iwGYd_6T__SgjtXPEly1eVHs7lipaOJYHfQfwjTmrf9D28Mjd95wqG9G04VDGWk3-TALEkKUy6CpcWRqvJFdzSvVY0eD5Jr7lkIkauhNy-HrinQWFbnreFvaAxDiKiHqK8sIhc) about this open source project on our [Facebook Open Source YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT360NMza3KaY7X9l4RkRlNW2l55zFlvwIa9n0RuMwn4YiNTZ6SYXo3KoRgIjcTtJiJFiUm-WFc6RJhGGqNFfoI2vsi3gQRt3JImCAuOrLQwyh1vzM86Yz6YEqmiBycNou14AJqZiL2qY3jyQRf48oHqYfFnJ7VXoDCb3JbrR3c).

**Why Flow?**

When writing code for a program, you want to ensure that you catch errors before your users do. Unfortunately, JavaScript by itself won't protect you from making and releasing those errors. JavaScript was built to help developers write code quickly, with type safety left to be managed manually.

At Facebook, we wanted to help our developers stay productive and enable them to ship high-quality code quickly. So we built Flow, a static type checker for JavaScript. Through intelligent program analysis, Flow checks your program in the background while you concentrate on writing quality code and reports errors back to you. It extracts information from your program to figure out precisely what you're doing. If it doesn't understand, it tells you. You then annotate your code to clarify to both other developers and Flow what your intentions are.

</br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/r_6cW_Mxy5U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT0eKrsofClWOUVoKjSiebY-Jr7sXvr8l-_c3GtNl5bZ3ctjgNnsgOByx5i1o3mi9BoAKCbNtRxch5sASzJmOfl9wtLegsfZklL2SyJgRPu8TVDkJp6E04Ysyj9oBoJJ47n3uKqc4A6K9jgNDbxrKyRhuhY8OcRA3VipCBrh4ss).