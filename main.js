/**
*   This file is part of nmea-bridge.
*
*   nmea-bridge is free software: you can redistribute it and/or modify
*   it under the terms of the GNU Lesser General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   nmea-bridge is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU Lesser General Public License for more details.
*
*   You should have received a copy of the GNU Lesser General Public License
*   along with nmea-bridge.  If not, see <https://www.gnu.org/licenses/>.
*/    

const bridge = require('./nmea-bridge');
const config = require('config');

bridge.bind(config.get('port'));

console.log('Running...');
