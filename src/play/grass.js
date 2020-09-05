export default function Grass(play, ctx) {

  let { g } = ctx;

  let x,y;
  let s = Math.random() * 40;
  let p = 60 + Math.random() * 60;
  let c = Math.random()<0.5?0:8;

  this.init = (_x, _y) => {
    x = _x;
    y = _y;
  };

  this.update = () => {
    s++;
  };


  this.draw = () => {
    let si = Math.floor((s % p / p) * 4);
    g.sspr(112+c, 96 + si * 8, 8, 8, x, y, 16, 16);
  };
  
}
