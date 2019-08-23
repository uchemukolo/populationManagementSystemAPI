import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import {
  chad,
  france,
  incompleteData,
  invalidLocationId,
  invalidPopulation,
} from './__mock_data__/index';
const should = chai.should();

chai.use(chaiHttp);
let id;

describe('Population Controller', () => {
  it('should Create New Location', (done) => {
    chai.request(server)
      .post('/api/v1/locations')
      .send(chad)
      .end((err, response) => {
        id = response.body.location.id;
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.should.have.property('location');
        done();
      });
  });
  it('should Return 400 for incomplete user info', (done) => {
    chai.request(server)
      .post('/api/v1/locations')
      .send(incompleteData)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        done();
      });
  });
  it('should Update created population', (done) => {
    chai.request(server)
      .put(`/api/v1/locations/${id}`)
      .send(chad)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.should.have.property('location');
        done();
      });
  });

  it('should get all created locations', (done) => {
    chai.request(server)
      .get('/api/v1/locations')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.should.have.property('locations');
        done();
      });
  });

  it('should Return 400 for invalid id for deletion', (done) => {
    chai.request(server)
      .delete('/api/v1/locations/a')
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        done();
      });
  });

  it('should delte created location', (done) => {
    chai.request(server)
      .delete(`/api/v1/locations/${id}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        done();
      });
  });
});


