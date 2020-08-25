import * as mu from './mutilz';
import BaseObject from './object';

import {
  v0Jump,
  gJump,
  hAccel,
  xFriction
} from './phy';

export default function Player(play, ctx) {

  let { e, g } = ctx;

  let cam = play.cam;

  let base = this.base = new BaseObject(this, play, ctx);
  let p = this.p = base.p;

  let pJump;
  let jBuffer;

  let jGrace;

  let st = 0;

  const gFall = -gJump;
  
  
  
  this.init = (x, y) => {
    base.init(x, y);

    jGrace = 0;
    p.cbox = [2, 6, 10, 10];
  };

  this.update = () => {

    base.update();

    p.x = mu.clamp(p.x, 0, 512 - 16);

    if (p.y >= 512) {
      play.killPlayer(this);
      return;
    }

    let inputY = 0,
        inputX = 0,
        inputJ = 0;

    if (e.up) {
      inputY = -1;
    } else if (e.down) {
      inputY = 1;
    }
    if (e.left) {
      inputX = -1;
    } else if (e.right) {
      inputX = 1;
    }

    if (e.x) {
      inputJ = true && !pJump;
    }
    pJump = e.x;

    if (inputJ) {
      jBuffer = 8;
    } else if (jBuffer > 0) {
      jBuffer--;
    }

    let _hAccel = inputX * hAccel;
    p.dx += _hAccel;
    p.dx += - p.dx * xFriction;

    let wallDir = 0;

    if (base.isSolid(-3, 0)) {
      wallDir = -1;
    } else if (base.isSolid(3, 0)) {
      wallDir = 1;
    }

    let isGrounded = base.isSolid(0, 1);

    if (!isGrounded) {
      p.ay = gFall;
    }

    if (isGrounded) {
      jGrace = 12;
    } else if (jGrace > 0) {
      jGrace--;
    }

    if (jBuffer > 0) {
      if (jGrace > 0) {
        p.ay = -gJump;
        p.dy = -v0Jump;
        jGrace = 0;
        jBuffer = 0;
      } else {
        if (!isGrounded && wallDir !== 0) {
          p.dy = -v0Jump * 0.8;
          p.dx = -wallDir * hAccel * 4;
          jBuffer = 0;
        }
      }
    }

    p.dy += p.ay;

    cam.x = cam.x + (p.x - cam.x) * 0.1;
    cam.y = cam.y + (p.y - cam.y) * 0.1;

    st = (st + 1/30)%3;
    p.si = Math.floor(st);
  };


  this.draw = () => {
    base.draw();
  };

}
