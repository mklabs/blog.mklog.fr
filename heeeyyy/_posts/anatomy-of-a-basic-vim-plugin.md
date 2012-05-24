<!--config
Title: Anotomy of a basic Vim plugin
Author: Mickael Daniel
Date: Thu May 24 2012 18:55:00 GMT+0100 (Paris, Madrid)
Categories: javascript
Tags: javascript, backbone
published: false
config-->

**Note**: *This post is the first one I decide to write in English. I
used to blog here in French, but I felt like it would be nicer to have
them in Engligh. I'll probably do both actually. English is definitely
not my mother-tongue language, so expect a lot of mistakes, typos (or
sentence that mean basically nothing). Pardon me for that.  But as I'm
doing a lot of mistakes in French anyway... So why not switching to
English, right?*

You might know that I lately discovered I could do custom Vim plugins. I
don't know why, I don't know how but I recently wanted to learn more
about further extending Vim, and how Vim plugins are made.

I don't even know yet or use some of the basic Vim motion commands, so
that might seem silly. I totally admit that. But...  This is so much
fun, and it can give you so much amount of power.

So, yeah, learning Vim scripts is painful... but very rewarding!

*(TextMate, SublimeText2 are also great text-editors, which can be
extended in very much the same way as vim, with very solid community).*

## Resources

There's not a lot of resources on how to write a vim plugin, but I
really enjoyed reading the following very thankful to find them:

- http://stevelosh.com/blog/2011/09/writing-vim-plugins/
Really well written guide and advices to Vim plugin authors.

- http://learnvimscriptthehardway.stevelosh.com/ From the same author
  (Thank you Sir!), a book written to help us to learn more about Vim
and how to customize it. If you're like me, head over to its [leanpub
page](http://leanpub.com/learnvimscriptthehardway), and manifest your
interest there.

- http://brainacle.com/how-to-write-vim-plugins-with-python.html
A good example of using external scripts to hold the bulk of a plugin
functionality. Vim scripts part could very well be limited to a simple
bridge to these scripts (even though Vim has built-in support for
languages like Python, Ruby and others. No JavaScript yet :( )

- Also all of Sir [@tpope](https://github.com/tpope) Vim repositories are
  absolute gems. Reading through these sources have been super helpful.

- There's also a five-parts series on Scripting the Vim editor at IBM
  developerworks:
  http://www.ibm.com/developerworks/linux/library/l-vim-script-1/index.html

## Experiments

So in the process of learning, I've made a lot of experiments, trying to
"learnvimscriptthehardway" (all of this is still very experimental):

- https://github.com/mklabs/node.snipmate
Not really a plugin, plus a cli tool to generate snippets automatically
from nodejs api. I don't know yet, but I might rename it and adds here a
bunch of node related utilities.

- https://github.com/mklabs/snipmate-css3-please
I wanted this for so long, and I'm not sure there's text-editor or ide
plugin for this. It simply defines a set of css3 snippet based on the
really neat http://css3please.com/ website (note to self: find a way to
keep snippets in sync)

- https://github.com/mklabs/vim-backbone
Very first attempt at bringing me support for writing backbone
applications. Needs far more work, simply defining snippets for views,
models/collections, routers and putting some ideas in a readme. There is
now some scafolding utilities

- https://github.com/mklabs/grunt.vim
A vim plugin with support for Grunt build tool. I learned a lot by
reading through the source of
[vim-rails](https://github.com/tpope/vim-rails/).

## Structure of a basic Vim plugin

> todo. :h runtimepath

- notes on autoload/
- notes on plugin/
- notes on doc/
- ...

## A very simple example

Let's actually write a plugin, shall we? Needless to say, it'll be a very
simple one but we'll try to make one that can actually be useful.

**The idea**: You're a JavaScript developer, and JavaScript developers
always prepend their JavaScript related searches on google by mdn or
mdc, right? In order to avoid all this w3schools noise.

As a JavaScript developer who uses Vim for its editing, you might very
well spend a lot of time in both your text editor and web browser, and
you're switching between both constantly. What about defining a simple
command that would:

- Take any number of arguments
- Open the default web browser
- And perform a search on google with `MDN` automatically prepended

All this from Vim and a single command. If you're using Mozilla
Developer Network's documentation daily (and I hope you do), you might
find this command useful.

> todo

### Variables & scope

`:h variables`

> todo

### User-defined functions

`:h new-user-defined`

> todo

### Commands

`:h command`

> todo
