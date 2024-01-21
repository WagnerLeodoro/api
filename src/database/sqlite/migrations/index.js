const sqliteConnection = require('../../sqlite')

const createUsers = require('./createUsers')

async function migrationRun() {
  const schemas = [createUsers].join('')

  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((err) => console.error(err))
}

module.exports = migrationRun
