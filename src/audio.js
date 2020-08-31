import CPlayer from './audio/player-small';

export default function Audio() {

  let ctx = new AudioContext(),
      audioMaster = ctx.createGain();

  audioMaster.connect(ctx.destination);

  const sounds = {};

  const addSound = (name, buffer) => {
    sounds[name] = buffer;
  };

  this.generate = (data) => {

    data.forEach((o, i) => {
      let generator = new CPlayer();
      generator.init(o);
      function step() {
        if (generator.generate() === 1) {
          let wave = generator.createWave().buffer;
          ctx.decodeAudioData(wave, buffer => {
            addSound(i, buffer);
          });
        } else {      
          setTimeout(step, 0);
        }
      }
      step();
    });

    return new Promise(resolve => {
      function check() {
        if (Object.keys(sounds).length === data.length) {
          resolve();
          return;
        }
        setTimeout(check, 100);
      }
      check();
    });
  };



  this.sfx = (name, volume = .5, playbackRate = 1, pan = 0, loop = false) => {
    const buffer = sounds[name];

    if (!buffer) {
      return null;
    }

    let source = ctx.createBufferSource(),
        gainNode = ctx.createGain(),
        panNode = ctx.createStereoPanner();

    source.buffer = buffer;
    source.connect(panNode);
    panNode.connect(gainNode);
    gainNode.connect(audioMaster);

    source.playbackRate.value = playbackRate;
    source.loop = loop;
    gainNode.gain.value = volume;
    panNode.pan.value = pan;
    source.start();
    return {
      volume: gainNode,
      sound: source
    };
  };
}
