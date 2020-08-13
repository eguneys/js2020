export default function Graphics(canvas, sprites) {

  let ctx = canvas.ctx;

  this.fill = (color) => {
    ctx.fillStyle = color;
  };

  this.clear = () => {
    ctx.clearRect(0, 0, 320, 180);
  };

  this.fr = (x, y, w, h) => {
    ctx.fillRect(x, y, w, h);
  };


  this.sspr = (sx, sy, sw, sh, dx, dy, dw = sw, dh = sh) => {
    
    ctx.drawImage(sprites, 
                  sx,
                  sy,
                  sw,
                  sh,
                  dx,
                  dy,
                  dw, 
                  dh);
  };
  
}
