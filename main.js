/*
* The main script just starts the bridge
*/

const bridge = require('./nmea-bridge');
const config = require('config');

bridge.bind(config.get('port'));

console.log('Running...');
