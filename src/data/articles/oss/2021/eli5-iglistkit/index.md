---
category: 'article'
cover: './cover.jpg'
title: 'ELI5: IGListKit - Building Flexible Collection Views for iOS'
description: 'This blog post covers a popular open source project called IGListKit, a data-driven UICollectionView framework for building fast and flexible lists in iOS.'
date: '2021-10-18'
tags: ['open source', 'eli5']
published: true
canonicalUrl: 'https://developers.facebook.com/blog/post/2021/10/18/eli5-iglistkit-building-flexible-collection-views-for-ios/'
---

![cover](./cover.jpg)

*By Dmitry Vinnik*

*Originally posted [here](https://developers.facebook.com/blog/post/2021/04/15/eli5-infer-finding-bugs-before-you-ship).*

This blog post covers a popular open source project called IGListKit, a data-driven UICollectionView framework for building fast and flexible lists in iOS. We explore this open source project using the [ELI5](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.dictionary.com%2Fe%2Fslang%2Feli5%2F&h=AT3Fy1zR3qftmN-nc7BNGi0TPBxCqeh6qmwsAihKVA-eyw-nm7AT763Bq3CD0qJlMospB2COL-haRPpT1FiMbllmvxaRCURetNOksNwpp5AC_Gr8zNu-DiQIxlKURcWWGuvK0T06YesiLq9scGpiFdUySeXtveBY_xpwZXgX_k8) style of explaining things in simple terms in the shortest amount of time.

If you prefer to learn by watching, we also have an accompanying [video about IGListKit](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2F3-WwZaiuJ3g&h=AT1WeXoLYvD6iNc5U_Jh8nwX2M6EzESDzNzCLq8GDcwdwQMuB_4VhzLRujKa7aJDFlJ0KGFKLwyp1fo-LIiJt82lfeBxiv0VgAK_CcgPkdu9_9IyrwY7HpANcuQYP73WcpAekN64LwlamBwBVU1U02bnGz4wQw4NaYJCiDHTu-g) on our [Facebook Open Source YouTube channel](https://www.youtube.com/c/FacebookOpenSource).

**Why IGListKit?**

Today, most large apps rely heavily on scrollable data feeds for their users. At Facebook, we've been dealing with large scale data processing for quite some time, so building a robust framework for displaying the data was a tremendous help, and we wanted to share it with the world. This work resulted in us open-sourcing IGListKit.

IGListKit is an iOS framework for building fast and flexible data-driven lists, or in more technical terms, UICollectionViews.

</br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/3-WwZaiuJ3g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</br>

[Watch the video](https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutu.be%2F3-WwZaiuJ3g&h=AT3so-3CDV5jwYFz3XoD46Ge4yeEb7UAjYHwNIEUsfO8bjpJe6WS6BFNtqAV7ghE2zA6KdjnKHS2L7wX3mMiMCVqfBdWFIeIgIBlWR8sE0lU8ndhqciZxBVEb7kPCSobZDAhJCR32T4BDXBjcYgNUZWVbfgk4pIw3NEvLbqjISI)

One of IGListKit's goals is to simplify the development process. The way this framework works is that it first accesses an array of objects to display in UICollectionView. Then, IGListKit's adapter creates section controllers that handle creating individual cells in the list for each object type.

Another great feature of IGListKit is that it keeps your data up-to-date. It means that this framework monitors your objects, and if anything changes, IGListKit performs batch updates on the UICollectionView. With these updates automatically handled, you never have to deal with this error-prone operation ever again!

**Where is it used?**

IGListKit was open-sourced in late [2016](https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram-engineering.com%2Fopen-sourcing-iglistkit-3d66f1e4e9aa&h=AT1M7nkMEkHnnm2j0mFb4aINLuRQwleemj9QLgSUNT20iHJ30EFSpCqdHm_7QuK9Ygcnl1mtgrVdYg7PFrdg_HjHFVQdAvBfU0Hi927yL50oeKyT6xLC6XLn0FLntjTkdpjoq9hjMDK2hBht-UUNHYLVMIOCK33P4sr_kXfCnNo) by Instagram Engineering. Since then, the project has gotten over 12 thousand stars on GitHub, and its community continues to grow.

**Where can I learn more?**

To learn more about IGListKit, visit their [website](https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram.github.io%2FIGListKit%2F&h=AT3YsortlG9etMOWrdxAR6ncFFZ3ebctnJFN6GC-a_Hg1u3dV1YHxiaII1OOgJxxIGIPwEf-OxFBuihkYigaaYMHl0cbPmB8tptU6FMm4-Tf1_OLFTTBVlIq5dVrEbuFCx0aKUgOSDi2Op08uHxhR1GZEBR050X4-5SZFvUrADw). It has several [getting started guides](https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram.github.io%2FIGListKit%2Fgetting-started.html&h=AT2ERf4nfMne1yFfjE2_Ox1tABqPuq-NF9Nt_bTFJbcix4vh_pIFbD_rsjZ0Yoy6uqIV-QXXobj10n8lPKRYW9gpTbxoX8l8phF8mz0a_8LnGUVjRnFxeqWvuZbwZ7di0xXKUrO-sOUtrK2xDN5086TkKDM3isN-fdp4T6KEIEg), [examples](https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram.github.io%2FIGListKit%2Fbest-practices-and-faq.html&h=AT2CkUETI_ZedqZYhrPdfQ8A9rPjMxAVBWhHeQKiME8a_cm2QVVDHCru4lDubahfm2jCjCVy3aFs-Qivrotuadv1K8FwpOQPiQaVi7Fir9DcVIAy_ghBS7aM70P0wDMPczq3oFN9QkhaWWaa-SVA3yYWSNiMgqSCyZIDD_LpTi0) and [API docs](https://l.facebook.com/l.php?u=https%3A%2F%2Finstagram.github.io%2FIGListKit%2FClasses%2FIGListAdapter.html&h=AT33WBU2iRhDbZl64lu-41GdyU6vAyhgPsO8i7B4hea-i5oxIB93LvIJ3PsLryCcMBZIoB59GTMl5bYxmhnPtDObkyHh_x6ahmg84PO-yGgqD1T6qs-vmj3ZSfLgNXSc8YqtqzdUFoyfPyCUIu7nFzJxoczgXRdwGFg_YQujHNo). For troubleshooting and the latest updates on the project, feel free to ask a question on the [project's GitHub page](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2FInstagram%2FIGListKit&h=AT0nPuNyo9__m2Gyc-8RfOHBj_q4FtH2BqgURVfpGEc3YLZsQqPxZdZxXw98M-W-oQNeop2Uux-weeN5A2uFcjF63AvEb4CCt-yJq6HZ7jDMBiJKC-mjo2fqeM381pNf06rx0FGyyUmNtoTlWTRokLB2TiQKiZ_AHZMmR3haShs).

**About the ELI5 series**

In a series of short videos (~1 min in length), one of our Developer Advocates on the Facebook Open Source team explains a Facebook open source project in a way that is easy to understand and use.

We will write an accompanying blog post (like the one you're reading right now) for each of these videos, which you can find on our [YouTube channel](https://www.youtube.com/channel/UCCQY962PmHabTjaHv2wJzfQ).

Interested in working with open source at Facebook? Check out our open source-related job postings on our career page by taking [this quick survey](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.surveymonkey.com%2Fr%2FV76PRN3&h=AT2sOFm2ezirOwcurbPxeRTDaOpgbxbnsnrwMju2Jgk9F3zAAU9_BGOKpx-5hkHCvi8LihlhIflX-DQJoWR68FC2AKg9SsgZi2GWEYmH6hDNxfE_7J0kxDhvyga_76agamKhsQPJbh4b_he4qVfcVlNDpSyDZVM9oZj8ZyUQDic).