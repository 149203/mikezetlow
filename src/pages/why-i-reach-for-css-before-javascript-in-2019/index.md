---
title: "Why I reach for CSS before JavaScript in 2019"
date: "2019-02-01"
featuredImage: "./video-still-ben-denzer-and-i-smash-through-an-online-javascript-test-mike-zetlow.jpg"
topic: "web development"
video_minutes: "0"
rating: "540"
draft: true
---

![](stack-overflow-why-i-reach-for-css-before-javascript-in-2019.PNG)

A Stack Overflow user asks:

> Is it always better to use CSS when possible instead of JS?

I love it when someone asks [a question like this](https://stackoverflow.com/questions/24012569/is-it-always-better-to-use-css-when-possible-instead-of-js) in earnest.

"Of course it is!" everyone says. "Something something performance, something something separation of concerns!"

Let's take a look at some of the responses this question gets and see if they hold up:

> Your styling should be done using CSS wherever possible—[adam](https://stackoverflow.com/a/19188478/6305196)

This is a popular answer to the question. But it's not an answer at all.

![](./lebowski-why-i-reach-for-css-before-javascript-in-2019.jpg)

Tell me: **why** should it be done this way? Why shouldn't I use JavaScript to style something?

> But most of all, it is a Bad Idea. CSS is for styling, for the looks of your page. HTML is for structure, and Javascript is for logic, interactivity.—[GolezTrol](https://stackoverflow.com/a/7621871/6305196)

![](ah-no-why-i-reach-for-css-before-javascript-in-2019.jpg)

It's 202X and your quaint idea of keeping JavaScript to its own little "logic" realm is cute. JavaScript creates websites now. The body of my blog's index.html is a single div. And we've learned that code organized by feature slice is much more maintainable than by file type.

> CSS is faster... JS tends to be slower.—[serakfalcon](https://stackoverflow.com/questions/24012569/is-it-always-better-to-use-css-when-possible-instead-of-js#comment37010132_24012569)

Doing what? On what hardware / OS?

This answer has the potential for merit, but there are so many variables. Crappy code can make either CSS **or** JS cripple your speed. Solid code can handle it one way or another. See: [Myth Busting: CSS Animations vs. JavaScript](https://css-tricks.com/myth-busting-css-animations-vs-javascript/)—where the author of the JavaScript GreenSock Animation Platform shows how GSAP outperforms CSS animations.

Conclusion:

* It depends on what you're doing
* Measuring its performance is hard
* jQuery != JavaScript
* How you write it makes the biggest difference
* And when all things are equal and optimized, it doesn't matter.

Finally:

> It's common for users to disable JavaScript.—[James Donnelly](https://stackoverflow.com/a/24012650/6305196)

No. No, it's not common.

[Blockmetry](http://web.archive.org/web/20190417230608/https://blockmetry.com/blog/javascript-disabled) says 0.2% of users disable JavaScript. And those are mostly TOR users.

Now that entire sites and applications are built from JavaScript bundles, the world has left this answer in the dust heap of time.

You know what I see when I visit a site anymore with my JavaScript disabled? I don't see **any** UI—JavaScript **or** CSS. I see: "Please enable JavaScript to view this site."

## So why do I reach for CSS first?

That is to say, if I'd like to create a user interface on the web, why do I try to do it with HTML/CSS alone before reaching for JavaScript?

For me, there's one good reason: portability.

We've all worked on apps that started as a jQuery project, then turned into a React project. Then maybe we added TypeScript. Or maybe we redid everything as a static HTML front end with [HTMX](https://htmx.org/) methods for fetching and updating data.

How we do JavaScript wanes and waxes from "JavaScript all the things!" to "scrape it all out!"

But CSS is available and unchanging at every iteration.

When I do things in CSS that could also be done in JavaScript, I save myself the headache of changing it all when JavaScript best practice du jour changes.

## And the Rule of Least Power

HTML and CSS were designed to be less powerful than "real programming languages." And that is why they are more portable!

From the W3C's seminal [Rule of Least Power](https://www.w3.org/2001/tag/doc/leastPower.html) document:

>When publishing information or programs on the Web, the choice of language is important. The "Rule of Least Power" suggests choosing the least powerful language suitable for a given purpose.

>HTML is intentionally designed not to be a full programming language, so that many different things can be done with an HTML document: software can present the document in various styles, extract tables of contents, index it, and so on.

>Similarly, CSS is a declarative styling language that is easily analyzed... Thus, HTML, CSS and the Semantic Web are examples of Web technologies designed with "least power" in mind. Web resources that use these technologies are more likely to be **reused in flexible ways** than those expressed in more powerful languages.

Portability/reuse is a big win. And HTML and CSS get you there when programming for the web.