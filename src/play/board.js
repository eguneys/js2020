const singleBlock = {
  sx: 16 * 4,
  sy: 16 * 3,
  sw: 16,
  sh: 16,
  dw: 16,
  dh: 16,
  w: 1,
  h: 1
};
const singleBlockEmpty = {
  sx: 0,
  sy: 16 * 3,
  sw: 16,
  sh: 16,
  dw: 16,
  dh: 16,
  w: 1,
  h: 1
};
const twoHBlock = {
  sx: 0,
  sy: 16 * 4,
  sw: 32,
  sh: 16,
  dw: 32,
  dh: 16,
  w: 2,
  h: 1
};

const twoVBlock = {
  sx: 0,
  sy: 16 * 5,
  sw: 16,
  sh: 32,
  dw: 16,
  dh: 32,
  w: 1,
  h: 2
};

const threeHBlock = {
  sx: 16,
  sy: 16 * 3,
  sw: 16 * 3,
  sh: 16,
  dw: 16 * 3,
  dh: 16,
  w: 3,
  h: 1
};

const threeVBlock = {
  sx: 16,
  sy: 16 * 5,
  sw: 16,
  sh: 16 * 3,
  dw: 16,
  dh: 16 * 3,
  w: 1,
  h: 3
};

const oBlock = {
  sx: 16 * 2,
  sy: 16 * 4,
  sw: 16 * 2,
  sh: 16 * 2,
  dw: 16 * 2,
  dh: 16 * 2,
  w: 2,
  h: 2  
};

let middlex = 40 + 32;
let middlew = 320 - (40 + 32) * 2;
let mapx = middlex + middlew / 2 - 4 * 16;

let dirs = ['up', 'down', 'left', 'right'];

