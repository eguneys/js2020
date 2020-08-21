import Board from './board';
import Transition from './transition';
import EndGame from './endgame';
import Intro from './intro';

export default function Play(ctx) {

  let { g, e } = ctx;

  let particles;

  let scene;

  let timer = 0;
  let board = new Board(this, ctx);
  let transition = new Transition(this, ctx);
  let endgame = new EndGame(this, ctx);
  let intro = new Intro(this, ctx);

  //g.fill('#fff1e8');
  g.fill('#1d2b53');

  this.init = () => {
    scene = intro;
  };

  this.beginLevels = () => {
    transition.init(() => {
      scene = board;
    });
  };

  this.update = () => {
    timer++;

    transition.update();
    scene.update();
  };

  this.draw = () => {
    g.clear();

    scene.draw();
    transition.draw();
  };
  
}
