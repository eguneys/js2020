import * as types from './types';
import BaseObject from './object';

export default function FallBlock(play, ctx) {

  let { e, g } = ctx;

  let base = this.base = new BaseObject(this, play, ctx);
  let p = this.p = base.p;
  p.s = 20;

  let state = 0,
      delay = 0;

  this.init = (x, y) => {
    base.init(x, y);
  };

  this.update = () => {
    base.update();


    if (state === 0) {
      if (play
          .checkObject(this, types.Player, 0, -1) ||
          play.checkObject(this, types.Player, -1, 0) ||
          play.checkObject(this, types.Player, 1, 0)) {
        state = 1;
        delay = 30;
      }
    } else if (state === 1) {
      delay--;
      if (delay <= 0) {
        state = 2;
        delay = 120;
        p.collideable = false;
      }
    } else if (state === 2) {
      delay--;
      if (delay <= 0 &&
          !play.checkObject(this, types.Player, 0, 0)) {
        state = 0;
        p.collideable = true;
      }
    }

    if (state === 0) {
      p.si = 0;
    } else if (state === 1) {
      p.si = Math.floor((1.0 - delay / 30) * 3);
    }
  };

  this.draw = () => {
    if (state !== 2) {
      base.draw();
    }
  };
  
}
