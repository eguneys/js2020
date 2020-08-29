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

    if (e.p.any) {
      play.beginIntro();
    }
  };

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

  };

}
