import * as mu from './mutilz';
import * as types from './types';
import BaseObject from './object';

export default function Collectible(play, ctx, s, n) {
  
  let { e, g, a } = ctx;

  let base = this.base = new BaseObject(this, play, ctx);
  let p = this.p = base.p;
  p.s = s;

  let basex;
  let basey;
  let timer;

  let followP;
  let cFlashTimer;

  let collected;

  this.collected = () => {
    collected = true;
  };

  this.init = (x, y) => {
    base.init(x, y);

    collected = false;

    cFlashTimer = 0;
    followP = null;
    timer = 0;
    basex = x;
    basey = y;

    this.info = [n, basex, basey];
  };

  this.update = () => {
    base.update();

    timer++;
 
    p.y = basey + Math.sin(timer % 60 / 60 * Math.PI * 2) * 4;


    if (!followP) {
      let hit = play.collideObject(this, types.Player, 0, 0);

      if (hit !== null) {
        followP = hit;
      }
    } else {
      p.x = mu.lerp(p.x, followP.p.x, 0.2);
      basey = mu.lerp(basey, followP.p.y - 16, 0.2);

      if (followP.canCollect()) {
        followP = null;
        cFlashTimer = 30;
        a.sfx(0);
      }
    }

    if (cFlashTimer > 0) {
      cFlashTimer--;
      if (cFlashTimer <= 0) {
        play.collect404(this);
      }
    }

    if (collected) {
      p.si = -1;
    } else if (cFlashTimer === 0 && timer % 60 < 30) {
      p.si = Math.floor(timer % 30 / 30 * 3);
    } else {
      p.si = 0;
    }
  };

  this.draw = () => {
    if (cFlashTimer === 0 || cFlashTimer % 10 < 5) {
        base.draw();
    }    
  };

}
