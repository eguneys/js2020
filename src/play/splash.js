import * as mu from './mutilz';
import BaseObject from './object';

export default function Splash(play, ctx) {
  let { e, g } = ctx;

  let base = this.base = new BaseObject(this, play, ctx);
  let p = this.p = base.p;
  p.s = 13;

  let l = 0;

  this.init = (x, y, s) => {
    base.init(x, y);

    l = 30;
    p.dx = 0.5 - Math.random();
    p.dy = 0.5 - Math.random();
    p.s = s?14:13;
  };

  this.update = () => {
    if (l > 0) {
      l--;
      if (l <= 0) {
        play.destroyObject(this);
      }
    }
    base.update();

    //p.dy = mu.appr(p.dy, 0, 1.0 - l / 60);
    //p.dx = mu.appr(p.dx, 0, 1.0 - l / 60);
    p.si = Math.floor((1.0 - l / 31) * 3);
  };

  this.draw = () => {
    base.draw();
  };
  
}
