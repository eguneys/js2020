
export default function Levels() {

  let level;

  this.level = i => {
    i = mapData.length - i - 1;
    level =
      mapData[i]
      .replace(/^\n|\n$/g, '')
      .split('\n');

    this.maxMoves = maxMoves[i];
  };


  this.mget = (x, y) => {
    return level[y][x];
  };
}

const maxMoves = [
  1,
  1,
  1,
  57,
  19,
  12,
  11,
  7,
  7,
  5,
];

const mapData = [
`
H.V...
O..JH.
.....J
@J..V.
V.H...
..QB..
`,
`
VB..H.
.B....
H.JB..
@..H..
H..O.V
QQ....
`,
  `
...O.V
VO....
...H..
@H.JJJ
H.....
H.....
  `
  ,
`
VJ....
..O.H.
....O.
@.JJ..
H...O.
H.....
`,
  `
.Bbb.J
.J.J..
Vj..V.
.j...J
BbbOo.
@o.oo.
`,
  `
Hh.Bbb
OoJBbb
oojBbb
@.jBbb
.HhBbb
.HhBbb
`,
`
.B..H.
...J..
.....J
@.....
...V..
B...H.
`,
  `
....Hh
......
@....V
.....v
......
....Hh
`,
  `
......
......
@.Vv..
......
......
......
`,
  `
......
......
......
@.....
......
......
`,
];
