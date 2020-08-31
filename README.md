### A platformer for #js13k

![home screen](images/colerhome.gif)

Inspired by [Celeste PICO-8](https://www.lexaloffle.com/bbs/?tid=2145). Made in 10 days.

Play live at [JS13K entries]().

[Gameplay gif](https://twitter.com/eguneys/status/1299769426644959234?s=20).

Controls:

`Left Right` to move.
`Down` to look down.
`X` to jump.
`Enter` to see status codes.

There are 5 levels, and 12 collectibles.

There is wall jumping. And jump grace where you can still jump a few frames after you leave the ground, which you have to use to pass levels. Spikes have a smaller hit-box than they look.

A series of tutorials I wrote before this game:
    [How to make a 2D platformer](https://github.com/eguneys/celeste-jumping) (in PICO-8). Explains physics, collision detection, etc. I used in this game.


To run in development:

    yarn install
    yarn start
    // browse localhost:3000

### Made in

  Levels [OGMO Editor](https://ogmo-editor-3.github.io/).
  Sounds [Sound Box](https://sb.bitsnbites.eu/).
  Assets [Aseprite](https://www.aseprite.org/).
