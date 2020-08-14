const singleBlock = {
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


let middlex = 40 + 32;
let middlew = 320 - (40 + 32) * 2;
let mapx = middlex + middlew / 2 - 4 * 16;

let dirs = ['up', 'down', 'left', 'right'];

export default function Play(ctx) {

  let { g, e } = ctx;

  let blocks = [];

  let cursor = {
    s: 0,
    prevBlocks: []
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
    return nb;
  };

  let nb = addBlock(twoHBlock, 2, 2);
  cursor.block = addBlock(singleBlock, 0, 0);
  cursor.nextBlock = findNextBlock();

  const allowCursorMove = dir => {
    let allows = cursor.block.allows[dir];
    return allows.addTimer > 0 ? allows.add : allows.value;
  };

  this.update = () => {
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

  };

  function updateBlock(block) {

    let addAllows = {};

    let fuy = block.y + block.dy,
        fux = block.x + block.dx;

    if (cursor.block === block) {
      addAllows['up'] = fuy !== 0;
      addAllows['left'] = fux !== 0;
      addAllows['right'] = fux + block.t.w !== 6;
      addAllows['down'] = fuy + block.t.h !== 6;
    } else {

      for (let dir of dirs) {
        addAllows[dir] = false;
      }

    }

    if (block.addXTimer > 0) {
      block.addXTimer--;

      if (block.addXTimer === 0) {
        block.x += block.dx;
        block.dx = 0;
      }
    }

    if (block.addYTimer > 0) {
      block.addYTimer--;

      if (block.addYTimer === 0) {
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

    if (block.allows['right'].value) {
      let as = Math.floor((1.0 - block.allows['right'].addTimer / 10) * 3) % 3;
      g.sspr(176 + as * 16, 0, 16, 16, 
             addX + mapx + 16 * block.x + block.t.dw + 16 + 
             Math.sin((cursor.s % 30) / 30 * Math.PI) * 4 - 2,
             addY + 40 + 16 * (block.y + 1), 16, 16);
    }
    if (block.allows['left'].value) {
      let as = Math.floor((1.0 - block.allows['left'].addTimer / 10) * 3) % 3;
      g.sspr(176 + as * 16, 16 * 1, 16, 16, 
             addX + mapx + 16 * (block.x + 1) - 16
             - Math.sin((cursor.s % 30) / 30 * Math.PI) * 4 + 2, 
             addY + 40 + 16 * (block.y + 1), 16, 16);
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
             addY + 40 + 16 * (block.y + 1) + 16 + 
             Math.sin((cursor.s % 30) / 30 * Math.PI) * 4 - 2, 16, 16);
    }
  }
  
  this.draw = () => {

    g.clear();
    g.fr(0, 0, 320, 180);


    for (let i = 0; i < 180 / 32 + 1; i++) {
      for (let j = 0; j < 320 / 32 + 1; j++) {
        g.sspr(192, 224, 32, 32, j * 32 - 16, i * 32 - 10, 32, 32);
        g.sspr(192, 224, 32, 32, j * 32 - 16, i * 32 - 10, 32, 32);
      }
    }

    g.sspr(224, 16, 8, 8, 40, 0, 32, 180);
    g.sspr(224, 16, 8, 8, 320 - 40 - 32, 0, 32, 180);

    for (let i = 0; i < 180 / 32; i++) {
      g.sspr(224, 224, 32, 32, 40, i * 32 - 10, 32, 32);
      g.sspr(224, 224, 32, 32, 320 - 40 - 32, i * 32 - 10, 32, 32);
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

    g.sspr(0, 160, 16 * 3, 16 * 2, 320 - 40 - 32 - 16 * 3 - 4, 4);

  };
}
