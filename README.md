# Code style guide

## Petty shit

No semicolons.

lower_snake_case for all variable names.

3 spaces.

Prefer not to use `for` loops. `for..in` and `for..of` are ok. Recursive functions are best.

Of course, I'll be using libraries that break these rules. I don't need to go through and "fix" these, just accept them. Disgustedly.

## The biggest rule of all

Any dummy can write code that machines can read. It takes work to write code that another human can read. Write code that other people can reason about at a glance and will want to dive into. Write code that you will be happy to go back to in six months.

## Folder structure

**NEVER BREAK PERMALINKS!**

The permalink / slug should always look like mikezetlow.com/the-title-of-the-page — the title should always come right after the root. This is so we never break permalinks. It is terrible UX to have a post under a category or tag folder, and then one day have that change and break the link. When making a link to a page, do some planning first. Links are forever. **Never break them.**

# Design style guide

## Colors

Image | Name | Semantic Name | Hex
--- | --- | --- | ---
![#000000](https://placehold.it/48x14/000000/000000?text=+) | Black | black | #000000
![#1f1f1f](https://placehold.it/48x14/1f1f1f/000000?text=+) | Gray Darkest | gray_darkest | #1f1f1f
![#505050](https://placehold.it/48x14/505050/000000?text=+) | Gray Dark | gray_dark | #505050
![#808080](https://placehold.it/48x14/808080/000000?text=+) | Gray | gray | #808080
![#b1b1b1](https://placehold.it/48x14/b1b1b1/000000?text=+) | Gray Light | gray_light | #b1b1b1
![#e1e1e1](https://placehold.it/48x14/e1e1e1/000000?text=+) | Gray Lightest | gray_lightest | #e1e1e1
![#ffffff](https://placehold.it/48x14/ffffff/000000?text=+) | White | white | #ffffff
![#2196f3](https://placehold.it/48x14/2196f3/000000?text=+) | Dodger Blue | blue | #2196f3
![#4caf50](https://placehold.it/48x14/4caf50/000000?text=+) | Middle Green | green | #4caf50
![#fbc02d](https://placehold.it/48x14/fbc02d/000000?text=+) | Saffron | yellow | #fbc02d
![#f88232](https://placehold.it/48x14/f88232/000000?text=+) | Princeton Orange | orange | #f88232
![#f44336](https://placehold.it/48x14/f44336/000000?text=+) | Vermilion | red | #f44336
![#7E57C2](https://placehold.it/48x14/7E57C2/000000?text=+) | Toolbox | purple | #7e57c2

Colors were originally based off of the palette found at https://www.materialui.co/colors

The orange was mixed using https://meyerweb.com/eric/tools/color-blend/#FBC02D:F44336:1:hex

The names come from https://coolors.co/2196f3-4caf50-fbc02d-f44336-7e57c2

## Breakpoints

I don't have firm breakpoints. Rather, before the layout starts to crumble, it changes.

# Post style guide

## Frontmatter

`---`
```
title: "There's no divine inspiration in design"
date: "2017-05-14"
featuredImage: "./mountaintop-theres-no-divine-inspiration-in-design-mike-zetlow.jpg"
topic: "user experience"
type: "article"
rating: "580"
draft: false
```
`---`

## Images

Images are named with this convention:

what-it-is-

title-of-post-

mike-zetlow

.jpg

```
![](mountaintop-theres-no-divine-inspiration-in-design-mike-zetlow.jpg)
```

Save the images in .jpg format—no more than 1920px width and 1080px height. Save with the lowest quality before degradation is visible in the image.

If the image has a caption, wrap it in a `<figcaption>` tag. You can include links in captions.

```
<figcaption>

Credit: [The Cooper Review](https://thecooperreview.com/how-to-avoid-being-invited-to-meetings/)

</figcaption>
```

## Ratings

### 500s

The top 5 - 10 articles on the site have a rating in the 500s, most popular highest. As of last commit:

590: Everyone hates a redesign

570: What I learned leading my first team and winning at Startup Weekend

550: How to handle all the information life throws at you

540: Ben Denzer and I smash through an online JavaScript test

530: Designing software for the next generation of insurance professionals

510: How to design colors for your app with Adobe Illustrator—plus 3 free palettes

### 400

These are above average articles.

### 300

These are average articles.

## Headings

The highest heading in a post is `##`. The next highest is `###` and so on.

## File naming

All posts and their related images are saved in a folder named with the title of the post in kebab case.

`everyone-hates-a-redesign`

The `.md` file itself is named `index.md` (for Gatsby's page creation purposes).

See [Images](#images) for naming of image files.

**Kebab case is used for public filenames and folders only.** They are always lowercase as well.

I know, this sucks. It's best to stay consistent with lower_snake_case for everything, but the consensus in 2018 is still that [URLs are best parsed using the dash as a word separator](https://www.ecreativeim.com/blog/index.php/2011/03/30/seo-basics-hyphen-or-underscore-for-seo-urls/).

All posts are displayed from the root folder. See [Folder structure](#folder-structure) for the explanation: **never break links!**
