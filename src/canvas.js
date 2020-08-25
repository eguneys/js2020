export default function Canvas(element) {

  const canvas = document.createElement('canvas');

  let ctx = this.ctx = canvas.getContext('2d');

  canvas.width = this.width = 320;
  canvas.height = this.height = 180;

  element.appendChild(canvas);

  resizeDisplay(element, canvas, ctx);

  window
    .addEventListener('resize', 
                      () => {
                        resizeDisplay(element, canvas, ctx);
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
