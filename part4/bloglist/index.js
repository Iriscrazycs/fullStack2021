const http = require('http')
const express = require('express')
const app = require('./app.js')
const logger=require('./utils/logger.js')


const server =http.createServer(app)

const PORT = 3003
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})