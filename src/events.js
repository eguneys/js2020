export default function Events() {

  let allCodes = ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'KeyX', 'KeyC', 'Enter'];

  let allKeys = ['up', 'left', 'right', 'down', 'x', 'c', 'enter'];

  this.p = {};

  let ps = {};

  this.update = () => {
    this.p.any = false;
    for (let key of allKeys) {
      if (this[key] && !ps[key]) {
        this.p[key] = true;
        this.p.any = true;
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

  const makeDo = fn => e => {
    let i = allCodes.indexOf(e.code);

    if (i >= 0) {
      fn(allKeys[i]);
    }
  };

  const onKeyDown = makeDo(pressKey);

  const onKeyUp = makeDo(releaseKey);


  this.bind = () => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  };
  
}
