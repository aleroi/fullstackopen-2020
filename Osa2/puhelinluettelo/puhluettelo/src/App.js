import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personService from './services/persons'


const nameExists = (persons, name) => {
  return persons.filter(person => person.name ===name).length > 0
}
const Notification = ({ message }) => {

  if (message === null) {
    return null
  }

  const notificationStyle = {
    "color": message.isError ? "red" : "green",
    "background": "lightgrey",
    "fontSize": "20px",
    "borderStyle": "solid",
    "borderRadius": "5px",
    "padding": "10px",
    "marginBottom": "10px"
  }

  return (
    <div style={notificationStyle}>
      {message.content}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const content = message === null ? null : message.content
  const isError = message === null ? null : message.isError


  useEffect(() => {
    personService
      .getAll()
      .then(allPersons =>
        setPersons(allPersons)
        )
    }, [])

    useEffect(() => {
      const clearMessage = () => setMessage(null)
      const timer = setTimeout(clearMessage, 5000)
  
      return () => clearInterval(timer)
    }, [content, isError])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleUpdatePerson = (name) => {
    const oldPerson = persons.find(p => p.name === name)
    const updatePerson = {...oldPerson, number: newNumber}

    personService
      .update(updatePerson.id, updatePerson)
      .then(returnedPerson => {
        setPersons(
          persons.map(
            person =>
              person.id !== oldPerson.id ? person: returnedPerson
            )
          )
        setMessage({content:`Updated ${updatePerson.name}.`, isError: false})
          })
        setNewName('')
        setNewNumber('')
      }

  const handleCreateNewPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService
      .create(newPerson)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setMessage({content: `Created ${newPerson.name}.`, isError: false})
      })
      .catch(error => {
        setMessage({content: error.response.data.error, isError: true})
      })
    setNewName('')
    setNewNumber('')
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    if (nameExists(persons, newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        handleUpdatePerson(newName)
      }
    } else {
      handleCreateNewPerson()
    }
  }

  const handleDelete = deletePerson => {
    if(window.confirm(`Delete ${deletePerson.name}?`)) {
      personService
      .remove(deletePerson.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== deletePerson.id))
        setMessage({content:`Deleted ${deletePerson.name}.`, isError: false})
          })
          .catch(error =>  {
            setMessage({content: `Information of ${deletePerson.name} has already removed from server`, isError: true})
          })
        setNewName('')
        setNewNumber('')
      }
    }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filter={filter} onFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm
        handleAddPerson={handleAddPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={handleDelete}/>
    </div>
  )
  }

export default App
