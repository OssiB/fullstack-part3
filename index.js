const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
morgan.token('person', function getPerson(req,res) { return JSON.stringify (req.body) })


const assignPerson = (req,res,next)  =>  {
  if(req.method === 'POST'){
    req.person = req.body
  }
  else {
    req.person = null
  }
  next()
}
/*app.use(assignPerson )

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person '))*/


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
    "number": "040 77 0532",
    "id": 5
  }

]



app.get('/api/persons', (req, res) => {
  
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons/', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(404).json({
      error: 'name or number is missing'
    })
  }
  const person = persons.find(person => person.name === body.name)
  if (person) {
    return res.status(404).json({
      error: 'name is already in use'
    })
  }
  const newPerson = {
    name: body.name,
    number: body.number
  }
  persons.concat(newPerson)
  res.json(newPerson)
})
app.get('/info', (request, respose) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p>
                \n 
                <p>${new Date()}</p>`

  respose.send(info)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})