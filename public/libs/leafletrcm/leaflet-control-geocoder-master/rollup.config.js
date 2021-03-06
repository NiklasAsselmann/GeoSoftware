import pkg from './package.json';

var banner =
  '/* @preserve\n' +
  ' * Leaflet Control Geocoder ' +
  pkg.version +
  '\n' +
  ' * https://github.com/perliedman/leaflet-control-geocoder\n' +
  ' *\n' +
  ' * Copyright (c) 2012 sa3m (https://github.com/sa3m)\n' +
  ' * Copyright (c) 2018 Per Liedman\n' +
  ' * All rights reserved.\n' +
  ' */\n';

export default {
  input: 'src/index.js',
  external: ['leaflet'],
  output: {
    file: 'dist/Control.Geocoder.js',
    format: 'iife',
    name: 'L.Control.Geocoder',
    sourcemap: true,
    globals: {
      leaflet: 'L'
    },
    banner: banner
  }
};
