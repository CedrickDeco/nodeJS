const express = require('express')
const fs = require('fs')
const router = express.Router()


router.get('/', (_, res) => {
  const infoHtml = fs.readFileSync('./client/info.html', 'utf-8')
  res.send(infoHtml)
})



module.exports = router