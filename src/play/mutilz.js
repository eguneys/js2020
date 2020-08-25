export const clamp = (value, min, max) => {
  return value < min ? min : 
    value > max ? max : 
    value;
};

export const boxIntersects = (a, b) => {
  return a[0] + a[2] > b[0] &&
    a[1] + a[3] > b[1] &&
    a[0] < b[0] + b[2] &&
    a[1] < b[1] + b[3];
};
