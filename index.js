const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(morgan('tiny'),{
   
})
app.use(bodyParser.json())

let persons = [

  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  },
  {
    "name": "Ossi Bister",
    "number": "040 77 0531",
    "id": 5
  }

]



app.get('/api/persons', (req, res) => {
  res.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
app.delete('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
  const body = req.body 
  if (!body.name || !body.number) {
    return res.status(404).json({
      error: 'name or number is missing'
    })
  }
  const person = persons.find(person => person.name === body.name)
  if(person){
    return res.status(404).json({
      error: 'name is already in use'
    })
  }
})
app.get('/info', (request, respose) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p>
                \n 
                <p>${new Date()}</p>`

  respose.send(info)
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})