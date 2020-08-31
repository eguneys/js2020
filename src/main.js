import Canvas from './canvas';
import Graphics from './graphics';
import Assets from './assets';

import Audio from './audio';
import audioData from './audio/data';

import Loop from './loop';
import Play from './play';

import Events from './events';

export function app(element, options) {

  let canvas = new Canvas(element);

  let events = new Events();
  events.bind();

  let assetsBase = options.assetsBase || 'assets';

  let audio = new Audio();
  // audio.generate(audioData);

  new Assets(assetsBase + '/sprites.png')
    .start(sprites => {

      let graphics = new Graphics(canvas, 
                                  sprites);

      let ctx = {
        g: graphics,
        e: events,
        a: audio
      };

      let play = new Play(ctx);

      play.init();

      new Loop(() => {

        events.update();
        play.update();
        play.draw();

      }).start();
    });

}
