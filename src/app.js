const path = require('path')
const express = require('express');
const hbs = require('hbs');

const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handleBars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// 
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Mukul Verma'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About ME',
        name: 'Mukul Verma'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Mukul Verma'
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'You must provide an address!'
        })  
    }else{
        geocode(address, (error, {latitude, longitude, location} = {})=>{
            if (error){
                return res.send({error})
            }

            forecast(longitude, latitude, (error, forecastData)=>{
                if(error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address
                })
            })
        })
    }
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: 'Error: 404 Page not found',
        name: 'Mukul Verma',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: 'Error: 404 Page not found',
        name: 'Mukul Verma',
        errorMessage: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})