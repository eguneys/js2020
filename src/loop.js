export default function Loop(onLoop) {

  this.start = () => {

    step();

  };

  function step() {
    onLoop();
    requestAnimationFrame(step);
  }
  
}
