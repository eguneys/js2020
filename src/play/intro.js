export default function Intro(play, ctx) {

  let { e, g } = ctx;

  let t = 0;

  this.update = () => {
    t++;
    if (e.p.x || e.p.c) {
      play.beginLevels();
    }
  };

  this.draw = () => {
    g.camera();

    g.fill('black');
    g.fr(0, 0, 320, 180);


    g.sspr(72, 32, 16, 9, 0, 0, 320, 180);


    let s = Math.sin(t % 120 / 120 * Math.PI * 2) * 8;

    g.sspr(104, 40, 8, 8, s + 104 + 0, 100, 16, 16);
    g.sspr(112, 40, 16, 8, s + 104 + 24, 100, 32, 16);
    g.sspr(88, 8, 32, 8, s + 104 + 64, 100, 64, 16);

    g.sspr(88, 32, 40, 8, 80, 32, 160, 32);

  };
  
}
