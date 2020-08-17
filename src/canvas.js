export default function Canvas(element) {

  const canvas = document.createElement('canvas');

  this.ctx = canvas.getContext('2d');

  this.ctx.imageSmoothingEnabled = false;

  canvas.width = this.width = 320;
  canvas.height = this.height = 180;

  element.appendChild(canvas);

  resizeDisplay(element, canvas);

  const fontCanvas = document.createElement('canvas');

  this.fontCtx = fontCanvas.getContext('2d');

  this.fontCtx.imageSmoothingEnabled = false;

  fontCanvas.width = 1600;
  fontCanvas.height = 900;

  element.appendChild(fontCanvas);

  resizeDisplay(element, fontCanvas);

  window
    .addEventListener('resize', 
                      () => {
                        resizeDisplay(element, canvas);
                        resizeDisplay(element, fontCanvas);
                      });
}

function resizeDisplay(element, canvas) {
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
}
