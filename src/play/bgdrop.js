import * as mu from './mutilz';
import * as types from './types';

export default function BgDrop(play, ctx) {

  let { g, a } = ctx;

  let map = play.map;
  
  let x, y;

  let growdelay;
  let grow,
      fall,
      splash;

  let faccel;

  let si;
  let dsfx;

  this.base = {
    absCbox: () => {
      return [x, y + fall,
              16, 16];
    }
  };

  this.init = (_x, _y) => {
    x = _x;
    y = _y;
    growdelay = Math.random() * 120;
    splash = 0;
    fall = 0;
    grow = 0;
    faccel = 0;
    si = 0;
    dsfx = 1 + Math.floor(Math.random() * 2.9);
  };

  this.update = () => {

    if (growdelay > 0) {
      growdelay--;
      if (growdelay <= 0) {
        grow = 60;
      }
    }
    if (grow > 0) {
      si++;
      grow--;
      if (grow <= 0) {
        fall = 1;
        faccel = Math.random();
      }
    }

    if (fall > 0) {
      if (splash <= 0) {
        faccel += Math.random() * 0.2;
        fall += faccel;

        if (
          fall > 16 * 32 ||
          play.checkObject(this, types.Player, 0, 0) ||
          map.solidAt(x, y + fall, 16, 16)) {
          splash = 20;
          play.psfx(dsfx, x, y + fall);
        }
      }
    }

    if (splash > 0) {
      splash--;
      if (splash <= 0) {
        fall = 0;
        growdelay = Math.random() * 120;
      }
    }
  };

  this.draw = () => {

    g.sspr(64 + Math.floor(1.0 + Math.sin(si % 60 / 60 * Math.PI * 2) / 2) * 8, 56,
           8, 8, x, y, 16, 16);

    if (grow > 0) {
      let gt = Math.floor((1.0 - grow % 60 / 61) * 3);
      g.sspr(64 + gt * 8, 48, 8, 8, x, y - 2, 16, 16);
    }

    let st = Math.floor((0.99 - splash % 20 / 20) * 3);

    if (fall > 0) {
      g.sspr(80, 48, 8, 8, x, y + fall, 16 + (st - 2) * 8, 16 + (st - 2) * 8);
    }

    if (splash > 0) {
      g.sspr(88 + st * 8, 48, 8, 8, x - 8, y + fall, 16, 16);
      g.sspr(88 + st * 8, 48, 8, 8, x + 8, y + fall, 16, 16, true);

    }
  };

}
