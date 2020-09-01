export default function Corruption(play, ctx) {
  
  let { g } = ctx;

  let data = [];

  let rint = (i) => 
      Math.floor(Math.random() * i);

  let r = 0;

  this.update = () => {

    r ++;

    if (data.length < 1) {
      let corruption = [
        rint(320),
        rint(180),
        rint(320),
        rint(180),
        64,
        60 + Math.random() * 60
      ];
      
      data.push(corruption);
    }

    for (let i = 0; i < data.length; i++) {

      data[i][5]--;

      data[i][0]+=
        Math.floor(Math.sin(data[i][5] * 0.1)*8);
      data[i][1]+=
        Math.floor(Math.cos(data[i][5] * 0.2)*8 + data[i][5] * 0.1 + 3);


      if (data[i][5] < 0) {
        data.splice(i, 1);
      }
    }
  };

  this.draw = () => {
    g.corrupt(data);
  };
  
}
