import * as types from './types';
import BaseObject from './object';

import {
  v0Jump,
  gJump
} from './phy';

export default function JumpBlock(play, ctx) {

  let { e, g } = ctx;

  let base = this.base = new BaseObject(this, play, ctx);
  let p = this.p = base.p;
  p.s = 24;

  let delay = 0;

  this.init = (x, y) => {
    base.init(x, y);
  };

  this.update = () => {
    base.update();

    if (delay > 0) {
      delay--;
      if (delay <= 0) {
        p.si = 0;
      }
    } else {

      let hit = play.collideObject(this, types.Player, 0, 0);

      if (hit !== null) {
        p.si = 2;
        hit.p.y = p.y - 4;
        hit.p.dx *= 0.2;
        hit.p.dy = -v0Jump * 1.2;
        hit.wasGrounded();
        delay = 10;
      }
    }
  };

  this.draw = () => {
    base.draw();
  };
}
