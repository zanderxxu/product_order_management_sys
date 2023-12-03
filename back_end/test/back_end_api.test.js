const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Products', () => {
    it('should create a new product', (done) => {
        chai.request(server)
            .post('/api/product')
            .send({ name: 'Apple', price: 1.20, stockQuantity: 100 })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql('Apple');
                res.body.should.have.property('price').eql(1.20);
                res.body.should.have.property('stockQuantity').eql(100);
                done();
            });
    });
});

describe('Orders', () => {
    it('should create a new order', (done) => {
        chai.request(server)
            .post('/api/order')
            .send({
                products: ['656bd626e4a1f0cd028b3b99'],
                quantity: 2,
                shippingInfo: {
                    trackingCompany: 'UPS',
                    trackingNumber: '1Z999AA10123456784'
                },
                status: 'processing'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('processing');
                done();
            });
    });
});
