export default function Pool(makeItem, opts) {

  let alive = [],
      dead = [];

  this.acquire = (onInit = () => {}) => {
    let item;

    if (dead.length > 0) {
      item = dead.pop();
    } else {
      item = makeItem();
    }
    onInit(item);
    alive.push(item);
    return item;

  };

  this.release = (item) => {
    releaseIndex(alive.indexOf(item));
  };

  const releaseIndex = i => {
    if (i > -1) {
      dead.push(alive.splice(i, 1)[0]);
    }
  };

  this.releaseAll = () => {
    dead = [...dead, ...alive];
    alive = [];
  };
}
