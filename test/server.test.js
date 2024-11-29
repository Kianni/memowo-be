import * as chai from 'chai';
// import chaiHttp from 'chai-http';
import { default as chaiHttp, request } from 'chai-http';
import app from '../server.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('GraphQL API', () => {
  it('should return all words', (done) => {
    request.execute(app)
      .post('/graphql')
      .send({ query: '{ words { spanish english } }' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.words).to.be.an('array');
        expect(res.body.data.words).to.have.lengthOf(16);
        done();
      });
  });

  it('should return words with correct fields', (done) => {
      request.execute(app)
      .post('/graphql')
      .send({ query: '{ words { spanish english } }' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.words).to.be.an('array');
        res.body.data.words.forEach(word => {
          expect(word).to.have.property('spanish');
          expect(word).to.have.property('english');
        });
        done();
      });
  });
});

describe('Root Route', () => {
  it('should return "Hola, mundo"', (done) => {
      request.execute(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Hola, mundo');
        done();
      });
  });
});