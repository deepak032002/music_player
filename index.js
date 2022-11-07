const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const env = require('dotenv')
env.config()
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/getFile', (req, res) =>{
    const data = fs.readdirSync(path.join(__dirname, 'public/music'))
    let newArr = data.map((item) => {
        return `${req.protocol}://${req.hostname}:5000/music/${item}`
    })
    res.send(newArr)
})

app.listen(PORT, () => console.log('Server started!'))