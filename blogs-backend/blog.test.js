// const request = require('supertest')
// const app = require('./server')
//
// import app from "./server"
import request from "supertest"
// describe('Sample Test', () => {
//   it('should create a new post', async () => {
//    const res = await request(app)
//      .post('/write')
//      .send({
//        userId: 1,
//        title: 'test is cool',
//        tag: 'hey',
//        description: 'this is desc',
//        author: 'harshitha'
//      })
//    expect(res.statusCode).toEqual(201)
//    expect(res.body).toHaveProperty('post')
//  })
// })

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})
