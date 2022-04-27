import request from "supertest";
import app from "../server.js";



describe('Fetch blogs', function() {

    it('Should fetch all blogs (Public route)', function(done) {
        request(app)
        .get('/bloglist')
        .expect('content-type', /json/)
        .expect(200, done);
    });

  });
