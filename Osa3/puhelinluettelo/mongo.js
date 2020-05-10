const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://aktiivmalli:${password}@cluster0-74ma7.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  
})

const Person = mongoose.model('Person', personSchema)

const showPersons = () => {
    Person
    .find({})
    .then(persons => {
        persons.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

const addPerson = (name, number) => {
    const person = new Person({name, number})
    person.save()
    .then(result => {
        console.log("added", name, "number", number, "to phonebook")
        mongoose.connection.close()
    })   
}
if (process.argv.length === 3) {
    showPersons()
} else if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    addPerson(name, number)
} 

