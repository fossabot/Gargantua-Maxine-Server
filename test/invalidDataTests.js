var chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('..');
var should = chai.should();
chai.use(require('chai-json'));
chai.use(chaiHttp);

const fileName = require('path').basename(__filename).replace(".js","");

describe(`${fileName} : API /any_malformed_url`, () => {
    it('/8989 -> 404', (done) => {
        chai.request(app)
            .get('/8989')
            .end((err, res) => {
                res.should.have.status(404);                
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.be.eql({"message":"Not found"});
                done();
            });
    });
});