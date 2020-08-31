export const maybe = (max) => {
  return Math.random() < max;
};

export const rnd = (max) => {
  return Math.random() * max;
};

export const lerp = (value, target, factor = 0.1) =>{
  return value + (target - value) * factor;
};

export const appr = (value, target, accel) => {
  if (value < target) {
    return Math.min(value + accel, target);
  } else if (value > target) {
    return Math.max(value - accel, target);
  }
  return target;
};

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
