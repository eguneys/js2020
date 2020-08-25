import levels from './levels';
import sprites from './sprites';

export default function Map(g) {

  this.solidAt = (x, y, w, h) => {
    for (let i = Math.max(0, Math.floor(x / 16)); 
         i <= Math.min(31, (x + w - 1) / 16); i++) {
      for (let j = Math.max(0, Math.floor(y / 16));
           j <= Math.min(31, (y + h - 1) / 16); j++) {
        if (this.fget(0, i, j, 1)) {
          return true;
        }
      }
    }
    return false;
  };
  
  this.fget = (l, x, y, f) => {
    return sprites[this.mget(l, x, y)][2] === f;
  };

  this.mget = (l, x, y) => {
    return levels[l][y * 32 + x];
  };

  this.draw = (x, y, w, h) => {
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        let s = this.mget(0, x + i, y + j);
        if (!s) continue;
        s = sprites[s];

        if (s[2] === 1) {
          g.sspr(s[0], s[1], 8, 8, (x + i) * 16 , 
                 (y + j) * 16, 16, 16);
        }
      }
    }
  };

}
