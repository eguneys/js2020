export const vMax = 4;
export const tMax = 20;

export const hMax = 16 * 3;
export const xSubH = 16 * 3;

export const xFriction = 5 / tMax;
export const hAccel = vMax * xFriction;

export const v0Jump = (2 * hMax) * vMax / xSubH;
export const gJump = - (2 * hMax * vMax * vMax) / 
      (xSubH * xSubH);
