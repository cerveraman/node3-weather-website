const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2VydmVyYW1hbiIsImEiOiJja24yd3JlbmYwMmZkMndxYjdpM3hja2t6In0.EkwCXb-irWZr94dYO40hiA&limit=1'

    request({url, json: true}, (error,response) => { 
        const {features} = response.body
        if (error) {
            callback('Unable to find location', undefined )
        } else if (features.length === 0){
            callback('Unable to find location. Please specify a valid location', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })

}

module.exports = geocode