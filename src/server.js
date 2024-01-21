require('express-async-errors')

// const database = require('./database/sqlite')

const migrationRun = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')

const express = require('express')

const routes = require('./routes')
const app = express()

app.use(express.json())

app.use(routes)

// database()
migrationRun()

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }
  console.error(error)
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

/* app.get('/', (req, res) => {
  res.send('Hello, world!')
})

endereço url: localhost:3333/mensagem/5/João

app.get('/mensagem/:id/:user', (req, res) => {
  const { id, user } = req.params
  res.send(`ID: ${id}. Para o usuário ${user}`)
})

endereço url: localhost:3333/users?page=5&limit=10

app.get('/users', (req, res) => {
  const { page, limit } = req.query
  res.send(`Página: ${page}. Mostrar ${limit}`)
}) */

const PORT = 3333

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
