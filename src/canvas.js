export default function Canvas(element) {

  const canvas = document.createElement('canvas');

  let ctx = this.ctx = canvas.getContext('2d');

  canvas.width = this.width = 320;
  canvas.height = this.height = 180;

  element.appendChild(canvas);

  resizeDisplay(element, canvas, ctx);

  const fontCanvas = document.createElement('canvas');

  this.fontCtx = fontCanvas.getContext('2d');

  this.fontCtx.imageSmoothingEnabled = false;

  fontCanvas.width = 1600;
  fontCanvas.height = 900;

  element.appendChild(fontCanvas);

  resizeDisplay(element, fontCanvas, this.fontCtx);

  window
    .addEventListener('resize', 
                      () => {
                        resizeDisplay(element, canvas, ctx);
                        resizeDisplay(element, fontCanvas, this.fontCtx);
                      });
}

function resizeDisplay(element, canvas, ctx) {
  const bounds = element
        .getBoundingClientRect();

  const ratio = 16 / 9;

  let desiredWidth = bounds.width;
  let desiredHeight = desiredWidth / ratio;

  if (bounds.height < desiredHeight) {
    desiredHeight = bounds.height;
    desiredWidth = desiredHeight * ratio;
  }

  canvas.style.width = desiredWidth + 'px';
  canvas.style.height = desiredHeight + 'px';

  ctx.imageSmoothingEnabled = false;
}
