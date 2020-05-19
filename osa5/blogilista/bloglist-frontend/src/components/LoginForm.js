import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ onUserLoggedIn, setNotification }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const handleLogin = async (event) => {
      event.preventDefault()
  
      const credentials =
        {
          username,
          password
        }
  
      try {
        const user = await loginService.login(credentials)
        setUsername('')
        setPassword('')
        onUserLoggedIn(user)
        setNotification(`Hi ${user.name}!`)
  
      } catch (error) {
        if (error.message === 'Request failed with status code 401') {
          setNotification('Invalid credentials')
       } else {
         setNotification('Could not log in')
       }
      }
    }
  
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  }

  export default LoginForm