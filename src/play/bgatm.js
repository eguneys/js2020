

export default function BgAtm(play, ctx) {

  let { g } = ctx;

  let particles = [];

  let offTimer = 0;
  let poff = 0;
  let off = 0;

  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      if (Math.random() < 0.4) {
        particles.push({
          i,j,
          s: Math.floor(Math.random() * 2 % 2)
        });
      }
    }
  }

  this.init = () => {
  };

  this.off = () => {
    offTimer = 30;
  };

  this.update = () => {

    if (offTimer > 0) {
      offTimer--;
      if (offTimer % 1 === 0) {
        poff = off;
      }
      off += 16 * 32 - (offTimer % 30 / 30) * 4;
    } else {
      if (Math.random() < 0.8) {
        poff = off;
      }
      off += 16 * 32 - 0.3;
    }
  };

  let sMap = {
    0: [0, 72],
    1: [16, 72]
  };

  this.draw = () => {

    particles.forEach(({s,i,j}) => {

      if (offTimer > 0) {
        g.sspr(sMap[s][0] + 32, sMap[s][1], 16, 16, i * 32, - 32 + (off + (off - poff) + j * 32) % (16 * 32), 32, 32);
      }

      g.sspr(sMap[s][0], sMap[s][1], 16, 16, i * 32, -32 + (off + j * 32) % (16 * 32), 32, 32);
    });
  };
  
}
