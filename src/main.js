import Canvas from './canvas';
import Graphics from './graphics';
import Assets from './assets';

export function app(element, options) {

  let canvas = new Canvas(element);

  new Assets('assets/sprites.png')
    .start(sprites => {

      let graphics = new Graphics(canvas, 
                                  sprites);

      graphics.clear();
      graphics.fr(0, 0, 320, 180);
      graphics.sspr(0, 0, 32, 32, 8, 8);
    });

}
