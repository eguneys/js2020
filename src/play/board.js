import * as mu from './mutilz';
import Map from './map';
import * as types from './types';
import Pool from './pool';
import { decals as decalMap } from './sprites';
import BgAtm from './bgatm';

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

  let pBlueColorBlock = new Pool(() => {
    return new types.ColorBlock(this, ctx, 38);
  });

  let pRedColorBlock = new Pool(() => {
    return new types.ColorBlock(this, ctx, 54);
  });

  let pCollect2 = new Pool(() => {
    return new types.Collectible(this, ctx, 130, 2);
  });

  let pCollect3 = new Pool(() => {
    return new types.Collectible(this, ctx, 113, 3);
  });

  let pCollect4 = new Pool(() => {
    return new types.Collectible(this, ctx, 117, 4);
  });

  let pCollect5 = new Pool(() => {
    return new types.Collectible(this, ctx, 101, 5);
  });

  let pCollect0 = new Pool(() => {
    return new types.Collectible(this, ctx, 97, 0);
  });

  let pSpider = new Pool(() => {
    return new types.Spider(this, ctx);
  });

  let pBgDrop = new Pool(() => {
    return new types.BgDrop(this, ctx);
  });

  const poolMap = {
    0: pPlayer,
    20: pFallBlock,
    24: pJumpBlock,
    40: pSpike,
    38: pBlueColorBlock,
    54: pRedColorBlock,
    97: pCollect0,
    101: pCollect5,
    113: pCollect3,
    117: pCollect4,
    130: pCollect2,
    64: pSpider
  };

  let t = 0;

  let cam = this.cam = {
    x: 0,
    y: 0,
    shake: 0,
    shakex: 0,
    shakey: 0
  };

  let bgatm = new BgAtm(this, ctx);

  let decals = [];

  function initCamera() {
    cam.shake = 0;
    cam.shakex = 0;
    cam.shakey = 0;
  }

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

  function prevLevel(player) {
    destroyObject(player);
    play.prevLevel();
  }

  function collect404(collectible) {
    destroyObject(collectible);
    play.collect(collectible.info);
  }

  function initDecal(decal, x, y) {
    decals.push({
      decal, x, y
    });
  }

  this.collect404 = collect404;
  this.prevLevel = prevLevel;
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

    bgatm.init();

    initCamera();

    for (let obj of objects) {
      obj._pool.release(obj);
    }
    
    objects = [];

    decals = [];

    for (let i = 0; i < 32; i++) {
      for (let j = 0; j < 32; j++) {
        let s = map.mget(i, j);

        if (poolMap[s]) {
          let co = initObject(poolMap[s], i * 16, j * 16);

          if (co.info && !play.scollect(co.info)) {
            destroyObject(co);
          }
        } else if (decalMap[s]) {
          initDecal(decalMap[s], i * 16, j * 16);
        }

        if (j < 30 && Math.random() < 0.3) {
          
          let sd = map.mget(i, j + 1, 1);
          if ((s === 33 || s === 36 || s === 49 || s === 52) && sd === -1) {
            initObject(pBgDrop, i * 16, (j + 1) * 16); 
          }
        }
      }
    }
  };

  this.killPlayer = p => {
    for (let i = 0; i < 4; i++) {
      initObject(pSplash, p.p.x, p.p.y);
    }

    bgatm.off();
    destroyObject(p);
    initDelay = 30;
    shake();
  };
  
  this.update = () => {

    t++;

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

    bgatm.update();
  };


  this.draw = () => {

    let camx = mu.clamp(cam.x - 160, 
                        0,
                        pxWorldSize - pxScreenSizeX),
        camy = mu.clamp(cam.y - 90,
                        0,
                        pxWorldSize - pxScreenSizeY);
    g.camera(camx * 0.4 + cam.shakex, camy * 0.4 + cam.shakey);

    bgatm.draw();

    g.camera(camx + cam.shakex, camy + cam.shakey);

    decals.forEach(({ decal, x, y }) => {
      g.sspr(decal[0], decal[1], 32, 32, x, y, 64, 64);
    });

    map.draw(Math.floor(camx / 16),
             Math.floor(camy / 16),
             nbTilesInScreenX + 1, 
             nbTilesInScreenY + 1);

    g.sspr(120, 0, 8, 8, 
           Math.sin(t % 60 / 60 * Math.PI * 2) * 4 +
           pxWorldSize - 24, 12, 
           16, 16);

    g.sspr(120, 0, 8, 8,
           Math.sin(t % 60 / 60 * Math.PI * 2) * 4 +
           8, pxWorldSize - 48, 16, 16, true);

    for (let obj of objects) {
      obj.draw();
    }
  };
}
