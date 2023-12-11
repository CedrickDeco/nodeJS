const express = require('express')
const morgan = require('morgan')
const port = 3001


const app = express()

// Logger les requests et les responses
app.use(morgan('tiny'))

// Midleware qui permet de traiter les données de la requete

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//app.use('/post', require('./routes'))

app.use('/', require('./routes/contact.routes'))
app.use('/info', require('./routes/info.routes'))
app.use('/css', express.static(__dirname + '/css/'))



//Lancer le serveur
app.listen(port, () => console.log('Le serveur a démarré au port ' + port))