export default function Board(play, ctx) {

  let { g, e } = ctx;

  let freeze = true;

  let blocks;

  let cursor;

  let moveStats;

  this.init = (levels) => {

    freeze = false;

    blocks = [];
    cursor = {
      s: 0,
      prevBlocks: []
    };

    moveStats = {
      moves: 0,
      maxMoves: levels.maxMoves || 0,
      addMoveX: 0,
      addMoveY: 0,
      shakeBiasX: 0,
      shakeBiasY: 0,
      shakeX: 0,
      shakeTarget: 0,
      shakeTimer: 0,
      shakeY: 0,
      shakeTargetY: 0
    };

    let singleI,
        singleJ;

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        switch (levels.mget(i, j)) {
        case '@': 
          singleI = i;
          singleJ = j;
          break;
        case 'O':
          addBlock(oBlock, i, j);
          break;
        case 'V':
          addBlock(twoVBlock, i, j);
          break;
        case 'H':
          addBlock(twoHBlock, i, j);
          break;
        case 'B':
          addBlock(threeHBlock, i, j);
          break;
        case 'J':
          addBlock(threeVBlock, i, j);
          break;
        case 'Q':
          addBlock(singleBlockEmpty, i, j);
        }
      }
    }

    cursor.block = addBlock(singleBlock, singleI, singleJ);
    cursor.nextBlock = findNextBlock();
  };

  const addBlock = (type, x, y) => {

    let allows = {};

    for (let dir of dirs) {

      allows[dir] = {
        addTimer: 0,
        add: false,
        value: false
      };

    }

    let block = { t: type, 
                  x,
                  y,
                  dx: 0,
                  dy: 0,
                  addXTimer: 0, 
                  addYTimer: 0,
                  allows
                };

    blocks.push(block);

    return block;
  };

  const findNextBlock = () => {
    let i = blocks.indexOf(cursor.block);
    return blocks[(i + 1) % blocks.length];
  };

  const allowCursorMove = dir => {
    let allows = cursor.block.allows[dir];
    return allows.addTimer > 0 ? allows.add : allows.value;
  };

  const collidesBlock = (block, x, y) => {
    let cbox = absCbox(block);
    cbox.x += x;
    cbox.y += y;

    if (cbox.x < 0 || cbox.x + cbox.w > 6 ||
        cbox.y < 0 || cbox.y + cbox.h > 6) {
      return true;
    }

    for (let _block of blocks) {
      if (block === _block) {
        continue;
      }
      let _cbox = absCbox(_block);

      if (boxIntersects(cbox, _cbox)) {
        return true;
      }
    }

    return false;
  };

  this.update = () => {

    if (freeze) {
      return;
    }

    cursor.s++;

    if (cursor.block.addXTimer == 0 &&
        cursor.block.addYTimer == 0) {

      if (e.p.right) {
        if (allowCursorMove('right')) {
          cursor.block.dx = 1;
          cursor.block.addXTimer = 10;
        }
      } else if (e.p.left) {
        if (allowCursorMove('left')) {
          cursor.block.dx = -1;
          cursor.block.addXTimer = 10;      
        }
      } else if (e.p.up) {
        if (allowCursorMove('up')) {
          cursor.block.dy = -1;
          cursor.block.addYTimer = 10;
        }
      } else if (e.p.down) {
        if (allowCursorMove('down')) {
          cursor.block.dy = 1;
          cursor.block.addYTimer = 10;
        }
      }

      if (e.p.c) {
        if (cursor.prevBlocks[cursor.prevBlocks.length - 1] !==
            cursor.block) {
          // TODO: limit size
          cursor.prevBlocks.push(cursor.block);
        }
        cursor.block = cursor.nextBlock;
        cursor.nextBlock = findNextBlock();
      } else if (e.p.x) {
        let prevBlock = cursor.prevBlocks.pop();

        if (prevBlock) {
          cursor.nextBlock = cursor.block;
          cursor.block = prevBlock;
        }
      }
    }

    for (let block of blocks) {
      updateBlock(block);
    }

    if (cursor.block.t === singleBlock &&
        cursor.block.x === 5 &&
        cursor.block.y === 3) {
      freeze = true;
      play.nextLevel();
    }

    let skipBlock = true;
    for (let dir of dirs) {
      if (allowCursorMove(dir)) {
        skipBlock = false;
        break;
      }
    }
    if (skipBlock) {
      cursor.block = cursor.nextBlock;
      cursor.nextBlock = findNextBlock();
    }

    if (moveStats.addMoveX !== 0 
        || moveStats.addMoveY !== 0) {

      moveStats.shakeBiasX = moveStats.addMoveX * 4;
      moveStats.shakeBiasY = moveStats.addMoveY * 4;

      moveStats.addMoveX = 0;
      moveStats.addMoveY = 0;

      moveStats.moves++;

      if (moveStats.moves > moveStats.maxMoves) {
        moveStats.shakeTimer = 10;
      }
    }

    if (moveStats.shakeTimer > 0) {
      moveStats.shakeTimer--;
      moveStats.shakeTarget = moveStats.shakeBiasX + -1 + Math.random() * 2 * 1;
      moveStats.shakeTargetY = moveStats.shakeBiasY + -1 + Math.random() * 2 * 1;
    } else {
      moveStats.shakeTarget = 0;
      moveStats.shakeTargetY = 0;
    }
    moveStats.shakeX = approach(moveStats.shakeX, moveStats.shakeTarget, 2);
    moveStats.shakeY = approach(moveStats.shakeY, moveStats.shakeTargetY, 2);
  };

  function updateBlock(block) {

    let addAllows = {};

    if (cursor.block === block) {
      addAllows['up'] = !collidesBlock(cursor.block, 0, -1);
      addAllows['left'] = !collidesBlock(cursor.block, -1, 0);
      addAllows['right'] = !collidesBlock(cursor.block, 1, 0);
      addAllows['down'] = !collidesBlock(cursor.block, 0, 1);
    } else {
      for (let dir of dirs) {
        addAllows[dir] = false;
      }
    }

    if (block.addXTimer > 0) {
      block.addXTimer--;

      if (block.addXTimer === 0) {
        moveStats.addMoveX = block.dx;
        block.x += block.dx;
        block.dx = 0;
      }
    }

    if (block.addYTimer > 0) {
      block.addYTimer--;

      if (block.addYTimer === 0) {
        moveStats.addMoveY = block.dy;
        block.y += block.dy;
        block.dy = 0;
      }
    }

    for (let dir of dirs) {
      let allows = block.allows[dir];

      if (allows.addTimer > 0) {
        allows.addTimer--;

        if (allows.addTimer === 0) {
          allows.value = allows.add;
        }
      } else if (allows.value && !addAllows[dir]) {
        allows.add = addAllows[dir];
        allows.addTimer = 10;
      } else if (!allows.value && addAllows[dir]) {
        allows.value = addAllows[dir];
      }
    }
  }


  function drawBlock(block) {

    let addX = (1.0 - block.addXTimer / 10) * block.dx * 16,
        addY = (1.0 - block.addYTimer / 10) * block.dy * 16;

    g.sspr(block.t.sx, block.t.sy, block.t.sw, block.t.sh, 
           mapx + 16 * (block.x + 1) + addX,
           40 + 16 * (block.y + 1) + addY);

  }

  function drawBlockAllows(block) {
    let addX = (1.0 - block.addXTimer / 10) * block.dx * 16,
        addY = (1.0 - block.addYTimer / 10) * block.dy * 16;

    if (block.allows['right'].value) {
      let as = Math.floor((1.0 - block.allows['right'].addTimer / 10) * 3) % 3;
      g.sspr(176 + as * 16, 0, 16, 16, 
             addX + mapx + 16 * block.x + block.t.dw + 16 + 
             Math.sin((cursor.s % 30) / 30 * Math.PI) * 4 - 2,
             addY + 40 + 16 * (block.y + 1) +
             block.t.dh / 2 - 8, 16, 16);
    }
    if (block.allows['left'].value) {
      let as = Math.floor((1.0 - block.allows['left'].addTimer / 10) * 3) % 3;
      g.sspr(176 + as * 16, 16 * 1, 16, 16, 
             addX + mapx + 16 * (block.x + 1) - 16
             - Math.sin((cursor.s % 30) / 30 * Math.PI) * 4 + 2, 
             addY + 40 + 16 * (block.y + 1) +
             block.t.dh / 2 - 8, 16, 16);
    }
    if (block.allows['up'].value) {
      let as = Math.floor((1.0 - block.allows['up'].addTimer / 10) * 3) % 3;
      g.sspr(176 + as * 16, 16 * 2, 16, 16, 
             addX + mapx + 16 * (block.x + 1) +
             block.t.dw / 2 - 8,
             addY + 40 + 16 * (block.y + 1) - 16 -
             Math.sin((cursor.s % 30) / 30 * Math.PI) * 4 + 2,
             16, 16);
    }
    if (block.allows['down'].value) {
      let as = Math.floor((1.0 - block.allows['down'].addTimer / 10) * 3) % 3;
      g.sspr(176 + as * 16, 16 * 3, 16, 16, 
             addX + mapx + 16 * (block.x + 1) +
             block.t.dw / 2 - 8,
             addY + 40 + 16 * block.y + block.t.dh + 16 + 
             Math.sin((cursor.s % 30) / 30 * Math.PI) * 4 - 2, 16, 16);
    }
  }
  
  this.draw = () => {

    if (moveStats.moves > moveStats.maxMoves * 1.4) {
      g.camera(moveStats.shakeX, moveStats.shakeY);
    }

    g.sspr(0, 0, 16, 16, mapx, 40);
    g.sspr(16 * 2, 0, 16, 16, mapx + 16 * 7, 40);
    g.sspr(0, 16 * 2, 16, 16, mapx, 40 + 16 * 7);
    g.sspr(16 * 2, 16 * 2, 16, 16, mapx + 16 * 7, 40 + 16 * 7);


    for (let i = 0; i < 6; i++) {
      g.sspr(16, 0, 16, 16, mapx + 16 * (i + 1), 40);
      g.sspr(16, 16 * 2, 16, 16, mapx + 16 * (i + 1), 40 + 16 * 7);

      g.sspr(0, 16, 16, 16, mapx, 40 + 16 * (i + 1));
      g.sspr(16 * 2, 16, 16, 16, mapx + 16 * 7, 40 + 16 * (i + 1));

      for (let j = 0; j < 6; j++) {
        g.sspr(16, 16, 16, 16, mapx + 16 * (i + 1), 40 + 16 * (j + 1));
      }
    }

    g.sspr(16 * 3, 0, 16, 16, mapx, 40 + 16 * 3);
    g.sspr(16 * 3, 16, 16, 16, mapx, 40 + 16 * 4);
    g.sspr(16 * 3, 16 * 2, 16, 16, mapx, 40 + 16 * 5);

    g.sspr(16 * 4, 0, 16, 16, mapx + 16 * 7, 40 + 16 * 3);
    g.sspr(16 * 4, 16, 16, 16, mapx + 16 * 7, 40 + 16 * 4);
    g.sspr(16 * 4, 16 * 2, 16, 16, mapx + 16 * 7, 40 + 16 * 5);

    for (let block of blocks) {
      drawBlock(block);
    }

    for (let block of blocks) {
      drawBlockAllows(block);
    }

    let moveX = 320 - 40 - 32 - 16 * 3 - 4;
    moveX = moveX + moveStats.shakeX;
    g.sspr(0, 160, 16 * 3, 16 * 2, moveX, 4);
    g.print(`${format(moveStats.moves)}/${format(moveStats.maxMoves)}`, moveX + 4, 4 + 16);

    g.camera();

  };
  
}

function format(number) {
  if (number < 10) return `0${number}`;
  return `${number}`;
}

function absCbox(block) {
  let fuy = block.y + block.dy,
      fux = block.x + block.dx;

  return {
    x: fux,
    y: fuy,
    w: block.t.w,
    h: block.t.h
  };
}

function boxIntersects(a, b) {

  if (a.x >= b.x + b.w ||
      b.x >= a.x + a.w ||
      a.y >= b.y + b.h ||
      b.y >= a.y + a.h) {
    return false;
  }
  return true;
}

function approach(value, target, amount) {
  if (value < target) {
    return Math.min(target, value + amount);
  } else {
    return Math.max(target, value - amount);
  }
}
