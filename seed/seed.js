'use strict'

const {db} = require('../server/db')
const {lineData} = require('./seed-data')

const {Lines} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const productPromise = Lines.bulkCreate(lineData, {returning: true})

  await Promise.all([
    productPromise,
  ])

  await db.sync()
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
