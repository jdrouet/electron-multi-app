const minimist = require('minimist');
const path = require('path');

const params = minimist(process.argv, {
  default: {
    asar: 'about',
  },
  string: [
    'asar',
  ],
});

const filename = path.join(__dirname, '..', '..', `${params.asar}.asar`, 'main.js');

require(filename);
