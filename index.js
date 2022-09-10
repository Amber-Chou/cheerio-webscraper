const PORT = 8000
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));


const url = 'https://www.theguardian.com/uk'

// app.METHOD(PATH, HANDLER)


//get data
app.get('/', function (req,res) {
  res.json('Amber webscraper')

})   

app.get('/results', (req,res)=>{
  axios(url)
 .then(response => {
  const html = response.data
  const $ = cheerio.load(html)
  const articles = []
  $('.fc-item__title, html').each(function() {
    const title = $(this).text()
    const url = $(this).find('a').attr('href')
    articles.push({
      title,
      url
    })
  })
  // console.log(articles)
  res.json(articles)
 }).catch(err => console.log(err))

})

// add data



// original code before render to the frontend

// axios(url)
// .then(response => {
//   const html = response.data
//   const $ = cheerio.load(html)
//   const articles = []
//   $('.fc-item__title, html').each(function() {
//     const title = $(this).text()
//     const url = $(this).find('a').attr('href')
//     articles.push({
//       title,
//       url
//     })
//   })
//   console.log(articles)
// }).catch(err => console.log(err))


app.listen(PORT,()=>console.log(`server is running on PORT ${PORT}`));
