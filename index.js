const PORT = process.env.PORT || 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const {response} = require("express");
const cors = require('cors')

const app = express()
const url = 'https://www.seaofthieves.com/de/twitch-drops'
app.use(cors())

app.get('/', function (req, res){
    res.json('This is my webscrapper')

})

app.get('/results', function (req, res) {

    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const drops = []
            $('.generic-gift-calendar-item.pseudo-before', html).each(function (){
                const name = $(this).find('.generic-gift-calendar-item__container-text-bottom.align-center').text()
                const date = $(this).find('.generic-gift-calendar-item__container-text-top').text()

                drops.push({
                    date,
                    name
                })
            })



            res.json(drops)

        }).catch(err => console.log(err))

})






app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))