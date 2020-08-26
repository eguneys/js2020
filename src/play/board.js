import * as mu from './mutilz';
import Map from './map';
import * as types from './types';
import Pool from 'poolf';

let pxTileSize = 16;
let nbTiles = 32;
let pxWorldSize = pxTileSize * nbTiles;
let pxScreenSizeX = 320;
let pxScreenSizeY = 180;
let nbTilesInScreenX = pxScreenSizeX / pxTileSize;
let nbTilesInScreenY = pxScreenSizeY / pxTileSize;

export default function Board(play, ctx) {

  let objects = [];

  let pPlayer = new Pool(() =>{
    return new types.Player(this, ctx);
  });

  let pFallBlock = new Pool(() => {
    return new types.FallBlock(this, ctx);
  });

  let pJumpBlock = new Pool(() => {
    return new types.JumpBlock(this, ctx);
  });

  let pSpike = new Pool(() => {
    return new types.Spike(this, ctx);
  });

  let pSplash = this.pSplash = new Pool(() => {
    return new types.Splash(this, ctx);
  });

  const poolMap = {
    0: pPlayer,
    20: pFallBlock,
    24: pJumpBlock,
    40: pSpike
  };

  let cam = this.cam = {
    x: 0,
    y: 0,
    shake: 0,
    shakex: 0,
    shakey: 0
  };

  function initObject(pool, x, y, arg) {
    let res = pool.acquire(_ => 
      _.init(x, y, arg));

    res._pool = pool;

    objects.push(res);
    return res;
  }

  function destroyObject(obj) {
    obj._pool.release(obj);
    objects.splice(objects.indexOf(obj), 1);
  };

  function checkObject(obj, type, x, y) {
    return collideObject(obj, type, x, y) !== null;
  }

  function collideObject(obj, type, x, y) {
    let cbox = obj.base.absCbox();
    cbox[0] += x;
    cbox[1] += y;

    for (let other of objects) {
      if (other !== null && 
          other instanceof type &&
          other !== obj &&
          other.p.collideable) {
        
        let cbox2 = other.base.absCbox();

        if (mu.boxIntersects(cbox, cbox2)) {
          return other;
        }
      }
    }
    return null;
  }

  function smoke(x, y) {
    initObject(pSplash, x, y, 1);
  }

  function shake() {
    cam.shake = 10;
  }

  function nextLevel(player) {
    destroyObject(player);
    play.nextLevel();
  }

  this.nextLevel = nextLevel;
  this.shake = shake;
  this.smoke = smoke;
  this.checkObject = checkObject;
  this.collideObject = collideObject;
  this.initObject = initObject;
  this.destroyObject = destroyObject;

  let { g, e } = ctx;

  let map = this.map = new Map(g);

  let initDelay = 0;

  this.init = (level = map.level()) => {

    map.level(level);

    initDelay = 0;

    for (let obj of objects) {
      obj._pool.release(obj);
    }
    
    objects = [];

    for (let i = 0; i < 32; i++) {
      for (let j = 0; j < 32; j++) {
        let s = map.mget(i, j);

        if (poolMap[s]) {
          initObject(poolMap[s], i * 16, j * 16);
        }        
      }
    }
  };

  this.killPlayer = p => {
    for (let i = 0; i < 4; i++) {
      initObject(pSplash, p.p.x, p.p.y);
    }
    destroyObject(p);
    initDelay = 30;
    shake();
  };
  
  this.update = () => {

    if (initDelay > 0) {
      --initDelay;
      if (initDelay <= 0) {
        this.init();
      }
    }

    if (cam.shake > 0) {
      cam.shake--;

      cam.shakex = mu.appr(cam.shakex, 4 - Math.random() * 8, 1 + Math.random() * 4);
      cam.shakey = mu.appr(cam.shakey, 4 - Math.random() * 8, 1 + Math.random() * 4);

    }

    for (let obj of objects) {
      obj.update();
    }
  };


  this.draw = () => {

    let camx = mu.clamp(cam.x - 160, 
                        0,
                        pxWorldSize - pxScreenSizeX),
        camy = mu.clamp(cam.y - 90,
                        0,
                        pxWorldSize - pxScreenSizeY);

    g.camera(camx + cam.shakex, camy + cam.shakey);

    map.draw(Math.floor(camx / 16),
             Math.floor(camy / 16),
             nbTilesInScreenX + 1, 
             nbTilesInScreenY + 1);

    for (let obj of objects) {
      obj.draw();
    }
  };
}
