export default function EndGame(play, ctx) {

  let { g, e } = ctx;

  let cursor = 0;

  let blink = false;
  let blinkTimer = 0;

  let off = [
    [3, 3],
    [4, 2],
    [0, 0],
    [0, 0],
    [-4, 4],
    [1, 5],
    [0, 0],
    [0, 0],
  ];

  this.update = () => {
    if (e.p.c) {
      cursor++;
      cursor %= off.length;
    }
    if (e.p.x) {
      play.resetLevels();
    }

    if (e.p.right) {
      off[cursor][0]++;
    } else if (e.p.left) {
      off[cursor][0]--;
    } else if (e.p.up) {
      off[cursor][1]--;
    } else if (e.p.down) {
      off[cursor][1]++;
    }

    blink = true;
    for (let [x,y] of off) {
      if (x !== 0) {
        blink = false;
        break;
      }
    }

      if (blinkTimer > 0) {
        blinkTimer--;
      } else {
        if (blink) {
          blinkTimer = 60;
        }
      }

    // off[cursor][0] = (off[cursor][0] + 10) % 10;
    // off[cursor][1] = (off[cursor][1] + 6) % 6;
  };

  this.draw = () => {

    if (blinkTimer > 30) {
      return;
    }

    g.sspr(112, 144, 16, 16, 
           off[0][0] * 32 + 0, off[0][1] * 32 + 0,
           32, 32);
    g.sspr(112 + 16, 144, 16, 16, 
           off[1][0] * 32 + 32, off[1][1] * 32 + 0, 
           32, 32);
    g.sspr(112 + 32, 144, 16, 16, 
           off[2][0] * 32 + 32 * 2, off[2][1] * 32 + 0, 
           32, 32);
    g.sspr(112 + 48, 144, 16, 16, 
           off[3][0] * 32 + 32 * 4, off[3][1] * 32 + 0, 
           32, 32);
    g.sspr(112 + 16, 144, 16, 16, 
           off[4][0] * 32 + 32 * 5, off[4][1] * 32 + 0, 
           32, 32);
    g.sspr(112 + 64, 144, 16, 16, 
           off[5][0] * 32 + 32 * 6, off[5][1] * 32 + 0, 
           32, 32);
    g.sspr(112, 144, 16, 16, 
           off[6][0] * 32 + 32 * 7, off[6][1] * 32 + 0, 
           32, 32);
    g.sspr(112 + 80, 144, 16, 16, 
           off[7][0] * 32 + 32 * 8, off[7][1] * 32 + 0, 
           32, 32);
  };

}
