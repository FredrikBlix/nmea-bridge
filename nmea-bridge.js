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

const config = require('config');
const nmea = require('nmea-simple');
const dgram = require('dgram');
const request = require('request');
const debug = require('debug')('nmea-bridge');

const Socket = dgram.createSocket('udp4');

const hostPort = `${[config.get('push.host'),
                        config.get('push.port')].join(':')}`;

Socket.on('error', (err) => {
    debug(err.stack);
    Socket.close();
});

Socket.on('listening', () => {
    const address = Socket.address();
    debug(`Listening for NMEA on udp-port ${address.port}...`);
});

Socket.on('message', (msg, rinfo) => {
    msg = msg.toString('UTF-8').split('\r\n');
    msg = msg.filter(nmea_filter);

    debug(msg, `from ${rinfo.address}`);

    const nmea_packet = {};
    nmea_packet.sender = rinfo.address;

    msg.forEach(string => {
        const packet = nmea.parseNmeaSentence(string);

        // Fix for rounding the precision
        packet.latitude = Math.round(packet.latitude * 10000000) / 10000000;
        packet.longitude = Math.round(packet.longitude * 10000000) / 10000000;

        if (packet.sentenceId === 'RMC')
            nmea_packet.rmc = packet;
        if (packet.sentenceId === 'GGA')
            nmea_packet.gga = packet;
    });

    Socket.emit('nmea', nmea_packet);
});

Socket.on('nmea', async (nmea) => {

    // Make HTTP post message with NMEA
    const message = {
        uri: `http://${hostPort}/api/nmeas`,
        method: 'POST',
        json: nmea
    }

    request(message, (error, response, body) => {

        if(error) return debug(error);

        if(response.statusCode != 200)
            return debug(`POST ${message.uri} ${response.statusCode} - ${body}`);
        else
            return debug(`POST ${message.uri} ${response.statusCode}`);
    });
});

function nmea_filter(string)
{
    const search = ['$GPGGA', '$GPRMC'];
    const arr = string.split(',');
    return search.some(r => arr.includes(r));
}

module.exports = Socket;
