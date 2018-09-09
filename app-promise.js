const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    address: {
      describe: 'Address to fetch weacther information.',
      demand: true,
      alias: 'a',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}`;

axios.get(geocodeURL)
  .then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
       throw new Error(`Unable to find ${argv.address}`)
    }
    const latitude = response.data.results[0].geometry.location.lat;
    const longtitude = response.data.results[0].geometry.location.lng;
    const weatherURL = `https://api.darksky.net/forecast/c6be74dc42e12a334ba3fd98f96fb305/${latitude},${longtitude}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
  })
  .then((response) => {
    console.log(`It is currently ${response.data.currently.temperature} but feels like ${response.data.currently.apparentTemperature}`);
  })
  .catch((error) => {
    if(error.code === 'ENOTFOUND') {
      console.log('Unable to connect to google.com.');
    } else {
      console.log(error.message);
    }
  });
