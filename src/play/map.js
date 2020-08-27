import levels from './levels';
import sprites from './sprites';

export default function Map(g) {

  let l = 0;

  this.level = (_l) => {
    if (_l || _l === 0) {
      l = _l;
    }
    return l;
  };

  this.solidAt = (x, y, w, h, f = 1) => {
    for (let i = Math.max(0, Math.floor(x / 16)); 
         i <= Math.min(31, (x + w - 1) / 16); i++) {
      for (let j = Math.max(0, Math.floor(y / 16));
           j <= Math.min(31, (y + h - 1) / 16); j++) {
        if (this.fget(i, j, f)) {
          return true;
        }
      }
    }
    return false;
  };
  
  this.fget = (x, y, f) => {
    return (sprites[this.mget(x, y)][2] & f) === f;
  };

  this.mget = (x, y) => {
    return levels[l][y * 32 + x];
  };

  this.draw = (x, y, w, h) => {
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        let s = this.mget(x + i, y + j);
        if (!s) continue;
        s = sprites[s];

        if (this.fget(x + i, y + j, 1)) {
          g.sspr(s[0], s[1], 8, 8, (x + i) * 16 , 
                 (y + j) * 16, 16, 16);
        }
      }
    }
  };

}
