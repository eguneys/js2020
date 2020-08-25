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

  let objects;

  let pPlayer = new Pool(() =>{
    return new types.Player(this, ctx);
  });

  let pFallBlock = new Pool(() => {
    return new types.FallBlock(this, ctx);
  });

  let pJumpBlock = new Pool(() => {
    return new types.JumpBlock(this, ctx);
  });

  const poolMap = {
    0: pPlayer,
    20: pFallBlock,
    24: pJumpBlock,
  };

  function initObject(pool, x, y) {
    let res = pool.acquire(_ => 
      _.init(x * 16, y * 16));

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

  this.checkObject = checkObject;
  this.collideObject = collideObject;
  this.initObject = initObject;
  this.destroyObject = destroyObject;

  let { g, e } = ctx;

  let map = this.map = new Map(g);

  let cam = this.cam = {
    x: 0,
    y: 0
  };

  let initDelay = 0;

  this.init = () => {
    initDelay = 0;
    objects = [];

    for (let i = 0; i < 32; i++) {
      for (let j = 0; j < 32; j++) {
        let s = map.mget(0, i, j);

        if (poolMap[s]) {
          initObject(poolMap[s], i, j);
        }        
      }
    }
  };

  this.killPlayer = p => {
    destroyObject(p);
    initDelay = 30;
  };
  
  this.update = () => {

    if (initDelay > 0) {
      --initDelay;
      if (initDelay <= 0) {
        this.init();
      }
    }

    for (let obj of objects) {
      obj.update();
    }
  };


  this.draw = () => {

    let camx = mu.clamp(cam.x - 160, 0, pxWorldSize - pxScreenSizeX),
        camy = mu.clamp(cam.y - 90, 0, pxWorldSize - pxScreenSizeY);

    g.camera(camx, camy);

    map.draw(Math.floor(camx / 16),
             Math.floor(camy / 16),
             nbTilesInScreenX + 1, 
             nbTilesInScreenY + 1);

    for (let obj of objects) {
      obj.draw();
    }
  };
}
