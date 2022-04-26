const request = require('postman-request');

   const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=dbc56bb8698ba8e775b35d64e734595c&query=${latitude},${longitude}&units=m`;
    request({ url, json: true }, (error, {body}={}) => {
      if (error) {
        callback("Unable to connect to weather service!", undefined);
      } else if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%. The observation time is ${body.current.observation_time}.`);
      }
    });
  };

  module.exports = forecast


// {
//     weather: response.body.current.weather_descriptions[0],
//     temperature: response.body.current.temperature,
//     feels_like: response.body.current.feelslike,
//   }