require('../lib/agent')

const { expect } = require('chai')
const admin = require('../../db/models/admin')

describe('Database', () => {

  it.only('allows admin to be created with all required fields', async () => {
    
    // res.should.have.status(200);
    const results = await admin.insert({ username: 'boy', password: 'girl' })
    console.log(results)

  });

  it('rejects admin insertion without a username', () => {

  })

  it('rejects admin insertion without a password', () => {

  })

});