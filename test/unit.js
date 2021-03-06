const schema1 = require('./exampleSchemas.js');
const schema2 = require('./exampleSchemas2.js')
const expect = require('expect');
const convertSchemas = require('../src/helpers/convertSchema.js');
const convertEdges = require('../src/helpers/convertEdges.js');

describe('Schema1 tests', () => {
  describe('Schema files should run', () => {
    before((done) => {
      schema1
        .authenticate()
        .then(function (err) {
          if (err) console.log('Unable to connect to the database.', err);
        });
      schema1
        .sync({ force: true }) //force syncs all the models
        .then(function (err) {
          if (err) console.log('An error occured while creating the table', err);
          return schema1.models['users']
            .create({ name: 'Hancock' })
            .then(() => done());
        }).catch(function (err) {
          if (err) console.log(err);
          done();
        });
    })

    it('Example user schema should have one entry.', (done) => {
      schema1.models['users']
        .findAll()
        .then(users => {
          expect(users.length).toEqual(1);
          done();
        })
    });

    it('Should convert schema to object.', (done) => {
      const columns = convertSchemas(schema1);
      expect(JSON.stringify(columns)).toEqual(
        JSON.stringify({
          users:
            [{ content: 'id', type: 'INTEGER', relation: false },
            { content: 'name', type: 'STRING', relation: false },
            { content: 'createdAt', type: 'DATE', relation: false },
            { content: 'updatedAt', type: 'DATE', relation: false }],
          posts:
            [{ content: 'id', type: 'INTEGER', relation: false },
            { content: 'votes', type: 'INTEGER', relation: false },
            { content: 'createdAt', type: 'DATE', relation: false },
            { content: 'updatedAt', type: 'DATE', relation: false },
            { content: 'userId', type: 'INTEGER', relation: true }]
        })
      );
      done();
    })

    it('Should convert edges to object.', (done) => {
      const edges = convertEdges(schema1);
      expect(JSON.stringify(edges)).toEqual(
        JSON.stringify({ posts: ['users'] })
      );
      done();
    })
  })
})

describe('Schema2 tests', () => {
  describe('Schema files should run', () => {
    before((done) => {
      schema2
        .authenticate()
        .then(function (err) {
          if (err) console.log('Unable to connect to the database.', err);
        });
      schema2
        .sync({ force: true }) //force syncs all the models
        .then(function (err) {
          if (err) console.log('An error occured while creating the table', err);
          return schema2.models['users']
            .create({ name: 'Hancock' })
            .then(() => done());
        }).catch(function (err) {
          if (err) console.log(err);
          done();
        });
    })

    it('Example user schema should have one entry.', (done) => {
      schema1.models['users']
        .findAll()
        .then(users => {
          expect(users.length).toEqual(1);
          done();
        })
    });
  })
})