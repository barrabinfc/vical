+++
draft = false
Title = "Styleguide"
subtitle = "CSS Styleguide"
parent = "blog"
colorscheme = "light"

+++


This document shows Markdown formatting and style rules.

Lets start a paragraph, with *Italic*, **bold**, and `monospace`. And let's see vertical rhythm with lorem ipsum.
<!--more-->

# Lorem ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lacinia nibh eu congue ullamcorper. Vestibulum vitae augue pharetra justo fringilla dignissim. Integer gravida, lacus vel molestie fermentum, turpis massa commodo dui, faucibus efficitur nisl nisl nec augue. Nunc pellentesque fringilla lacus, sed laoreet justo egestas quis. Nullam lobortis augue ac neque feugiat, sed sodales elit rutrum. Vestibulum sed metus finibus, accumsan arcu eget, ultricies tortor. Duis ullamcorper lectus sed odio commodo malesuada. Curabitur ex tellus, mollis sed nisl eget, porta semper turpis. Nulla a nibh non purus placerat faucibus et ut sem. Duis id lacus augue. Vestibulum mi tellus, vestibulum ut massa vitae, facilisis pellentesque tortor. Etiam quis nisi laoreet, rhoncus tortor consequat, interdum ligula. Nulla sodales sapien eu tortor consequat sollicitudin. Donec pulvinar egestas ante, vel pulvinar enim euismod in. Sed consequat nulla quis dui porttitor ullamcorper. Donec dictum commodo pellentesque.

Cras pharetra urna nec est interdum, vitae aliquam odio egestas. Aliquam sollicitudin est et augue pellentesque, id fringilla metus ultricies. Etiam gravida euismod augue quis mattis. Vivamus ac tristique enim. Proin euismod risus ipsum, eu gravida nunc auctor nec. Nam pretium sollicitudin quam, et convallis tellus sodales vel. Fusce maximus vitae sapien quis fermentum. Pellentesque sed ultricies lorem, quis pretium sem. Donec eget massa mattis, hendrerit enim quis, fringilla tellus. Quisque lobortis maximus sapien eget ultrices. Integer aliquet ex quis dui rhoncus semper. Nam vitae diam bibendum, euismod enim sed, commodo justo. Sed nibh lacus, rhoncus eget imperdiet sit amet, sollicitudin ac nisi. Suspendisse ut nulla justo.

> **Block quotes are
> written like so.**
>
> They can span multiple paragraphs,
> if you like.
>
> And may contain <div class="bg:primary txt:hero align:center">HTML Markup</div>


Fusce congue mollis sem, quis tempus augue lacinia tincidunt. Integer vulputate, quam eu scelerisque aliquam, velit neque lobortis massa, at viverra metus tortor eu purus. In fringilla, felis interdum tristique dictum, lorem elit fermentum erat, id pellentesque velit ligula in velit. Sed eu neque rutrum, pretium nunc id, feugiat elit. Donec eget dui nec massa efficitur cursus eget eget purus. Proin ac nisl pretium, interdum nisi ac, placerat erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed egestas nec neque ac imperdiet. Integer vitae nunc sit amet urna gravida accumsan. Quisque ut libero nec arcu sodales sagittis ac facilisis orci. Proin venenatis quis diam eget malesuada. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec pretium mi eu pulvinar aliquam. Donec ac sem sed tortor dictum tempor. Suspendisse consequat eleifend tellus a blandit. Quisque et vestibulum nisi, eget pharetra sapien.

Donec non ex orci. Suspendisse purus felis, laoreet ac interdum eget, ultrices iaculis sem. Vestibulum sapien augue, tempus non magna quis, vehicula vehicula ipsum. Cras sit amet tortor interdum, convallis dui vel, dignissim ante. Nunc eget rutrum sapien, sed scelerisque lacus. Nam aliquam eros malesuada erat interdum ultricies. Integer euismod ipsum elit, id condimentum urna eleifend eget. Nulla imperdiet fringilla massa, id porttitor tellus egestas ac.

An h2 header
------------

Images can be specified like so:

![alt text](https://images.unsplash.com/photo-1532680678473-a16f2cda8e43?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c35c44795a15fb33ba90a783355c2fc6&auto=format&fit=crop&w=1500&q=80 "Logo Title Text 1")

And here's a numbered list:

 1. first item
 2. second item
 3. third item

Note again how the actual text starts at 4 columns in (4 characters
from the left side). Here's a code sample:

    # Let me re-iterate ...
    for i in 1 .. 10 { do-something(i) }

As you probably guessed, indented 4 spaces. By the way, instead of
indenting the block, you can use delimited blocks, if you like:

~~~
define foobar() {
    print "Welcome to flavor country!";
}
~~~

(which makes copying & pasting easier). You can optionally mark the
delimited block for Pandoc to syntax highlight it:

~~~python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
~~~

### An h3 header ###

Now a nested list:

 1. First, get these ingredients:

      * carrots
      * celery
      * lentils

 2. Boil some water.

 3. Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.
 4. Please say yes

## Todo Input

- [ ] a task list item
- [ ] list syntax required
- [ ] incomplete
- [x] completed

Here's a link to [a website](http://foo.bar), to a [local
doc](local-doc.html), and to a [section heading in the current
doc](#an-h2-header). 
Here's a footnote [^1].

[^1]: Footnote text goes here.

Tables can look like this:

<div class="align:center txt:hero">Table: Shoes, their sizes, and what they're made of</div>

---

size | material | color
--- |--- | ---
9   |  leather     |   brown
10  |  hemp canvas |   natural
11  | glass        |   transparent

Here's a definition list:

apples
: Good for making applesauce.

oranges
: Citrus!

tomatoes
: There's no "e" in tomatoe.

Again, text is indented 4 spaces. (Put a blank line between each
term/definition pair to spread things out more.)
