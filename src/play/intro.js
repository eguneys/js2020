export default function Intro(play, ctx) {

  let { e, g } = ctx;

  this.update = () => {
    if (e.p.x || e.p.c) {
      play.beginLevels();
    }
  };

  this.draw = () => {
    g.print("C - next block", 160, 90);
    g.print("X - previous block", 160, 90 + 16);
    g.print("Arrows - move block", 160, 90 + 16 * 2);
    g.print("Enter - restart level", 160, 90 + 16 * 3);
    g.print("Press X to start", 160, 90 + 16 * 4);
  };
  
}
