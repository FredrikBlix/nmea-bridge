# nmea-bridge

This application is built to bridge incoming UDP NMEA packets to http-POST
requests.

It is build in [node](https://nodejs.org) and uses [nmea-simple](https://www.npmjs.com/package/nmea-simple)
for the parsing of [NMEA](https://www.gpsinformation.org/dale/nmea.htm) strings.

### Environental variables

**nmea_PORT** - UDP port that the application listens to (default: 6000).

**nmea_PUSH_host** - Host for the http-POST requests (default: localhost).

**nmea_PUSH_port** - Port for the http-POST requests (default: 80).
