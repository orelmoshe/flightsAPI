import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

import server from './api/server';

chai.use(chaiHttp);
chai.should();
describe('flightStats /flights/stats', () => {
	describe('/api request', () => {
		it('it should GET the Number of flights (inbound & outbound)', (done) => {
			chai
				.request(server)
				.get('/flights/stats/total')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					// res.body.should.be.eql({ data: 2 });
					done();
				});
		});

		it('it should GET the Number of flights from a specific country (inbound & outbound)', (done) => {
			chai
				.request(server)
				.get('/flights/stats/total?country=ISRAEL')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					done();
				});
		});

		it('it should GET the Number of inbound flights', (done) => {
			chai
				.request(server)
				.get('/flights/stats/inbound')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					done();
				});
		});

		it('it should GET the Number of inbound flights from a specific country', (done) => {
			chai
				.request(server)
				.get('/flights/stats/inbound?country=ISRAEL')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					done();
				});
		});

		it('it should GET the Number of outbound flights', (done) => {
			chai
				.request(server)
				.get('/flights/stats/outbound')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					done();
				});
		});

		it('it should GET the Number of outbound flights from a specific country', (done) => {
			chai
				.request(server)
				.get('/flights/stats/outbound?country=ISRAEL')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					done();
				});
		});

		it('it should GET the Number of delayed flights', (done) => {
			chai
				.request(server)
				.get('/flights/stats/delayed')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					done();
				});
		});

		it('it should GET the Most popular destination - the city with the highest number of outbound flights', (done) => {
			chai
				.request(server)
				.get('/flights/stats/popular')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					done();
				});
		});

		it('it should GET the getaway', (done) => {
			chai
				.request(server)
				.get('/flights/stats/getaway')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					done();
				});
		});
	});
});
