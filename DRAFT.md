### QA

    How many tiles are on screen
    How many tiles are on a level

### Diary

    Day 0

      - Planning done

    Day 1
      - Placeholder done

    Day 2
      - Beginning Level done

    Day 3
      - Level, collision, fall floor, bounce floor, player
      - camera following player within world bounds
      - player wall jump needs work, haven't started on dash, animations

    Day 4
      - Challenge beginning level done
      - spike smoke shake die done
      - level transition WIP

    Day 5
      - Development Level design +

      - Previous level +
      - solid floor colors on level1 and 2 +
      - player
        - die on fall on level1+
        - animation
          - wall climb~
          - land+
      - color change floors+

    Day 6
      - collectible +
        - collect animation ?

    Day 7
      - spider -
      - background X
      - Decals+

    Day 8
        - Menu X
        - Intro +
        - Transition X
        - Endgame +
          - Collectibles +

    Day 9
        - guides+
        - Hud ?X
        - ending ?
        - spider
          - animation
            - move+
            - attack X
            - retreat X
          - Spider throwing web before attack X

    Day 10
       - atmosphere+
         - sfx+
       - level 4-5+

    Day 11
        - endgame all clear
          - sfx X
          - animation
        - hud
          - death
          - time

    Day 12
        - art refinement-
        - level refinement-
    

### TO DO


    8 guides
      right arrow
      "x" jump

    smoke smaller+

    camera shake bleeds tile on the edges X

    checkpoint X
    player bumping on the wall messes the animation +

    player
        animations
            - die?X
            - dash?X
            - wall climbX
            - land?+
        dash? x
        wall jump fix? x

        scale on jump+
        die on fall+
            blue floors safe
            red floors die on level1
    5   level
          end level+
          next level+
          previous level+

    
    
### Misc Ideas

    Moving background X

    Spider throwing web before attack ?

    Stats hud bar
        die
        time
        collectibles

    Decals+

    Extra Hard levels X

    Basic Sound Synthesis X

### Schedule

    20 days

    Misc planning 1 day
    Buffer 1 days
    Mechanics 6 days
    3     1 day
            level load+
            player+
            solid tiles+
            collision+
            empty space+
            fall floor+
            bounce floor+
    6     1 day
            balloon?
            spikes +
            colors switch floor+
    7     1 day
            checkpoint x
            one way floor x
            spider
            collectible
    10      1 day
            hud ?
            progress save+
    8     1 day
              menu X
              transition ?
              end game +
    14-13     1 day
            hud ?
        Level Design 5 days
    2       1 day
              Beginning
    4       1 day
              challenge beginning
    5       1 day
              development
    9       1 day
              challenge development
            1 day
              cooldown X
        Art 4 days
    1     1 day
            Placeholder art
            Hud
    11    1 day
            Collectibles 
            Tileset
            Player
    12    1 day
            Background
            Hud
            Logo
    16    1 day
            Refine animation
            Refine levels
        Intro End Menu  3 days
    14      1 day
                Menu
    15      1 day
                End
    17      1 day
                Intro

## Exploration Platformer

### Scenes, Menu

    Intro
        Background
        Logo
        Play -> Play
        Reset
        Codes
    Play
        Board -> Intro
        Bar Hud
        Collectibles -> End Game
    End Game
        Dark Background
        Thanks -> Intro
    Transition
        Background
    
### Art

    player 3 frames
        - idle
        - move
        - jump
        - fall
        - dash
        - wall-jump X
        - corpse
    empty space
        - empty
        - decoration 1
        - decoration 2
        - decoration 3
    solid floor
        - solid corner grid 1
        - solid corner grid 2
    fall floor
        - breaking 3 frames
    bounce floor
        - bounce 3 frames
    one way floor
        - up
        - down
    colors switch floor
        - color a on
        - color a off
        - color b on
        - color b off
    spikes
        - spike 1
        - spike 2
    spider
        - move 3 frames
        - attack 3 frames
        - withdraw 3 frames
    fx
        - die splash 3 frames
        - move dust 3 frames
        - dash dust 3 frames
    checkpoint
        - wave 3 frames
        - saved 3 frames
    balloon
        - idle 3 frames
    collectible
        - 0 2 3 4 5 - empty
        - 0 2 3 4 5 - full 3 frames
    hud
        - Bar
          - empty
          - half
          - full
        - Play
        - Reset
        - Codes
        - Thanks
        - Intro background
        - Endgame Dark background X 
        - Transition background 3 frames
        - Logo

### Mechanics

    player -> move jump jump-grace fall dash wall-jump
    empty space -> fall excessive die
    solid floor -> land stop, land fast die
    fall floor -> land delay empty
    bounce floor -> land jump boost
    one way floor -> allow one direction vertical only move
    colors switch floor -> colors swap on delay
    spikes -> collide die
    spider -> follow player from ceiling attack collide die
    checkpoint -> save world re-spawn on die
        -> area name
    balloon -> replenish dash
    fruit -> collectible, on collide follow player, on land collect

    draft idea

    moving-platform -> 
    wall climb ->

    areas

    beginning
        player
        empty space
        solid floor
        bounce floor
        fruit

    challenge beginning
        spikes
        balloon

    development
        one way floor?
        spider
        colors switch floor

    challenge development


    no font
      collectible bar
      height bar
      death bar
    bar
      progress between 0-1
      0 ---
      0.5 +~-
      1   +++

### Theme Mechanics

    collectibles are the digits of status codes
        collect them all to complete 404
        200
        300
        500
        404

### Theme Idea

     client-browser --request--> server-website --> response

     web cache
     authentication
     session

     request methods -> get,head,post,put
     response -> 200 OK,404 Not Found,500 Server Error,300 Redirect

     latency

