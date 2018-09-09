const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMsg, results) => {
  if(errorMsg) {
    console.log(errorMsg);
  } else {
    // console.log(JSON.stringify(results, undefined, 2));
    weather.getWeather(results.latitude, results.longtitude, (errorMsg, weatherResults) => {
      if(errorMsg) {
        console.log(errorMsg);
      } else {
        obj = {
          ...results,
          ...weatherResults
        }
        // console.log(JSON.stringify(obj,  undefined, 2));
        console.log(results.address);
        console.log(`It is ${weatherResults.temprature} but feels like ${weatherResults.apparentTemperature}`);
      }
    });
  }
});
