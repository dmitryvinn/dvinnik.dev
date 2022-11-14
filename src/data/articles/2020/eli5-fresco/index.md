---
category: 'article'
cover: './cover.jpg'
title: 'ELI5: Fresco - Image Management Library for Android'
description: 'In this post, we explain Fresco, a powerful system for displaying images in Android applications, in a way that is super simple to understand (or as it’s commonly known online, ELI5).'
date: '2020-11-16'
tags: ['open source','eli5']
published: true
canonicalUrl: 'https://developers.facebook.com/blog/post/2020/11/16/eli5-fresco-image-management-library-android/'
---

![cover](./cover.jpg)

*By Dmitry Vinnik*

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

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT2CuciOCDL56CfwwfiUGeddYU9pP6ENxjdlv-I_I22gn9FTl83b0X0AVlOsBNm0y4zxjqpYYlK_qj02YM21PlJOE1yJMuxXYuimfRSl54MV50AscbD6KYmwmedgaaJN-mKK96aQh_6IRWsCuPrtvm5wsjXPoHNIXD_3gjiO3b0).