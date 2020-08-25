import * as types from './types';
import sprites from './sprites';

export default function BaseObject(_super, play, ctx) {

  let { g } = ctx;

  let map = play.map;

  let p = this.p = {
    s: 0,
    si: 0,
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    ay: 0,
    w: 16,
    h: 16,
    collideable: true,
    cbox: [0, 0, 16, 16]
  };

  let remx = 0,
      remy = 0;


  this.init = (x, y) => {
    p.x = x;
    p.y = y;
  };

  const absCbox = this.absCbox = () => {
    let cbox = p.cbox;
    return [p.x + cbox[0],
            p.y + cbox[1],
            cbox[2], 
            cbox[3]];
  };

  const isSolid = this.isSolid = (x, y) => {
    let cbox = absCbox();
    return map.solidAt(cbox[0] + x,
                        cbox[1] + y,
                        cbox[2],
                        cbox[3]) ||
      play.checkObject(_super, types.FallBlock, x, y);
  };

  const moveX = amount => {
    let step = Math.sign(amount);
    for (let i = 0; i < Math.abs(amount); i++) {
      if (!isSolid(step, 0)) {
        p.x += step;
      } else {
        p.dx = 0;
        break;
      }
    }
  };

  const moveY = amount => {
    let step = Math.sign(amount);
    for (let i = 0; i < Math.abs(amount); i++) {
      if (!isSolid(0, step)) {
        p.y += step;
      } else {
        p.dy = 0;
        break;
      }
    }
  };

  this.update = () => {

    remx += p.dx;
    let amount = Math.floor(remx);
    remx -= amount;

    moveX(amount);

    remy += p.dy;
    amount = Math.floor(remy);
    remy -= amount;

    moveY(amount);
  };

  this.draw = () => {
    let s = sprites[p.s];
    g.sspr(s[0] + p.si * 8, s[1], 8, 8, p.x, p.y, p.w, p.h);
  };
  
}
