import * as mu from './mutilz';

export default function EndGame(play, ctx) {

  let { g, e } = ctx;

  let cmap = {
    2: [0, 64],
    3: [0, 56],
    4: [32, 56],
    5: [32, 48],
    0: [0, 48]
  };

  let collects = [
    2, 0, 0,
    3, 0, 0,
    5, 0, 0,
    4, 0, 4,
  ];

  let progress = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ];

  let t = 0;

  // seconds
  let maxTime = 447,
      maxDie = 53;

  let time,
      die,
      iTime,
      iDie;

  this.init = (stats) => {
    iTime = 0;
    iDie = 0;
    time = stats.time;
    die = stats.die;

    console.log(`Time: ${Math.floor(time)}, Die: ${die}`);
  };

  this.collect = (number) => {
    for (let i = 0; i < collects.length; i++) {
      let c = collects[i];
      let p = progress[i];

      if (!p && c === number) {
        progress[i] = 1;
        break;
      }
    }
  };

  this.update = () => {
    t++;

    iTime = mu.appr(iTime, time, time / 90);
    iDie = mu.appr(iDie, die, die / 90);

    if (e.p.any) {
      play.beginLevels();
    }
  };

  function barT(t) {
    function allocate(t, min) {
      return t <= min ? 0 : 
        0.3 <= t - min ? 1 :
        (t - min) / 0.3;
    }

    return [allocate(t, 0.0),
            allocate(t, 0.33),
            allocate(t, 0.66)];
  }

  this.draw = () => {

    g.camera();

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        let n = collects[i * 3 + j];
        let s = cmap[n];
        let p = progress[i * 3 + j];

        if (!p) {
          g.sspr(s[0], s[1], 8, 8, 
                 112 + j * 32 + 2 * j,
                 16 + i * 32 + 4 * i, 32, 32);
        } else {
          
          let si = 0;
          if (t % 120 < 30) {
            si = Math.floor((t % 30 / 30) * 3);
          }
          g.sspr(s[0] + 8 + si * 8, s[1], 8, 8, 
                 112 + j * 32 + 2 * j,
                 16 + i * 32 + 4 * i, 32, 32);
        }
      }
    }

    g.sspr(0, 88, 8, 8, 40, 24 + 96 + 8, 32, 32);

    let bt = barT(iDie / maxDie);
    bt = bt.map(_ => Math.floor(_ * 3) * 8);

    g.sspr(bt[0], 8, 8, 8, 40, 24 + 64, 32, 32);
    g.sspr(bt[1], 8, 8, 8, 40, 24 + 32, 32, 32);
    g.sspr(bt[2], 8, 8, 8, 40, 24 + 0, 32, 32);

    let bO = (iDie / maxDie > 0.9)?24:0;

    g.sspr(bO + 16, 88, 8, 8, 40, 24 + 0, 32, 32);
    g.sspr(bO + 24, 88, 8, 8, 40, 24 + 32, 32, 32);
    g.sspr(bO + 32, 88, 8, 8, 40, 24 + 64, 32, 32);


    g.sspr(8, 88, 8, 8, 240, 24 + 96 + 8, 32, 32);

    bt = barT(iTime / maxTime);
    bt = bt.map(_ => Math.floor(_ * 3) * 8);

    bO = (iTime / maxTime > 0.9)?24:0;

    g.sspr(bt[0], 8, 8, 8, 240, 24 + 64, 32, 32);
    g.sspr(bt[1], 8, 8, 8, 240, 24 + 32, 32, 32);
    g.sspr(bt[2], 8, 8, 8, 240, 24 + 0, 32, 32);


    g.sspr(bO + 16, 88, 8, 8, 240, 24 + 0, 32, 32);
    g.sspr(bO + 24, 88, 8, 8, 240, 24 + 32, 32, 32);
    g.sspr(bO + 32, 88, 8, 8, 240, 24 + 64, 32, 32);

  };

}
