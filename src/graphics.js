export default function Graphics(canvas, sprites) {

  let ctx = canvas.ctx;
  let fontCtx = canvas.fontCtx;

  let cameraX = 0,
      cameraY = 0;

  this.font = (family, size) => {
    fontCtx.font = `${size}px ${family}`;
    fontCtx.textBaseline = "middle";
  };

  this.fill = (color) => {
    ctx.fillStyle = color;
  };

  this.clear = () => {
    fontCtx.clearRect(0, 0, 320 * 5, 180 * 5);
    ctx.clearRect(0, 0, 320, 180);
  };

  this.fr = (x, y, w, h) => {
    ctx.fillRect(x, y, w, h);
  };

  this.print = (text, x, y) => {
    x += cameraX;
    y += cameraY;

    fontCtx.fillText(text, x * 5, y * 5);
  };

  this.camera = (x = 0, y = 0) => {
    cameraX = x;
    cameraY = y;
  };

  this.sspr = (sx, sy, sw, sh, dx, dy, dw = sw, dh = sh) => {

    dx = Math.floor(dx + cameraX);
    dy = Math.floor(dy + cameraY);

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
