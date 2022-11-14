---
category: 'article'
cover: './cover.jpg'
title: 'ELI5: Metro - JavaScript Bundler for React Native'
description: 'This blog post explores an open source project called Metro that acts as the JavaScript bundler for React Native.'
date: '2021-11-01'
tags: ['open source','eli5']
published: true
canonicalUrl: 'https://developers.facebook.com/blog/post/2021/11/01/eli5-metro-javascript-bundler-react-native/'
---

![cover](./cover.jpg)

*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/11/01/eli5-metro-javascript-bundler-react-native/).*

This blog post explores an open source project called Metro that acts as the JavaScript bundler for React Native. We aim to keep this post brief, following the [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT30Lj7KDFX0XM9pFbpWzLhVJqFqTyDsc5tdxAvl65V9o3Hjc5aihLZSiY6PKCS8as0NajHhjocUevhowAgWnlBgLfIFbT5KOBUQkoo8WMtPIDFFUkzaK5-g2TGdxyvVA7qFbhSRWFbLEWZLB6M9ocroCyHHnGROELxNG1zU228) style of explaining things in simple terms in the shortest amount of time.

If you prefer to watch an accompanying [video about Metro](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2FE13sgMCODDk&h=AT2PyxbalyFYuf3283DAVeD1nkcnX218bGkoSic12O9nlqM7_gYABQXJZF-DCWN_FXwYJJwiHNpp9GBIF9Jk7bkLBf_hyi77FJ_7S1kVizE3RA7LOpM5l5siBr1z4Tl_cZTCby_zJMeFggeqfl85Dc4k9WEeRaYMRVSf2DWaS5I), visit our [Meta Open Source YouTube channel](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fc%2FFacebookOpenSource&h=AT0AuEaAO7_o_3ARLQGqft_FrmjYEGeoaLFJA9P58Q6fLRcFUjW0dKKIpkOqYLCaK0dYEz1kzBMUH2bO-DbDH-6XYeaSgbJCvdlN90vWg9U59sHJ2fEUlrBsY029LhFrktS6CLpodZqkMEeCYFmXEG-3_vfq5LsQg9lrqTNPd7g).

**Why Metro?**

Metro is a development platform for React Native. This project acts as a JavaScript bundler; it manages assets, caches builds and performs hot module reloading.

</br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/E13sgMCODDk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

Interested in working with open source at Meta? Check out our open source-related job postings on our career page by [taking this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT2rSUckMTG3PqkAOFX5pw7vaXGTanFL_MaDfxa0oHvHPClC1u6rMBNO0eYemcpqDOh5LVOVL3EgvU3gesjR2lbuH5nSnEvxXkWQlK47hMu2S972P4VcKcZEA_GfzKstit-tk3P8jVnHwt7nQxaAItTFWtolDoseIEiP8l45Edo).