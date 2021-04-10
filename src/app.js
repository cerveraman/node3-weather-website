const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(viewsPath)
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)//para cambiar el directorio por defecto de las templates de views a templates
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jorge Cervera'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jorge Cervera'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message',
        title: 'Help',
        name: 'Jorge Cervera'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error){
            //return console.log(error)
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                adress: req.query.address
            })
            })          
    })
})

app.get('/products', (req,res) =>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) =>{
    res.render('error', {
        title: 'Help error',
        name: 'Jorge Cervera',
        errorMessage: 'Help article not found'
    }
    )
})

app.get('*', (req,res) =>{
    res.render('404', {
        title: 'My 404',
        name: 'Jorge Cervera',
        errorMessage: 'Page not found'
    }
    )
})
app.listen(port, ()=> {
    console.log('Server is up on port ' + port)
})
