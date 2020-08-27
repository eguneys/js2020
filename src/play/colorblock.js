import * as types from './types';
import BaseObject from './object';

export default function ColorBlock(play, ctx, s) {

  let { e, g } = ctx;

  let base = this.base = new BaseObject(this, play, ctx);
  let p = this.p = base.p;
  p.s = s;

  let pstate;
  let state;
  let delay;

  this.init = (x, y) => {
    state = 0;
    delay = s===38?0:60;
    base.init(x, y);
  };

  this.update = () => {
    base.update();

    delay++;

    let t = (delay % 120) / 120;

    state = t < 0.5 ? 0 : 1;

    if (state !== pstate) {
      if (state === 0) {
        p.collideable = false;
        p.si = 1;
      } else {
        if (!play.checkObject(this, types.Player, 0, 0)) {
          p.si = 0;
          p.collideable = true;
        }
      }
    }

    pstate = state;
  };

  this.draw = () => {
    base.draw();
  };

};
