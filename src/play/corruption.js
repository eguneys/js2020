export default function Corruption(play, ctx) {
  
  let { g } = ctx;

  let data = [];

  let rint = (i) => 
      Math.floor(Math.random() * i);

  this.update = () => {
    let corruption = [
      rint(320),
      rint(180),
      rint(320),
      rint(180),
      Math.random() * 2
    ];
    
    data.push(corruption);
  };

  this.draw = () => {
    g.corrupt(data);
  };
  
}
