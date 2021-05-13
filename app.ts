import 'reflect-metadata'
import { createConnection } from 'typeorm'

require('rootpath')()
require('dotenv').config()

const login = require('./src/get/getUser')
const carInfo = require('./src/get/getCar')
const registerUser = require('./src/create/createNewUser')
const addCar = require('./src/create/createNewCar')
const createEmail = require('./_services/emails.service')
const express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('./_helpers/error-handler')
const cors = require('cors')
const app = express()

app.get('/test', (res) => {
  res.send('test endpoint!')
})

createConnection().then(async () => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(express.json())
  app.use(cors())

  // global error handler
  app.use(errorHandler)

  app.listen(process.env.PORT || 4000, () => {
    console.log('Server started on 4000')
  })

  app.get('/test2', (res) => {
    res.send('test2 endpoint!')
  })

  app.post('/users/authenticate', async (req, res) => {
    console.log('===================================\nfrom app.ts... /users/authenticate endpoint')

    const { username, password } = req.body

    const user = await login.getUser(username, password)
    console.log(`from app.ts... user: ${ user }`)

    if (user) { // user exists in database table
      const { password, ...userWithoutPassword } = user
      return res.json(userWithoutPassword)
    } else { // user does not exist
      return res.status(400).json({ message: 'Username or password is incorrect!' })
    }
  })

  app.post('/users/register', async (req, res) => {
    console.log('===================================\nfrom app.ts... /users/register endpoint')

    const { username, password, firstName, lastName, license } = req.body

    const regUser = await registerUser.createNewUser(
      username, password, firstName, lastName, license
    )

    if (regUser === 'Username/Email: ' + username + ' is already taken') {
      return res.status(400).json({ message: regUser })
    }

    typeof (regUser) === 'string' ? res.json(regUser) : res.send('Register event has been logged')
  })

  app.post('/vehicles', async (req, res) => {
    console.log('===================================\nfrom app.ts... /vehicles endpoint')

    const yourCar = await addCar.createNewCar(
      req.body.carData[ 0 ],
      req.body.carData[ 1 ],
      req.body.carData[ 2 ],
      req.body.carData[ 3 ],
      req.body.carData[ 4 ],
      req.body.carData[ 5 ],
      req.body.carData[ 6 ],
      req.body.carData[ 7 ]
    )

    typeof (yourCar) === 'string' ? res.json(yourCar) : res.send('Vehicles event has been logged')
  })

  app.post('/emails', async (req, res) => {
    console.log('===================================\nfrom app.ts... /emails endpoint')

    const { service, user, password, sender, receiver, userId } = req.body

    console.log('the userId is: ' + userId)

    const carMessage = await carInfo.getCar(userId)

    await createEmail.sendgmail(service, user, password, sender, receiver, carMessage)

    res.send('Email event has been logged')
  })
}).catch(error => console.log(error))

// export the app
export default app
