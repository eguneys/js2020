export default function Intro(play, ctx) {

  let { e, g } = ctx;

  this.update = () => {
    if (e.p.x || e.p.c) {
      play.beginLevels();
    }
  };

  this.draw = () => {
  };
  
}
