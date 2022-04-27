import request from "supertest";
import app from "../server.js";


 describe('register user', () => {
     it('it should create a user', (done) => {
         let user = {
             name: "shivani",
             email: "shivani@gmail.com",
             password: "shivani"
         }
          request(app)
           .post('/register')
           .send(user)
           .expect(200, done);

     });

 });
