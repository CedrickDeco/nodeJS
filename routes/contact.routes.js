const express = require('express')
const fs = require('fs')
const router = express.Router()

let contacts = [
  {
    "id": 1,
    "name": "Niel",
    "number": "826538782"
  },
  {
    "id": 2,
    "name": "Deco",
    "number": "8743245776"
  },
  {
    "id": 3,
    "name": "Tokos",
    "number": "2134535576"
  },
  {
    "id": 4,
    "name": "John Doe",
    "number": "6548768745"
  }
]

router.get('/api/persons', (req, res) => {
  res.json(contacts)
})

router.get('/', (req, res) => {
  const infoHtml = fs.readFileSync(__dirname + '../client/info.html', 'utf-8')
  res.send(infoHtml)
})

router.get('/api/persons/:id', (req, res) => {
  const teh_id = parseInt(req.params.id)
  let contact = contacts.find(cont => cont.id == teh_id)
  if (contact) {
    res.json(contact)
  } else {
    res.status(400).json({
      message: "La personne n'existe pas"
    })
  }
})

router.delete('/api/persons/:id', (req, res) => {
  const teh_id = parseInt(req.params.id)
  let contact = contacts.find(cont => cont.id == teh_id)
  console.log(contact);
  if (contact) {
    contacts.splice(contacts.indexOf(contact), 1)
    res.json(contacts)
  } else {
    res.status(400).json({
      message: "La personne n'existe pas"
    })
  }
})

const generateId = () => {
  const maxId = contacts.length > 0
    ? Math.max(...contacts.map(n => n.id))
    : 0
  return maxId + 1
}

router.post('/api/persons', (req, res) => {
  console.log(req.body);

  const name = req.body.name
  const number = req.body.number
  console.log(name);

  let found = contacts.find(elt => elt.name === req.body.name)

  if (!name || !number) {
    res.status(400).json({
      erreur: 'Nom ou numero vide'
    })
  } else if (found) {
    res.status(400).send('Le nom doit être unique')
  } else {
    let newContact = {
      id: generateId(),
      name: req.body.name,
      number: req.body.number,
    }

    contacts = contacts.concat(newContact)
    res.status(200).json(contacts)
  }
})



module.exports = router