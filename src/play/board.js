import * as mu from './mutilz';
import Map from './map';
import FallBlock from './fallblock';
import Player from './player';
import Pool from 'poolf';

export default function Board(play, ctx) {

  let objects;

  let pPlayer = new Pool(() =>{
    return new Player(this, ctx);
  });

  let pFallBlock = new Pool(() => {
    return new FallBlock(this, ctx);
  });

  const poolMap = {
    0: pPlayer,
    20: pFallBlock
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
  this.initObject = initObject;
  this.destroyObject = destroyObject;

  let { g, e } = ctx;

  let map = this.map = new Map(g);

  let cam = this.cam = {
    x: 0,
    y: 0
  };

  this.init = () => {
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
    this.init();
  };
  
  this.update = () => {
    for (let obj of objects) {
      obj.update();
    }
  };


  this.draw = () => {
    g.camera(cam.x - 160, cam.y - 90);
    map.draw(0, 0, 32, 32);

    for (let obj of objects) {
      obj.draw();
    }
  };
}
