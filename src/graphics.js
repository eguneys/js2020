export default function Graphics(canvas, sprites) {

  let ctx = canvas.ctx;

  let cameraX = 0,
      cameraY = 0;

  this.fill = (color) => {
    ctx.fillStyle = color;
  };

  this.clear = () => {
    ctx.clearRect(0, 0, 320, 180);
  };

  this.fr = (x, y, w, h) => {
    ctx.fillRect(x, y, w, h);
  };

  this.camera = (x = 0, y = 0) => {
    cameraX = x;
    cameraY = y;
  };

  this.sspr = (sx, sy, sw, sh, dx, dy, dw = sw, dh = sh, flipx = false) => {

    dx = Math.floor(dx - cameraX);
    dy = Math.floor(dy - cameraY);


    if (flipx) {

      ctx.scale(-1, 1);
      dx *= -1;
      dx -= dw;
    }

    ctx.drawImage(sprites, 
                  sx,
                  sy,
                  sw,
                  sh,
                  dx,
                  dy,
                  dw, 
                  dh);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  // let palette = [
  //   0x000000,
  //   0x1d2b53,
  //   0x7e2553,
  //   0x008751,
  //   0xab5236,
  //   0x5f574f,
  //   0xc2c3c7,
  //   0xfff1e8,
  //   0xff004d,
  //   0xffa300,
  //   0xffec27,
  //   0x00e436,
  //   0x29adff,
  //   0x83769c,
  //   0xff77a8,
  //   0xffccaa
  // ];

  this.corrupt = (transform) => {
    let imageData = ctx.getImageData(0, 0, 320, 180);

    for (let i = 0; i < transform.length; i++) {
      corruptRect(imageData, 
                  transform[i][0], transform[i][1],
                  transform[i][2], transform[i][3],
                  transform[i][4]);
    }

    ctx.putImageData(imageData, 0, 0);    
  };

}
