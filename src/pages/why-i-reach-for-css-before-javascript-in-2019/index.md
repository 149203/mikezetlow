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

> Is it always better to use CSS when possible instead of JS?

I love it when a Stack Overflow user asks [a question like this](https://stackoverflow.com/questions/24012569/is-it-always-better-to-use-css-when-possible-instead-of-js) in earnest.

"Of course it is!" everyone says. "Something something performance, something something MVC!"

Let's take a look at some of the responses this question gets and see if they hold up:

> Your styling should be done using CSS wherever possible—[adam](https://stackoverflow.com/a/19188478/6305196)

This is a popular answer to the question. But it's not an answer at all.

![](./lebowski-why-i-reach-for-css-before-javascript-in-2019.jpg)

Tell me: **why** should it be done this way? Why shouldn't I use JavaScript to style something?

> But most of all, it is a Bad Idea. CSS is for styling, for the looks of your page. HTML is for structure, and Javascript is for logic, interactivity.—[GolezTrol](https://stackoverflow.com/a/7621871/6305196)

![](ah-no-why-i-reach-for-css-before-javascript-in-2019.jpg)

It's 2019 and your quaint idea of keeping JavaScript to its own little "logic" realm is cute. JavaScript creates websites now. The body of my blog's index.html is a single div.

> CSS is faster... JS tends to be slower.—[serakfalcon](https://stackoverflow.com/questions/24012569/is-it-always-better-to-use-css-when-possible-instead-of-js#comment37010132_24012569)

Doing what? On what hardware / OS?

This answer has the potential for merit, but there are so many variables. Crappy code can make CSS **or** JS cripple your speed. Solid code can handle it one way or another. See: [Myth Busting: CSS Animations vs. JavaScript](https://css-tricks.com/myth-busting-css-animations-vs-javascript/)—where the author of the JavaScript GreenSock Animation Platform shows how GSAP outperforms CSS animations.

Conclusion:

* It depends on what you're doing
* Measuring its performance is hard
* jQuery != JavaScript
* How you write it makes the biggest difference
* And when all things are equal and optimized, it doesn't matter.

Finally:

> It's common for users to disable JavaScript.—[James Donnelly](https://stackoverflow.com/a/24012650/6305196)

No. No, it's not common.

[Blockmetry](https://blockmetry.com/blog/javascript-disabled) says 0.2% of users disable JavaScript. [Data from 10 years ago](https://stackoverflow.com/questions/9478737/browser-statistics-on-javascript-disabled) says 2% at most in the US, lower everywhere else.

Now that entire sites and applications are built from JavaScript bundles, the world has left this answer in the dust heap of time.

## So why do I reach for CSS first?

That is to say, if I'd like to create a user interface on the web, why do I try to do it with CSS alone before reaching for JavaScript?

For me, there's one reason: portability.

I'm presently working on three web projects: one in TypeScript, one in React, and one with jQuery. If I can design a UI with CSS alone, I can fly it into any project with ease.

## An example: darken on hover
