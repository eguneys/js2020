import * as types from './types';
import BaseObject from './object';

export default function FallBlock(play, ctx) {

  let { e, g } = ctx;

  let base = this.base = new BaseObject(this, play, ctx);
  let p = this.p = base.p;
  p.s = 64;

  let dirX;

  this.init = (x, y) => {
    base.init(x, y);
    dirX = -1;
    p.dx = -1;
  };

  this.update = () => {
    base.update();

    if (p.dx < 0 && 
        !base.isSolid(-16, -1)) {
      p.dx *= -1;
    } else if (!base.isSolid(16, -1)) {
      p.dx *= -1;
    }

  };

  this.draw = () => {
    base.draw();
  };

  
};
