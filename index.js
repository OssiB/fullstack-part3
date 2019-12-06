require('dotenv').config()
const express = require('express')
require('dotenv').config()

const app = express()
const bodyParser = require('body-parser')
const Contact = require('./models/contact')
const morgan = require('morgan')
app.use(bodyParser.json())
const cors = require('cors')

app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('build'))
app.use(requestLogger)
morgan.token('person', function getPerson(req, res) { return JSON.stringify(req.body) })


const assignPerson = (req, res, next) => {
  if (req.method === 'POST') {
    req.person = req.body
  }
  else {
    req.person = null
  }
  next()
}
/*app.use(assignPerson )

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person '))*/



app.get('/api/persons', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts.map(contact => contact.toJSON()))
  });

})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact.toJSON())
      } else {
        response.status(204).end()
      }
    })
    .catch(error => next(error))
})
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const contact = {
    number: body.number,
    name: body.name,
  }

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then(updatedNote => {
      response.json(updatedContact.toJSON())
    })
    .catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (req, res) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const contact = new Contact({
    number: body.number,
    important: body.name
  })

  contact.save().then(savedContact => {
    response.json(savedContact.toJSON())
  })
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})