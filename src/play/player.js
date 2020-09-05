import * as types from './types';
import * as mu from './mutilz';
import BaseObject from './object';

import {
  v0Jump,
  gJump,
  hAccel,
  xFriction
} from './phy';

export default function Player(play, ctx) {

  let { e, g, a } = ctx;

  let cam = play.cam;

  let base = this.base = new BaseObject(this, play, ctx);
  let p = this.p = base.p;

  let pJump;
  let jBuffer;

  let jGrace;

  let wasGrounded;

  let isDead;

  let pdx,
      pdy;

  let landingTimer;

  let st = 0;
  let stOff = 0;

  const gFall = -gJump;
  
  let scalex,
      scaley;

  this.init = (x, y) => {
    base.init(x, y);

    isDead = false;

    scalex = 1;
    scaley = 1;

    landingTimer = 0;
    jGrace = 0;
    p.cbox = [2, 6, 10, 10];
  };

  this.canCollect = () => {
    return !isDead && wasGrounded;
  };

  this.wasGrounded = () => {
    wasGrounded = true;
  };

  const killPlayer = () => {
    isDead = true;
    play.killPlayer(this);
  };

  this.update = () => {

    base.update();

    if (p.y <= 16) {
      if (p.x > 512 - 16) {
        play.nextLevel(this);
        return;
      }
    }

    if (p.y >= 512 - 64) {
      if (p.x < 0) {
        play.prevLevel(this);
        return;
      }
    }

    p.x = mu.clamp(p.x, 0, 512 - 16);

    if (play.checkObject(this, types.Spike, 0, 0)) {
      killPlayer();
    }

    if (p.y >= 512) {
      killPlayer();
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

    let dieGround = base.isFlag(0, 1, 2);

    if (!wasGrounded && dieGround) {
      if (Math.abs(pdy) > v0Jump * 1.5 - 0.1) {
        killPlayer();
      }
    }

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
        scalex = 0.6;
        scaley = 1.4;
        a.sfx(5);
      } else {
        if (!isGrounded && wallDir !== 0) {
          p.dy = -v0Jump * 0.9;
          p.dx = -wallDir * hAccel * 8;
          jBuffer = 0;
          a.sfx(5);
        }
      }
    }

    scalex = mu.appr(scalex, 1, 0.03);
    scaley = mu.appr(scaley, 1, 0.03);

    p.w = 16 * scalex;
    p.h = 16 * scaley;

    let vSlideDrag = 0;
    if (inputX !== 0 && base.isSolid(inputX, 0)) {
      if (Math.sign(p.dy) > 0) {
        vSlideDrag = 1;
      }
    }

    p.dy += p.ay;
    p.dy += - p.dy * xFriction * 1.6 * vSlideDrag;


    if (landingTimer > 0) {
      landingTimer--;
    } else if (isGrounded && !wasGrounded) {
      landingTimer = 10;
    }


    if (Math.sign(pdx) != Math.sign(p.dx) ||
        wasGrounded !== isGrounded) {
      play.smoke(p.x, p.y + 8);
    }

    pdy = p.dy;
    pdx = p.dx;
    wasGrounded = isGrounded;

    cam.x = cam.x + (p.x - cam.x) * 0.1;
    cam.y = cam.y + (p.y - cam.y) * 0.1;

    p.flipx = p.dx < -1 ? true:
      p.dx > 1 ? false:
      p.flipx;

    if (landingTimer > 0) {
      st = 12;
      stOff = Math.floor((1.0 - landingTimer / 10) * 2);
    } else if (!isGrounded) {
      if (wallDir !== 0 && p.dy > 0) {
        st = 9;
        stOff = (stOff + 1/10)%3;
      } else {
        st = 6;
        stOff = (stOff + 1/5)%3;
      }
    } else if (Math.abs(p.dx) > 0.1) {
      st = 3;
      stOff = (stOff + 1/ 4) % 3;
    } else {
      st = 0;
      stOff = (stOff + 1/ 30) % 3;
    }


    p.si = Math.floor(st + stOff);
  };


  this.draw = () => {
    base.draw();
  };

}
