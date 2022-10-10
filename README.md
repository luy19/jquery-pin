## JQueryPin

Ever wanted to **pin** something to the side of a text? Ever needed a subtle sticky element to quietly hang around as you scroll down?

**JqueryPin** is here to help! Pin any element to the top of a container. Easily **disable** it for smaller screen-sizes where there's no room for that kind of shenanigans.

## Usage

Include jquery and jquery pin at the bottom of your html. Then pin any element you want like this:

    $(".pinned").pin()

To make a pinned element stay within an outer container, use the containerSelector option:

    $(".pinned").pin({containerSelector: ".container"})

Padding can also be added around the pinned element while scrolling:

    $(".pinned").pin({padding: {top: 10, bottom: 10}})

That's it - go pin all the things!

## Examples

Plenty of examples [Here](http://luy19.github.com/jquery-pin/).
