require('dotenv').config()
const express = require( 'express' )
const app = express()
const morgan = require('morgan')
const Person = require( './modules/person' )

morgan.token('body', (request, response) => {
    return JSON.stringify(request.body)
})
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))


let persons = [
	{
		name: "Arto Hellas",
        number: "040-123456",
        id: 1
        
	},
	{
		name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
	},
	{
		name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
	},
	{
		name: "Lea Kutvonen",
        number: "39-23-6423122",
        id: 4
	}
]

app.get('/api/persons', (request, response) => {
    Person
    .find({})
    .then(persons => {
        response.json(persons.map(person => person.toJSON()))
    })
})

app.get('/info', (request, response) => {
    const now = new Date()

	let page = `<p>Phonebook has info for ${ persons.length } people</p><br/><p>${now}</p>`
	response.send(page)
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(note => {
        if (note) {
            response.json(note.toJSON())
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = (max) => {
    const id =Math.floor(Math.random() * Math.floor(max))
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    } else if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: ' name must be unique'
        })
    }
    const person = new Person ({
        name : body.name,
        number: body.number,
        id: generateId(1000)
    })
    person.save().then(savedPerson => {
        response.json(savedPerson.toJSON())
    })
})
app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson.toJSON())
      })
      .catch(error => next(error))
  })


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)


    const PORT = process.env.PORT || 3001;
    app.listen( PORT, () => {
        console.log( `Server running on port ${ PORT }`)
    } )