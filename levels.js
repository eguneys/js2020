let fs = require('fs');

let nbLevels = 5;

function readLevel(level) {
  fs.readFile(`./assets/level${level}.json`, 'utf8', parseLevel(level));
}

function writeFile(path, contents) {
  fs.writeFile(path, contents, (err) => {
    if (err) {
      throw err;
    }
    console.log('done');
  });
}

let levels = [];

function writeLevels() {

  let template = `// Auto generated by levels.js\n`;

  levels.forEach((level, i) => {
    template += `const level${i} = [${level}];\n`;
  });

  template += `
export default [
level1,
level2,
level3,
level4,
level5
];
`;

  writeFile('src/play/levels.js', template);
}

function parseLevel(level) {
  return (err, contents) => {

    if (err) {
      throw err;
    }

    let data = JSON.parse(contents);

    levels[level] = data.layers[0].data;

    checkWrite();
  };
}

function checkWrite() {
  for (let i = 1; i <= nbLevels; i++) {
    if (!levels[i]) {
      return;
    }
  }

  writeLevels();
};

for (let i = 1; i <= nbLevels; i++) {
  readLevel(i);
}
