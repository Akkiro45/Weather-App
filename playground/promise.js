const request = require('request');
const geocodeAddress = (address) => {
  return new Promise((reslove, reject) => {
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
      json: true
    }, (error, response, body) => {
      if(error) {
        reject(`Unable to connect google.com!`);
      } else if(body.status === 'ZERO_RESULTS') {
        reject(`Unable to find ${address}`);
      } else if(body.status === 'OK') {
        reslove({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longtitude: body.results[0].geometry.location.lng
        });
      } else {
        reject('Something went wrong!');
      }
    });
  });
}


geocodeAddress('0000000')
  .then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
  }, (error) => {
    console.log(error);
  });
