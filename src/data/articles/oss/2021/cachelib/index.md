---
category: 'article'
cover: './cover.jpg'
title: 'CacheLib, Facebook`s open source caching engine for web-scale services'
description: 'CacheLib is a pluggable in-process caching engine to build and scale high-performance services collaboratively.'
date: '2021-09-02'
tags: ['open source', 'data']
published: true
canonicalUrl: 'https://engineering.fb.com/2021/09/02/open-source/cachelib/'
---

![cover](./cover.jpg)

*By [Sathya Gunasekar](https://engineering.fb.com/author/sathya-gunasekar/ "Posts by Sathya Gunasekar"), [Snehal Khandkar](https://engineering.fb.com/author/snehal-khandkar/ "Posts by Snehal Khandkar"), [Dmitry Vinnik](https://engineering.fb.com/author/dmitry-vinnik/ "Posts by Dmitry Vinnik"), [Michael Cheng](https://engineering.fb.com/author/michael-cheng/ "Posts by Michael Cheng")*

*Originally posted [here](https://engineering.fb.com/2021/09/02/open-source/cachelib/).*


Caching plays an important role in helping people access their information efficiently. For example, when an email app loads, it temporarily caches some messages, so the user can refresh the page without the app retrieving the same messages. However, large-scale caching has long been a complex engineering challenge. Companies must balance the fast experience people have come to expect from caching with keeping systems highly performant and cost-effective. Traditionally, each cache implementation is created and maintained independently by different engineering teams. This approach isn't efficient, since it ignores different caching systems' shared challenges, from deployment to maintenance. 

As traditional dynamic random-access memory (DRAM) caches become more expensive and require more power to scale, companies like Facebook are exploring hardware choices such as non-volatile memory (NVM) drives to augment their caching systems. This DRAM and NVM hybrid model is a step forward, but innovative caching designs are needed to harness the full potential of the hybrid cache. This includes new caching heuristics research that must push the boundaries of traditional systems by identifying the relevant content to cache for the right duration. We have consolidated these innovations and taken them a step further through collaborations and open source work. 

Today, we're announcing the release of [CacheLib](https://github.com/facebookincubator/CacheLib), a pluggable in-process caching engine to [build and scale high-performance services](https://www.usenix.org/conference/osdi20/presentation/berg) collaboratively. CacheLib's C++ library enables developers to build and customize scalable and concurrent caches through its simple API. We are also open-sourcing [CacheBench](https://cachelib.org/docs/Cache_Library_User_Guides/Cachebench_Overview/), a benchmarking tool for evaluating caching performance on diverse production workloads.

![CacheLib's C++ library enables developers to build and customize scalable and concurrent caches through its simple API.](https://engineering.fb.com/wp-content/uploads/2021/08/CacheLib_chart-copy.jpg)

CacheLib is leveraged as an in-process cache in more than 70 large-scale systems at Facebook, including the social graph, content delivery network, storage, and [look-aside key-value caches](https://research.fb.com/publications/scaling-memcache-at-facebook/). This existing scale and the potential for open source adoption make CacheLib an aggregation point for optimizations and CacheBench an effective benchmarking tool for evaluating new ideas across diverse caching applications.

**Enabling innovation through partnerships**

As an open source platform, CacheLib and CacheBench have the potential to become an industry standard for caching innovations and benchmarking. To date, our collaborations with research universities, hardware manufacturers, and software companies have yielded substantial results that show the value of this toolkit.  

Over the past two years, we have partnered with many well-known organizations to push the boundaries of caching innovation. Today, we are working with Twitter on integrating CacheLib into [Pelikan.io](https://github.com/twitter/pelikan) to enable SSDs for caching objects within the Twitter infrastructure. Pinterest is evaluating the adoption of CacheLib within its machine learning infrastructure systems to improve prediction performance and system stability.

In academia, researchers at Carnegie Mellon University, Princeton University, and Yale University are using CacheLib and CacheBench to [prototype research ideas](https://www.pdl.cmu.edu/PDL-FTP/NVM/McAllister-SOSP21.shtml). By evaluating their prototypes against industry caching workloads, these researchers can iterate on their projects much more quickly and accurately than before.

We have also collaborated with hardware industry partners like Intel, KIOXIA, Samsung, and Western Digital to standardize and enhance SSD technologies which enable improved caching solutions. This work is now part of the [Open Compute Project (OCP) NVMe Cloud SSD Specification](https://www.opencompute.org/documents/nvme-cloud-ssd-specification-v1-0-3-pdf), which we discussed in [this webinar](https://www.opencompute.org/events/past-events/webinar-data-center-nvme-ssd-and-edsff-presented-by-facebook-sk-hynix-kioxia-intel-snia). This specification, along with CacheLib, will help adapt future NVM technologies for caching workloads across the industry.  

CacheLib and CacheBench have enormous potential to shape the future of caching, thanks to its developer-friendly API, access to many benchmark workloads across the industry, and the collaborative nature of open source. We are thankful for our partners' support and contributions in using the platform to drive innovation in such an important and complex area. We are open-sourcing this work in an effort to make building the future of caching a more collaborative and open space for sharing across the entire industry. [Read more about the project at ](http://www.cachelib.org/)Cachelib.org.