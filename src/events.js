export default function Events() {

  let allKeys = ['up', 'left', 'right', 'down', 'x', 'c'];

  this.p = {};

  let ps = {};

  this.update = () => {
    for (let key of allKeys) {
      if (this[key] && !ps[key]) {
        this.p[key] = true;
      } else {
        this.p[key] = false;
      }
      ps[key] = this[key];
    }
  };

  const pressKey = key => {
    this[key] = true;
  };

  const releaseKey = key => {
    this[key] = false;
  };

  const onKeyDown = e => {
    switch (e.code) {
    case 'ArrowUp':
      pressKey('up');
      break;
    case 'ArrowDown':
      pressKey('down');
      break;
    case 'ArrowLeft':
      pressKey('left');
      break;
    case 'ArrowRight':
      pressKey('right');
      break;
    case 'KeyX':
      pressKey('x');
      break;
    case 'KeyC':
      pressKey('c');
      break;
    }
  };

  const onKeyUp = e => {
    switch (e.code) {
    case 'ArrowUp':
      releaseKey('up');
      break;
    case 'ArrowDown':
      releaseKey('down');
      break;
    case 'ArrowLeft':
      releaseKey('left');
      break;
    case 'ArrowRight':
      releaseKey('right');
      break;
    case 'KeyX':
      releaseKey('x');
      break;
    case 'KeyC':
      releaseKey('c');
      break;
    }    
  };


  this.bind = () => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  };
  
}
