const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cd037191df9a62d2c118bac9450489ce&query='+ longitude + ',' + latitude
    request({url, json: true}, (error,response) => { 
        const {weather_descriptions:description,temperature:temperature, feelslike: feelslike,wind_speed: wind_speed, wind_dir: wind_dir}=response.body.current
        const {error:responseError} = response.body
        if (error) {
            callback('Unable to connect to weather service', undefined )
        } else if (responseError){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, description[0] + '. It is currently ' + temperature + 
            ' degrees out. It feels like ' + feelslike + ' out. The wind speed is ' + wind_speed + 
            ' and the wind direction is ' + wind_dir)
        }
    })

}

module.exports = forecast