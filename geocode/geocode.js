const request = require('request');

const geocodeAddress = (address, callback) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback(`Unable to connect google.com!`);
    } else if(body.status === 'ZERO_RESULTS') {
      callback(`Unable to find ${address}`);
    } else if(body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longtitude: body.results[0].geometry.location.lng
      });
    } else {
      callback('Something went wrong!');
    }
  });
};

module.exports = {
  geocodeAddress
}
