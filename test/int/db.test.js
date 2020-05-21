const { expect } = require('chai')
const db = require('../../db')

after(() => db.destroy())

describe('db', () => {
  it('allows admin insertion when all required fields are present and updates the update_ts on update', async () => {
    const ids = await db('admin').insert({ username: 'blue', password: 'green' }).returning('id')
    expect(ids).to.have.length(1)
    const [id] = ids
    expect(id).to.be.a('number')

    const admins = await db('admin').select('*').where({ id })
    expect(admins).to.have.length(1)
    const [admin] = admins
    expect(admin).to.have.property('id', id)
    expect(admin).to.have.property('username', 'blue')
    expect(admin).to.have.property('password', 'green')
    expect(admin).to.have.property('created_at').that.is.an.instanceof(Date)
    expect(admin).to.have.property('updated_at').that.is.an.instanceof(Date)

    expect(admin.created_at.valueOf()).to.equal(admin.updated_at.valueOf())

    const [updatedAdmin] = await db('admin').where({ id }).update({ password: 'purple' }).returning('*')
    expect(updatedAdmin).to.have.all.keys('id', 'username', 'password', 'created_at', 'updated_at')
    expect(updatedAdmin.id).to.equal(admin.id)
    expect(updatedAdmin.username).to.equal(admin.username)
    expect(updatedAdmin.password).to.equal('purple')
    expect(updatedAdmin.created_at.valueOf()).to.equal(admin.created_at.valueOf())
    expect(updatedAdmin.updated_at.valueOf()).to.not.equal(admin.updated_at.valueOf())
  });

  it('rejects admin insertion without a username', async () => {
    let results
    let err
    try {
      results = await db('admin').insert({ username: 'blue' })
    } catch (e) {
      err = e
    }
    
    expect(results).to.equal(undefined)
    expect(err).to.have.property('message', 'insert into "admin" ("username") values ($1) - null value in column "password" violates not-null constraint')
  })

  it('rejects admin insertion without a password', async () => {
    let results
    let err
    try {
      results = await db('admin').insert({ password: 'green' })
    } catch (e) {
      err = e
    }
    
    expect(results).to.equal(undefined)
    expect(err).to.have.property('message', 'insert into "admin" ("password") values ($1) - null value in column "username" violates not-null constraint')
  })
})
