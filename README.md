# bootcamp-project02
Asteroid Miner

Cookie Clicker

Requirements

1) Localstorage
2) Built out a wireframe
3) style the cookie as an asteroid
4) added event listener to increment counter on click
5) updated the DOM


Stretch goals

1) Added css animation to button click
2) made research/upgrades available with different costs
3) added event listeners to each button to track purchasability
4) calculated stats for average click and average per second
5) added more styling
6) upgrades - research and research - shop items are interlinked along with multiplicative purchase costs


my main goal was to not hard code any of the buttons
everything works from the gameobject
which makes it very easy to add new items

However,

my main problem was i think i was too ambitious to begin with.
i ended up spending too long trying to build it in my head before putting fingers to keyboard.
i definately think my planning skills need a lot of work
as well as my overall code is awful as im sure you could condense alot of it down.

Useful Resources:

Moodle, W3, Google, Stackoverflow

my main bugs were with how flexbox and css grid interact
i ended up having to go div - grid - grid box - div(relative) - div(flex absolute)
otherwise the flexbox would just grow and push the grid outside screen even when set to 100vw 100vh

but then i had issue of if you turn on overflow-y scroll for flexbox you can't have overflow-x hidden (its in the spec)
which meant i couldnt have tooltips using ::after as they were display bound by their containing flex box
so had to resort to a fixed hidden div and just use js mouseover events

lastly when using array.findIndex((x)=> {x==?})==-1  it took me so long to realise if you write it on one line you can't use curly braces as its expecting a return you have to write it as array.findIndex((x)=> (x==?))==-1 or even just array.findIndex((x)=> x==?) ==-1
at least it was good coding practice !