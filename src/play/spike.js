import BaseObject from './object';

export default function Spike(play, ctx) {
  let { e, g } = ctx;

  let base = this.base = new BaseObject(this, play, ctx);
  let p = this.p = base.p;
  p.s = 40;

  p.sj = Math.random()<0.3?1:0;

  let delay = 0;

  this.init = (x, y) => {
    p.cbox = [2, 2, 10, 10];
    base.init(x, y);
  };

  this.update = () => {
    base.update();
  };

  this.draw = () => {
    base.draw();
  };
  
}
