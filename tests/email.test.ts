import app from '../app'
import { createConnection } from 'typeorm'
import * as request from 'supertest'
import { sendgmail } from '../_services/emails.service'
import { CarRepository } from '../src/repository/CarRepository'

// test is working as expected
describe('Self-send an email message with and without /emails', () => {

    let result: any
    let connection: any
    let carRepo: any
    let foundCar: any
    let newEmail: any
    let carMessage: any

    beforeAll(async () => {
        connection = await createConnection()

        // Searches the car in the database
        carRepo = new CarRepository()

        // user Id 24 for testing
        foundCar = await carRepo.findByUserId(24)

        // create test message for email
        carMessage = foundCar.lease + ', ' + foundCar.seats + ', ' + foundCar.year + ', ' + foundCar.make + ', ' + foundCar.model + ', ' + foundCar.trim + ', ' + foundCar.specs
    })

    afterAll(async () => {
        await connection.close()
    })

    test('Find car that belongs to user then email', async (done) => {

        let service = 'gmail', user = 'als', password = 'myPassword', sender = user + '@' + service + '.com', receiver = sender

        newEmail = await sendgmail(service, user, password, sender, receiver, carMessage)

        expect(newEmail).toEqual('Email info validated')
        done()
    })


    test('Find car that belongs to user but do not provide email password', async (done) => {

        let service = 'gmail', user = 'als', password = '', sender = user + '@' + service + '.com', receiver = sender

        newEmail = await sendgmail(service, user, password, sender, receiver, carMessage)

        expect(newEmail).toEqual('Email cannot be sent')
        done()
    })


    test('Find car that belongs to user then email via /emails', async (done) => {

        result = await request(app).post('/emails').send({
            service: 'gmail',
            user: 'als',
            password: 'myPassword',
            sender: 'als@gmail.com',
            receiver: 'als@gmail.com',
            userId: 24
        })

        expect(result.text).toEqual('Email event has been logged')
        expect(result.status).toEqual(200)
        done()
    })
})