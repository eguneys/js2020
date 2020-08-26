export default function Intro(play, ctx) {

  let { e, g } = ctx;

  let s = 0;

  this.update = () => {
    if (e.p.x || e.p.c) {
      play.beginLevels();
    }
    s++;
  };

  this.draw = () => {

    let ss = Math.sin((s % 60) / 60 * Math.PI * 2) * 16;
    g.sspr(96, 64, 42, 48, ss + 64, 16);
    g.sspr(144, 64, 56, 48, ss + 64 + 48, 16);
    g.sspr(96, 64, 42, 48, ss + 64 + 56 + 48 , 16);

    ss = Math.sin((s - 5 % 60) / 60 * Math.PI * 2) * 16;
    g.sspr(96, 64, 42, 48, ss + 64, 16);
    g.sspr(144, 64, 56, 48, ss + 64 + 48, 16);
    g.sspr(96, 64, 42, 48, ss + 64 + 56 + 48 , 16);


    ss = Math.sin((s - 10 % 60) / 60 * Math.PI * 2) * 16;
    g.sspr(96, 64, 42, 48, ss + 64, 16);
    g.sspr(144, 64, 56, 48, ss + 64 + 48, 16);
    g.sspr(96, 64, 42, 48, ss + 64 + 56 + 48 , 16);



    g.print("C - next block", 160, 90);
    g.print("X - previous block", 160, 90 + 16);
    g.print("Arrows - move block", 160, 90 + 16 * 2);
    g.print("Enter - restart level", 160, 90 + 16 * 3);
    g.print("Press X to start", 160, 90 + 16 * 4);
  };
  
}
