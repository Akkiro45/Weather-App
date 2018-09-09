const request = require('request');

const getWeather = (latitude, longtitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/c6be74dc42e12a334ba3fd98f96fb305/${latitude},${longtitude}`,
    json: true
  }, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      callback(undefined, {
        temprature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather!');
    }
  });
}

module.exports.getWeather = getWeather;
