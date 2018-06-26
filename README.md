# Code style guide

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

# Post style guide

## Frontmatter:

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

##Images

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

## Headings

The highest heading in a post is `##`. The next highest is `###` and so on.

## File naming

All posts and their related images are saved in a folder named with the title of the post in kebab case.

`everyone-hates-a-redesign`

The `.md` file itself is named `index.md` (for Gatsby's page creation purposes).

See [Images](##Images) for naming of image files.

**Kebab case is used for filenames and folders only.** They are always lowercase as well.

I know, this sucks. It's best to stay consistent with lower_snake_case for everything, but the consensus in 2018 is still that [URLs are best parsed using the dash as a word separator](https://www.ecreativeim.com/blog/index.php/2011/03/30/seo-basics-hyphen-or-underscore-for-seo-urls/).