import Menu from './menu';
import Levels from './levels';
import Board from './board';

export default function Play(ctx) {

  let { g, e } = ctx;

  let level = 0;
  let levels = new Levels();
  let board = new Board(this, ctx);
  let menu = new Menu(this, ctx);

  let particles;

  //g.fill('#fff1e8');
  g.fill('#1d2b53');

  this.init = () => {
    levels.level(level);
    board.init(levels);


    particles = [];


    for (let i = 0; i < 180 / 32 + 1; i++) {
      for (let j = 0; j < 320 / 32 + 1; j++) {
        if (Math.random() < 0.3) {
          particles.push({
            l: 0,
            i: i * 32 - 10, j: j * 32
          });
        }
      }
    }
  };

  this.nextLevel = () => {
    level++;
    levels.level(level);
    board.init(levels);
  };

  this.update = () => {
    if (e.p.enter) {
      board.init(levels);
    }

    board.update();

    for (let particle of particles) {
      if (particle.l > 0) {
        if (e.c || e.x) {
          particle.l--;
        }
      } else {
        
        particle.ml = 60 * 2 + Math.random() * 60 * 6;
        particle.l = particle.ml;
      }

    }
  };

  this.draw = () => {
    
    g.clear();
    g.fr(0, 0, 320, 180);

    for (let particle of particles) {
      if (particle.l / particle.ml < 0.5) {
        g.sspr(224, 224, 32, 32, particle.j - 32, particle.i, 32, 32);
      }
    }


    g.sspr(241, 16, 8, 8, 40, 0, 32, 180);
    g.sspr(241, 16, 8, 8, 320 - 40 - 32, 0, 32, 180);

    for (let i = 0; i < 180 / 32; i+=2) {
      g.sspr(192, 224, 32, 32, 40, (i + 1) * 32 - 10, 32, 32);
      g.sspr(192, 224, 32, 32, 320 - 40 - 32, i * 32 - 10, 32, 32);
    }

    board.draw();

  };
  
}
