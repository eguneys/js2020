export default function Transition(play, ctx) {

  let { g } = ctx;
  
  const onTransition = () => {
    this.onTransition();
  };

  let timer = 0;
  let x = 0,
      w = 0;

  this.off = () => {
    return timer === 0;
  };

  this.init = () => {
    timer = 20;
    x = 0;
    w = 0;
  };

  this.update = () => {

    if (timer > 0) {
      timer--;
      if (timer === 10) {
        onTransition();
      }
    }

    if (timer > 10) {
      w += 320 * (1 / 10);      
    } else if (timer < 20) {
      x += 320 * (1 / 10);      
    }

  };

  this.draw = () => {
    g.fill('#fff1e8');
    g.fr(x, 0, w, 180);
    g.clearfont(x, 0, w, 180);
  };
  
}
