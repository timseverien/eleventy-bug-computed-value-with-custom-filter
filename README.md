# Eleventy computed value with custom filter bug

## Installation

Run `npm install`

## Reproducing The Bug

1. Run `npm run build`
2. Note that during the build, one of the `console.log` calls in `formatTag` reports a tag 
2. Note that `_site/tags/all.html` shows an empty string between the quotes
3. Note that `_site/tags-fix/all.html` does show the tag between the quotes

It appears the custom filter (`formatTag`) somehow breaks computed values:

- ✅ `title: Posts tagged “{{ tag }}”`
- ❎ `title: Posts tagged “{{ tag | formatTag }}”`

It gets weirder. It can be worked around by using built-in nunjucks or eleventy filters, or string concatenation:

- ✅ `title: Posts tagged “{{ tag | trim | formatTag }}”`
- ✅ `title: Posts tagged “{{ tag | slug | formatTag }}”`
- ✅ `title: Posts tagged “{{ ('' + tag) | formatTag }}”`

Order matters, however:

- ❎ `title: Posts tagged “{{ tag | formatTag | trim }}”`
- ❎ `title: Posts tagged “{{ tag | formatTag | slug }}”`
- ❎ `title: Posts tagged “{{ '' + (tag | formatTag) }}”`

All of the working solutions above prevents `formatTag` from being called with `undefined`.