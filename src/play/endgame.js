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

  let spint = 0;
  let spina = 0;

  let t = 0;

  // seconds
  let maxTime = 1038,
      maxDie = 120;
  let maxCollects = 12;

  let time,
      die,
      iTime,
      iDie;

  let coinWait,
      coinSpin,
      fadeOut,
      thanks;
      

  this.init = (stats) => {
    t = 0;

    iTime = 0;
    iDie = 0;
    time = stats.time;
    die = stats.die;

    coinWait = 
      stats.colls.length === maxCollects ?
      60:0;

    coinSpin = 0;
    fadeOut = 0;
    thanks = 0;

    spina = 10;

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

    if (coinWait > 0) {
      coinWait--;
      if (coinWait <= 0) {
        coinSpin = 60;
      }
    }

    if (coinSpin > 0) {
      coinSpin--;

      if (coinSpin <= 0) {
        fadeOut = 20;
      }
    }

    if (fadeOut > 0) {
      fadeOut--;
      if (fadeOut <= 0) {
        thanks = 800;
      }
    }

    if (thanks > 0) {
      thanks--;
    }

    if (coinSpin > 0 || fadeOut > 0) {
      spint += spina;
      spina = mu.appr(spina, 1, 0.1);
    } else if (thanks > 0) {
      spint += spina;
      spina = mu.appr(spina, 0, 0.1);
      spint = mu.appr(spint, 0, 1);
    }

    if (e.p.enter || (e.p.any && t > 60)) {
      play.beginLevels();
    }
  };

  // https://stackoverflow.com/a/63690282/3994249
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

    if (fadeOut > 0 || thanks > 0) {
      for (let i = 0; i < 320 / 8; i++) {
        for (let j = 0; j < 180 / 8; j++) {
          let si = 
              Math.floor((1.0 - fadeOut / 60) * 2) * 8;
          g.sspr(48 + si, 40, 8, 8, 
                 i*8, j*8);
        }
      }
    }

    if (thanks > 0) {
      g.sspr(80, 24, 48, 8, 160 - 96, 128, 192, 32);
    }


    if (coinSpin > 0 || 
        fadeOut > 0 || 
        thanks > 0) {

      g.sspr(32 + 
             Math.floor((spint % 30 / 30) * 5) * 16, 
             96, 16, 16, 
             128, 58 + Math.sin(t % 48 / 48 * Math.PI * 2) * 4, 64, 64);

    }
  };

}
