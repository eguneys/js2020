export default function Assets(src) {

  this.start = (onLoad) => {
    let img = new Image();
    img.onload = () => {
      onLoad(img);
    };
    img.src = src;
  };
}
