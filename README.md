# nmea-bridge

This application is built to bridge incoming UDP NMEA packets to http-POST
requests.

It is build in [node](https://nodejs.org) and uses [nmea-simple](https://www.npmjs.com/package/nmea-simple) for the parsing of [NMEA](https://www.gpsinformation.org/dale/nmea.htm) strings.

### Environental variables

**nmea_PORT** - UDP port for listening to NMEA (default: 6000).

**nmea_PUSH** - URI for posting requests (default: http://localhost/api/nmeas).

## Docker

To run a docker image with this code, use the `docker-compose.yml` file, found in the repo or run using the docker command:

```
$ sudo docker run --detach \
    --publish 6000:6000/udp \
    --name nmea-bridge \
    --restart always \
    --net=host \
    --env nmea_PUSH="http://localhost/api/nmeas" \
    fredrikblix/nmea-bridge:latest
```
