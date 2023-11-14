const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Book Api', () => {
    let bookId;
    it('Should POST a book.', (done) => {
        const book = {id: "1", title: 'Test Book', author: 'Test Author'};
        chai.request(server)
            .post('/books')
            .send(book)
            .end((err, resp) => {
                expect(resp).to.have.status(201);
                expect(resp.body).to.be.a('object');
                expect(resp.body).to.have.property('id');
                expect(resp.body).to.have.property('title');
                expect(resp.body).to.have.property('author');
                bookId = resp.body.id;
                done();
            });
    });

    it('Should GET all books.', (done) => {
        chai.request(server)
            .get('/books')
            .end((err, resp) => {
                expect(resp.statusCode, "Status Code").to.equal(200);
                expect(resp.body).to.be.a('array')
                done();
            });

    });

    it('Should GET a single book.', (done) => {
        const bookId = 1;
        chai.request(server)
            .get(`/books/${bookId}`)
            .end((err, resp) => {
                expect(resp.statusCode, "Status Code").to.equal(200);
                expect(resp.body).to.be.a('object');
                expect(resp.body).to.have.property('id');
                expect(resp.body).to.have.property('title');
                expect(resp.body).to.have.property('author');
                done();
            });
    });
    it('Should PUT an existing book', (done) => {
        const bookId = "1";
        const updatedBook = {id: bookId, title: 'Test Book 2', author: 'Test Author & Sie'};
        chai.request(server)
            .put(`/books/${bookId}`)
            .send(updatedBook)
            .end((err, resp) => {
                expect(resp.statusCode, "Status Code").to.equal(200);
                expect(resp.body).to.be.a('object');
                expect(resp.body.title).to.equal('Test Book 2');
                expect(resp.body.author).to.equal('Test Author & Sie');
                done()
            });
    });

    it('Should DELETE a book.', (done) => {
        const bookId = 1;
        chai.request(server)
            .delete(`/books/${bookId}`)
            .end((err, resp) => {
                expect(resp).to.have.status(204);
                done();
            });
    });

    it('Should return 404 when trying to get, PUT or DELETE non-existing book', (done) => {
        chai.request(server)
            .get('/books/9999')
            .end((err, resp) => {
                expect(resp).to.have.status(404);
            });

        chai.request(server)
            .put('/books/9999')
            .send({id: "9999", title: "Non Existing Title", author: "No Such Author"})
            .end((err, resp) => {
                expect(resp).to.have.status(404);
            });

        chai.request(server)
            .delete('/books/9999')
            .end((err, resp) => {
                expect(resp).to.have.status(404);
                done();
            });
    });
});