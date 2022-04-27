import request from "supertest";
import app from "../server.js";


/*
 * Test the /POST route
 */
 describe('post blog', () => {
     it('it should create a blog', (done) => {
         let blog = {
             title:"mocha web dev",
             tag:"bhjb",
             description:"mochaa chai",
             author:"626579e06ed7180ee1d994b6"
         }
          request(app)
           .post('/write')
           .send(blog)
           .expect(200, done);

     });

 });
