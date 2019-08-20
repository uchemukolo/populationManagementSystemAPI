import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { FILE_PATH } from '../../src/helpers/defaultData';
import rimraf from 'rimraf';
import app from '../app';
const should = chai.should();
chai.use(chaiHttp);

describe('PhoneNumberController Controller', () => {
  it('should return home message', (done) => {
    chai.request(app)
      .get('/api/v1/')
      .end((error, response) => {
        const {text} = response;
        response.should.have.status(200);
        expect(text).to.equal('Welcome to Phone Number Generator Application API');
        done();
      });
  });
  it('should generate 1000 new phone numbers', (done) => {
    chai.request(app)
      .get('/api/v1/phonenumbers/generate?quantity=1000&&order=ascending')
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.should.have.property('message');
        response.body.should.have.property('phoneNumbers');
        done();
      });
  });
  it('should Return 400 for wrong quantity query param', (done) => {
    chai.request(app)
      .get('/api/v1/phonenumbers/generate?quantity=abcd&&order=ascending')
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        done();
      });
  });
  it('should Return 400 for wrong order query param', (done) => {
    chai.request(app)
      .get('/api/v1/phonenumbers/generate?quantity=1000&&order=ads')
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        done();
      });
  });
  it('should return 10 numbers generated', (done) => {
    chai.request(app)
    .get(`/api/v1/phonenumbers?quantity=10&&order=ascending`)
    .end((error, response) => {
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('success');
      response.body.should.have.property('message');
      response.body.should.have.property('generatedPhoneNumbersList');
      response.body.should.have.property('totalGeneratedPhoneNumbers');
      done();
    });
  });

  it('should return the minimum and maximum phone numbers generated', (done) => {
    chai.request(app)
    .get(`/api/v1/phonenumbers/minandmax?quantity=100&&order=ascending`)
    .end((error, response) => {
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('success');
      response.body.should.have.property('message');
      response.body.should.have.property('minimum_phone_number');
      response.body.should.have.property('maximum_phone_number');
      done();
    });
  });
  it('should return 500 when the folder does not exist', (done) => {
    rimraf.sync(FILE_PATH);
    chai.request(app)
    .get(`/api/v1/phonenumbers/minandmax?quantity=10&&order=ascending`)
    .end((error, response) => {
      response.should.have.status(500);
      done();
    });
  });
});
